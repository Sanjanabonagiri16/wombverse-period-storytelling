
import Layout from '@/components/Layout';

const Contact = () => (
  <Layout>
    <div className="container mx-auto px-4 py-12 max-w-xl">
      <h1 className="text-3xl font-bold text-primary mb-4 font-playfair">Contact Us</h1>
      <p className="text-womb-warmgrey mb-8">
        Have questions, need support, or want to collaborate with WombVerse? Reach out!
      </p>
      <div className="bg-womb-deepgrey border border-womb-plum rounded-lg p-6">
        <p className="mb-2 text-womb-softwhite font-medium">Email:</p>
        <a href="mailto:contact@wombverse.org" className="text-primary hover:underline">contact@wombverse.org</a>
        <p className="mt-4 text-womb-softwhite font-medium">Mailing Address:</p>
        <span className="text-womb-warmgrey">
          WombVerse, 555 Menstrual Health Ave, New York, NY 10001
        </span>
      </div>
      <p className="mt-8 text-womb-warmgrey text-xs">
        Please allow up to 2 business days for replies.
      </p>
    </div>
  </Layout>
);

export default Contact;
