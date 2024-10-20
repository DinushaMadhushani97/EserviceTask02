import React from 'react';
import './NavBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ICTA_Logo from '../images/ICTA_Logo.png';
import './Eservice/AddEservice';
import './Main/EserviceManagementView';
import  './Server/ServerView';
import  './Main/CombinedForm';
import  './Tenant/TenantView';
import  './Resource/ResourceView';
import  './Eservice/EserviceView';

function NavBar() {
  const handleLogin = () => {
    // Navigate to the login page
    window.location.href = '/';
  };

  return (
    <div>
      <div
        className="logo-container"
        style={{ backgroundColor: '#f8f9fa', padding: '0px', display: 'flex', alignItems: 'center' }}
      >
        <img src={ICTA_Logo} alt="EService Logo" className="ICTA_Logo" style={{ height: '80px', width: '180px' }} />

        <span className="NavText" style={{ marginLeft: '10px' }}>
          eServices Information Management System
        </span>

        <button
          className="btn btn-primary"
          style={{
            backgroundColor: '#d76721',
            display: 'flex',
            alignItems: 'center',
            marginLeft: 'auto', 
            cursor: 'pointer',
            width: '110px',
            justifyContent: 'center',
          }}
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
      <nav className="navbar navbar-expand-lg navbar-light bg-bcolor">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/home">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">
                  Contact Us
                </a>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/service"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Services
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="/main/eserviceManagementView">
                    EserviceManagementView
                    </a>
                  </li>

                  <li>
                    <a className="dropdown-item" href="/server/serverView">
                    ServerView
                    </a>
                  </li>

                  <li>
                    <a className="dropdown-item" href="/tenant/tenantView">
                    TenantView
                    </a>
                  </li>

                  <li>
                    <a className="dropdown-item" href="/resource/resourceView">
                    ResourceView
                    </a>
                  </li>

                  <li>
                    <a className="dropdown-item" href="/eservice/eserviceView">
                    EserviceView
                    </a>
                  </li>


                  <li>
                    <a className="dropdown-item" href="/main/combinedForm">
                    CombinedForm
                    </a>
                  </li>  
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
