import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Clock, Calendar, AlertCircle, Check,
  GraduationCap, BookOpen, IndianRupee
} from 'lucide-react';
import StepIndicator from '../components/StepIndicator';
import { useEnrollment, AVAILABLE_TIME_SLOTS, AVAILABLE_DURATIONS } from '../context/EnrollmentContext';

const ScheduleSelectionPage = () => {
  const navigate = useNavigate();
  const {
    selectedSubject,
    selectedTutor,
    sessionTiming,
    courseDuration,
    monthlyFee,
    selectTiming,
    selectDuration,
  } = useEnrollment();

  const [errors, setErrors] = useState({});

  // Guard: if no tutor selected, redirect back
  React.useEffect(() => {
    if (!selectedTutor) {
      navigate('/subjects');
    }
  }, [selectedTutor, navigate]);

  const validateAndContinue = () => {
    const newErrors = {};
    if (!sessionTiming) newErrors.timing = 'Please select a session time slot.';
    if (!courseDuration) newErrors.duration = 'Please select a course duration.';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    navigate('/subscription');
  };

  const computedTotal = monthlyFee * (courseDuration || 0);

  return (
    <div className="schedule-page">
      <StepIndicator currentStep={3} />

      <section className="section section-light">
        <div className="container">
          <div className="section-header">
            <h1 className="section-title">Choose Your Schedule</h1>
            <p className="section-subtitle">
              Pick your preferred session time and course duration to complete enrollment.
            </p>
          </div>

          <div className="schedule-container">
            {/* Selected Tutor / Subject Summary Banner */}
            {selectedTutor && (
              <div className="schedule-header-card">
                <div className="schedule-header-info">
                  <div className="schedule-header-avatar">
                    {selectedTutor.name
                      .replace(/^(Dr\.|Prof\.|Mr\.|Ms\.|Mrs\.)\s+/i, '')
                      .split(' ')
                      .filter(Boolean)
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join('')
                      .toUpperCase()}
                  </div>
                  <div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>
                      Confirmed Tutor
                    </p>
                    <h4 style={{ color: 'var(--navy-dark)', fontSize: '1.15rem', marginBottom: '2px' }}>
                      {selectedTutor.name}
                    </h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 0 }}>
                      {selectedTutor.qualification} · {selectedSubject?.name}
                    </p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '2px' }}>
                    Monthly Fee
                  </p>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--teal-dark)', fontFamily: 'Georgia, serif' }}>
                    ₹{monthlyFee.toLocaleString('en-IN')}
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400 }}>/mo</span>
                  </div>
                </div>
              </div>
            )}

            {/* ────────── SESSION TIMING ────────── */}
            <div>
              <h2 className="schedule-section-title">
                <Clock size={22} color="var(--teal-accent)" />
                Select Session Timing
              </h2>
              <p className="schedule-section-desc">
                All classes are live, 1-hour sessions conducted Monday – Saturday.
              </p>

              <div className="time-slots-grid">
                {AVAILABLE_TIME_SLOTS.map((slot) => {
                  const isSelected = sessionTiming === slot.label;
                  return (
                    <div
                      key={slot.id}
                      className={`time-slot-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => {
                        selectTiming(slot.label);
                        setErrors((prev) => ({ ...prev, timing: undefined }));
                      }}
                      role="radio"
                      aria-checked={isSelected}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          selectTiming(slot.label);
                          setErrors((prev) => ({ ...prev, timing: undefined }));
                        }
                      }}
                    >
                      <div className="time-slot-header">
                        <span className="time-slot-tag">{slot.period}</span>
                        <div className="time-slot-radio">
                          {isSelected && <div className="time-slot-radio-dot" />}
                        </div>
                      </div>
                      <div className="time-slot-time">
                        <Clock size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle', color: isSelected ? 'var(--orange-accent)' : 'var(--text-muted)' }} />
                        {slot.label}
                      </div>
                      <p className="time-slot-note">{slot.note}</p>
                    </div>
                  );
                })}
              </div>

              {errors.timing && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#DC2626', fontSize: '0.88rem', marginTop: '-28px', marginBottom: '32px' }}>
                  <AlertCircle size={16} />
                  <span>{errors.timing}</span>
                </div>
              )}
            </div>

            {/* ────────── COURSE DURATION ────────── */}
            <div>
              <h2 className="schedule-section-title">
                <Calendar size={22} color="var(--teal-accent)" />
                Select Course Duration
              </h2>
              <p className="schedule-section-desc">
                Choose how many months you would like to learn. Longer plans unlock greater depth.
              </p>

              <div className="durations-grid">
                {AVAILABLE_DURATIONS.map((dur) => {
                  const isSelected = courseDuration === dur.months;
                  const calcTotal = monthlyFee * dur.months;
                  return (
                    <div
                      key={dur.months}
                      className={`duration-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => {
                        selectDuration(dur.months);
                        setErrors((prev) => ({ ...prev, duration: undefined }));
                      }}
                      role="radio"
                      aria-checked={isSelected}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          selectDuration(dur.months);
                          setErrors((prev) => ({ ...prev, duration: undefined }));
                        }
                      }}
                    >
                      <span className="duration-badge">{dur.badge}</span>
                      <div className="duration-months">{dur.label}</div>
                      {monthlyFee > 0 && (
                        <div className="duration-total-calc">
                          Total: ₹{calcTotal.toLocaleString('en-IN')}
                        </div>
                      )}
                      {isSelected && (
                        <div style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--orange-accent)',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Check size={13} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {errors.duration && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#DC2626', fontSize: '0.88rem', marginBottom: '20px' }}>
                  <AlertCircle size={16} />
                  <span>{errors.duration}</span>
                </div>
              )}
            </div>

            {/* Live Total Cost Preview */}
            {sessionTiming && courseDuration && (
              <div style={{
                backgroundColor: 'var(--navy-dark)',
                color: 'var(--pure-white)',
                borderRadius: 'var(--radius-md)',
                padding: '22px 28px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px',
                marginBottom: '8px'
              }}>
                <div>
                  <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', marginBottom: '4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Estimated Total Course Cost
                  </p>
                  <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', marginBottom: 0 }}>
                    ₹{monthlyFee.toLocaleString('en-IN')} × {courseDuration} month{courseDuration > 1 ? 's' : ''}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--orange-accent)', fontFamily: 'Georgia, serif', lineHeight: 1 }}>
                    ₹{computedTotal.toLocaleString('en-IN')}
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginTop: '4px', marginBottom: 0 }}>
                    all inclusive, no hidden charges
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flow-action-bar">
              <button
                type="button"
                onClick={() => navigate('/tutors')}
                className="btn btn-ghost"
              >
                <ArrowLeft size={18} />
                <span>Back to Tutors</span>
              </button>

              <button
                type="button"
                onClick={validateAndContinue}
                className="btn btn-primary btn-lg"
              >
                <span>Review Subscription</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScheduleSelectionPage;

