
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

      {/* Clean Professional Footer */}
      <footer className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 border-t border-slate-700">
        {/* Subtle background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20"></div>
        </div>

        <div className="container mx-auto px-4 py-12 relative z-10">
          {/* Newsletter Section */}
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-playfair font-bold text-white mb-4">
              Stay Connected with WombVerse
            </h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Get period wisdom, community updates, and inspiring stories delivered to your inbox
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:border-blue-400"
                required
              />
              <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105">
                Subscribe
              </Button>
            </form>
          </div>

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand Section */}
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-playfair font-bold text-white">
                  WombVerse
                </h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                A safe, supportive space where period stories are shared, celebrated, and heard. 
                Breaking the silence, building connection, creating belonging.
              </p>
              {/* Social Media Links */}
              <div className="flex space-x-4">
                {[
                  { icon: Instagram, href: "#", color: "hover:text-pink-400" },
                  { icon: Twitter, href: "#", color: "hover:text-blue-400" },
                  { icon: Facebook, href: "#", color: "hover:text-blue-500" },
                  { icon: Youtube, href: "#", color: "hover:text-red-400" }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`text-gray-400 ${social.color} transition-colors duration-300 hover:scale-125 transform`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-white mb-4 text-lg font-playfair">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                {[
                  { name: "Stories", href: "/stories" },
                  { name: "Community", href: "/community" },
                  { name: "Whispers", href: "/whispers" },
                  { name: "Share Your Story", href: "/create-story" }
                ].map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.href} 
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Section */}
            <div>
              <h4 className="font-bold text-white mb-4 text-lg font-playfair">Contact</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2 text-gray-400">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>hello@wombverse.com</span>
                </div>
                <p className="text-gray-400 text-sm">
                  We're here to support you on your journey.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-sm text-gray-400">
                &copy; 2025 WombVerse. Made with{' '}
                <Heart className="inline w-4 h-4 text-red-400" />{' '}
                for the menstrual community.
              </p>
            </div>
            
            <Button
              onClick={scrollToTop}
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full p-2 transition-all duration-300 hover:scale-110"
            >
              <ChevronUp className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
