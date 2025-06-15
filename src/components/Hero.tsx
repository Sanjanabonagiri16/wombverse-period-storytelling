
import { PenTool, BookOpen, Heart, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Hero = () => {
  const [showMoreWisdom, setShowMoreWisdom] = useState(false);

  const wisdomQuotes = [
    {
      text: "Your period is not a weakness, it's a superpower that connects you to the rhythm of life.",
      author: "Maya, 24"
    },
    {
      text: "Every month, our bodies remind us of our incredible capacity for renewal and strength.",
      author: "Sarah, 28"
    },
    {
      text: "Periods taught me to listen to my body and honor its natural cycles.",
      author: "Priya, 22"
    },
    {
      text: "There's nothing shameful about something so natural and powerful.",
      author: "Emma, 26"
    },
    {
      text: "My period is my monthly reminder that my body is capable of amazing things.",
      author: "Zara, 30"
    },
    {
      text: "Normalizing period talk starts with us - one conversation at a time.",
      author: "Lisa, 25"
    },
    {
      text: "I learned to track my cycle not to control it, but to understand and embrace it.",
      author: "Aisha, 27"
    },
    {
      text: "The shame around periods is learned - and what's learned can be unlearned.",
      author: "Rosa, 29"
    },
    {
      text: "My period pain is valid, my experience matters, and I deserve support.",
      author: "Jade, 23"
    },
    {
      text: "Periods are a sign of health, strength, and the incredible power of the female body.",
      author: "Nina, 31"
    }
  ];

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto mb-12">
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

          {/* More Wisdom Section */}
          <div className="max-w-4xl mx-auto">
            <Button
              onClick={() => setShowMoreWisdom(!showMoreWisdom)}
              variant="ghost"
              className="text-womb-softwhite hover:text-womb-crimson hover:bg-womb-deepgrey/50 mb-8 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto transition-all duration-300 border border-womb-deepgrey hover:border-womb-crimson/50"
            >
              <Heart className="w-5 h-5 mr-2" />
              {showMoreWisdom ? 'Hide Wisdom' : 'More Wisdom'}
              <ChevronDown className={`w-5 h-5 ml-2 transition-transform duration-300 ${showMoreWisdom ? 'rotate-180' : ''}`} />
            </Button>

            {/* Wisdom Content */}
            <div className={`transition-all duration-500 ${showMoreWisdom ? 'opacity-100 max-h-none' : 'opacity-0 max-h-0 overflow-hidden'}`}>
              {showMoreWisdom && (
                <div className="animate-fade-in space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {wisdomQuotes.map((quote, index) => (
                      <div
                        key={index}
                        className="bg-womb-deepgrey/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-womb-deepgrey hover:border-womb-crimson/40 transition-all duration-300 hover:shadow-lg hover:shadow-womb-crimson/10"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <blockquote className="text-womb-softwhite text-sm sm:text-base mb-3 leading-relaxed italic font-medium">
                          "{quote.text}"
                        </blockquote>
                        <cite className="text-womb-crimson text-xs sm:text-sm font-semibold">
                          — {quote.author}
                        </cite>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center pt-6">
                    <p className="text-womb-warmgrey text-sm sm:text-base font-medium">
                      Share your own wisdom and inspire others in our community 💫
                    </p>
                  </div>
                </div>
              )}
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
