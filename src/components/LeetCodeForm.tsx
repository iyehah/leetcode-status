'use client';
import React, { useState } from 'react';
import Button from './Button';
import { type } from 'os';

interface LeetCodeFormProps {
  onSubmit: (username: string,type: string, theme: string, border: boolean, hideTitle: boolean, customTitle: string) => void;
}

const LeetCodeForm: React.FC<LeetCodeFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [type, setType] = useState('card');
  const [theme, setTheme] = useState('light'); // Default theme is light
  const [border, setBorder] = useState(true); // Default border is true
  const [hideTitle, setHideTitle] = useState(true); // Default hideTitle is true
  const [customTitle, setCustomTitle] = useState(''); // Custom title state

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(username,type, theme, border, hideTitle, customTitle); // Pass all form values
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-2 sm:px-6 md:px-8 lg:px-10 rounded max-w-md mx-auto text-black dark:text-white dark:bg-gray-800 shadow-lg">
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium ">
          LeetCode Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-700 rounded-md dark:text-gray-800"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="type" className="block text-sm font-medium ">
          Type
        </label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md dark:text-gray-800"
        >
          <option value="card">Card (Default)</option>
          <option value="graph">Graph</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="theme" className="block text-sm font-medium ">
          Theme
        </label>
        <select
          id="theme"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md dark:text-gray-800"
        >
          <option value="light">Light (Default)</option>
          <option value="dark">Dark</option>
          <option value="transparent">Transparent</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="border" className="block text-sm font-medium ">
          Border
        </label>
        <select
          id="border"
          value={border ? 'true' : 'false'}
          onChange={(e) => setBorder(e.target.value === 'true')}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md dark:text-gray-800"
        >
          <option value="true">True (Default)</option>
          <option value="false">False</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="hideTitle" className="block text-sm font-medium ">
          Hide Title
        </label>
        <select
          id="hideTitle"
          value={hideTitle ? 'true' : 'false'}
          onChange={(e) => setHideTitle(e.target.value === 'true')}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md dark:text-gray-800"
        >
          <option value="false">False (Default)</option>
          <option value="true">True</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="customTitle" className="block text-sm font-medium ">
          Custom Title
        </label>
        <input
          type="text"
          id="customTitle"
          value={customTitle}
          onChange={(e) => setCustomTitle(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md dark:text-gray-800"
        />
      </div>
      <div className="flex flex-col items-center">
        <Button />
      </div>
    </form>
  );
};

export default LeetCodeForm;
