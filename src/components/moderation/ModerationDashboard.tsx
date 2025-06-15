
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Flag, Eye, X, Check, Clock, Download, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ModerationItem {
  id: string;
  content_type: string;
  content_id: string;
  flag_reason: string;
  flag_type: string;
  status: string;
  created_at: string;
  content?: {
    title?: string;
    content: string;
  };
}

const ModerationDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [flaggedContent, setFlaggedContent] = useState<ModerationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPending, setTotalPending] = useState(0);
  const [totalProcessed, setTotalProcessed] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    fetchFlaggedContent();
    
    // Real-time subscription for new flagged content
    const channel = supabase
      .channel('moderation-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'content_moderation'
        },
        (payload) => {
          console.log('Real-time moderation update:', payload);
          fetchFlaggedContent();
          setLastUpdated(new Date());
          
          if (payload.eventType === 'INSERT') {
            toast({
              title: "New content flagged",
              description: "A new item requires moderation review.",
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchFlaggedContent = async () => {
    try {
      // Fetch pending items
      const { data: pendingData, count: pendingCount } = await supabase
        .from('content_moderation')
        .select('*', { count: 'exact' })
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      // Fetch total processed items
      const { count: processedCount } = await supabase
        .from('content_moderation')
        .select('*', { count: 'exact' })
        .neq('status', 'pending');

      setTotalPending(pendingCount || 0);
      setTotalProcessed(processedCount || 0);

      if (pendingData) {
        const contentWithDetails = await Promise.all(
          pendingData.map(async (item) => {
            let content = null;
            
            if (item.content_type === 'stories') {
              const { data: story } = await supabase
                .from('stories')
                .select('title, content')
                .eq('id', item.content_id)
                .single();
              content = story;
            } else if (item.content_type === 'comments') {
              const { data: comment } = await supabase
                .from('comments')
                .select('content')
                .eq('id', item.content_id)
                .single();
              content = comment;
            }

            return { ...item, content };
          })
        );

        setFlaggedContent(contentWithDetails);
      }
    } catch (error) {
      console.error('Error fetching flagged content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleModeration = async (itemId: string, action: 'approved' | 'rejected' | 'removed') => {
    try {
      await supabase
        .from('content_moderation')
        .update({
          status: action,
          moderator_id: user?.id,
          updated_at: new Date().toISOString()
        })
        .eq('id', itemId);

      toast({
        title: "Action completed",
        description: `Content has been ${action}.`,
      });

      fetchFlaggedContent();
    } catch (error) {
      console.error('Error updating moderation status:', error);
      toast({
        title: "Error",
        description: "Failed to update content status.",
        variant: "destructive",
      });
    }
  };

  const exportModerationData = async () => {
    try {
      const { data } = await supabase
        .from('content_moderation')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1000);

      if (data) {
        const csv = convertToCSV(data);
        downloadCSV(csv, `moderation_data_${new Date().toISOString().split('T')[0]}.csv`);
        toast({
          title: "Export successful",
          description: "Moderation data exported successfully."
        });
      }
    } catch (error) {
      console.error('Error exporting data:', error);
      toast({
        title: "Export failed",
        description: "Failed to export moderation data.",
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

  const getStatusBadge = (status: string) => {
    const statusMap = {
      pending: { color: 'bg-gray-900/30 text-gray-200 border-gray-700/50', icon: Clock },
      approved: { color: 'bg-indigo-900/30 text-indigo-200 border-indigo-700/50', icon: Check },
      rejected: { color: 'bg-gray-800/30 text-gray-300 border-gray-600/50', icon: X },
      removed: { color: 'bg-black/50 text-gray-400 border-gray-600/50', icon: X }
    };
    
    const config = statusMap[status as keyof typeof statusMap];
    const IconComponent = config?.icon || Clock;
    
    return (
      <Badge className={`${config?.color} flex items-center gap-1`}>
        <IconComponent className="w-3 h-3" />
        {status}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="p-4 md:p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-800 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-gray-800 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Flag className="w-5 h-5 md:w-6 md:h-6 text-indigo-400" />
          <h1 className="text-xl md:text-2xl font-bold text-white">Moderation Dashboard</h1>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-xs md:text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <RefreshCw className="w-3 h-3" />
            Last updated: {lastUpdated.toLocaleTimeString()}
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={exportModerationData}
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            <Download className="w-4 h-4 mr-1" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Card className="bg-black/50 border-gray-800">
          <CardContent className="p-4">
            <div className="text-xl md:text-2xl font-bold text-gray-200">{totalPending}</div>
            <div className="text-xs md:text-sm text-gray-400">Pending Review</div>
          </CardContent>
        </Card>
        <Card className="bg-black/50 border-gray-800">
          <CardContent className="p-4">
            <div className="text-xl md:text-2xl font-bold text-indigo-400">{totalProcessed}</div>
            <div className="text-xs md:text-sm text-gray-400">Total Processed</div>
          </CardContent>
        </Card>
        <Card className="bg-black/50 border-gray-800">
          <CardContent className="p-4">
            <div className="text-xl md:text-2xl font-bold text-white">
              {totalPending + totalProcessed}
            </div>
            <div className="text-xs md:text-sm text-gray-400">Total Reports</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {flaggedContent.length === 0 ? (
          <Card className="bg-black/50 border-gray-800">
            <CardContent className="p-6 text-center">
              <p className="text-gray-400">No content pending moderation</p>
            </CardContent>
          </Card>
        ) : (
          flaggedContent.map((item) => (
            <Card key={item.id} className="bg-gray-900/50 border-gray-800">
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <CardTitle className="text-sm md:text-base text-white flex items-center gap-2">
                    <Flag className="w-4 h-4" />
                    {item.content_type === 'stories' ? 'Story' : 'Comment'} Flagged
                  </CardTitle>
                  {getStatusBadge(item.status)}
                </div>
                <div className="text-xs md:text-sm text-gray-400">
                  Reason: {item.flag_reason} | Type: {item.flag_type}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-black/50 p-3 md:p-4 rounded-lg">
                    {item.content?.title && (
                      <h4 className="font-medium text-white mb-2 text-sm md:text-base">
                        {item.content.title}
                      </h4>
                    )}
                    <p className="text-gray-300 text-xs md:text-sm break-words">
                      {item.content?.content || 'Content not found'}
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-indigo-700 text-indigo-400 hover:bg-indigo-900/20 flex-1 sm:flex-none"
                      onClick={() => handleModeration(item.id, 'approved')}
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-700 text-gray-400 hover:bg-gray-900/20 flex-1 sm:flex-none"
                      onClick={() => handleModeration(item.id, 'rejected')}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800/20 flex-1 sm:flex-none"
                      onClick={() => handleModeration(item.id, 'removed')}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ModerationDashboard;
