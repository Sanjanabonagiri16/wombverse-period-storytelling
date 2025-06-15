
import { useState } from 'react';
import { Search, Menu, X, Heart, PenTool, User, LogOut, Book, MessageSquare, Users, Sparkles, Home, Mail, Instagram, Twitter, Facebook, Youtube, ChevronUp } from 'lucide-react';
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
  const [newsletterEmail, setNewsletterEmail] = useState('');
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

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      toast({
        title: "Thank you!",
        description: "You've been subscribed to our newsletter.",
      });
      setNewsletterEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isActivePage = (path: string) => location.pathname === path;

  const navigationItems = [
    { href: '/', label: 'Home', icon: Home },
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

      {/* Professional Footer */}
      <footer className="bg-womb-charcoal border-t border-womb-plum relative z-10">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-womb-softwhite">
            {/* Brand & About */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-womb-plum to-womb-charcoal rounded-full flex items-center justify-center">
                  <span>
                    <svg width="18" height="18" viewBox="0 0 20 20" className="w-5 h-5 text-white"><circle cx="10" cy="10" r="10" fill="currentColor"/></svg>
                  </span>
                </div>
                <span className="font-playfair text-xl font-bold text-white">WombVerse</span>
              </div>
              <p className="mb-4 text-sm text-womb-warmgrey">
                WombVerse is a professional community dedicated to sharing accurate, science-backed knowledge and real stories about menstrual health and wellbeing, with a focus on creating informed belonging.
              </p>
              <p className="text-xs text-womb-warmgrey">&copy; 2025 WombVerse. All rights reserved.</p>
            </div>
            {/* Explore */}
            <div>
              <h4 className="font-playfair font-semibold text-lg text-white mb-4">Explore</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/featured-stories" className="text-womb-warmgrey hover:text-primary transition-colors">Featured Stories</Link>
                </li>
                <li>
                  <Link to="/recent-stories" className="text-womb-warmgrey hover:text-primary transition-colors">Recent Stories</Link>
                </li>
                <li>
                  <Link to="/resources" className="text-womb-warmgrey hover:text-primary transition-colors">Resources</Link>
                </li>
                <li>
                  <Link to="/support" className="text-womb-warmgrey hover:text-primary transition-colors">Support</Link>
                </li>
              </ul>
            </div>
            {/* Community */}
            <div>
              <h4 className="font-playfair font-semibold text-lg text-white mb-4">Community</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/guidelines" className="text-womb-warmgrey hover:text-primary transition-colors">Community Guidelines</Link>
                </li>
                <li>
                  <Link to="/about-us" className="text-womb-warmgrey hover:text-primary transition-colors">About Us</Link>
                </li>
                <li>
                  <Link to="/contact" className="text-womb-warmgrey hover:text-primary transition-colors">Contact</Link>
                </li>
              </ul>
            </div>
            {/* Legal */}
            <div>
              <h4 className="font-playfair font-semibold text-lg text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/privacy" className="text-womb-warmgrey hover:text-primary transition-colors">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
