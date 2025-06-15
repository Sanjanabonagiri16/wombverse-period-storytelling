
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { MessageCircle, Loader2 } from 'lucide-react';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';

interface Comment {
  id: string;
  content: string;
  created_at: string;
  is_supportive: boolean;
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

  useEffect(() => {
    if (showComments) {
      fetchComments();
    }

    // Set up real-time subscription for comments
    const channel = supabase
      .channel('story-comments')
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
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [storyId, showComments]);

  const fetchComments = async () => {
    try {
      const { data } = await supabase
        .from('comments')
        .select(`
          *,
          profiles:user_id (display_name)
        `)
        .eq('story_id', storyId)
        .order('created_at', { ascending: true });

      setComments(data || []);
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
