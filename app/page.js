"use client";
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import ArticleCard from '../components/ArticleCard';

const STORAGE_KEY = 'formalblog_blogs';

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  const pathname = usePathname();
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setBlogs(JSON.parse(stored));
    } else {
      setBlogs([
        {
          id: 1,
          title: 'The Art of Formal Writing',
          excerpt: 'Explore the nuances of writing with clarity, precision, and elegance in a professional context.',
          content: 'Full details about formal writing, including structure, tone, and examples.'
        },
        {
          id: 2,
          title: 'Aesthetic Web Design Principles',
          excerpt: 'Discover how to create visually pleasing and user-friendly web experiences using modern tools.',
          content: 'Full details about web design, color theory, layout, and best practices.'
        }
      ]);
    }
  }, [pathname]);

  return (
    <section className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-4 text-blue-900">Welcome to the Formal Blog</h1>
      <p className="text-lg text-gray-700 mb-8">A place for formal, aesthetic, and insightful articles.</p>
      <div className="grid gap-8 md:grid-cols-2">
        {blogs.map((blog) => (
          <ArticleCard key={blog.id} id={blog.id} title={blog.title} excerpt={blog.excerpt} />
        ))}
      </div>
    </section>
  );
}
