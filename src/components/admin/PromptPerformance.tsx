
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Lightbulb, TrendingUp, Users, Clock } from 'lucide-react';

interface PromptData {
  id: string;
  prompt: string;
  submissions: number;
  engagement_rate: number;
  emotional_range: number;
  avg_story_length: number;
  performance_score: number;
  created_at: string;
}

const PromptPerformance = () => {
  const [prompts, setPrompts] = useState<PromptData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPromptPerformance();
  }, []);

  const fetchPromptPerformance = async () => {
    setLoading(true);
    try {
      // Simulate prompt performance data
      const mockPrompts: PromptData[] = [
        {
          id: '1',
          prompt: 'Write about a moment when you found unexpected strength',
          submissions: 45,
          engagement_rate: 78,
          emotional_range: 85,
          avg_story_length: 450,
          performance_score: 92,
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          prompt: 'Describe a time when someone\'s kindness changed your day',
          submissions: 38,
          engagement_rate: 82,
          emotional_range: 72,
          avg_story_length: 380,
          performance_score: 88,
          created_at: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: '3',
          prompt: 'Share a lesson you learned from a difficult experience',
          submissions: 52,
          engagement_rate: 75,
          emotional_range: 90,
          avg_story_length: 520,
          performance_score: 85,
          created_at: new Date(Date.now() - 172800000).toISOString()
        },
        {
          id: '4',
          prompt: 'Tell us about a place that makes you feel at peace',
          submissions: 29,
          engagement_rate: 65,
          emotional_range: 60,
          avg_story_length: 320,
          performance_score: 68,
          created_at: new Date(Date.now() - 259200000).toISOString()
        }
      ];

      setPrompts(mockPrompts.sort((a, b) => b.performance_score - a.performance_score));
    } catch (error) {
      console.error('Error fetching prompt performance:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 85) return 'bg-green-900/30 text-green-200 border-green-700/50';
    if (score >= 70) return 'bg-yellow-900/30 text-yellow-200 border-yellow-700/50';
    return 'bg-red-900/30 text-red-200 border-red-700/50';
  };

  const getPerformanceLabel = (score: number) => {
    if (score >= 85) return 'Excellent';
    if (score >= 70) return 'Good';
    return 'Needs Improvement';
  };

  if (loading) {
    return (
      <Card className="bg-gray-900/50 border-gray-800">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-800 rounded w-1/3"></div>
            <div className="space-y-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-20 bg-gray-800 rounded"></div>
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
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            Prompt Performance Tracking
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-800/30">
              <div className="text-xl font-bold text-blue-300">
                {prompts.reduce((sum, p) => sum + p.submissions, 0)}
              </div>
              <div className="text-sm text-blue-400">Total Submissions</div>
            </div>
            <div className="bg-green-900/20 p-4 rounded-lg border border-green-800/30">
              <div className="text-xl font-bold text-green-300">
                {Math.round(prompts.reduce((sum, p) => sum + p.engagement_rate, 0) / prompts.length)}%
              </div>
              <div className="text-sm text-green-400">Avg Engagement</div>
            </div>
            <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-800/30">
              <div className="text-xl font-bold text-purple-300">
                {Math.round(prompts.reduce((sum, p) => sum + p.emotional_range, 0) / prompts.length)}%
              </div>
              <div className="text-sm text-purple-400">Emotional Range</div>
            </div>
            <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-800/30">
              <div className="text-xl font-bold text-yellow-300">
                {prompts.filter(p => p.performance_score >= 85).length}
              </div>
              <div className="text-sm text-yellow-400">Top Performers</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-medium">Prompt Performance Analysis</h4>
              <Button
                size="sm"
                variant="outline"
                className="border-gray-700 text-gray-300"
              >
                Export Data
              </Button>
            </div>

            {prompts.map((prompt, index) => (
              <Card key={prompt.id} className="bg-black/50 border-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-yellow-400 font-bold">#{index + 1}</span>
                        <Badge className={getPerformanceColor(prompt.performance_score)}>
                          {getPerformanceLabel(prompt.performance_score)}
                        </Badge>
                        <span className="text-gray-500 text-sm">
                          {new Date(prompt.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm mb-3 italic">
                        "{prompt.prompt}"
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold text-lg">{prompt.performance_score}</div>
                      <div className="text-gray-400 text-xs">Score</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-400" />
                      <div>
                        <div className="text-white text-sm font-medium">{prompt.submissions}</div>
                        <div className="text-gray-400 text-xs">Submissions</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <div>
                        <div className="text-white text-sm font-medium">{prompt.engagement_rate}%</div>
                        <div className="text-gray-400 text-xs">Engagement</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-purple-400" />
                      <div>
                        <div className="text-white text-sm font-medium">{prompt.avg_story_length}</div>
                        <div className="text-gray-400 text-xs">Avg Length</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-yellow-400" />
                      <div>
                        <div className="text-white text-sm font-medium">{prompt.emotional_range}%</div>
                        <div className="text-gray-400 text-xs">Emotion Range</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Performance Score</span>
                      <span className="text-gray-300">{prompt.performance_score}/100</span>
                    </div>
                    <Progress value={prompt.performance_score} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PromptPerformance;
