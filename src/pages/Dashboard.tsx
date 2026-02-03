import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, UserCircle, Search, BookOpen, Award, Briefcase, ChevronRight, TrendingUp, GraduationCap, Crown, PlayCircle, ArrowRight, Play } from 'lucide-react';
import { MOCK_CERTIFICATES } from '../constants';
import { useCourse } from '../context/CourseContext';
import { useUser } from '../context/UserContext';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { courses } = useCourse();
  const { user, isPremium } = useUser();

  // Calculate dynamic stats
  const inProgressList = courses.filter(c => c.progress > 0 && c.progress < 100 && (!c.isPremium || isPremium));
  const coursesInProgressCount = inProgressList.length;
  const certificatesEarned = MOCK_CERTIFICATES.length;
  
  // Get premium courses for the dedicated section
  const premiumCourses = courses.filter(c => c.isPremium);

  return (
    <div className="pb-8">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-indigo-600 to-fuchsia-600 p-6 pt-10 rounded-b-[2.5rem] shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-purple-100 text-sm font-medium">Welcome back,</p>
            <div className="flex items-center gap-2">
               <h1 className="text-2xl font-bold text-white">{user?.name || 'Learner'}</h1>
               {isPremium && <Crown className="w-5 h-5 text-amber-300 fill-current" />}
            </div>
          </div>
          <div className="flex gap-3">
            <button className="p-2 bg-white/10 rounded-full backdrop-blur-sm text-white hover:bg-white/20 transition">
              <Bell className="w-5 h-5" />
            </button>
            <button onClick={() => navigate('/profile')} className="p-2 bg-white/10 rounded-full backdrop-blur-sm text-white hover:bg-white/20 transition">
              <UserCircle className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-3 flex items-center gap-3 text-white placeholder-white/60 mb-2">
          <Search className="w-5 h-5 opacity-70" />
          <input 
            type="text" 
            placeholder="Search courses, skills, internships" 
            className="bg-transparent border-none outline-none w-full text-sm placeholder-white/60"
          />
        </div>
      </div>

      <div className="px-6 -mt-8">
        {/* Quick Stats - Click to View Analytics */}
        <div 
          onClick={() => navigate('/analytics')}
          className="flex gap-4 mb-8 cursor-pointer group"
        >
          <div className="flex-1 bg-white p-4 rounded-2xl shadow-lg shadow-purple-900/5 flex flex-col justify-between h-28 border border-transparent group-hover:border-purple-100 transition-all">
            <BookOpen className="w-6 h-6 text-purple-600 mb-2" />
            <div>
              <h3 className="text-2xl font-bold text-slate-800">{coursesInProgressCount}</h3>
              <p className="text-xs text-slate-500 font-medium">In Progress</p>
            </div>
          </div>
          <div className="flex-1 bg-white p-4 rounded-2xl shadow-lg shadow-purple-900/5 flex flex-col justify-between h-28 border border-transparent group-hover:border-purple-100 transition-all">
            <Award className="w-6 h-6 text-pink-600 mb-2" />
            <div>
              <h3 className="text-2xl font-bold text-slate-800">{certificatesEarned}</h3>
              <p className="text-xs text-slate-500 font-medium">Certificates</p>
            </div>
          </div>
        </div>

        {/* Premium Exclusive Section - Only visible if subscribed */}
        {isPremium && premiumCourses.length > 0 && (
          <div className="mb-8 animate-in slide-in-from-right duration-500">
             <div className="flex items-center gap-2 mb-4">
               <Crown className="w-5 h-5 text-amber-500 fill-current" />
               <h2 className="text-lg font-bold text-slate-800">Advanced Content</h2>
             </div>
             
             <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
               {premiumCourses.map(course => (
                 <div 
                    key={course.id}
                    onClick={() => navigate(`/course/${course.id}`)}
                    className="min-w-[260px] bg-slate-900 p-5 rounded-2xl relative overflow-hidden cursor-pointer hover:shadow-lg transition"
                 >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8 blur-xl"></div>
                    <div className="relative z-10">
                       <span className="text-[10px] font-bold bg-amber-400 text-amber-950 px-2 py-0.5 rounded-full mb-3 inline-block">PREMIUM</span>
                       <h3 className="font-bold text-lg text-white mb-1 leading-tight">{course.title}</h3>
                       <div className="flex items-center gap-2 text-slate-400 text-xs mt-3">
                         <span className="flex items-center gap-1"><PlayCircle className="w-3 h-3" /> {course.lessonsCount} Lessons</span>
                         <span>•</span>
                         <span>{course.duration}</span>
                       </div>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        )}

        {/* Explore Modules */}
        <h2 className="text-lg font-bold text-slate-800 mb-4">Explore Modules</h2>
        <div className="flex flex-col gap-4">
          <ModuleCard 
            title="Academic Excellence" 
            subtitle="K-12 Syllabus"
            icon={<BookOpen className="w-6 h-6 text-white" />}
            gradient="from-cyan-500 to-blue-500"
            onClick={() => navigate('/courses', { state: { category: 'Academic' } })}
          />
           <ModuleCard 
            title="Higher Education" 
            subtitle="Degree & Diploma"
            icon={<GraduationCap className="w-6 h-6 text-white" />}
            gradient="from-blue-600 to-indigo-600"
            onClick={() => navigate('/courses', { state: { category: 'Higher Ed' } })}
          />
          <ModuleCard 
            title="Certified Skills" 
            subtitle="AI, EV & Software"
            icon={<TrendingUp className="w-6 h-6 text-white" />}
            gradient="from-fuchsia-500 to-pink-500"
            onClick={() => navigate('/courses', { state: { category: 'Skills' } })}
          />
           <ModuleCard 
            title="Business School" 
            subtitle="Leadership & Startup"
            icon={<Award className="w-6 h-6 text-white" />}
            gradient="from-indigo-500 to-purple-600"
            onClick={() => navigate('/courses', { state: { category: 'Business' } })}
          />
          <ModuleCard 
            title="Professional Internships" 
            subtitle="Live Projects"
            icon={<Briefcase className="w-6 h-6 text-white" />}
            gradient="from-orange-500 to-red-500"
            onClick={() => navigate('/internships')}
          />
        </div>

        {/* Dynamic In-Progress Overview Block */}
        <div className="mt-8 mb-4 flex items-center justify-between">
           <h2 className="text-lg font-bold text-slate-800">Continue Learning</h2>
           {inProgressList.length > 0 && (
             <button onClick={() => navigate('/courses')} className="text-xs font-bold text-purple-600 flex items-center gap-1">
                View All <ArrowRight className="w-3 h-3" />
             </button>
           )}
        </div>

        <div className="flex flex-col gap-4">
          {inProgressList.length > 0 ? (
            inProgressList.map((course) => (
              <div 
                key={course.id}
                onClick={() => navigate(`/course/${course.id}`)}
                className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 cursor-pointer hover:shadow-md transition group"
              >
                {/* Icon Box */}
                <div className={`w-14 h-14 rounded-2xl ${course.imageColor} flex items-center justify-center shrink-0 relative overflow-hidden`}>
                   <div className="absolute inset-0 bg-black/10"></div>
                   <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Play className="w-3 h-3 text-white fill-current ml-0.5" />
                   </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-slate-800 text-sm truncate pr-2">{course.title}</h4>
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
                      {course.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                     <span className="text-xs text-slate-500 font-medium">{course.progress}% Completed</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${course.imageColor} rounded-full transition-all duration-500`} 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Arrow Icon */}
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors">
                   <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                <PlayCircle className="w-6 h-6 text-slate-300" />
              </div>
              <p className="text-slate-500 text-sm font-medium mb-2">You haven't started any courses yet.</p>
              <button 
                onClick={() => navigate('/courses')}
                className="text-purple-600 font-bold text-sm hover:underline"
              >
                Browse Library
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ModuleCard = ({ title, subtitle, icon, gradient, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`w-full p-4 rounded-2xl bg-gradient-to-r ${gradient} text-white flex items-center justify-between shadow-lg shadow-purple-900/5 transition-transform active:scale-95`}
  >
    <div className="flex items-center gap-4">
      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
        {icon}
      </div>
      <div className="text-left">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-white/80 text-sm">{subtitle}</p>
      </div>
    </div>
    <ChevronRight className="w-5 h-5 text-white/70" />
  </button>
);