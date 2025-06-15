
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Eye, Check, X, Flag, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ModeratorStats {
  pendingReviews: number;
  todayActions: number;
  totalReported: number;
  activeUsers: number;
}

const ModeratorDashboard = () => {
  const { toast } = useToast();
  const [stats, setStats] = useState<ModeratorStats>({
    pendingReviews: 0,
    todayActions: 0,
    totalReported: 0,
    activeUsers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModeratorStats();
  }, []);

  const fetchModeratorStats = async () => {
    try {
      // Fetch moderation statistics
      const { count: pendingCount } = await supabase
        .from('content_moderation')
        .select('*', { count: 'exact' })
        .eq('status', 'pending');

      // Simulate other stats
      setStats({
        pendingReviews: pendingCount || 0,
        todayActions: Math.floor(Math.random() * 20),
        totalReported: Math.floor(Math.random() * 100),
        activeUsers: Math.floor(Math.random() * 500) + 100
      });
    } catch (error) {
      console.error('Error fetching moderator stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    { name: 'Review Flagged Content', count: stats.pendingReviews, color: 'text-red-400' },
    { name: 'Approve Pending Stories', count: 8, color: 'text-yellow-400' },
    { name: 'Check Comments', count: 15, color: 'text-blue-400' },
    { name: 'User Reports', count: 3, color: 'text-purple-400' }
  ];

  if (loading) {
    return (
      <Card className="bg-gray-900/50 border-gray-800">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-800 rounded w-1/3"></div>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map(i => (
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
            <Shield className="w-5 h-5 text-blue-400" />
            Moderator Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-red-900/20 p-4 rounded-lg border border-red-800/30">
              <div className="text-xl font-bold text-red-300">{stats.pendingReviews}</div>
              <div className="text-sm text-red-400">Pending Reviews</div>
            </div>
            <div className="bg-green-900/20 p-4 rounded-lg border border-green-800/30">
              <div className="text-xl font-bold text-green-300">{stats.todayActions}</div>
              <div className="text-sm text-green-400">Actions Today</div>
            </div>
            <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-800/30">
              <div className="text-xl font-bold text-yellow-300">{stats.totalReported}</div>
              <div className="text-sm text-yellow-400">Total Reported</div>
            </div>
            <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-800/30">
              <div className="text-xl font-bold text-blue-300">{stats.activeUsers}</div>
              <div className="text-sm text-blue-400">Active Users</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <h4 className="text-white font-medium">Quick Actions</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 justify-between border-gray-700 hover:bg-gray-800/50"
                >
                  <div className="flex items-center gap-2">
                    <Flag className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{action.name}</span>
                  </div>
                  <Badge className="bg-gray-900/30 text-gray-200 border-gray-700/50">
                    {action.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>

          {/* Moderator Tools */}
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-black/50">
              <TabsTrigger value="content">Content Review</TabsTrigger>
              <TabsTrigger value="users">User Management</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4">
              <div className="bg-black/50 p-4 rounded-lg">
                <h5 className="text-white font-medium mb-3">Recent Content Actions</h5>
                <div className="space-y-2">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center justify-between p-2 bg-gray-900/30 rounded">
                      <span className="text-gray-300 text-sm">Story: "Finding hope after loss"</span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-green-700 text-green-400">
                          <Check className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-700 text-red-400">
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="users" className="space-y-4">
              <div className="bg-black/50 p-4 rounded-lg">
                <h5 className="text-white font-medium mb-3">User Management</h5>
                <div className="space-y-2">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center justify-between p-2 bg-gray-900/30 rounded">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300 text-sm">user_{item}@example.com</span>
                      </div>
                      <Button size="sm" variant="outline" className="border-gray-700 text-gray-400">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <div className="bg-black/50 p-4 rounded-lg">
                <h5 className="text-white font-medium mb-3">Recent Reports</h5>
                <div className="space-y-2">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center justify-between p-2 bg-gray-900/30 rounded">
                      <div className="flex items-center gap-2">
                        <Flag className="w-4 h-4 text-red-400" />
                        <span className="text-gray-300 text-sm">Inappropriate content reported</span>
                      </div>
                      <Badge className="bg-red-900/30 text-red-200 border-red-700/50">
                        HIGH
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModeratorDashboard;
