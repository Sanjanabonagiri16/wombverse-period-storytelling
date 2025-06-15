
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
    { id: 'anxious', label: 'Anxious', emoji: '😰', color: 'bg-gray-500/20 text-gray-400' },
    { id: 'hopeful', label: 'Hopeful', emoji: '✨', color: 'bg-indigo-500/20 text-indigo-400' },
    { id: 'frustrated', label: 'Frustrated', emoji: '😤', color: 'bg-slate-500/20 text-slate-400' },
  ];

  return (
    <div className="space-y-3">
      <label className="text-white text-sm md:text-base font-medium">
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
                : 'border-womb-border hover:border-womb-mediumgray text-white hover:text-white'
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
