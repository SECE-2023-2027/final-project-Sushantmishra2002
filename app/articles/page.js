import ArticleCard from '../../components/ArticleCard';

const articles = [
  {
    title: 'The Art of Formal Writing',
    excerpt: 'Explore the nuances of writing with clarity, precision, and elegance in a professional context.',
    link: '#',
  },
  {
    title: 'Aesthetic Web Design Principles',
    excerpt: 'Discover how to create visually pleasing and user-friendly web experiences using modern tools.',
    link: '#',
  },
  {
    title: 'Effective Communication in Business',
    excerpt: 'Master the skills needed to communicate effectively in a formal business environment.',
    link: '#',
  },
  {
    title: 'Building a Personal Brand Online',
    excerpt: 'Learn strategies to create a professional and memorable online presence.',
    link: '#',
  },
];

export default function ArticlesPage() {
  return (
    <section className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-blue-900 text-center">Articles</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {articles.map((article, idx) => (
          <ArticleCard key={idx} {...article} />
        ))}
      </div>
    </section>
  );
}
