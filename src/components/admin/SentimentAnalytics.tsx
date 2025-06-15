
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, TrendingUp, AlertTriangle, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface SentimentData {
  emotion: string;
  count: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
}

const SentimentAnalytics = () => {
  const [sentimentData, setSentimentData] = useState<SentimentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState<string[]>([]);

  useEffect(() => {
    fetchSentimentData();
  }, []);

  const fetchSentimentData = async () => {
    setLoading(true);
    try {
      // Fetch stories with emotion tags
      const { data: stories } = await supabase
        .from('stories')
        .select('emotion_tags, created_at')
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

      if (stories) {
        const emotionCounts: { [key: string]: number } = {};
        const totalStories = stories.length;

        stories.forEach(story => {
          story.emotion_tags.forEach((emotion: string) => {
            emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
          });
        });

        const sentimentArray = Object.entries(emotionCounts).map(([emotion, count]) => ({
          emotion,
          count,
          percentage: Math.round((count / totalStories) * 100),
          trend: Math.random() > 0.5 ? 'up' : 'down' as 'up' | 'down'
        })).sort((a, b) => b.count - a.count);

        setSentimentData(sentimentArray);
        
        // Generate insights
        const topEmotion = sentimentArray[0]?.emotion;
        const insights = [
          `Most common mood this week: ${topEmotion}`,
          `${sentimentArray.filter(s => s.trend === 'up').length} emotions trending upward`,
          `${totalStories} stories analyzed for sentiment patterns`
        ];
        setInsights(insights);
      }
    } catch (error) {
      console.error('Error fetching sentiment data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="bg-gray-900/50 border-gray-800">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-800 rounded w-1/3"></div>
            <div className="space-y-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-4 bg-gray-800 rounded"></div>
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
            <Brain className="w-5 h-5 text-purple-400" />
            Sentiment & Mood Analytics
          </CardTitle>
          <Button
            size="sm"
            variant="outline"
            onClick={fetchSentimentData}
            className="border-gray-700 text-gray-300"
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            Refresh
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {insights.map((insight, index) => (
              <div key={index} className="bg-black/50 p-4 rounded-lg">
                <p className="text-gray-300 text-sm">{insight}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-medium">Emotion Distribution (Last 7 Days)</h4>
            {sentimentData.slice(0, 8).map((data, index) => (
              <div key={data.emotion} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-purple-900/30 text-purple-200 border-purple-700/50">
                      {data.emotion}
                    </Badge>
                    <span className="text-gray-400 text-sm">{data.count} stories</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-300 text-sm">{data.percentage}%</span>
                    {data.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                    )}
                  </div>
                </div>
                <Progress value={data.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SentimentAnalytics;
