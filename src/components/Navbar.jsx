




// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          QLess Slot - No Queue, Just You!!
        </Link>

        <div className="nav-menu">
          {user ? (
            <>
              <span className="nav-welcome">Welcome, {user.name}</span>

              {user.role === "admin" ? (
                <Link to="/admin/dashboard" className="nav-link">
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/book-slot" className="nav-link">
                    Book Slot
                  </Link>
                  <Link to="/manage-tokens" className="nav-link">
                    My Bookings
                  </Link>
                </>
              )}

              <button onClick={handleLogout} className="nav-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
              <Link to="/admin/login" className="nav-link">
                Admin Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
