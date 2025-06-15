
import { Heart, MessageCircle, Calendar, User, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const FeaturedStories = () => {
  const stories = [
    {
      id: 1,
      title: "The Day I Realized I Wasn't Broken",
      excerpt: "For years, I thought my painful periods were just something I had to endure. Then I learned about endometriosis and everything changed...",
      author: "Anonymous",
      date: "2 days ago",
      reactions: 47,
      comments: 12,
      tags: ["endometriosis", "pain", "diagnosis", "relief"],
      readTime: "4 min read"
    },
    {
      id: 2,
      title: "My First Period at Summer Camp",
      excerpt: "Picture this: 13-year-old me, white shorts, and the most embarrassing moment that taught me the most beautiful lesson about sisterhood...",
      author: "Sarah M.",
      date: "5 days ago",
      reactions: 89,
      comments: 23,
      tags: ["first-period", "embarrassing", "sisterhood", "growth"],
      readTime: "3 min read"
    },
    {
      id: 3,
      title: "Breaking the Silence in My Pakistani Family",
      excerpt: "Growing up in a traditional household where periods were whispered about, I decided to change the conversation for my younger sisters...",
      author: "Fatima A.",
      date: "1 week ago",
      reactions: 156,
      comments: 34,
      tags: ["culture", "family", "tradition", "change"],
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "The Period That Changed My Career",
      excerpt: "How a particularly heavy period led me to discover my calling in menstrual health advocacy and helped thousands of other women...",
      author: "Dr. Maya Chen",
      date: "1 week ago",
      reactions: 203,
      comments: 45,
      tags: ["career", "advocacy", "heavy-periods", "purpose"],
      readTime: "5 min read"
    },
    {
      id: 5,
      title: "Periods and Mental Health: My Journey",
      excerpt: "The connection between my cycle and my anxiety was something no one talked about. Here's how I learned to track and manage both...",
      author: "Alex R.",
      date: "2 weeks ago",
      reactions: 124,
      comments: 28,
      tags: ["mental-health", "anxiety", "tracking", "self-care"],
      readTime: "7 min read"
    },
    {
      id: 6,
      title: "The Gift of Irregular Periods",
      excerpt: "PCOS made my periods unpredictable, but it also taught me to listen to my body in ways I never imagined possible...",
      author: "Jordan K.",
      date: "2 weeks ago",
      reactions: 67,
      comments: 19,
      tags: ["PCOS", "irregular", "body-awareness", "acceptance"],
      readTime: "4 min read"
    }
  ];

  return (
    <section className="py-16 bg-womb-charcoal">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-womb-softwhite mb-4">
            Featured Stories
          </h2>
          <p className="text-lg text-womb-warmgrey max-w-2xl mx-auto">
            Real experiences from our community. Each story shared with courage, received with love.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {stories.map((story, index) => (
            <article 
              key={story.id} 
              className="story-card animate-fade-in cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Story Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-womb-warmgrey">
                  <User className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="truncate">{story.author}</span>
                  <span className="hidden sm:inline">•</span>
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 hidden sm:inline" />
                  <span className="hidden sm:inline">{story.date}</span>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-2">
                  <span className="text-xs text-womb-warmgrey sm:hidden">{story.date}</span>
                  <Badge variant="secondary" className="bg-womb-plum/20 text-womb-plum border-womb-plum/30 text-xs">
                    {story.readTime}
                  </Badge>
                </div>
              </div>

              {/* Story Title */}
              <h3 className="text-lg sm:text-xl font-playfair font-semibold text-womb-softwhite mb-3 line-clamp-2 hover:text-womb-crimson transition-colors">
                {story.title}
              </h3>

              {/* Story Excerpt */}
              <p className="text-sm sm:text-base text-womb-warmgrey mb-4 line-clamp-3 leading-relaxed">
                {story.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
                {story.tags.slice(0, 3).map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className="bg-womb-deepgrey text-womb-warmgrey border-womb-deepgrey hover:border-womb-crimson hover:text-womb-crimson transition-colors text-xs"
                  >
                    #{tag}
                  </Badge>
                ))}
                {story.tags.length > 3 && (
                  <Badge variant="secondary" className="bg-womb-deepgrey text-womb-warmgrey border-womb-deepgrey text-xs">
                    +{story.tags.length - 3}
                  </Badge>
                )}
              </div>

              {/* Story Footer - Mobile First Layout */}
              <div className="pt-4 border-t border-womb-deepgrey">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  {/* Reactions and Comments */}
                  <div className="flex items-center gap-4 text-sm text-womb-warmgrey">
                    <div className="flex items-center gap-1 hover:text-womb-crimson transition-colors cursor-pointer">
                      <Heart className="w-4 h-4" />
                      <span>{story.reactions}</span>
                    </div>
                    <div className="flex items-center gap-1 hover:text-womb-plum transition-colors cursor-pointer">
                      <MessageCircle className="w-4 h-4" />
                      <span>{story.comments}</span>
                    </div>
                  </div>
                  
                  {/* Read Story Button */}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-womb-crimson hover:text-womb-crimson hover:bg-womb-crimson/10 p-2 h-auto w-full sm:w-auto justify-center sm:justify-start"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Read Story
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-womb-plum text-womb-plum hover:bg-womb-plum hover:text-white w-full sm:w-auto">
            <BookOpen className="w-5 h-5 mr-2" />
            Explore All Stories
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedStories;
