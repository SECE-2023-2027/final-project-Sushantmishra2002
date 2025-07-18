"use client";
import { useEffect, useState } from "react";
import "../styles/user.css";

export default function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // For now, get user from localStorage (should be replaced with real session)
    const userData = localStorage.getItem("user");
    if (userData) setUser(JSON.parse(userData));
  }, []);

  if (!user) {
    return <div style={{textAlign: 'center', marginTop: '2rem'}}>Not logged in.</div>;
  }

  return (
    <div className="admin-profile">
      <h1>User Profile</h1>
      <div className="profile-card">
        <div><b>Name:</b> {user.name}</div>
        <div><b>Email:</b> {user.email}</div>
        {user.phone && <div><b>Phone:</b> {user.phone}</div>}
        <div><b>Date of Birth:</b> {user.dob}</div>
        <div><b>Registered:</b> {user.createdAt ? new Date(user.createdAt).toLocaleString() : "-"}</div>
      </div>
    </div>
  );
}
