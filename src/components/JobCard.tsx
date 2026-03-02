'use client';

import { useState } from 'react';
import { ExternalLink, Bookmark, FileText, MapPin, DollarSign, Clock, Building, Check } from 'lucide-react';
import { Job } from '@/lib/types';
import { calculateMatchScore, getMatchBadge, extractSkills, timeAgo, getCompanyLogo } from '@/lib/utils';
import { LocalStorage } from '@/lib/localStorage';
import CoverLetterModal from './CoverLetterModal';

interface JobCardProps {
  job: Job;
  onSaved: () => void;
}

export default function JobCard({ job, onSaved }: JobCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [showCoverLetterModal, setShowCoverLetterModal] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  const matchScore = calculateMatchScore(job.description);
  const matchBadge = getMatchBadge(matchScore);
  const skills = extractSkills(job.description);
  const companyLogo = getCompanyLogo(job.company.display_name);

  const handleSaveJob = () => {
    const trackedJob = {
      ...job,
      savedDate: new Date().toISOString(),
      status: 'saved' as const
    };
    
    LocalStorage.saveTrackedJob(trackedJob);
    setIsSaved(true);
    onSaved();
  };

  const handleMarkAsApplied = () => {
    setIsApplying(true);
    const trackedJob = {
      ...job,
      savedDate: new Date().toISOString(),
      status: 'applied' as const
    };
    
    LocalStorage.saveTrackedJob(trackedJob);
    setIsSaved(true);
    setIsApplying(false);
    onSaved();
  };

  const handleGenerateCoverLetter = () => {
    setShowCoverLetterModal(true);
  };

  return (
    <>
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center overflow-hidden">
              <img 
                src={companyLogo} 
                alt={job.company.display_name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.innerHTML = `<Building class="w-6 h-6 text-gray-600" />`;
                }}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{job.title}</h3>
              <p className="text-gray-400">{job.company.display_name}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs font-medium text-white ${matchBadge.color} rounded`}>
              {matchBadge.text}
            </span>
            <span className="text-sm text-gray-400">{matchScore}%</span>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>{job.location.display_name}</span>
          </div>
          {job.salary_min && (
            <div className="flex items-center space-x-1">
              <DollarSign className="w-4 h-4" />
              <span>₹{job.salary_min.toLocaleString()}</span>
            </div>
          )}
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{timeAgo(job.created)}</span>
          </div>
        </div>

        <p className="text-gray-300 mb-4 line-clamp-2">
          {job.description.substring(0, 150)}...
        </p>

        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium bg-gray-800 text-gray-300 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center space-x-3">
          <button
            onClick={() => window.open(job.redirect_url, '_blank')}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Job</span>
          </button>
          
          {!isSaved ? (
            <button
              onClick={handleSaveJob}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-colors text-sm"
            >
              <Bookmark className="w-4 h-4" />
              <span>Save Job</span>
            </button>
          ) : (
            <button
              onClick={handleMarkAsApplied}
              disabled={isApplying}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors text-sm disabled:opacity-50"
            >
              {isApplying ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Check className="w-4 h-4" />
              )}
              <span>{isApplying ? 'Saving...' : 'Mark as Applied'}</span>
            </button>
          )}
          
          <button
            onClick={handleGenerateCoverLetter}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors text-sm"
          >
            <FileText className="w-4 h-4" />
            <span>Cover Letter</span>
          </button>
        </div>
      </div>

      {showCoverLetterModal && (
        <CoverLetterModal
          job={job}
          onClose={() => setShowCoverLetterModal(false)}
        />
      )}
    </>
  );
}
