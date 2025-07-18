
"use client";
import { useRouter } from "next/navigation";

export default function AdminProfile() {
  const router = useRouter();
  return (
    <div className="admin-profile">
      <h1>Admin Profile</h1>
      {/* Navigation is now only via the main Navbar */}
      <div className="profile-card">
        <p><strong>Name:</strong> Admin User</p>
        <p><strong>Email:</strong> admin@example.com</p>
        <p><strong>Role:</strong> Administrator</p>
      </div>
    </div>
  );
}
