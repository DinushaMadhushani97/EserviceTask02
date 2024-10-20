import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddEservice = () => {
  const [formData, setFormData] = useState({
    tId: '',
    eName: '',
    status: '',
    organizationName: '',
    description: '',
    contactPerson: '',
  });

  const [availableTIds, setAvailableTIds] = useState([]);

  useEffect(() => {
    // Fetch available tIds from the server when the component mounts
    axios
      .get('http://localhost:8080/eservices/api/tenants')
      .then((response) => {
        const tIds = response.data.map((tenant) => tenant.tId);
        setAvailableTIds(tIds);
      })
      .catch((error) => {
        console.error('Error fetching available tIds:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/eservices/api/eservice/add/${formData.tId}`, formData)
      .then((response) => {
        console.log('Added eService:', response.data);
      })
      .catch((error) => {
        console.error('Error adding eService:', error);
      });
  };

  return (
    <div>
      <h1>Add a New eService</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tenant ID: </label>
          <select name="tId" value={formData.tId} onChange={handleInputChange} required>
            <option value="">Select Tenant ID</option>
            {availableTIds.map((tId) => (
              <option key={tId} value={tId}>
                {tId}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>eService Name: </label>
          <input type="text" name="eName" value={formData.eName} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Status: </label>
          <select name="status" value={formData.status} onChange={handleInputChange} required>
            <option value="">Select Status</option>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>
        <div>
          <label>Organization Name: </label>
          <input type="text" name="organizationName" value={formData.organizationName} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Description: </label>
          <input type="text" name="description" value={formData.description} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Contact Person: </label>
          <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} required />
        </div>
        <button type="submit" className="btn btn-info mt-4">
          Add eService
        </button>
      </form>
    </div>
  );
};

export default AddEservice;
