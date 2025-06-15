import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import FeaturedStories from '@/components/FeaturedStories';
import CommunityHighlights from '@/components/CommunityHighlights';
import Chatbot from '@/components/Chatbot';

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Professional Red Gradient Background for Home */}
      <div className="fixed inset-0 z-0">
        {/* Deep, layered gradients with red professional accents */}
        <div className="absolute inset-0 bg-gradient-to-br from-womb-charcoal via-womb-plum/70 to-womb-crimson/10"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-red-900/30 via-transparent to-womb-charcoal"></div>
        {/* Accent gradients */}
        <div className="absolute top-0 left-0 w-full h-56 bg-gradient-to-b from-womb-crimson/20 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-72 bg-gradient-to-t from-womb-plum/15 via-womb-crimson/5 to-transparent"></div>
        {/* Animated color orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-red-500/25 to-womb-plum/20 rounded-full blur-3xl animate-pulse opacity-60"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-womb-crimson/30 to-pink-400/20 rounded-full blur-3xl animate-pulse opacity-50" style={{ animationDelay: '1s' }}></div>
        {/* Mesh pattern overlay for extra polish */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-womb-crimson/10 via-transparent to-womb-plum/10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-400/7 to-transparent"></div>
        </div>
      </div>
      {/* Main content with enhanced z-index */}
      <div className="relative z-10">
        <Layout>
          <Hero />
          <FeaturedStories />
          <CommunityHighlights />
        </Layout>
        <Chatbot />
      </div>
    </div>
  );
};

export default Index;
