import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import StoryCard from './StoryCard';
import PopularTags from './PopularTags';
import { Loader2, Filter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';

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
  is_draft: boolean;
  profiles?: { display_name: string; avatar_url: string } | null;
}

const STORIES_PER_PAGE = 10;

const StoryExplorer = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [emotionFilter, setEmotionFilter] = useState('');
  const [moodFilter, setMoodFilter] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const { user } = useAuth();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const location = useLocation();

  const fetchStories = useCallback(async (isLoadMore = false) => {
    const currentLoading = isLoadMore ? setLoadingMore : setLoading;
    currentLoading(true);
    setErrorMsg(null);

    if (!supabase) {
      setErrorMsg('Supabase client is not properly configured.');
      currentLoading(false);
      return;
    }

    try {
      const start = page * STORIES_PER_PAGE;
      const end = start + STORIES_PER_PAGE - 1;

      let query = supabase
        .from('stories')
        .select('*, profiles(display_name, avatar_url)')
        .eq('is_draft', false)
        .order('created_at', { ascending: false })
        .range(start, end);

      if (emotionFilter) {
        query = query.contains('emotion_tags', [emotionFilter]);
      }

      if (moodFilter) {
        query = query.contains('emotion_tags', [moodFilter]);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      if (data) {
        const processedStories = data.map((rawStory: Record<string, any>) => {
          const story: Story = {
            id: rawStory.id,
            title: rawStory.title,
            content: rawStory.content,
            emotion_tags: rawStory.emotion_tags,
            privacy: rawStory.privacy,
            category: rawStory.category,
            is_anonymous: rawStory.is_anonymous,
            created_at: rawStory.created_at,
            user_id: rawStory.user_id,
            view_count: rawStory.view_count,
            is_draft: rawStory.is_draft,
            profiles: !rawStory.is_anonymous &&
              rawStory.profiles &&
              typeof rawStory.profiles === 'object' &&
              'display_name' in rawStory.profiles
                ? {
                    display_name: rawStory.profiles.display_name,
                    avatar_url: rawStory.profiles.avatar_url
                  }
                : null
          };
          return story;
        });

        setStories(prev => isLoadMore ? [...prev, ...processedStories] : processedStories);
        setHasMore(processedStories.length === STORIES_PER_PAGE);
      }
    } catch (err) {
      console.error('Error fetching stories:', err);
      const message = err instanceof Error ? err.message : 'An unknown error occurred.';
      setErrorMsg(`Failed to load stories: ${message}`);
    } finally {
      currentLoading(false);
    }
  }, [page, emotionFilter, moodFilter]);

  useEffect(() => {
    setPage(0);
    setStories([]);
    fetchStories();
  }, [user?.id, location, emotionFilter, moodFilter]);

  const loadMore = useCallback(() => {
    setPage(prev => prev + 1);
    fetchStories(true);
  }, [fetchStories]);

  const emotions = [
    { id: 'empowering', label: 'Empowering', emoji: '💪' },
    { id: 'challenging', label: 'Challenging', emoji: '😤' },
    { id: 'educational', label: 'Educational', emoji: '📚' },
    { id: 'supportive', label: 'Supportive', emoji: '🤗' },
    { id: 'funny', label: 'Funny', emoji: '😄' },
    { id: 'scary', label: 'Scary', emoji: '😰' },
    { id: 'relieving', label: 'Relieving', emoji: '😌' },
    { id: 'frustrating', label: 'Frustrating', emoji: '😠' },
  ];

  const moods = [
    { id: 'calm', label: 'Calm', emoji: '😌' },
    { id: 'grateful', label: 'Grateful', emoji: '🙏' },
    { id: 'angry', label: 'Angry', emoji: '😠' },
    { id: 'sad', label: 'Sad', emoji: '😢' },
    { id: 'empowered', label: 'Empowered', emoji: '💪' },
    { id: 'anxious', label: 'Anxious', emoji: '😰' },
    { id: 'hopeful', label: 'Hopeful', emoji: '✨' },
    { id: 'frustrated', label: 'Frustrated', emoji: '😤' },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-womb-maroon" />
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="text-center py-12">
        <p className="text-womb-crimson text-lg mb-4">{errorMsg}</p>
        <Button 
          onClick={() => fetchStories()} 
          variant="outline" 
          className="mt-4"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Popular Tags Section */}
      <PopularTags />

      {/* Filters */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-womb-warmgrey" />
          <h3 className="text-lg font-medium text-womb-softwhite">Filter by feeling</h3>
        </div>
        
        {/* Emotion Tags Filter */}
        <div className="space-y-2">
          <p className="text-sm text-womb-warmgrey">Emotional tags:</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setEmotionFilter('')}
              className={`px-3 py-1 rounded-full text-sm transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                emotionFilter === '' 
                  ? 'bg-womb-crimson text-womb-softwhite' 
                  : 'bg-womb-deepgrey text-womb-warmgrey hover:bg-womb-plum'
              }`}
            >
              All Emotions
            </button>
            {emotions.map((emotion) => (
              <button
                key={emotion.id}
                onClick={() => setEmotionFilter(emotion.id)}
                className={`px-3 py-1 rounded-full text-sm transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                  emotionFilter === emotion.id
                    ? 'bg-womb-crimson text-womb-softwhite'
                    : 'bg-womb-deepgrey text-womb-warmgrey hover:bg-womb-plum'
                }`}
              >
                {emotion.emoji} {emotion.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mood Tags Filter */}
        <div className="space-y-2">
          <p className="text-sm text-womb-warmgrey">Mood-based stories:</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setMoodFilter('')}
              className={`px-3 py-1 rounded-full text-sm transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                moodFilter === ''
                  ? 'bg-womb-crimson text-womb-softwhite'
                  : 'bg-womb-deepgrey text-womb-warmgrey hover:bg-womb-plum'
              }`}
            >
              All Moods
            </button>
            {moods.map((mood) => (
              <button
                key={mood.id}
                onClick={() => setMoodFilter(mood.id)}
                className={`px-3 py-1 rounded-full text-sm transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                  moodFilter === mood.id
                    ? 'bg-womb-crimson text-womb-softwhite'
                    : 'bg-womb-deepgrey text-womb-warmgrey hover:bg-womb-plum'
                }`}
              >
                {mood.emoji} {mood.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={loadMore}
            disabled={loadingMore}
            className="flex items-center space-x-2"
          >
            {loadingMore ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
            <span>{loadingMore ? 'Loading...' : 'Load More'}</span>
          </Button>
        </div>
      )}

      {/* No Stories Message */}
      {stories.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-womb-warmgrey">No stories found matching your filters.</p>
        </div>
      )}
    </div>
  );
};

export default StoryExplorer;
