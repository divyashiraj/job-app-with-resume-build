
import React, { useState } from 'react';
import { ResumeData, Experience } from '../types';
import { optimizeResumeText } from '../services/geminiService';

interface ResumeEditorProps {
  data: ResumeData;
  setData: (data: ResumeData) => void;
}

const ResumeEditor: React.FC<ResumeEditorProps> = ({ data, setData }) => {
  const [isOptimizing, setIsOptimizing] = useState<string | null>(null);

  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({
      ...data,
      personal: { ...data.personal, [e.target.name]: e.target.value }
    });
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      duration: '',
      description: ''
    };
    setData({ ...data, experience: [...data.experience, newExp] });
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setData({
      ...data,
      experience: data.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    });
  };

  const handleOptimize = async (id: string, currentText: string) => {
    if (!currentText) return;
    setIsOptimizing(id);
    const optimized = await optimizeResumeText(currentText);
    updateExperience(id, 'description', optimized);
    setIsOptimizing(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <i className="fa-solid fa-user text-blue-500"></i>
          Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase">Full Name</label>
            <input 
              name="fullName" 
              value={data.personal.fullName} 
              onChange={handlePersonalChange}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase">Email Address</label>
            <input 
              name="email" 
              value={data.personal.email} 
              onChange={handlePersonalChange}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase">Professional Summary</label>
            <textarea 
              name="summary" 
              value={data.personal.summary} 
              onChange={handlePersonalChange}
              rows={3}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
            />
          </div>
        </div>
      </section>

      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <i className="fa-solid fa-briefcase text-blue-500"></i>
            Work Experience
          </h2>
          <button 
            onClick={addExperience}
            className="text-sm px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 font-semibold transition-all"
          >
            + Add Experience
          </button>
        </div>

        <div className="space-y-6">
          {data.experience.map((exp) => (
            <div key={exp.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 relative group">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input 
                  placeholder="Job Title"
                  value={exp.title}
                  onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                  className="px-3 py-2 bg-white border border-slate-200 rounded-lg"
                />
                <input 
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  className="px-3 py-2 bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div className="relative">
                <textarea 
                  placeholder="Key Responsibilities..."
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg pr-12 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
                <button 
                  onClick={() => handleOptimize(exp.id, exp.description)}
                  disabled={isOptimizing === exp.id}
                  className="absolute bottom-3 right-3 p-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 disabled:bg-slate-300 transition-all flex items-center gap-2"
                >
                  <i className={`fa-solid fa-wand-magic-sparkles ${isOptimizing === exp.id ? 'animate-spin' : ''}`}></i>
                  <span className="text-xs font-bold uppercase">AI Polish</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ResumeEditor;
