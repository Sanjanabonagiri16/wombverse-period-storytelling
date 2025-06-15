
import Layout from '@/components/Layout';
import CommunityWall from '@/components/community/CommunityWall';

const Community = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 lg:py-8 max-w-7xl">
        <CommunityWall />
      </div>
    </Layout>
  );
};

export default Community;
