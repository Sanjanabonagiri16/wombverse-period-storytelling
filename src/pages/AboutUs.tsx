
import Layout from '@/components/Layout';
import { Heart, BrainCircuit, Users } from 'lucide-react';

const AboutUs = () => (
  <Layout>
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-womb-lightgray mb-4 font-playfair">About WombVerse</h1>
        <p className="text-lg text-womb-secondarytext">
          We are a collective of health educators, medical professionals, and community advocates dedicated to transforming the conversation around menstrual health.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center mb-20">
        <div className="bg-womb-darkgray p-8 rounded-lg border border-womb-border">
          <Heart className="w-12 h-12 mx-auto text-womb-mediumgray mb-4" />
          <h2 className="text-2xl font-bold text-womb-lightgray font-playfair mb-2">Our Mission</h2>
          <p className="text-womb-secondarytext">To dismantle stigma and empower individuals by fostering a community built on shared stories and science-backed knowledge.</p>
        </div>
        <div className="bg-womb-darkgray p-8 rounded-lg border border-womb-border">
          <BrainCircuit className="w-12 h-12 mx-auto text-womb-mediumgray mb-4" />
          <h2 className="text-2xl font-bold text-womb-lightgray font-playfair mb-2">Our Vision</h2>
          <p className="text-womb-secondarytext">A world where menstrual health is understood, destigmatized, and integrated into our broader concept of well-being.</p>
        </div>
        <div className="bg-womb-darkgray p-8 rounded-lg border border-womb-border">
          <Users className="w-12 h-12 mx-auto text-womb-mediumgray mb-4" />
          <h2 className="text-2xl font-bold text-womb-lightgray font-playfair mb-2">Our Community</h2>
          <p className="text-womb-secondarytext">A safe, inclusive space for sharing experiences, asking questions, and finding informed belonging without judgment.</p>
        </div>
      </div>
    </div>
  </Layout>
);

export default AboutUs;
