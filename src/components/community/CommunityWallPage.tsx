
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import CommunityPostForm from './CommunityPostForm';
import CommunityPostItem from './CommunityPostItem';
import { Loader2, Users } from 'lucide-react';

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

const CommunityWallPage = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
    
    // Set up real-time subscription for new posts
    const channel = supabase
      .channel('community-posts')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'community_posts'
        },
        () => {
          fetchPosts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchPosts = async () => {
    try {
      const { data: postsData } = await supabase
        .from('community_posts')
        .select('*')
        .eq('is_active', true)
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false });

      if (postsData) {
        // Fetch profiles for each post and properly type the data
        const postsWithProfiles = await Promise.all(
          postsData.map(async (post) => {
            const { data: profile } = await supabase
              .from('profiles')
              .select('display_name')
              .eq('id', post.user_id)
              .single();

            // Properly cast the poll_options and poll_votes
            const typedPost: CommunityPost = {
              id: post.id,
              type: post.type,
              title: post.title,
              content: post.content,
              poll_options: Array.isArray(post.poll_options) ? post.poll_options as string[] : null,
              poll_votes: (post.poll_votes && typeof post.poll_votes === 'object') ? post.poll_votes as Record<string, string[]> : null,
              is_pinned: post.is_pinned,
              created_at: post.created_at,
              user_id: post.user_id,
              profiles: profile
            };

            return typedPost;
          })
        );

        setPosts(postsWithProfiles);
      }
    } catch (error) {
      console.error('Error fetching community posts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-womb-plum" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Users className="w-8 h-8 text-womb-plum" />
          <h2 className="text-2xl md:text-3xl font-playfair font-bold text-womb-softwhite">
            Community Wall
          </h2>
        </div>
        <p className="text-womb-warmgrey">
          Share posts, polls, and affirmations with our supportive community
        </p>
      </div>

      <CommunityPostForm onPostCreated={fetchPosts} />

      <div className="space-y-6">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-womb-warmgrey text-lg">No community posts yet</p>
            <p className="text-womb-warmgrey text-sm mt-2">
              Be the first to share something with the community!
            </p>
          </div>
        ) : (
          posts.map((post) => (
            <CommunityPostItem 
              key={post.id} 
              post={post} 
              onPostUpdated={fetchPosts}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CommunityWallPage;
