
import React, { useState } from 'react';
import { AppSection, ResumeData, Task } from './types';
import { INITIAL_TASKS } from './constants';
import Sidebar from './components/Sidebar';
import ResumeEditor from './components/ResumeEditor';
import JobFinder from './components/JobFinder';
import TaskTracker from './components/TaskTracker';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.DASHBOARD);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [resumeData, setResumeData] = useState<ResumeData>({
    personal: {
      fullName: 'Alex Johnson',
      email: 'alex.j@example.com',
      phone: '+1 555 0102',
      location: 'San Francisco, CA',
      summary: 'Experienced frontend developer with a passion for building intuitive user interfaces and AI integrations.'
    },
    experience: [
      {
        id: '1',
        title: 'Senior Developer',
        company: 'Innovate Corp',
        duration: '2021 - Present',
        description: 'Led a team of 5 developers to create a real-time data visualization dashboard.'
      }
    ],
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    education: [
      { id: '1', degree: 'B.S. Computer Science', school: 'Tech University', year: '2020' }
    ]
  });

  const renderContent = () => {
    switch (activeSection) {
      case AppSection.DASHBOARD:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl text-white shadow-xl shadow-blue-200 relative overflow-hidden">
                <div className="relative z-10">
                  <h1 className="text-3xl font-bold mb-2">Hello, Alex! 👋</h1>
                  <p className="text-blue-100 max-w-md">Your profile is 65% complete. Finishing your resume will unlock high-match job recommendations.</p>
                  <button 
                    onClick={() => setActiveSection(AppSection.RESUME)}
                    className="mt-6 px-6 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all"
                  >
                    Complete Resume
                  </button>
                </div>
                <div className="absolute -right-10 -bottom-10 opacity-20 text-[180px] rotate-12">
                  <i className="fa-solid fa-rocket"></i>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center text-xl">
                    <i className="fa-solid fa-briefcase"></i>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">Jobs Found</p>
                    <p className="text-2xl font-black text-slate-900">12</p>
                  </div>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-xl">
                    <i className="fa-solid fa-paper-plane"></i>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">Applications</p>
                    <p className="text-2xl font-black text-slate-900">4</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg">AI Talent Insights</h3>
                  <span className="text-xs font-bold px-2 py-1 bg-blue-50 text-blue-600 rounded-lg">LIVE FEED</span>
                </div>
                <div className="space-y-4">
                  {[
                    "React 19 skills are in high demand this month.",
                    "Remote positions in Fintech have increased by 15%.",
                    "Your background in AI aligns with 8 open roles."
                  ].map((insight, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shrink-0"></div>
                      <p className="text-sm text-slate-600 font-medium">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <TaskTracker tasks={tasks} />
              
              <div className="bg-slate-900 p-6 rounded-2xl text-white">
                <h4 className="font-bold mb-4">Placement Readiness</h4>
                <div className="flex justify-center mb-6">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-800" />
                      <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="364.4" strokeDashoffset="127.5" className="text-blue-500" />
                    </svg>
                    <span className="absolute text-2xl font-bold">65%</span>
                  </div>
                </div>
                <button className="w-full py-3 bg-blue-600 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all">
                  Boost Score
                </button>
              </div>
            </div>
          </div>
        );
      case AppSection.RESUME:
        return (
          <div className="pb-20">
            <header className="mb-10">
              <h1 className="text-3xl font-black text-slate-900 mb-2">AI Resume Builder</h1>
              <p className="text-slate-500">Draft, optimize, and polish your professional identity with Gemini AI.</p>
            </header>
            <ResumeEditor data={resumeData} setData={setResumeData} />
          </div>
        );
      case AppSection.JOB_FINDER:
        return (
          <div className="pb-20">
            <header className="mb-10">
              <h1 className="text-3xl font-black text-slate-900 mb-2">Job Finder</h1>
              <p className="text-slate-500">Discover roles that match your unique skill set and career aspirations.</p>
            </header>
            <JobFinder resumeData={resumeData} />
          </div>
        );
      case AppSection.TRACKER:
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-3xl text-slate-300 mb-4">
              <i className="fa-solid fa-list-check"></i>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Application Tracker</h2>
            <p className="text-slate-500 max-w-md">No active applications found. Start browsing the Job Finder to kickstart your journey!</p>
            <button 
              onClick={() => setActiveSection(AppSection.JOB_FINDER)}
              className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
            >
              Find Jobs
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="flex-1 md:ml-64 p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-4 flex justify-between items-center z-50">
        <button onClick={() => setActiveSection(AppSection.DASHBOARD)} className={activeSection === AppSection.DASHBOARD ? 'text-blue-600' : 'text-slate-400'}>
          <i className="fa-solid fa-chart-pie text-xl"></i>
        </button>
        <button onClick={() => setActiveSection(AppSection.RESUME)} className={activeSection === AppSection.RESUME ? 'text-blue-600' : 'text-slate-400'}>
          <i className="fa-solid fa-file-lines text-xl"></i>
        </button>
        <button onClick={() => setActiveSection(AppSection.JOB_FINDER)} className={activeSection === AppSection.JOB_FINDER ? 'text-blue-600' : 'text-slate-400'}>
          <i className="fa-solid fa-magnifying-glass text-xl"></i>
        </button>
        <button onClick={() => setActiveSection(AppSection.TRACKER)} className={activeSection === AppSection.TRACKER ? 'text-blue-600' : 'text-slate-400'}>
          <i className="fa-solid fa-list-check text-xl"></i>
        </button>
      </div>
    </div>
  );
};

export default App;
