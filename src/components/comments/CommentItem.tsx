
import { formatDistanceToNow } from 'date-fns';
import { Heart, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Comment {
  id: string;
  content: string;
  created_at: string;
  is_supportive: boolean;
  profiles?: {
    display_name: string;
  } | null;
}

interface CommentItemProps {
  comment: Comment;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  const { user } = useAuth();
  const { toast } = useToast();

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
          content_type: 'comments',
          content_id: comment.id,
          flagged_by: user.id,
          flag_reason: 'User reported inappropriate content',
          flag_type: 'manual'
        });

      toast({
        title: "Comment flagged",
        description: "Thank you for reporting. Our moderators will review this comment.",
      });
    } catch (error) {
      console.error('Error flagging comment:', error);
      toast({
        title: "Error",
        description: "Failed to flag comment.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-womb-deepgrey/30 rounded-lg p-4 space-y-3 border border-womb-deepgrey/50">
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-womb-crimson to-womb-plum rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm font-medium">
            {comment.profiles?.display_name?.charAt(0) || 'A'}
          </span>
        </div>
        
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <p className="text-womb-softwhite font-medium text-sm">
                {comment.profiles?.display_name || 'Anonymous'}
              </p>
              <p className="text-womb-warmgrey text-xs">
                {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
              </p>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFlag}
              className="text-womb-warmgrey hover:text-red-400 h-6 w-6 p-0"
            >
              <Flag className="w-3 h-3" />
            </Button>
          </div>
          
          <p className="text-womb-softwhite text-sm leading-relaxed">
            {comment.content}
          </p>
          
          {comment.is_supportive && (
            <div className="flex items-center space-x-1 text-womb-crimson">
              <Heart className="w-3 h-3 fill-current" />
              <span className="text-xs">Supportive comment</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
