
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface EmojiReactionButtonProps {
  storyId: string;
  type: string;
  emoji: string;
  label: string;
  count: number;
  isActive: boolean;
  onReactionToggle: (type: string) => void;
}

const EmojiReactionButton = ({
  storyId,
  type,
  emoji,
  label,
  count,
  isActive,
  onReactionToggle
}: EmojiReactionButtonProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to react to stories.",
        variant: "destructive",
      });
      return;
    }

    if (isLoading) return;

    setIsLoading(true);
    try {
      await onReactionToggle(type);
    } catch (error) {
      console.error('Error toggling reaction:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`flex items-center space-x-1 px-3 py-2 rounded-full text-sm transition-all duration-200 hover:scale-105 ${
        isActive 
          ? 'bg-womb-crimson/20 text-womb-crimson border border-womb-crimson/50 shadow-md' 
          : 'bg-womb-deepgrey/50 text-womb-warmgrey hover:bg-womb-deepgrey hover:text-womb-softwhite border border-transparent'
      } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      title={label}
    >
      <span className="text-lg">{emoji}</span>
      {count > 0 && <span className="font-medium">{count}</span>}
    </button>
  );
};

export default EmojiReactionButton;
