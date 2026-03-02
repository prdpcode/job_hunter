'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ExternalLink, Trash2, MapPin, Building, Calendar } from 'lucide-react';
import { TrackedJob } from '@/lib/types';
import { timeAgo } from '@/lib/utils';
import { LocalStorage } from '@/lib/localStorage';

interface TrackedJobCardProps {
  job: TrackedJob;
}

export default function TrackedJobCard({ job }: TrackedJobCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: job.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleDelete = () => {
    LocalStorage.deleteTrackedJob(job.id);
    // Force re-render by updating parent component
    window.location.reload();
  };

  const getStatusColor = (status: TrackedJob['status']) => {
    switch (status) {
      case 'saved': return 'border-blue-600';
      case 'applied': return 'border-green-600';
      case 'interview': return 'border-yellow-600';
      case 'rejected': return 'border-red-600';
      default: return 'border-gray-600';
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-gray-800 border-l-4 ${getStatusColor(job.status)} rounded-lg p-4 cursor-move hover:bg-gray-750 transition-colors`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h4 className="font-semibold text-white text-sm mb-1">{job.title}</h4>
          <p className="text-gray-400 text-sm mb-2">{job.company.display_name}</p>
        </div>
        <button
          onClick={handleDelete}
          className="text-gray-500 hover:text-red-400 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center space-x-3 text-xs text-gray-500 mb-3">
        <div className="flex items-center space-x-1">
          <MapPin className="w-3 h-3" />
          <span>{job.location.display_name}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Calendar className="w-3 h-3" />
          <span>{timeAgo(job.savedDate)}</span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => window.open(job.redirect_url, '_blank')}
          className="flex items-center space-x-1 px-2 py-1 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          <span>View</span>
        </button>
        
        <div className="text-xs text-gray-500">
          Status: <span className="capitalize">{job.status}</span>
        </div>
      </div>
    </div>
  );
}
