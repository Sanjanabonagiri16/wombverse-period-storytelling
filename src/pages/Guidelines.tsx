
import Layout from '@/components/Layout';

const Guidelines = () => (
  <Layout>
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-3xl font-bold text-primary mb-4 font-playfair">Community Guidelines</h1>
      <ul className="list-disc pl-7 text-womb-warmgrey space-y-4 mb-8">
        <li><span className="text-womb-softwhite font-semibold">Respect Confidentiality:</span> Do not share others' stories or personal details outside the community without explicit consent.</li>
        <li><span className="text-womb-softwhite font-semibold">Fact-Check and Stay Evidence-Based:</span> When offering advice, reference reliable sources and avoid perpetuating myths.</li>
        <li><span className="text-womb-softwhite font-semibold">No Judgement, No Stigma:</span> Welcome every experience, background, and identity with compassion and validation.</li>
        <li><span className="text-womb-softwhite font-semibold">Be Supportive, Not Harmful:</span> Disagreement is okay—personal attacks, harassment, or aggressive messages are not tolerated.</li>
        <li><span className="text-womb-softwhite font-semibold">Share Responsibly:</span> Share only what you are comfortable with. Don’t diagnose others or provide medical advice beyond general guidance.</li>
      </ul>
      <p className="text-womb-warmgrey text-sm">
        These guidelines help make WombVerse a safe, informed space for everyone.
      </p>
    </div>
  </Layout>
);

export default Guidelines;
