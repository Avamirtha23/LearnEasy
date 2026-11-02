import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useEnrollment } from '../context/EnrollmentContext';

const steps = [
  { number: 1, name: 'Subject', path: '/subjects' },
  { number: 2, name: 'Select Tutor', path: '/tutors' },
  { number: 3, name: 'Schedule & Duration', path: '/schedule' },
  { number: 4, name: 'Confirmation', path: '/subscription' },
];

const StepIndicator = ({ currentStep }) => {
  const navigate = useNavigate();
  const { selectedSubject, selectedTutor, sessionTiming, courseDuration } = useEnrollment();

  const isStepAccessible = (stepNumber) => {
    if (stepNumber === 1) return true;
    if (stepNumber === 2) return Boolean(selectedSubject);
    if (stepNumber === 3) return Boolean(selectedSubject && selectedTutor);
    if (stepNumber === 4) return Boolean(selectedSubject && selectedTutor && sessionTiming && courseDuration);
    return false;
  };

  const handleStepClick = (step) => {
    if (isStepAccessible(step.number)) {
      navigate(step.path);
    }
  };

  return (
    <div className="step-indicator-wrapper">
      <div className="container">
        <div className="step-indicator">
          {steps.map((step, index) => {
            const isActive = step.number === currentStep;
            const isCompleted = step.number < currentStep;
            const accessible = isStepAccessible(step.number);

            return (
              <React.Fragment key={step.number}>
                <div
                  className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${!accessible ? 'disabled' : ''}`}
                  onClick={() => handleStepClick(step)}
                  role="button"
                  tabIndex={accessible ? 0 : -1}
                >
                  <div className="step-number">
                    {isCompleted ? <Check size={18} /> : step.number}
                  </div>
                  <div className="step-info">
                    <span className="step-label">Step {step.number}</span>
                    <span className="step-name">{step.name}</span>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className={`step-divider ${step.number < currentStep ? 'completed' : ''}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;

