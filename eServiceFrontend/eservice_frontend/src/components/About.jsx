import React from "react";


const About = () => {

  const breadcrumbsStyle = {
    display: 'flex',
    alignItems: 'center',
    color: 'gray',
    textDecoration: 'none'
  };

  return (
    <div>
        <div style={breadcrumbsStyle}>
        <a href="/" style={breadcrumbsStyle}>
          Home
        </a>
        <span style={{ margin: '0 5px' }}>›</span>
        <span>About</span>
      </div>
    </div>
  );
};

export default About;
