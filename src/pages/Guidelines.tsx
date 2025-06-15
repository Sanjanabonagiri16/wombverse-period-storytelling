
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Shield, Heart, Users, AlertTriangle, CheckCircle, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';

interface Guideline {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface AdditionalRule {
  id: string;
  rule: string;
}

const Guidelines = () => {
  const [guidelines, setGuidelines] = useState<Guideline[]>([]);
  const [additionalRules, setAdditionalRules] = useState<AdditionalRule[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const iconMap: { [key: string]: any } = {
    Heart,
    Shield,
    Users,
    AlertTriangle,
  };

  const defaultGuidelines = [
    {
      id: '1',
      title: 'Be Respectful & Kind',
      description: 'Treat all community members with respect and kindness. We\'re here to support each other through shared experiences.',
      icon: 'Heart',
      color: 'from-womb-crimson to-red-500'
    },
    {
      id: '2',
      title: 'Respect Privacy',
      description: 'Only share what you\'re comfortable sharing. Respect others\' privacy and never share personal information without consent.',
      icon: 'Shield',
      color: 'from-womb-plum to-purple-500'
    },
    {
      id: '3',
      title: 'Support, Don\'t Judge',
      description: 'Everyone\'s experience is valid. Offer support and avoid making judgmental comments about others\' stories or choices.',
      icon: 'Users',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: '4',
      title: 'No Harassment or Hate Speech',
      description: 'Harassment, hate speech, and discriminatory language are not tolerated. This includes body shaming and period shaming.',
      icon: 'AlertTriangle',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const defaultRules = [
    { id: '1', rule: 'Keep discussions relevant to menstrual health and related topics' },
    { id: '2', rule: 'Use content warnings for sensitive topics when appropriate' },
    { id: '3', rule: 'Report inappropriate behavior to our moderation team' },
    { id: '4', rule: 'Be patient with those who are new to the community' },
    { id: '5', rule: 'Celebrate diversity in experiences and perspectives' }
  ];

  useEffect(() => {
    const fetchGuidelines = async () => {
      try {
        // Try to fetch from the database tables using any type to bypass TypeScript errors temporarily
        const { data: guidelinesData } = await (supabase as any)
          .from('community_guidelines')
          .select('*')
          .order('created_at', { ascending: true });

        const { data: rulesData } = await (supabase as any)
          .from('community_rules')
          .select('*')
          .order('created_at', { ascending: true });

        setGuidelines(guidelinesData?.length ? guidelinesData : defaultGuidelines);
        setAdditionalRules(rulesData?.length ? rulesData : defaultRules);
      } catch (error) {
        console.log('Using default guidelines data:', error);
        setGuidelines(defaultGuidelines);
        setAdditionalRules(defaultRules);
      } finally {
        setLoading(false);
      }
    };

    fetchGuidelines();

    // Set up real-time subscription for guidelines
    const guidelinesChannel = supabase
      .channel('guidelines-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'community_guidelines'
      }, () => {
        fetchGuidelines();
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'community_rules'
      }, () => {
        fetchGuidelines();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(guidelinesChannel);
    };
  }, []);

  const filteredGuidelines = guidelines.filter(guideline =>
    guideline.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guideline.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRules = additionalRules.filter(rule =>
    rule.rule.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
          <div className="text-white text-xl">Loading guidelines...</div>
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
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-900/30 to-purple-900/30 px-4 py-2 rounded-full mb-6 border border-red-500/20">
                <Shield className="w-4 h-4 md:w-5 md:h-5 text-red-400" />
                <span className="text-red-400 font-medium text-sm md:text-base">Community Standards</span>
              </div>
              
              <h1 className="text-3xl md:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
                Community{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-purple-400">
                  Guidelines
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Our guidelines help create a safe, respectful, and supportive environment for everyone. 
                Together, we build a community where every voice matters and every experience is valued.
              </p>
            </div>

            {/* Search Bar */}
            <div className="mb-8 md:mb-12">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search guidelines and rules..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 md:h-14 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-red-400 focus:ring-red-400/20 text-base md:text-lg rounded-xl"
                />
              </div>
            </div>

            {/* Main Guidelines */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
              {filteredGuidelines.map((guideline, index) => {
                const IconComponent = iconMap[guideline.icon] || Heart;
                return (
                  <div
                    key={guideline.id}
                    className="group bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/50 hover:border-red-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-red-400/10 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r ${guideline.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6 md:w-7 md:h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                          {guideline.title}
                        </h3>
                        <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                          {guideline.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Additional Rules */}
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/50 mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-purple-400 mr-3" />
                Additional Community Standards
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredRules.map((rule, index) => (
                  <div
                    key={rule.id}
                    className="flex items-start space-x-3 p-4 bg-gray-900/30 rounded-xl hover:bg-gray-900/50 transition-colors duration-300"
                  >
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base">{rule.rule}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Enforcement Section */}
            <div className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/50 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Enforcement & Reporting
              </h3>
              <p className="text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed text-sm md:text-base">
                Violations of these guidelines may result in content removal, temporary suspension, or permanent ban. 
                If you encounter inappropriate behavior, please report it to our moderation team.
              </p>
              <button className="bg-gradient-to-r from-red-500 to-purple-500 hover:from-red-600 hover:to-purple-600 text-white font-semibold px-6 md:px-8 py-3 md:py-4 rounded-xl transition-all duration-300 hover:scale-105 text-sm md:text-base">
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
