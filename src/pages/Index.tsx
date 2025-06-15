
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import FeaturedStories from '@/components/FeaturedStories';
import CommunityHighlights from '@/components/CommunityHighlights';
import Chatbot from '@/components/Chatbot';

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Professional Grayscale Background with seamless transitions */}
      <div className="fixed inset-0 z-0 bg-womb-charcoal">
        {/* Deep, layered gradients with grays - seamless blending */}
        <div className="absolute inset-0 bg-gradient-to-br from-womb-softgray/20 via-womb-charcoal to-womb-mediumgray/15"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-womb-mediumgray/25 via-transparent to-womb-charcoal"></div>
        {/* Smooth transition gradients - no hard lines */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-womb-charcoal/50 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-t from-transparent via-womb-charcoal/30 to-transparent"></div>
        {/* Animated color orbs with seamless blending */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-80 md:h-80 bg-gradient-to-r from-womb-mediumgray/15 to-womb-softgray/10 rounded-full blur-3xl animate-float opacity-20 md:opacity-30" style={{ animationDuration: '12s' }}></div>
        <div className="absolute top-3/4 right-1/4 w-28 h-28 md:w-64 md:h-64 bg-gradient-to-r from-womb-softgray/20 to-womb-mediumgray/10 rounded-full blur-3xl animate-float opacity-15 md:opacity-25" style={{ animationDelay: '1s', animationDuration: '15s' }}></div>
        {/* Seamless mesh pattern overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-womb-softgray/5 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-womb-darkgray/3 to-transparent"></div>
        </div>
      </div>
      {/* Main content with enhanced z-index and seamless flow */}
      <div className="relative z-10">
        <Layout>
          <div className="space-y-0">
            <Hero />
            <FeaturedStories />
            <CommunityHighlights />
          </div>
        </Layout>
        <Chatbot />
      </div>
    </div>
  );
};

export default Index;
