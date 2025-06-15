
import Layout from '@/components/Layout';
import { BookOpen, Globe, Stethoscope, Users, Download, ExternalLink, Search, Filter } from 'lucide-react';

const Resources = () => {
  const resourceCategories = [
    {
      icon: BookOpen,
      title: 'Educational Articles',
      description: 'Comprehensive guides and articles on menstrual health and wellness.',
      color: 'from-womb-crimson to-red-500',
      topics: [
        { title: 'Understanding Menstruation', description: 'Basic biology and cycle phases' },
        { title: 'First Period Guide', description: 'Everything you need to know about menarche' },
        { title: 'Cycle Tracking', description: 'How to monitor and understand your cycle' },
        { title: 'Period Products Guide', description: 'Comprehensive product comparison' }
      ]
    },
    {
      icon: Stethoscope,
      title: 'Medical Information',
      description: 'Evidence-based medical information and when to seek professional help.',
      color: 'from-womb-plum to-purple-500',
      topics: [
        { title: 'Common Period Problems', description: 'Identifying and addressing issues' },
        { title: 'Hormonal Health', description: 'Understanding hormonal fluctuations' },
        { title: 'Pain Management', description: 'Natural and medical pain relief options' },
        { title: 'When to See a Doctor', description: 'Red flags and health concerns' }
      ]
    },
    {
      icon: Globe,
      title: 'Cultural Perspectives',
      description: 'How different cultures view and celebrate menstruation worldwide.',
      color: 'from-blue-500 to-blue-600',
      topics: [
        { title: 'Global Period Practices', description: 'Traditions around the world' },
        { title: 'Breaking Stigma', description: 'Challenging period taboos' },
        { title: 'Religious Perspectives', description: 'Faith-based views on menstruation' },
        { title: 'Historical Context', description: 'How attitudes have evolved' }
      ]
    },
    {
      icon: Users,
      title: 'Community Resources',
      description: 'Tools and resources for building supportive communities.',
      color: 'from-green-500 to-green-600',
      topics: [
        { title: 'Peer Support Groups', description: 'Building and joining support networks' },
        { title: 'Educational Workshops', description: 'Resources for community education' },
        { title: 'Advocacy Tools', description: 'Making change in your community' },
        { title: 'Workplace Resources', description: 'Period-friendly workplace policies' }
      ]
    }
  ];

  const downloadableResources = [
    {
      title: 'Period Tracking Chart',
      description: 'Printable chart for tracking your menstrual cycle',
      type: 'PDF',
      size: '2.5 MB'
    },
    {
      title: 'First Period Conversation Guide',
      description: 'Parent-child discussion starter for first periods',
      type: 'PDF',
      size: '1.8 MB'
    },
    {
      title: 'Workplace Policy Template',
      description: 'Template for implementing period-friendly policies',
      type: 'DOC',
      size: '850 KB'
    },
    {
      title: 'Emergency Period Kit Checklist',
      description: 'Comprehensive checklist for period preparedness',
      type: 'PDF',
      size: '1.2 MB'
    }
  ];

  const externalOrganizations = [
    {
      name: 'Period Equity',
      description: 'Fighting for menstrual equity through advocacy and education',
      url: 'periodequity.org',
      focus: 'Advocacy'
    },
    {
      name: 'The Pad Project',
      description: 'Providing menstrual health education globally',
      url: 'thepadproject.org',
      focus: 'Global Health'
    },
    {
      name: 'ACOG (American College of Obstetricians and Gynecologists)',
      description: 'Medical guidelines and women\'s health resources',
      url: 'acog.org',
      focus: 'Medical'
    },
    {
      name: 'Bloody Good Period',
      description: 'Providing period products to those who need them',
      url: 'bloodygoodperiod.com',
      focus: 'Access'
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
                <BookOpen className="w-5 h-5 text-womb-plum" />
                <span className="text-womb-plum font-medium">Knowledge Hub</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-playfair font-bold text-womb-softwhite mb-6">
                Educational{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-womb-plum to-womb-crimson">
                  Resources
                </span>
              </h1>
              
              <p className="text-xl text-womb-warmgrey max-w-3xl mx-auto leading-relaxed">
                Expand your knowledge about menstrual health, wellness, and advocacy with our 
                comprehensive collection of evidence-based resources and educational materials.
              </p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-12">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-womb-warmgrey w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  className="w-full pl-10 pr-4 py-3 bg-womb-deepgrey/50 border border-womb-deepgrey rounded-lg text-womb-softwhite placeholder-womb-warmgrey focus:border-womb-crimson focus:outline-none transition-colors"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-womb-warmgrey w-5 h-5" />
                <select className="pl-10 pr-8 py-3 bg-womb-deepgrey/50 border border-womb-deepgrey rounded-lg text-womb-softwhite focus:border-womb-crimson focus:outline-none transition-colors appearance-none">
                  <option>All Categories</option>
                  <option>Medical</option>
                  <option>Educational</option>
                  <option>Cultural</option>
                  <option>Community</option>
                </select>
              </div>
            </div>

            {/* Resource Categories */}
            <div className="space-y-12 mb-16">
              {resourceCategories.map((category, index) => (
                <div
                  key={category.title}
                  className="bg-gradient-to-br from-womb-deepgrey/60 to-womb-deepgrey/40 backdrop-blur-sm rounded-xl p-8 border border-womb-deepgrey animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start space-x-4 mb-8">
                    <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-playfair font-bold text-womb-softwhite mb-3">
                        {category.title}
                      </h2>
                      <p className="text-womb-warmgrey leading-relaxed mb-6">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {category.topics.map((topic, topicIndex) => (
                      <div
                        key={topic.title}
                        className="bg-womb-charcoal/30 rounded-lg p-6 hover:bg-womb-charcoal/50 transition-colors duration-300 cursor-pointer group"
                      >
                        <h3 className="font-playfair font-bold text-womb-softwhite mb-2 group-hover:text-womb-crimson transition-colors">
                          {topic.title}
                        </h3>
                        <p className="text-womb-warmgrey text-sm leading-relaxed">
                          {topic.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Downloadable Resources */}
            <div className="bg-gradient-to-r from-womb-deepgrey/60 to-womb-deepgrey/40 backdrop-blur-sm rounded-xl p-8 border border-womb-deepgrey mb-12">
              <h2 className="text-3xl font-playfair font-bold text-womb-softwhite mb-6 flex items-center">
                <Download className="w-8 h-8 text-womb-crimson mr-3" />
                Downloadable Resources
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {downloadableResources.map((resource, index) => (
                  <div
                    key={resource.title}
                    className="bg-womb-charcoal/30 rounded-lg p-6 hover:bg-womb-charcoal/50 transition-colors duration-300 cursor-pointer group animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-playfair font-bold text-womb-softwhite group-hover:text-womb-plum transition-colors">
                        {resource.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-xs">
                        <span className="bg-womb-plum/20 text-womb-plum px-2 py-1 rounded">
                          {resource.type}
                        </span>
                        <span className="text-womb-warmgrey">{resource.size}</span>
                      </div>
                    </div>
                    <p className="text-womb-warmgrey text-sm leading-relaxed mb-4">
                      {resource.description}
                    </p>
                    <button className="text-womb-crimson hover:text-womb-crimson/80 font-medium text-sm flex items-center space-x-1 transition-colors">
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* External Organizations */}
            <div className="bg-gradient-to-r from-womb-deepgrey/60 to-womb-deepgrey/40 backdrop-blur-sm rounded-xl p-8 border border-womb-deepgrey mb-12">
              <h2 className="text-3xl font-playfair font-bold text-womb-softwhite mb-6 flex items-center">
                <ExternalLink className="w-8 h-8 text-womb-plum mr-3" />
                Partner Organizations
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {externalOrganizations.map((org, index) => (
                  <div
                    key={org.name}
                    className="bg-womb-charcoal/30 rounded-lg p-6 hover:bg-womb-charcoal/50 transition-colors duration-300 cursor-pointer group animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-playfair font-bold text-womb-softwhite group-hover:text-womb-plum transition-colors">
                        {org.name}
                      </h3>
                      <span className="bg-womb-crimson/20 text-womb-crimson px-2 py-1 rounded text-xs">
                        {org.focus}
                      </span>
                    </div>
                    <p className="text-womb-warmgrey text-sm leading-relaxed mb-4">
                      {org.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-womb-plum text-sm font-medium">{org.url}</span>
                      <ExternalLink className="w-4 h-4 text-womb-warmgrey group-hover:text-womb-plum transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-gradient-to-r from-womb-deepgrey/70 to-womb-deepgrey/50 backdrop-blur-sm rounded-xl p-8 border border-womb-deepgrey text-center">
              <h3 className="text-xl font-playfair font-bold text-womb-softwhite mb-4">
                Important Medical Disclaimer
              </h3>
              <p className="text-womb-warmgrey max-w-3xl mx-auto leading-relaxed">
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
