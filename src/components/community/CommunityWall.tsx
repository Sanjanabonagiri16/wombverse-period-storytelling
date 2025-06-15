
import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CommunityItem {
  id: string;
  type: 'affirmation' | 'poll' | 'art' | 'wisdom';
  content: string;
  author?: string;
  reactions?: number;
  comments?: number;
  image?: string;
  pollOptions?: { option: string; votes: number }[];
}

const CommunityWall = () => {
  const [items, setItems] = useState<CommunityItem[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Mock data for community items
    const mockItems: CommunityItem[] = [
      {
        id: '1',
        type: 'affirmation',
        content: 'Your period is not something to be ashamed of. It\'s a sign of your body\'s incredible strength and capability. 💪✨',
        author: 'Sarah M.',
        reactions: 47,
        comments: 12,
      },
      {
        id: '2',
        type: 'poll',
        content: 'What helps you most during period pain?',
        author: 'Community',
        reactions: 23,
        comments: 8,
        pollOptions: [
          { option: 'Heating pad', votes: 34 },
          { option: 'Pain medication', votes: 28 },
          { option: 'Gentle exercise', votes: 19 },
          { option: 'Rest and sleep', votes: 42 },
        ],
      },
      {
        id: '3',
        type: 'wisdom',
        content: 'Remember: every woman\'s period is different. What works for someone else might not work for you, and that\'s completely normal. Trust your body and find what makes YOU feel better. 🌙',
        author: 'Dr. Maya Chen',
        reactions: 89,
        comments: 24,
      },
      {
        id: '4',
        type: 'affirmation',
        content: 'You are not "moody" - you are human with valid emotions. Your feelings matter, period or no period. 🌸',
        author: 'Anonymous',
        reactions: 156,
        comments: 31,
      },
      {
        id: '5',
        type: 'art',
        content: 'Created this mandala during my last cycle - art therapy really helps! 🎨',
        author: 'Luna A.',
        reactions: 67,
        comments: 18,
        image: '/placeholder.svg',
      },
      {
        id: '6',
        type: 'wisdom',
        content: 'Pro tip: Keep a period journal to track your symptoms, mood, and what helps. You\'ll start to see patterns and be better prepared each month! 📝',
        author: 'Emma R.',
        reactions: 78,
        comments: 15,
      },
    ];

    setItems(mockItems);
    
    // Trigger visibility animation
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const getItemColor = (type: string) => {
    const colors = {
      affirmation: 'from-womb-maroon/10 to-womb-maroon/20 border-womb-maroon/30',
      poll: 'from-womb-mediumgray/10 to-womb-mediumgray/20 border-womb-mediumgray/30',
      art: 'from-womb-softgray/10 to-womb-softgray/20 border-womb-softgray/30',
      wisdom: 'from-white/10 to-white/20 border-white/30',
    };
    return colors[type as keyof typeof colors] || 'from-gray-500/10 to-gray-600/10 border-gray-500/20';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'affirmation': return '💝';
      case 'poll': return '📊';
      case 'art': return '🎨';
      case 'wisdom': return '💡';
      default: return '✨';
    }
  };

  const renderPoll = (item: CommunityItem) => {
    const totalVotes = item.pollOptions?.reduce((sum, option) => sum + option.votes, 0) || 0;
    
    return (
      <div className="space-y-3">
        <p className="text-white font-medium">{item.content}</p>
        <div className="space-y-2">
          {item.pollOptions?.map((option, index) => {
            const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
            return (
              <div key={index} className="relative group">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-white transition-colors duration-300 group-hover:text-womb-mediumgray">{option.option}</span>
                  <span className="text-xs text-white transition-colors duration-300 group-hover:text-womb-softgray">{option.votes} votes</span>
                </div>
                <div className="w-full bg-womb-deepgrey rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-womb-mediumgray to-womb-maroon h-2 rounded-full transition-all duration-1000 ease-out hover:from-womb-maroon hover:to-womb-maroon"
                    style={{ 
                      width: `${percentage}%`,
                      transitionDelay: `${index * 200}ms`
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-white transition-colors duration-300 hover:text-womb-mediumgray">{totalVotes} total votes</p>
      </div>
    );
  };

  return (
    <div className="space-y-6 relative">
      {/* Header with smooth entrance */}
      <div className={`text-center mb-8 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-3 transition-all duration-500 hover:scale-105 hover:text-womb-mediumgray">
          Community Wall 🌟
        </h2>
        <p className="text-base md:text-lg text-white transition-all duration-500 hover:text-womb-softgray">
          Polls, affirmations, period art, and shared wisdom from our community
        </p>
      </div>

      {/* Dynamic Pinterest-like Grid with staggered animations */}
      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {items.map((item, itemIndex) => (
          <div
            key={item.id}
            className={`break-inside-avoid bg-gradient-to-br ${getItemColor(item.type)} rounded-xl p-6 border backdrop-blur-sm transition-all duration-700 cursor-pointer group hover:-translate-y-3 hover:shadow-2xl hover:shadow-womb-maroon/20 hover:scale-105 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
            style={{
              transitionDelay: `${itemIndex * 150}ms`
            }}
          >
            <div className="space-y-4">
              {/* Header with hover effects */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">
                    {getTypeIcon(item.type)}
                  </span>
                  <span className="text-sm font-medium text-womb-maroon capitalize transition-all duration-300 group-hover:text-white group-hover:font-bold">
                    {item.type}
                  </span>
                </div>
                {item.type === 'poll' && (
                  <TrendingUp className="w-4 h-4 text-white transition-all duration-300 group-hover:text-womb-maroon group-hover:scale-110" />
                )}
              </div>

              {/* Content with smooth transitions */}
              {item.type === 'poll' ? (
                renderPoll(item)
              ) : (
                <div className="space-y-3">
                  {item.image && (
                    <img
                      src={item.image}
                      alt="Community art"
                      className="w-full rounded-lg transition-all duration-500 group-hover:scale-105 group-hover:shadow-lg"
                    />
                  )}
                  <p className="text-white leading-relaxed transition-all duration-300 group-hover:text-womb-mediumgray">
                    {item.content}
                  </p>
                </div>
              )}

              {/* Footer with interactive elements */}
              <div className="flex items-center justify-between pt-3 border-t border-womb-deepgrey/50 transition-all duration-300 group-hover:border-womb-maroon/30">
                <div className="flex items-center space-x-1">
                  <div className="w-6 h-6 bg-gradient-to-br from-womb-mediumgray to-womb-maroon rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                    <span className="text-white text-xs transition-all duration-300">
                      {item.author?.charAt(0) || 'C'}
                    </span>
                  </div>
                  <span className="text-xs text-white transition-all duration-300 group-hover:text-womb-mediumgray group-hover:font-medium">
                    {item.author || 'Community'}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <button className="flex items-center space-x-1 text-white hover:text-womb-maroon transition-all duration-300 hover:scale-110 hover:-translate-y-1">
                    <Heart className="w-4 h-4 transition-all duration-300 hover:fill-current" />
                    <span className="text-xs">{item.reactions}</span>
                  </button>
                  
                  <button className="flex items-center space-x-1 text-white hover:text-womb-maroon transition-all duration-300 hover:scale-110 hover:-translate-y-1">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-xs">{item.comments}</span>
                  </button>
                  
                  <button className="text-white hover:text-womb-maroon transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:rotate-12">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Content Button with enhanced animation */}
      <div className={`text-center pt-8 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '800ms' }}>
        <Button className="bg-gradient-to-r from-womb-mediumgray to-white hover:from-gray-500 hover:to-gray-400 text-womb-charcoal font-medium px-6 py-2 rounded-lg transition-all duration-500 hover:scale-110 shadow-lg shadow-gray-600/25 hover:shadow-xl hover:shadow-gray-600/40 border-2 border-womb-maroon hover:-translate-y-2 hover:shadow-2xl hover:shadow-womb-maroon/30 transform">
          Share with Community ✨
        </Button>
      </div>
    </div>
  );
};

export default CommunityWall;
