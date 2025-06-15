
import { PenTool, BookOpen, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-womb-crimson/10 via-transparent to-womb-plum/10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-womb-softwhite mb-6 leading-tight">
            Your Period.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-womb-crimson to-womb-plum">
              Your Story.
            </span>
            <br />
            Your Voice.
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-womb-warmgrey mb-8 max-w-2xl mx-auto leading-relaxed">
            Join a community where period stories are shared, celebrated, and heard. 
            Break the silence. Build connection. Belong.
          </p>
          
          {/* Call to action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/auth">
              <Button size="lg" className="btn-primary text-lg px-8 py-4 animate-scale-in">
                <PenTool className="w-5 h-5 mr-2" />
                Share Your Story
              </Button>
            </Link>
            <Link to="/stories">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-womb-plum text-womb-plum hover:bg-womb-plum hover:text-white animate-scale-in">
                <BookOpen className="w-5 h-5 mr-2" />
                Explore Stories
              </Button>
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center animate-fade-in">
              <div className="text-3xl font-playfair font-bold text-womb-crimson mb-2">1,247</div>
              <div className="text-womb-warmgrey">Stories Shared</div>
            </div>
            <div className="text-center animate-fade-in">
              <div className="text-3xl font-playfair font-bold text-womb-plum mb-2">8,392</div>
              <div className="text-womb-warmgrey">Supportive Hearts</div>
            </div>
            <div className="text-center animate-fade-in">
              <div className="text-3xl font-playfair font-bold text-womb-crimson mb-2">Safe</div>
              <div className="text-womb-warmgrey">Space Always</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 bg-womb-crimson/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-womb-plum/10 rounded-full blur-xl"></div>
    </section>
  );
};

export default Hero;
