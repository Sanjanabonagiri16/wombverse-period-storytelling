
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Heart, Send } from 'lucide-react';

interface CommentFormProps {
  storyId: string;
  onCommentAdded: () => void;
}

const CommentForm = ({ storyId, onCommentAdded }: CommentFormProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [content, setContent] = useState('');
  const [isSupportive, setIsSupportive] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to leave a comment.",
        variant: "destructive",
      });
      return;
    }

    if (!content.trim()) {
      toast({
        title: "Comment required",
        description: "Please write a comment before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await supabase
        .from('comments')
        .insert({
          story_id: storyId,
          user_id: user.id,
          content: content.trim(),
          is_supportive: isSupportive,
        });

      setContent('');
      setIsSupportive(true);
      onCommentAdded();
      
      toast({
        title: "Comment added",
        description: "Thank you for sharing your supportive words!",
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: "Error",
        description: "Failed to add comment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="text-center p-6 bg-womb-deepgrey/30 rounded-lg border border-womb-deepgrey/50">
        <p className="text-womb-warmgrey mb-3">Sign in to leave a supportive comment</p>
        <p className="text-womb-warmgrey text-sm">
          Join our community to share encouragement and support
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-3">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share words of encouragement and support..."
          className="min-h-[100px] bg-womb-deepgrey/50 border-womb-deepgrey text-womb-softwhite placeholder:text-womb-warmgrey resize-none"
          maxLength={500}
        />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setIsSupportive(!isSupportive)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm transition-all ${
                isSupportive 
                  ? 'bg-womb-crimson/20 text-womb-crimson border border-womb-crimson/50' 
                  : 'bg-womb-deepgrey/50 text-womb-warmgrey border border-transparent'
              }`}
            >
              <Heart className={`w-4 h-4 ${isSupportive ? 'fill-current' : ''}`} />
              <span>Supportive</span>
            </button>
          </div>
          
          <div className="text-xs text-womb-warmgrey">
            {content.length}/500
          </div>
        </div>
      </div>
      
      <Button 
        type="submit" 
        disabled={isSubmitting || !content.trim()}
        className="w-full bg-womb-crimson hover:bg-womb-crimson/90 text-white"
      >
        {isSubmitting ? (
          "Sending..."
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Share Support
          </>
        )}
      </Button>
    </form>
  );
};

export default CommentForm;
