"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsAdmin(localStorage.getItem('role') === 'admin');
    const userData = localStorage.getItem('user');
    setUser(userData ? JSON.parse(userData) : null);
  }, [pathname]);

  function handleLogout() {
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    setIsAdmin(false);
    setUser(null);
    router.push('/');
  }

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md border-b border-gray-200 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-900 tracking-tight">ScreenNote</Link>
        <ul className="flex space-x-8 text-lg font-medium items-center">
          {isAdmin && (
            <>
              <li><Link href="/admin/dashboard" className="text-gray-700 hover:text-blue-700 transition">Dashboard</Link></li>
              <li><Link href="/admin/create" className="text-gray-700 hover:text-blue-700 transition">Create</Link></li>
              <li><Link href="/admin/profile" className="text-gray-700 hover:text-blue-700 transition">Profile</Link></li>
            </>
          )}
          {user && !isAdmin && (
            <>
              <li><Link href="/listofblogs" className="text-gray-700 hover:text-blue-700 transition">Notes</Link></li>
              <li><Link href="/create" className="text-gray-700 hover:text-blue-700 transition">Create</Link></li>
              <li><Link href="/userProfile" className="text-gray-700 hover:text-blue-700 transition">Profile</Link></li>
            </>
          )}
          <li><Link href="/terms&Conditions" className="text-gray-700 hover:text-blue-700 transition">Terms & Conditions</Link></li>
          {(isAdmin || user) && (
            <li>
              <button
                onClick={handleLogout}
                className="ml-2 px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-800 transition border-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
