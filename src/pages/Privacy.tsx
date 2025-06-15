
import Layout from '@/components/Layout';
import { Shield, Eye, Lock, FileText, Users, Globe, Database, Settings } from 'lucide-react';

const Privacy = () => {
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
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-playfair font-bold text-white mb-6 leading-tight">
                Privacy <span className="bg-gradient-to-r from-womb-crimson to-womb-plum bg-clip-text text-transparent">Policy</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                Your privacy is fundamental to everything we do. Learn how we protect and respect your personal information.
              </p>
              <div className="mt-8 text-sm text-gray-400">
                Last updated: January 15, 2025
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 pb-20">
          <div className="max-w-6xl mx-auto">
            
            {/* Privacy Principles */}
            <div className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700/50 mb-12">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-8 text-center">
                Our Privacy Principles
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-womb-crimson/20 to-womb-crimson/5 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-8 h-8 text-womb-crimson" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Transparency</h3>
                  <p className="text-gray-300 leading-relaxed">
                    We're clear about what data we collect, why we collect it, and how we use it.
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-br from-womb-plum/20 to-womb-plum/5 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-8 h-8 text-womb-plum" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Security</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Your data is protected with industry-leading security measures and encryption.
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Control</h3>
                  <p className="text-gray-300 leading-relaxed">
                    You have complete control over your data and privacy settings.
                  </p>
                </div>
              </div>
            </div>

            {/* Information We Collect */}
            <div className="space-y-8 mb-16">
              <div className="bg-gradient-to-br from-womb-crimson/20 to-womb-crimson/5 rounded-2xl p-8 border border-womb-crimson/20">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-br from-womb-crimson to-red-600 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                    <Database className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-semibold text-white">
                    Information We Collect
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Account Information</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-womb-crimson rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Email address (required for account verification)
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-womb-crimson rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Username (public display name)
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-womb-crimson rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Profile information (optional)
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-womb-crimson rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Age range (for age-appropriate content)
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Content & Activity</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-womb-crimson rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Stories and posts you create
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-womb-crimson rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Comments and reactions
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-womb-crimson rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Privacy settings and preferences
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-womb-crimson rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Platform usage analytics (anonymized)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-womb-plum/20 to-womb-plum/5 rounded-2xl p-8 border border-womb-plum/20">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-br from-womb-plum to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-semibold text-white">
                    How We Use Your Information
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Core Platform Services</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-womb-plum rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Provide and improve our platform features
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-womb-plum rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Enable community interactions and connections
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-womb-plum rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Personalize your experience and content recommendations
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-womb-plum rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Send important account and platform updates
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Safety & Security</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-womb-plum rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Prevent fraud, spam, and abuse
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-womb-plum rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Enforce community guidelines and terms
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-womb-plum rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Respond to safety reports and concerns
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-womb-plum rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Maintain platform security and integrity
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy Controls */}
            <div className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700/50 mb-12">
              <div className="flex items-center justify-center mb-8">
                <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-xl flex items-center justify-center shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-8 text-center">
                Your Privacy Controls
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 rounded-xl p-6 border border-green-500/20 text-center">
                  <div className="text-2xl mb-3">👁️</div>
                  <h3 className="text-lg font-semibold text-white mb-2">Story Visibility</h3>
                  <p className="text-gray-300 text-sm">Choose who can see your stories: public, community members only, or private</p>
                </div>
                
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-xl p-6 border border-blue-500/20 text-center">
                  <div className="text-2xl mb-3">🔒</div>
                  <h3 className="text-lg font-semibold text-white mb-2">Profile Privacy</h3>
                  <p className="text-gray-300 text-sm">Control your profile visibility and what information others can see</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-xl p-6 border border-purple-500/20 text-center">
                  <div className="text-2xl mb-3">🗑️</div>
                  <h3 className="text-lg font-semibold text-white mb-2">Data Deletion</h3>
                  <p className="text-gray-300 text-sm">Delete your content, account, or request complete data removal anytime</p>
                </div>
                
                <div className="bg-gradient-to-br from-orange-500/20 to-orange-500/5 rounded-xl p-6 border border-orange-500/20 text-center">
                  <div className="text-2xl mb-3">📧</div>
                  <h3 className="text-lg font-semibold text-white mb-2">Communications</h3>
                  <p className="text-gray-300 text-sm">Choose what notifications and communications you want to receive</p>
                </div>
              </div>
            </div>

            {/* Data Security */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-gradient-to-br from-red-500/20 to-red-500/5 rounded-2xl p-8 border border-red-500/20">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-br from-red-500 to-red-600 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">Data Security</h3>
                </div>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    End-to-end encryption for sensitive data
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Regular security audits and monitoring
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Secure cloud infrastructure (SOC 2 compliant)
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Multi-factor authentication support
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-2xl p-8 border border-blue-500/20">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">Your Rights</h3>
                </div>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Access and download your data
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Correct or update information
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Delete your account and data
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Opt-out of data processing
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-r from-womb-crimson/20 to-womb-plum/20 rounded-2xl p-8 md:p-12 border border-gray-700/50 text-center">
              <h3 className="text-2xl md:text-3xl font-semibold text-white mb-6">
                Questions About Your Privacy?
              </h3>
              <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8">
                We're committed to transparency and protecting your privacy. If you have questions about this policy, 
                want to exercise your privacy rights, or need help with your privacy settings, our team is here to help.
              </p>
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <a 
                  href="mailto:privacy@wombverse.com" 
                  className="bg-gradient-to-r from-womb-crimson to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 inline-block"
                >
                  privacy@wombverse.com
                </a>
                <a 
                  href="/contact" 
                  className="bg-gradient-to-r from-womb-plum to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 inline-block"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
