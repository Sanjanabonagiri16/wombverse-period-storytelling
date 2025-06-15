
import { TrendingUp, Users, MessageSquare, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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
    <section className="py-16 bg-womb-darkgray">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-womb-lightgray mb-4">
            Community Pulse
          </h2>
          <p className="text-lg text-womb-secondarytext max-w-2xl mx-auto">
            See what's trending, discover popular conversations, and connect with our growing community.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Trending Tags - Now Full Width */}
          <div className="bg-womb-charcoal rounded-lg p-6 animate-fade-in">
            <div className="flex items-center space-x-2 mb-6">
              <TrendingUp className="w-5 h-5 text-womb-mediumgray" />
              <h3 className="text-xl font-playfair font-semibold text-womb-lightgray">
                Trending Tags
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {trendingTags.map((tag, index) => (
                <div 
                  key={tag.name}
                  className="flex items-center justify-between p-3 bg-womb-darkgray rounded-lg transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-lg hover:shadow-womb-softgray/10 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-womb-secondarytext text-sm font-medium">
                      #{index + 1}
                    </span>
                    <div>
                      <div className="text-womb-lightgray font-medium">
                        #{tag.name}
                      </div>
                      <div className="text-womb-secondarytext text-sm">
                        {tag.count} stories
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-womb-softgray/20 text-womb-softgray border-womb-softgray/30">
                    {tag.growth}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <Button className="bg-gradient-to-r from-womb-mediumgray to-womb-softgray hover:from-gray-500 hover:to-gray-400 text-womb-charcoal px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-gray-600/25">
                Explore All Tags
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityHighlights;
