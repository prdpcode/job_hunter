'use client';

import { Search, Briefcase, FileText, Calendar, TrendingUp } from 'lucide-react';
import { DashboardStats } from '@/lib/types';

interface StatsBarProps {
  stats: DashboardStats;
}

export default function StatsBar({ stats }: StatsBarProps) {
  const statItems = [
    {
      label: 'Jobs Found',
      value: stats.totalJobsFound,
      icon: Search,
      color: 'text-blue-400'
    },
    {
      label: 'Jobs Saved',
      value: stats.jobsSaved,
      icon: Briefcase,
      color: 'text-green-400'
    },
    {
      label: 'Applications',
      value: stats.applicationsSent,
      icon: FileText,
      color: 'text-purple-400'
    },
    {
      label: 'Interviews',
      value: stats.interviewsScheduled,
      icon: Calendar,
      color: 'text-yellow-400'
    },
    {
      label: 'Day Streak',
      value: stats.currentStreak,
      icon: TrendingUp,
      color: 'text-orange-400'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {statItems.map((item, index) => (
        <div
          key={index}
          className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center"
        >
          <item.icon className={`w-6 h-6 mx-auto mb-2 ${item.color}`} />
          <div className="text-2xl font-bold text-white">{item.value}</div>
          <div className="text-sm text-gray-400">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
