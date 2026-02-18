
import React from 'react';
import { Job, Task } from './types';

export const INITIAL_TASKS: Task[] = [
  { id: 1, label: "Setup Design System", completed: true },
  { id: 2, label: "Profile Shell Completion", completed: true },
  { id: 3, label: "Resume Draft v1", completed: false },
  { id: 4, label: "AI Bullet Optimization", completed: false },
  { id: 5, label: "Market Research & Job Sync", completed: false },
  { id: 6, label: "Architecture + Matching Engine", completed: false },
  { id: 7, label: "HLD + Application Tracker", completed: false },
  { id: 8, label: "Test & Debug Submission Flow", completed: false },
  { id: 9, label: "Final Review & Export", completed: false },
];

export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    company: 'TechFlow Systems',
    location: 'San Francisco, CA',
    salary: '$140k - $180k',
    type: 'Remote',
    description: 'We are looking for a React expert to build modern AI-integrated interfaces.'
  },
  {
    id: '2',
    title: 'Product Designer',
    company: 'Creative Studio',
    location: 'Austin, TX',
    salary: '$110k - $140k',
    type: 'Full-time',
    description: 'Lead our UI/UX efforts for a new job portal application.'
  },
  {
    id: '3',
    title: 'Junior Web Developer',
    company: 'StartupX',
    location: 'New York, NY',
    salary: '$80k - $100k',
    type: 'Full-time',
    description: 'Great opportunity for entry-level developers to learn modern stack.'
  }
];
