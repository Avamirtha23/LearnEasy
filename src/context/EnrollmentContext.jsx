import React, { createContext, useContext, useState, useEffect } from 'react';
import { subjectsData } from '../data/subjects';
import { tutorsData } from '../data/tutors';

const EnrollmentContext = createContext();

export const AVAILABLE_TIME_SLOTS = [
  { id: 'slot-1', label: '6:00 PM – 7:00 PM', period: 'Evening Slot', note: 'Ideal after school & college' },
  { id: 'slot-2', label: '7:00 PM – 8:00 PM', period: 'Prime Slot', note: 'Most requested hour' },
  { id: 'slot-3', label: '8:00 PM – 9:00 PM', period: 'Night Slot', note: 'Quiet, focused learning' },
];

export const AVAILABLE_DURATIONS = [
  { months: 1, label: '1 Month', badge: 'Standard Starter' },
  { months: 2, label: '2 Months', badge: 'Fast Track' },
  { months: 3, label: '3 Months', badge: 'Most Popular' },
  { months: 4, label: '4 Months', badge: 'Comprehensive' },
  { months: 6, label: '6 Months', badge: 'Semester Mastery' },
  { months: 12, label: '12 Months', badge: 'Full Year Excellence' },
];

export const EnrollmentProvider = ({ children }) => {
  // Initialize state from localStorage if present
  const [selectedSubject, setSelectedSubjectState] = useState(() => {
    try {
      const saved = localStorage.getItem('learneasy_subject');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [selectedTutor, setSelectedTutorState] = useState(() => {
    try {
      const saved = localStorage.getItem('learneasy_tutor');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [sessionTiming, setSessionTimingState] = useState(() => {
    try {
      const saved = localStorage.getItem('learneasy_timing');
      return saved || '';
    } catch {
      return '';
    }
  });

  const [courseDuration, setCourseDurationState] = useState(() => {
    try {
      const saved = localStorage.getItem('learneasy_duration');
      return saved ? Number(saved) : null;
    } catch {
      return null;
    }
  });

  // Keep localStorage synchronized
  useEffect(() => {
    try {
      if (selectedSubject) {
        localStorage.setItem('learneasy_subject', JSON.stringify(selectedSubject));
      } else {
        localStorage.removeItem('learneasy_subject');
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [selectedSubject]);

  useEffect(() => {
    try {
      if (selectedTutor) {
        localStorage.setItem('learneasy_tutor', JSON.stringify(selectedTutor));
      } else {
        localStorage.removeItem('learneasy_tutor');
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [selectedTutor]);

  useEffect(() => {
    try {
      if (sessionTiming) {
        localStorage.setItem('learneasy_timing', sessionTiming);
      } else {
        localStorage.removeItem('learneasy_timing');
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [sessionTiming]);

  useEffect(() => {
    try {
      if (courseDuration) {
        localStorage.setItem('learneasy_duration', String(courseDuration));
      } else {
        localStorage.removeItem('learneasy_duration');
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [courseDuration]);

  // Actions
  const selectSubject = (subject) => {
    // If selecting by ID or by object
    let target = subject;
    if (typeof subject === 'string') {
      target = subjectsData.find((s) => s.id === subject) || null;
    }
    setSelectedSubjectState(target);

    // If changing subject, check if previously selected tutor still matches
    if (selectedTutor && target && selectedTutor.subjectId !== target.id) {
      setSelectedTutorState(null);
    }
  };

  const selectTutor = (tutor) => {
    let target = tutor;
    if (typeof tutor === 'string') {
      target = tutorsData.find((t) => t.id === tutor) || null;
    }
    setSelectedTutorState(target);

    // If tutor is selected and subject not set, infer subject
    if (target && !selectedSubject) {
      const parentSubject = subjectsData.find((s) => s.id === target.subjectId);
      if (parentSubject) {
        setSelectedSubjectState(parentSubject);
      }
    }
  };

  const selectTiming = (slot) => {
    setSessionTimingState(slot);
  };

  const selectDuration = (months) => {
    setCourseDurationState(Number(months));
  };

  const resetEnrollment = () => {
    setSelectedSubjectState(null);
    setSelectedTutorState(null);
    setSessionTimingState('');
    setCourseDurationState(null);
    try {
      localStorage.removeItem('learneasy_subject');
      localStorage.removeItem('learneasy_tutor');
      localStorage.removeItem('learneasy_timing');
      localStorage.removeItem('learneasy_duration');
    } catch (e) {
      console.warn('LocalStorage clear error:', e);
    }
  };

  // Dynamic calculations
  const monthlyFee = selectedTutor ? selectedTutor.monthlyFee : 0;
  const totalCost = monthlyFee * (courseDuration || 0);

  const value = {
    selectedSubject,
    selectedTutor,
    sessionTiming,
    courseDuration,
    monthlyFee,
    totalCost,
    selectSubject,
    selectTutor,
    selectTiming,
    selectDuration,
    resetEnrollment,
    isSubjectSelected: Boolean(selectedSubject),
    isTutorSelected: Boolean(selectedTutor),
    isTimingSelected: Boolean(sessionTiming),
    isDurationSelected: Boolean(courseDuration),
    isComplete: Boolean(selectedSubject && selectedTutor && sessionTiming && courseDuration)
  };

  return (
    <EnrollmentContext.Provider value={value}>
      {children}
    </EnrollmentContext.Provider>
  );
};

export const useEnrollment = () => {
  const context = useContext(EnrollmentContext);
  if (!context) {
    throw new Error('useEnrollment must be used within an EnrollmentProvider');
  }
  return context;
};

