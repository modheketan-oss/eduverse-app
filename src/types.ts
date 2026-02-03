export enum UserRole {
  Student = 'Student',
  College = 'College',
  Professional = 'Professional'
}

export interface User {
  name: string;
  email: string;
  role?: UserRole;
  isPremium: boolean;
  avatar?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string; // URL to the video file
  isLocked: boolean;
  isCompleted?: boolean;
  quiz?: QuizQuestion[];
}

export interface Course {
  id: string;
  title: string;
  lessonsCount: number; // Renamed from 'lessons' to avoid conflict, or kept as display count
  duration: string;
  category: 'Academic' | 'Higher Ed' | 'Skills' | 'Business';
  progress: number; // 0-100
  imageColor: string;
  lessons?: Lesson[]; // Optional array of actual lesson data
  description?: string;
  isPremium?: boolean; // New field for advanced courses
  isLocked?: boolean; // New field for instructor-level course locking
}

export interface Internship {
  id: string;
  title: string;
  company: string;
  mentor: string;
  status: 'Active' | 'Available';
  week?: number;
  totalWeeks?: number;
  spotsLeft?: number;
}

export interface Certificate {
  id: string;
  title: string;
  issueDate: string;
  downloadUrl: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  sources?: { title: string; uri: string }[];
}