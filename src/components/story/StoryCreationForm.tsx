import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
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

  const testFormValidation = () => {
    const formData = form.getValues();
    console.log('Current form data:', formData);
    
    const validationResult = storySchema.safeParse(formData);
    console.log('Form validation result:', validationResult);
    
    if (validationResult.success) {
      toast({
        title: "Form Valid",
        description: "All form fields are valid!",
      });
    } else {
      console.log('Validation errors:', validationResult.error.errors);
      toast({
        title: "Form Invalid",
        description: `Validation errors: ${validationResult.error.errors.map(e => e.message).join(', ')}`,
        variant: "destructive",
      });
    }
  };

  const testDatabaseConnection = async () => {
    console.log('Testing database connection...');
    try {
      // Test if we can query the stories table
      const { data, error } = await supabase
        .from('stories')
        .select('count')
        .limit(1);
      
      console.log('Database connection test result:', { data, error });
      
      if (error) {
        console.error('Database connection failed:', error);
        toast({
          title: "Database Error",
          description: `Connection failed: ${error.message}`,
          variant: "destructive",
        });
      } else {
        console.log('Database connection successful');
        toast({
          title: "Database Connected",
          description: "Successfully connected to the database.",
        });
      }
    } catch (err) {
      console.error('Database test error:', err);
    }
  };

  const testStoryCreation = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to test story creation.",
        variant: "destructive",
      });
      return;
    }

    console.log('Testing story creation...');
    try {
      const testStory = {
        user_id: user.id,
        title: 'Test Story - ' + new Date().toISOString(),
        content: 'This is a test story to verify database permissions.',
        emotion_tags: ['empowering'],
        privacy: 'public',
        category: 'other',
        is_anonymous: false,
        is_draft: false,
      };
      
      console.log('Test story data:', testStory);
      
      const { data: insertedStory, error } = await supabase
        .from('stories')
        .insert(testStory)
        .select('*');
      
      console.log('Test story creation result:', { insertedStory, error });
      
      if (error) {
        console.error('Test story creation failed:', error);
        toast({
          title: "Test Failed",
          description: `Could not create test story: ${error.message}`,
          variant: "destructive",
        });
      } else {
        console.log('Test story created successfully:', insertedStory);
        toast({
          title: "Test Successful",
          description: "Test story created successfully!",
        });
        
        // Clean up the test story
        if (insertedStory && insertedStory[0]) {
          await supabase
            .from('stories')
            .delete()
            .eq('id', insertedStory[0].id);
          console.log('Test story cleaned up');
        }
      }
    } catch (err) {
      console.error('Test story creation error:', err);
    }
  };

  const onSubmit = async (data: StoryFormData) => {
    console.log('StoryCreationForm: Form submitted with data:', data);
    console.log('StoryCreationForm: Current user:', user);
    
    if (!user) {
      console.log('StoryCreationForm: No user found, showing auth error');
      toast({
        title: "Authentication required",
        description: "Please sign in to share your story.",
        variant: "destructive",
      });
      return;
    }

    // Validate required fields
    if (!data.title || !data.content || !data.category || data.emotionTags.length === 0) {
      console.log('StoryCreationForm: Missing required fields:', {
        title: !!data.title,
        content: !!data.content,
        category: !!data.category,
        emotionTags: data.emotionTags.length
      });
      toast({
        title: "Missing information",
        description: "Please fill in all required fields including title, content, category, and emotion tags.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      const storyData = {
        user_id: user.id,
        title: data.title.trim(),
        content: data.content.trim(),
        emotion_tags: data.emotionTags,
        privacy: data.privacy,
        category: data.category,
        is_anonymous: data.isAnonymous,
        is_draft: false,
      };
      
      console.log('StoryCreationForm: Attempting to insert story with data:', storyData);
      
      const { data: insertedStory, error } = await supabase
        .from('stories')
        .insert(storyData)
        .select('*');

      console.log('StoryCreationForm: Supabase response:', { insertedStory, error });

      if (error) {
        console.error('StoryCreationForm: Supabase error:', error);
        throw error;
      }
      
      if (insertedStory && insertedStory.length > 0) {
        console.log('StoryCreationForm: Story created successfully:', insertedStory[0]);
        
        toast({
          title: "Story shared successfully!",
          description: "Thank you for sharing your experience with the community.",
        });
        
        // Clear the form
        form.reset();
        
        // Navigate to stories page to see the new story
        navigate('/stories');
      } else {
        throw new Error('No story was inserted');
      }
    } catch (error) {
      console.error('StoryCreationForm: Error sharing story:', error);
      
      let errorMessage = "Something went wrong. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Error sharing story",
        description: errorMessage,
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
          emotion_tags: data.emotionTags,
          privacy: data.privacy,
          category: data.category || 'other',
          is_anonymous: data.isAnonymous,
          is_draft: true,
        });

      if (error) throw error;

      toast({
        title: "Draft saved",
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
    <div className="space-y-6 lg:space-y-8">
      {/* Debug Test Buttons - Remove these after testing */}
      <div className="p-4 bg-womb-deepgrey rounded-lg border border-womb-plum">
        <h3 className="text-womb-softwhite font-medium mb-3">Debug Tools</h3>
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={testDatabaseConnection}
            className="px-3 py-2 bg-womb-crimson text-white rounded text-sm hover:bg-womb-crimson/80"
          >
            Test Database Connection
          </button>
          <button
            type="button"
            onClick={testStoryCreation}
            className="px-3 py-2 bg-womb-plum text-white rounded text-sm hover:bg-womb-plum/80"
          >
            Test Story Creation
          </button>
          <button
            type="button"
            onClick={testFormValidation}
            className="px-3 py-2 bg-womb-warmgrey text-white rounded text-sm hover:bg-womb-warmgrey/80"
          >
            Test Form Validation
          </button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 lg:space-y-6">
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
