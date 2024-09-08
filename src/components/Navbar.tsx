'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaGithub, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { IoOpenOutline } from 'react-icons/io5';
import ThemeToggle from './ThemeToggle';
import Tooltip from './Tooltip';

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleTheme }) => {
  const [tooltipMessage, setTooltipMessage] = useState<string | null>(null);

  useEffect(() => {
    const visitedBefore = localStorage.getItem('visited');

    if (!visitedBefore) {
      // First-time visitor: show first message for 3 seconds
      setTooltipMessage("Welcome! This example demonstrates using Cloudflare Workers to generate a customizable LeetCode status image. Visit the GitHub documentation to explore features like logo customization and animation, or contribute if interested.");
      setTimeout(() => {
        // Show second message after the first one
        setTooltipMessage("Don't forget to visit the documentation and contribute.");
      }, 3000);
      // Hide the tooltip after 6 seconds
      setTimeout(() => {
        setTooltipMessage(null);
        localStorage.setItem('visited', 'true');
      }, 6000);
    } else {
      // Returning visitor: show only second message for 3 seconds
      setTooltipMessage("Don't forget to visit the documentation and contribute.");
      setTimeout(() => setTooltipMessage(null), 3000);
    }
  }, []);

  return (
    <nav className={`bg-blue-500 p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg relative`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="dark:text-white text-lg font-bold">
          LeetCode Status
        </Link>
        <Link
          href="https://github.com/iyehah/leetcode-status"
          className="flex flex-row items-center justify-between space-x-4 sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Document<IoOpenOutline className="text-white" />
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
      {tooltipMessage && (
        <Tooltip message={tooltipMessage} />
      )}
    </nav>
  );
};

export default Navbar;
