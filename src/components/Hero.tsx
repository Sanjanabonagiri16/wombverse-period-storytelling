import { PenTool, BookOpen, Heart, ChevronDown } from 'lucide-react';
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
          
          {/* More Wisdom Section - Enhanced and Responsive */}
          <div className="max-w-6xl mx-auto">
            <Button
              onClick={() => setShowMoreWisdom(!showMoreWisdom)}
              variant="ghost"
              className="text-womb-softwhite hover:text-womb-crimson hover:bg-womb-deepgrey/50 mb-8 text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 w-full sm:w-auto transition-all duration-300 border border-womb-deepgrey hover:border-womb-crimson/50 rounded-lg"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              {showMoreWisdom ? 'Hide Wisdom' : 'More Wisdom & Facts'}
              <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 ml-2 transition-transform duration-300 ${showMoreWisdom ? 'rotate-180' : ''}`} />
            </Button>

            {/* Wisdom Content - Fully Responsive */}
            <div className={`transition-all duration-500 overflow-hidden ${showMoreWisdom ? 'opacity-100 max-h-none' : 'opacity-0 max-h-0'}`}>
              {showMoreWisdom && (
                <div className="animate-fade-in space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                    {displayedWisdom.map((quote, index) => (
                      <div
                        key={index}
                        className="bg-womb-deepgrey/60 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-6 border border-womb-deepgrey hover:border-womb-crimson/40 transition-all duration-300 hover:shadow-lg hover:shadow-womb-crimson/10 hover:scale-105"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        {quote.category && (
                          <div className="inline-block px-2 sm:px-3 py-1 mb-2 sm:mb-3 text-xs font-semibold text-womb-crimson bg-womb-crimson/10 rounded-full border border-womb-crimson/20">
                            {quote.category}
                          </div>
                        )}
                        <blockquote className="text-womb-softwhite text-xs sm:text-sm md:text-base mb-2 sm:mb-3 leading-relaxed italic font-medium">
                          "{quote.text}"
                        </blockquote>
                        <cite className="text-womb-crimson text-xs sm:text-sm font-semibold">
                          — {quote.author}
                        </cite>
                      </div>
                    ))}
                  </div>
                  
                  {/* Load More Button */}
                  {hasMoreWisdom && (
                    <div className="text-center pt-4 sm:pt-6">
                      <Button
                        onClick={loadMoreWisdom}
                        variant="outline"
                        className="border-womb-plum text-womb-plum hover:bg-womb-plum hover:text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 transition-all duration-300"
                      >
                        Load More Wisdom ✨
                      </Button>
                    </div>
                  )}
                  
                  <div className="text-center pt-4 sm:pt-6">
                    <p className="text-womb-warmgrey text-xs sm:text-sm md:text-base font-medium px-4">
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
