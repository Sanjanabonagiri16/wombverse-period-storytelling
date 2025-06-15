
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Star, MessageSquare, Calendar, Edit, Trash2, Pin, Image, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FeaturedStory {
  id: string;
  title: string;
  author: string;
  excerpt: string;
  reactions: number;
  featured_at: string;
  status: 'active' | 'scheduled' | 'expired';
}

interface CommunityPost {
  id: string;
  type: 'announcement' | 'poll' | 'quote' | 'media';
  title: string;
  content: string;
  author: string;
  scheduled_for?: string;
  status: 'draft' | 'published' | 'scheduled';
  engagement: number;
}

interface MoodPrompt {
  id: string;
  prompt: string;
  category: string;
  is_active: boolean;
  usage_count: number;
  last_used: string;
}

const ContentManagement = () => {
  const { toast } = useToast();
  const [featuredStories, setFeaturedStories] = useState<FeaturedStory[]>([]);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([]);
  const [moodPrompts, setMoodPrompts] = useState<MoodPrompt[]>([]);
  const [newPost, setNewPost] = useState({
    type: 'announcement' as const,
    title: '',
    content: ''
  });

  useEffect(() => {
    // Mock data for demo
    setFeaturedStories([
      {
        id: '1',
        title: 'Breaking the Silence: My First Period Story',
        author: 'Sarah M.',
        excerpt: 'A powerful narrative about overcoming shame...',
        reactions: 234,
        featured_at: '2024-12-15T10:00:00Z',
        status: 'active'
      },
      {
        id: '2',
        title: 'Endometriosis Journey: Finding Hope',
        author: 'Maria L.',
        excerpt: 'How connecting with others transformed my pain...',
        reactions: 189,
        featured_at: '2024-12-14T15:30:00Z',
        status: 'active'
      }
    ]);

    setCommunityPosts([
      {
        id: '1',
        type: 'announcement',
        title: 'Welcome New Members!',
        content: 'We\'re excited to have new voices joining our community...',
        author: 'Admin',
        status: 'published',
        engagement: 45
      },
      {
        id: '2',
        type: 'poll',
        title: 'Which topics would you like to see more of?',
        content: 'Help us understand what content resonates with you...',
        author: 'Moderator',
        status: 'published',
        engagement: 78
      }
    ]);

    setMoodPrompts([
      {
        id: '1',
        prompt: 'Describe a moment when you felt truly understood by someone about your period experience.',
        category: 'Connection',
        is_active: true,
        usage_count: 23,
        last_used: '2024-12-15T09:30:00Z'
      },
      {
        id: '2',
        prompt: 'What would you tell your younger self about periods?',
        category: 'Reflection',
        is_active: true,
        usage_count: 45,
        last_used: '2024-12-14T14:20:00Z'
      },
      {
        id: '3',
        prompt: 'Share a time when period tracking helped you understand your body better.',
        category: 'Health',
        is_active: false,
        usage_count: 12,
        last_used: '2024-12-10T11:15:00Z'
      }
    ]);
  }, []);

  const handleFeatureStory = (storyId: string) => {
    toast({
      title: "Story featured",
      description: "Story has been added to the featured section."
    });
  };

  const handleUnfeatureStory = (storyId: string) => {
    setFeaturedStories(prev => prev.filter(story => story.id !== storyId));
    toast({
      title: "Story unfeatured",
      description: "Story has been removed from featured section."
    });
  };

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const post: CommunityPost = {
      id: Date.now().toString(),
      ...newPost,
      author: 'Admin',
      status: 'published',
      engagement: 0
    };

    setCommunityPosts(prev => [post, ...prev]);
    setNewPost({ type: 'announcement', title: '', content: '' });

    toast({
      title: "Post created",
      description: "Community post has been published successfully."
    });
  };

  const handleTogglePrompt = (promptId: string) => {
    setMoodPrompts(prev => prev.map(prompt => 
      prompt.id === promptId 
        ? { ...prompt, is_active: !prompt.is_active }
        : prompt
    ));

    toast({
      title: "Prompt updated",
      description: "Mood prompt status has been changed."
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'published': return 'bg-green-900/30 text-green-200 border-green-700/50';
      case 'scheduled': return 'bg-indigo-900/30 text-indigo-200 border-indigo-700/50';
      case 'draft': return 'bg-orange-900/30 text-orange-200 border-orange-700/50';
      case 'expired': return 'bg-red-900/30 text-red-200 border-red-700/50';
      default: return 'bg-gray-900/30 text-gray-200 border-gray-700/50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Star className="w-6 h-6 text-indigo-400" />
          Content Management Tools
        </h2>
      </div>

      <Tabs defaultValue="featured" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-black/50 border border-gray-800">
          <TabsTrigger value="featured" className="data-[state=active]:bg-gray-900 data-[state=active]:text-white">
            Featured Stories
          </TabsTrigger>
          <TabsTrigger value="community" className="data-[state=active]:bg-gray-900 data-[state=active]:text-white">
            Community Wall
          </TabsTrigger>
          <TabsTrigger value="prompts" className="data-[state=active]:bg-gray-900 data-[state=active]:text-white">
            Mood Prompts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="featured" className="space-y-6">
          <Card className="bg-black/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Star className="w-5 h-5 text-indigo-400" />
                Featured Stories Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {featuredStories.map((story) => (
                  <div
                    key={story.id}
                    className="bg-gray-900/50 rounded-lg p-4 border border-gray-700"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-1">{story.title}</h3>
                        <p className="text-sm text-gray-400 mb-2">by {story.author}</p>
                        <p className="text-gray-300 text-sm mb-3">{story.excerpt}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <BarChart3 className="w-4 h-4" />
                            {story.reactions} reactions
                          </span>
                          <span>Featured: {new Date(story.featured_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(story.status)}>
                          {story.status}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUnfeatureStory(story.id)}
                          className="border-red-700 text-red-400 hover:bg-red-900/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="community" className="space-y-6">
          {/* Create New Post */}
          <Card className="bg-black/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Edit className="w-5 h-5 text-indigo-400" />
                Create Community Post
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Post Type
                </label>
                <select
                  value={newPost.type}
                  onChange={(e) => setNewPost(prev => ({ ...prev, type: e.target.value as any }))}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white"
                >
                  <option value="announcement">Announcement</option>
                  <option value="poll">Poll</option>
                  <option value="quote">Inspirational Quote</option>
                  <option value="media">Media Content</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title
                </label>
                <Input
                  value={newPost.title}
                  onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter post title..."
                  className="bg-gray-900 border-gray-700 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Content
                </label>
                <Textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Enter post content..."
                  rows={4}
                  className="bg-gray-900 border-gray-700 text-white"
                />
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handleCreatePost} className="bg-indigo-700 hover:bg-indigo-600">
                  Publish Now
                </Button>
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                  Save as Draft
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Community Posts List */}
          <Card className="bg-black/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-indigo-400" />
                Community Posts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {communityPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-gray-900/50 rounded-lg p-4 border border-gray-700"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-white">{post.title}</h3>
                        <p className="text-sm text-gray-400">by {post.author}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(post.status)}>
                          {post.status}
                        </Badge>
                        <Badge variant="outline" className="border-gray-700 text-gray-300">
                          {post.type}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-3">{post.content}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">
                        {post.engagement} interactions
                      </span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-700 text-red-400 hover:bg-red-900/20">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prompts" className="space-y-6">
          <Card className="bg-black/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-400" />
                Mood Prompt Editor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {moodPrompts.map((prompt) => (
                  <div
                    key={prompt.id}
                    className="bg-gray-900/50 rounded-lg p-4 border border-gray-700"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <p className="text-white font-medium mb-2">{prompt.prompt}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>Category: {prompt.category}</span>
                          <span>Used {prompt.usage_count} times</span>
                          <span>Last used: {new Date(prompt.last_used).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={prompt.is_active ? 
                          'bg-green-900/30 text-green-200 border-green-700/50' : 
                          'bg-red-900/30 text-red-200 border-red-700/50'
                        }>
                          {prompt.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                        <Button
                          size="sm"
                          onClick={() => handleTogglePrompt(prompt.id)}
                          className={prompt.is_active ? 
                            'bg-red-800 hover:bg-red-700' : 
                            'bg-green-800 hover:bg-green-700'
                          }
                        >
                          {prompt.is_active ? 'Deactivate' : 'Activate'}
                        </Button>
                      </div>
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

export default ContentManagement;
