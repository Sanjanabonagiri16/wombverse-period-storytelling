
import Layout from '@/components/Layout';
import { Clock, TrendingUp, MessageCircle, Heart } from 'lucide-react';

const RecentStories = () => {
  const recentStories = [
    {
      id: 1,
      title: "Learning to Love My Cycle",
      excerpt: "After years of dreading my period, I'm finally finding peace...",
      author: "Emma R.",
      timeAgo: "2 hours ago",
      category: "Self-Love",
      comments: 12,
      hearts: 45,
      isNew: true
    },
    {
      id: 2,
      title: "Period Poverty: My Experience and Hope",
      excerpt: "Sharing my story to raise awareness about period accessibility...",
      author: "Zara M.",
      timeAgo: "5 hours ago",
      category: "Advocacy",
      comments: 8,
      hearts: 67,
      isNew: true
    },
    {
      id: 3,
      title: "Unexpected Period at Work",
      excerpt: "How a workplace emergency became a moment of sisterhood...",
      author: "Lisa K.",
      timeAgo: "1 day ago",
      category: "Workplace",
      comments: 15,
      hearts: 89,
      isNew: false
    },
    {
      id: 4,
      title: "Teaching My Daughter About Periods",
      excerpt: "Creating open conversations for the next generation...",
      author: "Rachel S.",
      timeAgo: "2 days ago",
      category: "Parenting",
      comments: 23,
      hearts: 112,
      isNew: false
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-womb-charcoal via-womb-deepgrey/20 to-womb-charcoal">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-womb-plum/20 to-womb-crimson/20 px-4 py-2 rounded-full mb-6">
                <Clock className="w-5 h-5 text-womb-plum" />
                <span className="text-womb-plum font-medium">Latest Updates</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-playfair font-bold text-womb-softwhite mb-6">
                Recent{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-womb-plum to-womb-crimson">
                  Stories
                </span>
              </h1>
              
              <p className="text-xl text-womb-warmgrey max-w-2xl mx-auto leading-relaxed">
                Stay connected with the latest stories shared by our community members. 
                Fresh perspectives, new voices, and ongoing conversations.
              </p>
            </div>

            {/* Stories List */}
            <div className="space-y-6 mb-12">
              {recentStories.map((story, index) => (
                <div
                  key={story.id}
                  className="group bg-gradient-to-r from-womb-deepgrey/40 to-womb-deepgrey/20 backdrop-blur-sm rounded-xl p-6 border border-womb-deepgrey hover:border-womb-plum/30 transition-all duration-300 hover:shadow-lg hover:shadow-womb-plum/10 animate-fade-in cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        {story.isNew && (
                          <span className="bg-gradient-to-r from-womb-crimson to-womb-plum text-white px-2 py-1 rounded-full text-xs font-medium animate-pulse">
                            NEW
                          </span>
                        )}
                        <span className="bg-womb-plum/20 text-womb-plum px-3 py-1 rounded-full text-sm font-medium">
                          {story.category}
                        </span>
                        <span className="text-womb-warmgrey text-sm flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {story.timeAgo}
                        </span>
                      </div>
                      
                      <h2 className="text-xl md:text-2xl font-playfair font-bold text-womb-softwhite mb-3 group-hover:text-womb-plum transition-colors duration-300">
                        {story.title}
                      </h2>
                      
                      <p className="text-womb-warmgrey leading-relaxed mb-4">
                        {story.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-womb-softwhite font-medium">
                          by {story.author}
                        </span>
                        
                        <div className="flex items-center space-x-4 text-sm text-womb-warmgrey">
                          <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4 text-womb-crimson" />
                            <span>{story.hearts}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{story.comments}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trending Section */}
            <div className="bg-gradient-to-r from-womb-deepgrey/50 to-womb-deepgrey/30 backdrop-blur-sm rounded-xl p-8 border border-womb-deepgrey">
              <div className="flex items-center space-x-2 mb-6">
                <TrendingUp className="w-6 h-6 text-womb-crimson" />
                <h3 className="text-2xl font-playfair font-bold text-womb-softwhite">
                  Trending Topics
                </h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['First Period', 'Self-Care', 'Period Products', 'Body Positivity'].map((topic) => (
                  <div
                    key={topic}
                    className="bg-womb-charcoal/50 hover:bg-womb-crimson/20 border border-womb-deepgrey hover:border-womb-crimson/30 rounded-lg p-4 text-center transition-all duration-300 cursor-pointer"
                  >
                    <span className="text-womb-softwhite font-medium">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RecentStories;
