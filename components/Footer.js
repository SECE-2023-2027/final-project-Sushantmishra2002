import Link from 'next/link';
export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-900 via-blue-950 to-blue-900 text-gray-100 mt-16 border-t border-blue-900/30 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
        <div className="flex items-center gap-2 mb-2 md:mb-0">
          <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20.5C7.305 20.5 3.5 16.695 3.5 12S7.305 3.5 12 3.5 20.5 7.305 20.5 12 16.695 20.5 12 20.5z" /></svg>
          <span className="font-extrabold text-lg tracking-tight text-white">FormalBlog</span>
          <span className="text-gray-400 font-medium ml-2">&copy; {new Date().getFullYear()}</span>
        </div>
        <div className="flex space-x-6 text-sm md:text-base">
          <Link href="/privacy-policy" className="hover:text-blue-300 transition-colors duration-150">Privacy Policy</Link>
          <Link href="/terms-of-service" className="hover:text-blue-300 transition-colors duration-150">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
