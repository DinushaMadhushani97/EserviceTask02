import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style.css';

const AddNewTenant = () =>{
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [tenantData, setTenantData] = useState({
    tName: '',
    userListId: 1, 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTenantData({ ...tenantData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:8080/eservices/api/add/${tenantData.userListId}`, tenantData);
      //Reset the from and display success message
      setTenantData({
        tName: '',
    userListId: 1, 
      })
      setMessage('Tenant added successfully..!');
     navigate('/tenant/addTenant');
    } catch (error) {
      console.error('Error adding tenant:', error);
      setMessage('Error adding the Tenant');
     
    }
  };

  //Function clear from fields
  const handleClear = () => {
    setTenantData({
      tName: '',
    userListId: 1, 

    });
  };

  

  //Function to cancel and navigate without adding data
  const handleCancel = () => {
    navigate('/tenant/addTenant')
  };
  return (
    <div>
      <div className="addeservice-overlay">
        <div className="formConatiner">
          <h1 style={{ color: 'white' }}>
            <center>Add New Tenant</center>
          </h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="form-label" style={{ color: 'white' }}>
                Tenant Name
              </label>
              <input
                className="form-control"
                type="text"
                name="tName"
                value={tenantData.tName}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* <div>
              <label className="form-label" style={{ color: 'white' }}>
               UserListID
              </label>
              <input
                className="form-control"
                type="text"
                name="userListId"
                value={tenantData.userListId}
                onChange={handleInputChange}
                required
              />
            </div> */}

            
            
            <div className="d-flex justify-content-between" style={{ marginTop: '20px' }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClear}
                style={{ width: '20%', marginBottom: '60px' }}
              >
                Clear
              </button>
              <button type="submit" className="btn btn-primary" style={{ width: '20%', marginBottom: '60px' }}>
                Back
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCancel}
                style={{ width: '20%', marginBottom: '60px' }}
              >
                Cancel
              </button>
            </div>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default AddNewTenant;
