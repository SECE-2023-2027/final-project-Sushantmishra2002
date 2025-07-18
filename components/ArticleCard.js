
import Link from 'next/link';

export default function ArticleCard({ id, title, excerpt, link }) {
  return (
    <article className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between p-7 group relative overflow-hidden">
      {/* Decorative background accent */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition bg-gradient-to-br from-blue-200 to-blue-100 rounded-2xl z-0" />
      <div className="relative z-10">
        <h2 className="text-2xl font-bold mb-3 text-blue-900 group-hover:text-blue-700 transition-colors">{title}</h2>
        <p className="text-gray-600 mb-6 leading-relaxed">{excerpt}</p>
      </div>
      <div className="relative z-10 flex justify-end">
        <Link
          href={id ? `/blog/${id}` : link || '#'}
          className="inline-block px-5 py-2 rounded-full bg-blue-50 text-blue-700 font-semibold shadow hover:bg-blue-600 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Read More
        </Link>
      </div>
    </article>
  );
}
