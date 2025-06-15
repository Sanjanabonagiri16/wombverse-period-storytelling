
import Layout from '@/components/Layout';
import EnhancedStoryForm from '@/components/story/EnhancedStoryForm';

const CreateStory = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 lg:py-8 max-w-6xl">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-womb-softwhite mb-3">
            Share Your Story ✨
          </h1>
          <p className="text-base md:text-lg text-womb-warmgrey">
            Your experience matters. Share your story to help others feel less alone on their journey.
          </p>
        </div>
        <EnhancedStoryForm />
      </div>
    </Layout>
  );
};

export default CreateStory;
