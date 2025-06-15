
import Layout from '@/components/Layout';

const Privacy = () => (
  <Layout>
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-3xl font-bold text-primary mb-4 font-playfair">Privacy Policy</h1>
      <p className="text-womb-warmgrey mb-6">
        Your privacy and trust are of the utmost importance at WombVerse.
      </p>
      <ul className="list-disc pl-7 text-womb-warmgrey space-y-3 mb-8">
        <li>We only collect information necessary to provide community and health resources.</li>
        <li>No health or story data is sold, rented, or shared with external parties without explicit consent.</li>
        <li>All data, including stories and profiles, are stored securely on encrypted servers.</li>
        <li>You may request data deletion at any time by contacting us at <a className="text-primary" href="mailto:privacy@wombverse.org">privacy@wombverse.org</a>.</li>
        <li>Our team adheres strictly to relevant health privacy laws and best practices.</li>
      </ul>
      <p className="text-womb-warmgrey text-sm">
        For specific privacy-related questions or requests, contact our Data Protection Officer at privacy@wombverse.org.
      </p>
    </div>
  </Layout>
);

export default Privacy;
