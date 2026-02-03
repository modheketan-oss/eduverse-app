import { Certificate, Course, Internship, UserRole } from "./types";

// Sample video URLs (Open source samples for demo purposes)
const SAMPLE_VIDEO_1 = "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
const SAMPLE_VIDEO_2 = "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
const SAMPLE_VIDEO_3 = "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

export const MOCK_COURSES: Course[] = [
  // --- Academic Excellence (K-12) ---
  {
    id: 'k12_1',
    title: 'Mathematics - Class 10 (Real Numbers & Algebra)',
    description: 'Master the fundamentals of Real Numbers, Polynomials, and Quadratic Equations with visual problem-solving techniques.',
    lessonsCount: 45,
    duration: '32h',
    category: 'Academic',
    progress: 75,
    imageColor: 'bg-blue-500',
    lessons: [
      { 
        id: 'l1', 
        title: 'Introduction to Real Numbers', 
        duration: '10:05', 
        videoUrl: SAMPLE_VIDEO_1, 
        isLocked: false,
        quiz: [
          {
            id: 'q1',
            question: 'Which of the following is NOT a real number?',
            options: ['0', '-5', 'Square root of -1', 'Pi'],
            correctAnswer: 2
          },
          {
            id: 'q2',
            question: 'Euclid’s Division Lemma states that for any two positive integers a and b, there exist unique integers q and r such that:',
            options: ['a = bq + r, 0 ≤ r < b', 'a = bq - r, 0 ≤ r < b', 'a = bq + r, 0 < r < b', 'a = bq + r, r > b'],
            correctAnswer: 0
          }
        ]
      },
      { id: 'l2', title: 'Euclid’s Division Lemma', duration: '15:30', videoUrl: SAMPLE_VIDEO_2, isLocked: false },
      { id: 'l3', title: 'Fundamental Theorem of Arithmetic', duration: '12:45', videoUrl: SAMPLE_VIDEO_3, isLocked: false },
      { id: 'l4', title: 'Revisiting Irrational Numbers', duration: '18:20', videoUrl: SAMPLE_VIDEO_1, isLocked: true },
    ]
  },
  {
    id: 'k12_2',
    title: 'Physics - Class 12 (Electrostatics & Optics)',
    lessonsCount: 60,
    duration: '45h',
    category: 'Academic',
    progress: 30,
    imageColor: 'bg-cyan-600',
    lessons: [
      { id: 'p1', title: 'Electric Charges and Fields', duration: '14:20', videoUrl: SAMPLE_VIDEO_2, isLocked: false },
      { id: 'p2', title: 'Electrostatic Potential', duration: '20:10', videoUrl: SAMPLE_VIDEO_3, isLocked: false },
      { id: 'p3', title: 'Capacitance and Dielectrics', duration: '16:05', videoUrl: SAMPLE_VIDEO_1, isLocked: true },
    ]
  },
  {
    id: 'k12_3',
    title: 'Chemistry - Class 11 (Organic Fundamentals)',
    lessonsCount: 50,
    duration: '38h',
    category: 'Academic',
    progress: 0,
    imageColor: 'bg-teal-500'
  },
  {
    id: 'k12_4',
    title: 'Biology - Class 12 (Genetics & Evolution)',
    lessonsCount: 55,
    duration: '40h',
    category: 'Academic',
    progress: 0,
    imageColor: 'bg-emerald-500'
  },

  // --- Higher Education (Degree/Diploma) ---
  {
    id: 'high_1',
    title: 'Engineering Mathematics I (Matrices & Calculus)',
    lessonsCount: 80,
    duration: '60h',
    category: 'Higher Ed',
    progress: 10,
    imageColor: 'bg-indigo-600',
    lessons: [
       { id: 'h1', title: 'Matrices: Rank & System of Equations', duration: '25:00', videoUrl: SAMPLE_VIDEO_3, isLocked: false },
       { id: 'h2', title: 'Eigenvalues and Eigenvectors', duration: '30:15', videoUrl: SAMPLE_VIDEO_1, isLocked: true },
    ]
  },
  {
    id: 'high_2',
    title: 'Data Structures & Algorithms (B.Tech CS)',
    lessonsCount: 120,
    duration: '90h',
    category: 'Higher Ed',
    progress: 45,
    imageColor: 'bg-violet-600'
  },
  {
    id: 'high_3',
    title: 'Human Anatomy - Year 1 (MBBS)',
    lessonsCount: 150,
    duration: '110h',
    category: 'Higher Ed',
    progress: 0,
    imageColor: 'bg-rose-600'
  },
  {
    id: 'high_4',
    title: 'Financial Accounting (B.Com/MBA)',
    lessonsCount: 70,
    duration: '50h',
    category: 'Higher Ed',
    progress: 0,
    imageColor: 'bg-blue-700'
  },

  // --- Emerging Technologies (Certified Skills) ---
  {
    id: 'tech_1',
    title: 'Generative AI & LLM Engineering',
    description: 'Learn how to build Large Language Model applications using modern frameworks and prompt engineering.',
    lessonsCount: 40,
    duration: '35h',
    category: 'Skills',
    progress: 15,
    imageColor: 'bg-fuchsia-600',
    lessons: [
      { id: 't1', title: 'Introduction to GenAI', duration: '08:45', videoUrl: SAMPLE_VIDEO_1, isLocked: false },
      { id: 't2', title: 'Prompt Engineering Basics', duration: '12:30', videoUrl: SAMPLE_VIDEO_2, isLocked: false },
      { id: 't3', title: 'Fine-tuning LLMs', duration: '22:15', videoUrl: SAMPLE_VIDEO_3, isLocked: true },
    ]
  },
  {
    id: 'tech_2',
    title: 'Electric Vehicle (EV) Battery Systems',
    lessonsCount: 35,
    duration: '28h',
    category: 'Skills',
    progress: 0,
    imageColor: 'bg-green-600'
  },
  {
    id: 'tech_3',
    title: 'Full Stack Web Dev (MERN Stack)',
    lessonsCount: 90,
    duration: '75h',
    category: 'Skills',
    progress: 55,
    imageColor: 'bg-cyan-500'
  },
  {
    id: 'tech_4',
    title: 'Cloud Solutions Architect (AWS)',
    lessonsCount: 50,
    duration: '40h',
    category: 'Skills',
    progress: 0,
    imageColor: 'bg-orange-500'
  },

  // --- Business School ---
  {
    id: 'bus_1',
    title: 'Digital Marketing & SEO Strategy',
    lessonsCount: 45,
    duration: '30h',
    category: 'Business',
    progress: 0,
    imageColor: 'bg-purple-500'
  },
  {
    id: 'bus_2',
    title: 'Startup Zero to One: Entrepreneurship',
    lessonsCount: 25,
    duration: '20h',
    category: 'Business',
    progress: 10,
    imageColor: 'bg-pink-600'
  },
  {
    id: 'bus_3',
    title: 'Corporate Finance & Valuation',
    lessonsCount: 30,
    duration: '25h',
    category: 'Business',
    progress: 0,
    imageColor: 'bg-slate-700'
  },
  
  // --- ADVANCED PREMIUM COURSES ---
  {
    id: 'adv_tech_1',
    title: 'Advanced Computer Vision & Robotics',
    description: 'Deep dive into SLAM, Object Detection, and Autonomous Navigation systems.',
    lessonsCount: 65,
    duration: '55h',
    category: 'Skills',
    progress: 0,
    imageColor: 'bg-slate-800',
    isPremium: true
  },
  {
    id: 'adv_bus_1',
    title: 'Global Strategic Management',
    description: 'Executive level strategies for multinational scaling and M&A.',
    lessonsCount: 40,
    duration: '35h',
    category: 'Business',
    progress: 0,
    imageColor: 'bg-indigo-900',
    isPremium: true
  },
  {
    id: 'adv_high_1',
    title: 'Neuroscience & Cognitive Computing',
    description: 'Intersection of biological brains and artificial neural networks.',
    lessonsCount: 50,
    duration: '45h',
    category: 'Higher Ed',
    progress: 0,
    imageColor: 'bg-fuchsia-900',
    isPremium: true
  }
];

