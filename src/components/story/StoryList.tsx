
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import StoryCard from './StoryCard';
import { Loader2 } from 'lucide-react';

interface Story {
  id: string;
  title: string;
  content: string;
  emotion_tags: string[];
  privacy: string;
  category: string;
  is_anonymous: boolean;
  created_at: string;
  user_id: string;
  view_count: number;
  profiles?: {
    display_name: string;
    avatar_url: string;
  };
}

interface StoryListProps {
  searchQuery?: string;
  categoryFilter?: string;
  emotionFilter?: string;
}

const StoryList = ({ searchQuery = '', categoryFilter = '', emotionFilter = '' }: StoryListProps) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchStories();
  }, [searchQuery, categoryFilter, emotionFilter]);

  const fetchStories = async () => {
    try {
      let query = supabase
        .from('stories')
        .select(`
          *,
          profiles:user_id (
            display_name,
            avatar_url
          )
        `)
        .eq('is_draft', false)
        .order('created_at', { ascending: false });

      // Apply filters
      if (categoryFilter) {
        query = query.eq('category', categoryFilter);
      }

      if (emotionFilter) {
        query = query.contains('emotion_tags', [emotionFilter]);
      }

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%, content.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) throw error;

      setStories(data || []);
    } catch (error) {
      console.error('Error fetching stories:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-womb-plum" />
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-womb-warmgrey text-lg mb-4">No stories found</p>
        <p className="text-womb-warmgrey text-sm">
          {searchQuery || categoryFilter || emotionFilter
            ? "Try adjusting your filters or search terms"
            : "Be the first to share your story!"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} />
      ))}
    </div>
  );
};

export default StoryList;
