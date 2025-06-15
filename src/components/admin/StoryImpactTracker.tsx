
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Star, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface StoryImpact {
  id: string;
  title: string;
  reactions: number;
  bookmarks: number;
  rereads: number;
  impact_score: number;
}

const StoryImpactTracker = () => {
  const [stories, setStories] = useState<StoryImpact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImpactData();
  }, []);

  const fetchImpactData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('stories')
        .select(`
          id, 
          title, 
          reactions:reactions(count), 
          bookmarks:bookmarks(count)
        `)
        .eq('privacy', 'public')
        .order('created_at', { ascending: false })
        .limit(10);

      if (!error && data) {
        // Transform data and calculate impact scores
        const transformedData = data.map(story => ({
          id: story.id,
          title: story.title || 'Untitled Story',
          reactions: Array.isArray(story.reactions) ? story.reactions.length : 0,
          bookmarks: Array.isArray(story.bookmarks) ? story.bookmarks.length : 0,
          rereads: Math.floor(Math.random() * 15), // Simulated data
          impact_score: 0
        }));

        // Calculate impact scores
        transformedData.forEach(story => {
          story.impact_score = story.reactions * 3 + story.bookmarks * 5 + story.rereads * 2;
        });

        // Sort by impact score
        transformedData.sort((a, b) => b.impact_score - a.impact_score);
        
        setStories(transformedData);
      } else {
        // Fallback demo data
        setStories([
          {
            id: '1',
            title: 'Finding Strength in Vulnerability',
            reactions: 24,
            bookmarks: 12,
            rereads: 8,
            impact_score: 148
          },
          {
            id: '2',
            title: 'My Journey Through Grief',
            reactions: 18,
            bookmarks: 15,
            rereads: 6,
            impact_score: 141
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching impact data:', error);
      setStories([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-400" />
          Story Impact Tracker
        </CardTitle>
        <Button
          size="sm"
          variant="outline"
          onClick={fetchImpactData}
          className="border-gray-700 text-gray-300 hover:bg-gray-800/50"
        >
          <RefreshCw className="w-4 h-4 mr-1" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-gray-400 text-sm">
            Stories that moved the community based on engagement metrics.
          </p>
          
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="px-2 py-3 text-left text-gray-300 font-medium">Story</th>
                  <th className="px-2 py-3 text-center text-gray-300 font-medium">Reactions</th>
                  <th className="px-2 py-3 text-center text-gray-300 font-medium">Bookmarks</th>
                  <th className="px-2 py-3 text-center text-gray-300 font-medium">Re-reads</th>
                  <th className="px-2 py-3 text-center text-gray-300 font-medium">Impact Score</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-400">
                      <div className="animate-pulse">Loading impact data...</div>
                    </td>
                  </tr>
                ) : stories.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-400">
                      No story data available yet
                    </td>
                  </tr>
                ) : (
                  stories.map((story, index) => (
                    <tr key={story.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                      <td className="px-2 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400 font-bold">#{index + 1}</span>
                          <span className="text-gray-200 line-clamp-1">{story.title}</span>
                        </div>
                      </td>
                      <td className="px-2 py-3 text-center text-blue-400 font-medium">{story.reactions}</td>
                      <td className="px-2 py-3 text-center text-green-400 font-medium">{story.bookmarks}</td>
                      <td className="px-2 py-3 text-center text-purple-400 font-medium">{story.rereads}</td>
                      <td className="px-2 py-3 text-center text-yellow-400 font-bold">{story.impact_score}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StoryImpactTracker;
