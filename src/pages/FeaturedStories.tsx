import Layout from '@/components/Layout';
import { Star, Calendar, Heart, BookOpen, Quote, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

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
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-7xl mx-auto">
            {/* Enhanced Header Section */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm px-6 py-3 rounded-full mb-8 border border-slate-700/50">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span className="text-amber-400 font-semibold tracking-wide">Curated Excellence</span>
                <Star className="w-5 h-5 text-amber-400" />
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-white mb-8 leading-tight">
                Featured{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300">
                  Stories
                </span>
              </h1>
              
              <div className="max-w-4xl mx-auto mb-12">
                <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-light">
                  Discover handpicked narratives that inspire, educate, and connect our community.
                </p>
                <p className="text-lg text-slate-400 mt-4 font-light">
                  These powerful stories have touched hearts, changed perspectives, and fostered meaningful conversations.
                </p>
              </div>
              
              {/* Decorative Quote */}
              <div className="flex items-center justify-center space-x-4 text-slate-500">
                <Quote className="w-6 h-6 rotate-180" />
                <span className="text-lg font-playfair italic">Every story shared is a light in someone's darkness</span>
                <Quote className="w-6 h-6" />
              </div>
            </div>

            {/* Enhanced Featured Stories Grid */}
            <div className="grid gap-10 mb-20">
              {featuredStories.map((story, index) => (
                <div
                  key={story.id}
                  className="group relative bg-gradient-to-br from-slate-800/40 via-slate-800/20 to-slate-900/40 backdrop-blur-lg rounded-3xl p-8 md:p-10 border border-slate-700/30 hover:border-slate-600/50 transition-all duration-700 hover:shadow-2xl hover:shadow-slate-900/50 animate-fade-in cursor-pointer overflow-hidden"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-700/5 to-transparent opacity-50"></div>
                  
                  <div className="relative z-10">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
                      <div className="flex-1 space-y-6">
                        {/* Story Meta */}
                        <div className="flex flex-wrap items-center gap-4">
                          <span className="bg-gradient-to-r from-slate-700 to-slate-600 text-white px-4 py-2 rounded-full text-sm font-semibold tracking-wide border border-slate-600/50">
                            {story.category}
                          </span>
                          <div className="flex items-center text-slate-400 text-sm space-x-6">
                            <span className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4" />
                              <span className="font-medium">{story.date}</span>
                            </span>
                            <span className="text-slate-500 font-medium">{story.readTime}</span>
                          </div>
                        </div>
                        
                        {/* Story Title */}
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-white leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-200 group-hover:to-slate-400 transition-all duration-500">
                          {story.title}
                        </h2>
                        
                        {/* Story Excerpt */}
                        <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light">
                          {story.excerpt}
                        </p>
                        
                        {/* Author & Engagement */}
                        <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {story.author.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <span className="text-white font-semibold">by {story.author}</span>
                              <div className="text-slate-400 text-sm">Community Member</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 text-red-400">
                            <Heart className="w-5 h-5" />
                            <span className="font-semibold text-lg">{story.hearts}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Visual Element */}
                      <div className="lg:w-64 flex justify-center">
                        <div className="w-40 h-40 lg:w-48 lg:h-48 bg-gradient-to-br from-slate-700/30 to-slate-800/30 rounded-3xl flex items-center justify-center group-hover:scale-105 transition-transform duration-500 border border-slate-600/30">
                          <BookOpen className="w-16 h-16 lg:w-20 lg:h-20 text-slate-400 group-hover:text-slate-300 transition-colors duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Call to Action Section */}
            <div className="relative bg-gradient-to-br from-slate-800/60 via-slate-800/40 to-slate-900/60 backdrop-blur-lg rounded-3xl p-10 md:p-16 text-center border border-slate-700/40 overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-600/10 to-transparent"></div>
              
              <div className="relative z-10 space-y-8">
                <div className="space-y-4">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-white leading-tight">
                    Share Your{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-100">
                      Story
                    </span>
                  </h3>
                  <div className="max-w-3xl mx-auto space-y-4">
                    <p className="text-xl text-slate-300 font-light leading-relaxed">
                      Your experience matters. Every story shared helps break stigma and builds understanding.
                    </p>
                    <p className="text-lg text-slate-400 font-light">
                      Join our community of storytellers and make your voice heard in this safe, supportive space.
                    </p>
                  </div>
                </div>
                
                <Link to="/auth">
                  <button className="bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white font-semibold px-10 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-slate-900/30 border border-slate-600/50 text-lg">
                    Start Writing Today
                  </button>
                </Link>
                
                <div className="flex items-center justify-center space-x-8 text-slate-500 text-sm">
                  <span className="flex items-center space-x-2">
                    <Heart className="w-4 h-4" />
                    <span>Safe Space</span>
                  </span>
                  <span className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4" />
                    <span>Your Voice Matters</span>
                  </span>
                  <span className="flex items-center space-x-2">
                    <Star className="w-4 h-4" />
                    <span>Community Support</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FeaturedStories;
