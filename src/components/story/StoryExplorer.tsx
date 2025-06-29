import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import StoryCard from './StoryCard';
import PopularTags from './PopularTags';
import { Loader2, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RealtimePostgresChangesPayload, RealtimeChannel } from '@supabase/supabase-js';

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
  profiles?: {
    display_name: string;
    avatar_url: string;
  } | null;
}

interface StoryData {
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
}

const StoryExplorer = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [emotionFilter, setEmotionFilter] = useState('');
  const [moodFilter, setMoodFilter] = useState('');
  const [page, setPage] = useState(0);
  const [showNewStoryNotification, setShowNewStoryNotification] = useState(false);
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

  const checkStoryFilters = useCallback((story: StoryData) => {
    if (emotionFilter && !story.emotion_tags.includes(emotionFilter)) {
      return false;
    }
    if (moodFilter && !story.emotion_tags.includes(moodFilter)) {
      return false;
    }
    return true;
  }, [emotionFilter, moodFilter]);

  const enrichStoryWithProfile = async (story: StoryData): Promise<Story> => {
    let profileData = null;
    
    if (!story.is_anonymous) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('display_name, avatar_url')
        .eq('id', story.user_id)
        .single();
      
      profileData = profile;
    }
    
    return {
      ...story,
      profiles: profileData
    };
  };

  const fetchStories = useCallback(async (reset = false) => {
    console.log('StoryExplorer: fetchStories called with reset:', reset);
    
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

      console.log('StoryExplorer: Executing query with filters:', { emotionFilter, moodFilter });
      const { data: storiesData, error } = await query;
      console.log('StoryExplorer: Query result:', { storiesData, error });

      if (error) {
        console.error('StoryExplorer: Query error:', error);
        throw error;
      }

      const stories: Story[] = [];
      
      if (storiesData) {
        console.log('StoryExplorer: Processing', storiesData.length, 'stories');
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

      console.log('StoryExplorer: Final processed stories:', stories);

      if (reset) {
        setStories(stories);
      } else {
        setStories(prev => [...prev, ...stories]);
      }

      setHasMore(stories.length === ITEMS_PER_PAGE);
      setPage(currentPage + 1);

    } catch (error) {
      console.error('StoryExplorer: Error fetching stories:', error);
      if (reset) setStories([]);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [emotionFilter, moodFilter, page]);

  const handleRealtimeChange = useCallback(async (payload: RealtimePostgresChangesPayload<StoryData>) => {
    const { eventType, new: newRecord, old: oldRecord } = payload;
    
    switch (eventType) {
      case 'INSERT':
        // New story created - add it to the list if it matches current filters
        if (newRecord && !newRecord.is_draft) {
          const shouldInclude = checkStoryFilters(newRecord);
          if (shouldInclude) {
            const storyWithProfile = await enrichStoryWithProfile(newRecord);
            setStories(prev => [storyWithProfile, ...prev.slice(0, -1)]);
            
            // Show notification for new story
            setShowNewStoryNotification(true);
            setTimeout(() => setShowNewStoryNotification(false), 3000);
          }
        }
        break;
        
      case 'UPDATE':
        // Story updated - refresh the list to get the latest data
        fetchStories(true);
        break;
        
      case 'DELETE':
        // Story deleted - remove it from the list
        if (oldRecord) {
          setStories(prev => prev.filter(story => story.id !== oldRecord.id));
        }
        break;
    }
  }, [fetchStories, checkStoryFilters]);

  // useEffect hooks moved after function declarations
  useEffect(() => {
    fetchStories(true);
  }, [fetchStories]);

  // Separate useEffect for real-time subscriptions (only run once)
  useEffect(() => {
    console.log('StoryExplorer: Setting up real-time subscriptions');
    
    let storiesSubscription: RealtimeChannel | null = null;
    let profilesSubscription: RealtimeChannel | null = null;
    
    try {
      // Set up real-time subscription for stories
      storiesSubscription = supabase
        .channel(`stories_changes_${Date.now()}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'stories',
            filter: 'is_draft=eq.false'
          },
          (payload: RealtimePostgresChangesPayload<StoryData>) => {
            console.log('Real-time story change:', payload);
            handleRealtimeChange(payload);
          }
        )
        .subscribe((status) => {
          console.log('Stories subscription status:', status);
        });

      // Set up real-time subscription for profiles (for anonymous stories)
      profilesSubscription = supabase
        .channel(`profiles_changes_${Date.now()}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'profiles'
          },
          (payload: RealtimePostgresChangesPayload<{ id: string; display_name: string; avatar_url: string }>) => {
            console.log('Real-time profile change:', payload);
            // Refresh stories to get updated profile information
            fetchStories(true);
          }
        )
        .subscribe((status) => {
          console.log('Profiles subscription status:', status);
        });
    } catch (error) {
      console.error('Error setting up real-time subscriptions:', error);
    }

    return () => {
      console.log('StoryExplorer: Cleaning up real-time subscriptions');
      try {
        if (storiesSubscription) {
          supabase.removeChannel(storiesSubscription);
        }
        if (profilesSubscription) {
          supabase.removeChannel(profilesSubscription);
        }
      } catch (error) {
        console.error('Error cleaning up subscriptions:', error);
      }
    };
  }, [fetchStories, handleRealtimeChange]);

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
    <div className="space-y-6">
      {/* New Story Notification */}
      {showNewStoryNotification && (
        <div className="fixed top-4 right-4 z-50 bg-womb-crimson text-womb-softwhite px-4 py-2 rounded-lg shadow-lg animate-fade-in">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>New story added! 📖</span>
          </div>
        </div>
      )}

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
                  : 'bg-womb-deepgrey border border-womb-plum text-womb-warmgrey hover:text-womb-softwhite hover:border-womb-crimson'
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
                    ? 'bg-womb-crimson text-womb-softwhite' 
                    : 'bg-womb-deepgrey border border-womb-plum text-womb-warmgrey hover:text-womb-softwhite hover:border-womb-crimson'
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
        <div className="space-y-2">
          <p className="text-sm text-womb-warmgrey">Moods:</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setMoodFilter('')}
              className={`px-3 py-1 rounded-full text-sm transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                moodFilter === '' 
                  ? 'bg-womb-crimson text-womb-softwhite' 
                  : 'bg-womb-deepgrey border border-womb-plum text-womb-warmgrey hover:text-womb-softwhite hover:border-womb-crimson'
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
                    ? 'bg-womb-crimson text-womb-softwhite' 
                    : 'bg-womb-deepgrey border border-womb-plum text-womb-warmgrey hover:text-womb-softwhite hover:border-womb-crimson'
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

      {/* Real-time indicator */}
      <div className="flex items-center space-x-2 text-womb-warmgrey text-sm">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span>Live updates enabled</span>
      </div>

      {/* Stories Grid */}
      {stories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-womb-softwhite text-lg mb-4">No stories found</p>
          <p className="text-womb-warmgrey text-sm">
            Try adjusting your filters or be the first to share a story with these tags!
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stories.map((story, index) => (
              <div
                key={story.id}
                className="transition-all duration-700 transform"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <StoryCard story={story} />
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="text-center pt-6">
              <Button
                onClick={loadMore}
                disabled={loadingMore}
                variant="outline"
                className="border-womb-crimson text-womb-crimson hover:bg-womb-crimson hover:text-womb-softwhite"
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
