"use client";
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import ArticleCard from '../../components/ArticleCard';
import CreateBlogForm from '../../components/CreateBlogForm';
import Link from 'next/link';

const STORAGE_KEY = 'formalblog_blogs';

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: '', excerpt: '', content: '' });

  // Load blogs from localStorage on mount
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

  // Save blogs to localStorage whenever blogs change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
  }, [blogs]);

  const handleAddBlog = (blog) => {
    setBlogs([
      { ...blog, id: Date.now() },
      ...blogs
    ]);
  };

  const handleDelete = (id) => {
    setBlogs(blogs.filter((b) => b.id !== id));
  };

  const handleEdit = (blog) => {
    setEditingId(blog.id);
    setEditData({ title: blog.title, excerpt: blog.excerpt, content: blog.content });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSave = (id) => {
    setBlogs(blogs.map((b) => b.id === id ? { ...b, ...editData } : b));
    setEditingId(null);
    setEditData({ title: '', excerpt: '', content: '' });
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditData({ title: '', excerpt: '', content: '' });
  };

  return (
    <section className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-blue-900 text-center">Blogs</h1>
      <CreateBlogForm onAdd={handleAddBlog} />
      <div className="grid gap-8 md:grid-cols-2">
        {blogs.map((blog) => (
          <div key={blog.id} className="relative">
            {editingId === blog.id ? (
              <div className="bg-white rounded-lg shadow-md p-6 border border-blue-300 flex flex-col gap-2">
                <input
                  name="title"
                  value={editData.title}
                  onChange={handleEditChange}
                  className="border border-gray-300 rounded px-4 py-2 mb-2"
                  placeholder="Title"
                />
                <input
                  name="excerpt"
                  value={editData.excerpt}
                  onChange={handleEditChange}
                  className="border border-gray-300 rounded px-4 py-2 mb-2"
                  placeholder="Excerpt"
                />
                <textarea
                  name="content"
                  value={editData.content}
                  onChange={handleEditChange}
                  className="border border-gray-300 rounded px-4 py-2 mb-2"
                  placeholder="Content"
                  rows={4}
                />
                <div className="flex gap-2 mt-2">
                  <button onClick={() => handleEditSave(blog.id)} className="bg-blue-700 text-white px-4 py-1 rounded hover:bg-blue-900">Save</button>
                  <button onClick={handleEditCancel} className="bg-gray-300 text-gray-800 px-4 py-1 rounded hover:bg-gray-400">Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <ArticleCard id={blog.id} title={blog.title} excerpt={blog.excerpt} />
                <div className="flex gap-2 mt-2">
                  <button onClick={() => handleEdit(blog)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Edit</button>
                  <button onClick={() => handleDelete(blog.id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-800">Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
