
export interface ResumeData {
  personal: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  experience: Experience[];
  skills: string[];
  education: Education[];
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  year: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: 'Full-time' | 'Contract' | 'Remote';
  description: string;
  matchScore?: number;
}

export interface Task {
  id: number;
  label: string;
  completed: boolean;
}

export enum AppSection {
  DASHBOARD = 'dashboard',
  RESUME = 'resume',
  JOB_FINDER = 'job-finder',
  TRACKER = 'tracker'
}
