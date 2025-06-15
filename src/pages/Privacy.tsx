
import Layout from '@/components/Layout';

const Privacy = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-playfair font-bold text-womb-softwhite mb-8">
            Privacy Policy
          </h1>
          <p className="text-womb-warmgrey text-lg mb-12">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          
          <div className="space-y-8">
            <div className="bg-womb-deepgrey p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-womb-softwhite mb-4">
                Information We Collect
              </h2>
              <ul className="text-womb-warmgrey space-y-2">
                <li>• Account information (email, username)</li>
                <li>• Stories and content you share</li>
                <li>• Usage data and analytics</li>
                <li>• Device and browser information</li>
              </ul>
            </div>
            
            <div className="bg-womb-deepgrey p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-womb-softwhite mb-4">
                How We Use Your Information
              </h2>
              <ul className="text-womb-warmgrey space-y-2">
                <li>• To provide and improve our services</li>
                <li>• To enable community features</li>
                <li>• To ensure platform safety and security</li>
                <li>• To communicate important updates</li>
              </ul>
            </div>
            
            <div className="bg-womb-deepgrey p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-womb-softwhite mb-4">
                Your Privacy Controls
              </h2>
              <ul className="text-womb-warmgrey space-y-2">
                <li>• Choose who can see your stories (public, community, private)</li>
                <li>• Control your profile visibility</li>
                <li>• Delete your content anytime</li>
                <li>• Request account deletion</li>
              </ul>
            </div>
            
            <div className="bg-womb-deepgrey p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-womb-softwhite mb-4">
                Data Security
              </h2>
              <p className="text-womb-warmgrey">
                We use industry-standard security measures to protect your data, including encryption, 
                secure servers, and regular security audits. However, no online service is 100% secure.
              </p>
            </div>
            
            <div className="bg-womb-deepgrey p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-womb-softwhite mb-4">
                Contact Us
              </h2>
              <p className="text-womb-warmgrey">
                Have questions about your privacy? Contact us at privacy@wombverse.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
