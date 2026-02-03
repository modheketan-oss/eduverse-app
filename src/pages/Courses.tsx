import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Search, Clock, BookOpen, Bookmark, Filter, Crown, Lock } from 'lucide-react';
import { useCourse } from '../context/CourseContext';
import { useUser } from '../context/UserContext';
import { UserRole } from '../types';

export const Courses: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { courses } = useCourse();
  const { user, isPremium } = useUser();
  
  // Determine user role
  const isStudent = user?.role === UserRole.Student;
  const isProfessional = user?.role === UserRole.Professional;

  // Default category logic:
  // - If Student: Force 'Academic' (ignore All)
  // - If Professional: Force 'Skills' if state is missing/All (ignore All)
  // - Others: Allow 'All' or state
  let defaultCategory = location.state?.category || 'All';
  if (isStudent) {
    defaultCategory = 'Academic';
  } else if (isProfessional && (defaultCategory === 'All' || !defaultCategory)) {
    defaultCategory = 'Skills';
  }
  
  const [activeCategory, setActiveCategory] = useState<string>(defaultCategory);

  const filteredCourses = courses.filter(
    c => (activeCategory === 'All' || c.category === activeCategory)
  );

  // Filter tabs logic
  let categories = ['All', 'Academic', 'Higher Ed', 'Skills', 'Business'];
  
  if (isStudent) {
    categories = ['Academic'];
  } else if (isProfessional) {
    categories = ['Skills', 'Business'];
  }

  return (
    <div className="p-6 pt-8 pb-20">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full">
          <ArrowLeft className="w-5 h-5 text-slate-700" />
        </button>
        <h1 className="text-xl font-bold text-slate-800">
          {activeCategory === 'All' ? 'Explore Library' : `${activeCategory} Modules`}
        </h1>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search topics..." 
          className="w-full bg-slate-100 py-3 pl-12 pr-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat 
                ? 'bg-slate-900 text-white shadow-md' 
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filteredCourses.length === 0 ? (
          <div className="text-center py-10 text-slate-500">
            <p>No courses found in this category.</p>
          </div>
        ) : (
          filteredCourses.map((course) => (
            <div key={course.id} className={`bg-white rounded-3xl p-5 shadow-lg border transition-all hover:shadow-xl relative overflow-hidden ${course.isPremium && !isPremium ? 'border-amber-100' : 'border-slate-50 shadow-slate-200/50'}`}>
               {course.isPremium && (
                 <div className="absolute top-4 right-4 z-10 bg-amber-400 text-amber-950 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                   <Crown className="w-3 h-3 fill-current" />
                   PREMIUM
                 </div>
               )}

              <div className={`h-32 rounded-2xl ${course.imageColor} mb-4 flex items-center justify-center relative overflow-hidden`}>
                {/* Abstract decorative circles */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full -mr-8 -mt-8 blur-lg"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-black/5 rounded-full -ml-8 -mb-8"></div>
                
                {course.isPremium && !isPremium ? (
                    <Lock className="w-12 h-12 text-white/80" />
                ) : (
                    <Bookmark className="w-12 h-12 text-white opacity-90" />
                )}
              </div>
              
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-slate-800 leading-tight flex-1 mr-2">{course.title}</h3>
                <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-600 rounded-md uppercase tracking-wider">
                  {course.category}
                </span>
              </div>
              
              <div className="flex items-center gap-4 text-slate-500 text-sm mb-6">
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{course.lessonsCount} Lessons</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
              </div>

              {course.progress > 0 && (
                <div className="mb-4">
                   <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                   </div>
                   <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className={`h-full ${course.imageColor} opacity-80`} style={{ width: `${course.progress}%` }}></div>
                   </div>
                </div>
              )}

              <button 
                onClick={() => navigate(`/course/${course.id}`)}
                className={`w-full py-3.5 rounded-xl font-semibold text-sm transition shadow-lg ${
                  course.isPremium && !isPremium
                    ? 'bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center gap-2'
                    : course.isPremium
                        ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-orange-200' 
                        : 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/20'
                }`}
              >
                {course.isPremium && !isPremium ? (
                    <>
                        <Lock className="w-4 h-4" />
                        Locked
                    </>
                ) : (
                    course.progress > 0 ? 'Continue Learning' : 'Start Learning'
                )}
              </button>
            </div>
          ))
        )}

        {/* Promo for Non-Premium Users */}
        {!isPremium && !isStudent && (
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-6 text-white text-center shadow-xl relative overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform" onClick={() => navigate('/premium')}>
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
             
             <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <Lock className="w-6 h-6 text-white" />
             </div>
             <h3 className="font-bold text-lg mb-2">3+ Advanced Courses Locked</h3>
             <p className="text-slate-300 text-sm mb-6">Upgrade to Premium to unlock advanced courses in AI, Management, and more.</p>
             <button className="w-full py-3 bg-white text-slate-900 font-bold rounded-xl flex items-center justify-center gap-2">
                <Crown className="w-4 h-4 text-amber-500 fill-current" />
                Unlock Now
             </button>
          </div>
        )}
      </div>
    </div>
  );
};