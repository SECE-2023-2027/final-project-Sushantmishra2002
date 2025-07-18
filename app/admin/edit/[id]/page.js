"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function AdminEdit() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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
        setTitle(data.title);
        setContent(data.content);
      } catch {
        setError("Blog not found.");
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content })
      });
      if (!res.ok) throw new Error("Failed to update blog");
      router.push("/admin/dashboard");
    } catch {
      setError("Error updating blog. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="admin-edit">Loading...</div>;
  if (error) return <div className="admin-edit">{error}</div>;

  return (
    <div className="admin-edit">
      <h1>Edit Blog</h1>
      <form onSubmit={handleSubmit} className="admin-form">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content" required />
        <button type="submit" disabled={loading}>{loading ? "Updating..." : "Update"}</button>
      </form>
    </div>
  );
}
