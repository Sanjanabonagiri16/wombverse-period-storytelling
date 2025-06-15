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
      {/* Professional Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900/80 to-slate-800"></div>
        <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-gradient-to-r from-indigo-600/20 to-slate-700/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-gradient-to-r from-red-500/20 to-indigo-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-10 left-1/4 w-14 h-14 bg-gradient-to-br from-red-500/25 to-indigo-600/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-16 right-1/4 animate-float opacity-20" style={{ animationDelay: '1s' }}>
          <Heart className="w-8 h-8 text-red-400" />
        </div>
        <div className="absolute bottom-32 left-1/4 animate-float opacity-15" style={{ animationDelay: '3s' }}>
          <Star className="w-6 h-6 text-indigo-400" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in mb-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-extrabold leading-tight">
              <span className="text-white drop-shadow-md">
                Your Period.
              </span>{' '}
              <span className="bg-gradient-to-r from-red-500 via-indigo-600 to-red-400 bg-clip-text text-transparent drop-shadow-lg">
                Your Story.
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-red-500 to-indigo-600 bg-clip-text text-transparent drop-shadow-md">
                Your Voice.
              </span>
            </h1>
          </div>
          
          <div className="animate-fade-in mb-12" style={{ animationDelay: '0.3s' }}>
            <p className="text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto text-gray-300">
              Join a community where period stories are shared, celebrated, and heard.
              <br />
              <span className="text-red-400 font-semibold font-inter tracking-wide">
                Break the silence. Build connection. Belong.
              </span>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Link to="/auth">
              <Button size="lg" className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-lg px-12 py-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-red-500/25">
                <PenTool className="w-6 h-6 mr-3 group-hover:rotate-6 transition-transform duration-300" />
                <span className="font-semibold">Share Your Story</span>
              </Button>
            </Link>
            <Link to="/stories">
              <Button size="lg" variant="outline" className="group border-2 border-red-400 text-red-400 hover:bg-red-400 hover:text-white text-lg px-12 py-6 rounded-lg transition-all duration-300 hover:scale-105">
                <BookOpen className="w-6 h-6 mr-3 group-hover:rotate-6 transition-transform duration-300" />
                <span className="font-semibold">Explore Stories</span>
              </Button>
            </Link>
          </div>
          
          <div className="max-w-6xl mx-auto animate-fade-in" style={{ animationDelay: '0.9s' }}>
            <Button
              onClick={() => setShowMoreWisdom(!showMoreWisdom)}
              className="group bg-slate-800/80 hover:bg-red-900/40 text-white border border-slate-600 hover:border-red-400 mb-8 text-base px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            >
              <Heart className="w-5 h-5 mr-3 text-red-400" />
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
                        className="group bg-slate-800/60 backdrop-blur-lg rounded-xl p-6 border border-slate-700 hover:border-red-400/50 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {quote.category && (
                          <div className="inline-block px-3 py-1 mb-3 text-xs font-semibold rounded-full bg-red-500/20 border border-red-400/30 text-red-300">
                            {quote.category}
                          </div>
                        )}
                        <blockquote className="text-gray-300 text-sm md:text-base mb-3 leading-relaxed italic">
                          "{quote.text}"
                        </blockquote>
                        <cite className="text-red-400 text-sm font-semibold">
                          — {quote.author}
                        </cite>
                      </div>
                    ))}
                  </div>
                  
                  {hasMoreWisdom && (
                    <div className="text-center pt-6">
                      <Button
                        onClick={loadMoreWisdom}
                        className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105"
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
