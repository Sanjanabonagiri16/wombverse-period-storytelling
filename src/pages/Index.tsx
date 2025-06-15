
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import FeaturedStories from '@/components/FeaturedStories';
import CommunityHighlights from '@/components/CommunityHighlights';
import Chatbot from '@/components/Chatbot';

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Professional Dark Navy & Sapphire Gradient Background */}
      <div className="fixed inset-0 z-0 bg-womb-navy">
        {/* Deep, layered gradients with navy, charcoal, sapphire, emerald */}
        <div className="absolute inset-0 bg-gradient-to-br from-womb-emerald/20 via-womb-navy to-womb-sapphire/15"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-womb-sapphire/25 via-transparent to-womb-navy"></div>
        {/* Accent gradients */}
        <div className="absolute top-0 left-0 w-full h-56 bg-gradient-to-b from-womb-emerald/15 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-72 bg-gradient-to-t from-womb-sapphire/20 via-transparent to-transparent"></div>
        {/* Animated color orbs with new colors */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-80 md:h-80 bg-gradient-to-r from-womb-sapphire/20 to-womb-emerald/15 rounded-full blur-3xl animate-float opacity-30 md:opacity-50" style={{ animationDuration: '12s' }}></div>
        <div className="absolute top-3/4 right-1/4 w-28 h-28 md:w-64 md:h-64 bg-gradient-to-r from-womb-emerald/25 to-womb-sapphire/15 rounded-full blur-3xl animate-float opacity-20 md:opacity-40" style={{ animationDelay: '1s', animationDuration: '15s' }}></div>
        {/* Mesh pattern overlay for extra polish */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-womb-emerald/10 via-transparent to-womb-sapphire/10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-womb-charcoal/5 to-transparent"></div>
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
