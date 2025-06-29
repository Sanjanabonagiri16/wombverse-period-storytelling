import { useState } from 'react';

interface EmotionTag {
  id: string;
  label: string;
  color: string;
  bgColor: string;
}

const emotionTags: EmotionTag[] = [
  { id: 'empowering', label: 'Empowering', color: 'text-green-400', bgColor: 'bg-green-400/20 border-green-400/30' },
  { id: 'challenging', label: 'Challenging', color: 'text-orange-400', bgColor: 'bg-orange-400/20 border-orange-400/30' },
  { id: 'educational', label: 'Educational', color: 'text-blue-400', bgColor: 'bg-blue-400/20 border-blue-400/30' },
  { id: 'supportive', label: 'Supportive', color: 'text-womb-plum', bgColor: 'bg-womb-plum/20 border-womb-plum/30' },
  { id: 'funny', label: 'Funny', color: 'text-yellow-400', bgColor: 'bg-yellow-400/20 border-yellow-400/30' },
  { id: 'scary', label: 'Scary', color: 'text-red-400', bgColor: 'bg-red-400/20 border-red-400/30' },
  { id: 'relieving', label: 'Relieving', color: 'text-cyan-400', bgColor: 'bg-cyan-400/20 border-cyan-400/30' },
  { id: 'frustrating', label: 'Frustrating', color: 'text-pink-400', bgColor: 'bg-pink-400/20 border-pink-400/30' },
];

interface EmotionTagsProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  disabled?: boolean;
}

const EmotionTags = ({ selectedTags, onTagsChange, disabled = false }: EmotionTagsProps) => {
  const toggleTag = (tagId: string) => {
    if (disabled) return;
    
    if (selectedTags.includes(tagId)) {
      onTagsChange(selectedTags.filter(id => id !== tagId));
    } else {
      onTagsChange([...selectedTags, tagId]);
    }
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-womb-warmgrey">
        Select emotions that best describe your experience (choose at least one):
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {emotionTags.map(tag => (
          <button
            key={tag.id}
            type="button"
            onClick={() => toggleTag(tag.id)}
            disabled={disabled}
            className={`
              px-3 py-2 rounded-lg border transition-all duration-200 text-sm font-medium
              ${selectedTags.includes(tag.id)
                ? `${tag.bgColor} ${tag.color} border-current`
                : 'bg-womb-deepgrey border-womb-deepgrey text-womb-warmgrey hover:border-womb-warmgrey'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {tag.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmotionTags;
