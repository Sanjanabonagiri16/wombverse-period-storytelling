
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Heart, Brain, Phone, Mail, ExternalLink, Shield, Users, Book, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';

interface SupportCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  items: string[];
  color: string;
}

interface CrisisResource {
  id: string;
  service: string;
  number: string;
  description: string;
}

const Support = () => {
  const [supportCategories, setSupportCategories] = useState<SupportCategory[]>([]);
  const [crisisResources, setCrisisResources] = useState<CrisisResource[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const iconMap: { [key: string]: any } = {
    Heart,
    Brain,
    Users,
    Book,
  };

  const defaultCategories = [
    {
      id: '1',
      title: 'Menstrual Health Resources',
      description: 'Comprehensive information about menstrual health, symptoms, and wellness.',
      icon: 'Heart',
      items: [
        'Understanding your menstrual cycle',
        'Managing period pain and discomfort',
        'Product recommendations and reviews',
        'When to consult healthcare providers',
        'Hormonal health and nutrition'
      ],
      color: 'from-red-500 to-red-600'
    },
    {
      id: '2',
      title: 'Mental Health Support',
      description: 'Resources for emotional wellbeing and mental health during menstruation.',
      icon: 'Brain',
      items: [
        'Dealing with PMS and mood changes',
        'Anxiety and depression support',
        'Body image and self-acceptance',
        'Stress management techniques',
        'Professional therapy resources'
      ],
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: '3',
      title: 'Community Support',
      description: 'Connect with others who share similar experiences and challenges.',
      icon: 'Users',
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
      id: '4',
      title: 'Educational Materials',
      description: 'Evidence-based information and educational content about menstruation.',
      icon: 'Book',
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

  const defaultCrisisResources = [
    {
      id: '1',
      service: 'National Suicide Prevention Lifeline',
      number: '988',
      description: '24/7 free and confidential support'
    },
    {
      id: '2',
      service: 'Crisis Text Line',
      number: 'Text HOME to 741741',
      description: 'Free 24/7 crisis support via text'
    },
    {
      id: '3',
      service: 'SAMHSA National Helpline',
      number: '1-800-662-HELP (4357)',
      description: 'Mental health and substance abuse support'
    }
  ];

  useEffect(() => {
    const fetchSupportData = async () => {
      try {
        const { data: categoriesData } = await supabase
          .from('support_categories')
          .select('*')
          .order('created_at', { ascending: true });

        const { data: crisisData } = await supabase
          .from('crisis_resources')
          .select('*')
          .order('created_at', { ascending: true });

        setSupportCategories(categoriesData?.length ? categoriesData : defaultCategories);
        setCrisisResources(crisisData?.length ? crisisData : defaultCrisisResources);
      } catch (error) {
        console.log('Using default support data');
        setSupportCategories(defaultCategories);
        setCrisisResources(defaultCrisisResources);
      } finally {
        setLoading(false);
      }
    };

    fetchSupportData();

    // Set up real-time subscriptions
    const supportChannel = supabase
      .channel('support-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'support_categories'
      }, () => {
        fetchSupportData();
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'crisis_resources'
      }, () => {
        fetchSupportData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(supportChannel);
    };
  }, []);

  const filteredCategories = supportCategories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.items.some(item => item.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredCrisisResources = crisisResources.filter(resource =>
    resource.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
          <div className="text-white text-xl">Loading support resources...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-900/30 to-red-900/30 px-4 py-2 rounded-full mb-6 border border-purple-500/20">
                <Shield className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
                <span className="text-purple-400 font-medium text-sm md:text-base">Care & Assistance</span>
              </div>
              
              <h1 className="text-3xl md:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
                Support &{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-red-400">
                  Resources
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Find comprehensive support, resources, and guidance for your menstrual health journey. 
                We're here to help you every step of the way with expert information and community care.
              </p>
            </div>

            {/* Search Bar */}
            <div className="mb-8 md:mb-12">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search support resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 md:h-14 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400/20 text-base md:text-lg rounded-xl"
                />
              </div>
            </div>

            {/* Support Categories */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
              {filteredCategories.map((category, index) => {
                const IconComponent = iconMap[category.icon] || Heart;
                return (
                  <div
                    key={category.id}
                    className="group bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/50 hover:border-purple-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-400/10 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start space-x-4 mb-6">
                      <div className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6 md:w-7 md:h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                          {category.title}
                        </h3>
                        <p className="text-gray-300 leading-relaxed mb-4 text-sm md:text-base">
                          {category.description}
                        </p>
                      </div>
                    </div>
                    
                    <ul className="space-y-2">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center space-x-3 text-gray-300 text-sm md:text-base">
                          <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></div>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* Crisis Support Section */}
            <div className="bg-gradient-to-r from-gray-800/70 to-gray-900/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/50 mb-12">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 flex items-center justify-center">
                  <Phone className="w-6 h-6 md:w-8 md:h-8 text-red-400 mr-3" />
                  Crisis Support
                </h2>
                <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed text-sm md:text-base">
                  If you're experiencing a mental health crisis, please reach out for immediate help. 
                  These services are available 24/7 and provide free, confidential support.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredCrisisResources.map((resource, index) => (
                  <div
                    key={resource.id}
                    className="bg-gray-900/50 rounded-xl p-6 text-center hover:bg-gray-900/70 transition-colors duration-300 animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <h4 className="font-bold text-white mb-3 text-sm md:text-base">
                      {resource.service}
                    </h4>
                    <p className="text-xl md:text-2xl font-bold text-red-400 mb-2">
                      {resource.number}
                    </p>
                    <p className="text-xs md:text-sm text-gray-300">
                      {resource.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/50">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center">
                  <Mail className="w-5 h-5 md:w-6 md:h-6 text-purple-400 mr-3" />
                  Contact Our Support Team
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed text-sm md:text-base">
                  Need help with the platform or have questions about our community? 
                  Our dedicated support team is here to assist you.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-red-400" />
                    <span className="text-white text-sm md:text-base">support@wombverse.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-purple-400 rounded-full"></div>
                    <span className="text-gray-300 text-sm md:text-base">Response time: Within 24 hours</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/50">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center">
                  <ExternalLink className="w-5 h-5 md:w-6 md:h-6 text-red-400 mr-3" />
                  Additional Resources
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed text-sm md:text-base">
                  Explore external resources and organizations that provide specialized 
                  support for menstrual health and wellness.
                </p>
                <button className="bg-gradient-to-r from-red-500 to-purple-500 hover:from-red-600 hover:to-purple-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 text-sm md:text-base">
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
