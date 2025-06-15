import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const StoryImpactTracker = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImpactData = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('stories')
          .select('id, title, reactions, bookmarks, rereads');

        if (!error && data) {
          setData(data);
        }
      } catch (error) {
        // handle error
      } finally {
        setLoading(false);
      }
    };

    fetchImpactData();
  }, []);

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader className="flex flex-row items-center gap-2">
        <Star className="w-5 h-5 text-yellow-300" />
        <CardTitle className="text-white">Story Impact Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className="text-gray-300 text-sm">
            Highlights stories that moved the community based on engagement.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-200">
              <thead>
                <tr>
                  <th className="px-2 py-1 text-left">Story</th>
                  <th className="px-2 py-1 text-center">Reactions</th>
                  <th className="px-2 py-1 text-center">Bookmarks</th>
                  <th className="px-2 py-1 text-center">Re-reads</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4">Loading...</td>
                  </tr>
                ) : (
                  data.map((story) => (
                    <tr key={story.id}>
                      {/* Removing display_name to fix type error */}
                      <td className="px-2 py-1">{story.title ?? 'Untitled'}</td>
                      <td className="px-2 py-1 text-center">{story.reactions ?? 0}</td>
                      <td className="px-2 py-1 text-center">{story.bookmarks ?? 0}</td>
                      <td className="px-2 py-1 text-center">{story.rereads ?? 0}</td>
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
