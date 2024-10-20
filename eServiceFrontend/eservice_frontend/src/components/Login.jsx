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
        navigate('/home');
      }
    } catch (error) {
      // Handle login error
      setErrorMessage('Invalid username or password');
    }
  };

  const handleClear = () => {
    setUsername('');
    setPassword('');
  };

 

  return (
    <div >
    <div class="container vh-100 d-flex align-items-center">
    
    <div id="innerPage">
      <div class="row align-items-center justify-content-center">
        <div class="col-sm-6 col-xs-12 d-sm-block d-none">
          <div id="imgBgn">
          </div>
        </div>
        <div class="col-sm-6 col-xs-12 text-white p-5">
          <div class="lead">
            <h3><center>Login</center></h3><br />
            {/* <p class="fs-6 mb-4">
              <small>Login to continue to your valuable services. E service alwyas to help you for best services.</small>
            </p> */}
          </div>
         
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
          
        <div className="d-flex justify-content-between">
  <button type="submit" className="btn btn-info mt-4" onClick={handleLogin} style={{ width: '45%'}}>
    Login
  </button>
  <button type="button" className="btn btn-info mt-4" onClick={handleClear} style={{ width: '45%' }}>
    Clear
  </button>
</div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
    </div>
  </div>
  </div>
  );
}

export default Login;
