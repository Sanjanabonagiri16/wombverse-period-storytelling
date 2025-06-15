
import Layout from '@/components/Layout';

const Guidelines = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-playfair font-bold text-womb-softwhite mb-8">
            Community Guidelines
          </h1>
          <p className="text-womb-warmgrey text-lg mb-12">
            Our guidelines help create a safe, respectful, and supportive environment for everyone.
          </p>
          
          <div className="space-y-8">
            <div className="bg-womb-deepgrey p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-womb-softwhite mb-4">
                🌸 Be Respectful & Kind
              </h2>
              <p className="text-womb-warmgrey">
                Treat all community members with respect and kindness. We're here to support each other through shared experiences.
              </p>
            </div>
            
            <div className="bg-womb-deepgrey p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-womb-softwhite mb-4">
                🔒 Respect Privacy
              </h2>
              <p className="text-womb-warmgrey">
                Only share what you're comfortable sharing. Respect others' privacy and never share personal information without consent.
              </p>
            </div>
            
            <div className="bg-womb-deepgrey p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-womb-softwhite mb-4">
                💝 Support, Don't Judge
              </h2>
              <p className="text-womb-warmgrey">
                Everyone's experience is valid. Offer support and avoid making judgmental comments about others' stories or choices.
              </p>
            </div>
            
            <div className="bg-womb-deepgrey p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-womb-softwhite mb-4">
                🚫 No Harassment or Hate Speech
              </h2>
              <p className="text-womb-warmgrey">
                Harassment, hate speech, and discriminatory language are not tolerated. This includes body shaming and period shaming.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Guidelines;
