
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchAndFilterProps {
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onEmotionChange: (emotion: string) => void;
}

const SearchAndFilter = ({ onSearchChange, onCategoryChange, onEmotionChange }: SearchAndFilterProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearchChange(value);
  };

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'first-period', label: 'First Period Experience' },
    { value: 'period-pain', label: 'Managing Period Pain' },
    { value: 'period-products', label: 'Period Products & Tips' },
    { value: 'workplace-school', label: 'Period at Work/School' },
    { value: 'cultural-experience', label: 'Cultural Perspectives' },
    { value: 'support-advice', label: 'Support & Advice' },
    { value: 'celebration', label: 'Period Positivity' },
    { value: 'other', label: 'Other' },
  ];

  const emotions = [
    { value: '', label: 'All Emotions' },
    { value: 'empowering', label: 'Empowering' },
    { value: 'challenging', label: 'Challenging' },
    { value: 'educational', label: 'Educational' },
    { value: 'supportive', label: 'Supportive' },
    { value: 'funny', label: 'Funny' },
    { value: 'scary', label: 'Scary' },
    { value: 'relieving', label: 'Relieving' },
    { value: 'frustrating', label: 'Frustrating' },
  ];

  return (
    <div className="bg-womb-deepgrey/50 border border-womb-plum/30 rounded-lg p-4 md:p-6 mb-6 md:mb-8">
      <div className="space-y-4 md:space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-womb-warmgrey w-4 h-4 md:w-5 md:h-5" />
          <Input
            type="text"
            placeholder="Search stories by title or content..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 md:pl-12 bg-womb-charcoal border-womb-deepgrey text-womb-softwhite placeholder-womb-warmgrey focus:border-womb-crimson h-10 md:h-12 text-sm md:text-base"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm md:text-base font-medium text-womb-softwhite mb-2">
              Category
            </label>
            <select
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full h-10 md:h-12 rounded-md border border-womb-deepgrey bg-womb-charcoal px-3 py-2 text-sm md:text-base text-womb-softwhite focus:border-womb-crimson focus:outline-none"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Emotion Filter */}
          <div>
            <label className="block text-sm md:text-base font-medium text-womb-softwhite mb-2">
              Emotion
            </label>
            <select
              onChange={(e) => onEmotionChange(e.target.value)}
              className="w-full h-10 md:h-12 rounded-md border border-womb-deepgrey bg-womb-charcoal px-3 py-2 text-sm md:text-base text-womb-softwhite focus:border-womb-crimson focus:outline-none"
            >
              {emotions.map((emotion) => (
                <option key={emotion.value} value={emotion.value}>
                  {emotion.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
