
import Layout from '@/components/Layout';

const resources = [
  {
    name: "International Federation of Gynecology & Obstetrics",
    url: "https://www.figo.org/",
    description: "Comprehensive menstrual and reproductive health resources, evidence-based guidelines, and advocacy."
  },
  {
    name: "Office on Women’s Health (U.S.)",
    url: "https://www.womenshealth.gov/menstrual-cycle",
    description: "Authoritative consumer information on menstrual health, symptoms, and products."
  },
  {
    name: "Menstrual Health Hub",
    url: "https://mhhub.org/resources/",
    description: "Global database for menstrual health research, interventions, and community best practices."
  }
];

const Resources = () => (
  <Layout>
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold text-primary mb-4 font-playfair">Resources</h1>
      <p className="text-womb-warmgrey mb-8">
        Trusted, up-to-date resources for menstrual health education and support.
      </p>
      <dl className="space-y-6">
        {resources.map((r, i) => (
          <div key={i} className="bg-womb-deepgrey border border-womb-plum rounded-lg p-6">
            <dt className="font-bold text-womb-softwhite text-lg">{r.name}</dt>
            <dd className="text-womb-warmgrey">{r.description}</dd>
            <a className="mt-2 inline-block text-primary hover:underline" href={r.url} target="_blank" rel="noopener noreferrer">Visit resource</a>
          </div>
        ))}
      </dl>
    </div>
  </Layout>
);

export default Resources;
