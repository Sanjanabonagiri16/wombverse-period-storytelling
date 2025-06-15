import { Heart, MessageCircle, Calendar, User, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const FeaturedStories = () => {
  const [selectedStory, setSelectedStory] = useState<number | null>(null);

  const stories = [
    {
      id: 1,
      title: "The Day I Realized I Wasn't Broken",
      excerpt: "For years, I thought my painful periods were just something I had to endure. Then I learned about endometriosis and everything changed...",
      fullContent: "For years, I thought my painful periods were just something I had to endure. The cramping was so severe that I'd curl up in bed for days, missing school and later work. Everyone told me it was 'normal' - that women were supposed to suffer through their periods. But deep down, I knew something wasn't right.\n\nIt wasn't until I was 28 that I finally found a doctor who listened. After years of being dismissed, she ordered an ultrasound and discovered endometrial tissue growing outside my uterus. Endometriosis. Finally, I had a name for my pain.\n\nThe diagnosis was both devastating and liberating. Devastating because it meant years of unnecessary suffering, but liberating because it validated everything I had been feeling. I wasn't weak. I wasn't making it up. I had a real medical condition that deserved real treatment.\n\nNow, with proper medication and lifestyle changes, I'm managing my symptoms better than ever. More importantly, I'm sharing my story so other women don't have to suffer in silence like I did.",
      author: "Anonymous",
      date: "2 days ago",
      reactions: 47,
      comments: 12,
      tags: ["endometriosis", "pain", "diagnosis", "relief"],
      readTime: "4 min read"
    },
    {
      id: 2,
      title: "My First Period at Summer Camp",
      excerpt: "Picture this: 13-year-old me, white shorts, and the most embarrassing moment that taught me the most beautiful lesson about sisterhood...",
      fullContent: "Picture this: 13-year-old me, white shorts, and the most embarrassing moment that taught me the most beautiful lesson about sisterhood.\n\nIt was the third day of summer camp, and I was finally feeling confident. I'd made friends, conquered my fear of the rope climb, and was wearing my favorite white shorts. Then, during lunch, one of the older girls quietly approached me.\n\n'Hey,' she whispered, 'you might want to go to the bathroom and check yourself.'\n\nMy heart sank. I knew exactly what she meant. My first period had arrived at the worst possible moment, in the worst possible outfit, in front of everyone.\n\nI expected ridicule, but what happened next changed my perspective forever. The girl walked me to the bathroom, gave me a pad, and helped me tie her sweatshirt around my waist. Then she gathered a group of older campers who shared their own first period horror stories, each one more embarrassing than the last.\n\nBy the end of lunch, I was laughing instead of crying. These girls, who barely knew me, had created a circle of support and understanding. They taught me that periods aren't shameful - they're a shared experience that can bring women together.\n\nThat day, I learned that sisterhood isn't about blood relations. It's about women lifting each other up in moments of vulnerability.",
      author: "Sarah M.",
      date: "5 days ago",
      reactions: 89,
      comments: 23,
      tags: ["first-period", "embarrassing", "sisterhood", "growth"],
      readTime: "3 min read"
    },
    {
      id: 3,
      title: "Breaking the Silence in My Pakistani Family",
      excerpt: "Growing up in a traditional household where periods were whispered about, I decided to change the conversation for my younger sisters...",
      fullContent: "Growing up in a traditional household where periods were whispered about, I decided to change the conversation for my younger sisters.\n\nIn my family, periods were shrouded in secrecy and shame. When I got my first period at 12, my mother handed me a pad and told me to 'keep it clean and quiet.' No explanation, no celebration, just silence and secrecy.\n\nFor years, I struggled with questions I couldn't ask. Why did I feel so emotional? Why did my back hurt so much? Was it normal to have such heavy bleeding? The cultural taboo around discussing menstruation left me feeling isolated and confused.\n\nEverything changed when my youngest sister turned 11. I watched her approach puberty with the same fear and confusion I had experienced, and I knew I had to break the cycle.\n\nI started small - leaving period products in the bathroom, talking openly about my cycle, and answering her questions with honesty and warmth. When her period came, we celebrated with her favorite cake and had a real conversation about what to expect.\n\nThe transformation in our family has been remarkable. My mother, initially resistant, has started opening up about her own experiences. My sisters now come to me with questions they would never have asked before.\n\nChanging generational patterns isn't easy, but it starts with one person willing to speak up. I'm proud to be that person in my family, creating a new legacy of openness and support for the women who come after me.",
      author: "Fatima A.",
      date: "1 week ago",
      reactions: 156,
      comments: 34,
      tags: ["culture", "family", "tradition", "change"],
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "The Period That Changed My Career",
      excerpt: "How a particularly heavy period led me to discover my calling in menstrual health advocacy and helped thousands of other women...",
      fullContent: "How a particularly heavy period led me to discover my calling in menstrual health advocacy and helped thousands of other women.\n\nI was 25, working as a marketing executive, when I experienced the heaviest period of my life. I was changing super tampons every hour, feeling dizzy and weak, but I pushed through because I thought it was 'just a bad period.'\n\nOn the third day, I collapsed at work and was rushed to the hospital. My hemoglobin levels were dangerously low, and I needed an immediate blood transfusion. The doctor explained that I had been experiencing menorrhagia - abnormally heavy menstrual bleeding - and that many women suffer in silence because they don't know it's not normal.\n\nThat hospital stay changed my life. I realized how little I knew about my own body and how many other women were probably suffering in silence. I started researching, reading medical journals, and connecting with other women online.\n\nWithin a year, I had left my marketing job and enrolled in a public health program with a focus on women's reproductive health. I started a blog sharing evidence-based information about periods, which grew into a nonprofit organization.\n\nToday, our organization has helped over 50,000 women access proper menstrual health information and care. We've trained healthcare providers, created educational resources, and advocated for policy changes.\n\nThat terrifying period taught me that our bodies are trying to tell us something. When we listen and take action, we can not only heal ourselves but help heal others too.",
      author: "Dr. Maya Chen",
      date: "1 week ago",
      reactions: 203,
      comments: 45,
      tags: ["career", "advocacy", "heavy-periods", "purpose"],
      readTime: "5 min read"
    },
    {
      id: 5,
      title: "Periods and Mental Health: My Journey",
      excerpt: "The connection between my cycle and my anxiety was something no one talked about. Here's how I learned to track and manage both...",
      fullContent: "The connection between my cycle and my anxiety was something no one talked about. Here's how I learned to track and manage both.\n\nFor years, I thought I was going crazy. Every month, like clockwork, I would experience intense anxiety, mood swings, and depression. It would last for about a week, then mysteriously disappear. Doctors prescribed antidepressants, therapists suggested it was stress, but no one connected it to my menstrual cycle.\n\nIt wasn't until I started tracking my periods and moods simultaneously that the pattern became clear. My mental health symptoms aligned perfectly with my premenstrual phase. I was experiencing PMDD - Premenstrual Dysphoric Disorder.\n\nThe relief of having a name for what I was experiencing was immense, but the real work was just beginning. I learned that hormonal fluctuations can significantly impact neurotransmitters like serotonin and dopamine, explaining why I felt like a different person each month.\n\nI developed a comprehensive management strategy: tracking my cycle religiously, adjusting my work schedule during difficult weeks, practicing extra self-care during my premenstrual phase, and working with a reproductive psychiatrist to find the right treatment.\n\nThe transformation has been incredible. Instead of being blindsided by difficult emotions, I can prepare for them. I schedule lighter workloads during my PMDD week, plan extra support from friends and family, and practice additional mindfulness techniques.\n\nMost importantly, I've learned to extend compassion to myself during these difficult times. My period isn't just about physical symptoms - it's a whole-body experience that deserves understanding and care.",
      author: "Alex R.",
      date: "2 weeks ago",
      reactions: 124,
      comments: 28,
      tags: ["mental-health", "anxiety", "tracking", "self-care"],
      readTime: "7 min read"
    },
    {
      id: 6,
      title: "The Gift of Irregular Periods",
      excerpt: "PCOS made my periods unpredictable, but it also taught me to listen to my body in ways I never imagined possible...",
      fullContent: "PCOS made my periods unpredictable, but it also taught me to listen to my body in ways I never imagined possible.\n\nWhen I was diagnosed with Polycystic Ovary Syndrome at 19, I felt broken. My periods came every 3-6 months, if at all. While my friends complained about monthly cramps, I envied their predictability. I felt disconnected from my own body and femininity.\n\nThe irregular cycles made everything complicated - from planning vacations to intimacy with partners. I never knew when my period would show up, and when it did, it was often heavy and lasted for weeks.\n\nBut PCOS also became my greatest teacher. Because I couldn't rely on regular cycles, I learned to pay attention to other signals my body was sending. I noticed how different foods affected my energy, how stress impacted my skin, how sleep influenced my hormones.\n\nI became an expert on my own body in ways that women with regular cycles might never need to be. I learned about insulin resistance, inflammation, and the intricate dance of hormones. This knowledge helped me make lifestyle changes that improved not just my periods, but my overall health.\n\nThrough years of working with naturopaths, endocrinologists, and nutritionists, I developed a personalized approach to managing PCOS. My periods are still irregular, but they're more predictable now, and I've learned to work with my body rather than against it.\n\nPCOS taught me that there's no 'normal' when it comes to periods. Every woman's experience is unique, and that's not a flaw - it's a feature. My irregular periods led me to a deeper understanding of my body and better health overall.",
      author: "Jordan K.",
      date: "2 weeks ago",
      reactions: 67,
      comments: 19,
      tags: ["PCOS", "irregular", "body-awareness", "acceptance"],
      readTime: "4 min read"
    }
  ];

  const handleReadStory = (storyId: number) => {
    setSelectedStory(selectedStory === storyId ? null : storyId);
  };

  const handleCloseStory = () => {
    setSelectedStory(null);
  };

  return (
    <section className="py-8 md:py-16 bg-womb-charcoal min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-playfair font-bold text-womb-softwhite mb-4">
            Featured Stories
          </h2>
          <p className="text-base md:text-lg text-womb-warmgrey max-w-2xl mx-auto px-4">
            Real experiences from our community. Each story shared with courage, received with love.
          </p>
        </div>

        {/* Full Story Modal */}
        {selectedStory && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <Card className="w-full max-w-4xl max-h-[90vh] bg-womb-deepgrey border-womb-warmgrey/20 overflow-hidden">
              <CardContent className="p-0">
                <div className="sticky top-0 bg-womb-deepgrey border-b border-womb-warmgrey/20 p-4 md:p-6 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-womb-crimson to-womb-plum rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm md:text-base">
                        {stories.find(s => s.id === selectedStory)?.author.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div>
                      <p className="text-womb-softwhite font-medium text-sm md:text-base">
                        {stories.find(s => s.id === selectedStory)?.author}
                      </p>
                      <p className="text-womb-warmgrey text-xs md:text-sm">
                        {stories.find(s => s.id === selectedStory)?.date} • {stories.find(s => s.id === selectedStory)?.readTime}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCloseStory}
                    className="text-womb-warmgrey hover:text-womb-softwhite shrink-0"
                  >
                    ✕
                  </Button>
                </div>
                
                <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-4 md:p-6">
                  <div className="space-y-4 md:space-y-6">
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-playfair font-bold text-womb-softwhite leading-tight">
                      {stories.find(s => s.id === selectedStory)?.title}
                    </h1>
                    
                    <div className="flex flex-wrap gap-2">
                      {stories.find(s => s.id === selectedStory)?.tags.map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="secondary" 
                          className="bg-womb-plum/20 text-womb-plum border-womb-plum/30 text-xs"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="prose prose-invert max-w-none">
                      <div className="text-womb-softwhite whitespace-pre-wrap text-sm md:text-base leading-relaxed space-y-4">
                        {stories.find(s => s.id === selectedStory)?.fullContent.split('\n\n').map((paragraph, index) => (
                          <p key={index} className="mb-4">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-womb-deepgrey flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-womb-warmgrey">
                          <Heart className="w-5 h-5" />
                          <span className="font-medium">{stories.find(s => s.id === selectedStory)?.reactions}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-womb-warmgrey">
                          <MessageCircle className="w-5 h-5" />
                          <span className="font-medium">{stories.find(s => s.id === selectedStory)?.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {stories.map((story, index) => (
            <article 
              key={story.id} 
              className="story-card animate-fade-in cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Story Header - Mobile Optimized */}
              <div className="mb-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div className="flex items-center space-x-2 text-xs text-womb-warmgrey min-w-0 flex-1">
                    <User className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate font-medium">{story.author}</span>
                  </div>
                  <Badge variant="secondary" className="bg-womb-plum/20 text-womb-plum border-womb-plum/30 text-xs self-start">
                    {story.readTime}
                  </Badge>
                </div>
                <div className="flex items-center space-x-1 text-xs text-womb-warmgrey">
                  <Calendar className="w-3 h-3 flex-shrink-0" />
                  <span>{story.date}</span>
                </div>
              </div>

              {/* Story Title */}
              <h3 className="text-lg sm:text-xl font-playfair font-semibold text-womb-softwhite mb-3 line-clamp-2 hover:text-womb-crimson transition-colors leading-tight">
                {story.title}
              </h3>

              {/* Story Excerpt */}
              <p className="text-sm sm:text-base text-womb-warmgrey mb-4 line-clamp-3 leading-relaxed">
                {story.excerpt}
              </p>

              {/* Tags - Mobile Responsive */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1.5">
                  {story.tags.slice(0, 2).map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="secondary" 
                      className="bg-womb-deepgrey text-womb-warmgrey border-womb-deepgrey hover:border-womb-crimson hover:text-womb-crimson transition-colors text-xs px-2 py-1"
                    >
                      #{tag}
                    </Badge>
                  ))}
                  {story.tags.length > 2 && (
                    <Badge variant="secondary" className="bg-womb-deepgrey text-womb-warmgrey border-womb-deepgrey text-xs px-2 py-1">
                      +{story.tags.length - 2}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Story Footer - Enhanced Mobile Layout */}
              <div className="pt-4 border-t border-womb-deepgrey space-y-3">
                {/* Reactions and Comments - Mobile First */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="flex items-center space-x-1 text-xs sm:text-sm text-womb-warmgrey hover:text-womb-crimson transition-colors cursor-pointer">
                      <Heart className="w-4 h-4" />
                      <span className="font-medium">{story.reactions}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs sm:text-sm text-womb-warmgrey hover:text-womb-plum transition-colors cursor-pointer">
                      <MessageCircle className="w-4 h-4" />
                      <span className="font-medium">{story.comments}</span>
                    </div>
                  </div>
                </div>
                
                {/* Read Story Button - Fully Responsive and Functional */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleReadStory(story.id)}
                  className="text-womb-crimson hover:text-womb-crimson hover:bg-womb-crimson/10 w-full justify-center py-2.5 text-sm font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <BookOpen className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">
                    {selectedStory === story.id ? 'Close Story' : 'Read Story'}
                  </span>
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* View More Button - Responsive */}
        <div className="text-center mt-8 md:mt-12">
          <Button 
            variant="outline" 
            size="lg" 
            className="border-womb-plum text-womb-plum hover:bg-womb-plum hover:text-white w-full sm:w-auto px-6 py-3 transition-all duration-200 hover:scale-[1.02]"
          >
            <BookOpen className="w-5 h-5 mr-2 flex-shrink-0" />
            <span>Explore All Stories</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedStories;
