export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "student" | "admin";
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  notes: string;
  videoPlaceholderUrl?: string;
  resources?: string[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  rating: number;
  instructorName: string;
  instructorTitle: string;
  instructorAvatar: string;
  duration: string;
  lessons: Lesson[];
  progress: number; // 0 to 100
  enrolled: boolean;
}

export interface Certificate {
  id: string;
  courseName: string;
  issueDate: string;
  verificationId: string;
  recipientName: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  unlockedAt?: string;
}

export interface CareerPath {
  id: string;
  title: string;
  focus: string;
  completion: number;
  highlights: string[];
  recommendedCourses: string[];
}

export interface DiscussionReply {
  id: string;
  author: string;
  text: string;
  upvotes: number;
}

export interface Discussion {
  id: string;
  title: string;
  author: string;
  category: string;
  replies: DiscussionReply[];
  upvotes: number;
  answered: boolean;
  lastActivity: string;
}

export interface WeeklyActivity {
  date: string;
  label: string;
  completed: boolean;
}

export interface Quote {
  text: string;
  author: string;
}

export const CATEGORIES = [
  "Programming",
  "Mathematics",
  "Science",
  "AI & ML",
  "English",
  "Career Development",
];

export const MOTIVATIONAL_QUOTES: Quote[] = [
  {
    text: "Education is the most powerful weapon which you can use to change the world.",
    author: "Nelson Mandela",
  },
  {
    text: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
    author: "Mahatma Gandhi",
  },
  {
    text: "The beautiful thing about learning is that no one can take it away from you.",
    author: "B.B. King",
  },
  {
    text: "Learning is never done without errors and defeat.",
    author: "Vladimir Lenin",
  },
  {
    text: "Start where you are. Use what you have. Do what you can.",
    author: "Arthur Ashe",
  },
];

export const INITIAL_USER: User = {
  id: "user_01",
  name: "Rohan Sharma",
  email: "rohan.sharma@eduverse.org",
  avatar:
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80",
  role: "student",
};

