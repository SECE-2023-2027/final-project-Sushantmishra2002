import React from 'react';
import Link from 'next/link';
// import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-900 tracking-tight">FormalBlog</Link>
        <ul className="flex space-x-8 text-lg font-medium">
              <li><Link href="/" className="text-gray-700 hover:text-blue-700 transition">Home</Link></li>
              <li><Link href="/blog" className="text-gray-700 hover:text-blue-700 transition">Blog</Link></li>
              <li><Link href="/articles" className="text-gray-700 hover:text-blue-700 transition">Articles</Link></li>
              <li><Link href="/about" className="text-gray-700 hover:text-blue-700 transition">About</Link></li>
              <li><Link href="/contact" className="text-gray-700 hover:text-blue-700 transition">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
}
