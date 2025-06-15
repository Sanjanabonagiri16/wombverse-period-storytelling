
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, Heart, Bookmark, Eye, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface StoryImpact {
  id: string;
  title: string;
  author: string;
  reactions: number;
  bookmarks: number;
  views: number;
  comments: number;
  impact_score: number;
  created_at: string;
}

const StoryImpactTracker = () => {
  const [impactfulStories, setImpactfulStories] = useState<StoryImpact[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'all'>('week');

  useEffect(() => {
    fetchStoryImpact();
  }, [timeRange]);

  const fetchStoryImpact = async () => {
    setLoading(true);
    try {
      // Calculate date range
      const now = new Date();
      const dateFilter = timeRange === 'week' 
        ? new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        : timeRange === 'month'
        ? new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        : new Date(0);

      // Fetch stories with engagement data
      const { data: stories } = await supabase
        .from('stories')
        .select(`
          id,
          title,
          view_count,
          created_at,
          profiles!stories_user_id_fkey(display_name)
        `)
        .gte('created_at', dateFilter.toISOString())
        .order('view_count', { ascending: false })
        .limit(20);

      if (stories) {
        // Get reactions count for each story
        const storiesWithImpact = await Promise.all(
          stories.map(async (story) => {
            const { count: reactionsCount } = await supabase
              .from('reactions')
              .select('*', { count: 'exact' })
              .eq('story_id', story.id);

            const { count: bookmarksCount } = await supabase
              .from('bookmarks')
              .select('*', { count: 'exact' })
              .eq('story_id', story.id);

            const { count: commentsCount } = await supabase
              .from('comments')
              .select('*', { count: 'exact' })
              .eq('story_id', story.id);

            // Calculate impact score
            const impact_score = 
              (reactionsCount || 0) * 3 + 
              (bookmarksCount || 0) * 5 + 
              (story.view_count || 0) * 1 + 
              (commentsCount || 0) * 4;

            return {
              id: story.id,
              title: story.title,
              author: story.profiles?.display_name || 'Anonymous',
              reactions: reactionsCount || 0,
              bookmarks: bookmarksCount || 0,
              views: story.view_count || 0,
              comments: commentsCount || 0,
              impact_score,
              created_at: story.created_at
            };
          })
        );

        setImpactfulStories(storiesWithImpact.sort((a, b) => b.impact_score - a.impact_score));
      }
    } catch (error) {
      console.error('Error fetching story impact:', error);
    } finally {
      setLoading(false);
    }
  };

  const getImpactLevel = (score: number) => {
    if (score >= 100) return { level: 'High Impact', color: 'bg-green-900/30 text-green-200 border-green-700/50' };
    if (score >= 50) return { level: 'Medium Impact', color: 'bg-yellow-900/30 text-yellow-200 border-yellow-700/50' };
    return { level: 'Growing', color: 'bg-blue-900/30 text-blue-200 border-blue-700/50' };
  };

  if (loading) {
    return (
      <Card className="bg-gray-900/50 border-gray-800">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-800 rounded w-1/3"></div>
            <div className="space-y-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-16 bg-gray-800 rounded"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400" />
            Story Impact Tracker
          </CardTitle>
          <div className="flex gap-2">
            {(['week', 'month', 'all'] as const).map((range) => (
              <Button
                key={range}
                size="sm"
                variant={timeRange === range ? "default" : "outline"}
                onClick={() => setTimeRange(range)}
                className={timeRange === range 
                  ? "bg-yellow-600 hover:bg-yellow-700" 
                  : "border-gray-700 text-gray-300"
                }
              >
                {range === 'all' ? 'All Time' : `Past ${range}`}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-green-900/20 p-4 rounded-lg border border-green-800/30">
              <div className="text-xl font-bold text-green-300">
                {impactfulStories.filter(s => s.impact_score >= 100).length}
              </div>
              <div className="text-sm text-green-400">High Impact Stories</div>
            </div>
            <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-800/30">
              <div className="text-xl font-bold text-blue-300">
                {impactfulStories.reduce((sum, story) => sum + story.reactions, 0)}
              </div>
              <div className="text-sm text-blue-400">Total Reactions</div>
            </div>
            <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-800/30">
              <div className="text-xl font-bold text-purple-300">
                {impactfulStories.reduce((sum, story) => sum + story.bookmarks, 0)}
              </div>
              <div className="text-sm text-purple-400">Total Bookmarks</div>
            </div>
            <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-800/30">
              <div className="text-xl font-bold text-yellow-300">
                {Math.round(impactfulStories.reduce((sum, story) => sum + story.impact_score, 0) / impactfulStories.length || 0)}
              </div>
              <div className="text-sm text-yellow-400">Avg Impact Score</div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-medium">Stories That Moved the Community</h4>
            {impactfulStories.slice(0, 10).map((story, index) => {
              const impactInfo = getImpactLevel(story.impact_score);
              return (
                <Card key={story.id} className="bg-black/50 border-gray-800">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-yellow-400 font-bold">#{index + 1}</span>
                          <Badge className={impactInfo.color}>
                            {impactInfo.level}
                          </Badge>
                          <span className="text-gray-500 text-sm">
                            by {story.author}
                          </span>
                        </div>
                        <h5 className="text-white font-medium mb-2 line-clamp-1">
                          {story.title}
                        </h5>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-bold text-lg">{story.impact_score}</div>
                        <div className="text-gray-400 text-xs">Impact Score</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-3">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4 text-red-400" />
                        <span className="text-gray-300 text-sm">{story.reactions}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bookmark className="w-4 h-4 text-blue-400" />
                        <span className="text-gray-300 text-sm">{story.bookmarks}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4 text-green-400" />
                        <span className="text-gray-300 text-sm">{story.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-purple-400" />
                        <span className="text-gray-300 text-sm">{story.comments}</span>
                      </div>
                    </div>

                    <Progress 
                      value={Math.min((story.impact_score / 200) * 100, 100)} 
                      className="h-2" 
                    />
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StoryImpactTracker;