export const INITIAL_COURSES: Course[] = [
  {
    id: "course_prog_1",
    title: "Introduction to Python programming",
    description:
      "Learn the fundamentals of Python programming from scratch. Perfect for absolute beginners starting their coding journey.",
    category: "Programming",
    thumbnail:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    instructorName: "Dr. Alok Kumar",
    instructorTitle: "Senior CS Professor",
    instructorAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    duration: "12 Hours",
    enrolled: true,
    progress: 60,
    lessons: [
      {
        id: "lesson_py_1",
        title: "Variables and Data Types",
        duration: "15 mins",
        completed: true,
        notes:
          "Variables are used to store data. In Python, you do not need to declare types explicitly. For example, x = 5 creates an integer variable.",
        resources: ["Python Cheat Sheet.pdf", "Variables Practice.py"],
      },
      {
        id: "lesson_py_2",
        title: "Control Flow (If/Else)",
        duration: "20 mins",
        completed: true,
        notes:
          "Control flow allows code decisions. Use `if`, `elif`, and `else` blocks with proper indentation (4 spaces).",
        resources: ["Control Flow Exercises.pdf"],
      },
      {
        id: "lesson_py_3",
        title: "Loops (For & While)",
        duration: "25 mins",
        completed: true,
        notes:
          "Loops execute a block of code multiple times. Use `for item in sequence` for iteration and `while condition` for conditional loops.",
        resources: ["Loops Worksheet.pdf"],
      },
      {
        id: "lesson_py_4",
        title: "Functions & Modules",
        duration: "30 mins",
        completed: false,
        notes:
          "Functions are defined using the `def` keyword. They promote code reusability. Modules allow importing code from other files.",
        resources: ["Functions Practice.py"],
      },
      {
        id: "lesson_py_5",
        title: "Introduction to Data Structures",
        duration: "45 mins",
        completed: false,
        notes:
          "Learn about Python Lists, Dictionaries, Sets, and Tuples, and when to use each.",
        resources: ["Data Structures Cheat Sheet.pdf"],
      },
    ],
  },
  {
    id: "course_aiml_1",
    title: "Foundations of Artificial Intelligence",
    description:
      "Explore neural networks, machine learning basics, and how AI is shaping the world, written for easy understanding.",
    category: "AI & ML",
    thumbnail:
      "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    instructorName: "Priya Narang",
    instructorTitle: "AI Research Scientist",
    instructorAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    duration: "8 Hours",
    enrolled: true,
    progress: 25,
    lessons: [
      {
        id: "lesson_ai_1",
        title: "What is AI & Machine Learning?",
        duration: "18 mins",
        completed: true,
        notes:
          "AI is the broad field of creating intelligent systems. Machine Learning is a subset where systems learn patterns from data.",
        resources: ["AI History & Core Concepts.pdf"],
      },
      {
        id: "lesson_ai_2",
        title: "Supervised vs Unsupervised Learning",
        duration: "22 mins",
        completed: false,
        notes:
          "Supervised learning uses labeled training data (inputs/outputs), while Unsupervised learning works with unlabeled data to find hidden groupings.",
        resources: ["ML Types Diagram.jpg"],
      },
      {
        id: "lesson_ai_3",
        title: "How Neural Networks Work",
        duration: "35 mins",
        completed: false,
        notes:
          "Neural networks are inspired by the human brain. They consist of input, hidden, and output layers passing numeric signals.",
        resources: ["Neural Nets Interactive.pdf"],
      },
    ],
  },
  {
    id: "course_math_1",
    title: "Practical Mathematics for Daily Life",
    description:
      "Master essential arithmetic, fractions, ratios, and basic geometry helpful for financial management and agricultural calculations.",
    category: "Mathematics",
    thumbnail:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    instructorName: "Suresh Deshmukh",
    instructorTitle: "Mathematics Educator",
    instructorAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    duration: "15 Hours",
    enrolled: false,
    progress: 0,
    lessons: [
      {
        id: "lesson_math_1",
        title: "Ratios, Percentages, and Interest",
        duration: "20 mins",
        completed: false,
        notes:
          "Learn how to compute discount prices, interest on loans, and simple percentages for daily budgeting.",
        resources: ["Interest Calculator Worksheet.pdf"],
      },
      {
        id: "lesson_math_2",
        title: "Fractions and Measurements",
        duration: "25 mins",
        completed: false,
        notes:
          "Understand units of measurement (liters, kilograms, meters) and how to scale recipes or land division.",
      },
    ],
  },
  {
    id: "course_english_1",
    title: "Communicative English & Confidence",
    description:
      "Learn simple English speaking structures, self-introductions, basic grammar, and conversation skills for jobs.",
    category: "English",
    thumbnail:
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    instructorName: "Mary D’Souza",
    instructorTitle: "Language Instructor",
    instructorAvatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    duration: "10 Hours",
    enrolled: false,
    progress: 0,
    lessons: [
      {
        id: "lesson_eng_1",
        title: "Greeting and Self Introduction",
        duration: "12 mins",
        completed: false,
        notes:
          'Introduce yourself confidently: "Hello, my name is... I am from... I work as a... Nice to meet you."',
        resources: ["Greeting Scripts.pdf"],
      },
      {
        id: "lesson_eng_2",
        title: "Constructing Basic Sentences",
        duration: "18 mins",
        completed: false,
        notes:
          'Subject + Verb + Object structure. Practice daily actions: "I write code.", "She studies science."',
      },
    ],
  },
  {
    id: "course_career_1",
    title: "Career Readiness & Job Interview Guide",
    description:
      "Prepare your resume, learn to answer common interview questions, and build professional communication skills.",
    category: "Career Development",
    thumbnail:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    instructorName: "Amit Verma",
    instructorTitle: "HR Consultant & Coach",
    instructorAvatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80",
    duration: "6 Hours",
    enrolled: true,
    progress: 100,
    lessons: [
      {
        id: "lesson_car_1",
        title: "Creating an Impressive Resume",
        duration: "20 mins",
        completed: true,
        notes:
          "Keep resumes clear, action-oriented, and tailored to the job profile. Mention skills, experience, and education details.",
      },
      {
        id: "lesson_car_2",
        title: "Handling Tough Interview Questions",
        duration: "30 mins",
        completed: true,
        notes:
          'Answer "Tell me about yourself" and "What are your strengths" using the STAR method (Situation, Task, Action, Result).',
      },
    ],
  },
];

