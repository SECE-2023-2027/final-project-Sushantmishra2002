"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminCreate() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      if (!res.ok) throw new Error("Failed to create blog");
      setTitle("");
      setContent("");
      router.push("/admin/dashboard");
    } catch (err) {
      setError("Error creating blog. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-create">
      <h1>Create Blog</h1>
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
        />
        {error && <div className="error">{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
}
