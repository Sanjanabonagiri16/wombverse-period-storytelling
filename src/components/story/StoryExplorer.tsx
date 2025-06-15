import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import StoryCard from './StoryCard';
import PopularTags from './PopularTags';
import { Loader2, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  } | null;
}

const StoryExplorer = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [emotionFilter, setEmotionFilter] = useState('');
  const [moodFilter, setMoodFilter] = useState('');
  const [page, setPage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useAuth();

  const ITEMS_PER_PAGE = 6;

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

  useEffect(() => {
    fetchStories(true);
    setTimeout(() => setIsVisible(true), 100);
  }, [emotionFilter, moodFilter]);

  const fetchStories = async (reset = false) => {
    if (reset) {
      setLoading(true);
      setPage(0);
    } else {
      setLoadingMore(true);
    }

    try {
      const currentPage = reset ? 0 : page;
      let query = supabase
        .from('stories')
        .select('*')
        .eq('is_draft', false)
        .order('created_at', { ascending: false })
        .range(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE - 1);

      if (emotionFilter) {
        query = query.contains('emotion_tags', [emotionFilter]);
      }

      if (moodFilter) {
        query = query.contains('emotion_tags', [moodFilter]);
      }

      const { data: storiesData, error } = await query;

      if (error) throw error;

      const stories: Story[] = [];
      
      if (storiesData) {
        for (const story of storiesData) {
          let profileData = null;
          
          if (!story.is_anonymous) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('display_name, avatar_url')
              .eq('id', story.user_id)
              .single();
            
            profileData = profile;
          }
          
          stories.push({
            ...story,
            profiles: profileData
          });
        }
      }

      if (reset) {
        setStories(stories);
      } else {
        setStories(prev => [...prev, ...stories]);
      }

      setHasMore(stories.length === ITEMS_PER_PAGE);
      setPage(currentPage + 1);

    } catch (error) {
      console.error('Error fetching stories:', error);
      if (reset) setStories([]);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      fetchStories(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-womb-maroon" />
      </div>
    );
  }

  return (
    <div className="space-y-6 relative">
      {/* Popular Tags Section with entrance animation */}
      <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <PopularTags />
      </div>

      {/* Filters with staggered animations */}
      <div className={`space-y-4 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
        <div className="flex items-center space-x-2 animate-slide-in-left">
          <Filter className="w-5 h-5 text-white transition-all duration-300 hover:text-womb-maroon hover:scale-110" />
          <h3 className="text-lg font-medium text-white transition-all duration-300 hover:text-womb-mediumgray">Filter by feeling</h3>
        </div>
        
        {/* Emotion Tags Filter */}
        <div className="space-y-2 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <p className="text-sm text-white transition-all duration-300 hover:text-womb-softgray">Emotional tags:</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setEmotionFilter('')}
              className={`px-3 py-1 rounded-full text-sm transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                emotionFilter === '' 
                  ? 'bg-womb-maroon text-white shadow-lg shadow-womb-maroon/30' 
                  : 'bg-womb-darkgray border border-womb-border text-white hover:text-white hover:border-womb-mediumgray hover:shadow-lg'
              }`}
            >
              All
            </button>
            {emotions.map((emotion, index) => (
              <button
                key={emotion.id}
                onClick={() => setEmotionFilter(emotion.id)}
                className={`px-3 py-1 rounded-full text-sm transition-all duration-300 flex items-center space-x-1 transform hover:scale-105 hover:-translate-y-1 ${
                  emotionFilter === emotion.id 
                    ? 'bg-womb-maroon text-white shadow-lg shadow-womb-maroon/30' 
                    : 'bg-womb-darkgray border border-womb-border text-white hover:text-white hover:border-womb-mediumgray hover:shadow-lg'
                }`}
                style={{ animationDelay: `${500 + index * 50}ms` }}
              >
                <span className="transition-transform duration-300 hover:scale-125">{emotion.emoji}</span>
                <span>{emotion.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mood Filter */}
        <div className="space-y-2 animate-fade-in" style={{ animationDelay: '800ms' }}>
          <p className="text-sm text-white transition-all duration-300 hover:text-womb-softgray">Moods:</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setMoodFilter('')}
              className={`px-3 py-1 rounded-full text-sm transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                moodFilter === '' 
                  ? 'bg-womb-mediumgray text-womb-charcoal shadow-lg shadow-womb-mediumgray/30' 
                  : 'bg-womb-darkgray border border-womb-border text-white hover:text-white hover:border-womb-mediumgray hover:shadow-lg'
              }`}
            >
              All
            </button>
            {moods.map((mood, index) => (
              <button
                key={mood.id}
                onClick={() => setMoodFilter(mood.id)}
                className={`px-3 py-1 rounded-full text-sm transition-all duration-300 flex items-center space-x-1 transform hover:scale-105 hover:-translate-y-1 ${
                  moodFilter === mood.id 
                    ? 'bg-womb-mediumgray text-womb-charcoal shadow-lg shadow-womb-mediumgray/30' 
                    : 'bg-womb-darkgray border border-womb-border text-white hover:text-white hover:border-womb-mediumgray hover:shadow-lg'
                }`}
                style={{ animationDelay: `${900 + index * 50}ms` }}
              >
                <span className="transition-transform duration-300 hover:scale-125">{mood.emoji}</span>
                <span>{mood.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stories Grid with smooth animations */}
      {stories.length === 0 ? (
        <div className={`text-center py-12 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
          <p className="text-white text-lg mb-4 transition-all duration-300 hover:text-womb-mediumgray">No stories found</p>
          <p className="text-white text-sm transition-all duration-300 hover:text-womb-softgray">
            Try adjusting your filters or be the first to share a story with these tags!
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stories.map((story, index) => (
              <div
                key={story.id}
                className={`transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                style={{ transitionDelay: `${1000 + index * 100}ms` }}
              >
                <StoryCard story={story} />
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className={`text-center pt-6 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '1200ms' }}>
              <Button
                onClick={loadMore}
                disabled={loadingMore}
                variant="outline"
                className="border-womb-maroon text-womb-maroon hover:bg-womb-maroon hover:text-white transition-all duration-500 hover:scale-110 hover:-translate-y-2 hover:shadow-lg hover:shadow-womb-maroon/30 transform"
              >
                {loadingMore ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  'Load More Stories'
                )}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StoryExplorer;
