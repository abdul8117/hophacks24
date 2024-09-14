import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-300 to-white fixed top-0 left-0 w-full py-4 shadow-md backdrop-blur-lg z-50 border-b border-transparent">
      <div className="container mx-auto flex items-center justify-center">
        {/* Website Name */}
        <div className="text-2xl font-bold text-black">
          <Link href="/">So Much Shit App</Link>
        </div>
        
        {/* Navigation Links */}
        <div className="hidden md:flex flex-1 justify-center space-x-8">
          <Link href="/" className="text-black hover:text-gray-400 transition duration-300">Home</Link>
          <Link href="/about" className="text-black hover:text-gray-400 transition duration-300">About</Link>
          <Link href="/services" className="text-black hover:text-gray-400 transition duration-300">Services</Link>
          <Link href="/contact" className="text-black hover:text-gray-400 transition duration-300">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
