
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import StoryFormFields from './StoryFormFields';
import StoryFormActions from './StoryFormActions';
import StoryPreview from './StoryPreview';

const storySchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  content: z.string().min(10, 'Story must be at least 10 characters').max(5000, 'Story must be less than 5000 characters'),
  emotionTags: z.array(z.string()).min(1, 'Please select at least one emotion tag'),
  privacy: z.enum(['public', 'community', 'anonymous']),
  category: z.string().min(1, 'Please select a category'),
  isAnonymous: z.boolean(),
});

export type StoryFormData = z.infer<typeof storySchema>;

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
      title: formData.title,
      content: formData.content,
      emotionTags: formData.emotionTags,
      privacy: formData.privacy,
      category: formData.category,
      isAnonymous: formData.isAnonymous,
    };
  };

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {!showPreview ? (
            <StoryFormFields form={form} />
          ) : (
            <StoryPreview story={getStoryPreviewData()} />
          )}

          <StoryFormActions
            isSaving={isSaving}
            showPreview={showPreview}
            onSaveDraft={saveDraft}
            onTogglePreview={() => setShowPreview(!showPreview)}
          />
        </form>
      </Form>
    </div>
  );
};

export default StoryCreationForm;
