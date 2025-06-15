
import Layout from '@/components/Layout';
import { Heart, BrainCircuit, Users } from 'lucide-react';

const teamMembers = [
  {
    name: "Dr. Alisha Sharma",
    role: "Founder & Medical Advisor",
    bio: "A board-certified gynecologist with over 15 years of experience, dedicated to evidence-based menstrual health education.",
    avatar: "/placeholder.svg"
  },
  {
    name: "Jasmine Chen",
    role: "Community Director",
    bio: "A passionate advocate for health equity, Jasmine ensures our community is safe, inclusive, and empowering for all.",
    avatar: "/placeholder.svg"
  },
  {
    name: "David Lee",
    role: "Lead Content Strategist",
    bio: "A health journalist committed to translating complex medical science into accessible and compassionate content.",
    avatar: "/placeholder.svg"
  }
];

const AboutUs = () => (
  <Layout>
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-womb-softwhite mb-4 font-playfair">About WombVerse</h1>
        <p className="text-lg text-womb-warmgrey">
          We are a collective of health educators, medical professionals, and community advocates dedicated to transforming the conversation around menstrual health.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center mb-20">
        <div className="bg-womb-deepgrey p-8 rounded-lg border border-womb-plum">
          <Heart className="w-12 h-12 mx-auto text-primary mb-4" />
          <h2 className="text-2xl font-bold text-womb-softwhite font-playfair mb-2">Our Mission</h2>
          <p className="text-womb-warmgrey">To dismantle stigma and empower individuals by fostering a community built on shared stories and science-backed knowledge.</p>
        </div>
        <div className="bg-womb-deepgrey p-8 rounded-lg border border-womb-plum">
          <BrainCircuit className="w-12 h-12 mx-auto text-primary mb-4" />
          <h2 className="text-2xl font-bold text-womb-softwhite font-playfair mb-2">Our Vision</h2>
          <p className="text-womb-warmgrey">A world where menstrual health is understood, destigmatized, and integrated into our broader concept of well-being.</p>
        </div>
        <div className="bg-womb-deepgrey p-8 rounded-lg border border-womb-plum">
          <Users className="w-12 h-12 mx-auto text-primary mb-4" />
          <h2 className="text-2xl font-bold text-womb-softwhite font-playfair mb-2">Our Community</h2>
          <p className="text-womb-warmgrey">A safe, inclusive space for sharing experiences, asking questions, and finding informed belonging without judgment.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-womb-softwhite font-playfair">Meet Our Team</h2>
        <p className="text-womb-warmgrey mt-2">The dedicated individuals behind WombVerse.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {teamMembers.map((member) => (
          <div key={member.name} className="bg-womb-deepgrey p-6 rounded-lg text-center border border-womb-plum">
            <img src={member.avatar} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4 bg-womb-charcoal" />
            <h3 className="text-xl font-bold text-womb-softwhite">{member.name}</h3>
            <p className="text-primary font-semibold mb-2">{member.role}</p>
            <p className="text-womb-warmgrey text-sm">{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  </Layout>
);

export default AboutUs;
