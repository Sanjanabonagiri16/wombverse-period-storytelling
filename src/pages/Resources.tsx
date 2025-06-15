
import Layout from '@/components/Layout';

const Resources = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-playfair font-bold text-womb-softwhite mb-8">
            Educational Resources
          </h1>
          <p className="text-womb-warmgrey text-lg mb-12">
            Learn more about menstrual health, wellness, and self-care with our curated resources.
          </p>
          
          <div className="space-y-8">
            <div className="bg-womb-deepgrey p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-womb-softwhite mb-4">
                📚 Educational Articles
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-womb-warmgrey">
                <div>
                  <h3 className="font-semibold text-womb-softwhite mb-2">Period Basics</h3>
                  <ul className="space-y-1">
                    <li>• What is menstruation?</li>
                    <li>• Understanding your cycle</li>
                    <li>• First period guide</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-womb-softwhite mb-2">Health & Wellness</h3>
                  <ul className="space-y-1">
                    <li>• Nutrition during periods</li>
                    <li>• Exercise and menstruation</li>
                    <li>• Sleep and hormones</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-womb-deepgrey p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-womb-softwhite mb-4">
                🩺 Medical Information
              </h2>
              <p className="text-womb-warmgrey">
                Important: This information is for educational purposes only and should not replace professional medical advice. 
                Always consult with healthcare providers for personalized guidance.
              </p>
            </div>
            
            <div className="bg-womb-deepgrey p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-womb-softwhite mb-4">
                🌍 Cultural Perspectives
              </h2>
              <p className="text-womb-warmgrey">
                Explore how different cultures view and celebrate menstruation, helping to break stigma and promote understanding.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Resources;
