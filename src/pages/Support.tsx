
import Layout from '@/components/Layout';
import { Heart, Brain, Phone, Mail, ExternalLink, Shield, Users, Book } from 'lucide-react';

const Support = () => {
  const supportCategories = [
    {
      icon: Heart,
      title: 'Menstrual Health Resources',
      description: 'Comprehensive information about menstrual health, symptoms, and wellness.',
      items: [
        'Understanding your menstrual cycle',
        'Managing period pain and discomfort',
        'Product recommendations and reviews',
        'When to consult healthcare providers',
        'Hormonal health and nutrition'
      ],
      color: 'from-womb-crimson to-red-500'
    },
    {
      icon: Brain,
      title: 'Mental Health Support',
      description: 'Resources for emotional wellbeing and mental health during menstruation.',
      items: [
        'Dealing with PMS and mood changes',
        'Anxiety and depression support',
        'Body image and self-acceptance',
        'Stress management techniques',
        'Professional therapy resources'
      ],
      color: 'from-womb-plum to-purple-500'
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Connect with others who share similar experiences and challenges.',
      items: [
        'Peer support groups',
        'Mentorship programs',
        'Discussion forums',
        'Local community events',
        'Cultural and religious considerations'
      ],
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Book,
      title: 'Educational Materials',
      description: 'Evidence-based information and educational content about menstruation.',
      items: [
        'Scientific research and studies',
        'Age-appropriate educational content',
        'Myth-busting and facts',
        'Global perspectives on menstruation',
        'Advocacy and activism resources'
      ],
      color: 'from-green-500 to-green-600'
    }
  ];

  const crisisResources = [
    {
      service: 'National Suicide Prevention Lifeline',
      number: '988',
      description: '24/7 free and confidential support'
    },
    {
      service: 'Crisis Text Line',
      number: 'Text HOME to 741741',
      description: 'Free 24/7 crisis support via text'
    },
    {
      service: 'SAMHSA National Helpline',
      number: '1-800-662-HELP (4357)',
      description: 'Mental health and substance abuse support'
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-womb-charcoal via-womb-deepgrey/20 to-womb-charcoal">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-womb-plum/20 to-womb-crimson/20 px-4 py-2 rounded-full mb-6">
                <Shield className="w-5 h-5 text-womb-plum" />
                <span className="text-womb-plum font-medium">Care & Assistance</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-playfair font-bold text-womb-softwhite mb-6">
                Support &{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-womb-plum to-womb-crimson">
                  Resources
                </span>
              </h1>
              
              <p className="text-xl text-womb-warmgrey max-w-3xl mx-auto leading-relaxed">
                Find comprehensive support, resources, and guidance for your menstrual health journey. 
                We're here to help you every step of the way with expert information and community care.
              </p>
            </div>

            {/* Support Categories */}
            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {supportCategories.map((category, index) => (
                <div
                  key={category.title}
                  className="group bg-gradient-to-br from-womb-deepgrey/60 to-womb-deepgrey/40 backdrop-blur-sm rounded-xl p-8 border border-womb-deepgrey hover:border-womb-plum/30 transition-all duration-300 hover:shadow-lg hover:shadow-womb-plum/10 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start space-x-4 mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-playfair font-bold text-womb-softwhite mb-2 group-hover:text-womb-plum transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-womb-warmgrey leading-relaxed mb-4">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center space-x-3 text-womb-warmgrey">
                        <div className="w-2 h-2 bg-womb-crimson rounded-full flex-shrink-0"></div>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Crisis Support Section */}
            <div className="bg-gradient-to-r from-womb-deepgrey/70 to-womb-deepgrey/50 backdrop-blur-sm rounded-xl p-8 border border-womb-deepgrey mb-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-playfair font-bold text-womb-softwhite mb-4 flex items-center justify-center">
                  <Phone className="w-8 h-8 text-womb-crimson mr-3" />
                  Crisis Support
                </h2>
                <p className="text-womb-warmgrey max-w-2xl mx-auto leading-relaxed">
                  If you're experiencing a mental health crisis, please reach out for immediate help. 
                  These services are available 24/7 and provide free, confidential support.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {crisisResources.map((resource, index) => (
                  <div
                    key={resource.service}
                    className="bg-womb-charcoal/50 rounded-lg p-6 text-center hover:bg-womb-charcoal/70 transition-colors duration-300 animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <h4 className="font-playfair font-bold text-womb-softwhite mb-3">
                      {resource.service}
                    </h4>
                    <p className="text-2xl font-bold text-womb-crimson mb-2">
                      {resource.number}
                    </p>
                    <p className="text-sm text-womb-warmgrey">
                      {resource.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Section */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-r from-womb-deepgrey/60 to-womb-deepgrey/40 backdrop-blur-sm rounded-xl p-8 border border-womb-deepgrey">
                <h3 className="text-2xl font-playfair font-bold text-womb-softwhite mb-4 flex items-center">
                  <Mail className="w-6 h-6 text-womb-plum mr-3" />
                  Contact Our Support Team
                </h3>
                <p className="text-womb-warmgrey mb-6 leading-relaxed">
                  Need help with the platform or have questions about our community? 
                  Our dedicated support team is here to assist you.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-womb-crimson" />
                    <span className="text-womb-softwhite">support@wombverse.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-womb-plum rounded-full"></div>
                    <span className="text-womb-warmgrey">Response time: Within 24 hours</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-womb-deepgrey/60 to-womb-deepgrey/40 backdrop-blur-sm rounded-xl p-8 border border-womb-deepgrey">
                <h3 className="text-2xl font-playfair font-bold text-womb-softwhite mb-4 flex items-center">
                  <ExternalLink className="w-6 h-6 text-womb-crimson mr-3" />
                  Additional Resources
                </h3>
                <p className="text-womb-warmgrey mb-6 leading-relaxed">
                  Explore external resources and organizations that provide specialized 
                  support for menstrual health and wellness.
                </p>
                <button className="bg-gradient-to-r from-womb-crimson to-womb-plum hover:from-womb-crimson/90 hover:to-womb-plum/90 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105">
                  View External Resources
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Support;
