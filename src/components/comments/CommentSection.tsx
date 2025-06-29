import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { MessageCircle, Loader2 } from 'lucide-react';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import { RealtimeChannel } from '@supabase/supabase-js';

interface Comment {
  id: string;
  content: string;
  created_at: string;
  is_supportive: boolean;
  user_id: string;
  profiles?: {
    display_name: string;
  } | null;
}

interface CommentSectionProps {
  storyId: string;
  initialCommentCount?: number;
}

const CommentSection = ({ storyId, initialCommentCount = 0 }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showComments, setShowComments] = useState(false);
  
  // Ref to track subscription and prevent multiple subscriptions
  const subscriptionRef = useRef<RealtimeChannel | null>(null);
  const isSubscribedRef = useRef(false);

  useEffect(() => {
    // Prevent multiple subscriptions
    if (isSubscribedRef.current) {
      console.log(`CommentSection ${storyId}: Subscription already active, skipping setup`);
      return;
    }

    console.log(`CommentSection ${storyId}: Setting up subscription`);
    isSubscribedRef.current = true;

    if (showComments) {
      fetchComments();
    }

    // Set up real-time subscription for comments with unique channel name
    subscriptionRef.current = supabase
      .channel(`comments_section_${storyId}_${Date.now()}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comments',
          filter: `story_id=eq.${storyId}`
        },
        () => {
          if (showComments) {
            fetchComments();
          }
        }
      )
      .subscribe((status) => {
        console.log(`CommentSection subscription for story ${storyId}:`, status);
      });

    return () => {
      console.log(`CommentSection ${storyId}: Cleaning up subscription`);
      isSubscribedRef.current = false;
      
      try {
        if (subscriptionRef.current) {
          supabase.removeChannel(subscriptionRef.current);
          subscriptionRef.current = null;
        }
      } catch (error) {
        console.error('Error cleaning up CommentSection subscription:', error);
      }
    };
  }, [storyId]); // Only depend on storyId to prevent recreation

  // Separate useEffect for showComments-dependent operations
  useEffect(() => {
    if (showComments) {
      fetchComments();
    }
  }, [showComments, storyId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      
      // Fetch comments
      const { data: commentsData, error } = await supabase
        .from('comments')
        .select('*')
        .eq('story_id', storyId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching comments:', error);
        return;
      }

      if (commentsData) {
        // Fetch profiles for each comment
        const commentsWithProfiles = await Promise.all(
          commentsData.map(async (comment) => {
            try {
              const { data: profile } = await supabase
                .from('profiles')
                .select('display_name')
                .eq('id', comment.user_id)
                .single();

              return {
                ...comment,
                profiles: profile
              };
            } catch (profileError) {
              console.error('Error fetching profile for comment:', profileError);
              return {
                ...comment,
                profiles: null
              };
            }
          })
        );

        setComments(commentsWithProfiles);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComments = () => {
    setShowComments(!showComments);
    if (!showComments && comments.length === 0) {
      fetchComments();
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleToggleComments}
        className="flex items-center space-x-2 text-womb-warmgrey hover:text-womb-softwhite transition-colors"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-sm">
          {comments.length || initialCommentCount} comment{(comments.length || initialCommentCount) !== 1 ? 's' : ''}
        </span>
      </button>

      {showComments && (
        <div className="space-y-4 border-t border-womb-deepgrey pt-4">
          <CommentForm storyId={storyId} onCommentAdded={fetchComments} />
          
          {loading ? (
            <div className="flex justify-center py-4">
              <Loader2 className="w-6 h-6 animate-spin text-womb-plum" />
            </div>
          ) : comments.length > 0 ? (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-womb-softwhite">
                Community Support ({comments.length})
              </h4>
              {comments.map(comment => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-womb-warmgrey">
              <p>No comments yet. Be the first to share support!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
