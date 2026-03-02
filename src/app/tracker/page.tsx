'use client';

import { useState, useEffect } from 'react';
import { DndContext, DragEndEvent, DragOverEvent, DragStartEvent, 
         closestCenter, CollisionDetection, pointerWithin } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { Briefcase, ArrowLeft } from 'lucide-react';
import KanbanColumn from '@/components/KanbanColumn';
import { TrackedJob } from '@/lib/types';
import { LocalStorage } from '@/lib/localStorage';
import Link from 'next/link';

const columns = [
  { id: 'saved', title: 'Saved', color: 'border-blue-600' },
  { id: 'applied', title: 'Applied', color: 'border-green-600' },
  { id: 'interview', title: 'Interview', color: 'border-yellow-600' },
  { id: 'rejected', title: 'Rejected', color: 'border-red-600' }
];

export default function TrackerPage() {
  const [jobs, setJobs] = useState<TrackedJob[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedJobs = LocalStorage.getTrackedJobs();
    setJobs(savedJobs);
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeJob = jobs.find(job => job.id === String(active.id));
    if (!activeJob) return;

    const newStatus = over.id as TrackedJob['status'];
    
    // Update job status
    const updatedJobs = jobs.map(job => 
      job.id === String(active.id) ? { ...job, status: newStatus } : job
    );
    
    setJobs(updatedJobs);
    LocalStorage.updateTrackedJob(String(active.id), { status: newStatus });
  };

  const getJobsByStatus = (status: TrackedJob['status']) => {
    return jobs.filter(job => job.status === status);
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
              <Briefcase className="w-6 h-6 text-blue-400" />
              <h1 className="text-3xl font-bold">Application Tracker</h1>
            </div>
          </div>
          <div className="text-gray-400">
            {jobs.length} jobs tracked
          </div>
        </div>

        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {columns.map((column) => (
              <KanbanColumn
                key={column.id}
                column={column}
                jobs={getJobsByStatus(column.id as TrackedJob['status'])}
              />
            ))}
          </div>
        </DndContext>
      </div>
    </div>
  );
}
