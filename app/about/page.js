import React from 'react';

export default function AboutPage() {
  return (
    <section className="max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4 text-blue-900">About FormalBlog</h1>
      <p className="text-lg text-gray-700 mb-6">
        FormalBlog is dedicated to providing insightful, well-written, and aesthetically pleasing articles on formal writing, web design, and professional development. Our mission is to help readers enhance their skills and present themselves with confidence in the digital world.
      </p>
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-2 text-blue-800">Our Vision</h2>
        <p className="text-gray-600">
          To be the go-to resource for individuals seeking to improve their formal communication and digital presence.
        </p>
      </div>
    </section>
  );
}
