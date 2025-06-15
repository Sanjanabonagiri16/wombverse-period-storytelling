
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Shield, Ban, Eye, UserCheck, AlertTriangle, MessageSquare, Activity } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  display_name: string;
  created_at: string;
  story_count: number;
  is_verified: boolean;
  roles?: string[];
  last_active?: string;
  status: 'active' | 'banned' | 'shadowbanned' | 'warned';
  flagged_content_count?: number;
}

interface UserReport {
  id: string;
  reporter_id: string;
  reported_user_id: string;
  reported_user_name: string;
  reason: string;
  description: string;
  status: 'open' | 'investigating' | 'resolved' | 'dismissed';
  created_at: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

const UserManagement = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [reports, setReports] = useState<UserReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchUsers();
    fetchReports();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesData) {
        const usersWithRoles = await Promise.all(
          profilesData.map(async (profile) => {
            const { data: roles } = await supabase
              .from('user_roles')
              .select('role')
              .eq('user_id', profile.id);

            return {
              ...profile,
              roles: roles?.map(r => r.role) || [],
              status: 'active' as const,
              last_active: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
              flagged_content_count: Math.floor(Math.random() * 5)
            };
          })
        );

        setUsers(usersWithRoles);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReports = () => {
    // Mock data for demo
    setReports([
      {
        id: '1',
        reporter_id: 'user1',
        reported_user_id: 'user2',
        reported_user_name: 'Jane D.',
        reason: 'harassment',
        description: 'User has been sending inappropriate messages and making others uncomfortable.',
        status: 'open',
        created_at: '2024-12-15T10:30:00Z',
        priority: 'high'
      },
      {
        id: '2',
        reporter_id: 'user3',
        reported_user_id: 'user4',
        reported_user_name: 'Anonymous User',
        reason: 'spam',
        description: 'Account posting repetitive promotional content across multiple stories.',
        status: 'investigating',
        created_at: '2024-12-14T16:20:00Z',
        priority: 'medium'
      }
    ]);
  };

  const assignRole = async (userId: string, role: string) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .insert({ user_id: userId, role });

      if (error) throw error;

      toast({
        title: "Role assigned",
        description: `User has been assigned the ${role} role.`,
      });

      fetchUsers();
    } catch (error) {
      console.error('Error assigning role:', error);
      toast({
        title: "Error",
        description: "Failed to assign role.",
        variant: "destructive",
      });
    }
  };

  const handleUserAction = (userId: string, action: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: action as any }
        : user
    ));

    toast({
      title: "User action completed",
      description: `User has been ${action}.`,
    });
  };

  const handleReportAction = (reportId: string, action: string) => {
    setReports(prev => prev.map(report => 
      report.id === reportId 
        ? { ...report, status: action as any }
        : report
    ));

    toast({
      title: "Report updated",
      description: `Report status changed to ${action}.`,
    });
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.display_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.roles?.includes(roleFilter);
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'banned': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'shadowbanned': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'warned': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
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

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2 text-slate-400">Loading users...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Users className="w-6 h-6 text-blue-400" />
          User Management
        </h2>
      </div>

      <Tabs defaultValue="directory" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border border-slate-700">
          <TabsTrigger value="directory" className="data-[state=active]:bg-slate-700">
            User Directory
          </TabsTrigger>
          <TabsTrigger value="reports" className="data-[state=active]:bg-slate-700">
            User Reports
          </TabsTrigger>
          <TabsTrigger value="roles" className="data-[state=active]:bg-slate-700">
            Role Management
          </TabsTrigger>
        </TabsList>

        <TabsContent value="directory" className="space-y-6">
          {/* Filters */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                />
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="moderator">Moderator</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="banned">Banned</SelectItem>
                    <SelectItem value="shadowbanned">Shadowbanned</SelectItem>
                    <SelectItem value="warned">Warned</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700">
                      <TableHead className="text-slate-300">User</TableHead>
                      <TableHead className="text-slate-300">Status</TableHead>
                      <TableHead className="text-slate-300">Stories</TableHead>
                      <TableHead className="text-slate-300">Roles</TableHead>
                      <TableHead className="text-slate-300">Last Active</TableHead>
                      <TableHead className="text-slate-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id} className="border-slate-700">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-white">
                              {user.display_name || 'Anonymous'}
                            </span>
                            {user.is_verified && (
                              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                                Verified
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-300">{user.story_count}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {user.roles?.map(role => (
                              <Badge key={role} variant="outline" className="border-slate-600 text-slate-300">
                                {role}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-300">
                          {user.last_active ? 
                            new Date(user.last_active).toLocaleDateString() : 
                            'Never'
                          }
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => assignRole(user.id, 'moderator')}
                              className="border-slate-600 text-slate-300 hover:bg-slate-700"
                            >
                              <Shield className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-slate-600 text-slate-300 hover:bg-slate-700"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            {user.status === 'active' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleUserAction(user.id, 'banned')}
                                className="border-red-600 text-red-400 hover:bg-red-900/20"
                              >
                                <Ban className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-400" />
                User Reports & Harassment Claims
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.map((report) => (
                  <div
                    key={report.id}
                    className="bg-slate-700/50 rounded-lg p-4 border border-slate-600"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-white">
                          Report against: {report.reported_user_name}
                        </h3>
                        <p className="text-sm text-slate-400">
                          Reason: {report.reason} • {new Date(report.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getPriorityColor(report.priority)}>
                          {report.priority}
                        </Badge>
                        <Badge variant="outline" className="border-slate-600 text-slate-300">
                          {report.status}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-slate-300 mb-4">{report.description}</p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleReportAction(report.id, 'investigating')}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Investigate
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleReportAction(report.id, 'resolved')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Resolve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReportAction(report.id, 'dismissed')}
                        className="border-slate-600 text-slate-300"
                      >
                        Dismiss
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-green-400" />
                Role Management System
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                  <h3 className="font-semibold text-white mb-2">Admin</h3>
                  <p className="text-sm text-slate-400 mb-3">Full platform access and control</p>
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                    {users.filter(u => u.roles?.includes('admin')).length} users
                  </Badge>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                  <h3 className="font-semibold text-white mb-2">Moderator</h3>
                  <p className="text-sm text-slate-400 mb-3">Content moderation and user management</p>
                  <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                    {users.filter(u => u.roles?.includes('moderator')).length} users
                  </Badge>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                  <h3 className="font-semibold text-white mb-2">User</h3>
                  <p className="text-sm text-slate-400 mb-3">Standard platform access</p>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    {users.filter(u => !u.roles?.length || u.roles?.includes('user')).length} users
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserManagement;
