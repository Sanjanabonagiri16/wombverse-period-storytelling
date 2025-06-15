
import { useState } from 'react';
import { Search, Menu, X, Heart, PenTool, User, LogOut, Book, MessageSquare, Users, Sparkles, Home, Mail, Phone, MapPin, Instagram, Twitter, Facebook, Youtube, ChevronUp } from 'lucide-react';
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

      {/* Enhanced Footer */}
      <footer className="relative bg-gradient-to-br from-womb-deepgrey via-slate-900 to-womb-charcoal border-t border-womb-deepgrey overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-womb-crimson/10 to-pink-500/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-womb-plum/10 to-purple-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-r from-blue-400/5 to-cyan-400/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-4 py-12 relative z-10">
          {/* Newsletter Section */}
          <div className="text-center mb-12 animate-fade-in">
            <h3 className="text-2xl md:text-3xl font-playfair font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-womb-crimson to-purple-500 mb-4">
              Stay Connected with WombVerse 💫
            </h3>
            <p className="text-womb-warmgrey mb-6 max-w-md mx-auto">
              Get period wisdom, community updates, and inspiring stories delivered to your inbox
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 bg-womb-charcoal border-womb-plum/30 text-womb-softwhite placeholder-womb-warmgrey focus:border-womb-crimson"
                required
              />
              <Button type="submit" className="bg-gradient-to-r from-womb-crimson to-womb-plum hover:from-womb-crimson/80 hover:to-womb-plum/80 text-white font-medium px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105">
                Subscribe ✨
              </Button>
            </form>
          </div>

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="animate-fade-in">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-womb-crimson to-womb-plum rounded-full flex items-center justify-center animate-pulse">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-playfair font-bold text-transparent bg-clip-text bg-gradient-to-r from-womb-crimson to-womb-plum">
                  WombVerse
                </h3>
              </div>
              <p className="text-womb-warmgrey text-sm leading-relaxed mb-6">
                A safe, supportive space where period stories are shared, celebrated, and heard. 
                Breaking the silence, building connection, creating belonging. 🌙
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
                    className={`text-womb-warmgrey ${social.color} transition-colors duration-300 hover:scale-125 transform`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Explore Section */}
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <h4 className="font-bold text-womb-softwhite mb-4 text-lg font-playfair">Explore</h4>
              <ul className="space-y-3 text-sm">
                {[
                  { name: "Featured Stories", href: "/featured-stories" },
                  { name: "Recent Stories", href: "/recent-stories" },
                  { name: "Popular Tags", href: "/popular-tags" },
                  { name: "Mood Stories", href: "/mood-stories" },
                  { name: "Community Wall", href: "/community" }
                ].map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.href} 
                      className="text-womb-warmgrey hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-womb-crimson hover:to-womb-plum transition-all duration-300 hover:translate-x-1 transform inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Community Section */}
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h4 className="font-bold text-womb-softwhite mb-4 text-lg font-playfair">Community</h4>
              <ul className="space-y-3 text-sm">
                {[
                  { name: "Community Guidelines", href: "/guidelines" },
                  { name: "Support & Resources", href: "/support" },
                  { name: "Crisis Support", href: "/resources" },
                  { name: "Period Education", href: "/education" },
                  { name: "Share Your Story", href: "/create-story" }
                ].map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.href} 
                      className="text-womb-warmgrey hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-womb-plum hover:to-purple-400 transition-all duration-300 hover:translate-x-1 transform inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Section */}
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <h4 className="font-bold text-womb-softwhite mb-4 text-lg font-playfair">Connect</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2 text-womb-warmgrey">
                  <Mail className="w-4 h-4 text-womb-crimson" />
                  <span>hello@wombverse.com</span>
                </div>
                <div className="flex items-center space-x-2 text-womb-warmgrey">
                  <Phone className="w-4 h-4 text-womb-plum" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2 text-womb-warmgrey">
                  <MapPin className="w-4 h-4 text-pink-400" />
                  <span>Global Community</span>
                </div>
              </div>
              <ul className="space-y-2 text-sm mt-4">
                {[
                  { name: "About Us", href: "/about-us" },
                  { name: "Contact", href: "/contact" },
                  { name: "Privacy Policy", href: "/privacy" },
                  { name: "Terms of Service", href: "/terms" }
                ].map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.href} 
                      className="text-womb-warmgrey hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 hover:translate-x-1 transform inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gradient-to-r from-womb-deepgrey via-womb-plum/20 to-womb-deepgrey pt-8 flex flex-col md:flex-row justify-between items-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-sm text-womb-warmgrey mb-2">
                &copy; 2025 WombVerse. Made with{' '}
                <Heart className="inline w-4 h-4 text-womb-crimson animate-pulse" />{' '}
                for the menstrual community.
              </p>
              <p className="text-xs text-womb-warmgrey/60">
                Breaking period taboos, one story at a time. 🌸
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => window.location.href = '/admin'}
                className="text-xs text-womb-warmgrey/30 hover:text-womb-crimson transition-colors"
              >
                Admin Access
              </button>
              <Button
                onClick={scrollToTop}
                size="sm"
                className="bg-gradient-to-r from-womb-plum to-purple-500 hover:from-purple-500 hover:to-womb-plum text-white rounded-full p-2 transition-all duration-300 hover:scale-110"
              >
                <ChevronUp className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
