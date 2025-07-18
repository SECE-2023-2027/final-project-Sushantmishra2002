"use client";
import { useState, useEffect } from 'react';
import ArticleCard from '../../components/ArticleCard';
import CreateBlogForm from '../../components/CreateBlogForm';
import Link from 'next/link';

// Helper to get logged-in user from localStorage (or use your auth system)
function getCurrentUser() {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('formalblog_user');
    return user ? JSON.parse(user) : null;
  }
  return null;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: '', excerpt: '', content: '' });

  // Fetch all blogs
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      setBlogs(data.blogs || []);
    } catch (err) {
      setError('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentUser(getCurrentUser());
    fetchBlogs();
  }, []);

  // Only allow create if logged in
  const canCreate = !!currentUser;

  // Only allow edit/delete if blog.userId === currentUser._id
  const canEditOrDelete = (blog) => {
    if (!currentUser) return false;
    return blog.userId === currentUser._id;
  };

  // Add blog handler
  const handleAddBlog = async (blog) => {
    if (!currentUser) return;
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...blog, userId: currentUser._id, authorName: currentUser.name })
      });
      if (!res.ok) throw new Error('Failed to add blog');
      await fetchBlogs();
    } catch (err) {
      setError('Failed to add blog');
    }
  };

  // Delete blog handler
  const handleDelete = async (id) => {
    if (!currentUser) return;
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser._id })
      });
      if (!res.ok) throw new Error('Failed to delete blog');
      await fetchBlogs();
    } catch (err) {
      setError('Failed to delete blog');
    }
  };

  // Edit blog handlers
  const handleEdit = (blog) => {
    setEditingId(blog._id);
    setEditData({ title: blog.title, excerpt: blog.excerpt || '', content: blog.content || '' });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSave = async (id) => {
    if (!currentUser) return;
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editData, userId: currentUser._id })
      });
      if (!res.ok) throw new Error('Failed to update blog');
      setEditingId(null);
      setEditData({ title: '', excerpt: '', content: '' });
      await fetchBlogs();
    } catch (err) {
      setError('Failed to update blog');
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditData({ title: '', excerpt: '', content: '' });
  };

  return (
    <section className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-blue-900 text-center">Blogs</h1>
      {canCreate && <CreateBlogForm onAdd={handleAddBlog} />}
      {loading ? (
        <p>Loading blogs...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          {blogs.map((blog) => (
            <div key={blog._id} className="relative">
              {editingId === blog._id ? (
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
                    <button onClick={() => handleEditSave(blog._id)} className="bg-blue-700 text-white px-4 py-1 rounded hover:bg-blue-900">Save</button>
                    <button onClick={handleEditCancel} className="bg-gray-300 text-gray-800 px-4 py-1 rounded hover:bg-gray-400">Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <ArticleCard id={blog._id} title={blog.title} excerpt={blog.excerpt || blog.content?.slice(0, 120)} />
                  <div className="text-sm text-gray-500 mb-2">By: {blog.authorName || 'Unknown'}</div>
                  <div className="flex gap-2 mt-2">
                    <Link href={`/blog/${blog._id}`} className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-900">Details</Link>
                    {canEditOrDelete(blog) && (
                      <>
                        <button onClick={() => handleEdit(blog)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Edit</button>
                        <button onClick={() => handleDelete(blog._id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-800">Delete</button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
