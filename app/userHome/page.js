"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "../styles/user.css";
import styles from "./page.module.css";

const UserHome = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        const data = await res.json();
        setBlogs(data.blogs || []);
      } catch (err) {
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className={styles["user-dashboard-bg"]}>
      <div className={styles["user-dashboard-container"]}>
        <Navbar role="user" />
        <h1 className={styles["user-dashboard-title"]}>All Blogs</h1>
        {loading ? (
          <p>Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p>No blogs found.</p>
        ) : (
          <div className="blog-cards-grid">
            {blogs.map((blog) => (
              <div className="blog-card" key={blog._id}>
                <div className="blog-title">{blog.title}</div>
                <div className="blog-excerpt">{blog.content?.slice(0, 120)}{blog.content?.length > 120 ? "..." : ""}</div>
                <div className="blog-date">By: {blog.authorName || "Unknown"} | {new Date(blog.createdAt).toLocaleString()}</div>
                <a className="readmore-btn" href={`/blog/${blog._id}`}>Read More</a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserHome;
