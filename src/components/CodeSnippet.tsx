'use client';
import React, { useState } from 'react';
import { GoCopy } from "react-icons/go";

interface CodeSnippetProps {
  username: string;
  theme: string;
  border: boolean;
  hideTitle: boolean;
  customTitle: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ username, theme, border, hideTitle, customTitle }) => {
  const [copySuccess, setCopySuccess] = useState('');

  // Generate URLs based on props
  const markdownUrl = `![${customTitle} Stats](https://leetcode-status.vercel.app/api/${username}?theme=${theme}&hide_title=${hideTitle}&custom_title=${customTitle})`;
  const imgUrl = `<img src="https://leetcode-status.vercel.app/api/${username}?theme=${theme}&border=${border}&hide_title=${hideTitle}&custom_title=${customTitle}" />`;

  // Function to copy code to clipboard
  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopySuccess('Code copied!');
      setTimeout(() => setCopySuccess(''), 2000); // Clear message after 2 seconds
    } catch (err) {
      setCopySuccess('Failed to copy!');
    }
  };

  return (
    <div className="dark:text-white text-black bg-gray-800 p-4 rounded-md max-w-full overflow-hidden shadow-lg">
      <div className="mb-4">
        <h4 className="text-lg  mb-2">Markdown Code</h4>
        <pre className="bg-gray-200 dark:bg-gray-700 p-3 rounded-md overflow-x-auto">
          <code className="text-gray-700 dark:text-gray-100">{markdownUrl}</code>
        </pre>
        <button
          onClick={() => copyToClipboard(markdownUrl)}
          className="mt-2 w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          type='button'
        >
          <GoCopy className='text-white'/>
        </button>
      </div>
      <div className="mb-4">
        <h4 className="text-lg  mb-2">HTML Code</h4>
        <pre className="bg-gray-200 dark:bg-gray-700 p-3 rounded-md overflow-x-auto">
          <code className="text-gray-700 dark:text-gray-100">{imgUrl}</code>
        </pre>
        <button
          onClick={() => copyToClipboard(imgUrl)}
          className="mt-2 w-full sm:w-auto px-4 py-2 bg-blue-500 text-white dark:text-white rounded-md hover:bg-blue-600"
          type='button'
        >
          <GoCopy/>
        </button>
      </div>
      {copySuccess && <p className="mt-2 text-green-500">{copySuccess}</p>}
    </div>
  );
};

export default CodeSnippet;
