
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import FeaturedStories from '@/components/FeaturedStories';
import CommunityHighlights from '@/components/CommunityHighlights';
import Chatbot from '@/components/Chatbot';

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Dark Maroon & Indigo Gradient Background */}
      <div className="fixed inset-0 z-0 bg-womb-black">
        {/* Deep, layered gradients with new dark colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-womb-maroon/20 via-womb-black to-womb-indigo/15"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-womb-indigo/25 via-transparent to-womb-black"></div>
        {/* Accent gradients */}
        <div className="absolute top-0 left-0 w-full h-56 bg-gradient-to-b from-womb-maroon/15 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-72 bg-gradient-to-t from-womb-indigo/20 via-transparent to-transparent"></div>
        {/* Animated color orbs with new colors */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-80 md:h-80 bg-gradient-to-r from-womb-indigo/20 to-womb-maroon/15 rounded-full blur-3xl animate-float opacity-30 md:opacity-50" style={{ animationDuration: '12s' }}></div>
        <div className="absolute top-3/4 right-1/4 w-28 h-28 md:w-64 md:h-64 bg-gradient-to-r from-womb-maroon/25 to-womb-indigo/15 rounded-full blur-3xl animate-float opacity-20 md:opacity-40" style={{ animationDelay: '1s', animationDuration: '15s' }}></div>
        {/* Mesh pattern overlay for extra polish */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-womb-maroon/10 via-transparent to-womb-indigo/10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-womb-darkgrey/5 to-transparent"></div>
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
