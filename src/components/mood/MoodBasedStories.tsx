
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StoryCard from '@/components/story/StoryCard';
import MoodSelector from './MoodSelector';
import { Loader2, RefreshCw } from 'lucide-react';

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

const MoodBasedStories = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchStoriesByMood = async (moodNames: string[]) => {
    if (moodNames.length === 0) {
      setStories([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    try {
      // Use the database function to get stories by mood
      const { data: moodStories } = await supabase
        .rpc('get_stories_by_mood', { mood_names: moodNames });

      if (moodStories) {
        // Fetch profiles for each story
        const storiesWithProfiles = await Promise.all(
          moodStories.map(async (story: any) => {
            let profileData = null;
            
            // Get the full story data
            const { data: fullStory } = await supabase
              .from('stories')
              .select('*')
              .eq('id', story.story_id)
              .single();

            if (fullStory && !fullStory.is_anonymous) {
              const { data: profile } = await supabase
                .from('profiles')
                .select('display_name, avatar_url')
                .eq('id', fullStory.user_id)
                .single();
              
              profileData = profile;
            }
            
            return {
              ...fullStory,
              profiles: profileData
            };
          })
        );

        setStories(storiesWithProfiles.filter(story => story));
      }
      setHasSearched(true);
    } catch (error) {
      console.error('Error fetching mood-based stories:', error);
      setStories([]);
      setHasSearched(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStoriesByMood(selectedMoods);
  }, [selectedMoods]);

  const handleRefresh = () => {
    fetchStoriesByMood(selectedMoods);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-playfair font-bold text-womb-softwhite mb-2">
          Stories for Your Mood 💭
        </h2>
        <p className="text-white">
          Find stories that resonate with how you're feeling right now
        </p>
      </div>

      <MoodSelector 
        selectedMoods={selectedMoods}
        onMoodSelect={setSelectedMoods}
      />

      {selectedMoods.length > 0 && (
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-womb-softwhite">
            Stories matching your mood{selectedMoods.length > 1 ? 's' : ''}
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={loading}
            className="border-womb-maroon text-womb-maroon hover:bg-womb-maroon hover:text-white"
          >
            <RefreshCw className={`w-4 h-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-womb-maroon" />
        </div>
      )}

      {!loading && hasSearched && stories.length === 0 && selectedMoods.length > 0 && (
        <Card className="bg-womb-deepgrey border-womb-deepgrey">
          <CardContent className="p-8 text-center">
            <p className="text-white text-lg mb-4">
              No stories found matching your selected mood{selectedMoods.length > 1 ? 's' : ''}
            </p>
            <p className="text-white text-sm">
              Try selecting different moods or be the first to share a story with these feelings!
            </p>
          </CardContent>
        </Card>
      )}

      {!loading && stories.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      )}

      {selectedMoods.length === 0 && !loading && (
        <Card className="bg-womb-deepgrey border-womb-deepgrey">
          <CardContent className="p-8 text-center">
            <p className="text-white text-lg mb-4">
              Select your current mood to discover relevant stories
            </p>
            <p className="text-white text-sm">
              Our mood-based matching helps you find stories that speak to your current emotional state
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MoodBasedStories;
