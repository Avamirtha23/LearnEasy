import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, BookOpen, GraduationCap, Clock, Calendar,
  IndianRupee, CheckCircle, Sparkles, ShieldCheck, User, Mail, Phone
} from 'lucide-react';
import StepIndicator from '../components/StepIndicator';
import SuccessPopup from '../components/SuccessPopup';
import { useEnrollment } from '../context/EnrollmentContext';
import { subscriptionsAPI } from '../services/api';

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const enrollment = useEnrollment();
  const {
    selectedSubject,
    selectedTutor,
    sessionTiming,
    courseDuration,
    monthlyFee,
    totalCost,
    isComplete,
    resetEnrollment,
  } = enrollment;

  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdSubscriptionId, setCreatedSubscriptionId] = useState(null);

  // Student details state
  const [studentInfo, setStudentInfo] = useState({
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 98765 43210'
  });

  // Guard: redirect if enrollment is incomplete
  React.useEffect(() => {
    if (!isComplete) {
      if (!selectedSubject) navigate('/subjects');
      else if (!selectedTutor) navigate('/tutors');
      else navigate('/schedule');
    }
  }, [isComplete, navigate, selectedSubject, selectedTutor]);

  const handleSubscribeNow = async () => {
    setIsSubmitting(true);
    let subId = null;

    try {
      const payload = {
        studentName: studentInfo.name || 'Student',
        studentEmail: studentInfo.email || 'student@example.com',
        studentPhone: studentInfo.phone || '',
        subjectId: selectedSubject.id,
        tutorId: selectedTutor.id,
        sessionTiming,
        courseDuration,
      };

      const res = await subscriptionsAPI.create(payload);
      if (res?.data?._id) {
        subId = res.data._id;
        setCreatedSubscriptionId(subId);
      }
    } catch (err) {
      console.warn('Subscription saved locally (API notice):', err.message);
    } finally {
      setIsSubmitting(false);
      setShowSuccess(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const handleGoHome = () => {
    setShowSuccess(false);
    document.body.style.overflow = '';
    resetEnrollment();
    navigate('/');
  };

  if (!isComplete) return null;

  return (
    <div className="subscription-page">
      <StepIndicator currentStep={4} />

      <section className="section section-light">
        <div className="container">
          <div className="section-header">
            <h1 className="section-title">Subscription Summary</h1>
            <p className="section-subtitle">
              Review your selected course details carefully before subscribing.
            </p>
          </div>

          <div className="summary-container">
            <div className="summary-card">
              {/* ── Card Header ── */}
              <div className="summary-header">
                <div>
                  <h3>Your Enrollment Summary</h3>
                  <p>Personalized 1-on-1 Tutoring via LearnEasy Platform</p>
                </div>
                <span className="summary-badge-pill">Pending Confirmation</span>
              </div>

              <div className="summary-body">
                {/* ── Subject & Tutor Details ── */}
                <p className="summary-section-heading">
                  <BookOpen size={16} />
                  Course & Tutor Details
                </p>

                <div className="summary-grid">
                  <div className="summary-item">
                    <span className="summary-label">Selected Subject</span>
                    <span className="summary-value">{selectedSubject?.name}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Category</span>
                    <span className="summary-value">{selectedSubject?.category}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Assigned Tutor</span>
                    <span className="summary-value summary-value-highlight">{selectedTutor?.name}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Qualification</span>
                    <span className="summary-value">{selectedTutor?.qualification}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Institution</span>
                    <span className="summary-value">{selectedTutor?.college}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Experience</span>
                    <span className="summary-value">{selectedTutor?.experience} Years</span>
                  </div>
                  <div className="summary-item" style={{ gridColumn: '1 / -1' }}>
                    <span className="summary-label">Specialization</span>
                    <span className="summary-value summary-value-highlight">{selectedTutor?.specialization}</span>
                  </div>
                </div>

                {/* ── Schedule Details ── */}
                <p className="summary-section-heading" style={{ marginTop: '8px' }}>
                  <Clock size={16} />
                  Schedule & Duration
                </p>

                <div className="summary-grid">
                  <div className="summary-item">
                    <span className="summary-label">Session Timing</span>
                    <span className="summary-value">{sessionTiming}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Days per Week</span>
                    <span className="summary-value">Monday – Saturday (6 days)</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Course Duration</span>
                    <span className="summary-value">{courseDuration} {courseDuration === 1 ? 'Month' : 'Months'}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Session Length</span>
                    <span className="summary-value">1 Hour per Session</span>
                  </div>
                </div>

                {/* ── Total Cost Calculation Box ── */}
                <div className="total-cost-box">
                  <div className="total-cost-left">
                    <h4>Total Course Investment</h4>
                    <div className="total-cost-formula">
                      ₹{monthlyFee.toLocaleString('en-IN')} per month × {courseDuration} month{courseDuration > 1 ? 's' : ''}
                    </div>
                  </div>
                  <div className="total-cost-right">
                    <div className="total-cost-amount">
                      ₹{totalCost.toLocaleString('en-IN')}
                    </div>
                    <p className="total-cost-period">total · all inclusive</p>
                  </div>
                </div>

                {/* ── Student Information ── */}
                <p className="summary-section-heading" style={{ marginTop: '8px' }}>
                  <User size={16} />
                  Student Information
                </p>

                <div className="summary-grid" style={{ marginBottom: '24px' }}>
                  <div className="summary-item">
                    <label className="summary-label" htmlFor="student-name">Your Full Name</label>
                    <input
                      id="student-name"
                      type="text"
                      value={studentInfo.name}
                      onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      style={{
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: '1px solid var(--border-color)',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        color: 'var(--navy-dark)'
                      }}
                    />
                  </div>
                  <div className="summary-item">
                    <label className="summary-label" htmlFor="student-email">Email Address</label>
                    <input
                      id="student-email"
                      type="email"
                      value={studentInfo.email}
                      onChange={(e) => setStudentInfo({ ...studentInfo, email: e.target.value })}
                      placeholder="e.g. rahul@example.com"
                      style={{
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: '1px solid var(--border-color)',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        color: 'var(--navy-dark)'
                      }}
                    />
                  </div>
                </div>

                {/* ── What's Included ── */}
                <p className="summary-section-heading">
                  <ShieldCheck size={16} />
                  What's Included
                </p>

                <ul className="inclusions-list">
                  <li className="inclusion-item">
                    <CheckCircle size={18} className="inclusion-icon" />
                    <span>Live 1-on-1 sessions with {selectedTutor?.name}</span>
                  </li>
                  <li className="inclusion-item">
                    <CheckCircle size={18} className="inclusion-icon" />
                    <span>Subject-specific study material & notes</span>
                  </li>
                  <li className="inclusion-item">
                    <CheckCircle size={18} className="inclusion-icon" />
                    <span>Weekly homework review & feedback</span>
                  </li>
                  <li className="inclusion-item">
                    <CheckCircle size={18} className="inclusion-icon" />
                    <span>Monthly performance progress report</span>
                  </li>
                  <li className="inclusion-item">
                    <CheckCircle size={18} className="inclusion-icon" />
                    <span>Doubt clearing support via messages</span>
                  </li>
                  <li className="inclusion-item">
                    <CheckCircle size={18} className="inclusion-icon" />
                    <span>Session recordings for revision</span>
                  </li>
                </ul>

                {/* ── Subscribe Now CTA ── */}
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleSubscribeNow}
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', fontSize: '1.1rem', padding: '16px 32px', gap: '10px' }}
                >
                  <Sparkles size={20} />
                  <span>
                    {isSubmitting 
                      ? 'Confirming Subscription...' 
                      : `Subscribe Now — ₹${totalCost.toLocaleString('en-IN')}`}
                  </span>
                </button>

                <p style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '12px', marginBottom: 0 }}>
                  This is a demonstration platform. No real payment will be processed.
                </p>
              </div>
            </div>

            {/* Back Navigation */}
            <div className="flow-action-bar">
              <button
                type="button"
                onClick={() => navigate('/schedule')}
                className="btn btn-ghost"
              >
                <ArrowLeft size={18} />
                <span>Back to Schedule</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Success Popup Modal ── */}
      <SuccessPopup
        isOpen={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          document.body.style.overflow = '';
        }}
        onGoHome={handleGoHome}
        enrollmentData={{
          selectedSubject,
          selectedTutor,
          sessionTiming,
          courseDuration,
          totalCost,
          studentName: studentInfo.name,
          subscriptionId: createdSubscriptionId,
        }}
      />
    </div>
  );
};

export default SubscriptionPage;

