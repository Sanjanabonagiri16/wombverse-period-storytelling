
import Layout from '@/components/Layout';
import { Tag, TrendingUp, Hash, Search } from 'lucide-react';

const PopularTags = () => {
  const popularTags = [
    { name: 'First Period', count: 234, trending: true, color: 'from-womb-crimson to-red-500' },
    { name: 'Self Care', count: 189, trending: true, color: 'from-womb-plum to-purple-500' },
    { name: 'Period Products', count: 156, trending: false, color: 'from-blue-500 to-blue-600' },
    { name: 'Body Positivity', count: 145, trending: true, color: 'from-pink-500 to-pink-600' },
    { name: 'PCOS', count: 134, trending: false, color: 'from-green-500 to-green-600' },
    { name: 'Endometriosis', count: 123, trending: false, color: 'from-orange-500 to-orange-600' },
    { name: 'Period Pain', count: 112, trending: false, color: 'from-red-500 to-red-600' },
    { name: 'Mental Health', count: 98, trending: true, color: 'from-indigo-500 to-indigo-600' },
    { name: 'Workplace', count: 87, trending: false, color: 'from-teal-500 to-teal-600' },
    { name: 'Cultural', count: 76, trending: false, color: 'from-yellow-500 to-yellow-600' },
    { name: 'Teen Period', count: 65, trending: false, color: 'from-cyan-500 to-cyan-600' },
    { name: 'Period Poverty', count: 54, trending: true, color: 'from-gray-500 to-gray-600' }
  ];

  const trendingCategories = [
    { name: 'Health & Wellness', description: 'Stories about period health, symptoms, and medical experiences' },
    { name: 'Emotional Journey', description: 'Mental health, mood changes, and emotional experiences' },
    { name: 'Social Impact', description: 'Workplace, school, and social situations involving periods' },
    { name: 'Education & Awareness', description: 'Learning, teaching, and spreading period knowledge' }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-womb-charcoal via-womb-deepgrey/20 to-womb-charcoal">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-womb-crimson/20 to-womb-plum/20 px-4 py-2 rounded-full mb-6">
                <Hash className="w-5 h-5 text-womb-crimson" />
                <span className="text-womb-crimson font-medium">Community Tags</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-playfair font-bold text-womb-softwhite mb-6">
                Popular{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-womb-crimson to-womb-plum">
                  Tags
                </span>
              </h1>
              
              <p className="text-xl text-womb-warmgrey max-w-3xl mx-auto leading-relaxed">
                Explore the most discussed topics in our community. Find stories that resonate with your experience 
                and discover new perspectives on menstrual health and wellness.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md mx-auto mb-12">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-womb-warmgrey w-5 h-5" />
              <input
                type="text"
                placeholder="Search tags..."
                className="w-full pl-10 pr-4 py-3 bg-womb-deepgrey/50 border border-womb-deepgrey rounded-lg text-womb-softwhite placeholder-womb-warmgrey focus:border-womb-crimson focus:outline-none transition-colors"
              />
            </div>

            {/* Popular Tags Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
              {popularTags.map((tag, index) => (
                <div
                  key={tag.name}
                  className="group relative bg-gradient-to-br from-womb-deepgrey/60 to-womb-deepgrey/40 backdrop-blur-sm rounded-xl p-6 border border-womb-deepgrey hover:border-womb-crimson/30 transition-all duration-300 hover:shadow-lg hover:shadow-womb-crimson/10 cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {tag.trending && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-womb-crimson to-womb-plum text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>Trending</span>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <div className={`w-12 h-12 bg-gradient-to-r ${tag.color} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      <Tag className="w-6 h-6 text-white" />
                    </div>
                    
                    <h3 className="font-semibold text-womb-softwhite mb-2 group-hover:text-womb-crimson transition-colors">
                      {tag.name}
                    </h3>
                    
                    <p className="text-womb-warmgrey text-sm">
                      {tag.count} stories
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Categories Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-playfair font-bold text-womb-softwhite mb-8 text-center">
                Browse by Category
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {trendingCategories.map((category, index) => (
                  <div
                    key={category.name}
                    className="bg-gradient-to-r from-womb-deepgrey/50 to-womb-deepgrey/30 backdrop-blur-sm rounded-xl p-6 border border-womb-deepgrey hover:border-womb-plum/30 transition-all duration-300 cursor-pointer animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <h3 className="text-xl font-playfair font-bold text-womb-softwhite mb-3">
                      {category.name}
                    </h3>
                    <p className="text-womb-warmgrey leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-womb-deepgrey/60 to-womb-deepgrey/40 backdrop-blur-sm rounded-xl p-8 text-center border border-womb-deepgrey">
              <h3 className="text-2xl font-playfair font-bold text-womb-softwhite mb-4">
                Can't Find Your Topic?
              </h3>
              <p className="text-womb-warmgrey mb-6 max-w-2xl mx-auto">
                Start a new conversation! Share your story and create new tags that represent your unique experience.
              </p>
              <button className="bg-gradient-to-r from-womb-crimson to-womb-plum hover:from-womb-crimson/90 hover:to-womb-plum/90 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105">
                Share Your Story
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PopularTags;
