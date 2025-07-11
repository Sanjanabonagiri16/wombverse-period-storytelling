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

  // Check if we're on the homepage for transparent navbar
  const isHomepage = location.pathname === '/';

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
    <div className="min-h-screen bg-womb-navy">
      {/* Header with conditional transparency */}
      <header className={`sticky top-0 z-50 ${isHomepage ? 'bg-transparent backdrop-blur-sm' : 'bg-womb-navy/95 backdrop-blur-sm'} border-b ${isHomepage ? 'border-transparent' : 'border-womb-charcoal'} transition-all duration-500`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo with updated colors */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-womb-sapphire to-womb-emerald rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-playfair font-bold text-womb-white">
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
                      ? 'text-womb-sapphire font-medium'
                      : 'text-womb-white hover:text-womb-sapphire'
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
                        className="bg-gradient-to-r from-womb-sapphire to-womb-emerald hover:from-blue-700 hover:to-emerald-700 text-white border-0" 
                        onClick={handleShareStory}
                      >
                        <PenTool className="w-4 h-4 mr-2" />
                        Share Story
                      </Button>
                      <Link
                        to="/profile"
                        className={`transition-colors ${
                          isActivePage('/profile')
                            ? 'text-womb-sapphire'
                            : 'text-womb-white hover:text-womb-sapphire'
                        }`}
                      >
                        <User className="w-5 h-5" />
                      </Link>
                      <Button 
                        variant="ghost" 
                        className="text-womb-white hover:text-womb-sapphire hover:bg-womb-charcoal"
                        onClick={handleSignOut}
                      >
                        <LogOut className="w-4 h-4" />
                      </Button>
                    </>
                  ) : (
                    <Link to="/auth">
                      <Button 
                        variant="ghost" 
                        className="text-womb-white hover:text-womb-sapphire hover:bg-womb-charcoal"
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
              className="md:hidden text-womb-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-womb-lightgrey w-4 h-4" />
              <Input
                placeholder="Search stories..."
                className="pl-10 bg-womb-charcoal border-womb-charcoal text-womb-white placeholder-womb-lightgrey focus:border-womb-sapphire"
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-womb-charcoal border-t border-womb-charcoal">
            <nav className="container mx-auto px-4 py-4 space-y-4">
              {navigationItems.map(item => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center space-x-2 transition-colors ${
                    isActivePage(item.href)
                      ? 'text-womb-sapphire font-medium'
                      : 'text-womb-white hover:text-womb-sapphire'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
              
              {!loading && (
                <div className="pt-4 border-t border-womb-charcoal space-y-2">
                  {user ? (
                    <>
                      <Button 
                        className="w-full bg-gradient-to-r from-womb-sapphire to-womb-emerald hover:from-blue-700 hover:to-emerald-700 text-white border-0" 
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
                          className="w-full border-womb-emerald text-womb-emerald hover:bg-womb-emerald hover:text-white"
                        >
                          <User className="w-4 h-4 mr-2" />
                          Profile
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        className="w-full border-womb-emerald text-womb-emerald hover:bg-womb-emerald hover:text-white"
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
                        className="w-full border-womb-emerald text-womb-emerald hover:bg-womb-emerald hover:text-white"
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
      <main className="flex-1 animate-fade-in">
        {children}
      </main>

      {/* Professional Footer with updated colors - removed border lines */}
      <footer className="bg-womb-navy border-transparent relative z-10 bg-mesh-gradient">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-womb-white">
            {/* Brand & About */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-womb-emerald to-womb-navy rounded-full flex items-center justify-center">
                  <span>
                    <svg width="18" height="18" viewBox="0 0 20 20" className="w-5 h-5 text-white"><circle cx="10" cy="10" r="10" fill="currentColor"/></svg>
                  </span>
                </div>
                <span className="font-playfair text-xl font-bold text-white">WombVerse</span>
              </div>
              <p className="mb-4 text-sm text-womb-lightgrey">
                WombVerse is a professional community dedicated to sharing accurate, science-backed knowledge and real stories about menstrual health and wellbeing, with a focus on creating informed belonging.
              </p>
            </div>
            {/* Explore */}
            <div>
              <h4 className="font-playfair font-semibold text-lg text-white mb-4">Explore</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/featured-stories" className="text-womb-lightgrey hover:text-primary transition-colors story-link"><span>Featured Stories</span></Link>
                </li>
                <li>
                  <Link to="/recent-stories" className="text-womb-lightgrey hover:text-primary transition-colors story-link"><span>Recent Stories</span></Link>
                </li>
                <li>
                  <Link to="/resources" className="text-womb-lightgrey hover:text-primary transition-colors story-link"><span>Resources</span></Link>
                </li>
                <li>
                  <Link to="/support" className="text-womb-lightgrey hover:text-primary transition-colors story-link"><span>Support</span></Link>
                </li>
              </ul>
            </div>
            {/* Community */}
            <div>
              <h4 className="font-playfair font-semibold text-lg text-white mb-4">Community</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/guidelines" className="text-womb-lightgrey hover:text-primary transition-colors story-link"><span>Community Guidelines</span></Link>
                </li>
                <li>
                  <Link to="/about-us" className="text-womb-lightgrey hover:text-primary transition-colors story-link"><span>About Us</span></Link>
                </li>
                <li>
                  <Link to="/contact" className="text-womb-lightgrey hover:text-primary transition-colors story-link"><span>Contact</span></Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-womb-lightgrey hover:text-primary transition-colors story-link"><span>Privacy Policy</span></Link>
                </li>
                <li>
                  <Link to="/admin" className="text-womb-lightgrey hover:text-primary transition-colors story-link"><span>Admin</span></Link>
                </li>
              </ul>
            </div>
            {/* Connect */}
            <div>
              <h4 className="font-playfair font-semibold text-lg text-white mb-4">Stay Connected</h4>
              <p className="text-sm text-womb-lightgrey mb-4">Get the latest stories and updates in your inbox.</p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2 mb-6">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-womb-charcoal border-womb-charcoal text-womb-white placeholder-womb-lightgrey focus:border-womb-sapphire"
                  required
                />
                <Button type="submit" className="bg-gradient-to-r from-womb-sapphire to-womb-emerald hover:from-blue-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg shadow-blue-600/25 shrink-0">
                  <Mail className="w-4 h-4" />
                </Button>
              </form>
              <div className="flex space-x-4">
                <Link to="#" className="text-womb-lightgrey hover:text-white transition-colors"><Instagram className="w-6 h-6" /></Link>
                <Link to="#" className="text-womb-lightgrey hover:text-white transition-colors"><Twitter className="w-6 h-6" /></Link>
                <Link to="#" className="text-womb-lightgrey hover:text-white transition-colors"><Facebook className="w-6 h-6" /></Link>
                <Link to="#" className="text-womb-lightgrey hover:text-white transition-colors"><Youtube className="w-6 h-6" /></Link>
              </div>
            </div>
          </div>
          <div className="text-center text-xs text-womb-lightgrey pt-8 mt-8 border-t border-womb-charcoal">
            &copy; 2025 WombVerse. All rights reserved.
          </div>
        </div>
        <button
          onClick={scrollToTop}
          className="absolute bottom-4 right-4 md:bottom-8 md:right-8 bg-womb-emerald p-3 rounded-full text-white hover:bg-emerald-700/80 transition-colors shadow-lg hover:scale-110 transform"
          aria-label="Back to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      </footer>
    </div>
  );
};

export default Layout;
