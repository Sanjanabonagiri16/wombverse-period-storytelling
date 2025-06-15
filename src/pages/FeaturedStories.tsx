
import Layout from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface Story {
  id: string;
  title: string;
  content: string;
  created_at: string;
  is_anonymous: boolean;
  user_id: string;
  profiles?: {
    display_name: string;
  } | null;
}

const fetchFeaturedStories = async (): Promise<Story[]> => {
  const { data: storiesData, error } = await supabase
    .from('stories')
    .select('id, title, content, created_at, is_anonymous, user_id')
    .eq('is_draft', false)
    .order('view_count', { ascending: false })
    .limit(3);

  if (error) {
    console.error('Error fetching featured stories:', error);
    throw new Error('Failed to fetch featured stories');
  }

  if (!storiesData) return [];

  const stories: Story[] = [];
  for (const story of storiesData) {
    let profileData = null;
    if (!story.is_anonymous) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('display_name')
        .eq('id', story.user_id)
        .single();
      profileData = profile;
    }
    stories.push({ ...story, profiles: profileData });
  }

  return stories;
};

const FeaturedStories = () => {
  const { data: stories, isLoading, isError, error } = useQuery<Story[], Error>({
    queryKey: ['featuredStories'],
    queryFn: fetchFeaturedStories,
  });

  const createExcerpt = (content: string) => {
    if (content.length > 150) {
      return `${content.substring(0, 150)}...`;
    }
    return content;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold text-primary mb-4 font-playfair">Featured Stories</h1>
        <p className="text-womb-warmgrey mb-8">
          Powerful, real stories from our community—honest, moving, and inspiring.
        </p>

        {isLoading && (
          <div className="space-y-8">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="bg-womb-deepgrey p-6 rounded-lg shadow-md border border-womb-plum">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-full mb-3" />
                <div className="mt-3 flex justify-between">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {isError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Could not load featured stories. Please try again later.
              {error?.message && <p className="mt-2 text-xs">{error.message}</p>}
            </AlertDescription>
          </Alert>
        )}

        {stories && !isLoading && !isError && (
          <div className="space-y-8">
            {stories.map((story) => (
              <article key={story.id} className="bg-womb-deepgrey p-6 rounded-lg shadow-md border border-womb-plum">
                <h2 className="text-xl font-semibold text-womb-softwhite font-playfair mb-2">{story.title}</h2>
                <p className="text-womb-warmgrey">{createExcerpt(story.content)}</p>
                <div className="mt-3 flex justify-between text-xs text-gray-500">
                  <span>By {story.is_anonymous ? 'Anonymous' : story.profiles?.display_name || 'User'}</span>
                  <span>{new Date(story.created_at).toLocaleDateString()}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FeaturedStories;
