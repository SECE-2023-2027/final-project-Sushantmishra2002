"use client";
import { useEffect, useState } from "react";

export default function UserDashboard() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const stored = localStorage.getItem("blogs");
    setBlogs(stored ? JSON.parse(stored) : []);
  }, []);
  return (
    <div className="user-dashboard">
      <h1>User Dashboard</h1>
      <ul className="blog-list">
        {blogs.map(blog => (
          <li key={blog.id} className="blog-item">
            <h3>{blog.title}</h3>
            <div>{blog.content}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
