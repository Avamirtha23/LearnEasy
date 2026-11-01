import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GraduationCap, Menu, X, ArrowRight, BookOpen } from 'lucide-react';
import { useEnrollment } from '../context/EnrollmentContext';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSubject, selectedTutor } = useEnrollment();

  const handleNavClick = (hash) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/' + hash);
    } else {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="header">
      <div className="container header-container">
        {/* Logo */}
        <Link to="/" className="logo" onClick={() => setMobileMenuOpen(false)}>
          <div className="logo-icon">
            <GraduationCap size={22} />
          </div>
          <span>Learn<span className="logo-highlight">Easy</span></span>
        </Link>

        {/* Mobile menu toggle */}
        <button 
          className="mobile-nav-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Links */}
        <nav className={`nav ${mobileMenuOpen ? 'open' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          
          <button 
            type="button" 
            className="nav-link" 
            style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
            onClick={() => handleNavClick('#about')}
          >
            About
          </button>

          <Link 
            to="/subjects" 
            className={`nav-link ${location.pathname.startsWith('/subjects') || location.pathname.startsWith('/tutors') ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Subjects
          </Link>

          <button 
            type="button" 
            className="nav-link" 
            style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
            onClick={() => handleNavClick('#tutors-pricing')}
          >
            Tutors & Pricing
          </button>

          <button 
            type="button" 
            className="nav-link" 
            style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
            onClick={() => handleNavClick('#contact')}
          >
            Contact
          </button>

          {/* Active Enrollment Progress Indicator */}
          {selectedSubject && (
            <Link 
              to={selectedTutor ? "/schedule" : "/tutors"} 
              className="btn btn-teal btn-sm"
              style={{ fontSize: '0.8rem', padding: '6px 12px' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <BookOpen size={14} />
              <span>{selectedSubject.name}</span>
            </Link>
          )}

          {/* Action CTA */}
          <div className="nav-cta">
            <Link 
              to="/subjects" 
              className="btn btn-gold btn-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Find a Tutor</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

