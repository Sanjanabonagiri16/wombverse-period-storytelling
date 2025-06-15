
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
  }, []);

  const getItemColor = (type: string) => {
    const colors = {
      affirmation: 'from-red-500/10 to-rose-500/10 border-red-500/20',
      poll: 'from-blue-500/10 to-indigo-500/10 border-blue-500/20',
      art: 'from-purple-500/10 to-violet-500/10 border-purple-500/20',
      wisdom: 'from-green-500/10 to-emerald-500/10 border-green-500/20',
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
              <div key={index} className="relative">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-white">{option.option}</span>
                  <span className="text-xs text-white">{option.votes} votes</span>
                </div>
                <div className="w-full bg-womb-deepgrey rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-womb-darkgray to-womb-maroon h-2 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-white">{totalVotes} total votes</p>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-3">
          Community Wall 🌟
        </h2>
        <p className="text-base md:text-lg text-white">
          Polls, affirmations, period art, and shared wisdom from our community
        </p>
      </div>

      {/* Dynamic Pinterest-like Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {items.map((item) => (
          <div
            key={item.id}
            className={`break-inside-avoid bg-gradient-to-br ${getItemColor(item.type)} rounded-xl p-6 border backdrop-blur-sm hover:shadow-lg hover:shadow-womb-maroon/5 transition-all duration-300 group`}
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{getTypeIcon(item.type)}</span>
                  <span className="text-sm font-medium text-womb-maroon capitalize">
                    {item.type}
                  </span>
                </div>
                {item.type === 'poll' && <TrendingUp className="w-4 h-4 text-white" />}
              </div>

              {/* Content */}
              {item.type === 'poll' ? (
                renderPoll(item)
              ) : (
                <div className="space-y-3">
                  {item.image && (
                    <img
                      src={item.image}
                      alt="Community art"
                      className="w-full rounded-lg"
                    />
                  )}
                  <p className="text-white leading-relaxed group-hover:text-white transition-colors">
                    {item.content}
                  </p>
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-womb-deepgrey/50">
                <div className="flex items-center space-x-1">
                  <div className="w-6 h-6 bg-gradient-to-br from-womb-darkgray to-womb-maroon rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">
                      {item.author?.charAt(0) || 'C'}
                    </span>
                  </div>
                  <span className="text-xs text-white">
                    {item.author || 'Community'}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <button className="flex items-center space-x-1 text-white hover:text-womb-darkgray transition-colors">
                    <Heart className="w-4 h-4" />
                    <span className="text-xs">{item.reactions}</span>
                  </button>
                  
                  <button className="flex items-center space-x-1 text-white hover:text-womb-maroon transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-xs">{item.comments}</span>
                  </button>
                  
                  <button className="text-white hover:text-white transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Content Button */}
      <div className="text-center pt-8">
        <Button className="btn-primary">
          Share with Community ✨
        </Button>
      </div>
    </div>
  );
};

export default CommunityWall;
