
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Activity, AlertTriangle, Download, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface AnalyticsEvent {
  id: string;
  event_type: string;
  user_id: string;
  created_at: string;
  metadata: any;
  ip_address: unknown;
}

interface RateLimit {
  id: string;
  user_id: string;
  action_type: string;
  count: number;
  window_start: string;
  ip_address: unknown;
}

const SecurityLogs = () => {
  const { toast } = useToast();
  const [analyticsEvents, setAnalyticsEvents] = useState<AnalyticsEvent[]>([]);
  const [rateLimits, setRateLimits] = useState<RateLimit[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    fetchSecurityData();
    
    // Real-time subscription for analytics events
    const analyticsChannel = supabase
      .channel('analytics-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'analytics_events'
        },
        (payload) => {
          console.log('New analytics event:', payload);
          setAnalyticsEvents(prev => [payload.new as AnalyticsEvent, ...prev.slice(0, 99)]);
          setLastUpdated(new Date());
        }
      )
      .subscribe();

    // Real-time subscription for rate limits
    const rateLimitChannel = supabase
      .channel('rate-limit-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'rate_limits'
        },
        (payload) => {
          console.log('New rate limit violation:', payload);
          setRateLimits(prev => [payload.new as RateLimit, ...prev.slice(0, 49)]);
          setLastUpdated(new Date());
          toast({
            title: "Rate limit violation",
            description: "New suspicious activity detected.",
            variant: "destructive",
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(analyticsChannel);
      supabase.removeChannel(rateLimitChannel);
    };
  }, []);

  const fetchSecurityData = async () => {
    try {
      const [analyticsResult, rateLimitsResult] = await Promise.all([
        supabase
          .from('analytics_events')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100),
        supabase
          .from('rate_limits')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(50)
      ]);

      setAnalyticsEvents(analyticsResult.data || []);
      setRateLimits(rateLimitsResult.data || []);
    } catch (error) {
      console.error('Error fetching security data:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportData = async (type: string) => {
    try {
      let data;
      let filename;

      if (type === 'analytics') {
        const { data: exportData } = await supabase
          .from('analytics_events')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10000);
        data = exportData;
        filename = `analytics_events_${new Date().toISOString().split('T')[0]}.csv`;
      } else {
        const { data: exportData } = await supabase
          .from('rate_limits')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10000);
        data = exportData;
        filename = `rate_limits_${new Date().toISOString().split('T')[0]}.csv`;
      }

      if (data && data.length > 0) {
        const csv = convertToCSV(data);
        downloadCSV(csv, filename);
        toast({
          title: "Export successful",
          description: `${type} data exported successfully.`
        });
      } else {
        toast({
          title: "No data to export",
          description: "No data found for the selected type.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error exporting data:', error);
      toast({
        title: "Export failed",
        description: "Failed to export data.",
        variant: "destructive"
      });
    }
  };

  const convertToCSV = (data: any[]) => {
    if (data.length === 0) return '';

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          return typeof value === 'object' ? JSON.stringify(value) : value;
        }).join(',')
      )
    ].join('\n');

    return csvContent;
  };

  const downloadCSV = (csv: string, filename: string) => {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (loading) {
    return (
      <div className="p-4 md:p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-800 rounded w-1/3"></div>
          <div className="h-64 bg-gray-800 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
          <Shield className="w-5 h-5 md:w-6 md:h-6 text-indigo-400" />
          Security & System Logs
        </h2>
        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400">
          <RefreshCw className="w-3 h-3" />
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      </div>

      <Tabs defaultValue="analytics" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-black/50 border border-gray-800">
          <TabsTrigger value="analytics" className="data-[state=active]:bg-gray-900 data-[state=active]:text-white text-xs md:text-sm">
            Activity Logs
          </TabsTrigger>
          <TabsTrigger value="rate-limits" className="data-[state=active]:bg-gray-900 data-[state=active]:text-white text-xs md:text-sm">
            Rate Limiting
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analytics">
          <Card className="bg-black/50 border-gray-800">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <CardTitle className="flex items-center gap-2 text-base md:text-lg text-white">
                  <Activity className="w-4 h-4 md:w-5 md:h-5" />
                  Analytics Events
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => exportData('analytics')}
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs md:text-sm text-gray-300">Event Type</TableHead>
                      <TableHead className="text-xs md:text-sm text-gray-300">User ID</TableHead>
                      <TableHead className="text-xs md:text-sm hidden sm:table-cell text-gray-300">IP Address</TableHead>
                      <TableHead className="text-xs md:text-sm text-gray-300">Timestamp</TableHead>
                      <TableHead className="text-xs md:text-sm hidden lg:table-cell text-gray-300">Metadata</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {analyticsEvents.slice(0, 20).map((event) => (
                      <TableRow key={event.id} className="border-gray-800">
                        <TableCell>
                          <Badge variant="outline" className="text-xs border-gray-700 text-gray-300">{event.event_type}</Badge>
                        </TableCell>
                        <TableCell className="font-mono text-xs text-gray-300">
                          {event.user_id ? event.user_id.substring(0, 8) + '...' : 'Anonymous'}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-xs text-gray-300">
                          {event.ip_address ? String(event.ip_address) : 'N/A'}
                        </TableCell>
                        <TableCell className="text-xs text-gray-300">
                          {new Date(event.created_at).toLocaleString()}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <code className="text-xs bg-gray-900 p-1 rounded text-gray-300">
                            {JSON.stringify(event.metadata || {}).substring(0, 30)}...
                          </code>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rate-limits">
          <Card className="bg-black/50 border-gray-800">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <CardTitle className="flex items-center gap-2 text-base md:text-lg text-white">
                  <AlertTriangle className="w-4 h-4 md:w-5 md:h-5" />
                  Rate Limit Violations
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => exportData('rate-limits')}
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs md:text-sm text-gray-300">Action Type</TableHead>
                      <TableHead className="text-xs md:text-sm text-gray-300">Count</TableHead>
                      <TableHead className="text-xs md:text-sm text-gray-300">User/IP</TableHead>
                      <TableHead className="text-xs md:text-sm text-gray-300">Window Start</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rateLimits.map((limit) => (
                      <TableRow key={limit.id} className="border-gray-800">
                        <TableCell>
                          <Badge className="bg-red-900/30 text-red-200 border-red-700/50 text-xs">{limit.action_type}</Badge>
                        </TableCell>
                        <TableCell className="text-xs md:text-sm text-gray-300">{limit.count}</TableCell>
                        <TableCell className="font-mono text-xs text-gray-300">
                          {limit.user_id ? 
                            limit.user_id.substring(0, 8) + '...' : 
                            String(limit.ip_address)
                          }
                        </TableCell>
                        <TableCell className="text-xs text-gray-300">
                          {new Date(limit.window_start).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityLogs;
