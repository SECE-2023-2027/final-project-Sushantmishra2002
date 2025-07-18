import { useState } from 'react';

export default function CreateBlogForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState(''); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !excerpt || !content) return;
    onAdd({ title, excerpt, content });
    setTitle('');
    setExcerpt('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 border border-gray-200 flex flex-col gap-4 mb-8">
      <h2 className="text-xl font-bold text-blue-900 mb-2">Create New Blog</h2>
      <input
        type="text"
        placeholder="Title"
        className="border border-gray-300 rounded px-4 py-2"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Excerpt"
        className="border border-gray-300 rounded px-4 py-2"
        value={excerpt}
        onChange={e => setExcerpt(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        className="border border-gray-300 rounded px-4 py-2"
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={5}
        required
      />
      <button type="submit" className="bg-blue-900 text-white rounded px-6 py-2 font-semibold hover:bg-blue-700 transition">Add Blog</button>
    </form>
  );
}
