
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import FeaturedStories from '@/components/FeaturedStories';
import CommunityHighlights from '@/components/CommunityHighlights';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedStories />
      <CommunityHighlights />
    </Layout>
  );
};

export default Index;
