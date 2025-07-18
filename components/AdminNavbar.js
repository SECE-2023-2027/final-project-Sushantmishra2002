"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminNavbar() {
  const router = useRouter();
  function handleLogout() {
    localStorage.removeItem("role");
    router.push("/login");
  }
  return (
    <nav className="admin-navbar">
      <ul>
        <li><Link href="/admin/dashboard">Dashboard</Link></li>
        <li><Link href="/admin/create">Create</Link></li>
        <li><Link href="/admin/profile">Profile</Link></li>
        <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
      </ul>
    </nav>
  );
}
