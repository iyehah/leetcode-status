// src/app/layout.tsx
'use client'; // Ensure client-side rendering

import Navbar from '../components/Navbar';
import './globals.css';
import { ReactNode, useState, useEffect } from 'react';

const RootLayout = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load the theme from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem('isDarkMode');
    if (storedTheme === 'true') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle the theme and store the preference in localStorage
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('isDarkMode', JSON.stringify(newTheme));
  };

  return (
    <html lang="en">
      <body className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
