"use client"
import Head from 'next/head';
import { FaCode, FaInfoCircle } from 'react-icons/fa';
import StatsForm from '@/components/StatsForm';

export default function Docs() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>LeetCode Status Documentation</title>
        <meta name="description" content="Customize and preview your LeetCode stats card or graph" />
      </Head>
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold flex items-center">
            <FaCode className="mr-2" />LeetCode Status Documentation
          </h1>
          <p className="mt-2">Create and customize dynamic LeetCode stats cards for your GitHub profile or website.</p>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FaInfoCircle className="mr-2" /> Get Started
          </h2>
          <p className="mb-4">
            Use the form below to customize your LeetCode stats card or graph. Enter your username, select a theme, and adjust options to preview and download your stats.
          </p>
          <StatsForm />
        </section>
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>Developed by <a href="https://github.com/iyehah" className="underline">Iyehah Hacen</a></p>
          <p>© 2025 LeetCode Status. Licensed under MIT.</p>
          <a href="https://github.com/iyehah/leetcode-status" className="underline">GitHub Repository</a>
        </div>
      </footer>
    </div>
  );
}