
import Layout from '@/components/Layout';

const supportResources = [
  {
    service: "National Alliance on Mental Illness (NAMI)",
    url: "https://www.nami.org/Home",
    description: "Mental health education, support, advocacy, and local resources for people of all ages."
  },
  {
    service: "Planned Parenthood",
    url: "https://www.plannedparenthood.org/",
    description: "Comprehensive reproductive and menstrual health care and information."
  },
  {
    service: "Menstrual Health Project (India)",
    url: "https://mhp.org.in/",
    description: "Support, guidance, and accurate information for those navigating periods and reproductive health in India."
  }
];

const Support = () => (
  <Layout>
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold text-primary mb-4 font-playfair">Support</h1>
      <p className="text-womb-warmgrey mb-8">
        If you need help or support, these organizations provide reliable, confidential assistance in areas of menstrual, reproductive, and mental health.
      </p>
      <ul className="space-y-6">
        {supportResources.map((r, i) => (
          <li key={i} className="bg-womb-deepgrey border border-womb-plum rounded-lg p-6">
            <h2 className="font-bold text-womb-softwhite text-lg">{r.service}</h2>
            <p className="text-womb-warmgrey">{r.description}</p>
            <a className="mt-2 inline-block text-primary hover:underline" href={r.url} target="_blank" rel="noopener noreferrer">Learn more</a>
          </li>
        ))}
      </ul>
    </div>
  </Layout>
);

export default Support;
