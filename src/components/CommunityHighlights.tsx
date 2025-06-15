
import { TrendingUp, Users, MessageSquare, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CommunityHighlights = () => {
  const trendingTags = [
    { name: "FirstPeriod", count: 234, growth: "+12%" },
    { name: "EndoDiaries", count: 189, growth: "+8%" },
    { name: "PeriodPositivity", count: 156, growth: "+23%" },
    { name: "CulturalStories", count: 142, growth: "+15%" },
    { name: "PeriodPains", count: 128, growth: "+6%" },
    { name: "MentalHealth", count: 98, growth: "+19%" },
  ];

  return (
    <section className="py-16 bg-transparent relative overflow-hidden">
      {/* Smooth background transition overlay - removed lines */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-womb-charcoal/10 to-transparent animate-gradient-shift"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header with slide-in animation */}
        <div className="text-center mb-12 animate-slide-in-up opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-4 transform transition-all duration-700 hover:scale-105">
            Community Pulse
          </h2>
          <p className="text-lg text-white max-w-2xl mx-auto transition-all duration-500 hover:text-womb-mediumgray">
            See what's trending, discover popular conversations, and connect with our growing community.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Trending Tags with staggered animations */}
          <div className="bg-womb-charcoal/80 backdrop-blur-sm rounded-lg p-6 animate-fade-in opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards] shadow-2xl transition-all duration-500 hover:shadow-womb-maroon/10 hover:shadow-3xl border-transparent">
            <div className="flex items-center space-x-2 mb-6 animate-slide-in-left opacity-0 [animation-delay:600ms] [animation-fill-mode:forwards]">
              <TrendingUp className="w-5 h-5 text-white animate-pulse" />
              <h3 className="text-xl font-playfair font-semibold text-white">
                Trending Tags
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {trendingTags.map((tag, index) => (
                <div 
                  key={tag.name}
                  className="flex items-center justify-between p-3 bg-womb-darkgray/50 backdrop-blur-sm rounded-lg transition-all duration-500 cursor-pointer hover:-translate-y-2 hover:shadow-xl hover:shadow-womb-maroon/20 hover:bg-womb-darkgray/80 animate-fade-in opacity-0 hover:scale-105 group border-transparent"
                  style={{ 
                    animationDelay: `${800 + index * 100}ms`,
                    animationFillMode: 'forwards'
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-white text-sm font-medium bg-womb-maroon/20 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-300 group-hover:bg-womb-maroon group-hover:text-white">
                      #{index + 1}
                    </span>
                    <div>
                      <div className="text-white font-medium transition-all duration-300 group-hover:text-womb-mediumgray">
                        #{tag.name}
                      </div>
                      <div className="text-white text-sm transition-all duration-300 group-hover:text-womb-softgray">
                        {tag.count} stories
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-womb-maroon/20 text-womb-maroon border-womb-maroon/30 transition-all duration-300 group-hover:bg-womb-maroon group-hover:text-white group-hover:scale-110">
                    {tag.growth}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="text-center mt-6 animate-slide-in-up opacity-0 [animation-delay:1400ms] [animation-fill-mode:forwards]">
              <Link to="/stories">
                <Button className="bg-gradient-to-r from-womb-mediumgray to-white hover:from-gray-500 hover:to-gray-400 text-womb-charcoal px-8 py-3 rounded-lg transition-all duration-500 hover:scale-110 shadow-lg shadow-gray-600/25 border-2 border-womb-maroon hover:shadow-2xl hover:shadow-womb-maroon/30 hover:-translate-y-1 transform">
                  Explore All Stories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityHighlights;
