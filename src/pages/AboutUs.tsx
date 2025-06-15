
import Layout from '@/components/Layout';
import { Heart, Users, Shield, Globe, Award, Sparkles } from 'lucide-react';

const AboutUs = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-womb-charcoal via-gray-900 to-womb-deepgrey">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-womb-crimson/10 to-womb-plum/10"></div>
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-womb-crimson to-womb-plum rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-playfair font-bold text-white mb-6 leading-tight">
                About <span className="bg-gradient-to-r from-womb-crimson to-womb-plum bg-clip-text text-transparent">WombVerse</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                Revolutionizing menstrual health conversations through empowerment, education, and authentic community connection
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 pb-20">
          <div className="max-w-6xl mx-auto">
            
            {/* Mission Statement */}
            <div className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700/50 mb-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-6">
                  Our Mission
                </h2>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                  To create the world's most trusted and inclusive platform where menstrual experiences are shared, 
                  celebrated, and normalized. We believe every person who menstruates deserves access to reliable 
                  information, supportive community, and the freedom to speak openly about their experiences.
                </p>
              </div>
            </div>

            {/* Core Values Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <div className="bg-gradient-to-br from-womb-crimson/20 to-womb-crimson/5 rounded-2xl p-8 border border-womb-crimson/20 hover:border-womb-crimson/40 transition-all duration-300 hover:scale-105">
                <Users className="w-12 h-12 text-womb-crimson mb-6" />
                <h3 className="text-2xl font-semibold text-white mb-4">Inclusive Community</h3>
                <p className="text-gray-300 leading-relaxed">
                  We welcome everyone who menstruates, regardless of age, background, or identity. 
                  Our platform celebrates diversity and ensures every voice is heard and valued.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-womb-plum/20 to-womb-plum/5 rounded-2xl p-8 border border-womb-plum/20 hover:border-womb-plum/40 transition-all duration-300 hover:scale-105">
                <Shield className="w-12 h-12 text-womb-plum mb-6" />
                <h3 className="text-2xl font-semibold text-white mb-4">Safe & Secure</h3>
                <p className="text-gray-300 leading-relaxed">
                  Your privacy and safety are paramount. We employ industry-leading security measures 
                  and give you complete control over who sees your stories and personal information.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 rounded-2xl p-8 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:scale-105">
                <Globe className="w-12 h-12 text-green-400 mb-6" />
                <h3 className="text-2xl font-semibold text-white mb-4">Global Impact</h3>
                <p className="text-gray-300 leading-relaxed">
                  Breaking down menstrual taboos worldwide through education, advocacy, and 
                  connecting people across cultures to share experiences and wisdom.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-2xl p-8 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105">
                <Award className="w-12 h-12 text-blue-400 mb-6" />
                <h3 className="text-2xl font-semibold text-white mb-4">Evidence-Based</h3>
                <p className="text-gray-300 leading-relaxed">
                  All health information is reviewed by medical professionals and based on current 
                  research, ensuring you receive accurate and trustworthy guidance.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
                <Sparkles className="w-12 h-12 text-purple-400 mb-6" />
                <h3 className="text-2xl font-semibold text-white mb-4">Empowerment</h3>
                <p className="text-gray-300 leading-relaxed">
                  We believe knowledge is power. Our resources help you understand your body, 
                  make informed decisions, and advocate for better menstrual health policies.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-orange-500/20 to-orange-500/5 rounded-2xl p-8 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:scale-105">
                <Heart className="w-12 h-12 text-orange-400 mb-6" />
                <h3 className="text-2xl font-semibold text-white mb-4">Authentic Stories</h3>
                <p className="text-gray-300 leading-relaxed">
                  Real experiences from real people. We celebrate the full spectrum of menstrual 
                  experiences, from first periods to menopause and everything in between.
                </p>
              </div>
            </div>

            {/* Vision Section */}
            <div className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700/50 mb-12">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-8 text-center">
                Our Vision for the Future
              </h2>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="text-lg text-gray-300 leading-relaxed mb-6">
                    We envision a world where menstruation is no longer shrouded in shame, silence, or stigma. 
                    A world where every person who menstruates has access to:
                  </p>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-womb-crimson rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Comprehensive, culturally-sensitive menstrual education
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-womb-crimson rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Affordable, sustainable menstrual products
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-womb-crimson rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Supportive healthcare systems and workplace policies
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-womb-crimson rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Open, honest conversations about menstrual health
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-womb-crimson/10 to-womb-plum/10 rounded-xl p-8 border border-gray-700/30">
                  <h3 className="text-2xl font-semibold text-white mb-4">Join Our Movement</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Together, we're not just sharing stories—we're changing the narrative around 
                    menstruation forever. Every story shared, every conversation started, and every 
                    person educated brings us closer to our vision of menstrual equity for all.
                  </p>
                </div>
              </div>
            </div>

            {/* Impact Stats */}
            <div className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700/50">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-12 text-center">
                Growing Together
              </h2>
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div className="bg-gradient-to-br from-womb-crimson/20 to-womb-crimson/5 rounded-xl p-6 border border-womb-crimson/20">
                  <div className="text-3xl md:text-4xl font-bold text-womb-crimson mb-2">1000+</div>
                  <div className="text-gray-300 font-medium">Stories Shared</div>
                </div>
                <div className="bg-gradient-to-br from-womb-plum/20 to-womb-plum/5 rounded-xl p-6 border border-womb-plum/20">
                  <div className="text-3xl md:text-4xl font-bold text-womb-plum mb-2">50+</div>
                  <div className="text-gray-300 font-medium">Countries Reached</div>
                </div>
                <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 rounded-xl p-6 border border-green-500/20">
                  <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">95%</div>
                  <div className="text-gray-300 font-medium">User Satisfaction</div>
                </div>
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-xl p-6 border border-blue-500/20">
                  <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">24/7</div>
                  <div className="text-gray-300 font-medium">Community Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
