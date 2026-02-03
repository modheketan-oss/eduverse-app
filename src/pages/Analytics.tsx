import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, TrendingUp, AlertCircle, Award, Calendar } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, 
  PieChart, Pie, Cell 
} from 'recharts';

export const Analytics: React.FC = () => {
  const navigate = useNavigate();

  // --- Mock Data ---

  const weeklyActivityData = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 3.8 },
    { day: 'Wed', hours: 1.5 },
    { day: 'Thu', hours: 4.2 },
    { day: 'Fri', hours: 3.0 },
    { day: 'Sat', hours: 5.5 },
    { day: 'Sun', hours: 2.0 },
  ];

  const subjectPerformanceData = [
    { subject: 'Physics', score: 85, fullMark: 100 },
    { subject: 'Math', score: 65, fullMark: 100 },
    { subject: 'AI/ML', score: 92, fullMark: 100 },
    { subject: 'Coding', score: 78, fullMark: 100 },
    { subject: 'Business', score: 55, fullMark: 100 },
    { subject: 'English', score: 88, fullMark: 100 },
  ];

  const timeDistributionData = [
    { name: 'Video Lectures', value: 45, color: '#8b5cf6' }, // Violet
    { name: 'Practice Quiz', value: 30, color: '#06b6d4' },  // Cyan
    { name: 'Projects', value: 25, color: '#f43f5e' },      // Rose
  ];

  const areasForImprovement = [
    { topic: 'Calculus - Integration', subject: 'Math', score: 45 },
    { topic: 'Market Analysis', subject: 'Business', score: 52 },
  ];

  return (
    <div className="bg-gray-50 min-h-full pb-8">
      {/* Header */}
      <div className="p-6 pt-8 bg-white shadow-sm mb-6">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full">
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </button>
          <h1 className="text-xl font-bold text-slate-800">Analytics Overview</h1>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-violet-50 p-3 rounded-xl border border-violet-100">
            <div className="flex items-center gap-1.5 mb-1 text-violet-600">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-semibold">Total Time</span>
            </div>
            <p className="text-lg font-bold text-slate-800">22.5h</p>
            <p className="text-[10px] text-slate-500">This Week</p>
          </div>
          <div className="bg-cyan-50 p-3 rounded-xl border border-cyan-100">
             <div className="flex items-center gap-1.5 mb-1 text-cyan-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-semibold">Avg Score</span>
            </div>
            <p className="text-lg font-bold text-slate-800">78%</p>
            <p className="text-[10px] text-slate-500">+5% vs last week</p>
          </div>
           <div className="bg-orange-50 p-3 rounded-xl border border-orange-100">
             <div className="flex items-center gap-1.5 mb-1 text-orange-600">
              <Award className="w-4 h-4" />
              <span className="text-xs font-semibold">Streak</span>
            </div>
            <p className="text-lg font-bold text-slate-800">5 Days</p>
            <p className="text-[10px] text-slate-500">Keep it up!</p>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-6">
        
        {/* Weekly Activity Chart */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800">Weekly Activity</h3>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Calendar className="w-3 h-3" />
              <span>Last 7 Days</span>
            </div>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyActivityData}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 12, fill: '#94a3b8'}} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 12, fill: '#94a3b8'}}
                />
                <Tooltip 
                  cursor={{fill: '#f1f5f9'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px -5px rgb(0 0 0 / 0.1)'}}
                  formatter={(value: number) => [`${value} hrs`, 'Time Spent']}
                />
                <Bar dataKey="hours" fill="#8b5cf6" radius={[4, 4, 4, 4]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Strength Radar Chart */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-2">Subject Strengths</h3>
          <p className="text-xs text-slate-500 mb-4">Identify your strongest areas</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={subjectPerformanceData}>
                <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                <PolarAngleAxis dataKey="subject" tick={{fontSize: 11, fill: '#64748b', fontWeight: 500}} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#06b6d4"
                  fill="#06b6d4"
                  fillOpacity={0.3}
                />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px -5px rgb(0 0 0 / 0.1)'}}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Time Distribution Pie Chart */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-2">Learning Style</h3>
          <p className="text-xs text-slate-500 mb-4">How you spend your time</p>
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={timeDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  cornerRadius={4}
                >
                  {timeDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px -5px rgb(0 0 0 / 0.1)'}}
                  itemStyle={{color: '#1e293b', fontWeight: 600, fontSize: '12px'}}
                  formatter={(value: number) => [`${value}%`, '']}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                <span className="text-2xl font-bold text-slate-800">100%</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Effort</span>
            </div>
            
            {/* Custom Legend */}
            <div className="flex justify-center gap-4 flex-wrap mt-[-20px]">
              {timeDistributionData.map((entry, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }}></div>
                      <span className="text-xs font-medium text-slate-600">{entry.name}</span>
                  </div>
              ))}
            </div>
          </div>
        </div>

        {/* Areas for Improvement */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4">Focus Areas</h3>
          <div className="space-y-3">
            {areasForImprovement.map((area, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-red-50 rounded-xl border border-red-100">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                <div className="flex-1">
                  <h4 className="font-semibold text-sm text-slate-800">{area.topic}</h4>
                  <p className="text-xs text-slate-500">{area.subject} • Score: {area.score}%</p>
                </div>
                <button className="text-xs font-bold text-red-600 bg-white px-3 py-1.5 rounded-lg shadow-sm">
                  Review
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};