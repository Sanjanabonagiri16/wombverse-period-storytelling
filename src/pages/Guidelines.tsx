
import Layout from '@/components/Layout';
import { Shield, Heart, Users, AlertTriangle, CheckCircle } from 'lucide-react';

const Guidelines = () => {
  const guidelines = [
    {
      icon: Heart,
      title: 'Be Respectful & Kind',
      description: 'Treat all community members with respect and kindness. We\'re here to support each other through shared experiences.',
      color: 'from-womb-crimson to-red-500'
    },
    {
      icon: Shield,
      title: 'Respect Privacy',
      description: 'Only share what you\'re comfortable sharing. Respect others\' privacy and never share personal information without consent.',
      color: 'from-womb-plum to-purple-500'
    },
    {
      icon: Users,
      title: 'Support, Don\'t Judge',
      description: 'Everyone\'s experience is valid. Offer support and avoid making judgmental comments about others\' stories or choices.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: AlertTriangle,
      title: 'No Harassment or Hate Speech',
      description: 'Harassment, hate speech, and discriminatory language are not tolerated. This includes body shaming and period shaming.',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const additionalRules = [
    'Keep discussions relevant to menstrual health and related topics',
    'Use content warnings for sensitive topics when appropriate',
    'Report inappropriate behavior to our moderation team',
    'Be patient with those who are new to the community',
    'Celebrate diversity in experiences and perspectives'
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-womb-charcoal via-womb-deepgrey/20 to-womb-charcoal">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-womb-crimson/20 to-womb-plum/20 px-4 py-2 rounded-full mb-6">
                <Shield className="w-5 h-5 text-womb-crimson" />
                <span className="text-womb-crimson font-medium">Community Standards</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-playfair font-bold text-womb-softwhite mb-6">
                Community{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-womb-crimson to-womb-plum">
                  Guidelines
                </span>
              </h1>
              
              <p className="text-xl text-womb-warmgrey max-w-3xl mx-auto leading-relaxed">
                Our guidelines help create a safe, respectful, and supportive environment for everyone. 
                Together, we build a community where every voice matters and every experience is valued.
              </p>
            </div>

            {/* Main Guidelines */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {guidelines.map((guideline, index) => (
                <div
                  key={guideline.title}
                  className="group bg-gradient-to-br from-womb-deepgrey/60 to-womb-deepgrey/40 backdrop-blur-sm rounded-xl p-8 border border-womb-deepgrey hover:border-womb-crimson/30 transition-all duration-300 hover:shadow-lg hover:shadow-womb-crimson/10 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${guideline.color} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <guideline.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-playfair font-bold text-womb-softwhite mb-3 group-hover:text-womb-crimson transition-colors">
                        {guideline.title}
                      </h3>
                      <p className="text-womb-warmgrey leading-relaxed">
                        {guideline.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Rules */}
            <div className="bg-gradient-to-r from-womb-deepgrey/50 to-womb-deepgrey/30 backdrop-blur-sm rounded-xl p-8 border border-womb-deepgrey mb-12">
              <h2 className="text-2xl font-playfair font-bold text-womb-softwhite mb-6 flex items-center">
                <CheckCircle className="w-6 h-6 text-womb-plum mr-3" />
                Additional Community Standards
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                {additionalRules.map((rule, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-4 bg-womb-charcoal/30 rounded-lg hover:bg-womb-charcoal/50 transition-colors duration-300"
                  >
                    <div className="w-2 h-2 bg-womb-crimson rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-womb-warmgrey leading-relaxed">{rule}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Enforcement Section */}
            <div className="bg-gradient-to-r from-womb-deepgrey/60 to-womb-deepgrey/40 backdrop-blur-sm rounded-xl p-8 border border-womb-deepgrey text-center">
              <h3 className="text-2xl font-playfair font-bold text-womb-softwhite mb-4">
                Enforcement & Reporting
              </h3>
              <p className="text-womb-warmgrey mb-6 max-w-2xl mx-auto leading-relaxed">
                Violations of these guidelines may result in content removal, temporary suspension, or permanent ban. 
                If you encounter inappropriate behavior, please report it to our moderation team.
              </p>
              <button className="bg-gradient-to-r from-womb-crimson to-womb-plum hover:from-womb-crimson/90 hover:to-womb-plum/90 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105">
                Report an Issue
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Guidelines;
