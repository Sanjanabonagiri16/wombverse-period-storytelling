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
  const [authStatus, setAuthStatus] = useState<'checking' | 'authenticated' | 'not-authenticated'>('checking');
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

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      console.log('StoryCreationForm: Checking authentication status...');
      const { data: { session }, error } = await supabase.auth.getSession();
      
      console.log('StoryCreationForm: Session data:', session);
      console.log('StoryCreationForm: Auth error:', error);
      console.log('StoryCreationForm: User from context:', user);
      
      setAuthStatus(session ? 'authenticated' : 'not-authenticated');
      
      if (session) {
        console.log('StoryCreationForm: User is authenticated:', session.user.email);
      } else {
        console.log('StoryCreationForm: No active session found');
      }
    };
    checkAuth();
  }, [user]);

  const testAuthentication = async () => {
    console.log('Testing authentication...');
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      console.log('Current session:', session);
      console.log('Current user:', user);
      
      if (error) {
        console.error('Authentication test failed:', error);
        toast({
          title: "Authentication Error",
          description: `Auth test failed: ${error.message}`,
          variant: "destructive",
        });
      } else if (!session) {
        console.log('No active session found');
        toast({
          title: "Not Signed In",
          description: "You need to sign in to share stories.",
          variant: "destructive",
        });
      } else {
        console.log('Authentication test successful');
        toast({
          title: "Authentication OK",
          description: `Signed in as: ${session.user.email}`,
        });
      }
    } catch (err) {
      console.error('Authentication test error:', err);
    }
  };

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
      
      // First, let's test if we can connect to the database
      const { data: testData, error: testError } = await supabase
        .from('stories')
        .select('count')
        .limit(1);
      
      if (testError) {
        console.error('StoryCreationForm: Database connection test failed:', testError);
        throw new Error(`Database connection failed: ${testError.message}`);
      }
      
      console.log('StoryCreationForm: Database connection test successful');
      
      const { data: insertedStory, error } = await supabase
        .from('stories')
        .insert(storyData)
        .select('*');

      console.log('StoryCreationForm: Supabase response:', { insertedStory, error });

      if (error) {
        console.error('StoryCreationForm: Supabase error:', error);
        
        // Provide more specific error messages
        if (error.code === '42501') {
          throw new Error('Permission denied. Please check if you are signed in and have the right permissions.');
        } else if (error.code === '23505') {
          throw new Error('A story with this title already exists. Please choose a different title.');
        } else if (error.code === '23514') {
          throw new Error('Invalid data provided. Please check your story content and try again.');
        } else {
          throw new Error(`Database error: ${error.message}`);
        }
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
        throw new Error('No story was inserted. Please try again.');
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
      {/* Status Indicator */}
      <div className="p-3 bg-womb-deepgrey rounded-lg border border-womb-plum">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            authStatus === 'checking' ? 'bg-yellow-500 animate-pulse' :
            authStatus === 'authenticated' ? 'bg-green-500' : 'bg-red-500'
          }`}></div>
          <span className="text-womb-softwhite text-sm">
            {authStatus === 'checking' ? 'Checking authentication...' :
             authStatus === 'authenticated' ? `Signed in as: ${user?.email || 'User'}` :
             'Not signed in - Please sign in to share stories'}
          </span>
        </div>
      </div>

      {/* Sign In Prompt */}
      {authStatus === 'not-authenticated' && (
        <div className="p-4 bg-womb-crimson/20 border border-womb-crimson rounded-lg">
          <div className="text-center">
            <h3 className="text-womb-softwhite font-medium mb-2">Sign In Required</h3>
            <p className="text-womb-warmgrey text-sm mb-4">
              You need to sign in to share your story with the community.
            </p>
            <button
              onClick={() => navigate('/auth')}
              className="px-4 py-2 bg-womb-crimson text-womb-softwhite rounded hover:bg-womb-crimson/80 transition-colors"
            >
              Go to Sign In
            </button>
          </div>
        </div>
      )}

      {/* Debug Test Buttons - Remove these after testing */}
      <div className="p-4 bg-womb-deepgrey rounded-lg border border-womb-plum">
        <h3 className="text-womb-softwhite font-medium mb-3">Debug Tools</h3>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={testAuthentication}
            className="px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            Test Authentication
          </button>
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
        
        {/* Troubleshooting Guide */}
        <div className="mt-4 p-3 bg-womb-charcoal rounded border border-womb-plum">
          <h4 className="text-womb-softwhite font-medium mb-2">Troubleshooting Guide</h4>
          <div className="text-xs text-womb-warmgrey space-y-1">
            <p>1. <strong>Test Authentication</strong> - Check if you're signed in</p>
            <p>2. <strong>Test Database Connection</strong> - Verify database access</p>
            <p>3. <strong>Test Story Creation</strong> - Try creating a test story</p>
            <p>4. <strong>Test Form Validation</strong> - Check if form data is valid</p>
            <p>5. <strong>Check Console</strong> - Open browser dev tools (F12) for error details</p>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 lg:space-y-6">
          {!showPreview ? (
            <StoryFormFields form={form} disabled={authStatus !== 'authenticated'} />
          ) : (
            <StoryPreview story={getStoryPreviewData()} />
          )}

          <StoryFormActions
            isSaving={isSaving}
            showPreview={showPreview}
            onSaveDraft={saveDraft}
            onTogglePreview={() => setShowPreview(!showPreview)}
            disabled={authStatus !== 'authenticated'}
          />
        </form>
      </Form>
    </div>
  );
};

export default StoryCreationForm;
