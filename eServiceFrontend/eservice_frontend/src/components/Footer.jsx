import React from 'react';

const Footer = () => {
  return (
    <footer
      className="text-center text-lg-start"
      style={{
        backgroundColor: "#db6930",
        // position: "fixed",
        // bottom: 0,
        // marginBottom:"200px",
        // marginTop:"100px",
    marginBlockStart:"100px",
    marginBlockEnd:"100px",
   
        width: "100%",
      }}
    >
      
      <div
        className="text-center text-white p-3"
        style={{ backgroundColor: "#db6930" }}
      >
        © 2023 Copyright <span> | </span>
        <a className="text-white" href="https://icta.lk/" target="_blank" rel="noreferrer">
       
          ICTA Technology
        </a>
      </div>
      {/* Copyright */}
    </footer>
  );
};

export default Footer;
