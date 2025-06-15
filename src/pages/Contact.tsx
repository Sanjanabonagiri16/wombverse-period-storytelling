
import Layout from '@/components/Layout';
import { Mail, MessageSquare, Shield } from 'lucide-react';

const Contact = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-playfair font-bold text-womb-softwhite mb-8">
            Contact Us
          </h1>
          <p className="text-womb-warmgrey text-lg mb-12">
            We'd love to hear from you. Reach out with questions, feedback, or suggestions.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-womb-deepgrey p-6 rounded-lg text-center">
              <Mail className="w-8 h-8 text-womb-crimson mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-womb-softwhite mb-4">
                General Inquiries
              </h2>
              <p className="text-womb-warmgrey">
                For general questions and feedback
                <br />
                <a href="mailto:hello@wombverse.com" className="text-womb-crimson hover:underline">
                  hello@wombverse.com
                </a>
              </p>
            </div>
            
            <div className="bg-womb-deepgrey p-6 rounded-lg text-center">
              <MessageSquare className="w-8 h-8 text-womb-plum mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-womb-softwhite mb-4">
                Support
              </h2>
              <p className="text-womb-warmgrey">
                Need help with your account or the platform?
                <br />
                <a href="mailto:support@wombverse.com" className="text-womb-plum hover:underline">
                  support@wombverse.com
                </a>
              </p>
            </div>
            
            <div className="bg-womb-deepgrey p-6 rounded-lg text-center">
              <Shield className="w-8 h-8 text-womb-crimson mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-womb-softwhite mb-4">
                Safety & Reports
              </h2>
              <p className="text-womb-warmgrey">
                Report inappropriate content or safety concerns
                <br />
                <a href="mailto:safety@wombverse.com" className="text-womb-crimson hover:underline">
                  safety@wombverse.com
                </a>
              </p>
            </div>
          </div>
          
          <div className="mt-12 bg-womb-deepgrey p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-womb-softwhite mb-4">
              Response Times
            </h2>
            <p className="text-womb-warmgrey">
              We aim to respond to all inquiries within 24-48 hours. Safety-related reports are prioritized 
              and typically addressed within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
