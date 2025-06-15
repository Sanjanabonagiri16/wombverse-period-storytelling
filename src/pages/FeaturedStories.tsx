
import Layout from '@/components/Layout';

const stories = [
  {
    title: "Conquering Endometriosis: My Ten-Year Journey",
    author: "Aaliyah K.",
    excerpt: "Diagnosed after years of pain, I became my own advocate and found real relief after surgery and support...",
    date: "2024-07-02"
  },
  {
    title: "How Talking Openly About Periods Changed My Family",
    author: "Samira Y.",
    excerpt: "Conversations at the dinner table led to a whole new level of comfort for my daughter and me...",
    date: "2023-10-12"
  },
  {
    title: "First Period at School: ‘I Wasn’t Prepared, But I Learned’",
    author: "Elise M.",
    excerpt: "I was scared at first, but supportive friends and a kind nurse turned shame into self-acceptance.",
    date: "2023-08-16"
  }
];

const FeaturedStories = () => (
  <Layout>
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold text-primary mb-4 font-playfair">Featured Stories</h1>
      <p className="text-womb-warmgrey mb-8">
        Powerful, real stories from our community—honest, moving, and inspiring.
      </p>
      <div className="space-y-8">
        {stories.map((story, idx) => (
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

export default FeaturedStories;
