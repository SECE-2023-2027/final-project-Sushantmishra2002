import Link from 'next/link';
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-100 mt-12 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <span className="font-semibold text-lg">FormalBlog</span> &copy; {new Date().getFullYear()}
        </div>
        <div className="flex space-x-6">
                    <Link href="/privacy-policy" className="hover:text-blue-400 transition">Privacy Policy</Link>
                    <Link href="/terms-of-service" className="hover:text-blue-400 transition">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
