
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { TrendingUp, Hash } from 'lucide-react';

interface TagData {
  tag: string;
  count: number;
  trending: boolean;
}

const PopularTags = () => {
  const [popularTags, setPopularTags] = useState<TagData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPopularTags();

    // Set up real-time subscription for story changes
    const channel = supabase
      .channel('popular-tags-changes')
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
      const tagArray: TagData[] = Object.entries(tagCounts)
        .map(([tag, data]) => ({
          tag,
          count: data.count,
          trending: data.recentCount >= 2 // Consider trending if 2+ uses in last week
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 12); // Top 12 tags

      setPopularTags(tagArray);
    } catch (error) {
      console.error('Error fetching popular tags:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mb-8 p-6 bg-gradient-to-r from-slate-900/80 to-indigo-900/60 rounded-xl border border-slate-700">
        <div className="animate-pulse">
          <div className="h-6 bg-slate-700 rounded w-48 mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-10 bg-slate-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (popularTags.length === 0) {
    return null;
  }

  return (
    <div className="mb-8 p-6 bg-gradient-to-r from-slate-900/80 to-indigo-900/60 rounded-xl border border-slate-700">
      <div className="flex items-center space-x-2 mb-4">
        <Hash className="w-5 h-5 text-red-400" />
        <h3 className="text-xl font-playfair font-semibold text-white">
          Popular Tags
        </h3>
        <TrendingUp className="w-4 h-4 text-red-400" />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {popularTags.map((tag, index) => (
          <div
            key={tag.tag}
            className="relative group cursor-pointer bg-slate-800/60 hover:bg-slate-700/60 border border-slate-600 hover:border-red-400/50 rounded-lg p-3 transition-all duration-300 hover:scale-105"
          >
            {tag.trending && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            )}
            
            <div className="text-center">
              <div className="text-white font-medium text-sm mb-1 capitalize">
                #{tag.tag}
              </div>
              <div className="text-slate-400 text-xs">
                {tag.count} {tag.count === 1 ? 'story' : 'stories'}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-4">
        <p className="text-slate-400 text-sm">
          Tags update in real-time • {popularTags.filter(t => t.trending).length} trending this week
        </p>
      </div>
    </div>
  );
};

export default PopularTags;
