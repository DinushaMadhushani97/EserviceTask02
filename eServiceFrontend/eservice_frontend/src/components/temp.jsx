import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

import './style.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/eservices/user/login', {
        userName: username,
        password: password,
      });

      if (response.status === 200) {
        // Login successful
        console.log('Login successful');
        
        // Redirect to the Home Page
        navigate('/');
      }
    } catch (error) {
      // Handle login error
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <div className="container">
      <div className="login-form-container">
        <h1 style={{ color: 'white' }}><center>Login</center></h1>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label style={{ color: 'white' }} htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label style={{ color: 'white' }} htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
