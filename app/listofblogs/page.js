
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../styles/user.css";

export default function ListOfBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      setError("Not logged in.");
      setLoading(false);
      return;
    }
    const user = JSON.parse(userData);
    fetch(`/api/blogs?userId=${user._id}`)
      .then(res => res.json())
      .then(data => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error loading blogs.");
        setLoading(false);
      });
  }, []);

  function handleEdit(id) {
    router.push(`/${id}`);
  }

  function handleDelete(id) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    fetch(`/api/blogs/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user._id })
    })
      .then(res => res.json())
      .then(() => setBlogs(blogs.filter(b => b.id !== id)))
      .catch(() => setError("Error deleting blog."));
  }

  if (loading) return <div style={{textAlign: 'center', marginTop: '2rem'}}>Loading...</div>;
  if (error) return <div style={{textAlign: 'center', marginTop: '2rem', color: 'red'}}>{error}</div>;

  return (
    <div className="admin-dashboard">
      <h1>Your Notes</h1>
      {blogs.length === 0 ? (
        <div>No notes found.</div>
      ) : (
        <ul className="blog-list">
          {blogs.map(blog => (
            <li key={blog.id} className="blog-item">
              <div>
                <div className="blog-title">{blog.title}</div>
                <div className="blog-excerpt">{blog.excerpt}</div>
                <div className="blog-date">{new Date(blog.createdAt).toLocaleString()}</div>
              </div>
              <div className="blog-actions">
                <button className="edit-btn" onClick={() => handleEdit(blog.id)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(blog.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
