
import Layout from '@/components/Layout';

const AboutUs = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-playfair font-bold text-womb-softwhite mb-8">
            About WombVerse
          </h1>
          <p className="text-womb-warmgrey text-lg mb-12">
            Our mission is to create a safe, supportive space where people can share their menstrual experiences and find community.
          </p>
          
          <div className="space-y-8">
            <div className="bg-womb-deepgrey p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-womb-softwhite mb-4">
                🌟 Our Vision
              </h2>
              <p className="text-womb-warmgrey">
                We envision a world where menstruation is spoken about openly, without shame or stigma. 
                Where every person who menstruates feels supported, informed, and celebrated.
              </p>
            </div>
            
            <div className="bg-womb-deepgrey p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-womb-softwhite mb-4">
                💝 Our Mission
              </h2>
              <p className="text-womb-warmgrey">
                To provide a platform where people can share their period stories, connect with others, 
                and access reliable information about menstrual health and wellness.
              </p>
            </div>
            
            <div className="bg-womb-deepgrey p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-womb-softwhite mb-4">
                🤝 Our Values
              </h2>
              <ul className="text-womb-warmgrey space-y-2">
                <li>• <strong>Inclusivity:</strong> Everyone who menstruates is welcome</li>
                <li>• <strong>Safety:</strong> Creating a secure space for vulnerable sharing</li>
                <li>• <strong>Education:</strong> Providing accurate, helpful information</li>
                <li>• <strong>Community:</strong> Building connections and support networks</li>
                <li>• <strong>Authenticity:</strong> Encouraging genuine, honest storytelling</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
