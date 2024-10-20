import React from 'react';
import { Link } from 'react-router-dom';
import './LoginHome.css'; 

function LoginHome() {
  return (
    <div className="login-home-container">
      <h2>Welcome to Login</h2>
      <div className="login-options">
        <Link to="/adminLogin" className="login-option admin-login">
          Admin Login
        </Link>
        <Link to="/login" className="login-option user-login">
          User Login
        </Link>
      </div>
    </div>
  );
}

export default LoginHome;
