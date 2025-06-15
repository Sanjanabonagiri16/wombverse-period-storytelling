
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface MoodTag {
  id: string;
  name: string;
  description: string;
  color_hex: string;
}

interface MoodSelectorProps {
  onMoodSelect: (moodNames: string[]) => void;
  selectedMoods: string[];
}

const MoodSelector = ({ onMoodSelect, selectedMoods }: MoodSelectorProps) => {
  const [moods, setMoods] = useState<MoodTag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMoods();
  }, []);

  const fetchMoods = async () => {
    try {
      const { data } = await supabase
        .from('mood_tags')
        .select('*')
        .order('name');

      setMoods(data || []);
    } catch (error) {
      console.error('Error fetching moods:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleMood = (moodName: string) => {
    const newSelected = selectedMoods.includes(moodName)
      ? selectedMoods.filter(name => name !== moodName)
      : [...selectedMoods, moodName];
    
    onMoodSelect(newSelected);
  };

  const getMoodEmoji = (moodName: string) => {
    const emojiMap: Record<string, string> = {
      'angry': '😠',
      'sad': '😢',
      'anxious': '😰',
      'grateful': '🙏',
      'empowered': '💪',
      'calm': '😌',
      'hopeful': '✨',
      'frustrated': '😤',
      'joyful': '😊',
      'overwhelmed': '😵',
      'peaceful': '🕊️',
      'excited': '🤩'
    };
    return emojiMap[moodName] || '😊';
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-4">
          <p className="text-white">Loading moods...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-womb-deepgrey border-womb-deepgrey">
      <CardContent className="p-4">
        <div className="space-y-3">
          <h3 className="text-white font-medium">How are you feeling?</h3>
          <p className="text-white text-sm">
            Select moods to find stories that match your current state
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {moods.map((mood) => (
              <Button
                key={mood.id}
                variant="outline"
                size="sm"
                className={`h-auto p-3 flex flex-col items-center space-y-1 transition-all ${
                  selectedMoods.includes(mood.name)
                    ? 'border-womb-maroon bg-womb-maroon/20 text-womb-maroon'
                    : 'border-womb-deepgrey hover:border-womb-mediumgray text-white hover:text-white'
                }`}
                onClick={() => toggleMood(mood.name)}
              >
                <span className="text-lg">{getMoodEmoji(mood.name)}</span>
                <span className="text-xs font-medium capitalize">{mood.name}</span>
              </Button>
            ))}
          </div>

          {selectedMoods.length > 0 && (
            <div className="mt-4 p-3 bg-womb-charcoal rounded-lg">
              <p className="text-white text-sm">
                <span className="font-medium">Selected moods:</span>{' '}
                {selectedMoods.map((mood, index) => (
                  <span key={mood}>
                    {getMoodEmoji(mood)} {mood}
                    {index < selectedMoods.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodSelector;
