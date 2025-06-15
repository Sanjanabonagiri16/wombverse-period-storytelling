
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Flag, Eye, X, Check, Clock } from 'lucide-react';
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

  useEffect(() => {
    fetchFlaggedContent();
    
    // Real-time subscription for new flagged content
    const channel = supabase
      .channel('moderation-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'content_moderation'
        },
        () => {
          fetchFlaggedContent();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchFlaggedContent = async () => {
    try {
      const { data: moderationData } = await supabase
        .from('content_moderation')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (moderationData) {
        const contentWithDetails = await Promise.all(
          moderationData.map(async (item) => {
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

  const getStatusBadge = (status: string) => {
    const statusMap = {
      pending: { color: 'bg-yellow-500', icon: Clock },
      approved: { color: 'bg-green-500', icon: Check },
      rejected: { color: 'bg-red-500', icon: X },
      removed: { color: 'bg-gray-500', icon: X }
    };
    
    const config = statusMap[status as keyof typeof statusMap];
    const IconComponent = config?.icon || Clock;
    
    return (
      <Badge className={`${config?.color} text-white flex items-center gap-1`}>
        <IconComponent className="w-3 h-3" />
        {status}
      </Badge>
    );
  };

  if (loading) {
    return <div className="p-6">Loading moderation dashboard...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-2">
        <Flag className="w-6 h-6 text-womb-crimson" />
        <h1 className="text-2xl font-bold text-womb-softwhite">Moderation Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-womb-crimson">{flaggedContent.length}</div>
            <div className="text-sm text-womb-warmgrey">Pending Review</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {flaggedContent.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-womb-warmgrey">No content pending moderation</p>
            </CardContent>
          </Card>
        ) : (
          flaggedContent.map((item) => (
            <Card key={item.id} className="bg-womb-deepgrey border-womb-deepgrey">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-womb-softwhite flex items-center gap-2">
                    <Flag className="w-4 h-4" />
                    {item.content_type === 'stories' ? 'Story' : 'Comment'} Flagged
                  </CardTitle>
                  {getStatusBadge(item.status)}
                </div>
                <div className="text-sm text-womb-warmgrey">
                  Reason: {item.flag_reason} | Type: {item.flag_type}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-womb-charcoal p-4 rounded-lg">
                    {item.content?.title && (
                      <h4 className="font-medium text-womb-softwhite mb-2">
                        {item.content.title}
                      </h4>
                    )}
                    <p className="text-womb-warmgrey text-sm">
                      {item.content?.content || 'Content not found'}
                    </p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                      onClick={() => handleModeration(item.id, 'approved')}
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white"
                      onClick={() => handleModeration(item.id, 'rejected')}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
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
