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

const fetchSupportResources = async (): Promise<ExternalResource[]> => {
  const { data, error } = await supabase
    .from('external_resources')
    .select('id, name, description, url')
    .eq('focus', 'Support');

  if (error) {
    console.error('Error fetching support resources:', error);
    throw new Error('Failed to fetch support resources');
  }
  return data || [];
};

const defaultSupportResources: ExternalResource[] = [
  {
    id: 'planned-parenthood',
    name: 'Planned Parenthood',
    description:
      'Provides reproductive health care, sexual education, and general health services to millions of people worldwide. They offer confidential support and resources for a range of health needs.',
    url: 'https://www.plannedparenthood.org/',
  },
  {
    id: 'suicide-lifeline',
    name: '988 Suicide & Crisis Lifeline',
    description:
      '24/7, free and confidential support for people in distress, prevention and crisis resources. Call or text 988 to reach the lifeline.',
    url: 'https://988lifeline.org/',
  },
  {
    id: 'period-org',
    name: 'PERIOD.',
    description:
      'A global youth-powered nonprofit focused on eliminating period poverty and stigma through service, education, and advocacy.',
    url: 'https://period.org/',
  },
  {
    id: 'samaritans',
    name: 'Samaritans (UK & Ireland)',
    description:
      'Provides confidential emotional support for people who are experiencing feelings of distress. Free helpline available 24/7.',
    url: 'https://www.samaritans.org/',
  },
  {
    id: 'menstrual-health-hub',
    name: 'Menstrual Health Hub',
    description:
      'A worldwide network and digital platform connecting people, organizations, and companies within the menstrual health space.',
    url: 'https://mhhub.org/',
  },
];

const Support = () => {
  const { data: resources, isLoading, isError, error } = useQuery<ExternalResource[], Error>({
    queryKey: ['supportResources'],
    queryFn: fetchSupportResources,
  });

  const showFallback =
    isError || (resources && Array.isArray(resources) && resources.length === 0);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold text-womb-mediumgray mb-4 font-playfair">Support Resources</h1>
        <p className="text-womb-secondarytext mb-8">
          If you need help or support, these organizations provide reliable, confidential assistance in areas of menstrual, reproductive, and mental health. This list includes both current US and international resources.
        </p>

        {isLoading && (
          <ul className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <li key={i} className="bg-womb-darkgray border border-womb-border rounded-lg p-6">
                <Skeleton className="h-6 w-1/2 mb-2" />
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-4 w-1/4" />
              </li>
            ))}
          </ul>
        )}

        {showFallback && (
          <ul className="space-y-6">
            {defaultSupportResources.map((r) => (
              <li key={r.id} className="bg-womb-darkgray border border-womb-border rounded-lg p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-womb-softgray/20">
                <h2 className="font-bold text-womb-lightgray text-lg">{r.name}</h2>
                <p className="text-womb-secondarytext">{r.description}</p>
                <a
                  className="mt-2 inline-block text-womb-mediumgray hover:underline"
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn more
                </a>
              </li>
            ))}
          </ul>
        )}

        {resources && resources.length > 0 && !isLoading && !isError && (
          <ul className="space-y-6">
            {resources.map((r) => (
              <li key={r.id} className="bg-womb-darkgray border border-womb-border rounded-lg p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-womb-softgray/20">
                <h2 className="font-bold text-womb-lightgray text-lg">{r.name}</h2>
                <p className="text-womb-secondarytext">{r.description}</p>
                <a className="mt-2 inline-block text-womb-mediumgray hover:underline" href={r.url} target="_blank" rel="noopener noreferrer">
                  Learn more
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
};

export default Support;
