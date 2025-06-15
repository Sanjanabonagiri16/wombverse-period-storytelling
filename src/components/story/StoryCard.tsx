import { useState, useEffect } from 'react';
import { Bookmark, Share2, Flag } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';
import ReactionSystem from '@/components/reactions/ReactionSystem';
import CommentSection from '@/components/comments/CommentSection';

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
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    if (user) {
      checkBookmark();
    }
    fetchCommentCount();
  }, [story.id, user]);

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

  const fetchCommentCount = async () => {
    const { count } = await supabase
      .from('comments')
      .select('*', { count: 'exact' })
      .eq('story_id', story.id);
    
    setCommentCount(count || 0);
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

  const handleFlag = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to flag content.",
        variant: "destructive",
      });
      return;
    }

    try {
      await supabase
        .from('content_moderation')
        .insert({
          content_type: 'stories',
          content_id: story.id,
          flagged_by: user.id,
          flag_reason: 'User reported inappropriate content',
          flag_type: 'manual'
        });

      toast({
        title: "Story flagged",
        description: "Thank you for reporting. Our moderators will review this story.",
      });
    } catch (error) {
      console.error('Error flagging story:', error);
      toast({
        title: "Error",
        description: "Failed to flag story.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="story-card p-4 md:p-6 hover:shadow-lg hover:shadow-womb-plum/5 transition-all duration-300">
      {/* Author Info */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
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
        
        <button
          onClick={handleFlag}
          className="text-womb-warmgrey hover:text-red-400 transition-colors"
        >
          <Flag className="w-4 h-4" />
        </button>
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
      <div className="pt-4 mt-4 border-t border-womb-deepgrey space-y-4">
        {/* Emoji Reactions */}
        <ReactionSystem storyId={story.id} />
        
        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <CommentSection storyId={story.id} initialCommentCount={commentCount} />
          
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
