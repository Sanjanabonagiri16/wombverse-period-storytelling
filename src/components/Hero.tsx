import { PenTool, BookOpen, Heart, ChevronDown, Sparkles, Star, Zap } from 'lucide-react';
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
      {/* Enhanced Background with Animated Elements */}
      <div className="absolute inset-0">
        {/* Multi-layered gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-womb-crimson/20 via-transparent to-womb-plum/20"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-pink-500/10 via-transparent to-purple-500/10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent"></div>
        
        {/* Animated Decorative Elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-gradient-to-r from-womb-crimson/30 to-pink-500/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-gradient-to-r from-womb-plum/30 to-purple-500/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating Icons */}
        <div className="absolute top-20 right-1/4 animate-bounce opacity-30" style={{ animationDelay: '0.5s' }}>
          <Heart className="w-6 h-6 text-pink-400" />
        </div>
        <div className="absolute bottom-32 left-1/4 animate-bounce opacity-40" style={{ animationDelay: '1.5s' }}>
          <Star className="w-8 h-8 text-yellow-400" />
        </div>
        <div className="absolute top-1/3 right-20 animate-bounce opacity-35" style={{ animationDelay: '2.5s' }}>
          <Sparkles className="w-7 h-7 text-purple-400" />
        </div>
        <div className="absolute bottom-1/4 left-20 animate-bounce opacity-45" style={{ animationDelay: '3.5s' }}>
          <Zap className="w-5 h-5 text-cyan-400" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Enhanced Main heading with glow effect */}
          <div className="animate-fade-in mb-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-womb-crimson to-red-500 animate-pulse">
                Your Period.
              </span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-womb-plum to-indigo-500 animate-pulse" style={{ animationDelay: '0.5s' }}>
                Your Story.
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-500 animate-pulse" style={{ animationDelay: '1s' }}>
                Your Voice.
              </span>
            </h1>
          </div>
          
          {/* Enhanced Subtitle with gradient */}
          <div className="animate-fade-in mb-8" style={{ animationDelay: '0.3s' }}>
            <p className="text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-white to-slate-300">
                Join a community where period stories are shared, celebrated, and heard.
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 font-medium">
                Break the silence. Build connection. Belong.
              </span>
            </p>
          </div>
          
          {/* Enhanced Call to action buttons with advanced animations */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Link to="/auth">
              <Button size="lg" className="group relative overflow-hidden bg-gradient-to-r from-womb-crimson via-pink-500 to-red-500 hover:from-pink-600 hover:via-red-500 hover:to-womb-crimson text-white text-lg px-10 py-5 rounded-full transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-pink-500/40 border-2 border-pink-400/50">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <PenTool className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                <span className="relative z-10 font-semibold">Share Your Story</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </Button>
            </Link>
            <Link to="/stories" className="no-underline">
              <Button size="lg" className="group relative overflow-hidden bg-gradient-to-r from-womb-plum via-purple-500 to-indigo-500 hover:from-purple-600 hover:via-indigo-500 hover:to-womb-plum text-white text-lg px-10 py-5 rounded-full transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/40 border-2 border-purple-400/50">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <BookOpen className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                <span className="relative z-10 font-semibold">Explore Stories</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </Button>
            </Link>
          </div>
          
          {/* Enhanced Wisdom Section */}
          <div className="max-w-6xl mx-auto animate-fade-in" style={{ animationDelay: '0.9s' }}>
            <Button
              onClick={() => setShowMoreWisdom(!showMoreWisdom)}
              className="group relative overflow-hidden bg-gradient-to-r from-slate-800/80 via-slate-700/80 to-slate-800/80 hover:from-womb-crimson/80 hover:via-pink-500/80 hover:to-womb-crimson/80 text-white border-2 border-slate-600/50 hover:border-pink-400/50 mb-8 text-base px-8 py-4 rounded-full transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-pink-500/20 backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Heart className="w-5 h-5 mr-3 group-hover:scale-125 transition-transform duration-300 text-pink-400" />
              <span className="relative z-10 font-medium">
                {showMoreWisdom ? 'Hide Wisdom' : 'More Wisdom & Facts'}
              </span>
              <ChevronDown className={`w-5 h-5 ml-3 transition-all duration-500 ${showMoreWisdom ? 'rotate-180 text-pink-400' : 'text-purple-400'}`} />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </Button>

            {/* Enhanced Wisdom Content */}
            <div className={`transition-all duration-700 overflow-hidden ${showMoreWisdom ? 'opacity-100 max-h-none' : 'opacity-0 max-h-0'}`}>
              {showMoreWisdom && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedWisdom.map((quote, index) => (
                      <div
                        key={index}
                        className="group relative bg-gradient-to-br from-slate-800/60 via-slate-700/40 to-slate-800/60 backdrop-blur-lg rounded-2xl p-6 border border-slate-600/30 hover:border-gradient-to-r hover:from-pink-400/50 hover:to-purple-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden animate-fade-in"
                        style={{ 
                          animationDelay: `${index * 0.1}s`,
                          background: index % 3 === 0 ? 'linear-gradient(135deg, rgba(230,57,70,0.1), rgba(125,91,166,0.1))' :
                                     index % 3 === 1 ? 'linear-gradient(135deg, rgba(125,91,166,0.1), rgba(59,130,246,0.1))' :
                                     'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(236,72,153,0.1))'
                        }}
                      >
                        {/* Animated background gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                        
                        {quote.category && (
                          <div className="inline-block px-3 py-1 mb-3 text-xs font-bold rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-400/30 text-pink-300 relative z-10">
                            {quote.category}
                          </div>
                        )}
                        <blockquote className="text-white text-sm md:text-base mb-3 leading-relaxed italic font-medium relative z-10 group-hover:text-pink-100 transition-colors duration-300">
                          "{quote.text}"
                        </blockquote>
                        <cite className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 text-sm font-bold relative z-10">
                          — {quote.author}
                        </cite>
                      </div>
                    ))}
                  </div>
                  
                  {/* Enhanced Load More Button */}
                  {hasMoreWisdom && (
                    <div className="text-center pt-6">
                      <Button
                        onClick={loadMoreWisdom}
                        className="group relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 hover:from-pink-500 hover:via-purple-500 hover:to-cyan-500 text-white px-8 py-3 rounded-full transition-all duration-500 hover:scale-110 hover:shadow-xl hover:shadow-purple-500/30 border border-purple-400/50"
                      >
                        <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                        <span className="font-medium">Load More Wisdom</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      </Button>
                    </div>
                  )}
                  
                  <div className="text-center pt-6">
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 text-base font-medium px-4">
                      💫 Share your own wisdom and inspire others in our community 💫
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
