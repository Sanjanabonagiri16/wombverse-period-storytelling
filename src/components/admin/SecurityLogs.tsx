
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Activity, AlertTriangle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AnalyticsEvent {
  id: string;
  event_type: string;
  user_id: string;
  created_at: string;
  metadata: any;
  ip_address: unknown; // This matches the database type (inet)
}

interface RateLimit {
  id: string;
  user_id: string;
  action_type: string;
  count: number;
  window_start: string;
  ip_address: unknown; // This matches the database type (inet)
}

const SecurityLogs = () => {
  const [analyticsEvents, setAnalyticsEvents] = useState<AnalyticsEvent[]>([]);
  const [rateLimits, setRateLimits] = useState<RateLimit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSecurityData();
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
        data = analyticsEvents;
        filename = 'analytics_events.csv';
      } else {
        data = rateLimits;
        filename = 'rate_limits.csv';
      }

      const csv = convertToCSV(data);
      downloadCSV(csv, filename);
    } catch (error) {
      console.error('Error exporting data:', error);
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
    return <div className="p-6">Loading security logs...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-womb-softwhite flex items-center gap-2">
          <Shield className="w-6 h-6" />
          Security & System Logs
        </h2>
      </div>

      <Tabs defaultValue="analytics" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="analytics">Activity Logs</TabsTrigger>
          <TabsTrigger value="rate-limits">Rate Limiting</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Analytics Events
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => exportData('analytics')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event Type</TableHead>
                    <TableHead>User ID</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Metadata</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analyticsEvents.slice(0, 20).map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>
                        <Badge variant="outline">{event.event_type}</Badge>
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {event.user_id ? event.user_id.substring(0, 8) + '...' : 'Anonymous'}
                      </TableCell>
                      <TableCell>{event.ip_address ? String(event.ip_address) : 'N/A'}</TableCell>
                      <TableCell>
                        {new Date(event.created_at).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <code className="text-xs bg-womb-deepgrey p-1 rounded">
                          {JSON.stringify(event.metadata || {}).substring(0, 50)}...
                        </code>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rate-limits">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Rate Limit Violations
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => exportData('rate-limits')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action Type</TableHead>
                    <TableHead>Count</TableHead>
                    <TableHead>User/IP</TableHead>
                    <TableHead>Window Start</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rateLimits.map((limit) => (
                    <TableRow key={limit.id}>
                      <TableCell>
                        <Badge variant="destructive">{limit.action_type}</Badge>
                      </TableCell>
                      <TableCell>{limit.count}</TableCell>
                      <TableCell className="font-mono text-xs">
                        {limit.user_id ? 
                          limit.user_id.substring(0, 8) + '...' : 
                          String(limit.ip_address)
                        }
                      </TableCell>
                      <TableCell>
                        {new Date(limit.window_start).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityLogs;
