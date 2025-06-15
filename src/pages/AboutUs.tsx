
import Layout from '@/components/Layout';

const AboutUs = () => (
  <Layout>
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-3xl font-bold text-primary mb-4 font-playfair">About Us</h1>
      <p className="text-womb-warmgrey mb-6">
        WombVerse was founded by health educators, medical professionals, and community advocates dedicated to improving understanding and support around menstrual health. We provide verified information, lived experience stories, and a safe community for honest discussions.
      </p>
      <h2 className="font-bold text-womb-softwhite font-playfair text-lg mt-8 mb-2">Our Mission</h2>
      <p className="text-womb-warmgrey mb-4">
        To break stigma, empower people to share true stories, and ensure every member has access to science-based support.
      </p>
      <h2 className="font-bold text-womb-softwhite font-playfair text-lg mt-8 mb-2">Our Team</h2>
      <ul className="list-disc pl-7 text-womb-warmgrey space-y-1 mb-8">
        <li>Board-certified gynecologist advisors</li>
        <li>Certified mental wellness counselors</li>
        <li>Global menstrual health campaigners</li>
        <li>Community moderators trained in privacy and safety</li>
      </ul>
      <p className="text-womb-warmgrey text-sm">
        We welcome suggestions for factual, inclusive content from all members!
      </p>
    </div>
  </Layout>
);

export default AboutUs;
