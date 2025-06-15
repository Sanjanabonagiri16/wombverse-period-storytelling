
import Layout from '@/components/Layout';

const PopularTags = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-playfair font-bold text-womb-softwhite mb-8">
            Popular Tags
          </h1>
          <p className="text-womb-warmgrey text-lg mb-12">
            Explore the most used tags in our community and discover stories by topic.
          </p>
          
          <div className="grid gap-8">
            <div className="bg-womb-deepgrey p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-womb-softwhite mb-4">
                Trending Topics
              </h2>
              <p className="text-womb-warmgrey">
                Tags help categorize stories and make them easier to find. Here you'll be able to 
                browse all popular tags and filter stories by specific topics that interest you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PopularTags;
