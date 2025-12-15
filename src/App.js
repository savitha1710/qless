// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookSlot from './pages/BookSlot';
import ConfirmBooking from './pages/ConfirmBooking';
import ManageTokens from './pages/ManageTokens';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Navbar user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route 
            path="/login" 
            element={user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} 
          />
          <Route 
            path="/register" 
            element={user ? <Navigate to="/" /> : <Register onLogin={handleLogin} />} 
          />
          <Route 
            path="/book-slot" 
            element={user ? <BookSlot user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/confirm-booking" 
            element={user ? <ConfirmBooking /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/manage-tokens" 
            element={user ? <ManageTokens user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/admin/login" 
            element={user?.role === 'admin' ? <Navigate to="/admin/dashboard" /> : <AdminLogin onLogin={handleLogin} />} 
          />
          <Route 
            path="/admin/dashboard" 
            element={user?.role === 'admin' ? <AdminDashboard user={user} /> : <Navigate to="/admin/login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;