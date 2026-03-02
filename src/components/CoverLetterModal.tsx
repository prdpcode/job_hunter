'use client';

import { useState, useEffect } from 'react';
import { X, Copy, RefreshCw, FileText, AlertCircle } from 'lucide-react';
import { Job } from '@/lib/types';
import { LocalStorage } from '@/lib/localStorage';

interface CoverLetterModalProps {
  job: Job;
  onClose: () => void;
}

export default function CoverLetterModal({ job, onClose }: CoverLetterModalProps) {
  const [coverLetter, setCoverLetter] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const generateCoverLetter = async () => {
    setLoading(true);
    setError('');
    setCoverLetter('');
    
    try {
      console.log('Generating cover letter for:', job.title, job.company.display_name);
      
      const response = await fetch('/api/cover-letter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobTitle: job.title,
          company: job.company.display_name,
          description: job.description
        }),
      });

      console.log('Cover letter API response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      console.log('Cover letter API response data:', data);
      
      if (data.coverLetter) {
        setCoverLetter(data.coverLetter);
        
        // Save to localStorage
        const letter = {
          id: Date.now().toString(),
          jobTitle: job.title,
          company: job.company.display_name,
          letter: data.coverLetter,
          generatedDate: new Date().toISOString()
        };
        
        LocalStorage.saveCoverLetter(letter);
        console.log('Cover letter saved to localStorage');
      } else {
        throw new Error('No cover letter generated');
      }
    } catch (error) {
      console.error('Error generating cover letter:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate cover letter. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(coverLetter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleRegenerate = () => {
    setCoverLetter('');
    setError('');
    generateCoverLetter();
  };

  // Auto-generate on mount
  useEffect(() => {
    generateCoverLetter();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 border border-gray-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-blue-400" />
            <div>
              <h3 className="text-lg font-semibold">Cover Letter Generator</h3>
              <p className="text-sm text-gray-400">
                {job.title} at {job.company.display_name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-400">Generating your cover letter...</p>
              </div>
            </div>
          ) : error ? (
            <div className="space-y-4">
              <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <div>
                    <h4 className="text-red-400 font-medium">Generation Failed</h4>
                    <p className="text-red-300 text-sm mt-1">{error}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleRegenerate}
                  disabled={loading}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Try Again</span>
                </button>
              </div>
            </div>
          ) : coverLetter ? (
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <pre className="text-white whitespace-pre-wrap font-sans text-sm leading-relaxed">
                  {coverLetter}
                </pre>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleCopy}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
                
                <button
                  onClick={handleRegenerate}
                  disabled={loading}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-colors disabled:opacity-50"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Regenerate</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <p className="text-gray-400">Preparing your cover letter...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
