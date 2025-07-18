"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "../styles/admin.css";

export default function AdminLayout({ children }) {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const role = localStorage.getItem("role");
      if (role !== "admin") {
        router.replace("/");
      }
    }
  }, []);
  return (
    <div className="admin-layout">
      <main>{children}</main>
    </div>
  );
}
