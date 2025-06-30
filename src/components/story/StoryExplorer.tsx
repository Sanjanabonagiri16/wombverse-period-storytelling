import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import StoryCard from './StoryCard';
import PopularTags from './PopularTags';
import { Loader2, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RealtimePostgresChangesPayload, RealtimeChannel } from '@supabase/supabase-js';
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

interface StoryWithProfile extends StoryData {
  profiles?: { display_name: string; avatar_url: string } | null;
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
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Refs to track subscriptions and prevent multiple subscriptions
  const subscriptionsRef = useRef<{
    stories: RealtimeChannel | null;
    profiles: RealtimeChannel | null;
  }>({ stories: null, profiles: null });
  const isSubscribedRef = useRef(false);

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

  const location = useLocation();

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
    console.log('StoryExplorer: Current user:', user);
    if (user === undefined) {
      // Don't run until user is loaded
      console.log('StoryExplorer: user is undefined, aborting fetch');
      return;
    }
    if (reset) {
      setLoading(true);
      setPage(0);
      setErrorMsg(null);
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
        setErrorMsg('Could not load stories. Please try again later.');
        throw error;
      }

      const stories: Story[] = [];
      if (storiesData) {
        // Manually fetch profiles to bypass potential join issue
        for (const story of storiesData) {
          let profileData = null;
          if (!story.is_anonymous) {
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('display_name, avatar_url')
              .eq('id', story.user_id)
              .single();

            if (profileError) {
              console.error(`Failed to fetch profile for story ${story.id}:`, profileError);
            } else {
              profileData = profile;
            }
          }
          stories.push({ ...story, profiles: profileData });
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
      setErrorMsg(null);
    } catch (error) {
      console.error('StoryExplorer: Error fetching stories:', error);
      if (reset) setStories([]);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [emotionFilter, moodFilter, page, user?.id]);

  const handleRealtimeChange = useCallback(async (payload: RealtimePostgresChangesPayload<StoryData>) => {
    const { eventType, new: newRecord, old: oldRecord } = payload;
    console.log('StoryExplorer: Real-time event', eventType, { newRecord, oldRecord });
    switch (eventType) {
      case 'INSERT': {
        if (newRecord && !newRecord.is_draft) {
          const shouldInclude = checkStoryFilters(newRecord);
          if (shouldInclude) {
            setStories(prev => {
              if (prev.some(story => story.id === newRecord.id)) return prev;
              let profileData = null;
              if (!newRecord.is_anonymous) {
                const existingProfile = prev.find(story => story.user_id === newRecord.user_id && story.profiles);
                profileData = existingProfile ? existingProfile.profiles : null;
              }
              console.log('StoryExplorer: Adding new real-time story', { ...newRecord, profiles: profileData });
              return [
                { ...newRecord, profiles: profileData },
                ...prev
              ];
            });
            setShowNewStoryNotification(true);
            setTimeout(() => setShowNewStoryNotification(false), 3000);
          }
        }
        break;
      }
      case 'UPDATE': {
        if (newRecord) {
          const shouldInclude = checkStoryFilters(newRecord);
          setStories(prev => {
            const exists = prev.some(story => story.id === newRecord.id);
            let profileData = null;
            if (!newRecord.is_anonymous) {
              const existingProfile = prev.find(story => story.user_id === newRecord.user_id && story.profiles);
              profileData = existingProfile ? existingProfile.profiles : null;
            }
            if (shouldInclude) {
              if (exists) {
                console.log('StoryExplorer: Updating real-time story', { ...newRecord, profiles: profileData });
                return prev.map(story =>
                  story.id === newRecord.id ? { ...newRecord, profiles: profileData } : story
                );
              } else {
                console.log('StoryExplorer: Adding updated real-time story', { ...newRecord, profiles: profileData });
                return [{ ...newRecord, profiles: profileData }, ...prev];
              }
            } else {
              console.log('StoryExplorer: Removing real-time story (no longer matches)', newRecord.id);
              return prev.filter(story => story.id !== newRecord.id);
            }
          });
        }
        break;
      }
      case 'DELETE': {
        if (oldRecord) {
          console.log('StoryExplorer: Deleting real-time story', oldRecord.id);
          setStories(prev => prev.filter(story => story.id !== oldRecord.id));
        }
        break;
      }
      default:
        break;
    }
  }, [checkStoryFilters]);

  // useEffect hooks moved after function declarations
  useEffect(() => {
    if (user !== undefined) {
      fetchStories(true);
    }
    // Refetch stories whenever the location changes (e.g., after navigating to /stories)
  }, [fetchStories, user?.id, location]);

  // Separate useEffect for real-time subscriptions (only run once)
  useEffect(() => {
    // Prevent multiple subscriptions
    if (isSubscribedRef.current || !supabase) {
      console.log('StoryExplorer: Subscriptions already active or supabase not ready, skipping setup');
      return;
    }

    console.log('StoryExplorer: Setting up real-time subscriptions');
    isSubscribedRef.current = true;
    
    try {
      // Set up real-time subscription for stories
      subscriptionsRef.current.stories = supabase
        .channel(`stories_changes_${Date.now()}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'stories',
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
      subscriptionsRef.current.profiles = supabase
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
      isSubscribedRef.current = false;
    }

    return () => {
      console.log('StoryExplorer: Cleaning up real-time subscriptions');
      isSubscribedRef.current = false;
      
      if (supabase) {
        try {
          if (subscriptionsRef.current.stories) {
            supabase.removeChannel(subscriptionsRef.current.stories);
            subscriptionsRef.current.stories = null;
          }
          if (subscriptionsRef.current.profiles) {
            supabase.removeChannel(subscriptionsRef.current.profiles);
            subscriptionsRef.current.profiles = null;
          }
        } catch (error) {
          console.error('Error cleaning up subscriptions:', error);
        }
      }
    };
  }, [supabase]); // Run only when supabase client is available

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

  if (errorMsg) {
    return (
      <div className="text-center py-12">
        <p className="text-womb-crimson text-lg mb-4">{errorMsg}</p>
        <p className="text-white text-sm">Try refreshing the page or check your connection.</p>
      </div>
    );
  }

  if (!loading && !errorMsg && stories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white text-lg mb-4">No stories found</p>
        <p className="text-white text-sm">
          {emotionFilter || moodFilter
            ? "Try adjusting your filters or search terms."
            : "Be the first to share your story!"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Debug Information */}
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-womb-charcoal/50 border border-womb-crimson rounded-lg p-4 mb-4">
          <h3 className="text-womb-crimson font-semibold mb-2">🔧 Debug Info</h3>
          <div className="text-sm text-womb-softwhite space-y-1">
            <p>Current URL: {window.location.href}</p>
            <p>User authenticated: {user ? 'Yes' : 'No'}</p>
            <p>Stories loaded: {stories.length}</p>
            <p>Loading: {loading ? 'Yes' : 'No'}</p>
          </div>
        </div>
      )}

      {/* Live Updates Indicator */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-womb-softwhite">Live updates enabled</span>
        </div>
        {showNewStoryNotification && (
          <div className="bg-womb-crimson text-white px-3 py-1 rounded-full text-sm animate-bounce">
            New story added! 🎉
          </div>
        )}
      </div>

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
