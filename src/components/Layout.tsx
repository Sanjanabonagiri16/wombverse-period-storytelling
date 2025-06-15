
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

      {/* More Wisdom Section */}
      <section className="bg-womb-deepgrey py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-playfair font-bold text-womb-softwhite mb-4 md:mb-6">
              More Wisdom
            </h2>
            <p className="text-womb-warmgrey text-base md:text-lg mb-8 md:mb-12 max-w-2xl mx-auto">
              Discover insights, tips, and resources to help you on your journey
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              <div className="bg-womb-charcoal p-4 md:p-6 rounded-lg border border-womb-deepgrey hover:border-womb-crimson/30 transition-colors">
                <h3 className="text-lg md:text-xl font-semibold text-womb-softwhite mb-2 md:mb-3">Period Health</h3>
                <p className="text-womb-warmgrey text-sm md:text-base">
                  Learn about menstrual health, cycle tracking, and wellness tips
                </p>
              </div>
              <div className="bg-womb-charcoal p-4 md:p-6 rounded-lg border border-womb-deepgrey hover:border-womb-plum/30 transition-colors">
                <h3 className="text-lg md:text-xl font-semibold text-womb-softwhite mb-2 md:mb-3">Emotional Wellness</h3>
                <p className="text-womb-warmgrey text-sm md:text-base">
                  Explore emotional support and mental health resources
                </p>
              </div>
              <div className="bg-womb-charcoal p-4 md:p-6 rounded-lg border border-womb-deepgrey hover:border-womb-crimson/30 transition-colors">
                <h3 className="text-lg md:text-xl font-semibold text-womb-softwhite mb-2 md:mb-3">Community Stories</h3>
                <p className="text-womb-warmgrey text-sm md:text-base">
                  Read inspiring stories and experiences from our community
                </p>
              </div>
              <div className="bg-womb-charcoal p-4 md:p-6 rounded-lg border border-womb-deepgrey hover:border-womb-plum/30 transition-colors">
                <h3 className="text-lg md:text-xl font-semibold text-womb-softwhite mb-2 md:mb-3">Myth Busting</h3>
                <p className="text-womb-warmgrey text-sm md:text-base">
                  Separate facts from fiction about periods and women's health
                </p>
              </div>
              <div className="bg-womb-charcoal p-4 md:p-6 rounded-lg border border-womb-deepgrey hover:border-womb-crimson/30 transition-colors">
                <h3 className="text-lg md:text-xl font-semibold text-womb-softwhite mb-2 md:mb-3">Cultural Insights</h3>
                <p className="text-womb-warmgrey text-sm md:text-base">
                  Explore how different cultures view and celebrate menstruation
                </p>
              </div>
              <div className="bg-womb-charcoal p-4 md:p-6 rounded-lg border border-womb-deepgrey hover:border-womb-plum/30 transition-colors">
                <h3 className="text-lg md:text-xl font-semibold text-womb-softwhite mb-2 md:mb-3">Self-Care Tips</h3>
                <p className="text-womb-warmgrey text-sm md:text-base">
                  Practical advice for managing symptoms and feeling your best
                </p>
              </div>
              <div className="bg-womb-charcoal p-4 md:p-6 rounded-lg border border-womb-deepgrey hover:border-womb-crimson/30 transition-colors">
                <h3 className="text-lg md:text-xl font-semibold text-womb-softwhite mb-2 md:mb-3">Product Reviews</h3>
                <p className="text-womb-warmgrey text-sm md:text-base">
                  Honest reviews of period products from real users
                </p>
              </div>
              <div className="bg-womb-charcoal p-4 md:p-6 rounded-lg border border-womb-deepgrey hover:border-womb-plum/30 transition-colors">
                <h3 className="text-lg md:text-xl font-semibold text-womb-softwhite mb-2 md:mb-3">Expert Advice</h3>
                <p className="text-womb-warmgrey text-sm md:text-base">
                  Guidance from healthcare professionals and specialists
                </p>
              </div>
            </div>
            <div className="mt-8 md:mt-12">
              <Link to="/resources">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-womb-crimson to-womb-plum hover:from-womb-crimson/80 hover:to-womb-plum/80 text-white px-6 md:px-8 py-2 md:py-3 text-sm md:text-base"
                >
                  Explore All Resources
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Join Community Section */}
      <section className="bg-gradient-to-r from-womb-crimson to-womb-plum py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-playfair font-bold text-white mb-4 md:mb-6">
              Join Our Community
            </h2>
            <p className="text-white/90 text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto">
              Connect with others, share your experiences, and be part of a supportive community that celebrates every journey
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
              <div className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-lg">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">12K+</div>
                <div className="text-white/80 text-sm md:text-base">Community Members</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-lg">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">1.2K+</div>
                <div className="text-white/80 text-sm md:text-base">Stories Shared</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-lg">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">24K+</div>
                <div className="text-white/80 text-sm md:text-base">Hearts Given</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center max-w-md mx-auto">
              <Link to="/auth" className="flex-1">
                <Button 
                  size="lg" 
                  className="w-full bg-white text-womb-crimson hover:bg-white/90 font-semibold px-6 md:px-8 py-2 md:py-3 text-sm md:text-base"
                >
                  Get Started
                </Button>
              </Link>
              <Link to="/stories" className="flex-1">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full border-white text-white hover:bg-white hover:text-womb-crimson font-semibold px-6 md:px-8 py-2 md:py-3 text-sm md:text-base"
                >
                  Explore Stories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

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
