
import { useState } from 'react';
import { Search, Menu, X, Heart, PenTool, User, LogOut, Book, MessageSquare, Users, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out",
        description: "You've been successfully signed out.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleShareStory = () => {
    console.log('Share Story button clicked');
    console.log('User:', user);
    console.log('Loading:', loading);
    
    if (!user) {
      console.log('No user, showing toast and navigating to auth');
      toast({
        title: "Sign in required",
        description: "Please sign in to share your story.",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }
    
    console.log('User authenticated, navigating to create-story');
    navigate('/create-story');
  };

  const isActivePage = (path: string) => location.pathname === path;

  const navigationItems = [
    { href: '/stories', label: 'Stories', icon: Book },
    { href: '/whispers', label: 'Whispers', icon: MessageSquare },
    { href: '/community', label: 'Community', icon: Users },
    // Add mood stories for authenticated users
    ...(user ? [{ href: '/mood-stories', label: 'Mood Stories', icon: Sparkles }] : []),
  ];

  return (
    <div className="min-h-screen bg-womb-charcoal">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-womb-charcoal/95 backdrop-blur-sm border-b border-womb-deepgrey">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-womb-crimson to-womb-plum rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-playfair font-bold text-womb-softwhite">
                <Link to="/">WombVerse</Link>
              </h1>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center space-x-6">
              {navigationItems.map(item => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center space-x-2 transition-colors ${
                    isActivePage(item.href)
                      ? 'text-womb-crimson font-medium'
                      : 'text-womb-softwhite hover:text-womb-crimson'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
              
              {!loading && (
                <>
                  {user ? (
                    <>
                      <Button 
                        className="bg-gradient-to-r from-womb-crimson to-womb-plum hover:from-womb-crimson/80 hover:to-womb-plum/80 text-white border-0" 
                        onClick={handleShareStory}
                      >
                        <PenTool className="w-4 h-4 mr-2" />
                        Share Story
                      </Button>
                      <Link
                        to="/profile"
                        className={`transition-colors ${
                          isActivePage('/profile')
                            ? 'text-womb-crimson'
                            : 'text-womb-softwhite hover:text-womb-crimson'
                        }`}
                      >
                        <User className="w-5 h-5" />
                      </Link>
                      <Button 
                        variant="ghost" 
                        className="text-womb-softwhite hover:text-womb-crimson hover:bg-womb-deepgrey"
                        onClick={handleSignOut}
                      >
                        <LogOut className="w-4 h-4" />
                      </Button>
                    </>
                  ) : (
                    <Link to="/auth">
                      <Button 
                        variant="ghost" 
                        className="text-womb-softwhite hover:text-womb-crimson hover:bg-womb-deepgrey"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Sign In
                      </Button>
                    </Link>
                  )}
                </>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-womb-softwhite"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-womb-warmgrey w-4 h-4" />
              <Input
                placeholder="Search stories..."
                className="pl-10 bg-womb-deepgrey border-womb-deepgrey text-womb-softwhite placeholder-womb-warmgrey focus:border-womb-crimson"
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-womb-deepgrey border-t border-womb-deepgrey">
            <nav className="container mx-auto px-4 py-4 space-y-4">
              {navigationItems.map(item => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center space-x-2 transition-colors ${
                    isActivePage(item.href)
                      ? 'text-womb-crimson font-medium'
                      : 'text-womb-softwhite hover:text-womb-crimson'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
              
              {!loading && (
                <div className="pt-4 border-t border-womb-deepgrey space-y-2">
                  {user ? (
                    <>
                      <Button 
                        className="w-full bg-gradient-to-r from-womb-crimson to-womb-plum hover:from-womb-crimson/80 hover:to-womb-plum/80 text-white border-0" 
                        onClick={() => {
                          handleShareStory();
                          setIsMenuOpen(false);
                        }}
                      >
                        <PenTool className="w-4 h-4 mr-2" />
                        Share Your Story
                      </Button>
                      <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                        <Button 
                          variant="outline" 
                          className="w-full border-womb-plum text-womb-plum hover:bg-womb-plum hover:text-white"
                        >
                          <User className="w-4 h-4 mr-2" />
                          Profile
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        className="w-full border-womb-plum text-womb-plum hover:bg-womb-plum hover:text-white"
                        onClick={handleSignOut}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                      <Button 
                        variant="outline" 
                        className="w-full border-womb-plum text-womb-plum hover:bg-womb-plum hover:text-white"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Sign In
                      </Button>
                    </Link>
                  )}
                </div>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-womb-deepgrey border-t border-womb-deepgrey">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-br from-womb-crimson to-womb-plum rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-lg font-playfair font-bold text-womb-softwhite">WombVerse</h3>
              </div>
              <p className="text-womb-warmgrey text-sm">
                A safe space for sharing period stories, building community, and normalizing conversations.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-womb-softwhite mb-3">Explore</h4>
              <ul className="space-y-2 text-sm text-womb-warmgrey">
                <li><Link to="/featured-stories" className="hover:text-womb-crimson transition-colors">Featured Stories</Link></li>
                <li><Link to="/recent-stories" className="hover:text-womb-crimson transition-colors">Recent Stories</Link></li>
                <li><Link to="/popular-tags" className="hover:text-womb-crimson transition-colors">Popular Tags</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-womb-softwhite mb-3">Community</h4>
              <ul className="space-y-2 text-sm text-womb-warmgrey">
                <li><Link to="/guidelines" className="hover:text-womb-crimson transition-colors">Guidelines</Link></li>
                <li><Link to="/support" className="hover:text-womb-crimson transition-colors">Support</Link></li>
                <li><Link to="/resources" className="hover:text-womb-crimson transition-colors">Resources</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-womb-softwhite mb-3">Connect</h4>
              <ul className="space-y-2 text-sm text-womb-warmgrey">
                <li><Link to="/about-us" className="hover:text-womb-crimson transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-womb-crimson transition-colors">Contact</Link></li>
                <li><Link to="/privacy" className="hover:text-womb-crimson transition-colors">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-womb-deepgrey mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-center text-sm text-womb-warmgrey mb-4 md:mb-0">
              &copy; 2025 WombVerse. Made with ❤️ for the menstrual community.
            </p>
            <div className="text-xs text-womb-warmgrey">
              <button 
                onClick={() => window.location.href = '/admin'}
                className="hover:text-womb-crimson transition-colors"
                style={{ opacity: 0.3 }}
              >
                Admin Access
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
