'use client';

import { useState, useEffect } from 'react';
import { Search, Briefcase, FileText, Calendar, TrendingUp } from 'lucide-react';
import JobSearch from './JobSearch';
import JobCards from './JobCards';
import StatsBar from './StatsBar';
import { Job, DashboardStats } from '@/lib/types';
import { LocalStorage } from '@/lib/localStorage';

export default function Dashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    totalJobsFound: 0,
    jobsSaved: 0,
    applicationsSent: 0,
    interviewsScheduled: 0,
    currentStreak: 0
  });

  useEffect(() => {
    const savedStats = LocalStorage.getStats();
    setStats(savedStats);
  }, []);

  const handleJobsFetched = (fetchedJobs: Job[]) => {
    setJobs(fetchedJobs);
    LocalStorage.updateStats({ totalJobsFound: fetchedJobs.length });
    setStats(prev => ({ ...prev, totalJobsFound: fetchedJobs.length }));
  };

  const handleJobSaved = () => {
    const newStats = LocalStorage.getStats();
    setStats(newStats);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Job Hunter</h1>
          <p className="text-gray-400">Find and track your frontend developer opportunities</p>
        </header>

        <StatsBar stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-1">
            <JobSearch onJobsFetched={handleJobsFetched} setLoading={setLoading} />
          </div>
          <div className="lg:col-span-2">
            <JobCards 
              jobs={jobs} 
              loading={loading} 
              onJobSaved={handleJobSaved}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
