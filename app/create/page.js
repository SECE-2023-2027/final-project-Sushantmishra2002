
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "../styles/user.css";

export default function UserCreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    const userData = localStorage.getItem("user");
    if (!userData) {
      setError("Not logged in.");
      return;
    }
    const user = JSON.parse(userData);
    if (!title || !content) {
      setError("Title and content are required.");
      return;
    }
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, userId: user._id })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to create blog.");
        return;
      }
      setSuccess("Blog created!");
      setTimeout(() => router.push("/listofblogs"), 1200);
    } catch {
      setError("Failed to create blog.");
    }
  }

  return (
    <div className="admin-create">
      <h1>Create Blog</h1>
      <form className="admin-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} required />
        {error && <div className="error">{error}</div>}
        {success && <div style={{ color: 'green', fontSize: '0.95rem', marginBottom: '0.5rem' }}>{success}</div>}
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
