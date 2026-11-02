import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, BookOpenCheck, Sparkles } from 'lucide-react';
import { subjectsData, SUBJECT_CATEGORIES } from '../data/subjects';
import SubjectCard from '../components/SubjectCard';
import StepIndicator from '../components/StepIndicator';
import { useEnrollment } from '../context/EnrollmentContext';

const SubjectsPage = () => {
  const navigate = useNavigate();
  const { selectedSubject, selectSubject } = useEnrollment();

  const programmingSubjects = subjectsData.filter(
    (s) => s.category === SUBJECT_CATEGORIES.PROGRAMMING
  );
  
  const academicSubjects = subjectsData.filter(
    (s) => s.category === SUBJECT_CATEGORIES.ACADEMIC
  );

  const handleSelectSubject = (subject) => {
    selectSubject(subject);
    navigate(`/tutors?subject=${subject.id}`);
  };

  return (
    <div className="subjects-page">
      {/* Multi-step progress indicator */}
      <StepIndicator currentStep={1} />

      <section className="section section-light">
        <div className="container">
          {/* Header */}
          <div className="section-header">
            <h1 className="section-title">Select a Subject</h1>
            <p className="section-subtitle">
              Choose from our curated programming languages or academic disciplines to discover qualified 1-on-1 private tutors.
            </p>
          </div>

          {/* Category A: Programming Languages */}
          <div className="category-section">
            <div className="category-header">
              <div className="category-badge-icon">
                <Code size={24} />
              </div>
              <div>
                <h3>Category A: Programming Languages</h3>
                <p>Master coding fundamentals, system programming, algorithms, and software development</p>
              </div>
            </div>

            <div className="subjects-grid">
              {programmingSubjects.map((subject) => (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  isSelected={selectedSubject?.id === subject.id}
                  onSelect={handleSelectSubject}
                />
              ))}
            </div>
          </div>

          {/* Category B: Academic Subjects */}
          <div className="category-section">
            <div className="category-header">
              <div className="category-badge-icon">
                <BookOpenCheck size={24} />
              </div>
              <div>
                <h3>Category B: Academic Subjects</h3>
                <p>Build strong analytical thinking, conceptual clarity, and academic exam excellence</p>
              </div>
            </div>

            <div className="subjects-grid">
              {academicSubjects.map((subject) => (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  isSelected={selectedSubject?.id === subject.id}
                  onSelect={handleSelectSubject}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubjectsPage;

