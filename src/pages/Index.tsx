
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import FeaturedStories from '@/components/FeaturedStories';
import CommunityHighlights from '@/components/CommunityHighlights';

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Enhanced Professional Background with Red Gradients */}
      <div className="fixed inset-0 z-0">
        {/* Primary Professional Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-red-900/20"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-red-900/30 via-transparent to-slate-800"></div>
        
        {/* Professional Red Accent Gradients */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-red-600/10 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-96 bg-gradient-to-t from-red-700/15 via-red-500/5 to-transparent"></div>
        
        {/* Animated Professional Color Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse opacity-60"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-red-600/25 to-red-400/25 rounded-full blur-3xl animate-pulse opacity-50" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-red-400/15 to-pink-400/15 rounded-full blur-2xl animate-pulse opacity-40" style={{ animationDelay: '2s' }}></div>
        
        {/* Professional Floating Elements */}
        <div className="absolute top-20 left-20 w-3 h-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full animate-bounce opacity-70" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-40 right-32 w-4 h-4 bg-gradient-to-r from-red-400 to-pink-500 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-gradient-to-r from-pink-400 to-red-400 rounded-full animate-bounce opacity-80" style={{ animationDelay: '2.5s' }}></div>
        <div className="absolute bottom-20 right-20 w-3 h-3 bg-gradient-to-r from-red-500 to-red-700 rounded-full animate-bounce opacity-50" style={{ animationDelay: '3s' }}></div>
        
        {/* Professional Mesh Pattern Overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-red-600/10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-400/5 to-transparent"></div>
        </div>
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
