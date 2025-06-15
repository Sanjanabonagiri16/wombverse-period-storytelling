import Layout from '@/components/Layout';
import CommunityWallPage from '@/components/community/CommunityWallPage';

const Community = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6 lg:mb-8 bg-gradient-to-r from-womb-softgray via-womb-charcoal to-womb-mediumgray rounded-xl p-6 shadow-lg border maroon-border hover:border-womb-maroon transition-all">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-3 leading-tight">
            Community Wall <span className="text-womb-mediumgray">🤝</span>
          </h1>
          <p className="text-base md:text-lg text-womb-secondarytext font-medium">
            Join fellow members to share, discuss, and grow together.
          </p>
        </div>
        <CommunityWallPage />
      </div>
    </Layout>
  );
};

export default Community;
