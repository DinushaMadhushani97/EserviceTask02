import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import '../style.css';
import '../Tenant/AddTenant'

const AddEservice = () => {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    eName: '',
    status: '',
    organizationName: '',
    description: '',
    contactPerson: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8080/eservices/api/eservice/add', formData)
      .then((response) => {
        console.log('Added eService:', response.data);
        // Navigate to the AddTenant page
        navigate('/tenant/addTenant');
      })
      .catch((error) => {
        console.error('Error adding eService:', error);
      });
  };

  const handleClear = () => {
    // Create a new object with empty values to clear the form fields
    const clearedFormData = {
      eName: '',
      status: '',
      organizationName: '',
      description: '',
      contactPerson: '',
    };
    setFormData(clearedFormData);
  };

  return (
    <div>
      <div className="addeservice-overlay">
        <div className="formConatiner">
          <h1 style={{ color: 'white' }}>
            <center>Add eService</center>
          </h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="form-label" style={{ color: 'white' }}>
                EService Name:
              </label>
              <input
                className="form-control"
                type="text"
                name="eName"
                value={formData.eName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label style={{ color: 'white' }}>Status: </label>
              <select
                className="form-select"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Status</option>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>
            <div>
              <label style={{ color: 'white' }}>Organization Name: </label>
              <input
                className="form-control"
                type="text"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label style={{ color: 'white' }}>Description: </label>
              <input
                className="form-control"
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label style={{ color: 'white' }}>Contact Person: </label>
              <input
                className="form-control"
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="d-flex justify-content-between" style={{marginTop:'30px'}}>
              
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClear} style={{ width: '40%',  marginBottom:'60px'}}
              >
                Clear
              </button>
              <button type="submit" className="btn btn-primary" style={{ width: '40%', marginBottom:'60px'}}>
               Next
              </button>
           </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEservice;
