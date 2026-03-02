'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, FileText, Copy, Trash2, Calendar } from 'lucide-react';
import { CoverLetter } from '@/lib/types';
import { LocalStorage } from '@/lib/localStorage';
import Link from 'next/link';

export default function CoverLetterPage() {
  const [coverLetters, setCoverLetters] = useState<CoverLetter[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const letters = LocalStorage.getCoverLetters();
    setCoverLetters(letters);
  }, []);

  const handleCopy = async (letter: string) => {
    try {
      await navigator.clipboard.writeText(letter);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleDelete = (id: string) => {
    LocalStorage.deleteCoverLetter(id);
    setCoverLetters(prev => prev.filter(letter => letter.id !== id));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link 
              href="/"
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </Link>
            <div className="flex items-center space-x-2">
              <FileText className="w-6 h-6 text-purple-400" />
              <h1 className="text-3xl font-bold">Cover Letters</h1>
            </div>
          </div>
          <div className="text-gray-400">
            {coverLetters.length} letters saved
          </div>
        </div>

        {coverLetters.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-12 text-center">
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <h3 className="text-xl font-semibold mb-2">No cover letters yet</h3>
            <p className="text-gray-400 mb-4">
              Generate cover letters for jobs you're interested in and they'll appear here.
            </p>
            <Link
              href="/"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>Find Jobs</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {coverLetters.map((letter) => (
              <div key={letter.id} className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {letter.jobTitle}
                    </h3>
                    <p className="text-gray-400 mb-2">{letter.company}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(letter.generatedDate)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleCopy(letter.letter)}
                      className="flex items-center space-x-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </button>
                    
                    <button
                      onClick={() => handleDelete(letter.id)}
                      className="flex items-center space-x-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-4">
                  <pre className="text-white whitespace-pre-wrap font-sans text-sm leading-relaxed">
                    {letter.letter}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
