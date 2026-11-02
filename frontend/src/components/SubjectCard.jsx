import React from 'react';
import { 
  Terminal, 
  Cpu, 
  Code2, 
  FileCode, 
  Compass, 
  BookOpen, 
  Atom, 
  FlaskConical, 
  Zap, 
  Dna, 
  ArrowRight,
  Check
} from 'lucide-react';

const iconMap = {
  Terminal: Terminal,
  Cpu: Cpu,
  Code2: Code2,
  FileCode: FileCode,
  Compass: Compass,
  BookOpen: BookOpen,
  Atom: Atom,
  FlaskConical: FlaskConical,
  Zap: Zap,
  Dna: Dna,
};

const SubjectCard = ({ subject, isSelected, onSelect }) => {
  const IconComponent = iconMap[subject.icon] || BookOpen;

  return (
    <div className={`subject-card ${isSelected ? 'selected' : ''}`}>
      <div>
        <div className="subject-card-top">
          <div className="subject-icon-box">
            <IconComponent size={26} />
          </div>
          <span className="subject-tag">{subject.tag}</span>
        </div>

        <h4>{subject.name}</h4>
        <p>{subject.description}</p>

        {subject.popularTopics && (
          <div className="subject-topics">
            {subject.popularTopics.map((topic, i) => (
              <span key={i} className="topic-pill">{topic}</span>
            ))}
          </div>
        )}
      </div>

      <div className="subject-card-footer">
        <button
          type="button"
          onClick={() => onSelect(subject)}
          className={`btn ${isSelected ? 'btn-teal' : 'btn-primary'} btn-sm`}
          style={{ width: '100%' }}
        >
          {isSelected ? (
            <>
              <Check size={16} />
              <span>Selected</span>
            </>
          ) : (
            <>
              <span>Select Subject</span>
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SubjectCard;

