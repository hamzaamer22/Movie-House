import Link from 'next/link';
import { useState } from 'react';

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-indigo-600">
            Movie House
          </Link>
          <div className="hidden md:flex space-x-4">
            <Link href="/" className="text-gray-800 hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <Link href="/movies" className="text-gray-800 hover:text-indigo-600 transition-colors">
              Movies
            </Link>
            <Link href="/genres" className="text-gray-800 hover:text-indigo-600 transition-colors">
              Genres
            </Link>
            <Link href="/director" className="text-gray-800 hover:text-indigo-600 transition-colors">
              Directors
            </Link>
          </div>
          <button
            className="md:hidden text-gray-800 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden bg-white px-4 py-2">
            <Link href="/" className="block py-2 text-gray-800 hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <Link href="/movies" className="block py-2 text-gray-800 hover:text-indigo-600 transition-colors">
              Movies
            </Link>
            <Link href="/genres" className="block py-2 text-gray-800 hover:text-indigo-600 transition-colors">
              Genres
            </Link>
            <Link href="/director" className="block py-2 text-gray-800 hover:text-indigo-600 transition-colors">
              Directors
            </Link>
            <Link href="/help" className="block py-2 text-gray-800 hover:text-indigo-600 transition-colors">
              Help
            </Link>
          </div>
        )}
      </nav>
      <main>{children}</main>
    </div>
  );
}