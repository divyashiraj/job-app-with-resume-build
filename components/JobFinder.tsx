
import React, { useState, useEffect } from 'react';
import { Job, ResumeData } from '../types';
import { MOCK_JOBS } from '../constants';
import { calculateJobMatch } from '../services/geminiService';

interface JobFinderProps {
  resumeData: ResumeData;
}

const JobFinder: React.FC<JobFinderProps> = ({ resumeData }) => {
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const [isMatching, setIsMatching] = useState(false);

  const performMatching = async () => {
    setIsMatching(true);
    const resumeText = `${resumeData.personal.summary} ${resumeData.experience.map(e => e.title + ' ' + e.description).join(' ')}`;
    
    const updatedJobs = await Promise.all(jobs.map(async (job) => {
      const score = await calculateJobMatch(resumeText, job.description);
      return { ...job, matchScore: score };
    }));

    setJobs(updatedJobs.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0)));
    setIsMatching(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Recommended Jobs</h2>
          <p className="text-slate-500">Based on your current resume and skills profile.</p>
        </div>
        <button 
          onClick={performMatching}
          disabled={isMatching}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 disabled:opacity-50"
        >
          {isMatching ? <i className="fa-solid fa-spinner animate-spin"></i> : <i className="fa-solid fa-bolt"></i>}
          AI Match Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white border border-slate-200 p-6 rounded-2xl hover:shadow-xl transition-all group relative overflow-hidden">
            {job.matchScore !== undefined && (
              <div className="absolute top-0 right-0 p-3">
                <div className={`text-xs font-bold px-3 py-1 rounded-full ${job.matchScore > 80 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                  {job.matchScore}% Match
                </div>
              </div>
            )}
            <div className="w-12 h-12 bg-slate-100 rounded-xl mb-4 flex items-center justify-center text-xl text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
              <i className="fa-solid fa-building"></i>
            </div>
            <h3 className="font-bold text-lg mb-1">{job.title}</h3>
            <p className="text-blue-600 text-sm font-semibold mb-3">{job.company}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 border border-slate-100 px-2 py-0.5 rounded-md">
                <i className="fa-solid fa-location-dot mr-1"></i>{job.location}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 border border-slate-100 px-2 py-0.5 rounded-md">
                <i className="fa-solid fa-clock mr-1"></i>{job.type}
              </span>
            </div>

            <p className="text-slate-500 text-sm line-clamp-3 mb-6">
              {job.description}
            </p>

            <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold group-hover:bg-blue-600 transition-all">
              Quick Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobFinder;
