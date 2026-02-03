import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Star, PlayCircle, Trophy, Target, Atom, Calculator, Microscope, ArrowRight, Brain } from 'lucide-react';
import { useCourse } from '../context/CourseContext';
import { useUser } from '../context/UserContext';

export const SchoolLanding: React.FC = () => {
  const navigate = useNavigate();
  const { courses } = useCourse();
  const { user } = useUser();

  // Filter for Academic (K-12) content
  const academicCourses = courses.filter(c => c.category === 'Academic');
  
  // Highlight courses by subject keywords for quick access
  const mathCourse = academicCourses.find(c => c.title.includes('Mathematics'));
  const physicsCourse = academicCourses.find(c => c.title.includes('Physics'));
  const bioCourse = academicCourses.find(c => c.title.includes('Biology'));

  return (
    <div className="pb-8 bg-sky-50 min-h-full">
      {/* Hero Section for Kids */}
      <div className="bg-gradient-to-b from-sky-400 to-blue-500 text-white rounded-b-[2.5rem] p-8 pt-12 shadow-xl relative overflow-hidden">
        {/* Fun Background Patterns */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
        <div className="absolute -bottom-8 right-20 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>

        <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/20 flex items-center gap-1">
                    <Trophy className="w-3 h-3 text-yellow-300" />
                    Class 10
                </span>
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/20">
                    CBSE Board
                </span>
            </div>
            
            <h1 className="text-3xl font-extrabold leading-tight mb-2">Hello, {user?.name || 'Superstar'}! 🚀</h1>
            <p className="text-blue-50 font-medium text-sm mb-6 max-w-xs">
                Ready to ace your exams? Let's learn something new today!
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                     <Target className="w-6 h-6 text-red-500" />
                </div>
                <div>
                    <p className="text-xs text-blue-100 font-bold uppercase">Daily Goal</p>
                    <p className="font-bold text-lg">Complete 2 Lessons</p>
                </div>
            </div>
        </div>
      </div>

      <div className="px-6 mt-8 space-y-8">
        
        {/* My Subjects Grid */}
        <div>
            <div className="flex justify-between items-end mb-4">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-500" />
                    My Subjects
                </h2>
                <button 
                    onClick={() => navigate('/courses', { state: { category: 'Academic' } })}
                    className="text-blue-600 text-xs font-bold flex items-center gap-1 bg-white px-3 py-1.5 rounded-full shadow-sm"
                >
                    View All <ArrowRight className="w-3 h-3" />
                </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                {/* Subject Cards */}
                <SubjectCard 
                    title="Maths" 
                    icon={<Calculator className="w-6 h-6 text-white" />} 
                    color="bg-blue-500"
                    onClick={() => mathCourse && navigate(`/course/${mathCourse.id}`)}
                />
                <SubjectCard 
                    title="Physics" 
                    icon={<Atom className="w-6 h-6 text-white" />} 
                    color="bg-cyan-500"
                    onClick={() => physicsCourse && navigate(`/course/${physicsCourse.id}`)}
                />
                <SubjectCard 
                    title="Biology" 
                    icon={<Microscope className="w-6 h-6 text-white" />} 
                    color="bg-emerald-500"
                    onClick={() => bioCourse && navigate(`/course/${bioCourse.id}`)}
                />
                 <SubjectCard 
                    title="Quiz Zone" 
                    icon={<Brain className="w-6 h-6 text-white" />} 
                    color="bg-fuchsia-500"
                    onClick={() => navigate('/courses')}
                />
            </div>
        </div>

        {/* Continue Learning */}
        <div>
             <h2 className="text-xl font-bold text-slate-800 mb-4">Continue Learning</h2>
             <div className="flex flex-col gap-3">
                {academicCourses.slice(0, 3).map(course => (
                    <div 
                        key={course.id}
                        onClick={() => navigate(`/course/${course.id}`)}
                        className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex gap-4 cursor-pointer hover:shadow-md transition group"
                    >
                         <div className={`w-14 h-14 rounded-xl ${course.imageColor} shrink-0 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform`}>
                            <PlayCircle className="w-7 h-7 opacity-90" />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                            <h3 className="font-bold text-slate-900 truncate mb-1">{course.title}</h3>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div className={`h-full ${course.imageColor} w-[${course.progress > 0 ? course.progress : 5}%]`}></div>
                            </div>
                            <p className="text-xs text-slate-400 mt-1.5 font-medium">{course.lessonsCount} Lessons • {course.duration}</p>
                        </div>
                    </div>
                ))}
             </div>
        </div>

        {/* Gamification Banner */}
        <div className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full -mr-8 -mt-8 blur-lg"></div>
            
            <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
                    <Star className="w-6 h-6 text-yellow-300 fill-current" />
                </div>
                <div>
                    <h3 className="font-bold text-lg">Weekly Challenge</h3>
                    <p className="text-xs text-white/90">Complete 5 quizzes to win a badge!</p>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

const SubjectCard = ({ title, icon, color, onClick }: any) => (
    <button 
        onClick={onClick}
        className={`${color} p-4 rounded-2xl shadow-lg shadow-slate-200/50 flex flex-col items-center justify-center gap-3 h-32 hover:scale-[1.02] transition-transform active:scale-95`}
    >
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            {icon}
        </div>
        <span className="font-bold text-white tracking-wide">{title}</span>
    </button>
);