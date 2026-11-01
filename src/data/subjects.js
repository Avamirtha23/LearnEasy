export const SUBJECT_CATEGORIES = {
  PROGRAMMING: 'Programming Languages',
  ACADEMIC: 'Academic Subjects'
};

export const subjectsData = [
  // Category A: Programming Languages
  {
    id: 'c',
    name: 'C Programming',
    category: SUBJECT_CATEGORIES.PROGRAMMING,
    icon: 'Terminal',
    tag: 'Core Foundation',
    description: 'Master core procedural programming, memory management, pointers, bitwise logic, and fast algorithm execution.',
    popularTopics: ['Pointers & Dynamic Memory', 'Structures & Unions', 'Algorithms & Data Structures']
  },
  {
    id: 'cpp',
    name: 'C++',
    category: SUBJECT_CATEGORIES.PROGRAMMING,
    icon: 'Cpu',
    tag: 'High Performance',
    description: 'Deep dive into Object-Oriented Programming, Standard Template Library (STL), memory models, and competitive coding.',
    popularTopics: ['OOP Concepts', 'STL & Iterators', 'Competitive Programming']
  },
  {
    id: 'python',
    name: 'Python',
    category: SUBJECT_CATEGORIES.PROGRAMMING,
    icon: 'Code2',
    tag: 'Most In-Demand',
    description: 'Learn clean, elegant Python programming from fundamentals to real-world scripting, automation, web backends, and data science.',
    popularTopics: ['Data Structures & OOP', 'Scripting & Automation', 'API & Web Basics']
  },
  {
    id: 'java',
    name: 'Java',
    category: SUBJECT_CATEGORIES.PROGRAMMING,
    icon: 'FileCode',
    tag: 'Enterprise Standard',
    description: 'Build robust object-oriented software, explore multithreading, collections framework, design patterns, and JVM architecture.',
    popularTopics: ['OOP & Encapsulation', 'Collections & Generics', 'Multithreading & JDBC']
  },

  // Category B: Academic Subjects
  {
    id: 'mathematics',
    name: 'Mathematics',
    category: SUBJECT_CATEGORIES.ACADEMIC,
    icon: 'Compass',
    tag: 'Essential Core',
    description: 'Simplify complex concepts across Algebra, Calculus, Trigonometry, Coordinate Geometry, and advanced numerical problem solving.',
    popularTopics: ['Calculus & Differential Eq', 'Linear Algebra & Vectors', 'Probability & Statistics']
  },
  {
    id: 'english',
    name: 'English',
    category: SUBJECT_CATEGORIES.ACADEMIC,
    icon: 'BookOpen',
    tag: 'Communication',
    description: 'Sharpen your communicative prowess, advanced grammar precision, critical literature reading, and formal creative writing.',
    popularTopics: ['Grammar & Composition', 'Literature Analysis', 'Academic Writing & Spoken English']
  },
  {
    id: 'science',
    name: 'General Science',
    category: SUBJECT_CATEGORIES.ACADEMIC,
    icon: 'Atom',
    tag: 'Foundation',
    description: 'Interactive and inquiry-driven learning across fundamental sciences, scientific methodology, and real-world experiments.',
    popularTopics: ['Scientific Method', 'Environmental Science', 'Introductory Physical & Life Sciences']
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    category: SUBJECT_CATEGORIES.ACADEMIC,
    icon: 'FlaskConical',
    tag: 'Physical & Organic',
    description: 'Unravel chemical bonding, organic reaction mechanisms, stoichiometry, thermodynamics, and the periodic table in depth.',
    popularTopics: ['Organic Mechanisms', 'Thermodynamics & Kinetics', 'Periodic Trends & Chemical Bonding']
  },
  {
    id: 'physics',
    name: 'Physics',
    category: SUBJECT_CATEGORIES.ACADEMIC,
    icon: 'Zap',
    tag: 'Analytical',
    description: 'Grasp the mechanics of nature: Newtonian dynamics, electromagnetism, wave optics, thermodynamics, and modern physics.',
    popularTopics: ['Newtonian Mechanics', 'Electricity & Magnetism', 'Modern Physics & Quantum Basics']
  },
  {
    id: 'biology',
    name: 'Biology',
    category: SUBJECT_CATEGORIES.ACADEMIC,
    icon: 'Dna',
    tag: 'Life Sciences',
    description: 'Explore the wonders of life: cellular biology, genetics and heredity, human anatomy, ecology, and evolutionary physiology.',
    popularTopics: ['Cellular Biology & Genetics', 'Human Physiology', 'Ecology & Evolutionary Biology']
  }
];

