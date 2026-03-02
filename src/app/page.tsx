'use client';

import { useState, useEffect } from 'react';
import Dashboard from '@/components/Dashboard';
import { LocalStorage } from '@/lib/localStorage';

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    LocalStorage.calculateStreak(); // Update streak on page load
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return <Dashboard />;
}
