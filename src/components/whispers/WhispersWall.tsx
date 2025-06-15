
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import ReactionSystem from '@/components/reactions/ReactionSystem';

interface Whisper {
  id: string;
  content: string;
  emotion_tags: string[];
  is_anonymous: boolean;
  created_at: string;
  user_id: string;
  profiles?: {
    display_name: string;
  } | null;
}

const WhispersWall = () => {
  const [whispers, setWhispers] = useState<Whisper[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchWhispers();
    
    // Set up real-time subscription for new whispers
    const channel = supabase
      .channel('whispers-updates')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'stories',
          filter: 'category=eq.whisper'
        },
        () => {
          fetchWhispers();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const fetchWhispers = async () => {
    try {
      const { data: whispersData, error } = await supabase
        .from('stories')
        .select('*')
        .eq('is_draft', false)
        .eq('category', 'whisper')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;

      const whispers: Whisper[] = [];
      
      if (whispersData) {
        for (const whisper of whispersData) {
          let profileData = null;
          
          if (!whisper.is_anonymous) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('display_name')
              .eq('id', whisper.user_id)
              .single();
            
            profileData = profile;
          }
          
          whispers.push({
            ...whisper,
            profiles: profileData
          });
        }
      }

      setWhispers(whispers);
    } catch (error) {
      console.error('Error fetching whispers:', error);
      setWhispers([]);
    } finally {
      setLoading(false);
    }
  };

  const getEmotionColor = (emotion: string) => {
    const colors: Record<string, string> = {
      'calm': 'bg-blue-500/20 text-blue-400',
      'grateful': 'bg-green-500/20 text-green-400',
      'angry': 'bg-red-500/20 text-red-400',
      'sad': 'bg-purple-500/20 text-purple-400',
      'empowered': 'bg-orange-500/20 text-orange-400',
      'anxious': 'bg-yellow-500/20 text-yellow-400',
      'hopeful': 'bg-pink-500/20 text-pink-400',
      'frustrated': 'bg-gray-500/20 text-gray-400',
    };
    return colors[emotion] || 'bg-womb-warmgrey/20 text-womb-warmgrey';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-womb-plum" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-playfair font-bold text-womb-softwhite mb-2">
          Whispers 🌙
        </h2>
        <p className="text-womb-warmgrey">
          Short, heartfelt moments and micro-stories from our community
        </p>
      </div>

      {whispers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-womb-warmgrey text-lg">No whispers yet</p>
          <p className="text-womb-warmgrey text-sm mt-2">
            Be the first to share a whisper with the community
          </p>
        </div>
      ) : (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {whispers.map((whisper) => (
            <div
              key={whisper.id}
              className="break-inside-avoid bg-gradient-to-br from-womb-deepgrey to-womb-charcoal rounded-lg p-4 border border-womb-deepgrey hover:border-womb-plum/50 transition-all duration-300 hover:shadow-lg hover:shadow-womb-plum/10 group"
            >
              <div className="space-y-3">
                {/* Content */}
                <p className="text-womb-softwhite text-sm leading-relaxed group-hover:text-white transition-colors">
                  {whisper.content}
                </p>

                {/* Emotion tags */}
                {whisper.emotion_tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {whisper.emotion_tags.map(tag => (
                      <span
                        key={tag}
                        className={`px-2 py-1 rounded-full text-xs ${getEmotionColor(tag)}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Enhanced Reactions */}
                <ReactionSystem storyId={whisper.id} />

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-womb-deepgrey">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-womb-crimson to-womb-plum rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">
                        {whisper.is_anonymous ? '?' : whisper.profiles?.display_name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div>
                      <p className="text-womb-warmgrey text-xs">
                        {whisper.is_anonymous ? 'Anonymous' : whisper.profiles?.display_name || 'User'}
                      </p>
                      <p className="text-womb-warmgrey text-xs">
                        {formatDistanceToNow(new Date(whisper.created_at), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WhispersWall;
