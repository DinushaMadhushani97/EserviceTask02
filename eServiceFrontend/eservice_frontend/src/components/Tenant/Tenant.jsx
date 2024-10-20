import React from "react";


const Tenant = () => {
  const breadcrumbsStyle = {
    display: 'flex',
    alignItems: 'center',
    color: 'gray',
    textDecoration: 'none'
  };
  return (
    <div>
      {/* <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/" style={{color:'gray'}}>Home</a>
          </li>
          <li class="breadcrumb-item">
            <a href="/service" style={{color:'gray'}}>Service</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page" style={{color:'gray'}}>
            Tenant
          </li>
        </ol>
      </nav> */}
      <div style={breadcrumbsStyle}>
        <a href="/" style={breadcrumbsStyle}>
          Home
        </a>
        <span style={{ margin: '0 5px' }}>›</span>
        <span>Tenant</span>
      </div>
    </div>
  );
};

export default Tenant;
