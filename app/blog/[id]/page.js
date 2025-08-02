"use client";
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'formalblog_blogs';

export default function BlogDetailPage({ params }) {
  const id = Number(params.id);
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const blogs = JSON.parse(stored);
      const found = blogs.find((b) => b.id === id);
      setBlog(found);
    }
  }, [id]);

  if (!blog) return <div className="text-center py-12">Notes Not Found !.</div>;

  return (
    <section className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-blue-900">{blog.title}</h1>
      <p className="text-gray-700 mb-6">{blog.content}</p>
    </section>
  );
}
