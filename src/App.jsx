import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EnrollmentProvider } from './context/EnrollmentContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SubjectsPage from './pages/SubjectsPage';
import TutorSelectionPage from './pages/TutorSelectionPage';
import ScheduleSelectionPage from './pages/ScheduleSelectionPage';
import SubscriptionPage from './pages/SubscriptionPage';
import './index.css';

// Scroll to top whenever the route changes
const ScrollToTop = () => {
  const { pathname } = window.location;
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

// 404 Not Found fallback
const NotFound = () => (
  <div style={{
    minHeight: '60vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '40px 20px'
  }}>
    <h1 style={{ fontSize: '5rem', color: 'var(--teal-accent)', fontFamily: 'Georgia, serif', marginBottom: '16px' }}>
      404
    </h1>
    <h2 style={{ fontSize: '1.75rem', color: 'var(--navy-dark)', marginBottom: '12px' }}>
      Page Not Found
    </h2>
    <p style={{ color: 'var(--text-muted)', marginBottom: '28px', maxWidth: '400px' }}>
      The page you are looking for doesn't exist. Let's get you back on track.
    </p>
    <a href="/" className="btn btn-primary btn-lg">
      Return to Home
    </a>
  </div>
);

function App() {
  return (
    <Router>
      <EnrollmentProvider>
        <ScrollToTop />
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/subjects" element={<SubjectsPage />} />
            <Route path="/tutors" element={<TutorSelectionPage />} />
            <Route path="/schedule" element={<ScheduleSelectionPage />} />
            <Route path="/subscription" element={<SubscriptionPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </EnrollmentProvider>
    </Router>
  );
}

export default App;

