
import Layout from '@/components/Layout';
import StoryCreationForm from '@/components/story/StoryCreationForm';

const CreateStory = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 lg:py-8 max-w-4xl">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl md:text-3xl font-playfair font-bold text-womb-softwhite mb-2">
            Share Your Story
          </h1>
          <p className="text-sm md:text-base text-womb-warmgrey">
            Your experience matters. Share your story to help others feel less alone on their journey.
          </p>
        </div>
        <StoryCreationForm />
      </div>
    </Layout>
  );
};

export default CreateStory;
