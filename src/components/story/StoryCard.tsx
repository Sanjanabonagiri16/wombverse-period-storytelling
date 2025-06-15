import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Bookmark, Share2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';

interface Story {
  id: string;
  title: string;
  content: string;
  emotion_tags: string[];
  privacy: string;
  category: string;
  is_anonymous: boolean;
  created_at: string;
  user_id: string;
  view_count: number;
  profiles?: {
    display_name: string;
    avatar_url: string;
  };
}

interface StoryCardProps {
  story: Story;
}

const StoryCard = ({ story }: StoryCardProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reactions, setReactions] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userReaction, setUserReaction] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const emojiReactions = [
    { type: 'heart', emoji: '❤️', label: 'Love' },
    { type: 'support', emoji: '🤗', label: 'Support' },
    { type: 'strong', emoji: '💪', label: 'Strong' },
    { type: 'tears', emoji: '😭', label: 'Tears' },
    { type: 'grateful', emoji: '🙏', label: 'Grateful' },
  ];

  useEffect(() => {
    fetchReactions();
    fetchComments();
    if (user) {
      checkBookmark();
      checkUserReaction();
    }
  }, [story.id, user]);

  const fetchReactions = async () => {
    const { data } = await supabase
      .from('reactions')
      .select('*')
      .eq('story_id', story.id);
    
    setReactions(data || []);
  };

  const fetchComments = async () => {
    const { data } = await supabase
      .from('comments')
      .select(`
        *,
        profiles:user_id (display_name, avatar_url)
      `)
      .eq('story_id', story.id)
      .order('created_at', { ascending: true });
    
    setComments(data || []);
  };

  const checkBookmark = async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from('bookmarks')
      .select('id')
      .eq('user_id', user.id)
      .eq('story_id', story.id)
      .single();
    
    setIsBookmarked(!!data);
  };

  const checkUserReaction = async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from('reactions')
      .select('type')
      .eq('user_id', user.id)
      .eq('story_id', story.id)
      .single();
    
    setUserReaction(data?.type || null);
  };

  const toggleReaction = async (type: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to react to stories.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (userReaction === type) {
        // Remove reaction
        await supabase
          .from('reactions')
          .delete()
          .eq('user_id', user.id)
          .eq('story_id', story.id)
          .eq('type', type);
        
        setUserReaction(null);
      } else {
        // Add or update reaction
        await supabase
          .from('reactions')
          .upsert({
            user_id: user.id,
            story_id: story.id,
            type: type,
          });
        
        setUserReaction(type);
      }
      
      fetchReactions();
      setShowEmojiPicker(false);
    } catch (error) {
      console.error('Error toggling reaction:', error);
    }
  };

  const toggleBookmark = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to bookmark stories.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (isBookmarked) {
        await supabase
          .from('bookmarks')
          .delete()
          .eq('user_id', user.id)
          .eq('story_id', story.id);
        
        setIsBookmarked(false);
        toast({
          title: "Bookmark removed",
          description: "Story removed from your bookmarks.",
        });
      } else {
        await supabase
          .from('bookmarks')
          .insert({
            user_id: user.id,
            story_id: story.id,
          });
        
        setIsBookmarked(true);
        toast({
          title: "Story bookmarked",
          description: "Story added to your bookmarks.",
        });
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  const getEmotionTagColor = (tag: string) => {
    const colorMap: Record<string, string> = {
      'empowering': 'text-green-400 bg-green-400/20',
      'challenging': 'text-orange-400 bg-orange-400/20',
      'educational': 'text-blue-400 bg-blue-400/20',
      'supportive': 'text-womb-plum bg-womb-plum/20',
      'funny': 'text-yellow-400 bg-yellow-400/20',
      'scary': 'text-red-400 bg-red-400/20',
      'relieving': 'text-cyan-400 bg-cyan-400/20',
      'frustrating': 'text-pink-400 bg-pink-400/20',
    };
    return colorMap[tag] || 'text-womb-warmgrey bg-womb-warmgrey/20';
  };

  const getReactionCount = (type: string) => {
    return reactions.filter(r => r.type === type).length;
  };

  const getReactionEmoji = (type: string) => {
    const reaction = emojiReactions.find(r => r.type === type);
    return reaction?.emoji || '❤️';
  };

  return (
    <div className="story-card p-4 md:p-6 hover:shadow-lg hover:shadow-womb-plum/5 transition-all duration-300">
      {/* Author Info */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-womb-crimson to-womb-plum rounded-full flex items-center justify-center">
          <span className="text-white font-medium text-sm md:text-base">
            {story.is_anonymous ? '?' : story.profiles?.display_name?.charAt(0) || 'U'}
          </span>
        </div>
        <div>
          <p className="text-womb-softwhite font-medium text-sm md:text-base">
            {story.is_anonymous ? 'Anonymous' : story.profiles?.display_name || 'User'}
          </p>
          <p className="text-womb-warmgrey text-xs md:text-sm">
            {formatDistanceToNow(new Date(story.created_at), { addSuffix: true })}
          </p>
        </div>
      </div>

      {/* Story Content */}
      <div className="space-y-4">
        <h2 className="text-lg md:text-xl font-playfair font-semibold text-womb-softwhite hover:text-white transition-colors">
          {story.title}
        </h2>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-womb-softwhite whitespace-pre-wrap text-sm md:text-base leading-relaxed">
            {story.content.length > 300 
              ? `${story.content.substring(0, 300)}...` 
              : story.content}
          </p>
        </div>

        {/* Emotion Tags */}
        {story.emotion_tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {story.emotion_tags.map(tag => (
              <span
                key={tag}
                className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium ${getEmotionTagColor(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Category Badge */}
        {story.category && (
          <div className="inline-block">
            <span className="px-2 md:px-3 py-1 bg-womb-warmgrey/20 text-womb-warmgrey text-xs md:text-sm rounded-full">
              {story.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
          </div>
        )}
      </div>

      {/* Enhanced Interaction Section */}
      <div className="pt-4 mt-4 border-t border-womb-deepgrey space-y-3">
        {/* Emoji Reactions */}
        <div className="flex items-center space-x-2">
          {emojiReactions.map(reaction => {
            const count = getReactionCount(reaction.type);
            const isActive = userReaction === reaction.type;
            return count > 0 || isActive ? (
              <button
                key={reaction.type}
                onClick={() => toggleReaction(reaction.type)}
                className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs transition-all ${
                  isActive 
                    ? 'bg-womb-crimson/20 text-womb-crimson border border-womb-crimson/50' 
                    : 'bg-womb-deepgrey/50 text-womb-warmgrey hover:bg-womb-deepgrey hover:text-womb-softwhite'
                }`}
              >
                <span>{reaction.emoji}</span>
                <span>{count}</span>
              </button>
            ) : null;
          })}
        </div>

        {/* Main Interaction Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 md:space-x-4">
            {/* Emoji Picker Toggle */}
            <div className="relative">
              <button 
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="flex items-center space-x-1 md:space-x-2 transition-colors text-womb-warmgrey hover:text-womb-crimson"
              >
                <Heart className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-xs md:text-sm">React</span>
              </button>
              
              {/* Emoji Picker Dropdown */}
              {showEmojiPicker && (
                <div className="absolute bottom-full left-0 mb-2 bg-womb-deepgrey border border-womb-warmgrey/20 rounded-lg p-2 flex space-x-1 z-10 shadow-lg">
                  {emojiReactions.map(reaction => (
                    <button
                      key={reaction.type}
                      onClick={() => toggleReaction(reaction.type)}
                      className="text-xl hover:scale-125 transition-transform p-1"
                      title={reaction.label}
                    >
                      {reaction.emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <span className="text-womb-warmgrey text-xs md:text-sm">
              {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
            </span>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-3">
            <button 
              onClick={toggleBookmark}
              className={`transition-colors ${
                isBookmarked 
                  ? 'text-womb-plum' 
                  : 'text-womb-warmgrey hover:text-womb-plum'
              }`}
            >
              <Bookmark className={`w-4 h-4 md:w-5 md:h-5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
            
            <button className="text-womb-warmgrey hover:text-womb-softwhite transition-colors">
              <Share2 className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
