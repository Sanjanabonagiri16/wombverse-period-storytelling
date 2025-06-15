import { PenTool, BookOpen, Heart, ChevronDown, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Hero = () => {
  const [showMoreWisdom, setShowMoreWisdom] = useState(false);
  const [loadedWisdomCount, setLoadedWisdomCount] = useState(10);

  const allWisdomQuotes = [
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
    },
    {
      text: "Did you know that period blood is actually cleaner than regular blood?",
      author: "Dr. Kim, Medical Expert",
      category: "Myth Buster"
    },
    {
      text: "Cramps are caused by your uterus contracting to shed its lining - it's working hard!",
      author: "Health Educator Sarah",
      category: "Body Facts"
    },
    {
      text: "Tracking your cycle can help you understand your energy patterns and mood changes.",
      author: "Wellness Coach Alex",
      category: "Self-Care Tip"
    },
    {
      text: "Your menstrual cycle is unique to you - don't compare it to others.",
      author: "Therapist Maria",
      category: "Self-Love"
    },
    {
      text: "Hot water bottles and gentle yoga can be your period's best friends.",
      author: "Yoga Instructor Leah",
      category: "Comfort Tips"
    },
    {
      text: "It's okay to cancel plans when your period needs you to rest and recharge.",
      author: "Self-Care Advocate Sam",
      category: "Permission to Rest"
    },
    {
      text: "Menstrual cups can be worn for up to 12 hours - they're eco-friendly and cost-effective!",
      author: "Environmental Health Advocate",
      category: "Eco Tips"
    },
    {
      text: "Dark chocolate can actually help reduce period cramps due to its magnesium content.",
      author: "Nutritionist Kelly",
      category: "Nutrition Facts"
    },
    {
      text: "Exercise during your period can help reduce cramps and boost your mood naturally.",
      author: "Fitness Coach Sam",
      category: "Wellness Tips"
    },
    {
      text: "Your period doesn't make you 'emotional' - it makes you more in tune with your feelings.",
      author: "Therapist Jordan",
      category: "Mental Health"
    },
    {
      text: "Periods have been happening for millions of years - you're part of an ancient sisterhood.",
      author: "Anthropologist Dr. Chen",
      category: "Historical Facts"
    },
    {
      text: "The average woman will have around 400 periods in her lifetime - that's a lot of strength!",
      author: "Medical Researcher",
      category: "Body Facts"
    },
    {
      text: "Your first period is called menarche - it's a celebration, not a burden.",
      author: "Health Educator",
      category: "Educational"
    },
    {
      text: "Period poverty affects millions - talking openly helps break the stigma.",
      author: "Social Activist Maria",
      category: "Social Awareness"
    },
    {
      text: "Iron-rich foods during your period can help combat fatigue and weakness.",
      author: "Nutritionist Dr. Patel",
      category: "Nutrition Facts"
    },
    {
      text: "Your cervix changes position during your cycle - your body is constantly adapting.",
      author: "Gynecologist Dr. Williams",
      category: "Body Facts"
    },
    {
      text: "Meditation and mindfulness can significantly reduce period-related anxiety.",
      author: "Mindfulness Coach Lisa",
      category: "Mental Health"
    },
    {
      text: "Period tracking apps aren't just for pregnancy - they're tools for self-awareness.",
      author: "Tech Health Advocate",
      category: "Technology Tips"
    },
    {
      text: "Every culture has period taboos - challenging them makes space for future generations.",
      author: "Cultural Researcher",
      category: "Social Change"
    },
    {
      text: "Your period can actually boost creativity - hormonal changes enhance right-brain activity.",
      author: "Neuroscientist Dr. Park",
      category: "Science Facts"
    }
  ];

  const displayedWisdom = allWisdomQuotes.slice(0, loadedWisdomCount);
  const hasMoreWisdom = loadedWisdomCount < allWisdomQuotes.length;

  const loadMoreWisdom = () => {
    setLoadedWisdomCount(prev => Math.min(prev + 10, allWisdomQuotes.length));
  };

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Enhanced Professional Background with Dark Colors */}
      <div className="absolute inset-0 bg-womb-black/50"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-womb-maroon/30 via-womb-black/50 to-womb-indigo/20"></div>
      <div className="absolute top-1/4 left-1/3 w-48 h-48 bg-gradient-to-r from-womb-indigo/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-gradient-to-r from-womb-maroon/25 to-womb-indigo/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-10 left-1/4 w-14 h-14 bg-gradient-to-br from-womb-maroon/25 to-womb-indigo/20 rounded-full blur-2xl animate-float"></div>
      <div className="absolute top-16 right-1/4 animate-float opacity-20" style={{ animationDelay: '1s' }}>
        <Heart className="w-8 h-8 text-womb-maroon" />
      </div>
      <div className="absolute bottom-32 left-1/4 animate-float opacity-15" style={{ animationDelay: '3s' }}>
        <Star className="w-6 h-6 text-womb-indigo" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-extrabold leading-tight">
              <span className="block animate-slide-in-up opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '0.1s' }}>
                <span className="text-white drop-shadow-md">
                  Your Period.
                </span>
              </span>
              <span className="block animate-slide-in-up opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '0.25s' }}>
                <span className="bg-gradient-to-r from-womb-indigo via-womb-maroon to-womb-indigo bg-clip-text text-transparent drop-shadow-lg">
                  Your Story.
                </span>
              </span>
              <span className="block animate-slide-in-up opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '0.4s' }}>
                <span className="bg-gradient-to-r from-womb-maroon via-womb-indigo to-womb-maroon bg-clip-text text-transparent drop-shadow-md">
                  Your Voice.
                </span>
              </span>
            </h1>
          </div>
          
          <div className="animate-fade-in opacity-0 mb-12" style={{ animationFillMode: 'forwards', animationDelay: '0.6s' }}>
            <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto text-womb-lightgrey">
              Join a community where period stories are shared, celebrated, and heard.
              <br />
              <span className="block mt-4 text-2xl md:text-3xl font-bold font-inter tracking-wider text-womb-indigo drop-shadow-[0_2px_4px_rgba(79,70,229,0.4)]">
                Break the silence. Build connection. Belong.
              </span>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fade-in opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '0.8s' }}>
            <Link to="/auth">
              <Button size="lg" className="group bg-gradient-to-r from-womb-indigo to-womb-maroon hover:from-indigo-700 hover:to-red-900 text-white text-lg px-12 py-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-indigo-600/25 hover-glow">
                <PenTool className="w-6 h-6 mr-3 group-hover:rotate-6 transition-transform duration-300" />
                <span className="font-semibold">Share Your Story</span>
              </Button>
            </Link>
            <Link to="/stories">
              <Button size="lg" variant="outline" className="group border-2 border-womb-maroon text-womb-maroon hover:bg-womb-maroon hover:text-white text-lg px-12 py-6 rounded-lg transition-all duration-300 hover-lift">
                <BookOpen className="w-6 h-6 mr-3 group-hover:rotate-6 transition-transform duration-300" />
                <span className="font-semibold">Explore Stories</span>
              </Button>
            </Link>
          </div>
          
          <div className="max-w-6xl mx-auto animate-fade-in opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '1s' }}>
            <Button
              onClick={() => setShowMoreWisdom(!showMoreWisdom)}
              className="group bg-womb-darkgrey/80 hover:bg-womb-maroon/40 text-white border border-womb-mediumgrey hover:border-womb-maroon mb-8 text-base px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            >
              <Heart className="w-5 h-5 mr-3 text-womb-maroon" />
              <span className="font-medium">
                {showMoreWisdom ? 'Hide Community Wisdom' : 'Discover Community Wisdom'}
              </span>
              <ChevronDown className={`w-5 h-5 ml-3 transition-transform duration-300 ${showMoreWisdom ? 'rotate-180' : ''}`} />
            </Button>

            <div className={`transition-all duration-500 overflow-hidden ${showMoreWisdom ? 'opacity-100 max-h-none' : 'opacity-0 max-h-0'}`}>
              {showMoreWisdom && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedWisdom.map((quote, index) => (
                      <div
                        key={index}
                        className="group bg-womb-darkgrey/60 backdrop-blur-lg rounded-xl p-6 border border-womb-mediumgrey hover:border-womb-maroon/50 transition-all duration-300 animate-slide-in-up hover-lift opacity-0"
                        style={{ animationFillMode: 'forwards', animationDelay: `${1.2 + index * 0.08}s` }}
                      >
                        {quote.category && (
                          <div className="inline-block px-3 py-1 mb-3 text-xs font-semibold rounded-full bg-womb-maroon/20 border border-womb-maroon/30 text-womb-maroon">
                            {quote.category}
                          </div>
                        )}
                        <blockquote className="text-womb-lightgrey text-sm md:text-base mb-3 leading-relaxed italic">
                          "{quote.text}"
                        </blockquote>
                        <cite className="text-womb-indigo text-sm font-semibold">
                          — {quote.author}
                        </cite>
                      </div>
                    ))}
                  </div>
                  
                  {hasMoreWisdom && (
                    <div className="text-center pt-6">
                      <Button
                        onClick={loadMoreWisdom}
                        className="bg-gradient-to-r from-womb-indigo to-womb-maroon hover:from-indigo-700 hover:to-red-900 text-white px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        <span className="font-medium">Load More Wisdom</span>
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
