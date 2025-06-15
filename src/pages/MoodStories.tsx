
import Layout from '@/components/Layout';
import MoodBasedStories from '@/components/mood/MoodBasedStories';

const MoodStories = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <MoodBasedStories />
      </div>
    </Layout>
  );
};

export default MoodStories;
