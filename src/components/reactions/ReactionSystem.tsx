import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import EmojiReactionButton from './EmojiReactionButton';
import { RealtimeChannel } from '@supabase/supabase-js';

interface ReactionCount {
  type: string;
  count: number;
}

interface UserReaction {
  type: string;
}

interface ReactionSystemProps {
  storyId: string;
}

const ReactionSystem = ({ storyId }: ReactionSystemProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reactionCounts, setReactionCounts] = useState<ReactionCount[]>([]);
  const [userReactions, setUserReactions] = useState<UserReaction[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Ref to track subscription and prevent multiple subscriptions
  const subscriptionRef = useRef<RealtimeChannel | null>(null);
  const isSubscribedRef = useRef(false);

  const reactionTypes = [
    { type: 'heart', emoji: '❤️', label: 'Love' },
    { type: 'support', emoji: '🤗', label: 'Support' },
    { type: 'strength', emoji: '💪', label: 'Strength' },
    { type: 'hope', emoji: '✨', label: 'Hope' },
    { type: 'grateful', emoji: '🙏', label: 'Gratitude' },
    { type: 'empathy', emoji: '🤝', label: 'Understanding' },
  ];

  useEffect(() => {
    // Prevent multiple subscriptions
    if (isSubscribedRef.current) {
      console.log(`ReactionSystem ${storyId}: Subscription already active, skipping setup`);
      return;
    }

    console.log(`ReactionSystem ${storyId}: Setting up subscription`);
    isSubscribedRef.current = true;

    fetchReactions();
    if (user) {
      fetchUserReactions();
    }

    // Set up real-time subscription for reactions with unique channel name
    subscriptionRef.current = supabase
      .channel(`reactions_system_${storyId}_${Date.now()}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reactions',
          filter: `story_id=eq.${storyId}`
        },
        () => {
          fetchReactions();
          if (user) {
            fetchUserReactions();
          }
        }
      )
      .subscribe((status) => {
        console.log(`ReactionSystem subscription for story ${storyId}:`, status);
      });

    return () => {
      console.log(`ReactionSystem ${storyId}: Cleaning up subscription`);
      isSubscribedRef.current = false;
      
      try {
        if (subscriptionRef.current) {
          supabase.removeChannel(subscriptionRef.current);
          subscriptionRef.current = null;
        }
      } catch (error) {
        console.error('Error cleaning up ReactionSystem subscription:', error);
      }
    };
  }, [storyId]); // Only depend on storyId to prevent recreation

  // Separate useEffect for user-dependent operations
  useEffect(() => {
    if (user) {
      fetchUserReactions();
    }
  }, [user, storyId]);

  const fetchReactions = async () => {
    try {
      const { data, error } = await supabase
        .from('reactions')
        .select('type')
        .eq('story_id', storyId);
      
      if (error) {
        console.error('Error fetching reactions:', error);
        return;
      }

      if (data) {
        const counts = data.reduce((acc: Record<string, number>, reaction) => {
          acc[reaction.type] = (acc[reaction.type] || 0) + 1;
          return acc;
        }, {});

        const reactionCountsArray = Object.entries(counts).map(([type, count]) => ({
          type,
          count
        }));

        setReactionCounts(reactionCountsArray);
      }
    } catch (error) {
      console.error('Error fetching reaction counts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserReactions = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('reactions')
        .select('type')
        .eq('story_id', storyId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching user reactions:', error);
        return;
      }

      setUserReactions(data || []);
    } catch (error) {
      console.error('Error fetching user reactions:', error);
    }
  };

  const handleReactionToggle = async (type: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to react to stories.",
        variant: "destructive",
      });
      return;
    }

    try {
      const existingReaction = userReactions.find(r => r.type === type);

      if (existingReaction) {
        // Remove reaction
        const { error } = await supabase
          .from('reactions')
          .delete()
          .eq('story_id', storyId)
          .eq('user_id', user.id)
          .eq('type', type);

        if (error) throw error;
      } else {
        // Add reaction
        const { error } = await supabase
          .from('reactions')
          .insert({
            story_id: storyId,
            user_id: user.id,
            type: type
          });

        if (error) throw error;

        // Track analytics if the function exists
        try {
          await supabase.rpc('track_analytics_event', {
            event_type_param: 'reaction_added',
            user_id_param: user.id,
            story_id_param: storyId,
            reaction_type_param: type
          });
        } catch (analyticsError) {
          console.log('Analytics tracking not available:', analyticsError);
        }
      }
    } catch (error) {
      console.error('Error toggling reaction:', error);
      toast({
        title: "Error",
        description: "Failed to update reaction. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const getReactionCount = (type: string) => {
    const reaction = reactionCounts.find(r => r.type === type);
    return reaction ? reaction.count : 0;
  };

  const isReactionActive = (type: string) => {
    return userReactions.some(r => r.type === type);
  };

  if (loading) {
    return (
      <div className="flex items-center space-x-2 animate-pulse">
        {reactionTypes.map(reaction => (
          <div key={reaction.type} className="w-12 h-8 bg-womb-deepgrey rounded-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {reactionTypes.map(reaction => (
        <EmojiReactionButton
          key={reaction.type}
          storyId={storyId}
          type={reaction.type}
          emoji={reaction.emoji}
          label={reaction.label}
          count={getReactionCount(reaction.type)}
          isActive={isReactionActive(reaction.type)}
          onReactionToggle={handleReactionToggle}
        />
      ))}
    </div>
  );
};

export default ReactionSystem;
