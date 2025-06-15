
import Layout from '@/components/Layout';

const RecentStories = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-playfair font-bold text-womb-softwhite mb-8">
            Recent Stories
          </h1>
          <p className="text-womb-warmgrey text-lg mb-12">
            Stay up to date with the latest stories shared by our community members.
          </p>
          
          <div className="grid gap-8">
            <div className="bg-womb-deepgrey p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-womb-softwhite mb-4">
                Latest Submissions
              </h2>
              <p className="text-womb-warmgrey">
                New stories are being shared every day. This page will show the most recent 
                submissions from our community, helping you stay connected with fresh perspectives.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RecentStories;
