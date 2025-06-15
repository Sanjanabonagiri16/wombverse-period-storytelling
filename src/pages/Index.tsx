
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import FeaturedStories from '@/components/FeaturedStories';
import CommunityHighlights from '@/components/CommunityHighlights';

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Primary Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-womb-charcoal via-slate-900 to-womb-deepgrey"></div>
        
        {/* Animated Color Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-womb-crimson/30 to-pink-500/30 rounded-full blur-3xl animate-pulse opacity-60"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-womb-plum/40 to-purple-500/40 rounded-full blur-3xl animate-pulse opacity-50" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl animate-pulse opacity-40" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating Particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-womb-crimson rounded-full animate-bounce opacity-70" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-womb-plum rounded-full animate-bounce opacity-60" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce opacity-80" style={{ animationDelay: '2.5s' }}></div>
        <div className="absolute bottom-20 right-20 w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce opacity-50" style={{ animationDelay: '3s' }}></div>
      </div>
      
      {/* Content with enhanced z-index */}
      <div className="relative z-10">
        <Layout>
          <Hero />
          <FeaturedStories />
          <CommunityHighlights />
        </Layout>
      </div>
    </div>
  );
};

export default Index;
