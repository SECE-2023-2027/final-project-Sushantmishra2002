import Link from 'next/link';

export default function ArticleCard({ id, title, excerpt }) {
  return (
    <article className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-semibold mb-2 text-blue-800">{title}</h2>
        <p className="text-gray-600 mb-4">{excerpt}</p>
      </div>
      <Link href={`/blog/${id}`} className="text-blue-600 hover:underline font-medium self-end">Read More</Link>
    </article>
  );
}
