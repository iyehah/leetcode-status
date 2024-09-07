// components/ThemeToggle.tsx
'use client';
import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, toggleTheme }) => (
  <button
    onClick={toggleTheme}
    className="p-2 rounded text-white bg-blue-500"
  >
    {isDarkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
  </button>
);

export default ThemeToggle;
