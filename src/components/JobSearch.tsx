'use client';

import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Job, JobFilters } from '@/lib/types';

interface JobSearchProps {
  onJobsFetched: (jobs: Job[]) => void;
  setLoading: (loading: boolean) => void;
}

export default function JobSearch({ onJobsFetched, setLoading }: JobSearchProps) {
  const [filters, setFilters] = useState<JobFilters>({
    keywords: 'angular frontend developer',
    location: 'bangalore',
    jobType: 'all',
    experience: 'all',
    salaryMin: 0,
    salaryMax: 5000000
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    
    try {
      const params = new URLSearchParams({
        keywords: filters.keywords,
        location: filters.location,
        results_per_page: '20'
      });

      const response = await fetch(`/api/jobs?${params}`);
      const data = await response.json();

      if (data.results) {
        onJobsFetched(data.results);
      } else {
        onJobsFetched([]);
      }
    } catch (error) {
      console.error('Error searching jobs:', error);
      onJobsFetched([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof JobFilters, value: string | number) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Search className="w-5 h-5" />
        Job Search
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Keywords
          </label>
          <input
            type="text"
            value={filters.keywords}
            onChange={(e) => handleInputChange('keywords', e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., angular frontend developer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Location
          </label>
          <input
            type="text"
            value={filters.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., bangalore"
          />
        </div>

        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <Filter className="w-4 h-4" />
          {showAdvanced ? 'Hide' : 'Show'} Advanced Filters
        </button>

        {showAdvanced && (
          <div className="space-y-4 pt-4 border-t border-gray-700">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Job Type
              </label>
              <select
                value={filters.jobType}
                onChange={(e) => handleInputChange('jobType', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="full-time">Full-time</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Experience Level
              </label>
              <select
                value={filters.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Levels</option>
                <option value="2-4">2-4 years</option>
                <option value="4-6">4-6 years</option>
                <option value="6+">6+ years</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Salary Range: ₹{filters.salaryMin.toLocaleString()} - ₹{filters.salaryMax.toLocaleString()}
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="10000000"
                  step="100000"
                  value={filters.salaryMax}
                  onChange={(e) => handleInputChange('salaryMax', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleSearch}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Search Jobs
        </button>
      </div>
    </div>
  );
}
