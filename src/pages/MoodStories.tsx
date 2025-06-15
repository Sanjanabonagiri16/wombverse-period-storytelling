
import Layout from '@/components/Layout';
import MoodBasedStories from '@/components/mood/MoodBasedStories';

const MoodStories = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 lg:mb-8 bg-gradient-to-r from-womb-softgray via-womb-charcoal to-womb-mediumgray rounded-xl p-6 shadow-lg border maroon-border hover:border-womb-maroon transition-all">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-womb-lightgray mb-3 leading-tight">
            Mood Stories <span className="text-womb-mediumgray">😊</span>
          </h1>
          <p className="text-base md:text-lg text-womb-secondarytext font-medium">
            Explore stories that match your current mood.
          </p>
        </div>
        <MoodBasedStories />
      </div>
    </Layout>
  );
};

export default MoodStories;
