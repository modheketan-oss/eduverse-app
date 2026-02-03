import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, PlayCircle, Lock, CheckCircle, Info, Unlock, Star, Upload, FileVideo, Brain, XCircle, RefreshCw, Award, Crown, ShieldAlert } from 'lucide-react';
import { Lesson } from '../types';
import { useUser } from '../context/UserContext';
import { useCourse } from '../context/CourseContext';

export const CoursePlayer: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { isPremium } = useUser();
  const { getCourse, uploadLessonVideo, markLessonComplete, toggleLessonLock, toggleCourseLock } = useCourse();
  
  const course = courseId ? getCourse(courseId) : undefined;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeTab, setActiveTab] = useState<'lessons' | 'quiz'>('lessons');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  useEffect(() => {
    // If we have a course and an active lesson hasn't been set yet, set the first one.
    if (course && course.lessons && course.lessons.length > 0) {
      if (!activeLesson) {
        setActiveLesson(course.lessons[0]);
      } else {
        // Find the currently active lesson in the updated course object to get the new URL
        const updatedLesson = course.lessons.find(l => l.id === activeLesson.id);
        if (updatedLesson) {
          setActiveLesson(updatedLesson);
        }
      }
    }
  }, [course, activeLesson?.id]); 

  // Reset quiz state when lesson changes
  useEffect(() => {
    setQuizAnswers({});
    setIsQuizSubmitted(false);
    setQuizScore(0);
    setActiveTab('lessons');
  }, [activeLesson?.id]);

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <div className="bg-slate-100 p-4 rounded-full mb-4">
          <Info className="w-8 h-8 text-slate-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">Course Not Found</h2>
        <button 
          onClick={() => navigate('/courses')}
          className="text-purple-600 font-semibold"
        >
          Return to Library
        </button>
      </div>
    );
  }

  // Locking Logic
  const isGlobalCourseLocked = course.isLocked; // Manual Instructor Lock
  const isPremiumLocked = course.isPremium && !isPremium; // Subscription Lock
  
  // A lesson is locked if: The Course is manually locked OR Premium Locked OR the specific lesson is locked (and user not premium)
  const isLessonLocked = isGlobalCourseLocked || isPremiumLocked || (activeLesson && activeLesson.isLocked && !isPremium);
  const isCustomVideo = activeLesson?.videoUrl.startsWith('blob:');

  const handleLessonChange = (lesson: Lesson) => {
    // Prevent changing lessons if the entire course is locked by an admin/instructor
    if (isGlobalCourseLocked || isPremiumLocked) return;
    setActiveLesson(lesson);
  };

  const handleVideoEnded = () => {
    if (courseId && activeLesson && !isLessonLocked) {
      markLessonComplete(courseId, activeLesson.id);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeLesson && courseId) {
      if (!file.type.startsWith('video/')) {
        alert('Please upload a valid video file.');
        return;
      }
      uploadLessonVideo(courseId, activeLesson.id, file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  // Quiz Handlers
  const handleOptionSelect = (questionId: string, optionIndex: number) => {
    if (isQuizSubmitted) return;
    setQuizAnswers(prev => ({...prev, [questionId]: optionIndex}));
  };

  const submitQuiz = () => {
    if (!activeLesson?.quiz) return;
    
    let score = 0;
    activeLesson.quiz.forEach(q => {
        if (quizAnswers[q.id] === q.correctAnswer) {
            score++;
        }
    });
    setQuizScore(score);
    setIsQuizSubmitted(true);
  };

  const retryQuiz = () => {
    setQuizAnswers({});
    setIsQuizSubmitted(false);
    setQuizScore(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Video Player Area - Sticky on Mobile */}
      <div className="sticky top-0 z-30 bg-black w-full aspect-video shadow-lg group relative">
        <div className="relative w-full h-full">
            <button 
                onClick={() => navigate(-1)} 
                className="absolute top-4 left-4 z-20 p-2 bg-black/40 text-white rounded-full backdrop-blur-sm hover:bg-black/60 transition"
            >
                <ArrowLeft className="w-5 h-5" />
            </button>
            {activeLesson || isGlobalCourseLocked || isPremiumLocked ? (
                isLessonLocked ? (
                  /* Locked Overlay */
                  <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center text-center p-6 text-white animate-in fade-in">
                      <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 backdrop-blur-md">
                          {isGlobalCourseLocked ? (
                             <ShieldAlert className="w-8 h-8 text-red-400" />
                          ) : isPremiumLocked ? (
                             <Crown className="w-8 h-8 text-amber-400 fill-current" />
                          ) : (
                             <Lock className="w-8 h-8 text-white/70" />
                          )}
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                          {isGlobalCourseLocked 
                              ? 'Course Temporarily Locked' 
                              : isPremiumLocked 
                                  ? 'Advanced Premium Course' 
                                  : 'This Lesson is Locked'}
                      </h3>
                      <p className="text-white/60 mb-6 max-w-sm text-sm">
                          {isGlobalCourseLocked
                             ? "The instructor has locked this course for updates. Please check back later."
                             : isPremiumLocked 
                                ? "This advanced course is exclusively available for Premium members."
                                : "Upgrade to EduVerse Premium to unlock this lesson and the full course curriculum."
                          }
                      </p>
                      
                      {isPremiumLocked && !isGlobalCourseLocked && (
                          <button 
                              onClick={() => navigate('/premium')}
                              className="px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-xl font-bold shadow-lg hover:scale-105 transition flex items-center gap-2"
                          >
                              <Star className="w-4 h-4 fill-current" />
                              Unlock Premium
                          </button>
                      )}
                  </div>
                ) : (
                  /* Video Player */
                  <div className="relative w-full h-full">
                    <video 
                        key={activeLesson?.videoUrl} // Key forces reload when url changes
                        className="w-full h-full object-cover" 
                        controls 
                        autoPlay
                        poster="https://via.placeholder.com/640x360/1e293b/ffffff?text=EduVerse+Player"
                        onEnded={handleVideoEnded}
                    >
                        <source src={activeLesson?.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    {isCustomVideo && (
                       <div className="absolute top-4 right-4 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded-full backdrop-blur-md flex items-center gap-1 shadow-lg border border-white/10 animate-in fade-in">
                           <FileVideo className="w-3 h-3 text-purple-400" />
                           Instructor Upload
                       </div>
                    )}
                  </div>
                )
            ) : (
                <div className="w-full h-full flex items-center justify-center text-white/50">
                    <p>Select a lesson to start</p>
                </div>
            )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-100 bg-white sticky top-[aspect-video] z-20">
        <button 
            onClick={() => setActiveTab('lessons')}
            className={`flex-1 py-4 text-sm font-bold border-b-2 transition-colors ${
                activeTab === 'lessons' 
                    ? 'border-purple-600 text-purple-600' 
                    : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
        >
            Overview & Lessons
        </button>
        <button 
            onClick={() => setActiveTab('quiz')}
            disabled={isGlobalCourseLocked || isPremiumLocked}
            className={`flex-1 py-4 text-sm font-bold border-b-2 transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'quiz' 
                    ? 'border-purple-600 text-purple-600' 
                    : (isGlobalCourseLocked || isPremiumLocked) ? 'text-slate-300' : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
        >
            <Brain className="w-4 h-4" />
            Practice Quiz
            {activeLesson?.quiz && (
                <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[10px]">{activeLesson.quiz.length}</span>
            )}
        </button>
      </div>

      {/* Content Area */}
      <div className="p-6">
        {activeTab === 'lessons' ? (
            // Overview & Lesson List
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="mb-6">
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold px-2 py-1 bg-purple-50 text-purple-600 rounded-md uppercase tracking-wider">
                                {course.category}
                            </span>
                            {isPremium && (
                                <span className="text-[10px] font-bold px-2 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-md uppercase tracking-wider flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-current" /> Premium
                                </span>
                            )}
                            {isPremiumLocked && (
                                <span className="text-[10px] font-bold px-2 py-1 bg-slate-900 text-white rounded-md uppercase tracking-wider flex items-center gap-1">
                                    <Lock className="w-3 h-3" /> Locked
                                </span>
                            )}
                            {isGlobalCourseLocked && (
                                <span className="text-[10px] font-bold px-2 py-1 bg-red-500 text-white rounded-md uppercase tracking-wider flex items-center gap-1">
                                    <ShieldAlert className="w-3 h-3" /> Admin Locked
                                </span>
                            )}
                        </div>
                        
                        {/* Instructor Controls */}
                        <div className="flex gap-2">
                             {/* Toggle Course Lock Button */}
                             <button
                                onClick={() => toggleCourseLock(course.id)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                                    isGlobalCourseLocked 
                                        ? 'bg-red-100 text-red-700 border border-red-200' 
                                        : 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
                                }`}
                                title={isGlobalCourseLocked ? "Unlock Course" : "Lock Course"}
                            >
                                {isGlobalCourseLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                                <span>{isGlobalCourseLocked ? "Unlock Course" : "Lock Course"}</span>
                            </button>

                            {/* Only show lesson controls if course is active */}
                            {!isGlobalCourseLocked && activeLesson && (
                                <>
                                    <button
                                        onClick={() => toggleLessonLock(course.id, activeLesson.id)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
                                        title={activeLesson.isLocked ? "Unlock Lesson" : "Lock Lesson"}
                                    >
                                        {activeLesson.isLocked ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                                        <span>{activeLesson.isLocked ? "Unlock" : "Lock"}</span>
                                    </button>

                                    <input 
                                        type="file" 
                                        ref={fileInputRef} 
                                        className="hidden" 
                                        accept="video/*" 
                                        onChange={handleFileUpload} 
                                    />
                                    <button 
                                        onClick={triggerFileUpload}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
                                    >
                                        <Upload className="w-3 h-3" />
                                        <span>Upload</span>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    <h1 className="text-xl font-bold text-slate-900 leading-tight mb-2">{course.title}</h1>
                    <p className="text-sm text-slate-500 leading-relaxed">
                        {course.description || "Master this subject with our comprehensive video curriculum designed by industry experts."}
                    </p>
                </div>

                <div>
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        Course Content 
                        <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{course.lessons?.length || 0} Lessons</span>
                    </h3>
                    
                    <div className="space-y-3">
                        {course.lessons && course.lessons.length > 0 ? (
                            course.lessons.map((lesson, index) => {
                                // A lesson is effectively locked if course is manually locked, premium locked, or individually locked
                                const isEffectiveLocked = isGlobalCourseLocked || isPremiumLocked || (lesson.isLocked && !isPremium);
                                const isActive = activeLesson?.id === lesson.id;
                                const isCompleted = lesson.isCompleted;
                                
                                return (
                                <button
                                    key={lesson.id}
                                    onClick={() => handleLessonChange(lesson)}
                                    disabled={isGlobalCourseLocked || isPremiumLocked}
                                    className={`w-full flex items-center gap-4 p-3 rounded-xl border transition-all text-left ${
                                        isActive 
                                            ? 'bg-purple-50 border-purple-200' 
                                            : 'bg-white border-slate-100 hover:bg-slate-50'
                                    } ${(isGlobalCourseLocked || isPremiumLocked) ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    <div className="relative shrink-0">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                            isActive 
                                                ? 'bg-purple-600 text-white' 
                                                : isEffectiveLocked
                                                    ? 'bg-slate-100 text-slate-400'
                                                    : isCompleted
                                                        ? 'bg-green-100 text-green-600'
                                                        : 'bg-purple-100 text-purple-600'
                                        }`}>
                                            {isEffectiveLocked ? (
                                                <Lock className="w-4 h-4" />
                                            ) : isActive ? (
                                                <PlayCircle className="w-5 h-5" />
                                            ) : isCompleted ? (
                                                <CheckCircle className="w-5 h-5" />
                                            ) : (
                                                <span className="text-sm font-bold">{index + 1}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h4 className={`text-sm font-semibold ${
                                                isActive ? 'text-purple-900' : isCompleted ? 'text-slate-500' : 'text-slate-700'
                                            }`}>
                                                {lesson.title}
                                            </h4>
                                            {/* Show yellow unlock only if explicitly locked by lesson flag but premium unlocked it, and no global lock exists */}
                                            {lesson.isLocked && isPremium && !isPremiumLocked && !isGlobalCourseLocked && (
                                                <Unlock className="w-3 h-3 text-amber-500" />
                                            )}
                                        </div>
                                        <p className="text-xs text-slate-500 flex items-center gap-1">
                                        {lesson.duration} • 
                                        {lesson.videoUrl.startsWith('blob:') ? (
                                            <span className="text-purple-600 font-medium flex items-center gap-0.5"><FileVideo className="w-3 h-3"/> Custom</span>
                                        ) : 'Video'}
                                        </p>
                                    </div>
                                    {isActive && (
                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse"></div>
                                    )}
                                </button>
                            )})
                        ) : (
                            <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                <p className="text-slate-400 text-sm">Course content is being uploaded.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        ) : (
            // Quiz Tab
            <div className="animate-in fade-in slide-in-from-right-2 duration-300">
                {!activeLesson?.quiz || activeLesson.quiz.length === 0 ? (
                    <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Brain className="w-8 h-8 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-700 mb-1">No Quiz Available</h3>
                        <p className="text-slate-500 text-sm">There is no practice quiz for this lesson yet.</p>
                        <button 
                            onClick={() => setActiveTab('lessons')}
                            className="mt-4 text-purple-600 font-bold text-sm hover:underline"
                        >
                            Back to Lessons
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-lg font-bold text-slate-800">Lesson Quiz</h2>
                        </div>

                        {/* Result Card */}
                        {isQuizSubmitted && (
                            <div className={`p-6 rounded-2xl text-center border-2 animate-in slide-in-from-top-4 ${
                                quizScore === activeLesson.quiz.length 
                                    ? 'bg-green-50 border-green-100' 
                                    : 'bg-white border-slate-100 shadow-sm'
                            }`}>
                                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 ${
                                    quizScore === activeLesson.quiz.length 
                                    ? 'bg-green-100 text-green-600' 
                                    : 'bg-purple-100 text-purple-600'
                                }`}>
                                    {quizScore === activeLesson.quiz.length ? <Star className="w-8 h-8 fill-current" /> : <Award className="w-8 h-8" />}
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-1">
                                    {quizScore === activeLesson.quiz.length ? 'Perfect Score!' : 'Quiz Completed'}
                                </h3>
                                <p className="text-slate-600 mb-4">
                                    You scored <span className="font-bold text-slate-900 text-lg">{quizScore}/{activeLesson.quiz.length}</span> correct answers.
                                </p>
                            </div>
                        )}

                        <div className="space-y-6">
                            {activeLesson.quiz.map((q, qIndex) => {
                                const isCorrect = quizAnswers[q.id] === q.correctAnswer;
                                const hasAnswered = quizAnswers[q.id] !== undefined;

                                return (
                                    <div key={q.id} className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                                        <h3 className="font-semibold text-slate-800 mb-4 flex gap-3">
                                            <span className="text-slate-400 font-bold">{qIndex + 1}.</span>
                                            {q.question}
                                        </h3>
                                        <div className="space-y-2.5">
                                            {q.options.map((option, oIndex) => {
                                                let buttonStyle = "bg-white border-slate-200 text-slate-600 hover:bg-slate-50";
                                                let icon = null;

                                                if (isQuizSubmitted) {
                                                    if (oIndex === q.correctAnswer) {
                                                        buttonStyle = "bg-green-100 border-green-300 text-green-800 font-medium";
                                                        icon = <CheckCircle className="w-4 h-4 text-green-600" />;
                                                    } else if (quizAnswers[q.id] === oIndex) {
                                                        buttonStyle = "bg-red-50 border-red-200 text-red-800";
                                                        icon = <XCircle className="w-4 h-4 text-red-500" />;
                                                    } else {
                                                        buttonStyle = "bg-white border-slate-100 text-slate-400 opacity-60";
                                                    }
                                                } else if (quizAnswers[q.id] === oIndex) {
                                                    buttonStyle = "bg-purple-100 border-purple-300 text-purple-800 font-medium ring-1 ring-purple-300";
                                                }

                                                return (
                                                    <button
                                                        key={oIndex}
                                                        onClick={() => handleOptionSelect(q.id, oIndex)}
                                                        disabled={isQuizSubmitted}
                                                        className={`w-full text-left p-3 rounded-lg border text-sm transition-all flex items-center justify-between ${buttonStyle}`}
                                                    >
                                                        <span>{option}</span>
                                                        {icon}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="pt-4 pb-8">
                            {!isQuizSubmitted ? (
                                <button
                                    onClick={submitQuiz}
                                    disabled={Object.keys(quizAnswers).length !== activeLesson.quiz.length}
                                    className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold shadow-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    Submit Answers
                                </button>
                            ) : (
                                <button
                                    onClick={retryQuiz}
                                    className="w-full py-3.5 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    Retry Quiz
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        )}
      </div>
    </div>
  );
};