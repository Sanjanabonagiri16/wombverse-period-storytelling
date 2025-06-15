
import Layout from '@/components/Layout';
import { Tag, TrendingUp, Hash, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';

interface TagCount {
  tag: string;
  count: number;
  trending: boolean;
  color: string;
}

const PopularTags = () => {
  const [popularTags, setPopularTags] = useState<TagCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const tagColors = [
    'from-womb-crimson to-red-500',
    'from-womb-plum to-purple-500',
    'from-blue-500 to-blue-600',
    'from-pink-500 to-pink-600',
    'from-green-500 to-green-600',
    'from-orange-500 to-orange-600',
    'from-red-500 to-red-600',
    'from-indigo-500 to-indigo-600',
    'from-teal-500 to-teal-600',
    'from-yellow-500 to-yellow-600',
    'from-cyan-500 to-cyan-600',
    'from-gray-500 to-gray-600'
  ];

  useEffect(() => {
    fetchPopularTags();

    // Set up real-time subscription
    const channel = supabase
      .channel('tags-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'stories'
        },
        () => {
          fetchPopularTags();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchPopularTags = async () => {
    try {
      const { data: stories, error } = await supabase
        .from('stories')
        .select('emotion_tags, category, created_at')
        .eq('is_draft', false);

      if (error) throw error;

      // Count tags from emotion_tags and categories
      const tagCounts: { [key: string]: { count: number; recentCount: number } } = {};
      const now = new Date();
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      stories?.forEach(story => {
        const storyDate = new Date(story.created_at);
        const isRecent = storyDate >= oneWeekAgo;

        // Count emotion tags
        story.emotion_tags?.forEach(tag => {
          if (!tagCounts[tag]) {
            tagCounts[tag] = { count: 0, recentCount: 0 };
          }
          tagCounts[tag].count++;
          if (isRecent) tagCounts[tag].recentCount++;
        });

        // Count category as a tag
        if (story.category) {
          if (!tagCounts[story.category]) {
            tagCounts[story.category] = { count: 0, recentCount: 0 };
          }
          tagCounts[story.category].count++;
          if (isRecent) tagCounts[story.category].recentCount++;
        }
      });

      // Convert to array and sort by count
      const tagArray: TagCount[] = Object.entries(tagCounts)
        .map(([tag, data], index) => ({
          tag,
          count: data.count,
          trending: data.recentCount >= 3, // Consider trending if 3+ uses in last week
          color: tagColors[index % tagColors.length]
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 20); // Top 20 tags

      setPopularTags(tagArray);
    } catch (error) {
      console.error('Error fetching popular tags:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTags = popularTags.filter(tag =>
    tag.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const trendingCategories = [
    { name: 'Health & Wellness', description: 'Stories about period health, symptoms, and medical experiences' },
    { name: 'Emotional Journey', description: 'Mental health, mood changes, and emotional experiences' },
    { name: 'Social Impact', description: 'Workplace, school, and social situations involving periods' },
    { name: 'Education & Awareness', description: 'Learning, teaching, and spreading period knowledge' }
  ];

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-womb-charcoal via-womb-deepgrey/20 to-womb-charcoal flex items-center justify-center">
          <div className="text-womb-softwhite text-lg">Loading popular tags...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-womb-charcoal via-womb-deepgrey/20 to-womb-charcoal">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-womb-crimson/20 to-womb-plum/20 px-4 py-2 rounded-full mb-6">
                <Hash className="w-5 h-5 text-womb-crimson" />
                <span className="text-womb-crimson font-medium">Community Tags</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-playfair font-bold text-womb-softwhite mb-6">
                Popular{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-womb-crimson to-womb-plum">
                  Tags
                </span>
              </h1>
              
              <p className="text-xl text-womb-warmgrey max-w-3xl mx-auto leading-relaxed">
                Explore the most discussed topics in our community. Find stories that resonate with your experience 
                and discover new perspectives on menstrual health and wellness.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md mx-auto mb-12">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-womb-warmgrey w-5 h-5" />
              <input
                type="text"
                placeholder="Search tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-womb-deepgrey/50 border border-womb-deepgrey rounded-lg text-womb-softwhite placeholder-womb-warmgrey focus:border-womb-crimson focus:outline-none transition-colors"
              />
            </div>

            {/* Popular Tags Grid */}
            {filteredTags.length === 0 ? (
              <div className="text-center py-12 mb-16">
                <p className="text-womb-warmgrey text-lg mb-4">
                  {searchTerm ? 'No tags found matching your search' : 'No tags available yet'}
                </p>
                <p className="text-womb-warmgrey text-sm">
                  {searchTerm ? 'Try a different search term' : 'Be the first to share a story and create tags!'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
                {filteredTags.map((tag, index) => (
                  <div
                    key={tag.tag}
                    className="group relative bg-gradient-to-br from-womb-deepgrey/60 to-womb-deepgrey/40 backdrop-blur-sm rounded-xl p-6 border border-womb-deepgrey hover:border-womb-crimson/30 transition-all duration-300 hover:shadow-lg hover:shadow-womb-crimson/10 cursor-pointer animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {tag.trending && (
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-womb-crimson to-womb-plum text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                        <TrendingUp className="w-3 h-3" />
                        <span>Trending</span>
                      </div>
                    )}
                    
                    <div className="text-center">
                      <div className={`w-12 h-12 bg-gradient-to-r ${tag.color} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                        <Tag className="w-6 h-6 text-white" />
                      </div>
                      
                      <h3 className="font-semibold text-womb-softwhite mb-2 group-hover:text-womb-crimson transition-colors capitalize">
                        {tag.tag}
                      </h3>
                      
                      <p className="text-womb-warmgrey text-sm">
                        {tag.count} {tag.count === 1 ? 'story' : 'stories'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Categories Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-playfair font-bold text-womb-softwhite mb-8 text-center">
                Browse by Category
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {trendingCategories.map((category, index) => (
                  <div
                    key={category.name}
                    className="bg-gradient-to-r from-womb-deepgrey/50 to-womb-deepgrey/30 backdrop-blur-sm rounded-xl p-6 border border-womb-deepgrey hover:border-womb-plum/30 transition-all duration-300 cursor-pointer animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <h3 className="text-xl font-playfair font-bold text-womb-softwhite mb-3">
                      {category.name}
                    </h3>
                    <p className="text-womb-warmgrey leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-womb-deepgrey/60 to-womb-deepgrey/40 backdrop-blur-sm rounded-xl p-8 text-center border border-womb-deepgrey">
              <h3 className="text-2xl font-playfair font-bold text-womb-softwhite mb-4">
                Can't Find Your Topic?
              </h3>
              <p className="text-womb-warmgrey mb-6 max-w-2xl mx-auto">
                Start a new conversation! Share your story and create new tags that represent your unique experience.
              </p>
              <div className="space-y-4">
                <Link to="/auth">
                  <button className="bg-gradient-to-r from-womb-crimson to-womb-plum hover:from-womb-crimson/90 hover:to-womb-plum/90 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 mr-4">
                    Share Your Story
                  </button>
                </Link>
                <Link to="/stories">
                  <button className="bg-gradient-to-r from-womb-plum to-womb-crimson hover:from-womb-plum/90 hover:to-womb-crimson/90 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105">
                    📖 Explore All Stories
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PopularTags;
