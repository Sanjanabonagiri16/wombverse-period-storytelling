
import { formatDistanceToNow } from 'date-fns';
import { Heart } from 'lucide-react';

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
  return (
    <div className="bg-womb-deepgrey/30 rounded-lg p-4 space-y-3 border border-womb-deepgrey/50">
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-womb-crimson to-womb-plum rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm font-medium">
            {comment.profiles?.display_name?.charAt(0) || 'A'}
          </span>
        </div>
        
        <div className="flex-1 space-y-2">
          <div className="flex items-center space-x-2">
            <p className="text-womb-softwhite font-medium text-sm">
              {comment.profiles?.display_name || 'Anonymous'}
            </p>
            <p className="text-womb-warmgrey text-xs">
              {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
            </p>
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
