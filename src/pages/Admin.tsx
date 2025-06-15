
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
import SentimentAnalytics from '@/components/admin/SentimentAnalytics';
import CrisisDetection from '@/components/admin/CrisisDetection';
import ModeratorDashboard from '@/components/admin/ModeratorDashboard';
import StoryImpactTracker from '@/components/admin/StoryImpactTracker';
import PromptPerformance from '@/components/admin/PromptPerformance';
import SafeWordsPanel from '@/components/admin/SafeWordsPanel';
import RollbackSystem from '@/components/admin/RollbackSystem';
import ExperimentalFeatures from '@/components/admin/ExperimentalFeatures';
import { Shield, TrendingUp, Users, Star, Activity, Settings, Bell, FileText, Brain, AlertTriangle, UserCheck, Lightbulb, RotateCcw, Beaker } from 'lucide-react';

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
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2">
                    WombVerse Admin
                  </h1>
                  <p className="text-gray-400 text-lg font-medium">
                    Comprehensive platform management and analytics
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-green-900/30 text-green-300 px-4 py-2 rounded-full text-sm font-semibold border border-green-700/50">
                    System Healthy
                  </div>
                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2">
                    <span className="text-gray-300 text-sm">Live Environment</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard Tabs */}
            <Tabs defaultValue="moderation" className="w-full">
              <TabsList className="grid w-full grid-cols-6 lg:grid-cols-12 bg-gray-900/80 border border-gray-800 rounded-xl p-1 mb-8 gap-1 backdrop-blur-sm">
                <TabsTrigger 
                  value="moderation" 
                  className="flex items-center gap-1 data-[state=active]:bg-gray-800 data-[state=active]:text-white rounded-lg transition-all text-xs lg:text-sm"
                >
                  <Shield className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="hidden sm:inline">Moderation</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="analytics" 
                  className="flex items-center gap-1 data-[state=active]:bg-gray-800 data-[state=active]:text-white rounded-lg transition-all text-xs lg:text-sm"
                >
                  <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="hidden sm:inline">Analytics</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="sentiment" 
                  className="flex items-center gap-1 data-[state=active]:bg-gray-800 data-[state=active]:text-white rounded-lg transition-all text-xs lg:text-sm"
                >
                  <Brain className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="hidden sm:inline">Sentiment</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="crisis" 
                  className="flex items-center gap-1 data-[state=active]:bg-gray-800 data-[state=active]:text-white rounded-lg transition-all text-xs lg:text-sm"
                >
                  <AlertTriangle className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="hidden sm:inline">Crisis</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="moderators" 
                  className="flex items-center gap-1 data-[state=active]:bg-gray-800 data-[state=active]:text-white rounded-lg transition-all text-xs lg:text-sm"
                >
                  <UserCheck className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="hidden sm:inline">Moderators</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="impact" 
                  className="flex items-center gap-1 data-[state=active]:bg-gray-800 data-[state=active]:text-white rounded-lg transition-all text-xs lg:text-sm"
                >
                  <Star className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="hidden sm:inline">Impact</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="prompts" 
                  className="flex items-center gap-1 data-[state=active]:bg-gray-800 data-[state=active]:text-white rounded-lg transition-all text-xs lg:text-sm"
                >
                  <Lightbulb className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="hidden sm:inline">Prompts</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="safewords" 
                  className="flex items-center gap-1 data-[state=active]:bg-gray-800 data-[state=active]:text-white rounded-lg transition-all text-xs lg:text-sm"
                >
                  <Shield className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="hidden sm:inline">Safe Words</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="rollback" 
                  className="flex items-center gap-1 data-[state=active]:bg-gray-800 data-[state=active]:text-white rounded-lg transition-all text-xs lg:text-sm"
                >
                  <RotateCcw className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="hidden sm:inline">Rollback</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="experimental" 
                  className="flex items-center gap-1 data-[state=active]:bg-gray-800 data-[state=active]:text-white rounded-lg transition-all text-xs lg:text-sm"
                >
                  <Beaker className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="hidden sm:inline">Features</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="users" 
                  className="flex items-center gap-1 data-[state=active]:bg-gray-800 data-[state=active]:text-white rounded-lg transition-all text-xs lg:text-sm"
                >
                  <Users className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="hidden sm:inline">Users</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="settings" 
                  className="flex items-center gap-1 data-[state=active]:bg-gray-800 data-[state=active]:text-white rounded-lg transition-all text-xs lg:text-sm"
                >
                  <Settings className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="hidden sm:inline">Settings</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="moderation" className="space-y-6">
                <ModerationDashboard />
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <AnalyticsDashboard />
              </TabsContent>

              <TabsContent value="sentiment" className="space-y-6">
                <SentimentAnalytics />
              </TabsContent>

              <TabsContent value="crisis" className="space-y-6">
                <CrisisDetection />
              </TabsContent>

              <TabsContent value="moderators" className="space-y-6">
                <ModeratorDashboard />
              </TabsContent>

              <TabsContent value="impact" className="space-y-6">
                <StoryImpactTracker />
              </TabsContent>

              <TabsContent value="prompts" className="space-y-6">
                <PromptPerformance />
              </TabsContent>

              <TabsContent value="safewords" className="space-y-6">
                <SafeWordsPanel />
              </TabsContent>

              <TabsContent value="rollback" className="space-y-6">
                <RollbackSystem />
              </TabsContent>

              <TabsContent value="experimental" className="space-y-6">
                <ExperimentalFeatures />
              </TabsContent>

              <TabsContent value="users" className="space-y-6">
                <UserManagement />
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading admin dashboard...</p>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
