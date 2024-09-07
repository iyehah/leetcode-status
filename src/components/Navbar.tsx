// components/Navbar.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import { FaGithub, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { IoOpenOutline } from "react-icons/io5";
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <nav className={`bg-blue-500 p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-bold">
          LeetCode Status
        </Link>
        <Link href="https://github.com/iyehah/leetcode-status"
          type="submit"
          className=" flex flex-row items-center justify-between w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Documentation on GitHub<IoOpenOutline className='text-white'/>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="https://github.com/iyehah" target="_blank" className="dark:text-white text-black">
            <FaGithub size={24} />
          </Link>
          <Link href="https://facebook.com/Iyehah.Hacen" target="_blank" className="dark:text-white text-black">
            <FaFacebook size={24} />
          </Link>
          <Link href="https://linkedin.com/in/iyehah" target="_blank" className="dark:text-white text-black">
            <FaLinkedin size={24} />
          </Link>
          <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
