import React from 'react'
import { Link } from 'react-router-dom'; 
import './Eservice/AddEservice';
import './Resource/AddResource';
import './Server/AddServer';
// import Resource from './Resource/Resource';
const Home = () => {

  const breadcrumbsStyle = {
    display: 'flex',
    alignItems: 'center',
    color: 'gray',
    textDecoration: 'none'
  };
  return (
    <div>
     <div style={breadcrumbsStyle}>
        
        <span style={{ margin: '0 5px' }}></span>
        <span>Home</span>
      </div>

      



      <div className="grid-box">

      {/* <div className='boxStyle'>
      <div id="tenantImg">
      <a href="/Tenant/TenantView" className='linkStyle' target="_blank">
        
         
          <div className="overlay">
        <p className="gridText">Tenant</p>
      </div>
       
      </a>
      </div>
    </div> */}

    <div className='boxStyle'>
      <div id="tenantImg">
      <a href="/Tenant/TenantView" className='linkStyle' target="_blank">
        
          {/* <img src="resource.jpg" alt="Resource"/> */}
          <div className="overlay">
        <p className="gridText"> Tenant </p>
      </div>
       
      </a>
      </div>
    </div>


    {/* <div className='boxStyle'>
      <div id="resourceImg">
      <Link to="/Resource/ResourceView" className="linkStyle" target="_blank">  */}
      {/* <a href="/Resource/Resource.jsx" className='linkStyle' target="_blank"> */}
      
          {/* <img src="resource.jpg" alt="Resource"/> */}
          {/* <div className="overlay">
        <p className="gridText">Resource</p>
      </div> */}
       
      {/* </a> */}
      {/* </Link>
      </div>
    </div> */}

<div className='boxStyle'>
      <div id="resourceImg">
      <a href="/Resource/ResourceView" className='linkStyle' target="_blank">
        
          {/* <img src="resource.jpg" alt="Resource"/> */}
          <div className="overlay">
        <p className="gridText"> Resource </p>
      </div>
       
      </a>
      </div>
    </div>


    {/* <div className="boxStyle">
          <div id="serverImg">
            <Link to="/Server/ServerView" className="linkStyle" target="_blank"> 
            <div className="overlay">
            <p className="gridText">Server</p>
            </div>
            </Link>
          </div>
        </div> */}

<div className='boxStyle'>
      <div id="serverImg">
      <a href="/Server/ServerView" className='linkStyle' target="_blank">
        
          {/* <img src="resource.jpg" alt="Resource"/> */}
          <div className="overlay">
        <p className="gridText">Server </p>
      </div>
       
      </a>
      </div>
    </div>


  
   

    <div className='boxStyle' style={{ marginInlineStart: '65%' }} >
      <div id="eserviceViewImg">
      <a href="/Eservice/EserviceView" className='linkStyle' target="_blank">
        
          {/* <img src="resource.jpg" alt="Resource"/> */}
          <div className="overlay">
        <p className="gridText">Eservice Home</p>
      </div>
       
      </a>
      </div>
    </div>


    <div className="boxStyle" style={{ marginInlineStart: '65%' }}>
          <div id="eserviceImg">
            <Link to="/Eservice/AddEservice" className="linkStyle" target="_blank"> 
            <div className="overlay">
            <p className="gridText">Eservice</p>
            </div>
            </Link>
          </div>
        </div>

     
      </div>
      
      </div>

      
  )
}

export default Home