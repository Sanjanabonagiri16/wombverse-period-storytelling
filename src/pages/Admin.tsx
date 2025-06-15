
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ModerationDashboard from '@/components/moderation/ModerationDashboard';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';
import UserManagement from '@/components/admin/UserManagement';
import ContentManagement from '@/components/admin/ContentManagement';
import SecurityLogs from '@/components/admin/SecurityLogs';
import AdminLogin from '@/components/admin/AdminLogin';
import { Shield, TrendingUp, Users, Star, Activity, Settings } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Admin = () => {
  const { user } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    // For demo purposes, we'll always show the login first
    // In a real app, you'd check user roles here
    console.log('Admin page loaded, user:', user);
  }, [user]);

  const handleLoginSuccess = () => {
    console.log('Login success callback triggered');
    setShowLogin(false);
    setIsAuthorized(true);
  };

  // Always show login screen first for demo
  if (showLogin) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  // Show admin dashboard after successful login
  if (isAuthorized) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-womb-softwhite mb-2">
              WombVerse Admin Dashboard
            </h1>
            <p className="text-womb-warmgrey">
              Comprehensive platform management and analytics (Demo Mode)
            </p>
          </div>

          <Tabs defaultValue="moderation" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="moderation" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Moderation
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Users
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                Content
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Security
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="moderation">
              <ModerationDashboard />
            </TabsContent>

            <TabsContent value="analytics">
              <AnalyticsDashboard />
            </TabsContent>

            <TabsContent value="users">
              <UserManagement />
            </TabsContent>

            <TabsContent value="content">
              <ContentManagement />
            </TabsContent>

            <TabsContent value="security">
              <SecurityLogs />
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-womb-softwhite mb-4">
                    Platform Settings
                  </h3>
                  <p className="text-womb-warmgrey">
                    Advanced configuration options coming soon...
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Layout>
    );
  }

  // Fallback loading state
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <p className="text-womb-warmgrey">Loading admin dashboard...</p>
      </div>
    </Layout>
  );
};

export default Admin;
