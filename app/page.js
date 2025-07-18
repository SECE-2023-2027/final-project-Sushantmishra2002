"use client";
import { useRouter } from "next/navigation";
import "./styles/admin.css";

export default function Home() {
  const router = useRouter();
  return (
    <div className="login-container">
      <div className="login-form" style={{gap: '1.5rem'}}>
        <h2>Welcome to the Blog Platform</h2>
        <button onClick={() => router.push("/userLogin")}>Login as User</button>
        <button onClick={() => router.push("/userSignup")}>Signup as User</button>
        <button onClick={() => router.push("/adminLogin")}>Login as Admin</button>
      </div>
    </div>
  );
}
