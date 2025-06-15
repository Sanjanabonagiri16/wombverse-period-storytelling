
import { useState } from 'react';

interface MoodSelectorProps {
  selectedMood: string;
  onMoodChange: (mood: string) => void;
}

const MoodSelector = ({ selectedMood, onMoodChange }: MoodSelectorProps) => {
  const moods = [
    { id: 'calm', label: 'Calm', emoji: '😌', color: 'bg-blue-500/20 text-blue-400' },
    { id: 'grateful', label: 'Grateful', emoji: '🙏', color: 'bg-green-500/20 text-green-400' },
    { id: 'angry', label: 'Angry', emoji: '😠', color: 'bg-red-500/20 text-red-400' },
    { id: 'sad', label: 'Sad', emoji: '😢', color: 'bg-purple-500/20 text-purple-400' },
    { id: 'empowered', label: 'Empowered', emoji: '💪', color: 'bg-orange-500/20 text-orange-400' },
    { id: 'anxious', label: 'Anxious', emoji: '😰', color: 'bg-yellow-500/20 text-yellow-400' },
    { id: 'hopeful', label: 'Hopeful', emoji: '✨', color: 'bg-pink-500/20 text-pink-400' },
    { id: 'frustrated', label: 'Frustrated', emoji: '😤', color: 'bg-gray-500/20 text-gray-400' },
  ];

  return (
    <div className="space-y-3">
      <label className="text-womb-softwhite text-sm md:text-base font-medium">
        How are you feeling? 
      </label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {moods.map((mood) => (
          <button
            key={mood.id}
            type="button"
            onClick={() => onMoodChange(mood.id)}
            className={`
              flex items-center space-x-2 px-3 py-2 rounded-lg border-2 transition-all duration-200
              ${selectedMood === mood.id 
                ? `${mood.color} border-current` 
                : 'border-womb-deepgrey hover:border-womb-warmgrey text-womb-warmgrey hover:text-womb-softwhite'
              }
            `}
          >
            <span className="text-lg">{mood.emoji}</span>
            <span className="text-sm font-medium">{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
