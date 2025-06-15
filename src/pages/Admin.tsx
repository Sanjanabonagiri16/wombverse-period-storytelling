
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ModerationDashboard from '@/components/moderation/ModerationDashboard';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';
import UserManagement from '@/components/admin/UserManagement';
import ContentManagement from '@/components/admin/ContentManagement';
import SecurityLogs from '@/components/admin/SecurityLogs';
import NotificationCenter from '@/components/admin/NotificationCenter';
import SystemSettings from '@/components/admin/SystemSettings';
import AdminLogin from '@/components/admin/AdminLogin';
import ExportReports from '@/components/admin/ExportReports';
import { Shield, TrendingUp, Users, Star, Activity, Settings, Bell, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Admin = () => {
  const { user } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    console.log('Admin page loaded, user:', user);
  }, [user]);

  const handleLoginSuccess = () => {
    console.log('Login success callback triggered');
    setShowLogin(false);
    setIsAuthorized(true);
  };

  if (showLogin) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  if (isAuthorized) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="container mx-auto px-6 py-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                    WombVerse Admin
                  </h1>
                  <p className="text-gray-400 text-lg font-medium">
                    Comprehensive platform management and analytics
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-green-900/30 text-green-400 px-4 py-2 rounded-full text-sm font-semibold border border-green-700/50">
                    System Healthy
                  </div>
                  <div className="bg-black border border-gray-700 rounded-lg px-4 py-2">
                    <span className="text-gray-300 text-sm">Demo Mode</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard Tabs */}
            <Tabs defaultValue="moderation" className="w-full">
              <TabsList className="grid w-full grid-cols-8 bg-black/50 border border-gray-800 rounded-xl p-1 mb-8">
                <TabsTrigger 
                  value="moderation" 
                  className="flex items-center gap-2 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-lg transition-all"
                >
                  <Shield className="w-4 h-4" />
                  <span className="hidden sm:inline">Moderation</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="analytics" 
                  className="flex items-center gap-2 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-lg transition-all"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span className="hidden sm:inline">Analytics</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="users" 
                  className="flex items-center gap-2 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-lg transition-all"
                >
                  <Users className="w-4 h-4" />
                  <span className="hidden sm:inline">Users</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="content" 
                  className="flex items-center gap-2 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-lg transition-all"
                >
                  <Star className="w-4 h-4" />
                  <span className="hidden sm:inline">Content</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="security" 
                  className="flex items-center gap-2 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-lg transition-all"
                >
                  <Activity className="w-4 h-4" />
                  <span className="hidden sm:inline">Security</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="notifications" 
                  className="flex items-center gap-2 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-lg transition-all"
                >
                  <Bell className="w-4 h-4" />
                  <span className="hidden sm:inline">Notifications</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="reports" 
                  className="flex items-center gap-2 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-lg transition-all"
                >
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">Reports</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="settings" 
                  className="flex items-center gap-2 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-lg transition-all"
                >
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Settings</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="moderation" className="space-y-6">
                <ModerationDashboard />
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <AnalyticsDashboard />
              </TabsContent>

              <TabsContent value="users" className="space-y-6">
                <UserManagement />
              </TabsContent>

              <TabsContent value="content" className="space-y-6">
                <ContentManagement />
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <SecurityLogs />
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <NotificationCenter />
              </TabsContent>

              <TabsContent value="reports" className="space-y-6">
                <ExportReports />
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <SystemSettings />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading admin dashboard...</p>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
