
import Layout from '@/components/Layout';

const recents = [
  {
    title: "Why I Use Menstrual Cups Now",
    author: "Jess T.",
    excerpt: "My switch to reusable period care didn't just help the planet—it changed my experience for the better.",
    date: "2024-06-25"
  },
  {
    title: "Dealing With PMDD: Tips That Actually Helped Me",
    author: "Maria P.",
    excerpt: "It took a while, but I found a routine with mindfulness and open communication...",
    date: "2024-05-21"
  },
  {
    title: "How My School Helped End Period Shame",
    author: "Anika S.",
    excerpt: "When my school distributed free products and started conversations, girls felt less alone.",
    date: "2024-05-03"
  }
];

const RecentStories = () => (
  <Layout>
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold text-primary mb-4 font-playfair">Recent Stories</h1>
      <p className="text-womb-warmgrey mb-8">
        The latest experiences, honest reflections, and up-to-date stories from WombVerse members.
      </p>
      <div className="space-y-8">
        {recents.map((story, idx) => (
          <article key={idx} className="bg-womb-deepgrey p-6 rounded-lg shadow-md border border-womb-plum">
            <h2 className="text-xl font-semibold text-womb-softwhite font-playfair mb-2">{story.title}</h2>
            <p className="text-womb-warmgrey">{story.excerpt}</p>
            <div className="mt-3 flex justify-between text-xs text-gray-500">
              <span>By {story.author}</span>
              <span>{new Date(story.date).toLocaleDateString()}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  </Layout>
);

export default RecentStories;
