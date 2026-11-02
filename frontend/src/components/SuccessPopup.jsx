import React from 'react';
import { CheckCircle2, Home, Calendar, Clock, DollarSign, Award, X } from 'lucide-react';

const SuccessPopup = ({ isOpen, onClose, onGoHome, enrollmentData }) => {
  if (!isOpen) return null;

  const { selectedSubject, selectedTutor, sessionTiming, courseDuration, totalCost } = enrollmentData;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="success-modal">
        {/* Success Icon */}
        <div className="success-icon-wrapper">
          <CheckCircle2 size={46} />
        </div>

        {/* Heading & Confirmation Message */}
        <h3>Subscription Successful!</h3>
        <p className="success-intro">
          Congratulations! You have successfully subscribed to your selected course on LearnEasy.
        </p>

        {/* Summary Details */}
        <div className="success-details-box">
          <div className="success-row">
            <span className="success-row-label">Enrolled Subject:</span>
            <span className="success-row-val">{selectedSubject?.name || 'Selected Course'}</span>
          </div>
          <div className="success-row">
            <span className="success-row-label">Assigned Tutor:</span>
            <span className="success-row-val">{selectedTutor?.name || 'Assigned Instructor'}</span>
          </div>
          <div className="success-row">
            <span className="success-row-label">Session Timing:</span>
            <span className="success-row-val">{sessionTiming || '6:00 PM – 7:00 PM'}</span>
          </div>
          <div className="success-row">
            <span className="success-row-label">Course Duration:</span>
            <span className="success-row-val">
              {courseDuration} {courseDuration === 1 ? 'Month' : 'Months'}
            </span>
          </div>
          <div className="success-row" style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #E2E8F0' }}>
            <span className="success-row-label" style={{ fontWeight: 700, color: 'var(--navy-dark)' }}>Total Subscription:</span>
            <span className="success-row-val" style={{ color: 'var(--orange-accent)', fontSize: '1.15rem' }}>
              ₹{totalCost?.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
          Your student dashboard has been updated. A welcome email and live classroom link have been sent to your registered address.
        </p>

        {/* Action Buttons */}
        <button
          type="button"
          onClick={onGoHome}
          className="btn btn-primary btn-lg"
          style={{ width: '100%', gap: '10px' }}
        >
          <Home size={18} />
          <span>Go to Home</span>
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;

