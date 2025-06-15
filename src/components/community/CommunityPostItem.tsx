
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';
import { Pin, BarChart3, Heart, Flag } from 'lucide-react';

interface CommunityPost {
  id: string;
  type: string;
  title: string | null;
  content: string;
  poll_options: string[] | null;
  poll_votes: Record<string, string[]> | null;
  is_pinned: boolean;
  created_at: string;
  user_id: string;
  profiles?: {
    display_name: string;
  } | null;
}

interface CommunityPostItemProps {
  post: CommunityPost;
  onPostUpdated: () => void;
}

const CommunityPostItem = ({ post, onPostUpdated }: CommunityPostItemProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [voting, setVoting] = useState(false);

  const handleVote = async (optionIndex: number) => {
    if (!user || !post.poll_options) return;

    setVoting(true);
    try {
      const currentVotes = post.poll_votes || {};
      const option = post.poll_options[optionIndex];
      
      // Remove user's previous vote if any
      Object.keys(currentVotes).forEach(opt => {
        if (currentVotes[opt].includes(user.id)) {
          currentVotes[opt] = currentVotes[opt].filter(id => id !== user.id);
        }
      });

      // Add new vote
      if (!currentVotes[option]) {
        currentVotes[option] = [];
      }
      currentVotes[option].push(user.id);

      await supabase
        .from('community_posts')
        .update({ poll_votes: currentVotes })
        .eq('id', post.id);

      // Track analytics
      await supabase.rpc('track_analytics_event', {
        event_type_param: 'poll_vote',
        user_id_param: user.id,
        metadata_param: { post_id: post.id, option }
      });

      onPostUpdated();
      
      toast({
        title: "Vote recorded",
        description: "Your vote has been recorded!",
      });
    } catch (error) {
      console.error('Error voting:', error);
      toast({
        title: "Error",
        description: "Failed to record vote.",
        variant: "destructive",
      });
    } finally {
      setVoting(false);
    }
  };

  const handleFlag = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to flag content.",
        variant: "destructive",
      });
      return;
    }

    try {
      await supabase
        .from('content_moderation')
        .insert({
          content_type: 'community_posts',
          content_id: post.id,
          flagged_by: user.id,
          flag_reason: 'User reported inappropriate content',
          flag_type: 'manual'
        });

      toast({
        title: "Content flagged",
        description: "Thank you for reporting. Our moderators will review this content.",
      });
    } catch (error) {
      console.error('Error flagging content:', error);
      toast({
        title: "Error",
        description: "Failed to flag content.",
        variant: "destructive",
      });
    }
  };

  const getPostTypeIcon = () => {
    switch (post.type) {
      case 'poll':
        return <BarChart3 className="w-4 h-4" />;
      case 'affirmation':
        return <Heart className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getTotalVotes = () => {
    if (!post.poll_votes) return 0;
    return Object.values(post.poll_votes).reduce((total, votes) => total + votes.length, 0);
  };

  const getUserVote = () => {
    if (!user || !post.poll_votes) return null;
    
    for (const [option, votes] of Object.entries(post.poll_votes)) {
      if (votes.includes(user.id)) {
        return option;
      }
    }
    return null;
  };

  return (
    <Card className="bg-gradient-to-br from-womb-deepgrey to-womb-charcoal border-womb-deepgrey hover:border-womb-plum/50 transition-all duration-300">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-womb-crimson to-womb-plum rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {post.profiles?.display_name?.charAt(0) || 'U'}
                </span>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <p className="text-womb-softwhite font-medium text-sm">
                    {post.profiles?.display_name || 'User'}
                  </p>
                  {post.is_pinned && (
                    <Pin className="w-3 h-3 text-womb-plum" />
                  )}
                  {getPostTypeIcon() && (
                    <div className="text-womb-warmgrey">
                      {getPostTypeIcon()}
                    </div>
                  )}
                </div>
                <p className="text-womb-warmgrey text-xs">
                  {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                </p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFlag}
              className="text-womb-warmgrey hover:text-red-400"
            >
              <Flag className="w-4 h-4" />
            </Button>
          </div>

          {/* Content */}
          {post.title && (
            <h3 className="text-womb-softwhite font-semibold text-lg">
              {post.title}
            </h3>
          )}
          
          <p className="text-womb-softwhite leading-relaxed">
            {post.content}
          </p>

          {/* Poll Options */}
          {post.type === 'poll' && post.poll_options && (
            <div className="space-y-3">
              <div className="text-sm text-womb-warmgrey">
                {getTotalVotes()} votes
              </div>
              {post.poll_options.map((option, index) => {
                const votes = post.poll_votes?.[option] || [];
                const voteCount = votes.length;
                const totalVotes = getTotalVotes();
                const percentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;
                const userVoted = getUserVote() === option;
                
                return (
                  <div key={index} className="space-y-1">
                    <Button
                      variant="outline"
                      className={`w-full justify-start h-auto p-3 ${
                        userVoted 
                          ? 'border-womb-plum bg-womb-plum/20 text-womb-plum' 
                          : 'border-womb-deepgrey hover:border-womb-warmgrey'
                      }`}
                      onClick={() => handleVote(index)}
                      disabled={voting}
                    >
                      <div className="w-full">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">{option}</span>
                          <span className="text-xs">{percentage.toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-womb-charcoal rounded-full h-2">
                          <div 
                            className="bg-womb-plum h-2 rounded-full transition-all duration-300"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </Button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Post Type Badge */}
          <div className="flex items-center justify-between">
            <Badge 
              variant="secondary" 
              className={`${
                post.type === 'affirmation' ? 'bg-pink-500/20 text-pink-400' :
                post.type === 'poll' ? 'bg-blue-500/20 text-blue-400' :
                'bg-womb-warmgrey/20 text-womb-warmgrey'
              }`}
            >
              {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityPostItem;
