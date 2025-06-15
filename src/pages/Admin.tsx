
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ModerationDashboard from '@/components/moderation/ModerationDashboard';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';
import { Shield, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Admin = () => {
  const { user } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    checkAdminAccess();
  }, [user]);

  const checkAdminAccess = async () => {
    if (!user) {
      setIsAuthorized(false);
      return;
    }

    try {
      const { data } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .in('role', ['admin', 'moderator']);

      setIsAuthorized(data && data.length > 0);
    } catch (error) {
      console.error('Error checking admin access:', error);
      setIsAuthorized(false);
    }
  };

  if (isAuthorized === null) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <p className="text-womb-warmgrey">Checking permissions...</p>
        </div>
      </Layout>
    );
  }

  if (!isAuthorized) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Card className="bg-womb-deepgrey border-womb-deepgrey">
            <CardContent className="p-8 text-center">
              <Shield className="w-16 h-16 text-womb-warmgrey mx-auto mb-4" />
              <h2 className="text-xl font-bold text-womb-softwhite mb-2">Access Denied</h2>
              <p className="text-womb-warmgrey">
                You don't have permission to access the admin dashboard.
              </p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="moderation" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="moderation" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Moderation
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="moderation">
            <ModerationDashboard />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Admin;
