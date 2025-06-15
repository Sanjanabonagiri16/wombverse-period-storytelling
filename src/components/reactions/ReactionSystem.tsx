
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import EmojiReactionButton from './EmojiReactionButton';

interface ReactionSystemProps {
  storyId: string;
}

const ReactionSystem = ({ storyId }: ReactionSystemProps) => {
  const { user } = useAuth();
  const [reactions, setReactions] = useState<Record<string, number>>({});
  const [userReaction, setUserReaction] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const emojiReactions = [
    { type: 'heart', emoji: '❤️', label: 'Love & Support' },
    { type: 'support', emoji: '🥺', label: 'Sending Hugs' },
    { type: 'strong', emoji: '💪', label: 'You\'re Strong' },
    { type: 'tears', emoji: '😭', label: 'Feel Your Pain' },
    { type: 'grateful', emoji: '🙏', label: 'Grateful for Sharing' },
    { type: 'empathy', emoji: '🤗', label: 'I Understand' },
    { type: 'hope', emoji: '✨', label: 'Hopeful' },
    { type: 'strength', emoji: '🌟', label: 'Inspiring' },
  ];

  useEffect(() => {
    fetchReactions();
    if (user) {
      fetchUserReaction();
    }

    // Set up real-time subscription for reactions
    const channel = supabase
      .channel('story-reactions')
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
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [storyId, user]);

  const fetchReactions = async () => {
    try {
      const { data } = await supabase
        .from('reactions')
        .select('type')
        .eq('story_id', storyId);

      const reactionCounts: Record<string, number> = {};
      data?.forEach(reaction => {
        reactionCounts[reaction.type] = (reactionCounts[reaction.type] || 0) + 1;
      });

      setReactions(reactionCounts);
    } catch (error) {
      console.error('Error fetching reactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserReaction = async () => {
    if (!user) return;

    try {
      const { data } = await supabase
        .from('reactions')
        .select('type')
        .eq('story_id', storyId)
        .eq('user_id', user.id)
        .single();

      setUserReaction(data?.type || null);
    } catch (error) {
      // User hasn't reacted yet
      setUserReaction(null);
    }
  };

  const toggleReaction = async (type: string) => {
    if (!user) return;

    try {
      if (userReaction === type) {
        // Remove reaction
        await supabase
          .from('reactions')
          .delete()
          .eq('user_id', user.id)
          .eq('story_id', storyId)
          .eq('type', type);
        
        setUserReaction(null);
      } else {
        // Remove existing reaction first if any
        if (userReaction) {
          await supabase
            .from('reactions')
            .delete()
            .eq('user_id', user.id)
            .eq('story_id', storyId);
        }

        // Add new reaction
        await supabase
          .from('reactions')
          .insert({
            user_id: user.id,
            story_id: storyId,
            type: type,
          });
        
        setUserReaction(type);
      }
    } catch (error) {
      console.error('Error toggling reaction:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex space-x-2">
        {emojiReactions.slice(0, 4).map(reaction => (
          <div key={reaction.type} className="w-12 h-8 bg-womb-deepgrey/30 rounded-full animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {emojiReactions.map(reaction => (
          <EmojiReactionButton
            key={reaction.type}
            storyId={storyId}
            type={reaction.type}
            emoji={reaction.emoji}
            label={reaction.label}
            count={reactions[reaction.type] || 0}
            isActive={userReaction === reaction.type}
            onReactionToggle={toggleReaction}
          />
        ))}
      </div>
      
      {Object.keys(reactions).length > 0 && (
        <div className="text-xs text-womb-warmgrey">
          {Object.values(reactions).reduce((a, b) => a + b, 0)} reaction{Object.values(reactions).reduce((a, b) => a + b, 0) !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
};

export default ReactionSystem;
