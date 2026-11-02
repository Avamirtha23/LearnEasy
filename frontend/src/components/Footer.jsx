import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          {/* Brand info */}
          <div className="footer-brand">
            <Link to="/" className="logo">
              <div className="logo-icon">
                <GraduationCap size={20} />
              </div>
              <span>Learn<span className="logo-highlight">Easy</span></span>
            </Link>
            <p>
              Premier student-to-tutor connecting platform dedicated to empowering learners with personalized 1-on-1 tutoring from verified experts.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h5>Navigation</h5>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/subjects">Browse Subjects</Link></li>
              <li><Link to="/tutors">Find Tutors</Link></li>
              <li><a href="#about">About Our Mission</a></li>
              <li><a href="#contact">Contact Support</a></li>
            </ul>
          </div>

          {/* Subjects */}
          <div className="footer-col">
            <h5>Popular Subjects</h5>
            <ul className="footer-links">
              <li><Link to="/tutors?subject=python">Python Programming</Link></li>
              <li><Link to="/tutors?subject=java">Java & OOP</Link></li>
              <li><Link to="/tutors?subject=cpp">C++ / STL</Link></li>
              <li><Link to="/tutors?subject=mathematics">Higher Mathematics</Link></li>
              <li><Link to="/tutors?subject=physics">Physics & Mechanics</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h5>Contact & Support</h5>
            <ul className="footer-links">
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={15} style={{ color: 'var(--teal-accent)' }} />
                <span>support@learneasy.edu</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={15} style={{ color: 'var(--teal-accent)' }} />
                <span>+91 98765 43210</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={15} style={{ color: 'var(--teal-accent)' }} />
                <span>Knowledge Park, New Delhi, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; 2026 LearnEasy Platform. All rights reserved. Connecting students with excellence.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

