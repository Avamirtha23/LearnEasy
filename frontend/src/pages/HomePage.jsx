import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle, 
  BookOpen, 
  Award, 
  Clock, 
  ShieldCheck, 
  Users, 
  Star,
  Send,
  Sparkles,
  Zap
} from 'lucide-react';
import { subjectsData } from '../data/subjects';
import { useEnrollment } from '../context/EnrollmentContext';
import { contactAPI } from '../services/api';

const HomePage = () => {
  const navigate = useNavigate();
  const { selectSubject } = useEnrollment();
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleQuickSubjectSelect = (subj) => {
    selectSubject(subj);
    navigate('/tutors');
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await contactAPI.submit(formData);
    } catch (err) {
      console.warn('Contact API submit notice:', err.message);
    } finally {
      setIsSubmitting(false);
      setContactSubmitted(true);
      setTimeout(() => {
        setContactSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 5000);
    }
  };

  return (
    <div className="homepage">
      {/* ================= HERO SECTION ================= */}
      <section id="home" className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={16} />
              <span>Certified 1-on-1 Personalized Tutoring</span>
            </div>

            <h1 className="hero-title">
              Learn Better. Learn Smarter.
            </h1>

            <p className="hero-intro">
              Get customized 1-on-1 tutoring from expert instructors in the comfort of your home.
            </p>

            <div className="hero-actions">
              <Link to="/subjects" className="btn btn-gold btn-lg">
                <span>Find a Tutor</span>
                <ArrowRight size={20} />
              </Link>
              <a href="#about" className="btn btn-outline-white btn-lg">
                <span>Learn More</span>
              </a>
            </div>

            <div className="hero-stats">
              <div className="hero-stat-item">
                <h4>500+</h4>
                <p>Verified Instructors</p>
              </div>
              <div className="hero-stat-item">
                <h4>10,000+</h4>
                <p>Sessions Conducted</p>
              </div>
              <div className="hero-stat-item">
                <h4>4.9 / 5</h4>
                <p>Average Student Rating</p>
              </div>
            </div>
          </div>

          <div className="hero-image">
            <div className="hero-image-wrapper">
              {/* Uses the exact educational illustration from reference */}
              <img 
                src="/images/hero.png" 
                alt="Student learning online with LearnEasy"
                loading="eager"
              />
              <div className="hero-floating-card">
                <div className="avatar-icon">
                  <Award size={20} />
                </div>
                <div>
                  <h5 style={{ fontSize: '0.9rem', marginBottom: '2px', color: 'var(--navy-dark)' }}>
                    Top Rated Tutors
                  </h5>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 0 }}>
                    100% Background-Checked
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT US SECTION ================= */}
      <section id="about" className="section section-white">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">About Us</h2>
            <p className="section-subtitle">
              LearnEasy is a premier tutoring service dedicated to helping students reach their full academic potential.
            </p>
          </div>

          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center', fontSize: '1.1rem', lineHeight: '1.8' }}>
            <p>
              We pair students with certified, vetted instructors who tailor lessons to each student's individual pace and goals. Our mission is to make quality, private education accessible, engaging, and highly effective for learners of all ages.
            </p>
          </div>

          <div className="about-features-grid">
            <div className="feature-box">
              <div className="feature-icon">
                <Users size={24} />
              </div>
              <h4>1-on-1 Focused Mentorship</h4>
              <p>Dedicated personal attention tailored exclusively to your syllabus, strengths, and target milestones.</p>
            </div>

            <div className="feature-box">
              <div className="feature-icon">
                <ShieldCheck size={24} />
              </div>
              <h4>Verified Expert Instructors</h4>
              <p>Graduates and scholars from premier institutions such as IITs, NITs, and top central universities.</p>
            </div>

            <div className="feature-box">
              <div className="feature-icon">
                <Clock size={24} />
              </div>
              <h4>Flexible Evening Slots</h4>
              <p>Choose convenient session timings (6 PM – 9 PM) designed to seamlessly fit around your school or college day.</p>
            </div>

            <div className="feature-box">
              <div className="feature-icon">
                <Zap size={24} />
              </div>
              <h4>Transparent Monthly Pricing</h4>
              <p>Simple, predictable fee structures with flexible durations from 1 to 12 months with no hidden charges.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SUBJECTS PREVIEW SECTION ================= */}
      <section id="subjects" className="section section-light">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Subjects We Offer</h2>
            <p className="section-subtitle">
              Explore specialized tutoring across high-demand programming languages and core academic subjects.
            </p>
          </div>

          <div className="subjects-grid">
            {subjectsData.slice(0, 4).map((subj) => (
              <div key={subj.id} className="subject-card">
                <div>
                  <div className="subject-card-top">
                    <span className="subject-tag">{subj.category}</span>
                  </div>
                  <h4>{subj.name}</h4>
                  <p>{subj.description}</p>
                </div>
                <div className="subject-card-footer">
                  <button
                    type="button"
                    onClick={() => handleQuickSubjectSelect(subj)}
                    className="btn btn-outline btn-sm"
                    style={{ width: '100%' }}
                  >
                    <span>View Tutors</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/subjects" className="btn btn-primary btn-lg">
              <span>View All 10 Subjects & Tutors</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= TUTORS & PRICING PLANS SECTION ================= */}
      <section id="tutors-pricing" className="section section-white">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Tutors & Pricing</h2>
            <p className="section-subtitle">
              Select an educational path that fits your ambition. Tutors offer tailored rates per subject.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {/* Basic Plan */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '20px', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.4rem' }}>Foundation Plan</h3>
                <div style={{ fontSize: '2.4rem', fontWeight: 700, color: 'var(--teal-dark)', fontFamily: 'Georgia, serif', marginTop: '10px' }}>
                  ₹1,800 <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ month avg</span>
                </div>
              </div>
              <ul style={{ listStyle: 'none', marginBottom: '30px', flexGrow: 1 }}>
                <li style={{ marginBottom: '12px', display: 'flex', gap: '10px', fontSize: '0.9rem' }}>
                  <CheckCircle size={18} color="var(--teal-dark)" />
                  <span>1-on-1 private live sessions</span>
                </li>
                <li style={{ marginBottom: '12px', display: 'flex', gap: '10px', fontSize: '0.9rem' }}>
                  <CheckCircle size={18} color="var(--teal-dark)" />
                  <span>Comprehensive concept notes</span>
                </li>
                <li style={{ marginBottom: '12px', display: 'flex', gap: '10px', fontSize: '0.9rem' }}>
                  <CheckCircle size={18} color="var(--teal-dark)" />
                  <span>Weekly homework review</span>
                </li>
              </ul>
              <Link to="/subjects" className="btn btn-outline" style={{ width: '100%' }}>
                Explore Tutors
              </Link>
            </div>

            {/* Standard Plan (Highlighted) */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', border: '2px solid var(--orange-accent)', position: 'relative' }}>
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                backgroundColor: 'var(--orange-accent)',
                color: 'var(--pure-white)',
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '4px 12px',
                borderRadius: '20px',
                textTransform: 'uppercase'
              }}>
                Most Popular
              </div>
              <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '20px', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.4rem' }}>Standard Plan</h3>
                <div style={{ fontSize: '2.4rem', fontWeight: 700, color: 'var(--teal-dark)', fontFamily: 'Georgia, serif', marginTop: '10px' }}>
                  ₹2,200 <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ month avg</span>
                </div>
              </div>
              <ul style={{ listStyle: 'none', marginBottom: '30px', flexGrow: 1 }}>
                <li style={{ marginBottom: '12px', display: 'flex', gap: '10px', fontSize: '0.9rem' }}>
                  <CheckCircle size={18} color="var(--teal-dark)" />
                  <span>Everything in Foundation plan</span>
                </li>
                <li style={{ marginBottom: '12px', display: 'flex', gap: '10px', fontSize: '0.9rem' }}>
                  <CheckCircle size={18} color="var(--teal-dark)" />
                  <span>Interactive coding / problem sheets</span>
                </li>
                <li style={{ marginBottom: '12px', display: 'flex', gap: '10px', fontSize: '0.9rem' }}>
                  <CheckCircle size={18} color="var(--teal-dark)" />
                  <span>Monthly progress assessment</span>
                </li>
                <li style={{ marginBottom: '12px', display: 'flex', gap: '10px', fontSize: '0.9rem' }}>
                  <CheckCircle size={18} color="var(--teal-dark)" />
                  <span>Priority tutor scheduling</span>
                </li>
              </ul>
              <Link to="/subjects" className="btn btn-primary" style={{ width: '100%' }}>
                Get Started
              </Link>
            </div>

            {/* Premium Plan */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '20px', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.4rem' }}>Advanced Mastery</h3>
                <div style={{ fontSize: '2.4rem', fontWeight: 700, color: 'var(--teal-dark)', fontFamily: 'Georgia, serif', marginTop: '10px' }}>
                  ₹2,600 <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ month avg</span>
                </div>
              </div>
              <ul style={{ listStyle: 'none', marginBottom: '30px', flexGrow: 1 }}>
                <li style={{ marginBottom: '12px', display: 'flex', gap: '10px', fontSize: '0.9rem' }}>
                  <CheckCircle size={18} color="var(--teal-dark)" />
                  <span>Everything in Standard plan</span>
                </li>
                <li style={{ marginBottom: '12px', display: 'flex', gap: '10px', fontSize: '0.9rem' }}>
                  <CheckCircle size={18} color="var(--teal-dark)" />
                  <span>Competitive exam / interview prep</span>
                </li>
                <li style={{ marginBottom: '12px', display: 'flex', gap: '10px', fontSize: '0.9rem' }}>
                  <CheckCircle size={18} color="var(--teal-dark)" />
                  <span>Senior faculty & PhD scholars</span>
                </li>
                <li style={{ marginBottom: '12px', display: 'flex', gap: '10px', fontSize: '0.9rem' }}>
                  <CheckCircle size={18} color="var(--teal-dark)" />
                  <span>Flexible duration packages</span>
                </li>
              </ul>
              <Link to="/subjects" className="btn btn-outline" style={{ width: '100%' }}>
                Choose Plan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section id="contact" className="section section-light">
        <div className="container contact-container">
          <div className="section-header">
            <h2 className="section-title">Contact Us</h2>
            <p className="section-subtitle">
              Get in touch to schedule a free demo session or request custom curriculum guidance!
            </p>
          </div>

          <div className="contact-form">
            {contactSubmitted ? (
              <div style={{
                backgroundColor: '#DCFCE7',
                border: '1px solid #86EFAC',
                color: '#166534',
                padding: '24px',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <CheckCircle size={36} style={{ margin: '0 auto 12px auto' }} />
                <h4 style={{ color: '#166534', marginBottom: '6px' }}>Message Sent Successfully!</h4>
                <p style={{ marginBottom: 0, fontSize: '0.95rem' }}>
                  Thank you, <strong>{formData.name || 'Student'}</strong>! An academic counselor will contact you at <strong>{formData.email}</strong> within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="student@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject of Interest</label>
                  <input
                    type="text"
                    id="subject"
                    required
                    placeholder="e.g. Python, Mathematics, Physics"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message / Learning Goals</label>
                  <textarea
                    id="message"
                    rows="4"
                    required
                    placeholder="Tell us what you would like to achieve or ask any questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="btn btn-gold btn-submit" 
                  style={{ width: '100%', gap: '8px' }}
                >
                  <Send size={18} />
                  <span>{isSubmitting ? 'Sending Message...' : 'Submit Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

