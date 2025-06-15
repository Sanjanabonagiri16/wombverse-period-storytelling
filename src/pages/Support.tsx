
import Layout from '@/components/Layout';

const Support = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-playfair font-bold text-womb-softwhite mb-8">
            Support & Resources
          </h1>
          <p className="text-womb-warmgrey text-lg mb-12">
            Find help, resources, and support for your menstrual health journey.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-womb-deepgrey p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-womb-softwhite mb-4">
                🩸 Menstrual Health Resources
              </h2>
              <ul className="text-womb-warmgrey space-y-2">
                <li>• Understanding your cycle</li>
                <li>• Managing period pain</li>
                <li>• Product recommendations</li>
                <li>• When to see a doctor</li>
              </ul>
            </div>
            
            <div className="bg-womb-deepgrey p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-womb-softwhite mb-4">
                🧠 Mental Health Support
              </h2>
              <ul className="text-womb-warmgrey space-y-2">
                <li>• Dealing with PMS mood changes</li>
                <li>• Anxiety and periods</li>
                <li>• Body image support</li>
                <li>• Professional help resources</li>
              </ul>
            </div>
            
            <div className="bg-womb-deepgrey p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-womb-softwhite mb-4">
                📞 Crisis Support
              </h2>
              <p className="text-womb-warmgrey">
                If you're experiencing a mental health crisis, please reach out to:
                <br />• National Suicide Prevention Lifeline: 988
                <br />• Crisis Text Line: Text HOME to 741741
              </p>
            </div>
            
            <div className="bg-womb-deepgrey p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-womb-softwhite mb-4">
                💌 Contact Us
              </h2>
              <p className="text-womb-warmgrey">
                Need help with the platform or have questions? 
                <br />Email us at: support@wombverse.com
                <br />We typically respond within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Support;
