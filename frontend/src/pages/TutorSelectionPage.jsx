import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, AlertCircle, Sparkles, Filter } from 'lucide-react';
import { subjectsData } from '../data/subjects';
import { getTutorsBySubject, tutorsData } from '../data/tutors';
import TutorCard from '../components/TutorCard';
import StepIndicator from '../components/StepIndicator';
import { useEnrollment } from '../context/EnrollmentContext';
import { tutorsAPI } from '../services/api';

const TutorSelectionPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { selectedSubject, selectSubject, selectedTutor, selectTutor } = useEnrollment();

  const [validationError, setValidationError] = useState('');
  const [tutorList, setTutorList] = useState([]);

  // Read subject from query param or fallback to context
  const querySubjectId = searchParams.get('subject');

  useEffect(() => {
    if (querySubjectId) {
      const match = subjectsData.find((s) => s.id === querySubjectId);
      if (match && (!selectedSubject || selectedSubject.id !== match.id)) {
        selectSubject(match);
      }
    } else if (selectedSubject) {
      setSearchParams({ subject: selectedSubject.id });
    }
  }, [querySubjectId, selectedSubject]);

  const activeSubject = selectedSubject || subjectsData.find((s) => s.id === querySubjectId) || subjectsData[0];

  useEffect(() => {
    if (activeSubject?.id) {
      // Set initial from local data
      setTutorList(getTutorsBySubject(activeSubject.id));
      // Fetch from MongoDB
      tutorsAPI.getAll(activeSubject.id)
        .then((res) => {
          if (res?.data && res.data.length > 0) {
            setTutorList(res.data);
          }
        })
        .catch((err) => console.log('Tutors loaded from local cache:', err.message));
    }
  }, [activeSubject?.id]);

  const tutors = tutorList.length > 0 ? tutorList : getTutorsBySubject(activeSubject?.id);

  const handleTutorSelect = (tutor) => {
    setValidationError('');
    selectTutor(tutor);
    // Smooth auto-scroll or allow user to click continue
  };

  const handleSubjectChange = (newSubjectId) => {
    const newSubj = subjectsData.find((s) => s.id === newSubjectId);
    if (newSubj) {
      selectSubject(newSubj);
      setSearchParams({ subject: newSubj.id });
    }
  };

  const handleContinue = () => {
    if (!selectedTutor) {
      setValidationError('Please select a tutor to proceed with your schedule configuration.');
      return;
    }
    navigate('/schedule');
  };

  return (
    <div className="tutor-selection-page">
      <StepIndicator currentStep={2} />

      <section className="section section-light">
        <div className="container">
          {/* Top Bar with Subject Pill & Switcher */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '32px',
            padding: '18px 24px',
            backgroundColor: 'var(--pure-white)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: 'rgba(57, 183, 167, 0.15)',
                color: 'var(--teal-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <BookOpen size={20} />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--text-muted)', fontWeight: 700 }}>
                  Selected Subject
                </span>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--navy-dark)', margin: 0 }}>
                  {activeSubject ? activeSubject.name : 'All Subjects'}
                </h3>
              </div>
            </div>

            {/* Quick Subject Switcher */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <label htmlFor="subject-switcher" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                Switch Subject:
              </label>
              <select
                id="subject-switcher"
                value={activeSubject?.id || ''}
                onChange={(e) => handleSubjectChange(e.target.value)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--off-white)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'var(--navy-dark)',
                  cursor: 'pointer'
                }}
              >
                {subjectsData.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.category})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Section Header */}
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <h1 className="section-title">
              Available Tutors for {activeSubject?.name}
            </h1>
            <p className="section-subtitle">
              Compare qualified instructors, verify their credentials and monthly fees, and choose your preferred 1-on-1 mentor.
            </p>
          </div>

          {/* Validation Notice if user attempted to continue without selecting */}
          {validationError && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#FEF2F2',
              border: '1px solid #FCA5A5',
              color: '#991B1B',
              padding: '14px 20px',
              borderRadius: '8px',
              marginBottom: '28px',
              maxWidth: '800px',
              margin: '0 auto 28px auto'
            }}>
              <AlertCircle size={20} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{validationError}</span>
            </div>
          )}

          {/* Tutor Cards Grid */}
          <div className="tutors-grid">
            {tutors.map((tutor) => (
              <TutorCard
                key={tutor.id}
                tutor={tutor}
                isSelected={selectedTutor?.id === tutor.id}
                onSelect={handleTutorSelect}
              />
            ))}
          </div>

          {/* Action Navigation Bar */}
          <div className="flow-action-bar">
            <button
              type="button"
              onClick={() => navigate('/subjects')}
              className="btn btn-ghost"
            >
              <ArrowLeft size={18} />
              <span>Back to Subjects</span>
            </button>

            <button
              type="button"
              onClick={handleContinue}
              className={`btn btn-primary btn-lg ${!selectedTutor ? 'disabled' : ''}`}
            >
              <span>{selectedTutor ? `Continue with ${selectedTutor.name}` : 'Select a Tutor to Continue'}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TutorSelectionPage;

