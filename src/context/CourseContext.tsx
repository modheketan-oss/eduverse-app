import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Course } from '../types';
import { MOCK_COURSES } from '../constants';

interface CourseContextType {
  courses: Course[];
  getCourse: (id: string) => Course | undefined;
  uploadLessonVideo: (courseId: string, lessonId: string, file: File) => void;
  updateCourseProgress: (courseId: string, progress: number) => void;
  markLessonComplete: (courseId: string, lessonId: string) => void;
  toggleLessonLock: (courseId: string, lessonId: string) => void;
  toggleCourseLock: (courseId: string) => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from local storage or fallback to mock data
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('eduverse_courses');
    if (saved) {
      // Merge saved data with MOCK_COURSES structure to ensure new fields/courses from code updates appear
      // but progress is preserved.
      const parsedCourses = JSON.parse(saved) as Course[];
      return MOCK_COURSES.map(mockCourse => {
        const savedCourse = parsedCourses.find(c => c.id === mockCourse.id);
        if (savedCourse) {
          return {
            ...mockCourse,
            progress: savedCourse.progress,
            isLocked: savedCourse.isLocked, // Persist manual lock state
            lessons: mockCourse.lessons?.map(l => {
                const savedLesson = savedCourse.lessons?.find(sl => sl.id === l.id);
                // Note: We cannot persist Blob URLs across sessions, so we reset videoUrl unless it's external
                return savedLesson ? { 
                  ...l, 
                  isLocked: savedLesson.isLocked,
                  isCompleted: savedLesson.isCompleted 
                } : l;
            })
          };
        }
        return mockCourse;
      });
    }
    return MOCK_COURSES;
  });

  // Persist courses whenever they change
  useEffect(() => {
    localStorage.setItem('eduverse_courses', JSON.stringify(courses));
  }, [courses]);

  const getCourse = (id: string) => {
    return courses.find(c => c.id === id);
  };

  const updateCourseProgress = (courseId: string, progress: number) => {
    setCourses(prev => prev.map(c => c.id === courseId ? { ...c, progress } : c));
  };

  const markLessonComplete = (courseId: string, lessonId: string) => {
    setCourses(prevCourses => prevCourses.map(course => {
      if (course.id !== courseId) return course;

      const updatedLessons = course.lessons?.map(lesson => {
        if (lesson.id !== lessonId) return lesson;
        return { ...lesson, isCompleted: true };
      }) || [];

      // Calculate new progress
      const totalLessons = updatedLessons.length;
      const completedCount = updatedLessons.filter(l => l.isCompleted).length;
      const newProgress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

      return { 
        ...course, 
        lessons: updatedLessons,
        progress: newProgress 
      };
    }));
  };

  const uploadLessonVideo = (courseId: string, lessonId: string, file: File) => {
    const videoUrl = URL.createObjectURL(file);

    setCourses(prevCourses => prevCourses.map(course => {
      if (course.id !== courseId) return course;

      // Update the specific lesson in the course
      const updatedLessons = course.lessons?.map(lesson => {
        if (lesson.id !== lessonId) return lesson;
        return { ...lesson, videoUrl: videoUrl };
      });

      return { ...course, lessons: updatedLessons };
    }));
  };

  const toggleLessonLock = (courseId: string, lessonId: string) => {
    setCourses(prevCourses => prevCourses.map(course => {
      if (course.id !== courseId) return course;

      const updatedLessons = course.lessons?.map(lesson => {
        if (lesson.id !== lessonId) return lesson;
        return { ...lesson, isLocked: !lesson.isLocked };
      });

      return { ...course, lessons: updatedLessons };
    }));
  };

  const toggleCourseLock = (courseId: string) => {
    setCourses(prev => prev.map(course => 
      course.id === courseId ? { ...course, isLocked: !course.isLocked } : course
    ));
  };

  return (
    <CourseContext.Provider value={{ courses, getCourse, uploadLessonVideo, updateCourseProgress, markLessonComplete, toggleLessonLock, toggleCourseLock }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
};