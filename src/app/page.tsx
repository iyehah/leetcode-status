'use client';
import React, { useState, useEffect } from 'react';
import LeetCodeCard from '../components/LeetCodeCard';
import LeetCodeForm from '../components/LeetCodeForm';
import CodeSnippet from '../components/CodeSnippet';
import Navbar from '../components/Navbar';

export default function Home() {
  const [username, setUsername] = useState('');
  const [theme, setTheme] = useState('light');
  const [border, setBorder] = useState(true);
  const [hideTitle, setHideTitle] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const handleSubmit = (username: string, theme: string, border: boolean, hideTitle: boolean, customTitle: string) => {
    setUsername(username);
    setTheme(theme);
    setBorder(border);
    setHideTitle(hideTitle);
    setCustomTitle(customTitle);
    setSubmitted(true);
  };

  return (
      <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto p-0 space-y-4 md:space-y-0 md:space-x-4">
        <div className="rounded p-4 flex-1">
          <LeetCodeForm onSubmit={handleSubmit} />
        </div>
        <div className="flex flex-col flex-1 rounded p-4 space-y-4 mx-auto max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
          {submitted && (
            <>
              <LeetCodeCard
                username={username}
                theme={theme}
                border={border}
                hide_title={hideTitle}
                custom_title={customTitle}
              />
              <CodeSnippet
                username={username}
                theme={theme}
                border={border}
                hideTitle={hideTitle}
                customTitle={customTitle}
              />
            </>
          )}
        </div>
      </div>
  );
}
