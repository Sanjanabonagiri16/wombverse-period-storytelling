
import Layout from '@/components/Layout';
import { Clock, TrendingUp, MessageCircle, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';

interface Story {
  id: string;
  title: string;
  content: string;
  user_id: string;
  created_at: string;
  category: string;
  view_count: number;
  is_anonymous: boolean;
  profiles?: {
    display_name: string;
  } | null;
}

const RecentStories = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentStories();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('recent-stories-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'stories'
        },
        () => {
          fetchRecentStories();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchRecentStories = async () => {
    try {
      const { data: storiesData, error } = await supabase
        .from('stories')
        .select('*')
        .eq('is_draft', false)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      const storiesWithProfiles: Story[] = [];
      
      if (storiesData) {
        for (const story of storiesData) {
          let profileData = null;
          
          if (!story.is_anonymous) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('display_name')
              .eq('id', story.user_id)
              .single();
            
            profileData = profile;
          }
          
          storiesWithProfiles.push({
            ...story,
            profiles: profileData
          });
        }
      }

      setStories(storiesWithProfiles);
    } catch (error) {
      console.error('Error fetching recent stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };

  const isNewStory = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    return diffInHours <= 24;
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-womb-charcoal via-womb-deepgrey/20 to-womb-charcoal flex items-center justify-center">
          <div className="text-womb-softwhite text-lg">Loading recent stories...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-womb-charcoal via-womb-deepgrey/20 to-womb-charcoal">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-womb-plum/20 to-womb-crimson/20 px-4 py-2 rounded-full mb-6">
                <Clock className="w-5 h-5 text-womb-plum" />
                <span className="text-womb-plum font-medium">Latest Updates</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-playfair font-bold text-womb-softwhite mb-6">
                Recent{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-womb-plum to-womb-crimson">
                  Stories
                </span>
              </h1>
              
              <p className="text-xl text-womb-warmgrey max-w-2xl mx-auto leading-relaxed">
                Stay connected with the latest stories shared by our community members. 
                Fresh perspectives, new voices, and ongoing conversations.
              </p>
            </div>

            {/* Stories List */}
            {stories.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-womb-warmgrey text-lg mb-4">No recent stories found</p>
                <p className="text-womb-warmgrey text-sm">
                  Be the first to share your story!
                </p>
              </div>
            ) : (
              <div className="space-y-6 mb-12">
                {stories.map((story, index) => (
                  <div
                    key={story.id}
                    className="group bg-gradient-to-r from-womb-deepgrey/40 to-womb-deepgrey/20 backdrop-blur-sm rounded-xl p-6 border border-womb-deepgrey hover:border-womb-plum/30 transition-all duration-300 hover:shadow-lg hover:shadow-womb-plum/10 animate-fade-in cursor-pointer"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          {isNewStory(story.created_at) && (
                            <span className="bg-gradient-to-r from-womb-crimson to-womb-plum text-white px-2 py-1 rounded-full text-xs font-medium animate-pulse">
                              NEW
                            </span>
                          )}
                          <span className="bg-womb-plum/20 text-womb-plum px-3 py-1 rounded-full text-sm font-medium">
                            {story.category}
                          </span>
                          <span className="text-womb-warmgrey text-sm flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {getTimeAgo(story.created_at)}
                          </span>
                        </div>
                        
                        <h2 className="text-xl md:text-2xl font-playfair font-bold text-womb-softwhite mb-3 group-hover:text-womb-plum transition-colors duration-300">
                          {story.title}
                        </h2>
                        
                        <p className="text-womb-warmgrey leading-relaxed mb-4">
                          {story.content.length > 150 
                            ? `${story.content.substring(0, 150)}...`
                            : story.content
                          }
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-womb-softwhite font-medium">
                            by {story.is_anonymous ? 'Anonymous' : story.profiles?.display_name || 'Unknown'}
                          </span>
                          
                          <div className="flex items-center space-x-4 text-sm text-womb-warmgrey">
                            <div className="flex items-center space-x-1">
                              <Heart className="w-4 h-4 text-womb-crimson" />
                              <span>0</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>0</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Trending Section */}
            <div className="bg-gradient-to-r from-womb-deepgrey/50 to-womb-deepgrey/30 backdrop-blur-sm rounded-xl p-8 border border-womb-deepgrey">
              <div className="flex items-center space-x-2 mb-6">
                <TrendingUp className="w-6 h-6 text-womb-crimson" />
                <h3 className="text-2xl font-playfair font-bold text-womb-softwhite">
                  Trending Topics
                </h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['First Period', 'Self-Care', 'Period Products', 'Body Positivity'].map((topic) => (
                  <div
                    key={topic}
                    className="bg-womb-charcoal/50 hover:bg-womb-crimson/20 border border-womb-deepgrey hover:border-womb-crimson/30 rounded-lg p-4 text-center transition-all duration-300 cursor-pointer"
                  >
                    <span className="text-womb-softwhite font-medium">{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation to All Stories */}
            <div className="text-center mt-12">
              <Link to="/stories">
                <button className="bg-gradient-to-r from-womb-plum to-womb-crimson hover:from-womb-plum/90 hover:to-womb-crimson/90 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105">
                  📖 Explore All Stories
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RecentStories;
