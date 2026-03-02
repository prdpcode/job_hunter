'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TrackedJobCard from './TrackedJobCard';
import { TrackedJob } from '@/lib/types';

interface KanbanColumnProps {
  column: {
    id: string;
    title: string;
    color: string;
  };
  jobs: TrackedJob[];
}

export default function KanbanColumn({ column, jobs }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <div className="flex flex-col h-full">
      <div className={`flex items-center justify-between p-4 border-b-2 ${column.color} bg-gray-900 rounded-t-lg`}>
        <h3 className="font-semibold text-white">{column.title}</h3>
        <span className="bg-gray-800 text-gray-300 text-sm px-2 py-1 rounded-full">
          {jobs.length}
        </span>
      </div>
      
      <div
        ref={setNodeRef}
        className={`flex-1 p-4 bg-gray-900 rounded-b-lg border border-gray-800 min-h-[400px] transition-colors ${
          isOver ? 'bg-gray-800' : ''
        }`}
      >
        <SortableContext items={jobs.map(job => job.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {jobs.map((job) => (
              <TrackedJobCard key={job.id} job={job} />
            ))}
            
            {jobs.length === 0 && (
              <div className="text-center py-8 text-gray-600">
                <div className="text-sm">No jobs in {column.title.toLowerCase()}</div>
              </div>
            )}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}
