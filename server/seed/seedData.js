/**
 * LearnEasy Database Seeder
 * Run: node seed/seedData.js
 * Seeds all Subjects and Tutors into MongoDB.
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Subject = require('../models/Subject');
const Tutor = require('../models/Tutor');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/learneasy';

// ─── DATA ───────────────────────────────────────────────────────────────────

const subjects = [
  // Programming Languages
  {
    id: 'c',
    name: 'C Programming',
    category: 'Programming Languages',
    icon: 'Terminal',
    tag: 'Core Foundation',
    description: 'Master core procedural programming, memory management, pointers, bitwise logic, and fast algorithm execution.',
    popularTopics: ['Pointers & Dynamic Memory', 'Structures & Unions', 'Algorithms & Data Structures'],
  },
  {
    id: 'cpp',
    name: 'C++',
    category: 'Programming Languages',
    icon: 'Cpu',
    tag: 'High Performance',
    description: 'Deep dive into Object-Oriented Programming, Standard Template Library (STL), memory models, and competitive coding.',
    popularTopics: ['OOP Concepts', 'STL & Iterators', 'Competitive Programming'],
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Programming Languages',
    icon: 'Code2',
    tag: 'Most In-Demand',
    description: 'Learn clean, elegant Python programming from fundamentals to real-world scripting, automation, web backends, and data science.',
    popularTopics: ['Data Structures & OOP', 'Scripting & Automation', 'API & Web Basics'],
  },
  {
    id: 'java',
    name: 'Java',
    category: 'Programming Languages',
    icon: 'FileCode',
    tag: 'Enterprise Standard',
    description: 'Build robust object-oriented software, explore multithreading, collections framework, design patterns, and JVM architecture.',
    popularTopics: ['OOP & Encapsulation', 'Collections & Generics', 'Multithreading & JDBC'],
  },
  // Academic Subjects
  {
    id: 'mathematics',
    name: 'Mathematics',
    category: 'Academic Subjects',
    icon: 'Compass',
    tag: 'Essential Core',
    description: 'Simplify complex concepts across Algebra, Calculus, Trigonometry, Coordinate Geometry, and advanced numerical problem solving.',
    popularTopics: ['Calculus & Differential Eq', 'Linear Algebra & Vectors', 'Probability & Statistics'],
  },
  {
    id: 'english',
    name: 'English',
    category: 'Academic Subjects',
    icon: 'BookOpen',
    tag: 'Communication',
    description: 'Sharpen your communicative prowess, advanced grammar precision, critical literature reading, and formal creative writing.',
    popularTopics: ['Grammar & Composition', 'Literature Analysis', 'Academic Writing & Spoken English'],
  },
  {
    id: 'science',
    name: 'General Science',
    category: 'Academic Subjects',
    icon: 'Atom',
    tag: 'Foundation',
    description: 'Interactive and inquiry-driven learning across fundamental sciences, scientific methodology, and real-world experiments.',
    popularTopics: ['Scientific Method', 'Environmental Science', 'Introductory Physical & Life Sciences'],
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    category: 'Academic Subjects',
    icon: 'FlaskConical',
    tag: 'Physical & Organic',
    description: 'Unravel chemical bonding, organic reaction mechanisms, stoichiometry, thermodynamics, and the periodic table in depth.',
    popularTopics: ['Organic Mechanisms', 'Thermodynamics & Kinetics', 'Periodic Trends & Chemical Bonding'],
  },
  {
    id: 'physics',
    name: 'Physics',
    category: 'Academic Subjects',
    icon: 'Zap',
    tag: 'Analytical',
    description: 'Grasp the mechanics of nature: Newtonian dynamics, electromagnetism, wave optics, thermodynamics, and modern physics.',
    popularTopics: ['Newtonian Mechanics', 'Electricity & Magnetism', 'Modern Physics & Quantum Basics'],
  },
  {
    id: 'biology',
    name: 'Biology',
    category: 'Academic Subjects',
    icon: 'Dna',
    tag: 'Life Sciences',
    description: 'Explore the wonders of life: cellular biology, genetics and heredity, human anatomy, ecology, and evolutionary physiology.',
    popularTopics: ['Cellular Biology & Genetics', 'Human Physiology', 'Ecology & Evolutionary Biology'],
  },
];

const tutors = [
  // C Programming
  { id: 'tutor-c-1', subjectId: 'c', name: 'Anand Krishnamurthy', qualification: 'M.Tech in Computer Science & Engineering', college: 'IIT Madras', experience: 7, specialization: 'Low-Level Systems & Memory Management', monthlyFee: 2200, rating: 4.9, reviewCount: 42, description: 'Expert systems engineer passionate about teaching pointers, dynamic memory allocation, and OS-level C programming from the ground up.' },
  { id: 'tutor-c-2', subjectId: 'c', name: 'Rohit Deshmukh', qualification: 'B.Tech in Information Technology', college: 'COEP Pune', experience: 4, specialization: 'Procedural Logic & Algorithmic Problem Solving', monthlyFee: 1800, rating: 4.8, reviewCount: 31, description: 'Patient mentor focusing on college syllabus clarity, debugging techniques, and building strong computational logic using pure C.' },
  { id: 'tutor-c-3', subjectId: 'c', name: 'Siddharth Menon', qualification: 'M.S. in Embedded Systems', college: 'BITS Pilani', experience: 6, specialization: 'Embedded C & Hardware Interfacing', monthlyFee: 2400, rating: 4.95, reviewCount: 38, description: 'Bridges theoretical C syntax with real-world microcontroller programming, memory optimization, and competitive coding fundamentals.' },

  // C++
  { id: 'tutor-cpp-1', subjectId: 'cpp', name: 'Arjun Singhal', qualification: 'M.Tech in Software Engineering', college: 'IIT Delhi', experience: 8, specialization: 'Modern C++ (C++17/20) & Competitive Programming', monthlyFee: 2600, rating: 4.95, reviewCount: 56, description: 'Competitive programming veteran helping students master STL containers, template metaprogramming, and optimal time-space algorithmic complexity.' },
  { id: 'tutor-cpp-2', subjectId: 'cpp', name: 'Neha Kapoor', qualification: 'B.Tech in Computer Science', college: 'DTU New Delhi', experience: 5, specialization: 'Object-Oriented Design & Game Engine Basics', monthlyFee: 2100, rating: 4.85, reviewCount: 29, description: 'Simplifies classes, inheritance, polymorphism, and virtual tables using interactive diagrammatic demonstrations and project-based assignments.' },
  { id: 'tutor-cpp-3', subjectId: 'cpp', name: 'Gaurav Mukherjee', qualification: 'Ph.D. Scholar in Computer Systems', college: 'Jadavpur University', experience: 6, specialization: 'High-Performance Computing & Concurrency', monthlyFee: 2300, rating: 4.9, reviewCount: 34, description: 'Specializes in C++ memory models, smart pointers, RAII, and preparing undergraduates for technical coding rounds at top tech firms.' },

  // Python
  { id: 'tutor-py-1', subjectId: 'python', name: 'Rahul Kumar', qualification: 'M.Tech in Computer Science', college: 'IIT Bombay', experience: 5, specialization: 'Python Programming & Automation', monthlyFee: 2000, rating: 4.9, reviewCount: 64, description: 'Experienced software practitioner who teaches Python through hands-on scripting, clean object-oriented code, and real-world automation tasks.' },
  { id: 'tutor-py-2', subjectId: 'python', name: 'Pooja Venkatesh', qualification: 'M.Sc. in Data Analytics', college: "St. Xavier's College, Mumbai", experience: 4, specialization: 'Python for Beginners & Data Foundations', monthlyFee: 1900, rating: 4.8, reviewCount: 45, description: 'Makes programming approachable for absolute beginners through step-by-step exercises, Pythonic idioms, and gentle introductions to libraries.' },
  { id: 'tutor-py-3', subjectId: 'python', name: 'Devendra Patel', qualification: 'B.E. in Information Technology', college: 'LD College of Engineering, Ahmedabad', experience: 7, specialization: 'Backend APIs & Full-Stack Python', monthlyFee: 2500, rating: 4.95, reviewCount: 52, description: 'Hands-on mentor teaching Python fundamentals, file handling, REST APIs, and database integration for school and college learners.' },

  // Java
  { id: 'tutor-java-1', subjectId: 'java', name: 'Vikramaditya Rao', qualification: 'M.Tech in Software Systems', college: 'IIIT Hyderabad', experience: 9, specialization: 'Enterprise Java, OOP & Spring Boot Architecture', monthlyFee: 2500, rating: 4.92, reviewCount: 68, description: 'Enterprise consultant and educator specializing in JVM internals, multithreading, modular design patterns, and rigorous OOP principles.' },
  { id: 'tutor-java-2', subjectId: 'java', name: 'Meera Nambiar', qualification: 'MCA (Master of Computer Applications)', college: 'NIT Calicut', experience: 5, specialization: 'Core Java & Academic Curriculum', monthlyFee: 1950, rating: 4.88, reviewCount: 37, description: 'Friendly tutor skilled in deconstructing abstract OOP concepts, exception handling, and Java Collections Framework for students.' },
  { id: 'tutor-java-3', subjectId: 'java', name: 'Amanpreet Singh', qualification: 'B.Tech in Computer Engineering', college: 'Thapar Institute of Engineering', experience: 6, specialization: 'Java Data Structures & Competitive Coding', monthlyFee: 2200, rating: 4.85, reviewCount: 41, description: 'Combines theoretical computer science with rigorous Java implementation, guiding students through practical projects and mock interview problems.' },

  // Mathematics
  { id: 'tutor-math-1', subjectId: 'mathematics', name: 'Dr. Sarah Jenkins', qualification: 'Ph.D. in Applied Mathematics', college: 'University of Delhi', experience: 8, specialization: 'Calculus, Vectors & Linear Algebra', monthlyFee: 2400, rating: 4.95, reviewCount: 82, description: 'Renowned mathematics educator known for intuitive geometric proofs, step-by-step calculus mastery, and building rock-solid numerical foundations.' },
  { id: 'tutor-math-2', subjectId: 'mathematics', name: 'Sanjay Aggarwal', qualification: 'M.Sc. in Mathematics', college: 'Panjab University', experience: 6, specialization: 'High School & Board Exam Preparation', monthlyFee: 1800, rating: 4.84, reviewCount: 49, description: 'Focuses on concept retention, shortcut problem-solving methods, and helping students conquer exam anxiety through structured regular practice.' },
  { id: 'tutor-math-3', subjectId: 'mathematics', name: 'Nandini Swaminathan', qualification: 'B.Sc. & M.Sc. in Pure Mathematics', college: 'Loyola College, Chennai', experience: 5, specialization: 'Trigonometry, Coordinate Geometry & Algebra', monthlyFee: 2000, rating: 4.9, reviewCount: 39, description: 'Passionate mathematician who believes every student can love math when concepts are illustrated with visual examples and daily life analogies.' },

  // English
  { id: 'tutor-eng-1', subjectId: 'english', name: 'Dr. Evelyn Carter', qualification: 'Ph.D. in English Literature', college: 'Jawaharlal Nehru University (JNU)', experience: 9, specialization: 'Critical Analysis, Literary Theory & Writing', monthlyFee: 2100, rating: 4.96, reviewCount: 54, description: 'Cultivates eloquence, sharp analytical prose, and deep literary interpretation across classical literature, poetry, and modern drama.' },
  { id: 'tutor-eng-2', subjectId: 'english', name: 'Kavita Chawla', qualification: 'M.A. in English & Applied Linguistics', college: 'Lady Shri Ram College, DU', experience: 5, specialization: 'Grammar Precision & Creative Composition', monthlyFee: 1750, rating: 4.86, reviewCount: 46, description: 'Creates interactive sessions focused on conversational confidence, syntax mastery, vocabulary enrichment, and academic essay construction.' },
  { id: 'tutor-eng-3', subjectId: 'english', name: 'David Thomas', qualification: 'M.Ed. in Language Pedagogy', college: 'EFL University, Hyderabad', experience: 7, specialization: 'Spoken English & Professional Communication', monthlyFee: 1950, rating: 4.9, reviewCount: 35, description: 'Focuses on phonetics, accent neutralisation, presentation delivery, and comprehensive reading strategies for competitive exam prep.' },

  // General Science
  { id: 'tutor-sci-1', subjectId: 'science', name: 'Prof. Alex Mercer', qualification: 'M.Sc. in Interdisciplinary Sciences', college: 'Christ University, Bengaluru', experience: 6, specialization: 'Conceptual Middle & High School Science', monthlyFee: 1900, rating: 4.88, reviewCount: 47, description: 'Passionate about sparking scientific curiosity through thought experiments, visual simulation models, and real-life phenomenon analysis.' },
  { id: 'tutor-sci-2', subjectId: 'science', name: 'Ritu Banerjee', qualification: 'M.Sc. in Physical & Natural Sciences', college: 'Presidency University, Kolkata', experience: 5, specialization: 'Integrated Science & Inquiry Learning', monthlyFee: 1700, rating: 4.82, reviewCount: 33, description: 'Helps students connect scientific theories with hands-on everyday applications, ensuring crystal-clear fundamental understanding.' },
  { id: 'tutor-sci-3', subjectId: 'science', name: 'Suresh Raghavan', qualification: 'B.Ed. & M.Sc. in Applied Science', college: 'Madras Christian College', experience: 8, specialization: 'Olympiad Foundation & Board Exam Coaching', monthlyFee: 2100, rating: 4.92, reviewCount: 50, description: 'Specializes in preparing students for junior science Olympiads and foundation courses with custom notes and regular diagnostic quizzes.' },

  // Chemistry
  { id: 'tutor-chem-1', subjectId: 'chemistry', name: 'Dr. Shalini Saxena', qualification: 'Ph.D. in Organic Chemistry', college: 'IISc Bangalore', experience: 8, specialization: 'Organic Mechanisms & Stereochemistry', monthlyFee: 2500, rating: 4.97, reviewCount: 62, description: 'Makes organic chemistry intuitive by replacing rote memorization with electron-pushing logic, molecular geometry, and reaction pathways.' },
  { id: 'tutor-chem-2', subjectId: 'chemistry', name: 'Manish Verma', qualification: 'M.Sc. in Physical Chemistry', college: 'BHU Varanasi', experience: 6, specialization: 'Chemical Kinetics & Thermodynamics', monthlyFee: 2000, rating: 4.87, reviewCount: 41, description: 'Focuses on numerical accuracy in physical chemistry equations, equilibrium calculations, and crystal lattice structure visualization.' },
  { id: 'tutor-chem-3', subjectId: 'chemistry', name: 'Geetha Balakrishnan', qualification: 'M.Sc. in Inorganic Chemistry', college: 'Anna University, Chennai', experience: 5, specialization: 'Coordination Compounds & Periodic Trends', monthlyFee: 1850, rating: 4.84, reviewCount: 30, description: 'Guides students through tricky periodic trends, chemical bonding theories, and qualitative salt analysis with clear concise summary sheets.' },

  // Physics
  { id: 'tutor-phy-1', subjectId: 'physics', name: 'Prof. Harish Bhat', qualification: 'M.Tech & Ph.D. in Applied Physics', college: 'IIT Roorkee', experience: 10, specialization: 'Mechanics, Electrodynamics & Wave Optics', monthlyFee: 2700, rating: 4.98, reviewCount: 75, description: 'Master physics teacher who uses vector diagrams and free-body analysis to make complex classical mechanics and electrodynamics effortless.' },
  { id: 'tutor-phy-2', subjectId: 'physics', name: 'Ananya Roy', qualification: 'M.Sc. in Theoretical Physics', college: "St. Stephen's College, Delhi", experience: 5, specialization: 'Optics, Thermodynamics & Modern Physics', monthlyFee: 2100, rating: 4.89, reviewCount: 44, description: 'Dedicated educator who breaks down modern physics, photoelectric effect, and thermodynamics into engaging conceptual stories.' },
  { id: 'tutor-phy-3', subjectId: 'physics', name: 'Tanmay Kulkarni', qualification: 'B.Tech in Engineering Physics', college: 'NIT Surathkal', experience: 6, specialization: 'Numerical Problem Solving & Ray Optics', monthlyFee: 2200, rating: 4.86, reviewCount: 38, description: 'Emphasizes practical derivation techniques and step-by-step mathematical setups for physics word problems in school and entrance tests.' },

  // Biology
  { id: 'tutor-bio-1', subjectId: 'biology', name: 'Dr. Pratibha Joshi', qualification: 'Ph.D. in Molecular Biology & Genetics', college: 'AIIMS New Delhi', experience: 7, specialization: 'Genetics, Molecular Biology & Cell Physiology', monthlyFee: 2400, rating: 4.94, reviewCount: 58, description: 'Renowned biology scholar guiding students through genetics, DNA replication, gene expression, and cellular architecture with vivid diagrams.' },
  { id: 'tutor-bio-2', subjectId: 'biology', name: 'Vinay Chandran', qualification: 'M.Sc. in Zoology & Animal Physiology', college: 'University of Hyderabad', experience: 5, specialization: 'Human Anatomy & Organ Systems', monthlyFee: 1900, rating: 4.85, reviewCount: 36, description: 'Specializes in human anatomy, nervous system, cardiovascular physiology, and helping students remember complex anatomical nomenclature.' },
  { id: 'tutor-bio-3', subjectId: 'biology', name: 'Farida Khan', qualification: 'M.Sc. in Botany & Environmental Sciences', college: 'Aligarh Muslim University', experience: 6, specialization: 'Plant Physiology, Ecology & Biotechnology', monthlyFee: 1800, rating: 4.88, reviewCount: 40, description: 'Brings botany and ecology to life with mind maps, mnemonic devices, and structured revision schedules for high academic performance.' },
];

// ─── SEED FUNCTION ───────────────────────────────────────────────────────────

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB for seeding...');

    // Clear existing data
    await Subject.deleteMany({});
    await Tutor.deleteMany({});
    console.log('🗑️  Cleared existing subjects and tutors.');

    // Insert fresh data
    await Subject.insertMany(subjects);
    console.log(`✅ Seeded ${subjects.length} subjects.`);

    await Tutor.insertMany(tutors);
    console.log(`✅ Seeded ${tutors.length} tutors.`);

    console.log('\n🎉 Database seeded successfully! You can now start the server.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err.message);
    process.exit(1);
  }
};

seedDatabase();

