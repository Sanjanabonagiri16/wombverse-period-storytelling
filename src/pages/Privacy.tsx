
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';

const Privacy = () => {
  const lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-3xl text-womb-warmgrey">
        <h1 className="text-4xl md:text-5xl font-bold text-womb-softwhite mb-4 font-playfair">Privacy Policy</h1>
        <p className="text-sm mb-8">Last Updated: {lastUpdated}</p>

        <p className="mb-6">
          Your privacy and trust are paramount at WombVerse. This Privacy Policy outlines how we collect, use, protect, and handle your personal information as you use our services.
        </p>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-womb-softwhite font-playfair mb-3">1. Information We Collect</h2>
            <p className="mb-4">We collect information to provide and improve our community and resources. This includes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Account Information:</strong> When you create an account, we collect your email address, display name, and other profile information you choose to provide.</li>
              <li><strong>User-Generated Content:</strong> This includes stories, comments, and community posts you share. You control the privacy settings for your stories (e.g., public, anonymous).</li>
              <li><strong>Technical Data:</strong> We automatically collect information like your IP address, browser type, and device information to ensure our platform is secure and functional.</li>
              <li><strong>Usage Data:</strong> We collect information about how you interact with our site, such as pages visited and features used, to improve our services.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-womb-softwhite font-playfair mb-3">2. How We Use Your Information</h2>
            <p className="mb-4">Your information is used for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To operate and maintain the WombVerse platform.</li>
              <li>To personalize your experience and provide you with relevant content.</li>
              <li>To facilitate community interaction and support.</li>
              <li>To communicate with you about your account or our services.</li>
              <li>To protect the security and integrity of our community.</li>
              <li>For research and analytics to improve our platform, always using anonymized and aggregated data.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-womb-softwhite font-playfair mb-3">3. Data Sharing and Disclosure</h2>
            <p className="mb-4">We are committed to protecting your stories and personal data. We do not sell, rent, or trade your personal information.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>We may share anonymized and aggregated data with trusted research partners to advance menstrual health science, but only with your explicit consent.</li>
              <li>We will not share your identifiable information with third parties without your consent, unless required by law.</li>
              <li>Stories you mark as "Anonymous" will not be linked to your public profile.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-womb-softwhite font-playfair mb-3">4. Your Rights and Choices</h2>
            <p className="mb-4">You have control over your personal information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You can access and update your profile information at any time.</li>
              <li>You can control the privacy settings for each story you post.</li>
              <li>You can delete your content or your entire account. Upon deletion, your data will be permanently removed from our active systems within 30 days.</li>
              <li>You may request a copy of your data by contacting us.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-womb-softwhite font-playfair mb-3">5. Data Security</h2>
            <p>
              We implement robust security measures to protect your data, including encryption for data in transit and at rest, secure servers, and strict access controls for our team.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-womb-softwhite font-playfair mb-3">6. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the "Last Updated" date.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-womb-softwhite font-playfair mb-3">7. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy or your data, please contact our Data Protection Officer at{' '}
              <a href="mailto:privacy@wombverse.org" className="text-primary hover:underline">privacy@wombverse.org</a>.
              For general inquiries, please visit our <Link to="/contact" className="text-primary hover:underline">Contact Page</Link>.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default Privacy;
