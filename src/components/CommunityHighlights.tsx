
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

  const communityStats = [
    { 
      icon: Users, 
      value: "12,047", 
      label: "Community Members", 
      color: "text-womb-crimson" 
    },
    { 
      icon: MessageSquare, 
      value: "1,247", 
      label: "Stories Shared", 
      color: "text-womb-plum" 
    },
    { 
      icon: Sparkles, 
      value: "23,891", 
      label: "Hearts Given", 
      color: "text-womb-crimson" 
    },
  ];

  const wombWisdom = [
    {
      fact: "Did you know that period blood is actually cleaner than regular blood?",
      type: "Myth Buster"
    },
    {
      fact: "Cramps are caused by your uterus contracting to shed its lining - it's working hard!",
      type: "Body Facts"
    },
    {
      fact: "Tracking your cycle can help you understand your energy patterns and mood changes.",
      type: "Self-Care Tip"
    }
  ];

  return (
    <section className="py-16 bg-womb-deepgrey">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-womb-softwhite mb-4">
            Community Pulse
          </h2>
          <p className="text-lg text-womb-warmgrey max-w-2xl mx-auto">
            See what's trending, discover popular conversations, and connect with our growing community.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trending Tags */}
          <div className="bg-womb-charcoal rounded-lg p-6 animate-fade-in">
            <div className="flex items-center space-x-2 mb-6">
              <TrendingUp className="w-5 h-5 text-womb-crimson" />
              <h3 className="text-xl font-playfair font-semibold text-womb-softwhite">
                Trending Tags
              </h3>
            </div>
            <div className="space-y-3">
              {trendingTags.map((tag, index) => (
                <div 
                  key={tag.name}
                  className="flex items-center justify-between p-3 bg-womb-deepgrey rounded-lg hover:bg-womb-deepgrey/80 transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-womb-warmgrey text-sm font-medium">
                      #{index + 1}
                    </span>
                    <div>
                      <div className="text-womb-softwhite font-medium">
                        #{tag.name}
                      </div>
                      <div className="text-womb-warmgrey text-sm">
                        {tag.count} stories
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-womb-crimson/20 text-womb-crimson border-womb-crimson/30">
                    {tag.growth}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Community Stats */}
          <div className="bg-womb-charcoal rounded-lg p-6 animate-fade-in">
            <div className="flex items-center space-x-2 mb-6">
              <Users className="w-5 h-5 text-womb-plum" />
              <h3 className="text-xl font-playfair font-semibold text-womb-softwhite">
                Community Stats
              </h3>
            </div>
            <div className="space-y-6">
              {communityStats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-womb-deepgrey rounded-lg">
                  <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-playfair font-bold text-womb-softwhite mb-1">
                    {stat.value}
                  </div>
                  <div className="text-womb-warmgrey text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Womb Wisdom */}
          <div className="bg-womb-charcoal rounded-lg p-6 animate-fade-in">
            <div className="flex items-center space-x-2 mb-6">
              <Sparkles className="w-5 h-5 text-womb-plum" />
              <h3 className="text-xl font-playfair font-semibold text-womb-softwhite">
                Womb Wisdom
              </h3>
            </div>
            <div className="space-y-4">
              {wombWisdom.map((wisdom, index) => (
                <div 
                  key={index}
                  className="p-4 bg-womb-deepgrey rounded-lg border-l-4 border-womb-plum"
                >
                  <Badge className="bg-womb-plum/20 text-womb-plum border-womb-plum/30 mb-2">
                    {wisdom.type}
                  </Badge>
                  <p className="text-womb-softwhite text-sm leading-relaxed">
                    {wisdom.fact}
                  </p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-6 border-womb-plum text-womb-plum hover:bg-womb-plum hover:text-white">
              More Wisdom
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityHighlights;
