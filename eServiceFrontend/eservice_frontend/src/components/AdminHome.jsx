import React from 'react'

const AdminHome = () => {

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
        <span>AdminHome</span>
      </div>

      



      <div className="grid-box">
      <div className='boxStyle'>
      <div id="tenantImg">
      <a href="/Tenant/Tenant" className='linkStyle' target="_blank">
        
          {/* <img src="resource.jpg" alt="Resource"/> */}
          <div className="overlay">
        <p className="gridText">Tenant</p>
      </div>
       
      </a>
      </div>
    </div>


    <div className='boxStyle'>
      <div id="resourceImg">
      <a href="/Resource/Resource.jsx" className='linkStyle' target="_blank">
        
          {/* <img src="resource.jpg" alt="Resource"/> */}
          <div className="overlay">
        <p className="gridText">Resource</p>
      </div>
       
      </a>
      </div>
    </div>

    <div className='boxStyle'>
      <div id="serverImg">
      <a href="/Server/Server" className='linkStyle' target="_blank">
        
          {/* <img src="resource.jpg" alt="Resource"/> */}
          <div className="overlay">
        <p className="gridText">Server</p>
      </div>
       
      </a>
      </div>
    </div>


    <div className='boxStyle' style={{ marginInlineStart: '65%' }}>
      <div id="eserviceImg">
      <a href="/Eservice/Eservice" className='linkStyle' target="_blank">
        
          {/* <img src="resource.jpg" alt="Resource"/> */}
          <div className="overlay">
        <p className="gridText">EService</p>
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

     
      </div>
      
      </div>

      
  )
}

export default AdminHome