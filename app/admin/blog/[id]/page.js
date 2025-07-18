"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function BlogDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBlog() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/blogs/${id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setBlog(data);
      } catch {
        setError("Blog not found.");
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [id]);

  if (loading) return <div className="admin-dashboard">Loading...</div>;
  if (error || !blog) return <div className="admin-dashboard">Blog not found.</div>;

  return (
    <div className="admin-dashboard">
      <h1 className="blog-title">{blog.title}</h1>
      <div className="blog-date mb-2">Created: {new Date(blog.createdAt).toLocaleString()}</div>
      <div className="blog-creator mb-4"><strong>Creator:</strong> Admin User</div>
      <div className="blog-content mb-6">{blog.content}</div>
      <button onClick={() => router.push('/admin/dashboard')} className="readmore-btn">Back to Dashboard</button>
    </div>
  );
}