export const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: "cert_01",
    courseName: "Career Readiness & Job Interview Guide",
    issueDate: "May 18, 2026",
    verificationId: "EV-8294-8201",
    recipientName: "Rohan Sharma",
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "ach_01",
    title: "First Course",
    description: "Completed your first course and earned a badge",
    icon: "BookOpen",
    progress: 100,
    unlockedAt: "May 10, 2026",
  },
  {
    id: "ach_02",
    title: "Fast Learner",
    description: "Finished a course in under 48 hours",
    icon: "Zap",
    progress: 85,
    unlockedAt: "May 12, 2026",
  },
  {
    id: "ach_03",
    title: "AI Explorer",
    description: "Asked the AI Tutor 5 educational questions",
    icon: "MessageSquare",
    progress: 60,
    unlockedAt: undefined,
  },
  {
    id: "ach_04",
    title: "Consistency Champion",
    description: "Maintained a learning streak for 7 days",
    icon: "Layers",
    progress: 40,
    unlockedAt: undefined,
  },
  {
    id: "ach_05",
    title: "Quiz Master",
    description: "Scored above 90% in your practice quizzes",
    icon: "Award",
    progress: 70,
    unlockedAt: undefined,
  },
  {
    id: "ach_06",
    title: "Top Performer",
    description: "Completed 5 courses and stayed engaged every week",
    icon: "ShieldCheck",
    progress: 30,
    unlockedAt: undefined,
  },
];

export const CAREER_PATHS: CareerPath[] = [
  {
    id: "career_software",
    title: "Software Engineering",
    focus: "Build scalable apps, system design, and collaboration skills.",
    completion: 62,
    highlights: [
      "Core coding projects",
      "Developer tools & Git workflows",
      "Architecture fundamentals",
    ],
    recommendedCourses: [
      "Introduction to Python programming",
      "Career Readiness & Job Interview Guide",
    ],
  },
  {
    id: "career_data",
    title: "Data Science",
    focus: "Learn data handling, analysis, and predictive modeling techniques.",
    completion: 45,
    highlights: [
      "Data cleaning best practices",
      "Intro to statistics",
      "Visualization patterns",
    ],
    recommendedCourses: [
      "Foundations of Artificial Intelligence",
      "Practical Mathematics for Daily Life",
    ],
  },
  {
    id: "career_ai",
    title: "AI Engineering",
    focus:
      "Design intelligent systems, neural nets, and responsible AI products.",
    completion: 28,
    highlights: [
      "Machine learning foundations",
      "Model evaluation & ethics",
      "AI project planning",
    ],
    recommendedCourses: [
      "Foundations of Artificial Intelligence",
      "Introduction to Python programming",
    ],
  },
  {
    id: "career_cyber",
    title: "Cybersecurity",
    focus:
      "Protect digital systems with strong security fundamentals and tools.",
    completion: 12,
    highlights: [
      "Network safety basics",
      "Secure coding habits",
      "Threat awareness",
    ],
    recommendedCourses: [
      "Career Readiness & Job Interview Guide",
      "Practical Mathematics for Daily Life",
    ],
  },
];

export const COMMUNITY_DISCUSSIONS: Discussion[] = [
  {
    id: "disc_01",
    title: "How to build a study routine for exams?",
    author: "Priya S.",
    category: "Study Habits",
    replies: [
      {
        id: "r1",
        author: "Sara",
        text: "Try blocking 25 minutes and taking short breaks.",
        upvotes: 23,
      },
      {
        id: "r2",
        author: "Arjun",
        text: "Review notes each evening to keep concepts fresh.",
        upvotes: 18,
      },
    ],
    upvotes: 41,
    answered: true,
    lastActivity: "2 hours ago",
  },
  {
    id: "disc_02",
    title: "What is the easiest way to understand recursion?",
    author: "Manoj K.",
    category: "Programming",
    replies: [
      {
        id: "r3",
        author: "Ananya",
        text: "Think of it like a mirror reflecting itself step by step.",
        upvotes: 32,
      },
    ],
    upvotes: 32,
    answered: true,
    lastActivity: "5 hours ago",
  },
  {
    id: "disc_03",
    title: "Can someone explain blockchain in simple words?",
    author: "Sneha R.",
    category: "Technology",
    replies: [],
    upvotes: 14,
    answered: false,
    lastActivity: "1 day ago",
  },
  {
    id: "disc_04",
    title: "Best offline study resources for math?",
    author: "Rahul D.",
    category: "Mathematics",
    replies: [
      {
        id: "r4",
        author: "Neha",
        text: "Download lesson summaries and practice PDFs for review.",
        upvotes: 19,
      },
    ],
    upvotes: 19,
    answered: true,
    lastActivity: "3 days ago",
  },
];
