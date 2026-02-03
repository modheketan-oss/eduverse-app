import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Clock, Users } from 'lucide-react';
import { MOCK_INTERNSHIPS } from '../constants';

export const Internships: React.FC = () => {
  const navigate = useNavigate();

  const activeInternship = MOCK_INTERNSHIPS.find(i => i.status === 'Active');
  const availableInternships = MOCK_INTERNSHIPS.filter(i => i.status === 'Available');

  return (
    <div className="bg-gray-50 min-h-full pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 pt-8 pb-12 rounded-b-[2rem] shadow-lg text-white">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/90 mb-6 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Internship Desk</span>
        </button>
        <h1 className="text-2xl font-bold mb-1">Gain real-world experience</h1>
        <p className="opacity-90 text-sm">Mentored projects & certifications</p>
      </div>

      <div className="px-6 -mt-8 space-y-6">
        {/* Active Internship Card */}
        {activeInternship && (
          <div className="bg-orange-50 rounded-3xl p-6 shadow-lg border border-orange-100 relative overflow-hidden">
             {/* Decorative blob */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-200/50 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-slate-800">Active Internship</h3>
                <span className="bg-green-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">In Progress</span>
              </div>
              
              <h2 className="text-xl font-bold text-slate-900 mb-2">{activeInternship.title}</h2>
              <div className="flex items-center gap-2 text-slate-600 text-sm mb-6">
                <User className="w-4 h-4" />
                <span>Mentor: {activeInternship.mentor}</span>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm mb-4">
                <div className="flex justify-between text-xs font-bold text-slate-600 mb-2">
                  <span>Progress</span>
                  <span className="text-orange-600">Week {activeInternship.week}/{activeInternship.totalWeeks}</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-orange-500 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${((activeInternship.week || 0) / (activeInternship.totalWeeks || 1)) * 100}%` }}
                  ></div>
                </div>
              </div>

              <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold shadow-lg shadow-slate-900/10">
                Continue Project
              </button>
            </div>
          </div>
        )}

        {/* Available Internships */}
        <div>
          <h3 className="font-bold text-slate-800 text-lg mb-4">Available Internships</h3>
          <div className="space-y-4">
            {availableInternships.map((internship) => (
              <div key={internship.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <h4 className="font-bold text-slate-800 text-lg mb-3">{internship.title}</h4>
                <div className="flex justify-between items-center text-slate-500 text-sm mb-5">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{internship.totalWeeks} weeks</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    <span>{internship.spotsLeft} spots left</span>
                  </div>
                </div>
                <button className="w-full py-2.5 border-2 border-slate-900 text-slate-900 font-bold rounded-xl hover:bg-slate-900 hover:text-white transition-colors">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};