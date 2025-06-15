
import Layout from '@/components/Layout';
import { Mail, MessageSquare, Shield, Clock, Globe, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-womb-charcoal via-gray-900 to-womb-deepgrey">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-womb-crimson/10 to-womb-plum/10"></div>
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-playfair font-bold text-white mb-6 leading-tight">
                Get in <span className="bg-gradient-to-r from-womb-crimson to-womb-plum bg-clip-text text-transparent">Touch</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                We're here to listen, support, and help you make the most of your WombVerse experience
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 pb-20">
          <div className="max-w-6xl mx-auto">
            
            {/* Contact Methods Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-gradient-to-br from-womb-crimson/20 to-womb-crimson/5 rounded-2xl p-8 border border-womb-crimson/20 hover:border-womb-crimson/40 transition-all duration-300 hover:scale-105">
                <div className="bg-gradient-to-br from-womb-crimson to-red-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  General Inquiries
                </h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Questions about our platform, partnerships, or general feedback? We'd love to hear from you.
                </p>
                <div className="space-y-2">
                  <a href="mailto:hello@wombverse.com" className="text-womb-crimson hover:text-red-400 transition-colors font-medium text-lg">
                    hello@wombverse.com
                  </a>
                  <p className="text-sm text-gray-400">Response within 24 hours</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-womb-plum/20 to-womb-plum/5 rounded-2xl p-8 border border-womb-plum/20 hover:border-womb-plum/40 transition-all duration-300 hover:scale-105">
                <div className="bg-gradient-to-br from-womb-plum to-purple-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Technical Support
                </h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Having trouble with your account, stories, or platform features? Our tech team is here to help.
                </p>
                <div className="space-y-2">
                  <a href="mailto:support@wombverse.com" className="text-womb-plum hover:text-purple-400 transition-colors font-medium text-lg">
                    support@wombverse.com
                  </a>
                  <p className="text-sm text-gray-400">Priority support available</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-red-500/20 to-red-500/5 rounded-2xl p-8 border border-red-500/20 hover:border-red-500/40 transition-all duration-300 hover:scale-105">
                <div className="bg-gradient-to-br from-red-500 to-red-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Safety & Reports
                </h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Report inappropriate content, harassment, or safety concerns. All reports are handled confidentially.
                </p>
                <div className="space-y-2">
                  <a href="mailto:safety@wombverse.com" className="text-red-400 hover:text-red-300 transition-colors font-medium text-lg">
                    safety@wombverse.com
                  </a>
                  <p className="text-sm text-gray-400">Urgent: Responded within 2 hours</p>
                </div>
              </div>
            </div>

            {/* Additional Contact Options */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">Media & Press</h3>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Journalists, researchers, and media professionals interested in menstrual health stories and data.
                </p>
                <a href="mailto:press@wombverse.com" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                  press@wombverse.com
                </a>
              </div>

              <div className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">Partnerships</h3>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Healthcare providers, NGOs, educational institutions interested in collaboration opportunities.
                </p>
                <a href="mailto:partnerships@wombverse.com" className="text-green-400 hover:text-green-300 transition-colors font-medium">
                  partnerships@wombverse.com
                </a>
              </div>
            </div>

            {/* Response Times & Availability */}
            <div className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700/50 mb-12">
              <div className="flex items-center justify-center mb-8">
                <div className="bg-gradient-to-br from-womb-crimson to-womb-plum w-16 h-16 rounded-xl flex items-center justify-center shadow-lg">
                  <Clock className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-8 text-center">
                Response Times & Support Hours
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-womb-crimson/20 to-womb-crimson/5 rounded-xl p-6 border border-womb-crimson/20">
                    <h3 className="text-xl font-semibold text-white mb-3">General Support</h3>
                    <p className="text-womb-crimson font-bold text-2xl mb-2">24-48 hours</p>
                    <p className="text-gray-300 text-sm">Monday - Friday</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="bg-gradient-to-br from-orange-500/20 to-orange-500/5 rounded-xl p-6 border border-orange-500/20">
                    <h3 className="text-xl font-semibold text-white mb-3">Safety Reports</h3>
                    <p className="text-orange-400 font-bold text-2xl mb-2">2-24 hours</p>
                    <p className="text-gray-300 text-sm">Priority handling</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 rounded-xl p-6 border border-green-500/20">
                    <h3 className="text-xl font-semibold text-white mb-3">Emergency</h3>
                    <p className="text-green-400 font-bold text-2xl mb-2">Immediate</p>
                    <p className="text-gray-300 text-sm">Crisis situations</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 text-center">
                <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto">
                  Our dedicated support team operates across multiple time zones to ensure you receive timely assistance. 
                  For urgent safety concerns or crisis situations, we have 24/7 monitoring in place to provide immediate response.
                </p>
              </div>
            </div>

            {/* Community Guidelines Notice */}
            <div className="bg-gradient-to-r from-womb-plum/20 to-womb-crimson/20 rounded-2xl p-8 border border-gray-700/50 text-center">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Before You Reach Out
              </h3>
              <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto">
                Please review our <a href="/guidelines" className="text-womb-crimson hover:text-red-400 transition-colors underline">Community Guidelines</a> and 
                <a href="/support" className="text-womb-plum hover:text-purple-400 transition-colors underline ml-1">Support Resources</a> first. 
                Many common questions and issues can be resolved quickly through our comprehensive help documentation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
