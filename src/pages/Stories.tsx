
import Layout from '@/components/Layout';
import StoryExplorer from '@/components/story/StoryExplorer';

const Stories = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 lg:py-8 max-w-6xl">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-womb-softwhite mb-3">
            Story Explorer 📖
          </h1>
          <p className="text-base md:text-lg text-womb-warmgrey">
            Discover and connect with stories from our community
          </p>
        </div>

        <StoryExplorer />
      </div>
    </Layout>
  );
};

export default Stories;