export const MOCK_CERTIFICATES: Certificate[] = [
  {
    id: 'cert1',
    title: 'Python for Data Science',
    issueDate: 'Jan 15, 2025',
    downloadUrl: '#'
  },
  {
    id: 'cert2',
    title: 'Digital Marketing Fundamentals',
    issueDate: 'Dec 20, 2024',
    downloadUrl: '#'
  },
  {
    id: 'cert3',
    title: 'Introduction to Cloud Computing',
    issueDate: 'Nov 05, 2024',
    downloadUrl: '#'
  }
];

export const MOCK_INTERNSHIPS: Internship[] = [
  {
    id: 'int1',
    title: 'React Native Developer',
    company: 'AppInnovate Labs',
    mentor: 'Sarah Chen (Senior Dev)',
    status: 'Active',
    week: 3,
    totalWeeks: 8
  },
  {
    id: 'int2',
    title: 'AI/ML Research Intern',
    company: 'Neural Nexus',
    mentor: 'Dr. A. Patel',
    status: 'Available',
    totalWeeks: 12,
    spotsLeft: 3
  },
  {
    id: 'int3',
    title: 'EV Systems Engineer',
    company: 'Future Motors',
    mentor: 'Mike Ross',
    status: 'Available',
    totalWeeks: 10,
    spotsLeft: 7
  },
  {
    id: 'int4',
    title: 'Social Media Strategist',
    company: 'GrowthHack Agency',
    mentor: 'Jessica Pearson',
    status: 'Available',
    totalWeeks: 6,
    spotsLeft: 12
  },
  {
    id: 'int5',
    title: 'Financial Analyst Intern',
    company: 'Global FinCorp',
    mentor: 'Harvey Specter',
    status: 'Available',
    totalWeeks: 8,
    spotsLeft: 5
  }
];

export const PERSONA_OPTIONS = [
  {
    id: UserRole.Student,
    title: 'School Student',
    subtitle: '1st to 12th Standard',
    icon: 'book',
    gradient: 'from-cyan-400 to-blue-500'
  },
  {
    id: UserRole.College,
    title: 'College Student',
    subtitle: 'Degree & Diploma',
    icon: 'graduation-cap',
    gradient: 'from-fuchsia-400 to-purple-600'
  },
  {
    id: UserRole.Professional,
    title: 'Professional',
    subtitle: 'Upskilling & Career',
    icon: 'briefcase',
    gradient: 'from-orange-400 to-red-500'
  }
];