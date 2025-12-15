

// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = ({ user }) => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        {/* Left Side - Image */}
        <div className="hero-image">
          <img 
            src="/home1.jpg" 
            alt="Online Token Booking System" 
            className="hero-banner-img"
          />
        </div>

        {/* Right Side - Content */}
        <div className="hero-content">
          <h1 className="home-title">Token Booking System</h1>
          <p className="home-subtitle">
            Skip the wait, book your slot online and get instant confirmation
          </p>
          <p className="home-description">
            Say goodbye to long queues and uncertainty. Our smart booking platform lets you reserve your time slot in advance, receive a unique token number, and track your appointment status in real-time. Experience hassle-free scheduling designed for your convenience.
          </p>
          
          {user ? (
            user.role === "admin" ? (
              <Link to="/admin/dashboard" className="cta-btn cta-primary">
                Admin Dashboard
              </Link>
            ) : (
              <Link to="/book-slot" className="cta-btn cta-primary">
                Book Your Slot Now
              </Link>
            )
          ) : (
            <div className="hero-actions">
              <Link to="/register" className="cta-btn cta-primary">
                Get Started
              </Link>
              <Link to="/login" className="cta-btn cta-secondary">
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2 className="section-heading">Why Choose Us?</h2>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <h3 className="feature-title">Easy Booking</h3>
            <p className="feature-description">
              Choose your preferred date and time slot in just a few clicks. Simple, fast, and hassle-free.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </div>
            <h3 className="feature-title">Instant Confirmation</h3>
            <p className="feature-description">
              Receive your unique token number immediately after booking. No waiting, no uncertainty.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <h3 className="feature-title">Real-Time Tracking</h3>
            <p className="feature-description">
              Monitor your booking status live. Stay informed about your appointment at all times.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <h3 className="feature-title">Secure & Private</h3>
            <p className="feature-description">
              Your personal information is protected with industry-standard security measures.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                <line x1="12" y1="18" x2="12.01" y2="18"/>
              </svg>
            </div>
            <h3 className="feature-title">Mobile Friendly</h3>
            <p className="feature-description">
              Book from anywhere, anytime. Fully responsive design works perfectly on all devices.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            </div>
            <h3 className="feature-title">Smart Reminders</h3>
            <p className="feature-description">
              Never miss an appointment. Get timely notifications about your upcoming bookings.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="how-it-works-section">
        <h2 className="section-heading">How It Works</h2>
        
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3 className="step-title">Create Account</h3>
            <p className="step-description">
              Sign up with your email and basic details in seconds
            </p>
          </div>

          <div className="step-arrow">
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
              <path d="M0 12H38M38 12L28 2M38 12L28 22" stroke="#5b9bb8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <h3 className="step-title">Choose Slot</h3>
            <p className="step-description">
              Select your preferred date and available time slot
            </p>
          </div>

          <div className="step-arrow">
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
              <path d="M0 12H38M38 12L28 2M38 12L28 22" stroke="#5b9bb8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <h3 className="step-title">Get Token</h3>
            <p className="step-description">
              Receive instant confirmation with your unique token
            </p>
          </div>

          <div className="step-arrow">
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
              <path d="M0 12H38M38 12L28 2M38 12L28 22" stroke="#5b9bb8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <div className="step">
            <div className="step-number">4</div>
            <h3 className="step-title">Arrive On Time</h3>
            <p className="step-description">
              Show up at your scheduled time with your token
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {!user && (
        <div className="cta-section">
          <h2 className="cta-heading">Ready to Get Started?</h2>
          <p className="cta-text">
            Join thousands of satisfied users who have simplified their booking experience
          </p>
          <Link to="/register" className="cta-btn cta-large cta-primary">
            Create Your Free Account
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;