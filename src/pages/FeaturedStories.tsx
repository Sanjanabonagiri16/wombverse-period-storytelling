
import Layout from '@/components/Layout';

const FeaturedStories = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-playfair font-bold text-womb-softwhite mb-8">
            Featured Stories
          </h1>
          <p className="text-womb-warmgrey text-lg mb-12">
            Discover handpicked stories that inspire, educate, and connect our community.
          </p>
          
          <div className="grid gap-8">
            <div className="bg-womb-deepgrey p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-womb-softwhite mb-4">
                Coming Soon
              </h2>
              <p className="text-womb-warmgrey">
                Our editorial team is curating the most impactful stories from our community. 
                Check back soon to read featured experiences that have touched hearts and changed minds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FeaturedStories;
