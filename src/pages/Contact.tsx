import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => (
  <Layout>
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-womb-softwhite mb-4 font-playfair">Get in Touch</h1>
        <p className="text-lg text-womb-warmgrey mb-12">
          We're here to help and answer any question you might have. We look forward to hearing from you.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
        <div className="bg-womb-deepgrey border maroon-border rounded-lg p-8 space-y-6">
          <h2 className="text-2xl font-bold text-womb-softwhite font-playfair">Contact Information</h2>
          <div className="flex items-start space-x-4">
            <Mail className="w-6 h-6 text-womb-maroon mt-1" />
            <div>
              <h3 className="font-semibold text-womb-softwhite">Email Us</h3>
              <p className="text-womb-warmgrey">For general inquiries, support, or feedback.</p>
              <a href="mailto:contact@wombverse.org" className="text-womb-maroon hover:underline">contact@wombverse.org</a>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Phone className="w-6 h-6 text-womb-maroon mt-1" />
            <div>
              <h3 className="font-semibold text-womb-softwhite">Call Us</h3>
              <p className="text-womb-warmgrey">For urgent matters.</p>
              <a href="tel:+1-800-555-0123" className="text-womb-maroon hover:underline">+1 (800) 555-0123</a>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <MapPin className="w-6 h-6 text-womb-maroon mt-1" />
            <div>
              <h3 className="font-semibold text-womb-softwhite">Our Office</h3>
              <p className="text-womb-warmgrey">WombVerse Headquarters<br/>123 Wellness Way<br/>San Francisco, CA 94105, USA</p>
            </div>
          </div>
        </div>
        <div className="bg-womb-deepgrey border maroon-border rounded-lg p-8">
          <h2 className="text-2xl font-bold text-womb-softwhite font-playfair mb-6">Send a Message</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-womb-softwhite mb-1">Full Name</label>
              <Input id="name" placeholder="Your Name" className="bg-womb-charcoal border-womb-deepgrey" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-womb-softwhite mb-1">Email Address</label>
              <Input id="email" type="email" placeholder="you@example.com" className="bg-womb-charcoal border-womb-deepgrey" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-womb-softwhite mb-1">Message</label>
              <Textarea id="message" placeholder="Your message..." rows={5} className="bg-womb-charcoal border-womb-deepgrey" />
            </div>
            <Button type="submit" className="w-full bg-womb-maroon hover:bg-womb-maroon/90 text-white">Send Message</Button>
          </form>
        </div>
      </div>
    </div>
  </Layout>
);

export default Contact;
