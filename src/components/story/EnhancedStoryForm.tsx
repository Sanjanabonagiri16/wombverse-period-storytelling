
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import RichTextEditor from './RichTextEditor';
import MoodSelector from './MoodSelector';
import CoverImageUpload from './CoverImageUpload';
import { Save, Send, Eye, Edit } from 'lucide-react';

const storySchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  content: z.string().min(10, 'Story must be at least 10 characters').max(5000, 'Story must be less than 5000 characters'),
  mood: z.string().min(1, 'Please select a mood'),
  category: z.string().min(1, 'Please select a category'),
  isAnonymous: z.boolean(),
  coverImage: z.string().nullable(),
});

type StoryFormData = z.infer<typeof storySchema>;

const EnhancedStoryForm = () => {
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
      mood: '',
      category: '',
      isAnonymous: false,
      coverImage: null,
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
      const { error } = await supabase
        .from('stories')
        .insert({
          user_id: user.id,
          title: data.title,
          content: data.content,
          emotion_tags: [data.mood],
          privacy: data.isAnonymous ? 'anonymous' : 'public',
          category: data.category,
          is_anonymous: data.isAnonymous,
          is_draft: false,
        });

      if (error) throw error;
      
      toast({
        title: "Story shared successfully! ✨",
        description: "Thank you for sharing your experience with the community.",
      });
      
      navigate('/stories');
    } catch (error) {
      console.error('Error sharing story:', error);
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
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save drafts.",
        variant: "destructive",
      });
      return;
    }

    const data = form.getValues();
    
    try {
      const { error } = await supabase
        .from('stories')
        .insert({
          user_id: user.id,
          title: data.title || 'Untitled Draft',
          content: data.content || '',
          emotion_tags: data.mood ? [data.mood] : [],
          privacy: data.isAnonymous ? 'anonymous' : 'public',
          category: data.category || 'other',
          is_anonymous: data.isAnonymous,
          is_draft: true,
        });

      if (error) throw error;

      toast({
        title: "Draft saved 💾",
        description: "Your story has been saved as a draft.",
      });
    } catch (error) {
      console.error('Error saving draft:', error);
      toast({
        title: "Error saving draft",
        description: "Could not save your draft. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (showPreview) {
    const formData = form.getValues();
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-playfair font-bold text-womb-softwhite">Story Preview</h2>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowPreview(false)}
            className="border-womb-warmgrey text-womb-warmgrey hover:bg-womb-warmgrey hover:text-womb-charcoal"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>
        
        <div className="story-card p-6">
          {formData.coverImage && (
            <img
              src={formData.coverImage}
              alt="Cover"
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          )}
          
          <div className="space-y-4">
            <h1 className="text-xl font-playfair font-semibold text-womb-softwhite">
              {formData.title || 'Untitled Story'}
            </h1>
            
            {formData.mood && (
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-womb-plum/20 text-womb-plum rounded-full text-sm">
                  {formData.mood}
                </span>
                {formData.isAnonymous && (
                  <span className="px-3 py-1 bg-womb-warmgrey/20 text-womb-warmgrey rounded-full text-sm">
                    Anonymous
                  </span>
                )}
              </div>
            )}
            
            <div className="prose prose-invert max-w-none">
              <p className="text-womb-softwhite whitespace-pre-wrap leading-relaxed">
                {formData.content || 'No content yet...'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
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
            onClick={form.handleSubmit(onSubmit)}
            disabled={isSaving}
            className="btn-primary"
          >
            <Send className="w-4 h-4 mr-2" />
            {isSaving ? 'Sharing...' : 'Share Story'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-womb-softwhite text-base">Story Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Give your story a meaningful title..."
                    className="bg-womb-deepgrey border-womb-deepgrey text-womb-softwhite placeholder-womb-warmgrey focus:border-womb-crimson h-12"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Cover Image */}
          <FormField
            control={form.control}
            name="coverImage"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CoverImageUpload
                    imageUrl={field.value}
                    onImageChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-womb-softwhite text-base">Category</FormLabel>
                <FormControl>
                  <select
                    className="w-full h-12 rounded-md border border-womb-deepgrey bg-womb-deepgrey px-3 py-2 text-base text-womb-softwhite focus:border-womb-crimson focus:outline-none"
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

          {/* Mood Selector */}
          <FormField
            control={form.control}
            name="mood"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <MoodSelector
                    selectedMood={field.value}
                    onMoodChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Rich Text Editor */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-womb-softwhite text-base">Your Story</FormLabel>
                <FormControl>
                  <RichTextEditor
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Share your experience, thoughts, or advice. Use markdown formatting and emojis to express yourself..."
                  />
                </FormControl>
                <div className="flex justify-between text-sm text-womb-warmgrey">
                  <span>{field.value.length}/5000 characters</span>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* Privacy Toggle */}
          <FormField
            control={form.control}
            name="isAnonymous"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border border-womb-deepgrey p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-womb-softwhite text-base font-medium">
                    Post Anonymously
                  </FormLabel>
                  <p className="text-womb-warmgrey text-sm">
                    Your username won't be shown with this story
                  </p>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3 pt-6 border-t border-womb-deepgrey md:flex-row md:space-y-0 md:space-x-4">
            <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-3">
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
                onClick={() => setShowPreview(true)}
                className="border-womb-warmgrey text-womb-warmgrey hover:bg-womb-warmgrey hover:text-womb-charcoal"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </div>
            
            <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-3 md:ml-auto">
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

export default EnhancedStoryForm;
