"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  async function fetchBlogs() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/blogs");
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      setError("Error loading blogs.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function handleDelete(id) {
    try {
      await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      setBlogs(blogs => blogs.filter(b => b.id !== id));
    } catch {
      alert("Failed to delete blog.");
    }
  }

  function getExcerpt(content) {
    if (!content) return "";
    return content.length > 120 ? content.slice(0, 120) + "..." : content;
  }

  return (
    <div className="admin-dashboard-bg">
      <div className="admin-dashboard-container">
        <h1 className="admin-dashboard-title">Admin Dashboard</h1>
        {error && <div className="error mb-4">{error}</div>}
        {loading ? (
          <div>Loading notes...</div>
        ) : (
          <div className="blog-cards-grid-2col">
            {blogs.length === 0 && <div>No notes found.</div>}
            {blogs.map(blog => (
              <div key={blog.id} className="blog-card">
                <h3 className="blog-title">{blog.title}</h3>
                <div className="blog-date">{new Date(blog.createdAt).toLocaleString()}</div>
                <div className="blog-excerpt">{getExcerpt(blog.content)}</div>
                <div className="blog-actions mt-2 flex gap-2">
                  <button onClick={() => router.push(`/admin/blog/${blog.id}`)} className="readmore-btn">Read More</button>
                  <button onClick={() => router.push(`/admin/edit/${blog.id}`)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDelete(blog.id)} className="delete-btn">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
