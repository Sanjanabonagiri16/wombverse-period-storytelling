
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import FeaturedStories from '@/components/FeaturedStories';
import CommunityHighlights from '@/components/CommunityHighlights';
import Chatbot from '@/components/Chatbot';

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Professional Black & Indigo Gradient Background */}
      <div className="fixed inset-0 z-0 bg-black">
        {/* Deep, layered gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-black to-womb-crimson/10"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-womb-crimson/20 via-transparent to-black"></div>
        {/* Accent gradients */}
        <div className="absolute top-0 left-0 w-full h-56 bg-gradient-to-b from-indigo-800/20 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-72 bg-gradient-to-t from-womb-crimson/15 via-transparent to-transparent"></div>
        {/* Animated color orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-indigo-700/25 to-womb-crimson/20 rounded-full blur-3xl animate-pulse opacity-50"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-womb-crimson/30 to-indigo-700/20 rounded-full blur-3xl animate-pulse opacity-40" style={{ animationDelay: '1s' }}></div>
        {/* Mesh pattern overlay for extra polish */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/10 via-transparent to-womb-crimson/10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-400/5 to-transparent"></div>
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
