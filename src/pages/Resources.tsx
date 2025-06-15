
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { BookOpen, Globe, Stethoscope, Users, Download, ExternalLink, Search, Filter, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';

interface ResourceCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  topics: ResourceTopic[];
  color: string;
}

interface ResourceTopic {
  id: string;
  title: string;
  description: string;
}

interface DownloadableResource {
  id: string;
  title: string;
  description: string;
  type: string;
  size: string;
  url?: string;
}

interface ExternalOrganization {
  id: string;
  name: string;
  description: string;
  url: string;
  focus: string;
}

const Resources = () => {
  const [resourceCategories, setResourceCategories] = useState<ResourceCategory[]>([]);
  const [downloadableResources, setDownloadableResources] = useState<DownloadableResource[]>([]);
  const [externalOrganizations, setExternalOrganizations] = useState<ExternalOrganization[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedFocus, setSelectedFocus] = useState('');
  const [loading, setLoading] = useState(true);

  const iconMap: { [key: string]: any } = {
    BookOpen,
    Stethoscope,
    Globe,
    Users,
  };

  const defaultCategories = [
    {
      id: '1',
      title: 'Educational Articles',
      description: 'Comprehensive guides and articles on menstrual health and wellness.',
      icon: 'BookOpen',
      color: 'from-red-500 to-red-600',
      topics: [
        { id: '1', title: 'Understanding Menstruation', description: 'Basic biology and cycle phases' },
        { id: '2', title: 'First Period Guide', description: 'Everything you need to know about menarche' },
        { id: '3', title: 'Cycle Tracking', description: 'How to monitor and understand your cycle' },
        { id: '4', title: 'Period Products Guide', description: 'Comprehensive product comparison' }
      ]
    },
    {
      id: '2',
      title: 'Medical Information',
      description: 'Evidence-based medical information and when to seek professional help.',
      icon: 'Stethoscope',
      color: 'from-purple-500 to-purple-600',
      topics: [
        { id: '5', title: 'Common Period Problems', description: 'Identifying and addressing issues' },
        { id: '6', title: 'Hormonal Health', description: 'Understanding hormonal fluctuations' },
        { id: '7', title: 'Pain Management', description: 'Natural and medical pain relief options' },
        { id: '8', title: 'When to See a Doctor', description: 'Red flags and health concerns' }
      ]
    },
    {
      id: '3',
      title: 'Cultural Perspectives',
      description: 'How different cultures view and celebrate menstruation worldwide.',
      icon: 'Globe',
      color: 'from-blue-500 to-blue-600',
      topics: [
        { id: '9', title: 'Global Period Practices', description: 'Traditions around the world' },
        { id: '10', title: 'Breaking Stigma', description: 'Challenging period taboos' },
        { id: '11', title: 'Religious Perspectives', description: 'Faith-based views on menstruation' },
        { id: '12', title: 'Historical Context', description: 'How attitudes have evolved' }
      ]
    },
    {
      id: '4',
      title: 'Community Resources',
      description: 'Tools and resources for building supportive communities.',
      icon: 'Users',
      color: 'from-green-500 to-green-600',
      topics: [
        { id: '13', title: 'Peer Support Groups', description: 'Building and joining support networks' },
        { id: '14', title: 'Educational Workshops', description: 'Resources for community education' },
        { id: '15', title: 'Advocacy Tools', description: 'Making change in your community' },
        { id: '16', title: 'Workplace Resources', description: 'Period-friendly workplace policies' }
      ]
    }
  ];

  const defaultDownloadableResources = [
    {
      id: '1',
      title: 'Period Tracking Chart',
      description: 'Printable chart for tracking your menstrual cycle',
      type: 'PDF',
      size: '2.5 MB'
    },
    {
      id: '2',
      title: 'First Period Conversation Guide',
      description: 'Parent-child discussion starter for first periods',
      type: 'PDF',
      size: '1.8 MB'
    },
    {
      id: '3',
      title: 'Workplace Policy Template',
      description: 'Template for implementing period-friendly policies',
      type: 'DOC',
      size: '850 KB'
    },
    {
      id: '4',
      title: 'Emergency Period Kit Checklist',
      description: 'Comprehensive checklist for period preparedness',
      type: 'PDF',
      size: '1.2 MB'
    }
  ];

  const defaultExternalOrganizations = [
    {
      id: '1',
      name: 'Period Equity',
      description: 'Fighting for menstrual equity through advocacy and education',
      url: 'periodequity.org',
      focus: 'Advocacy'
    },
    {
      id: '2',
      name: 'The Pad Project',
      description: 'Providing menstrual health education globally',
      url: 'thepadproject.org',
      focus: 'Global Health'
    },
    {
      id: '3',
      name: 'ACOG',
      description: 'Medical guidelines and women\'s health resources',
      url: 'acog.org',
      focus: 'Medical'
    },
    {
      id: '4',
      name: 'Bloody Good Period',
      description: 'Providing period products to those who need them',
      url: 'bloodygoodperiod.com',
      focus: 'Access'
    }
  ];

  useEffect(() => {
    const fetchResourcesData = async () => {
      try {
        const { data: categoriesData } = await supabase
          .from('resource_categories')
          .select(`
            *,
            resource_topics (*)
          `)
          .order('created_at', { ascending: true });

        const { data: downloadsData } = await supabase
          .from('downloadable_resources')
          .select('*')
          .order('created_at', { ascending: true });

        const { data: orgsData } = await supabase
          .from('external_organizations')
          .select('*')
          .order('created_at', { ascending: true });

        setResourceCategories(categoriesData?.length ? categoriesData : defaultCategories);
        setDownloadableResources(downloadsData?.length ? downloadsData : defaultDownloadableResources);
        setExternalOrganizations(orgsData?.length ? orgsData : defaultExternalOrganizations);
      } catch (error) {
        console.log('Using default resources data');
        setResourceCategories(defaultCategories);
        setDownloadableResources(defaultDownloadableResources);
        setExternalOrganizations(defaultExternalOrganizations);
      } finally {
        setLoading(false);
      }
    };

    fetchResourcesData();

    // Set up real-time subscriptions
    const resourcesChannel = supabase
      .channel('resources-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'resource_categories'
      }, () => {
        fetchResourcesData();
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'downloadable_resources'
      }, () => {
        fetchResourcesData();
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'external_organizations'
      }, () => {
        fetchResourcesData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(resourcesChannel);
    };
  }, []);

  const filteredCategories = resourceCategories.filter(category => {
    const matchesSearch = searchQuery === '' || 
      category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.topics.some(topic => 
        topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    const matchesCategory = selectedCategory === '' || category.title === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const filteredDownloads = downloadableResources.filter(resource =>
    searchQuery === '' || 
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredOrganizations = externalOrganizations.filter(org => {
    const matchesSearch = searchQuery === '' || 
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFocus = selectedFocus === '' || org.focus === selectedFocus;
    
    return matchesSearch && matchesFocus;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedFocus('');
  };

  const uniqueCategories = [...new Set(resourceCategories.map(cat => cat.title))];
  const uniqueFocusAreas = [...new Set(externalOrganizations.map(org => org.focus))];

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
          <div className="text-white text-xl">Loading resources...</div>
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
                <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
                <span className="text-purple-400 font-medium text-sm md:text-base">Knowledge Hub</span>
              </div>
              
              <h1 className="text-3xl md:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
                Educational{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-red-400">
                  Resources
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Expand your knowledge about menstrual health, wellness, and advocacy with our 
                comprehensive collection of evidence-based resources and educational materials.
              </p>
            </div>

            {/* Enhanced Search and Filter */}
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-4 md:p-6 mb-8 md:mb-12">
              <div className="space-y-4 md:space-y-6">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search resources, topics, organizations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 md:h-14 bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400/20 text-base md:text-lg rounded-xl"
                  />
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm md:text-base font-medium text-white mb-2">
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full h-10 md:h-12 rounded-xl border border-gray-700 bg-gray-900/50 px-3 py-2 text-sm md:text-base text-white focus:border-purple-400 focus:outline-none"
                    >
                      <option value="">All Categories</option>
                      {uniqueCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Focus Area Filter */}
                  <div>
                    <label className="block text-sm md:text-base font-medium text-white mb-2">
                      Focus Area
                    </label>
                    <select
                      value={selectedFocus}
                      onChange={(e) => setSelectedFocus(e.target.value)}
                      className="w-full h-10 md:h-12 rounded-xl border border-gray-700 bg-gray-900/50 px-3 py-2 text-sm md:text-base text-white focus:border-purple-400 focus:outline-none"
                    >
                      <option value="">All Focus Areas</option>
                      {uniqueFocusAreas.map((focus) => (
                        <option key={focus} value={focus}>
                          {focus}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Clear Filters */}
                  <div className="flex items-end">
                    <button
                      onClick={clearFilters}
                      className="w-full h-10 md:h-12 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <X className="w-4 h-4" />
                      <span className="text-sm md:text-base">Clear Filters</span>
                    </button>
                  </div>
                </div>

                {/* Active Filters Display */}
                {(searchQuery || selectedCategory || selectedFocus) && (
                  <div className="flex flex-wrap gap-2">
                    {searchQuery && (
                      <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                        Search: "{searchQuery}"
                      </span>
                    )}
                    {selectedCategory && (
                      <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                        Category: {selectedCategory}
                      </span>
                    )}
                    {selectedFocus && (
                      <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">
                        Focus: {selectedFocus}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Resource Categories */}
            <div className="space-y-8 md:space-y-12 mb-12 md:mb-16">
              {filteredCategories.map((category, index) => {
                const IconComponent = iconMap[category.icon] || BookOpen;
                return (
                  <div
                    key={category.id}
                    className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/50 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start space-x-4 mb-6 md:mb-8">
                      <div className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className="w-6 h-6 md:w-7 md:h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl md:text-3xl font-bold text-white mb-3">
                          {category.title}
                        </h2>
                        <p className="text-gray-300 leading-relaxed mb-6 text-sm md:text-base">
                          {category.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      {category.topics.map((topic) => (
                        <div
                          key={topic.id}
                          className="bg-gray-900/30 rounded-xl p-4 md:p-6 hover:bg-gray-900/50 transition-colors duration-300 cursor-pointer group"
                        >
                          <h3 className="font-bold text-white mb-2 group-hover:text-red-400 transition-colors text-sm md:text-base">
                            {topic.title}
                          </h3>
                          <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                            {topic.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Downloadable Resources */}
            <div className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/50 mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 flex items-center">
                <Download className="w-6 h-6 md:w-8 md:h-8 text-red-400 mr-3" />
                Downloadable Resources
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {filteredDownloads.map((resource, index) => (
                  <div
                    key={resource.id}
                    className="bg-gray-900/30 rounded-xl p-4 md:p-6 hover:bg-gray-900/50 transition-colors duration-300 cursor-pointer group animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-white group-hover:text-purple-400 transition-colors text-sm md:text-base">
                        {resource.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-xs">
                        <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
                          {resource.type}
                        </span>
                        <span className="text-gray-400">{resource.size}</span>
                      </div>
                    </div>
                    <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-4">
                      {resource.description}
                    </p>
                    <button className="text-red-400 hover:text-red-300 font-medium text-xs md:text-sm flex items-center space-x-1 transition-colors">
                      <Download className="w-3 h-3 md:w-4 md:h-4" />
                      <span>Download</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* External Organizations */}
            <div className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/50 mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 flex items-center">
                <ExternalLink className="w-6 h-6 md:w-8 md:h-8 text-purple-400 mr-3" />
                Partner Organizations
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {filteredOrganizations.map((org, index) => (
                  <div
                    key={org.id}
                    className="bg-gray-900/30 rounded-xl p-4 md:p-6 hover:bg-gray-900/50 transition-colors duration-300 cursor-pointer group animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-white group-hover:text-purple-400 transition-colors text-sm md:text-base">
                        {org.name}
                      </h3>
                      <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded text-xs">
                        {org.focus}
                      </span>
                    </div>
                    <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-4">
                      {org.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-400 text-xs md:text-sm font-medium">{org.url}</span>
                      <ExternalLink className="w-3 h-3 md:w-4 md:h-4 text-gray-400 group-hover:text-purple-400 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Medical Disclaimer */}
            <div className="bg-gradient-to-r from-gray-800/70 to-gray-900/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/50 text-center">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                Important Medical Disclaimer
              </h3>
              <p className="text-gray-300 max-w-4xl mx-auto leading-relaxed text-sm md:text-base">
                The information provided in these resources is for educational purposes only and should not 
                replace professional medical advice, diagnosis, or treatment. Always consult with qualified 
                healthcare providers for personalized guidance regarding your menstrual health.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Resources;
