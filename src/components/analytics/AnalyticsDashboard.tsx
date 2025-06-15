
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, MessageCircle, Heart, Flag } from 'lucide-react';

interface AnalyticsData {
  dailyStats: any[];
  reactionStats: any[];
  moodStats: any[];
  contentStats: {
    totalStories: number;
    totalComments: number;
    totalReactions: number;
    flaggedContent: number;
  };
}

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    dailyStats: [],
    reactionStats: [],
    moodStats: [],
    contentStats: {
      totalStories: 0,
      totalComments: 0,
      totalReactions: 0,
      flaggedContent: 0
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Fetch content stats
      const [storiesResult, commentsResult, reactionsResult, flaggedResult] = await Promise.all([
        supabase.from('stories').select('id', { count: 'exact' }),
        supabase.from('comments').select('id', { count: 'exact' }),
        supabase.from('reactions').select('id', { count: 'exact' }),
        supabase.from('content_moderation').select('id', { count: 'exact' })
      ]);

      // Fetch reaction stats
      const { data: reactionData } = await supabase
        .from('reactions')
        .select('type')
        .order('created_at', { ascending: false });

      const reactionCounts = reactionData?.reduce((acc: any, reaction) => {
        acc[reaction.type] = (acc[reaction.type] || 0) + 1;
        return acc;
      }, {}) || {};

      const reactionStats = Object.entries(reactionCounts).map(([type, count]) => ({
        type,
        count
      }));

      // Fetch daily stats for the last 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const { data: dailyStoryData } = await supabase
        .from('stories')
        .select('created_at')
        .gte('created_at', sevenDaysAgo.toISOString());

      const dailyStats = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        const count = dailyStoryData?.filter(story => 
          story.created_at.startsWith(dateStr)
        ).length || 0;

        return {
          date: date.toLocaleDateString('en-US', { weekday: 'short' }),
          stories: count
        };
      }).reverse();

      // Fetch mood stats
      const { data: moodData } = await supabase
        .from('mood_tags')
        .select(`
          name,
          story_moods(count)
        `);

      const moodStats = moodData?.map(mood => ({
        mood: mood.name,
        count: mood.story_moods?.length || 0
      })).filter(item => item.count > 0) || [];

      setAnalytics({
        dailyStats,
        reactionStats,
        moodStats,
        contentStats: {
          totalStories: storiesResult.count || 0,
          totalComments: commentsResult.count || 0,
          totalReactions: reactionsResult.count || 0,
          flaggedContent: flaggedResult.count || 0
        }
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#EF4444', '#06B6D4'];

  if (loading) {
    return <div className="p-6">Loading analytics...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-2">
        <TrendingUp className="w-6 h-6 text-womb-plum" />
        <h1 className="text-2xl font-bold text-womb-softwhite">Analytics Dashboard</h1>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5 text-womb-plum" />
              <div>
                <div className="text-2xl font-bold text-womb-softwhite">
                  {analytics.contentStats.totalStories}
                </div>
                <div className="text-sm text-womb-warmgrey">Total Stories</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-womb-crimson" />
              <div>
                <div className="text-2xl font-bold text-womb-softwhite">
                  {analytics.contentStats.totalComments}
                </div>
                <div className="text-sm text-womb-warmgrey">Total Comments</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-pink-500" />
              <div>
                <div className="text-2xl font-bold text-womb-softwhite">
                  {analytics.contentStats.totalReactions}
                </div>
                <div className="text-sm text-womb-warmgrey">Total Reactions</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Flag className="w-5 h-5 text-yellow-500" />
              <div>
                <div className="text-2xl font-bold text-womb-softwhite">
                  {analytics.contentStats.flaggedContent}
                </div>
                <div className="text-sm text-womb-warmgrey">Flagged Content</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="daily">Daily Activity</TabsTrigger>
          <TabsTrigger value="reactions">Reactions</TabsTrigger>
          <TabsTrigger value="moods">Moods</TabsTrigger>
        </TabsList>

        <TabsContent value="daily">
          <Card>
            <CardHeader>
              <CardTitle className="text-womb-softwhite">Daily Story Submissions (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics.dailyStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="stories" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reactions">
          <Card>
            <CardHeader>
              <CardTitle className="text-womb-softwhite">Reaction Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analytics.reactionStats}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ type, percent }) => `${type} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {analytics.reactionStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="moods">
          <Card>
            <CardHeader>
              <CardTitle className="text-womb-softwhite">Popular Moods</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics.moodStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mood" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#EC4899" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;
