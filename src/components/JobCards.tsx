'use client';

import { useState } from 'react';
import { Briefcase, ExternalLink, Bookmark, FileText, Loader2, MapPin, DollarSign, Clock } from 'lucide-react';
import JobCard from './JobCard';
import { Job } from '@/lib/types';

interface JobCardsProps {
  jobs: Job[];
  loading: boolean;
  onJobSaved: () => void;
}

export default function JobCards({ jobs, loading, onJobSaved }: JobCardsProps) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-800 rounded-full animate-pulse"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-800 rounded animate-pulse w-3/4"></div>
                <div className="h-3 bg-gray-800 rounded animate-pulse w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-12 text-center">
        <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-600" />
        <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
        <p className="text-gray-400">Try adjusting your search filters to find more opportunities.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Found {jobs.length} Jobs</h2>
      </div>
      
      {jobs.map((job) => (
        <JobCard 
          key={job.id} 
          job={job} 
          onSaved={onJobSaved}
        />
      ))}
    </div>
  );
}
