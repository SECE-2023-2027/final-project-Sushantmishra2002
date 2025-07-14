import React from 'react';

export default function ContactPage() {
  return (
    <section className="max-w-xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4 text-blue-900">Contact Us</h1>
      <p className="text-lg text-gray-700 mb-6">Have questions or want to get in touch? Fill out the form below.</p>
      <form className="bg-white rounded-lg shadow p-6 border border-gray-200 flex flex-col gap-4">
        <input type="text" placeholder="Your Name" className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" required />
        <input type="email" placeholder="Your Email" className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" required />
        <textarea placeholder="Your Message" rows="4" className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" required></textarea>
        <button type="submit" className="bg-blue-900 text-white rounded px-6 py-2 font-semibold hover:bg-blue-700 transition">Send Message</button>
      </form>
    </section>
  );
}
