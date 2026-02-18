
import React from 'react';
import { Task } from '../types';

interface TaskTrackerProps {
  tasks: Task[];
}

const TaskTracker: React.FC<TaskTrackerProps> = ({ tasks }) => {
  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = (completedCount / tasks.length) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 bg-slate-50 border-b border-slate-200">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
              AI
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Onboarding Status</h3>
              <p className="text-xs text-slate-500">{completedCount}/{tasks.length} steps completed</p>
            </div>
          </div>
          <button className="text-sm font-bold text-blue-600 flex items-center gap-1 hover:underline">
            Portfolio <i className="fa-solid fa-arrow-right text-[10px]"></i>
          </button>
        </div>
        
        <div className="w-full bg-slate-200 h-2 rounded-full">
          <div 
            className="bg-blue-500 h-full rounded-full transition-all duration-500" 
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      <div className="p-4 space-y-1">
        <p className="text-sm px-2 py-3 text-slate-600 font-medium">
          Welcome back! You're making great progress on your career profile. 🚀
        </p>
        {tasks.map((task) => (
          <div 
            key={task.id} 
            className={`flex items-center justify-between p-3 rounded-xl transition-all ${
              task.completed ? 'opacity-80' : 'hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                task.completed ? 'bg-green-500 border-green-500 text-white' : 'border-slate-300'
              }`}>
                {task.completed && <i className="fa-solid fa-check text-[10px]"></i>}
              </div>
              <span className={`text-sm font-medium ${task.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                {task.label}
              </span>
            </div>
            {task.completed ? (
              <span className="text-[10px] font-bold text-green-600 uppercase">Completed</span>
            ) : (
              <button className="text-[10px] font-bold text-blue-600 uppercase hover:underline">View</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskTracker;
