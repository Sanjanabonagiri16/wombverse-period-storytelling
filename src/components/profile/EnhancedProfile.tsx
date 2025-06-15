
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { User, MapPin, Globe, Edit3, Bookmark, Heart } from 'lucide-react';

interface Profile {
  id: string;
  display_name: string;
  bio: string;
  location: string;
  website: string;
  story_count: number;
  follower_count: number;
  following_count: number;
  is_verified: boolean;
}

const EnhancedProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    display_name: '',
    bio: '',
    location: '',
    website: '',
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      setProfile(data);
      setFormData({
        display_name: data.display_name || '',
        bio: data.bio || '',
        location: data.location || '',
        website: data.website || '',
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update(formData)
        .eq('id', user.id);

      if (error) throw error;

      setProfile(prev => prev ? { ...prev, ...formData } : null);
      setIsEditing(false);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error updating profile",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-womb-plum"></div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      <div className="bg-womb-deepgrey/50 border border-womb-plum/30 rounded-lg p-6 md:p-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-womb-crimson to-womb-plum rounded-full flex items-center justify-center">
              <User className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-playfair font-bold text-womb-softwhite">
                {profile.display_name || 'User'}
                {profile.is_verified && (
                  <span className="ml-2 text-womb-plum">✓</span>
                )}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm text-womb-warmgrey mt-1">
                <span>{profile.story_count} stories</span>
                <span>{profile.follower_count} followers</span>
                <span>{profile.following_count} following</span>
              </div>
            </div>
          </div>
          
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant="outline"
            className="border-womb-plum text-womb-plum hover:bg-womb-plum hover:text-white w-full md:w-auto"
          >
            <Edit3 className="w-4 h-4 mr-2" />
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </div>

        {/* Profile Form */}
        {isEditing ? (
          <div className="space-y-4 md:space-y-6">
            <div>
              <label className="block text-sm font-medium text-womb-softwhite mb-2">
                Display Name
              </label>
              <Input
                value={formData.display_name}
                onChange={(e) => setFormData(prev => ({ ...prev, display_name: e.target.value }))}
                className="bg-womb-charcoal border-womb-deepgrey text-womb-softwhite"
                placeholder="Enter your display name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-womb-softwhite mb-2">
                Bio
              </label>
              <Textarea
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                className="bg-womb-charcoal border-womb-deepgrey text-womb-softwhite min-h-[100px]"
                placeholder="Tell us about yourself..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-womb-softwhite mb-2">
                Location
              </label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="bg-womb-charcoal border-womb-deepgrey text-womb-softwhite"
                placeholder="Where are you from?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-womb-softwhite mb-2">
                Website
              </label>
              <Input
                value={formData.website}
                onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                className="bg-womb-charcoal border-womb-deepgrey text-womb-softwhite"
                placeholder="https://your-website.com"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <Button
                onClick={updateProfile}
                className="btn-primary flex-1"
              >
                Save Changes
              </Button>
              <Button
                onClick={() => setIsEditing(false)}
                variant="outline"
                className="border-womb-warmgrey text-womb-warmgrey hover:bg-womb-warmgrey hover:text-womb-charcoal flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Bio */}
            {profile.bio && (
              <div>
                <h3 className="text-lg font-medium text-womb-softwhite mb-2">About</h3>
                <p className="text-womb-warmgrey">{profile.bio}</p>
              </div>
            )}

            {/* Location & Website */}
            <div className="flex flex-col md:flex-row gap-4 text-sm text-womb-warmgrey">
              {profile.location && (
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{profile.location}</span>
                </div>
              )}
              {profile.website && (
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4" />
                  <a 
                    href={profile.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-womb-plum hover:text-womb-crimson"
                  >
                    {profile.website}
                  </a>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-womb-deepgrey">
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-womb-softwhite">
                  {profile.story_count}
                </div>
                <div className="text-sm text-womb-warmgrey">Stories</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-womb-softwhite">
                  {profile.follower_count}
                </div>
                <div className="text-sm text-womb-warmgrey">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-womb-softwhite">
                  {profile.following_count}
                </div>
                <div className="text-sm text-womb-warmgrey">Following</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedProfile;
