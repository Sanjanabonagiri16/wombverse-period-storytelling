
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Heart, Lock, Globe, Users, Save, Send } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import EmotionTags from './EmotionTags';
import PrivacySelector from './PrivacySelector';
import StoryPreview from './StoryPreview';

const storySchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  content: z.string().min(10, 'Story must be at least 10 characters').max(5000, 'Story must be less than 5000 characters'),
  emotionTags: z.array(z.string()).min(1, 'Please select at least one emotion tag'),
  privacy: z.enum(['public', 'community', 'anonymous']),
  category: z.string().min(1, 'Please select a category'),
  isAnonymous: z.boolean(),
});

type StoryFormData = z.infer<typeof storySchema>;

const StoryCreationForm = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const form = useForm<StoryFormData>({
    resolver: zodResolver(storySchema),
    defaultValues: {
      title: '',
      content: '',
      emotionTags: [],
      privacy: 'community',
      category: '',
      isAnonymous: false,
    },
  });

  const onSubmit = async (data: StoryFormData) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to share your story.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      // Here you would typically save to Supabase
      console.log('Story data:', data);
      
      toast({
        title: "Story shared successfully!",
        description: "Thank you for sharing your experience with the community.",
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: "Error sharing story",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const saveDraft = async () => {
    const data = form.getValues();
    // Save as draft logic would go here
    toast({
      title: "Draft saved",
      description: "Your story has been saved as a draft.",
    });
  };

  const getStoryPreviewData = () => {
    const formData = form.getValues();
    return {
      title: formData.title || '',
      content: formData.content || '',
      emotionTags: formData.emotionTags || [],
      privacy: formData.privacy || 'community',
      category: formData.category || '',
      isAnonymous: formData.isAnonymous || false,
    };
  };

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {!showPreview ? (
            <>
              {/* Story Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-womb-softwhite">Story Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Give your story a meaningful title..."
                        className="bg-womb-deepgrey border-womb-deepgrey text-womb-softwhite placeholder-womb-warmgrey focus:border-womb-crimson"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category Selection */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-womb-softwhite">Category</FormLabel>
                    <FormControl>
                      <select
                        className="w-full h-10 rounded-md border border-womb-deepgrey bg-womb-deepgrey px-3 py-2 text-womb-softwhite focus:border-womb-crimson focus:outline-none"
                        {...field}
                      >
                        <option value="">Select a category</option>
                        <option value="first-period">First Period Experience</option>
                        <option value="period-pain">Managing Period Pain</option>
                        <option value="period-products">Period Products & Tips</option>
                        <option value="workplace-school">Period at Work/School</option>
                        <option value="cultural-experience">Cultural Perspectives</option>
                        <option value="support-advice">Support & Advice</option>
                        <option value="celebration">Period Positivity</option>
                        <option value="other">Other</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Story Content */}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-womb-softwhite">Your Story</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Share your experience, thoughts, or advice. Remember, your story matters and can help others feel less alone..."
                        className="min-h-[300px] bg-womb-deepgrey border-womb-deepgrey text-womb-softwhite placeholder-womb-warmgrey focus:border-womb-crimson resize-none"
                        {...field}
                      />
                    </FormControl>
                    <div className="flex justify-between text-sm text-womb-warmgrey">
                      <span>{field.value.length}/5000 characters</span>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {/* Emotion Tags */}
              <FormField
                control={form.control}
                name="emotionTags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-womb-softwhite">How did this experience make you feel?</FormLabel>
                    <FormControl>
                      <EmotionTags
                        selectedTags={field.value}
                        onTagsChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Privacy Settings */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="privacy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-womb-softwhite">Privacy Settings</FormLabel>
                      <FormControl>
                        <PrivacySelector
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isAnonymous"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-womb-crimson bg-womb-deepgrey border-womb-deepgrey rounded focus:ring-womb-crimson"
                          checked={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-womb-softwhite cursor-pointer">
                        Post anonymously (your username won't be shown)
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </>
          ) : (
            <StoryPreview story={getStoryPreviewData()} />
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-womb-deepgrey">
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={saveDraft}
                className="border-womb-plum text-womb-plum hover:bg-womb-plum hover:text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowPreview(!showPreview)}
                className="border-womb-warmgrey text-womb-warmgrey hover:bg-womb-warmgrey hover:text-womb-charcoal"
              >
                {showPreview ? 'Edit' : 'Preview'}
              </Button>
            </div>
            
            <div className="flex gap-3 sm:ml-auto">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate('/')}
                className="text-womb-warmgrey hover:text-womb-softwhite"
              >
                Cancel
              </Button>
              
              <Button
                type="submit"
                disabled={isSaving}
                className="btn-primary"
              >
                <Send className="w-4 h-4 mr-2" />
                {isSaving ? 'Sharing...' : 'Share Story'}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default StoryCreationForm;
