
import Layout from '@/components/Layout';
import { Star, Calendar, Heart, BookOpen } from 'lucide-react';

const FeaturedStories = () => {
  const featuredStories = [
    {
      id: 1,
      title: "Breaking the Silence: My First Period Story",
      excerpt: "A powerful narrative about overcoming shame and finding strength in vulnerability...",
      author: "Sarah M.",
      date: "December 10, 2024",
      readTime: "5 min read",
      category: "First Period",
      hearts: 234,
      featured: true
    },
    {
      id: 2,
      title: "Endometriosis Journey: Finding Hope in Community",
      excerpt: "How connecting with others transformed my pain into purpose and advocacy...",
      author: "Maria L.",
      date: "December 8, 2024",
      readTime: "8 min read",
      category: "Health Journey",
      hearts: 189,
      featured: true
    },
    {
      id: 3,
      title: "Cultural Perspectives: Periods Around the World",
      excerpt: "Exploring how different cultures celebrate and understand menstruation...",
      author: "Aisha K.",
      date: "December 5, 2024",
      readTime: "6 min read",
      category: "Cultural",
      hearts: 156,
      featured: true
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-womb-charcoal via-womb-deepgrey/30 to-womb-charcoal">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-womb-crimson/20 to-womb-plum/20 px-4 py-2 rounded-full mb-6">
                <Star className="w-5 h-5 text-womb-crimson" />
                <span className="text-womb-crimson font-medium">Featured Content</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-womb-softwhite mb-6 leading-tight">
                Featured{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-womb-crimson to-womb-plum">
                  Stories
                </span>
              </h1>
              
              <p className="text-xl text-womb-warmgrey mb-8 max-w-3xl mx-auto leading-relaxed">
                Discover handpicked stories that inspire, educate, and connect our community. 
                These narratives have touched hearts, changed perspectives, and fostered meaningful conversations.
              </p>
            </div>

            {/* Featured Stories Grid */}
            <div className="grid gap-8 mb-16">
              {featuredStories.map((story) => (
                <div
                  key={story.id}
                  className="group bg-gradient-to-r from-womb-deepgrey/50 to-womb-deepgrey/30 backdrop-blur-sm rounded-2xl p-8 border border-womb-deepgrey hover:border-womb-crimson/30 transition-all duration-500 hover:shadow-2xl hover:shadow-womb-crimson/10 animate-fade-in cursor-pointer"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-4">
                        <span className="bg-gradient-to-r from-womb-crimson to-womb-plum text-white px-3 py-1 rounded-full text-sm font-medium">
                          {story.category}
                        </span>
                        <div className="flex items-center text-womb-warmgrey text-sm space-x-4">
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{story.date}</span>
                          </span>
                          <span>{story.readTime}</span>
                        </div>
                      </div>
                      
                      <h2 className="text-2xl md:text-3xl font-playfair font-bold text-womb-softwhite mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-womb-crimson group-hover:to-womb-plum transition-all duration-300">
                        {story.title}
                      </h2>
                      
                      <p className="text-womb-warmgrey text-lg leading-relaxed mb-4">
                        {story.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-womb-softwhite font-medium">
                          by {story.author}
                        </span>
                        <div className="flex items-center space-x-2 text-womb-crimson">
                          <Heart className="w-5 h-5" />
                          <span className="font-medium">{story.hearts}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="lg:w-48 flex justify-center">
                      <div className="w-32 h-32 bg-gradient-to-br from-womb-crimson/20 to-womb-plum/20 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                        <BookOpen className="w-12 h-12 text-womb-crimson" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action Section */}
            <div className="bg-gradient-to-r from-womb-deepgrey/60 to-womb-deepgrey/40 backdrop-blur-sm rounded-2xl p-8 md:p-12 text-center border border-womb-deepgrey">
              <h3 className="text-2xl md:text-3xl font-playfair font-bold text-womb-softwhite mb-4">
                Share Your Story
              </h3>
              <p className="text-womb-warmgrey text-lg mb-6 max-w-2xl mx-auto">
                Your experience matters. Every story shared helps break stigma and builds understanding. 
                Join our community of storytellers and make your voice heard.
              </p>
              <button className="bg-gradient-to-r from-womb-crimson to-womb-plum hover:from-womb-crimson/90 hover:to-womb-plum/90 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Start Writing Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FeaturedStories;
