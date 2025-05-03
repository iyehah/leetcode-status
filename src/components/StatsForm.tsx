import { useState, useEffect } from 'react';
import { FaCopy, FaDownload, FaPalette, FaUser, FaTextHeight, FaBorderAll, FaImage, FaExclamationTriangle } from 'react-icons/fa';
import domToImage from 'dom-to-image';
import he from 'he';

const themes = ['light', 'dark', 'transparent', 'neon', 'pastel', 'gradient'];
const layouts = ['card', 'graph'];
const BASE_URL = 'https://leetcode-status.vercel.app/';

export default function StatsForm() {
  const [formData, setFormData] = useState({
    username: '',
    theme: 'light',
    layout: 'card',
    border: true,
    hideTitle: false,
    customTitle: '',
    logo: true,
    logoColor: 'default',
    animation: true,
    animationDuration: '2s',
    barWidth: 50,
    barColor: '',
    textColor: '',
    showStats: false,
    gradientStart: '#6366F1',
    gradientEnd: '#A855F7',
  });
  const [previewUrl, setPreviewUrl] = useState('');
  const [copied, setCopied] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const buildQuery = () => {
      const params = new URLSearchParams();
      params.append('theme', formData.theme);
      params.append('layout', formData.layout);
      params.append('border', String(formData.border));
      params.append('hide_title', String(formData.hideTitle));
      if (formData.customTitle) params.append('custom_title', he.encode(formData.customTitle));
      params.append('logo', String(formData.logo));
      if (formData.logoColor !== 'default') params.append('logo_color', he.encode(formData.logoColor));
      params.append('animation', String(formData.animation));
      params.append('animation_duration', formData.animationDuration);
      if (formData.layout === 'graph') params.append('bars_width', String(formData.barWidth));
      if (formData.barColor) params.append('bar_color', he.encode(formData.barColor));
      if (formData.textColor) params.append('text_color', he.encode(formData.textColor));
      params.append('show_stats', String(formData.showStats));
      if (formData.theme === 'gradient') {
        params.append('gradient_start', he.encode(formData.gradientStart));
        params.append('gradient_end', he.encode(formData.gradientEnd));
      }
      return params.toString();
    };

    if (formData.username) {
      const endpoint = formData.layout === 'card' ? `/api/card/${formData.username}` : `/api/graph/${formData.username}`;
      const url = `${BASE_URL}${endpoint}?${buildQuery()}`;
      setPreviewUrl(url);
      setError('');
      // Test API fetch
      fetch(url)
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch preview');
        })
        .catch(() => setError('Error fetching preview. Check username or API status.'));
    } else {
      setPreviewUrl('');
      setError('Please enter a username.');
    }
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleCopy = async (type: 'html' | 'markdown' | 'url') => {
    if (!previewUrl) {
      setError('No preview available to copy.');
      return;
    }
    const text = type === 'html'
      ? `<img src="${previewUrl}" alt="LeetCode Stats"/>`
      : type === 'markdown'
      ? `![LeetCode Stats](${previewUrl})`
      : previewUrl;

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(type);
      setTimeout(() => setCopied(''), 2000);
    } catch (err) {
      setError('Failed to copy. Try again.');
      console.error('Copy error:', err);
    }
  };

  const handleDownload = async () => {
    const node = document.getElementById('preview');
    if (!node) {
      setError('Preview not available for download.');
      return;
    }
    try {
      const dataUrl = await domToImage.toPng(node);
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${formData.username}-leetcode-stats.png`;
      link.click();
    } catch (error) {
      setError('Failed to download image.');
      console.error('Download error:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <form className="space-y-6">
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg flex items-center">
            <FaExclamationTriangle className="mr-2" /> {error}
          </div>
        )}
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center">
            <FaUser className="mr-2" /> User
          </h3>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={`mt-1 block w-full border-2 ${formData.username ? 'border-gray-300' : 'border-red-400'} rounded-lg shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
              placeholder="e.g., iyehah"
              required
              aria-required="true"
            />
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center">
            <FaPalette className="mr-2" /> Appearance
          </h3>
          <div>
            <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
              Theme
            </label>
            <select
              id="theme"
              name="theme"
              value={formData.theme}
              onChange={handleInputChange}
              className="mt-1 block w-full border-2 border-gray-300 rounded-lg shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            >
              {themes.map((theme) => (
                <option key={theme} value={theme}>
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </option>
              ))}
            </select>
          </div>
          {formData.theme === 'gradient' && (
            <>
              <div>
                <label htmlFor="gradientStart" className="block text-sm font-medium text-gray-700">
                  Gradient Start Color
                </label>
                <input
                  type="color"
                  id="gradientStart"
                  name="gradientStart"
                  value={formData.gradientStart}
                  onChange={handleInputChange}
                  className="mt-1 block w-full h-10 border-2 border-gray-300 rounded-lg shadow-sm hover:border-blue-400 transition-all duration-200"
                />
              </div>
              <div>
                <label htmlFor="gradientEnd" className="block text-sm font-medium text-gray-700">
                  Gradient End Color
                </label>
                <input
                  type="color"
                  id="gradientEnd"
                  name="gradientEnd"
                  value={formData.gradientEnd}
                  onChange={handleInputChange}
                  className="mt-1 block w-full h-10 border-2 border-gray-300 rounded-lg shadow-sm hover:border-blue-400 transition-all duration-200"
                />
              </div>
            </>
          )}
          <div>
            <label htmlFor="textColor" className="block text-sm font-medium text-gray-700">
              Text Color (Optional)
            </label>
            <input
              type="color"
              id="textColor"
              name="textColor"
              value={formData.textColor || '#000000'}
              onChange={handleInputChange}
              className="mt-1 block w-full h-10 border-2 border-gray-300 rounded-lg shadow-sm hover:border-blue-400 transition-all duration-200"
            />
          </div>
          <div>
            <label htmlFor="barColor" className="block text-sm font-medium text-gray-700">
              Bar Color (Optional)
            </label>
            <input
              type="color"
              id="barColor"
              name="barColor"
              value={formData.barColor || '#000000'}
              onChange={handleInputChange}
              className="mt-1 block w-full h-10 border-2 border-gray-300 rounded-lg shadow-sm hover:border-blue-400 transition-all duration-200"
            />
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center">
            <FaImage className="mr-2" /> Layout
          </h3>
          <div>
            <label htmlFor="layout" className="block text-sm font-medium text-gray-700">
              Layout
            </label>
            <select
              id="layout"
              name="layout"
              value={formData.layout}
              onChange={handleInputChange}
              className="mt-1 block w-full border-2 border-gray-300 rounded-lg shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            >
              {layouts.map((layout) => (
                <option key={layout} value={layout}>
                  {layout.charAt(0).toUpperCase() + layout.slice(1)}
                </option>
              ))}
            </select>
          </div>
          {formData.layout === 'graph' && (
            <div>
              <label htmlFor="barWidth" className="block text-sm font-medium text-gray-700">
                Bar Width (20-100)
              </label>
              <input
                type="number"
                id="barWidth"
                name="barWidth"
                value={formData.barWidth}
                onChange={handleInputChange}
                min="20"
                max="100"
                className="mt-1 block w-full border-2 border-gray-300 rounded-lg shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
          )}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="border"
              name="border"
              checked={formData.border}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="border" className="ml-2 text-sm font-medium text-gray-700">
              Show Border
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="animation"
              name="animation"
              checked={formData.animation}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="animation" className="ml-2 text-sm font-medium text-gray-700">
              Enable Animation
            </label>
          </div>
          {formData.animation && (
            <div>
              <label htmlFor="animationDuration" className="block text-sm font-medium text-gray-700">
                Animation Duration (e.g., 2s)
              </label>
              <input
                type="text"
                id="animationDuration"
                name="animationDuration"
                value={formData.animationDuration}
                onChange={handleInputChange}
                className="mt-1 block w-full border-2 border-gray-300 rounded-lg shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
          )}
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center">
            <FaTextHeight className="mr-2" /> Title & Logo
          </h3>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="hideTitle"
              name="hideTitle"
              checked={formData.hideTitle}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="hideTitle" className="ml-2 text-sm font-medium text-gray-700">
              Hide Title
            </label>
          </div>
          {!formData.hideTitle && (
            <div>
              <label htmlFor="customTitle" className="block text-sm font-medium text-gray-700">
                Custom Title (Optional)
              </label>
              <input
                type="text"
                id="customTitle"
                name="customTitle"
                value={formData.customTitle}
                onChange={handleInputChange}
                className="mt-1 block w-full border-2 border-gray-300 rounded-lg shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="e.g., Iyehah Hacen"
              />
            </div>
          )}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="logo"
              name="logo"
              checked={formData.logo}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="logo" className="ml-2 text-sm font-medium text-gray-700">
              Show Logo
            </label>
          </div>
          {formData.logo && (
            <div>
              <label htmlFor="logoColor" className="block text-sm font-medium text-gray-700">
                Logo Color
              </label>
              <select
                id="logoColor"
                name="logoColor"
                value={formData.logoColor}
                onChange={handleInputChange}
                className="mt-1 block w-full border-2 border-gray-300 rounded-lg shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option value="default">Default</option>
                <option value="theme">Theme</option>
              </select>
            </div>
          )}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showStats"
              name="showStats"
              checked={formData.showStats}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="showStats" className="ml-2 text-sm font-medium text-gray-700">
              Show Stats (Rank, Acceptance)
            </label>
          </div>
        </div>
      </form>
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Preview</h3>
        {previewUrl && !error ? (
          <div id="preview" className="bg-white p-4 rounded-lg shadow-md">
            <img src={previewUrl} alt="LeetCode Stats Preview" className="max-w-full h-auto" />
            <div className="mt-4 flex flex-wrap gap-1">
              <button
                onClick={() => handleCopy('html')}
                className="flex items-center px-2 py-1 bg-blue-500 text-white rounded-lg hover:scale-105 transition-all duration-200"
                aria-label="Copy HTML code"
              >
                <FaCopy className="mr-2" />HTML {copied === 'html' && <span className="ml-2 text-sm">Copied!</span>}
              </button>
              <button
                onClick={() => handleCopy('markdown')}
                className="flex items-center px-2 py-1 bg-blue-500 text-white rounded-lg hover:scale-105 transition-all duration-200"
                aria-label="Copy Markdown code"
              >
                <FaCopy className="mr-2" />Markdown {copied === 'markdown' && <span className="ml-2 text-sm">Copied!</span>}
              </button>
              <button
                onClick={() => handleCopy('url')}
                className="flex items-center px-2 py-1 bg-blue-500 text-white rounded-lg hover:scale-105 transition-all duration-200"
                aria-label="Copy URL"
              >
                <FaCopy className="mr-2" />URL {copied === 'url' && <span className="ml-2 text-sm">Copied!</span>}
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center px-2 py-1 bg-blue-500 text-white rounded-lg hover:scale-105 transition-all duration-200"
                aria-label="Download as PNG"
              >
                <FaDownload className="mr-2" />PNG
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">{error || 'Enter a username to see the preview.'}</p>
        )}
      </div>
    </div>
  );
}