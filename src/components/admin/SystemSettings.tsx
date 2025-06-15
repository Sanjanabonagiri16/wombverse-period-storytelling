
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Tag, FileText, Shield, Database, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MoodTag {
  id: string;
  name: string;
  color: string;
  description: string;
  isActive: boolean;
}

interface ContentLimit {
  id: string;
  type: string;
  limit: number;
  unit: string;
  description: string;
}

const SystemSettings = () => {
  const { toast } = useToast();
  const [moodTags, setMoodTags] = useState<MoodTag[]>([
    { id: '1', name: 'Empowered', color: '#10B981', description: 'Feeling strong and confident', isActive: true },
    { id: '2', name: 'Anxious', color: '#F59E0B', description: 'Feeling worried or nervous', isActive: true },
    { id: '3', name: 'Grateful', color: '#8B5CF6', description: 'Feeling thankful and appreciative', isActive: true },
    { id: '4', name: 'Frustrated', color: '#EF4444', description: 'Feeling annoyed or upset', isActive: true },
    { id: '5', name: 'Hopeful', color: '#3B82F6', description: 'Feeling optimistic about the future', isActive: true }
  ]);

  const [contentLimits, setContentLimits] = useState<ContentLimit[]>([
    { id: '1', type: 'Whisper', limit: 280, unit: 'characters', description: 'Maximum length for micro-stories' },
    { id: '2', type: 'Story', limit: 5000, unit: 'characters', description: 'Maximum length for full stories' },
    { id: '3', type: 'Comment', limit: 500, unit: 'characters', description: 'Maximum length for comments' },
    { id: '4', type: 'Bio', limit: 200, unit: 'characters', description: 'Maximum length for user bio' }
  ]);

  const [flagThresholds, setFlagThresholds] = useState({
    autoHide: 3,
    modReview: 5,
    autoRemove: 10
  });

  const [systemSettings, setSystemSettings] = useState({
    enableRegistration: true,
    enableAnonymousPosts: true,
    enableComments: true,
    enableReactions: true,
    maintenanceMode: false,
    autoModeration: true
  });

  const handleSaveMoodTag = (tag: MoodTag) => {
    setMoodTags(prev => prev.map(t => t.id === tag.id ? tag : t));
    toast({
      title: "Mood tag updated",
      description: `${tag.name} has been updated successfully.`
    });
  };

  const handleUpdateContentLimit = (limitId: string, newLimit: number) => {
    setContentLimits(prev => prev.map(l => 
      l.id === limitId ? { ...l, limit: newLimit } : l
    ));
    toast({
      title: "Content limit updated",
      description: "The new limit has been saved."
    });
  };

  const handleUpdateFlagThreshold = (type: string, value: number) => {
    setFlagThresholds(prev => ({ ...prev, [type]: value }));
    toast({
      title: "Flag threshold updated",
      description: "The new threshold has been saved."
    });
  };

  const handleSystemSettingChange = (setting: string, value: boolean) => {
    setSystemSettings(prev => ({ ...prev, [setting]: value }));
    toast({
      title: "System setting updated",
      description: `${setting} has been ${value ? 'enabled' : 'disabled'}.`
    });
  };

  const exportData = (type: string) => {
    toast({
      title: "Export started",
      description: `${type} export has been initiated. You'll receive a download link shortly.`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-purple-400" />
          System Settings & Configuration
        </h2>
      </div>

      <Tabs defaultValue="mood-tags" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 border border-slate-700">
          <TabsTrigger value="mood-tags" className="data-[state=active]:bg-slate-700">
            Mood Tags
          </TabsTrigger>
          <TabsTrigger value="content-limits" className="data-[state=active]:bg-slate-700">
            Content Limits
          </TabsTrigger>
          <TabsTrigger value="flag-thresholds" className="data-[state=active]:bg-slate-700">
            Flag Thresholds
          </TabsTrigger>
          <TabsTrigger value="system" className="data-[state=active]:bg-slate-700">
            System
          </TabsTrigger>
          <TabsTrigger value="export" className="data-[state=active]:bg-slate-700">
            Export
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mood-tags" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Tag className="w-5 h-5 text-green-400" />
                Mood Tag Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {moodTags.map((tag) => (
                  <div
                    key={tag.id}
                    className="bg-slate-700/50 rounded-lg p-4 border border-slate-600"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                      <div>
                        <Input
                          value={tag.name}
                          onChange={(e) => {
                            const updatedTag = { ...tag, name: e.target.value };
                            setMoodTags(prev => prev.map(t => t.id === tag.id ? updatedTag : t));
                          }}
                          className="bg-slate-600 border-slate-500 text-white"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={tag.color}
                          onChange={(e) => {
                            const updatedTag = { ...tag, color: e.target.value };
                            setMoodTags(prev => prev.map(t => t.id === tag.id ? updatedTag : t));
                          }}
                          className="w-10 h-8 rounded border border-slate-500"
                        />
                        <span className="text-sm text-slate-300">{tag.color}</span>
                      </div>
                      <div>
                        <Input
                          value={tag.description}
                          onChange={(e) => {
                            const updatedTag = { ...tag, description: e.target.value };
                            setMoodTags(prev => prev.map(t => t.id === tag.id ? updatedTag : t));
                          }}
                          placeholder="Description..."
                          className="bg-slate-600 border-slate-500 text-white"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Switch
                          checked={tag.isActive}
                          onCheckedChange={(checked) => {
                            const updatedTag = { ...tag, isActive: checked };
                            setMoodTags(prev => prev.map(t => t.id === tag.id ? updatedTag : t));
                          }}
                        />
                        <Button
                          size="sm"
                          onClick={() => handleSaveMoodTag(tag)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content-limits" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                Content Length Limits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contentLimits.map((limit) => (
                  <div
                    key={limit.id}
                    className="bg-slate-700/50 rounded-lg p-4 border border-slate-600"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-white">{limit.type}</h3>
                        <p className="text-sm text-slate-400">{limit.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={limit.limit}
                          onChange={(e) => handleUpdateContentLimit(limit.id, parseInt(e.target.value))}
                          className="w-24 bg-slate-600 border-slate-500 text-white"
                        />
                        <span className="text-sm text-slate-300">{limit.unit}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flag-thresholds" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-400" />
                Flag Thresholds
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-white">Auto-Hide Threshold</h3>
                      <p className="text-sm text-slate-400">Content automatically hidden after this many flags</p>
                    </div>
                    <Input
                      type="number"
                      value={flagThresholds.autoHide}
                      onChange={(e) => handleUpdateFlagThreshold('autoHide', parseInt(e.target.value))}
                      className="w-20 bg-slate-600 border-slate-500 text-white"
                    />
                  </div>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-white">Moderator Review Threshold</h3>
                      <p className="text-sm text-slate-400">Content sent to moderation queue after this many flags</p>
                    </div>
                    <Input
                      type="number"
                      value={flagThresholds.modReview}
                      onChange={(e) => handleUpdateFlagThreshold('modReview', parseInt(e.target.value))}
                      className="w-20 bg-slate-600 border-slate-500 text-white"
                    />
                  </div>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-white">Auto-Remove Threshold</h3>
                      <p className="text-sm text-slate-400">Content automatically removed after this many flags</p>
                    </div>
                    <Input
                      type="number"
                      value={flagThresholds.autoRemove}
                      onChange={(e) => handleUpdateFlagThreshold('autoRemove', parseInt(e.target.value))}
                      className="w-20 bg-slate-600 border-slate-500 text-white"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-purple-400" />
                System Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(systemSettings).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between bg-slate-700/50 rounded-lg p-4 border border-slate-600"
                  >
                    <div>
                      <h3 className="font-semibold text-white capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </h3>
                      <p className="text-sm text-slate-400">
                        {key === 'enableRegistration' && 'Allow new users to register'}
                        {key === 'enableAnonymousPosts' && 'Allow users to post anonymously'}
                        {key === 'enableComments' && 'Allow comments on stories'}
                        {key === 'enableReactions' && 'Allow emoji reactions on content'}
                        {key === 'maintenanceMode' && 'Put the platform in maintenance mode'}
                        {key === 'autoModeration' && 'Enable automatic content moderation'}
                      </p>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) => handleSystemSettingChange(key, checked)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Download className="w-5 h-5 text-indigo-400" />
                Data Export & Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                  <h3 className="font-semibold text-white mb-2">User Data</h3>
                  <p className="text-sm text-slate-400 mb-4">Export anonymized user statistics and trends</p>
                  <Button
                    onClick={() => exportData('User Data')}
                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                  >
                    Export Users CSV
                  </Button>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                  <h3 className="font-semibold text-white mb-2">Content Reports</h3>
                  <p className="text-sm text-slate-400 mb-4">Export flagged content and moderation logs</p>
                  <Button
                    onClick={() => exportData('Content Reports')}
                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                  >
                    Export Reports CSV
                  </Button>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                  <h3 className="font-semibold text-white mb-2">Analytics Data</h3>
                  <p className="text-sm text-slate-400 mb-4">Export platform usage and engagement metrics</p>
                  <Button
                    onClick={() => exportData('Analytics')}
                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                  >
                    Export Analytics CSV
                  </Button>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                  <h3 className="font-semibold text-white mb-2">Active Users</h3>
                  <p className="text-sm text-slate-400 mb-4">Export list of currently active users</p>
                  <Button
                    onClick={() => exportData('Active Users')}
                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                  >
                    Export Active Users
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemSettings;
