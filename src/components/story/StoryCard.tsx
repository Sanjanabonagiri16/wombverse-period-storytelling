import { useState, useEffect, useCallback } from 'react';
import { Bookmark, Share2, Heart, MessageCircle, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
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
  } | null;
}

interface StoryCardProps {
  story: Story;
}

const StoryCard = ({ story }: StoryCardProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [reactionCount, setReactionCount] = useState(0);
  const [showFullStory, setShowFullStory] = useState(false);

  useEffect(() => {
    if (user) {
      checkBookmark();
    }
    fetchCommentCount();
    fetchReactionCount();

    // Set up real-time subscriptions for reactions and comments
    const reactionsSubscription = supabase
      .channel(`reactions_${story.id}_${Date.now()}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reactions',
          filter: `story_id=eq.${story.id}`
        },
        () => {
          fetchReactionCount();
        }
      )
      .subscribe();

    const commentsSubscription = supabase
      .channel(`comments_${story.id}_${Date.now()}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comments',
          filter: `story_id=eq.${story.id}`
        },
        () => {
          fetchCommentCount();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(reactionsSubscription);
      supabase.removeChannel(commentsSubscription);
    };
  }, [story.id, user]);

  const checkBookmark = useCallback(async () => {
    if (!user) return;
    
    // Temporarily disable bookmarks to prevent RLS issues
    console.log('Bookmarks temporarily disabled to prevent RLS issues');
    setIsBookmarked(false);
    return;
    
    try {
      const { data, error } = await supabase
        .from('bookmarks')
        .select('id')
        .eq('user_id', user.id)
        .eq('story_id', story.id)
        .single();
      
      if (error) {
        console.log('Bookmark check error (table might not exist):', error.message);
        setIsBookmarked(false);
        return;
      }
      
      setIsBookmarked(!!data);
    } catch (error) {
      console.log('Bookmark check failed:', error);
      setIsBookmarked(false);
    }
  }, [user, story.id]);

  const fetchCommentCount = useCallback(async () => {
    try {
      const { count } = await supabase
        .from('comments')
        .select('*', { count: 'exact' })
        .eq('story_id', story.id);
      
      setCommentCount(count || 0);
    } catch (error) {
      console.error('Error fetching comment count:', error);
    }
  }, [story.id]);

  const fetchReactionCount = useCallback(async () => {
    try {
      const { count } = await supabase
        .from('reactions')
        .select('*', { count: 'exact' })
        .eq('story_id', story.id);
      
      setReactionCount(count || 0);
    } catch (error) {
      console.error('Error fetching reaction count:', error);
    }
  }, [story.id]);

  const toggleBookmark = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to bookmark stories.",
        variant: "destructive",
      });
      return;
    }

    // Temporarily disable bookmarks to prevent RLS issues
    toast({
      title: "Bookmarks disabled",
      description: "Bookmark functionality is temporarily disabled while we fix the database permissions.",
      variant: "destructive",
    });
    return;

    try {
      if (isBookmarked) {
        const { error } = await supabase
          .from('bookmarks')
          .delete()
          .eq('user_id', user.id)
          .eq('story_id', story.id);
        
        if (error) {
          console.log('Bookmark delete error:', error.message);
          toast({
            title: "Error",
            description: "Failed to remove bookmark. Table might not exist.",
            variant: "destructive",
          });
          return;
        }
        
        setIsBookmarked(false);
        toast({
          title: "Bookmark removed",
          description: "Story removed from your bookmarks.",
        });
      } else {
        const { error } = await supabase
          .from('bookmarks')
          .insert({
            user_id: user.id,
            story_id: story.id
          });
        
        if (error) {
          console.log('Bookmark insert error:', error.message);
          toast({
            title: "Error",
            description: "Failed to add bookmark. Table might not exist.",
            variant: "destructive",
          });
          return;
        }
        
        setIsBookmarked(true);
        toast({
          title: "Story bookmarked",
          description: "Story added to your bookmarks.",
        });
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      toast({
        title: "Error",
        description: "Failed to update bookmark.",
        variant: "destructive",
      });
    }
  };

  const getEmotionTagColor = (tag: string) => {
    const colors: Record<string, string> = {
      'joy': 'bg-yellow-500/20 text-yellow-400',
      'sadness': 'bg-blue-500/20 text-blue-400',
      'anger': 'bg-red-500/20 text-red-400',
      'fear': 'bg-purple-500/20 text-purple-400',
      'surprise': 'bg-green-500/20 text-green-400',
      'love': 'bg-pink-500/20 text-pink-400',
      'hope': 'bg-cyan-500/20 text-cyan-400',
      'gratitude': 'bg-emerald-500/20 text-emerald-400',
      'empowerment': 'bg-orange-500/20 text-orange-400',
      'confusion': 'bg-gray-500/20 text-gray-400',
    };
    return colors[tag.toLowerCase()] || 'bg-womb-warmgrey/20 text-womb-warmgrey';
  };

  return (
    <div className="bg-gradient-to-br from-womb-deepgrey to-womb-charcoal rounded-xl border border-womb-deepgrey hover:border-womb-plum/50 transition-all duration-300 p-4 md:p-6 hover:shadow-lg hover:shadow-womb-plum/5">
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
          <p className="text-womb-warmgrey text-xs md:text-sm flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {formatDistanceToNow(new Date(story.created_at), { addSuffix: true })}
          </p>
        </div>
      </div>

      {/* Story Content */}
      <div className="space-y-4">
        <h2 
          className="text-lg md:text-xl font-playfair font-semibold text-womb-softwhite hover:text-white transition-colors cursor-pointer"
          onClick={() => setShowFullStory(!showFullStory)}
        >
          {story.title}
        </h2>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-womb-softwhite whitespace-pre-wrap text-sm md:text-base leading-relaxed">
            {showFullStory 
              ? story.content 
              : story.content.length > 300 
                ? `${story.content.substring(0, 300)}...` 
                : story.content}
          </p>
          {story.content.length > 300 && (
            <button
              onClick={() => setShowFullStory(!showFullStory)}
              className="text-womb-plum hover:text-womb-crimson text-sm mt-2 transition-colors"
            >
              {showFullStory ? 'Show less' : 'Read more'}
            </button>
          )}
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

        {/* Reactions */}
        <div className="py-3">
          <ReactionSystem storyId={story.id} />
        </div>

        {/* Comments Section */}
        <CommentSection storyId={story.id} initialCommentCount={commentCount} />
      </div>

      {/* Actions Section */}
      <div className="pt-4 mt-4 border-t border-womb-deepgrey">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-womb-warmgrey">
              <Heart className="w-4 h-4" />
              <span className="text-sm">{reactionCount}</span>
            </div>
            <div className="flex items-center space-x-1 text-womb-warmgrey">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">{commentCount}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-3">
            {/* Temporarily disabled bookmark button to prevent 406 errors */}
            {/* <Button
              variant="ghost"
              size="sm"
              onClick={toggleBookmark}
              className={`transition-colors ${
                isBookmarked 
                  ? 'text-womb-plum hover:text-womb-plum/80' 
                  : 'text-womb-warmgrey hover:text-womb-plum'
              }`}
            >
              <Bookmark className={`w-4 h-4 md:w-5 md:h-5 ${isBookmarked ? 'fill-current' : ''}`} />
            </Button> */}
            
            <Button
              variant="ghost"
              size="sm"
              className="text-womb-warmgrey hover:text-womb-softwhite transition-colors"
            >
              <Share2 className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
