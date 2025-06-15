
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Plus, Image, BarChart3, Heart } from 'lucide-react';

interface CommunityPostFormProps {
  onPostCreated: () => void;
}

const CommunityPostForm = ({ onPostCreated }: CommunityPostFormProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [postType, setPostType] = useState<'text' | 'poll' | 'affirmation'>('text');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to create a post.",
        variant: "destructive",
      });
      return;
    }

    if (!content.trim()) {
      toast({
        title: "Content required",
        description: "Please write some content for your post.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const postData: any = {
        user_id: user.id,
        type: postType,
        title: title.trim() || null,
        content: content.trim(),
      };

      if (postType === 'poll') {
        const validOptions = pollOptions.filter(opt => opt.trim());
        if (validOptions.length < 2) {
          toast({
            title: "Poll options required",
            description: "Please provide at least 2 poll options.",
            variant: "destructive",
          });
          return;
        }
        postData.poll_options = validOptions;
        postData.poll_votes = {};
      }

      await supabase.from('community_posts').insert(postData);

      // Track analytics
      await supabase.rpc('track_analytics_event', {
        event_type_param: 'community_post_created',
        user_id_param: user.id,
        metadata_param: { post_type: postType }
      });

      setTitle('');
      setContent('');
      setPollOptions(['', '']);
      setPostType('text');
      onPostCreated();
      
      toast({
        title: "Post created",
        description: "Your community post has been shared!",
      });
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addPollOption = () => {
    if (pollOptions.length < 6) {
      setPollOptions([...pollOptions, '']);
    }
  };

  const updatePollOption = (index: number, value: string) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const removePollOption = (index: number) => {
    if (pollOptions.length > 2) {
      setPollOptions(pollOptions.filter((_, i) => i !== index));
    }
  };

  if (!user) {
    return (
      <Card className="bg-womb-deepgrey border-womb-deepgrey">
        <CardContent className="p-6 text-center">
          <p className="text-white mb-3">Sign in to share with the community</p>
          <p className="text-white text-sm">
            Join our supportive community to share posts, polls, and affirmations
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-womb-deepgrey border-womb-deepgrey">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Post Type Selector */}
          <div className="flex space-x-2 mb-4">
            <Button
              type="button"
              variant={postType === 'text' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPostType('text')}
              className="flex items-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>Text</span>
            </Button>
            <Button
              type="button"
              variant={postType === 'poll' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPostType('poll')}
              className="flex items-center space-x-1"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Poll</span>
            </Button>
            <Button
              type="button"
              variant={postType === 'affirmation' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPostType('affirmation')}
              className="flex items-center space-x-1"
            >
              <Heart className="w-4 h-4" />
              <span>Affirmation</span>
            </Button>
          </div>

          {/* Title (optional for text, required for polls) */}
          {(postType === 'poll' || postType === 'affirmation') && (
            <Input
              placeholder={postType === 'poll' ? "Poll question..." : "Affirmation title..."}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-womb-charcoal border-womb-deepgrey text-white"
              required={postType === 'poll'}
            />
          )}

          {/* Content */}
          <Textarea
            placeholder={
              postType === 'text' ? "Share something with the community..." :
              postType === 'poll' ? "Additional context for your poll..." :
              "Share a positive affirmation or encouragement..."
            }
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px] bg-womb-charcoal border-womb-deepgrey text-white placeholder:text-white resize-none"
            maxLength={1000}
          />

          {/* Poll Options */}
          {postType === 'poll' && (
            <div className="space-y-2">
              <label className="text-sm text-white">Poll Options:</label>
              {pollOptions.map((option, index) => (
                <div key={index} className="flex space-x-2">
                  <Input
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => updatePollOption(index, e.target.value)}
                    className="bg-womb-charcoal border-womb-deepgrey text-white"
                  />
                  {pollOptions.length > 2 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removePollOption(index)}
                      className="border-red-500 text-red-500"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              {pollOptions.length < 6 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addPollOption}
                  className="border-womb-maroon text-womb-maroon"
                >
                  Add Option
                </Button>
              )}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="text-xs text-white">
              {content.length}/1000
            </div>
            
            <Button 
              type="submit" 
              disabled={isSubmitting || !content.trim()}
              className="bg-womb-maroon hover:bg-womb-maroon/90 text-white"
            >
              {isSubmitting ? "Sharing..." : "Share Post"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CommunityPostForm;
