
import { useState } from 'react';
import { Search, Menu, X, Heart, BookOpen, User, PenTool } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                WombVerse
              </h1>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-womb-warmgrey w-4 h-4" />
                <Input
                  placeholder="Search stories, tags, or emotions..."
                  className="pl-10 bg-womb-deepgrey border-womb-deepgrey text-womb-softwhite placeholder-womb-warmgrey focus:border-womb-crimson"
                />
              </div>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-womb-softwhite hover:text-womb-crimson transition-colors">
                Explore
              </a>
              <a href="#" className="text-womb-softwhite hover:text-womb-crimson transition-colors">
                Community
              </a>
              <Button className="btn-primary">
                <PenTool className="w-4 h-4 mr-2" />
                Share Story
              </Button>
              <Button 
                variant="ghost" 
                className="text-womb-softwhite hover:text-womb-crimson hover:bg-womb-deepgrey"
                onClick={() => window.location.href = '/auth'}
              >
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Button>
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
              <a href="#" className="block text-womb-softwhite hover:text-womb-crimson transition-colors">
                Explore Stories
              </a>
              <a href="#" className="block text-womb-softwhite hover:text-womb-crimson transition-colors">
                Community Wall
              </a>
              <div className="pt-4 border-t border-womb-deepgrey space-y-2">
                <Button className="w-full btn-primary">
                  <PenTool className="w-4 h-4 mr-2" />
                  Share Your Story
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-womb-plum text-womb-plum hover:bg-womb-plum hover:text-white"
                  onClick={() => window.location.href = '/auth'}
                >
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-womb-deepgrey border-t border-womb-deepgrey mt-16">
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
                <li><a href="#" className="hover:text-womb-crimson transition-colors">Featured Stories</a></li>
                <li><a href="#" className="hover:text-womb-crimson transition-colors">Recent Stories</a></li>
                <li><a href="#" className="hover:text-womb-crimson transition-colors">Popular Tags</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-womb-softwhite mb-3">Community</h4>
              <ul className="space-y-2 text-sm text-womb-warmgrey">
                <li><a href="#" className="hover:text-womb-crimson transition-colors">Guidelines</a></li>
                <li><a href="#" className="hover:text-womb-crimson transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-womb-crimson transition-colors">Resources</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-womb-softwhite mb-3">Connect</h4>
              <ul className="space-y-2 text-sm text-womb-warmgrey">
                <li><a href="#" className="hover:text-womb-crimson transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-womb-crimson transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-womb-crimson transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-womb-deepgrey mt-8 pt-8 text-center text-sm text-womb-warmgrey">
            <p>&copy; 2024 WombVerse. Made with ❤️ for the menstrual community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
