
import { useState } from 'react';
import Layout from '@/components/Layout';
import StoryList from '@/components/story/StoryList';
import SearchAndFilter from '@/components/search/SearchAndFilter';

const Stories = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [emotionFilter, setEmotionFilter] = useState('');

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 lg:py-8 max-w-4xl">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl md:text-3xl font-playfair font-bold text-womb-softwhite mb-2">
            Community Stories
          </h1>
          <p className="text-sm md:text-base text-womb-warmgrey">
            Read and connect with stories from our community
          </p>
        </div>

        <SearchAndFilter
          onSearchChange={setSearchQuery}
          onCategoryChange={setCategoryFilter}
          onEmotionChange={setEmotionFilter}
        />

        <StoryList
          searchQuery={searchQuery}
          categoryFilter={categoryFilter}
          emotionFilter={emotionFilter}
        />
      </div>
    </Layout>
  );
};

export default Stories;
