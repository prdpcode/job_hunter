export interface Job {
  id: string;
  title: string;
  company: {
    display_name: string;
  };
  location: {
    display_name: string;
  };
  salary_min?: number;
  salary_max?: number;
  description: string;
  redirect_url: string;
  created: string;
  category: {
    label: string;
  };
  contract_time?: string;
}

export interface TrackedJob extends Job {
  savedDate: string;
  status: 'saved' | 'applied' | 'interview' | 'rejected';
  notes?: string;
}

export interface CoverLetter {
  id: string;
  jobTitle: string;
  company: string;
  letter: string;
  generatedDate: string;
}

export interface JobFilters {
  keywords: string;
  location: string;
  jobType: string;
  experience: string;
  salaryMin: number;
  salaryMax: number;
}

export interface DashboardStats {
  totalJobsFound: number;
  jobsSaved: number;
  applicationsSent: number;
  interviewsScheduled: number;
  currentStreak: number;
}
