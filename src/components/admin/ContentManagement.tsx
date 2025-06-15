
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, MessageSquare, Tag, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Story {
  id: string;
  title: string;
  content: string;
  created_at: string;
  view_count: number;
  user_id: string;
}

interface MoodTag {
  id: string;
  name: string;
  description: string;
  color_hex: string;
}

const ContentManagement = () => {
  const { toast } = useToast();
  const [featuredStories, setFeaturedStories] = useState<Story[]>([]);
  const [allStories, setAllStories] = useState<Story[]>([]);
  const [moodTags, setMoodTags] = useState<MoodTag[]>([]);
  const [newTagName, setNewTagName] = useState('');
  const [newTagDescription, setNewTagDescription] = useState('');
  const [newTagColor, setNewTagColor] = useState('#6B7280');

  useEffect(() => {
    fetchStories();
    fetchMoodTags();
  }, []);

  const fetchStories = async () => {
    try {
      const { data } = await supabase
        .from('stories')
        .select('*')
        .eq('privacy', 'public')
        .eq('is_draft', false)
        .order('created_at', { ascending: false })
        .limit(20);

      setAllStories(data || []);
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  };

  const fetchMoodTags = async () => {
    try {
      const { data } = await supabase
        .from('mood_tags')
        .select('*')
        .order('name');

      setMoodTags(data || []);
    } catch (error) {
      console.error('Error fetching mood tags:', error);
    }
  };

  const addMoodTag = async () => {
    if (!newTagName.trim()) return;

    try {
      const { error } = await supabase
        .from('mood_tags')
        .insert({
          name: newTagName,
          description: newTagDescription,
          color_hex: newTagColor
        });

      if (error) throw error;

      toast({
        title: "Mood tag added",
        description: "New mood tag has been created successfully.",
      });

      setNewTagName('');
      setNewTagDescription('');
      setNewTagColor('#6B7280');
      fetchMoodTags();
    } catch (error) {
      console.error('Error adding mood tag:', error);
      toast({
        title: "Error",
        description: "Failed to add mood tag.",
        variant: "destructive",
      });
    }
  };

  const createCommunityPost = async (type: string, content: string, title?: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('community_posts')
        .insert({
          user_id: user.id,
          type,
          title,
          content,
          is_pinned: true
        });

      if (error) throw error;

      toast({
        title: "Community post created",
        description: "Admin announcement has been posted to the community wall.",
      });
    } catch (error) {
      console.error('Error creating community post:', error);
      toast({
        title: "Error",
        description: "Failed to create community post.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-womb-softwhite flex items-center gap-2">
        <Star className="w-6 h-6" />
        Content Management
      </h2>

      <Tabs defaultValue="featured" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="featured">Featured Stories</TabsTrigger>
          <TabsTrigger value="community">Community Posts</TabsTrigger>
          <TabsTrigger value="moods">Mood Tags</TabsTrigger>
        </TabsList>

        <TabsContent value="featured">
          <Card>
            <CardHeader>
              <CardTitle>Featured Stories Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allStories.slice(0, 10).map((story) => (
                  <div key={story.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-womb-softwhite">{story.title}</h4>
                      <p className="text-sm text-womb-warmgrey">
                        {story.content.substring(0, 100)}...
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">{story.view_count} views</Badge>
                        <span className="text-xs text-womb-warmgrey">
                          {new Date(story.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Star className="w-4 h-4 mr-1" />
                      Feature
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="community">
          <Card>
            <CardHeader>
              <CardTitle>Create Admin Announcement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input placeholder="Announcement title (optional)" />
                <Textarea 
                  placeholder="Write your announcement..."
                  className="min-h-32"
                />
                <Button 
                  onClick={() => createCommunityPost('text', 'Sample announcement', 'Admin Update')}
                  className="w-full"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Post Announcement
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="moods">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Mood Tag</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    placeholder="Mood tag name"
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                  />
                  <Textarea
                    placeholder="Description (optional)"
                    value={newTagDescription}
                    onChange={(e) => setNewTagDescription(e.target.value)}
                  />
                  <div className="flex items-center gap-2">
                    <Input
                      type="color"
                      value={newTagColor}
                      onChange={(e) => setNewTagColor(e.target.value)}
                      className="w-20"
                    />
                    <Button onClick={addMoodTag} className="flex-1">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Mood Tag
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Existing Mood Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {moodTags.map((tag) => (
                    <div key={tag.id} className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: tag.color_hex }}
                        />
                        <span className="font-medium text-womb-softwhite">{tag.name}</span>
                      </div>
                      <p className="text-sm text-womb-warmgrey">{tag.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManagement;
