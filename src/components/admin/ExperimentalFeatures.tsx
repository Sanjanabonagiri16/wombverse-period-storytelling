
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Flask, Users, Settings, Zap, Mic, Brain } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExperimentalFeature {
  id: string;
  name: string;
  description: string;
  category: 'ai' | 'voice' | 'wellness' | 'community' | 'analytics';
  status: 'development' | 'testing' | 'beta' | 'ready';
  enabled: boolean;
  rollout_percentage: number;
  target_users: string[];
  feedback_count: number;
  success_rate: number;
}

const ExperimentalFeatures = () => {
  const { toast } = useToast();
  const [features, setFeatures] = useState<ExperimentalFeature[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperimentalFeatures();
  }, []);

  const fetchExperimentalFeatures = async () => {
    setLoading(true);
    try {
      // Simulate experimental features data
      const mockFeatures: ExperimentalFeature[] = [
        {
          id: '1',
          name: 'Voice Story Submissions',
          description: 'Allow users to submit stories using voice recordings with AI transcription',
          category: 'voice',
          status: 'testing',
          enabled: true,
          rollout_percentage: 15,
          target_users: ['beta_testers', 'accessibility_users'],
          feedback_count: 23,
          success_rate: 78
        },
        {
          id: '2',
          name: 'AI Wellness Check-ins',
          description: 'Intelligent wellness reminders and mood tracking integration',
          category: 'wellness',
          status: 'beta',
          enabled: true,
          rollout_percentage: 35,
          target_users: ['regular_users', 'premium_members'],
          feedback_count: 156,
          success_rate: 85
        },
        {
          id: '3',
          name: 'Smart Content Suggestions',
          description: 'AI-powered personalized story and prompt recommendations',
          category: 'ai',
          status: 'development',
          enabled: false,
          rollout_percentage: 0,
          target_users: ['admins', 'moderators'],
          feedback_count: 8,
          success_rate: 92
        },
        {
          id: '4',
          name: 'Community Circles',
          description: 'Small, private support groups based on shared experiences',
          category: 'community',
          status: 'ready',
          enabled: false,
          rollout_percentage: 0,
          target_users: [],
          feedback_count: 45,
          success_rate: 73
        },
        {
          id: '5',
          name: 'Real-time Emotion Analysis',
          description: 'Analyze emotional patterns in real-time for better support',
          category: 'analytics',
          status: 'testing',
          enabled: true,
          rollout_percentage: 10,
          target_users: ['research_participants'],
          feedback_count: 12,
          success_rate: 67
        },
        {
          id: '6',
          name: 'Mindfulness Integration',
          description: 'Guided meditation and breathing exercises within the app',
          category: 'wellness',
          status: 'beta',
          enabled: true,
          rollout_percentage: 25,
          target_users: ['wellness_focused'],
          feedback_count: 89,
          success_rate: 91
        }
      ];

      setFeatures(mockFeatures);
    } catch (error) {
      console.error('Error fetching experimental features:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFeature = async (featureId: string) => {
    try {
      setFeatures(prev => prev.map(feature => 
        feature.id === featureId 
          ? { ...feature, enabled: !feature.enabled }
          : feature
      ));

      const feature = features.find(f => f.id === featureId);
      toast({
        title: "Feature updated",
        description: `${feature?.name} has been ${feature?.enabled ? 'disabled' : 'enabled'}.`,
      });
    } catch (error) {
      console.error('Error toggling feature:', error);
      toast({
        title: "Error",
        description: "Failed to update feature status.",
        variant: "destructive",
      });
    }
  };

  const updateRollout = async (featureId: string, percentage: number) => {
    try {
      setFeatures(prev => prev.map(feature => 
        feature.id === featureId 
          ? { ...feature, rollout_percentage: percentage }
          : feature
      ));

      toast({
        title: "Rollout updated",
        description: `Feature rollout set to ${percentage}% of users.`,
      });
    } catch (error) {
      console.error('Error updating rollout:', error);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ai': return <Brain className="w-4 h-4" />;
      case 'voice': return <Mic className="w-4 h-4" />;
      case 'wellness': return <Zap className="w-4 h-4" />;
      case 'community': return <Users className="w-4 h-4" />;
      case 'analytics': return <Settings className="w-4 h-4" />;
      default: return <Flask className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ai': return 'bg-purple-900/30 text-purple-200 border-purple-700/50';
      case 'voice': return 'bg-blue-900/30 text-blue-200 border-blue-700/50';
      case 'wellness': return 'bg-green-900/30 text-green-200 border-green-700/50';
      case 'community': return 'bg-yellow-900/30 text-yellow-200 border-yellow-700/50';
      case 'analytics': return 'bg-red-900/30 text-red-200 border-red-700/50';
      default: return 'bg-gray-900/30 text-gray-200 border-gray-700/50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'development': return 'bg-gray-900/30 text-gray-200 border-gray-700/50';
      case 'testing': return 'bg-yellow-900/30 text-yellow-200 border-yellow-700/50';
      case 'beta': return 'bg-blue-900/30 text-blue-200 border-blue-700/50';
      case 'ready': return 'bg-green-900/30 text-green-200 border-green-700/50';
      default: return 'bg-gray-900/30 text-gray-200 border-gray-700/50';
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
            <Flask className="w-5 h-5 text-purple-400" />
            Experimental Features Toggle
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-800/30">
              <div className="text-xl font-bold text-purple-300">
                {features.filter(f => f.enabled).length}
              </div>
              <div className="text-sm text-purple-400">Active Features</div>
            </div>
            <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-800/30">
              <div className="text-xl font-bold text-blue-300">
                {features.filter(f => f.status === 'beta').length}
              </div>
              <div className="text-sm text-blue-400">In Beta Testing</div>
            </div>
            <div className="bg-green-900/20 p-4 rounded-lg border border-green-800/30">
              <div className="text-xl font-bold text-green-300">
                {Math.round(features.reduce((sum, f) => sum + f.success_rate, 0) / features.length)}%
              </div>
              <div className="text-sm text-green-400">Avg Success Rate</div>
            </div>
            <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-800/30">
              <div className="text-xl font-bold text-yellow-300">
                {features.reduce((sum, f) => sum + f.feedback_count, 0)}
              </div>
              <div className="text-sm text-yellow-400">Total Feedback</div>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-4">
            {features.map((feature) => (
              <Card key={feature.id} className="bg-black/50 border-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          {getCategoryIcon(feature.category)}
                          <h5 className="text-white font-medium">{feature.name}</h5>
                        </div>
                        <Badge className={getCategoryColor(feature.category)}>
                          {feature.category}
                        </Badge>
                        <Badge className={getStatusColor(feature.status)}>
                          {feature.status}
                        </Badge>
                      </div>
                      <p className="text-gray-300 text-sm mb-3">
                        {feature.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Switch
                        checked={feature.enabled}
                        onCheckedChange={() => toggleFeature(feature.id)}
                      />
                      <span className="text-gray-400 text-sm">
                        {feature.enabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                  </div>

                  {feature.enabled && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Rollout</span>
                            <span className="text-gray-300">{feature.rollout_percentage}%</span>
                          </div>
                          <Progress value={feature.rollout_percentage} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Success Rate</span>
                            <span className="text-gray-300">{feature.success_rate}%</span>
                          </div>
                          <Progress value={feature.success_rate} className="h-2" />
                        </div>
                        
                        <div className="text-center">
                          <div className="text-gray-400 text-sm">Feedback</div>
                          <div className="text-white font-medium">{feature.feedback_count} responses</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-gray-400 text-sm">
                          Target users: {feature.target_users.length > 0 
                            ? feature.target_users.join(', ') 
                            : 'All users'
                          }
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateRollout(feature.id, Math.min(feature.rollout_percentage + 10, 100))}
                            className="border-green-700 text-green-400 hover:bg-green-900/20"
                            disabled={feature.rollout_percentage >= 100}
                          >
                            Increase Rollout
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-700 text-gray-400 hover:bg-gray-900/20"
                          >
                            View Analytics
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExperimentalFeatures;
