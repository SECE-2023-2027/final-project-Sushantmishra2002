
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "../styles/user.css";

export default function UserSignup() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", dob: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    // Basic validation
    if (!form.name || !form.email || !form.dob || !form.password || !form.confirm) {
      setError("All required fields must be filled.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    // Age validation
    const dobDate = new Date(form.dob);
    const age = (Date.now() - dobDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
    if (age < 14) {
      setError("You must be at least 14 years old.");
      return;
    }
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          dob: form.dob,
          password: form.password
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed");
        return;
      }
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => router.push("/userLogin"), 1500);
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>User Signup</h2>
        <input name="name" type="text" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="phone" type="tel" placeholder="Phone (optional)" value={form.phone} onChange={handleChange} />
        <input name="dob" type="date" placeholder="Date of Birth" value={form.dob} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <input name="confirm" type="password" placeholder="Confirm Password" value={form.confirm} onChange={handleChange} required />
        {error && <div className="error">{error}</div>}
        {success && <div style={{ color: 'green', fontSize: '0.95rem', marginBottom: '0.5rem' }}>{success}</div>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
