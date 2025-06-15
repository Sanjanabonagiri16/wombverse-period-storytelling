import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Send, MessageSquare, Users, AlertCircle, CheckCircle, Clock, Download, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'announcement' | 'maintenance' | 'feature' | 'warning';
  recipient: 'all' | 'moderators' | 'admins';
  status: 'draft' | 'sent' | 'scheduled';
  createdAt: string;
  scheduledFor?: string;
}

interface UserFeedback {
  id: string;
  userId: string;
  userName: string;
  subject: string;
  message: string;
  category: 'bug' | 'feature' | 'complaint' | 'suggestion';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  replies: number;
}

const NotificationCenter = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [feedback, setFeedback] = useState<UserFeedback[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    type: 'announcement' as const,
    recipient: 'all' as const
  });

  useEffect(() => {
    // Mock data for demo - in real app, this would come from Supabase
    setNotifications([
      {
        id: '1',
        title: 'Platform Maintenance Notice',
        message: 'Scheduled maintenance will occur on Sunday at 2 AM UTC. Expected downtime: 30 minutes.',
        type: 'maintenance',
        recipient: 'all',
        status: 'sent',
        createdAt: '2024-12-15T10:00:00Z'
      },
      {
        id: '2',
        title: 'New Feature: Mood Tracking',
        message: 'We\'ve introduced advanced mood tracking features. Check them out in your profile!',
        type: 'feature',
        recipient: 'all',
        status: 'sent',
        createdAt: '2024-12-14T15:30:00Z'
      }
    ]);

    setFeedback([
      {
        id: '1',
        userId: 'user1',
        userName: 'Sarah M.',
        subject: 'Story deletion issue',
        message: 'I\'m unable to delete my story even though I\'m the author. Could you please help?',
        category: 'bug',
        status: 'open',
        priority: 'medium',
        createdAt: '2024-12-15T09:15:00Z',
        replies: 0
      },
      {
        id: '2',
        userId: 'user2',
        userName: 'Anonymous User',
        subject: 'Feature request: Dark mode for stories',
        message: 'Would love to have a dark mode option specifically for reading stories.',
        category: 'feature',
        status: 'in-progress',
        priority: 'low',
        createdAt: '2024-12-14T14:20:00Z',
        replies: 2
      }
    ]);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleSendNotification = () => {
    if (!newNotification.title.trim() || !newNotification.message.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const notification: Notification = {
      id: Date.now().toString(),
      ...newNotification,
      status: 'sent',
      createdAt: new Date().toISOString()
    };

    setNotifications(prev => [notification, ...prev]);
    setNewNotification({
      title: '',
      message: '',
      type: 'announcement',
      recipient: 'all'
    });

    toast({
      title: "Notification sent",
      description: `Announcement sent to ${newNotification.recipient}.`
    });
  };

  const exportNotifications = () => {
    const csv = convertToCSV(notifications);
    downloadCSV(csv, `notifications_${new Date().toISOString().split('T')[0]}.csv`);
    toast({
      title: "Export successful",
      description: "Notifications exported successfully."
    });
  };

  const exportFeedback = () => {
    const csv = convertToCSV(feedback);
    downloadCSV(csv, `feedback_${new Date().toISOString().split('T')[0]}.csv`);
    toast({
      title: "Export successful",
      description: "Feedback exported successfully."
    });
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

  const getNotificationTypeColor = (type: string) => {
    switch (type) {
      case 'announcement': return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30';
      case 'maintenance': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'feature': return 'bg-gray-700/30 text-gray-300 border-gray-600/50';
      case 'warning': return 'bg-gray-800/50 text-gray-200 border-gray-700/50';
      default: return 'bg-gray-900/30 text-gray-200 border-gray-700/50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <CheckCircle className="w-4 h-4 text-indigo-400" />;
      case 'draft': return <Clock className="w-4 h-4 text-gray-400" />;
      case 'scheduled': return <Clock className="w-4 h-4 text-indigo-400" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-gray-800/50 text-gray-200 border-gray-700/50';
      case 'high': return 'bg-gray-700/30 text-gray-300 border-gray-600/50';
      case 'medium': return 'bg-gray-600/20 text-gray-400 border-gray-500/30';
      case 'low': return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30';
      default: return 'bg-gray-900/30 text-gray-200 border-gray-700/50';
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
          <Bell className="w-5 h-5 md:w-6 md:h-6 text-indigo-400" />
          Notification Center
        </h2>
        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400">
          <RefreshCw className="w-3 h-3" />
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      </div>

      <Tabs defaultValue="announcements" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-black/50 border border-gray-800">
          <TabsTrigger value="announcements" className="data-[state=active]:bg-gray-900 text-xs md:text-sm">
            Admin Announcements
          </TabsTrigger>
          <TabsTrigger value="feedback" className="data-[state=active]:bg-gray-900 text-xs md:text-sm">
            User Feedback
          </TabsTrigger>
        </TabsList>

        <TabsContent value="announcements" className="space-y-4 md:space-y-6">
          {/* Create New Announcement */}
          <Card className="bg-black/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 text-base md:text-lg">
                <Send className="w-4 h-4 md:w-5 md:h-5 text-indigo-400" />
                Send Announcement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Notification Type
                  </label>
                  <select
                    value={newNotification.type}
                    onChange={(e) => setNewNotification(prev => ({ ...prev, type: e.target.value as any }))}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm"
                  >
                    <option value="announcement">Announcement</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="feature">New Feature</option>
                    <option value="warning">Warning</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Recipients
                  </label>
                  <select
                    value={newNotification.recipient}
                    onChange={(e) => setNewNotification(prev => ({ ...prev, recipient: e.target.value as any }))}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm"
                  >
                    <option value="all">All Users</option>
                    <option value="moderators">Moderators Only</option>
                    <option value="admins">Admins Only</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Title
                </label>
                <Input
                  value={newNotification.title}
                  onChange={(e) => setNewNotification(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter notification title..."
                  className="bg-slate-700 border-slate-600 text-white text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Message
                </label>
                <Textarea
                  value={newNotification.message}
                  onChange={(e) => setNewNotification(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Enter your announcement message..."
                  rows={4}
                  className="bg-slate-700 border-slate-600 text-white text-sm"
                />
              </div>
              
              <Button onClick={handleSendNotification} className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto">
                <Send className="w-4 h-4 mr-2" />
                Send Notification
              </Button>
            </CardContent>
          </Card>

          {/* Notification History */}
          <Card className="bg-black/50 border-gray-800">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <CardTitle className="text-white text-base md:text-lg">Notification History</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={exportNotifications}
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="bg-gray-900/50 rounded-lg p-3 md:p-4 border border-gray-700"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-white text-sm md:text-base">{notification.title}</h3>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(notification.status)}
                        <Badge className={getNotificationTypeColor(notification.type)}>
                          {notification.type}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-3 text-sm md:text-base">{notification.message}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs md:text-sm text-gray-400 gap-2">
                      <span>To: {notification.recipient}</span>
                      <span>{new Date(notification.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4 md:space-y-6">
          <Card className="bg-black/50 border-gray-800">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <CardTitle className="text-white flex items-center gap-2 text-base md:text-lg">
                  <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-indigo-400" />
                  User Feedback Inbox
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={exportFeedback}
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feedback.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-900/50 rounded-lg p-3 md:p-4 border border-gray-700 hover:border-gray-600 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-semibold text-white text-sm md:text-base">{item.subject}</h3>
                        <p className="text-xs md:text-sm text-gray-400">From: {item.userName}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className={getPriorityColor(item.priority)}>
                          {item.priority}
                        </Badge>
                        <Badge variant="outline" className="border-gray-700 text-gray-300 text-xs">
                          {item.category}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-3 text-sm md:text-base">{item.message}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-gray-400">
                        <span>Status: {item.status}</span>
                        <span>{item.replies} replies</span>
                        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                      </div>
                      <Button size="sm" variant="outline" className="border-gray-700 text-gray-300 w-full sm:w-auto">
                        Reply
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationCenter;
