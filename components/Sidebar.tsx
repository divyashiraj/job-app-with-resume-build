
import React from 'react';
import { AppSection } from '../types';

interface SidebarProps {
  activeSection: AppSection;
  setActiveSection: (section: AppSection) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: AppSection.DASHBOARD, label: 'Dashboard', icon: 'fa-chart-pie' },
    { id: AppSection.RESUME, label: 'Resume Builder', icon: 'fa-file-lines' },
    { id: AppSection.JOB_FINDER, label: 'Job Finder', icon: 'fa-magnifying-glass' },
    { id: AppSection.TRACKER, label: 'Applications', icon: 'fa-list-check' },
  ];

  return (
    <div className="w-64 bg-slate-900 h-screen text-white p-4 hidden md:flex flex-col fixed left-0 top-0">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="bg-blue-500 w-8 h-8 rounded-lg flex items-center justify-center">
          <i className="fa-solid fa-rocket text-white"></i>
        </div>
        <h1 className="text-xl font-bold tracking-tight">CareerHero<span className="text-blue-400">AI</span></h1>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeSection === item.id 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <i className={`fa-solid ${item.icon} w-5`}></i>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto p-4 bg-slate-800 rounded-2xl border border-slate-700">
        <p className="text-xs text-slate-400 mb-2 uppercase tracking-wider font-bold">Credits Remaining</p>
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-semibold">45 / 50</span>
          <span className="text-xs text-blue-400">90%</span>
        </div>
        <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
          <div className="bg-blue-500 h-full w-[90%]"></div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
