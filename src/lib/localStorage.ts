import { TrackedJob, CoverLetter, DashboardStats } from './types';

const STORAGE_KEYS = {
  TRACKED_JOBS: 'job-hunter-tracked-jobs',
  COVER_LETTERS: 'job-hunter-cover-letters',
  STATS: 'job-hunter-stats',
  STREAK: 'job-hunter-streak'
};

export class LocalStorage {
  static getTrackedJobs(): TrackedJob[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.TRACKED_JOBS);
    return data ? JSON.parse(data) : [];
  }

  static saveTrackedJob(job: TrackedJob): void {
    if (typeof window === 'undefined') return;
    const jobs = this.getTrackedJobs();
    jobs.push(job);
    localStorage.setItem(STORAGE_KEYS.TRACKED_JOBS, JSON.stringify(jobs));
  }

  static updateTrackedJob(jobId: string, updates: Partial<TrackedJob>): void {
    if (typeof window === 'undefined') return;
    const jobs = this.getTrackedJobs();
    const index = jobs.findIndex(job => job.id === jobId);
    if (index !== -1) {
      jobs[index] = { ...jobs[index], ...updates };
      localStorage.setItem(STORAGE_KEYS.TRACKED_JOBS, JSON.stringify(jobs));
    }
  }

  static deleteTrackedJob(jobId: string): void {
    if (typeof window === 'undefined') return;
    const jobs = this.getTrackedJobs();
    const filtered = jobs.filter(job => job.id !== jobId);
    localStorage.setItem(STORAGE_KEYS.TRACKED_JOBS, JSON.stringify(filtered));
  }

  static getCoverLetters(): CoverLetter[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.COVER_LETTERS);
    return data ? JSON.parse(data) : [];
  }

  static deleteCoverLetter(letterId: string): void {
    if (typeof window === 'undefined') return;
    const letters = this.getCoverLetters();
    const filtered = letters.filter(letter => letter.id !== letterId);
    localStorage.setItem(STORAGE_KEYS.COVER_LETTERS, JSON.stringify(filtered));
  }

  static saveCoverLetter(letter: CoverLetter): void {
    if (typeof window === 'undefined') return;
    const letters = this.getCoverLetters();
    letters.unshift(letter); // Add to beginning
    localStorage.setItem(STORAGE_KEYS.COVER_LETTERS, JSON.stringify(letters));
  }

  static getStats(): DashboardStats {
    if (typeof window === 'undefined') {
      return {
        totalJobsFound: 0,
        jobsSaved: 0,
        applicationsSent: 0,
        interviewsScheduled: 0,
        currentStreak: 0
      };
    }
    
    const data = localStorage.getItem(STORAGE_KEYS.STATS);
    if (data) return JSON.parse(data);
    
    // Calculate from tracked jobs
    const jobs = this.getTrackedJobs();
    return {
      totalJobsFound: 0,
      jobsSaved: jobs.filter(j => j.status === 'saved').length,
      applicationsSent: jobs.filter(j => j.status === 'applied').length,
      interviewsScheduled: jobs.filter(j => j.status === 'interview').length,
      currentStreak: this.calculateStreak()
    };
  }

  static updateStats(updates: Partial<DashboardStats>): void {
    if (typeof window === 'undefined') return;
    const currentStats = this.getStats();
    const newStats = { ...currentStats, ...updates };
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(newStats));
  }

  static calculateStreak(): number {
    if (typeof window === 'undefined') return 0;
    const lastVisit = localStorage.getItem(STORAGE_KEYS.STREAK);
    const today = new Date().toDateString();
    
    if (!lastVisit) {
      localStorage.setItem(STORAGE_KEYS.STREAK, today);
      return 1;
    }
    
    const lastDate = new Date(lastVisit);
    const todayDate = new Date(today);
    const diffTime = todayDate.getTime() - lastDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      localStorage.setItem(STORAGE_KEYS.STREAK, today);
      return parseInt(localStorage.getItem('job-hunter-streak-count') || '1') + 1;
    } else if (diffDays > 1) {
      localStorage.setItem(STORAGE_KEYS.STREAK, today);
      localStorage.setItem('job-hunter-streak-count', '1');
      return 1;
    }
    
    return parseInt(localStorage.getItem('job-hunter-streak-count') || '1');
  }
}
