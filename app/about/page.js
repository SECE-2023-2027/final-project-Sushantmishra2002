import React from 'react';

export default function AboutPage() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-12 text-center">
      <h1 className="text-4xl font-extrabold mb-6 text-blue-900 tracking-tight drop-shadow-sm">About <span className="text-blue-600">FormalBlog</span></h1>
      <p className="text-lg text-gray-700 mb-10 leading-relaxed">
        Welcome to ScreenNote, your personal space for organizing screenplay notes with ease, clarity, and style.

This website is designed for screenwriters, filmmakers, and storytellers who want a simple yet powerful tool to manage all their script ideas, notes, and drafts in one place.

Whether you are jotting down quick plot ideas, character arcs, or full scenes, ScreenNote helps you stay organized and creative. With beautifully designed note cards, full-screen detail views, and smooth editing features, your writing process becomes more focused and enjoyable.
       </p>
      <div className="relative bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl border border-blue-100 p-8 md:p-10 mx-auto max-w-2xl flex flex-col items-center">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center shadow-md">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20.5C7.305 20.5 3.5 16.695 3.5 12S7.305 3.5 12 3.5 20.5 7.305 20.5 12 16.695 20.5 12 20.5z" /></svg>
        </div>
        <h2 className="text-2xl font-bold mb-3 text-blue-800 mt-8">Our Vision</h2>
        <p className="text-gray-600 mb-2">
          As a developer and movie enthusiast, I wanted to create a platform where writers could store their screenplay notes digitally—without clutter, distractions, or complicated tools. This project reflects my passion for clean design, practical features, and smooth user experience.
        </p>
        <span className="inline-block mt-4 px-4 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">Empowering Professional Growth</span>
      </div>
    </section>
  );
}
