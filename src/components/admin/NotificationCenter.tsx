
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Send, MessageSquare, Users, AlertCircle, CheckCircle, Clock } from 'lucide-react';
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
  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    type: 'announcement' as const,
    recipient: 'all' as const
  });

  useEffect(() => {
    // Mock data for demo
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

  const getNotificationTypeColor = (type: string) => {
    switch (type) {
      case 'announcement': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'maintenance': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'feature': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'warning': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'draft': return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'scheduled': return <Clock className="w-4 h-4 text-blue-400" />;
      default: return <AlertCircle className="w-4 h-4 text-slate-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Bell className="w-6 h-6 text-blue-400" />
          Notification Center
        </h2>
      </div>

      <Tabs defaultValue="announcements" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-slate-800/50 border border-slate-700">
          <TabsTrigger value="announcements" className="data-[state=active]:bg-slate-700">
            Admin Announcements
          </TabsTrigger>
          <TabsTrigger value="feedback" className="data-[state=active]:bg-slate-700">
            User Feedback
          </TabsTrigger>
        </TabsList>

        <TabsContent value="announcements" className="space-y-6">
          {/* Create New Announcement */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Send className="w-5 h-5 text-blue-400" />
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
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
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
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
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
                  className="bg-slate-700 border-slate-600 text-white"
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
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              
              <Button onClick={handleSendNotification} className="bg-blue-600 hover:bg-blue-700">
                <Send className="w-4 h-4 mr-2" />
                Send Notification
              </Button>
            </CardContent>
          </Card>

          {/* Notification History */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Notification History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="bg-slate-700/50 rounded-lg p-4 border border-slate-600"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-white">{notification.title}</h3>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(notification.status)}
                        <Badge className={getNotificationTypeColor(notification.type)}>
                          {notification.type}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-slate-300 mb-3">{notification.message}</p>
                    <div className="flex items-center justify-between text-sm text-slate-400">
                      <span>To: {notification.recipient}</span>
                      <span>{new Date(notification.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-green-400" />
                User Feedback Inbox
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feedback.map((item) => (
                  <div
                    key={item.id}
                    className="bg-slate-700/50 rounded-lg p-4 border border-slate-600 hover:border-slate-500 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-white">{item.subject}</h3>
                        <p className="text-sm text-slate-400">From: {item.userName}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getPriorityColor(item.priority)}>
                          {item.priority}
                        </Badge>
                        <Badge variant="outline" className="border-slate-600 text-slate-300">
                          {item.category}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-slate-300 mb-3">{item.message}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <span>Status: {item.status}</span>
                        <span>{item.replies} replies</span>
                        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                      </div>
                      <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
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
