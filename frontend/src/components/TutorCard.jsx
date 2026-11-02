import React from 'react';
import { Award, Briefcase, GraduationCap, Star, Check, ArrowRight } from 'lucide-react';

// Generate 2 initials from tutor's name
const getInitials = (name) => {
  if (!name) return 'TE';
  const clean = name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.|Mrs\.)\s+/i, '');
  const parts = clean.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const TutorCard = ({ tutor, isSelected, onSelect }) => {
  const initials = getInitials(tutor.name);

  return (
    <div className={`tutor-card ${isSelected ? 'selected' : ''}`}>
      {/* Header with Initials Badge (NO PHOTOGRAPHS) */}
      <div className="tutor-card-header">
        <div className="tutor-avatar-initials" aria-label={`Tutor initials ${initials}`}>
          {initials}
        </div>
        <div className="tutor-title-box">
          <h4>{tutor.name}</h4>
          <div className="tutor-rating-row">
            <span className="stars">★</span>
            <span style={{ fontWeight: 700, color: 'var(--navy-dark)' }}>{tutor.rating}</span>
            <span className="review-count">({tutor.reviewCount} students)</span>
          </div>
        </div>
      </div>

      {/* Meta Badges */}
      <div className="tutor-meta-badge-row">
        <span className="meta-badge meta-badge-qualification">
          <GraduationCap size={14} />
          <span>{tutor.qualification}</span>
        </span>
        <span className="meta-badge meta-badge-exp">
          <Briefcase size={14} />
          <span>{tutor.experience} Years Exp.</span>
        </span>
      </div>

      {/* Details Box */}
      <div className="tutor-details">
        <div className="tutor-detail-row">
          <span className="tutor-detail-label">University:</span>
          <span>{tutor.college}</span>
        </div>
        <div className="tutor-detail-row">
          <span className="tutor-detail-label">Focus Area:</span>
          <span style={{ color: 'var(--teal-dark)', fontWeight: 600 }}>{tutor.specialization}</span>
        </div>
      </div>

      {/* Professional Bio */}
      <p className="tutor-description">
        {tutor.description}
      </p>

      {/* Fee structure */}
      <div className="tutor-fee-row">
        <span className="fee-label">Monthly Tutoring Fee</span>
        <div className="fee-amount">
          ₹{tutor.monthlyFee.toLocaleString('en-IN')}
          <span className="fee-period"> / month</span>
        </div>
      </div>

      {/* Select button */}
      <button
        type="button"
        onClick={() => onSelect(tutor)}
        className={`btn ${isSelected ? 'btn-teal' : 'btn-primary'}`}
        style={{ width: '100%' }}
      >
        {isSelected ? (
          <>
            <Check size={18} />
            <span>Selected Tutor</span>
          </>
        ) : (
          <>
            <span>Select Tutor</span>
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </div>
  );
};

export default TutorCard;

