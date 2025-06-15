
import Layout from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

type ExternalResource = {
  id: string;
  name: string;
  description: string;
  url: string;
};

const fetchResources = async (): Promise<ExternalResource[]> => {
  const { data, error } = await supabase
    .from('external_resources')
    .select('id, name, description, url');

  if (error) {
    console.error('Error fetching resources:', error);
    throw new Error('Failed to fetch resources');
  }
  return data || [];
};

const Resources = () => {
  const { data: resources, isLoading, isError, error } = useQuery<ExternalResource[], Error>({
    queryKey: ['resources'],
    queryFn: fetchResources,
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold text-womb-indigo mb-4 font-playfair">Resources</h1>
        <p className="text-womb-lightgrey mb-8">
          Trusted, up-to-date resources for menstrual health education and support.
        </p>

        {isLoading && (
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-womb-darkgrey border border-womb-mediumgrey rounded-lg p-6">
                <Skeleton className="h-6 w-1/2 mb-2" />
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            ))}
          </div>
        )}

        {isError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Could not load resources. Please try again later.
              {error?.message && <p className="mt-2 text-xs">{error.message}</p>}
            </AlertDescription>
          </Alert>
        )}
        
        {resources && !isLoading && !isError && (
          <dl className="space-y-6">
            {resources.map((r) => (
              <div key={r.id} className="bg-womb-darkgrey border border-womb-mediumgrey rounded-lg p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-womb-maroon/20">
                <dt className="font-bold text-womb-white text-lg">{r.name}</dt>
                <dd className="text-womb-lightgrey">{r.description}</dd>
                <a className="mt-2 inline-block text-womb-indigo hover:underline" href={r.url} target="_blank" rel="noopener noreferrer">Visit resource</a>
              </div>
            ))}
          </dl>
        )}
      </div>
    </Layout>
  );
};

export default Resources;
