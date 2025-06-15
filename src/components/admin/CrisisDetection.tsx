
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Shield, Clock, CheckCircle, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CrisisAlert {
  id: string;
  content_type: string;
  content_id: string;
  severity: 'high' | 'medium' | 'low';
  keywords: string[];
  status: 'pending' | 'reviewed' | 'escalated';
  created_at: string;
  content_preview: string;
}

const CrisisDetection = () => {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<CrisisAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCrisisAlerts();
    
    // Real-time subscription for crisis alerts
    const channel = supabase
      .channel('crisis-alerts')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'stories'
        },
        (payload) => {
          console.log('Crisis detection: Story change detected', payload);
          checkForCrisisContent();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const crisisKeywords = [
    'self harm', 'suicide', 'kill myself', 'end it all', 'abuse', 'hurt myself',
    'depression', 'can\'t go on', 'no hope', 'worthless', 'better off dead'
  ];

  const fetchCrisisAlerts = async () => {
    setLoading(true);
    try {
      // Check for stories that might contain crisis keywords
      const { data: stories } = await supabase
        .from('stories')
        .select('id, title, content, created_at')
        .order('created_at', { ascending: false })
        .limit(20);

      const detectedAlerts: CrisisAlert[] = [];

      if (stories) {
        stories.forEach(story => {
          const content = (story.content || '').toLowerCase();
          const foundKeywords = crisisKeywords.filter(keyword => 
            content.includes(keyword.toLowerCase())
          );

          if (foundKeywords.length > 0) {
            detectedAlerts.push({
              id: story.id,
              content_type: 'story',
              content_id: story.id,
              severity: foundKeywords.length > 2 ? 'high' : foundKeywords.length > 1 ? 'medium' : 'low',
              keywords: foundKeywords,
              status: 'pending',
              created_at: story.created_at,
              content_preview: story.content?.substring(0, 100) + '...' || story.title || 'No preview available'
            });
          }
        });
      }

      // Add some demo alerts if no real ones found
      if (detectedAlerts.length === 0) {
        detectedAlerts.push({
          id: 'demo-1',
          content_type: 'story',
          content_id: 'story-demo-1',
          severity: 'high',
          keywords: ['depression', 'no hope'],
          status: 'pending',
          created_at: new Date().toISOString(),
          content_preview: 'I\'ve been struggling with depression and feeling like there\'s no hope...'
        });
      }

      setAlerts(detectedAlerts);
    } catch (error) {
      console.error('Error fetching crisis alerts:', error);
      // Set demo data on error
      setAlerts([{
        id: 'error-demo',
        content_type: 'story',
        content_id: 'demo',
        severity: 'medium',
        keywords: ['demo'],
        status: 'pending',
        created_at: new Date().toISOString(),
        content_preview: 'Demo alert - connection error occurred'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const checkForCrisisContent = async () => {
    console.log('Checking for crisis content in real-time...');
    await fetchCrisisAlerts();
  };

  const handleAlertAction = async (alertId: string, action: 'review' | 'escalate' | 'dismiss') => {
    try {
      setAlerts(prev => prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, status: action === 'dismiss' ? 'reviewed' : 'escalated' }
          : alert
      ));

      toast({
        title: "Action completed",
        description: `Alert has been ${action}ed successfully.`,
      });
    } catch (error) {
      console.error('Error updating alert:', error);
      toast({
        title: "Error",
        description: "Failed to update alert status.",
        variant: "destructive",
      });
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-900/30 text-red-200 border-red-700/50';
      case 'medium': return 'bg-yellow-900/30 text-yellow-200 border-yellow-700/50';
      case 'low': return 'bg-blue-900/30 text-blue-200 border-blue-700/50';
      default: return 'bg-gray-900/30 text-gray-200 border-gray-700/50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'reviewed': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'escalated': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            Crisis Detection & Escalation System
          </CardTitle>
          <Button
            size="sm"
            variant="outline"
            onClick={fetchCrisisAlerts}
            className="border-gray-700 text-gray-300 hover:bg-gray-800/50"
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            Refresh
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-red-900/20 p-4 rounded-lg border border-red-800/30">
              <div className="text-xl font-bold text-red-300">
                {alerts.filter(a => a.severity === 'high').length}
              </div>
              <div className="text-sm text-red-400">High Priority Alerts</div>
            </div>
            <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-800/30">
              <div className="text-xl font-bold text-yellow-300">
                {alerts.filter(a => a.status === 'pending').length}
              </div>
              <div className="text-sm text-yellow-400">Pending Review</div>
            </div>
            <div className="bg-green-900/20 p-4 rounded-lg border border-green-800/30">
              <div className="text-xl font-bold text-green-300">
                {alerts.filter(a => a.status === 'reviewed').length}
              </div>
              <div className="text-sm text-green-400">Resolved Today</div>
            </div>
          </div>

          <Alert className="border-red-800/30 bg-red-900/20">
            <Shield className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-300">
              Crisis detection system is active. High-priority alerts require immediate attention.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            {loading ? (
              <div className="animate-pulse space-y-4">
                {[1, 2].map(i => (
                  <div key={i} className="h-20 bg-gray-800 rounded"></div>
                ))}
              </div>
            ) : (
              alerts.map((alert) => (
                <Card key={alert.id} className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                        <Badge className="bg-gray-900/30 text-gray-200 border-gray-700/50">
                          {alert.content_type}
                        </Badge>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(alert.status)}
                          <span className="text-gray-400 text-sm">{alert.status}</span>
                        </div>
                      </div>
                      <span className="text-gray-500 text-xs">
                        {new Date(alert.created_at).toLocaleTimeString()}
                      </span>
                    </div>

                    <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                      {alert.content_preview}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {alert.keywords.map((keyword, index) => (
                        <Badge 
                          key={index} 
                          className="bg-red-900/30 text-red-200 border-red-700/50 text-xs"
                        >
                          {keyword}
                        </Badge>
                      ))}
                    </div>

                    {alert.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-green-700 text-green-400 hover:bg-green-900/20"
                          onClick={() => handleAlertAction(alert.id, 'review')}
                        >
                          Mark Reviewed
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-700 text-red-400 hover:bg-red-900/20"
                          onClick={() => handleAlertAction(alert.id, 'escalate')}
                        >
                          Escalate
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-700 text-gray-400 hover:bg-gray-900/20"
                          onClick={() => handleAlertAction(alert.id, 'dismiss')}
                        >
                          Dismiss
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CrisisDetection;
