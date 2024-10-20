import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddTenant = () => {
  const navigate = useNavigate();

  // Initialize the form data with values from local storage or default values
  const initialTenantData = JSON.parse(localStorage.getItem('tenantData')) || {
    tName: '',
    userListId1: '',
    contactPerson1: '',
    userListId2: '',
    contactPerson2: '',
    userListId3: '',
    contactPerson3: '',
    vCPU: '',
    ram: '',
    storage: '',
  };

  const [tenantData, setTenantData] = useState(initialTenantData);
  const [availableUserList, setAvailableUserList] = useState([]);
  const [availableTenantNames, setAvailableTenantNames] = useState([]);
  const [message, setMessage] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:8080/eservices/api/add/${tenantData.userListId1}`, tenantData);

      // Reset the form and display a success message
      setTenantData(initialTenantData);
      setMessage('Tenant added successfully!');

      // Clear the form data from local storage
      localStorage.removeItem('tenantData');

      // Navigate to the AddServer page
      navigate('/server/addServer');
    } catch (error) {
      setMessage('Error adding the tenant');
    }
  };

  // Function to navigate to AddUserList page
  const navigateUserList = () => {
    navigate('/userList/addUserList');
  };

  // Function to navigate to addNew tenant page
  const navigateNewTenant = () => {
    navigate('/tenant/addNewTenant');
  };

  // Function to clear form fields
  const handleClear = () => {
    setTenantData(initialTenantData);
    // Clear the form data from local storage
    localStorage.removeItem('tenantData');
  };

  // Function to handle input changes for Level Supports
  const handleLevelChange = (e) => {
    const { name, value } = e.target;
    setTenantData({
      ...tenantData,
      [name]: value,
    });

    // Store the form data in local storage
    localStorage.setItem('tenantData', JSON.stringify({ ...tenantData, [name]: value }));
  };

  // Fetch available user list data from the server when the component mounts
  useEffect(() => {
    axios
      .get('http://localhost:8080/eservices/api/tenant/userList')
      .then((response) => {
        const userListData = response.data;
        setAvailableUserList(userListData);
      })
      .catch((error) => {
        console.error('Error fetching user list data:', error);
      });

    // Fetch available Tenant Names from the server when the component mounts
    axios
      .get('http://localhost:8080/eservices/api/tenant/list')
      .then((response) => {
        const tNameData = response.data.map((tenant) => tenant.tName);
        setAvailableTenantNames(tNameData);
      })
      .catch((error) => {
        console.error('Error fetching Tenant Name data:', error);
      });
  }, []);
  return (
    <div>
      <div className="addeservice-overlay">
        <div className="formConatiner">
          <h1 style={{ color: 'white' }}>
            <center> Tenant & Resource Management</center>
          </h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="form-label" style={{ color: 'white' }} htmlFor="tName">
                Tenant Name:
              </label>
              <div className="select-container">
                <select
                  className="form-select"
                  id="tName"
                  name="tName"
                  value={tenantData.tName}
                  onChange={handleLevelChange}
                  required
                >
                  <option value="" disabled>
                    -- Select Tenant Name --
                  </option>
                  {availableTenantNames.map((tName) => (
                    <option key={tName} value={tName}>
                      {tName}
                    </option>
                  ))}
                </select>
                <button
        type="button"
        className="btn btn-primary"
        onClick={navigateNewTenant}
      >
        Add
      </button>
              </div>
            </div>

            {/* Level 1 Support */}
            <div>
              <label className="form-label" style={{ color: 'white' }} htmlFor="userListId1">
                Level 1 Support:
              </label>
              <div className="select-container">
                <select
                  className="form-select"
                  id="userListId1"
                  name="userListId1"
                  value={tenantData.userListId1}
                  onChange={handleLevelChange}
                  required
                >
                  <option value="" disabled>
                    -- Select Department --
                  </option>
                  {availableUserList.map((user) => (
                    <option key={user.userListId} value={user.userListId}>
                      {user.department}
                    </option>
                  ))}
                </select>
                <select
                  className="form-select"
                  id="contactPerson1"
                  name="contactPerson1"
                  value={tenantData.contactPerson1}
                  onChange={handleLevelChange}
                  required
                >
                  <option value="" disabled>
                    -- Select Contact Person --
                  </option>
                  {availableUserList.map((user) => (
                    <option key={user.userListId} value={user.userListId}>
                      {user.contactPerson}
                    </option>
                  ))}
                </select>
                <button
        type="button"
        className="btn btn-primary"
        onClick={navigateUserList}
      >
        Add
      </button>
              </div>
              
            </div>


             {/* Level 2 Support */}
             <div>
              <label className="form-label" style={{ color: 'white' }} htmlFor="userListId2">
                Level 2 Support:
              </label>
              <div className="select-container">
                <select
                  className="form-select"
                  id="userListId2"
                  name="userListId2"
                  value={tenantData.userListId2}
                  onChange={handleLevelChange}
                  required
                >
                  <option value="" disabled>
                    -- Select Department --
                  </option>
                  {availableUserList.map((user) => (
                    <option key={user.userListId} value={user.userListId}>
                      {user.department}
                    </option>
                  ))}
                </select>
                <select
                  className="form-select"
                  id="contactPerson2"
                  name="contactPerson2"
                  value={tenantData.contactPerson2}
                  onChange={handleLevelChange}
                  required
                >
                  <option value="" disabled>
                    -- Select Contact Person --
                  </option>
                  {availableUserList.map((user) => (
                    <option key={user.userListId} value={user.userListId}>
                      {user.contactPerson}
                    </option>
                  ))}
                </select>
                <button
        type="button"
        className="btn btn-primary"
        onClick={navigateUserList}
      >
        Add
      </button>
              </div>
            </div>


              {/* Level 3 Support */}
              <div>
              <label className="form-label" style={{ color: 'white' }} htmlFor="userListId3">
                Level 3 Support:
              </label>
              <div className="select-container">
                <select
                  className="form-select"
                  id="userListId3"
                  name="userListId3"
                  value={tenantData.userListId3}
                  onChange={handleLevelChange}
                  required
                >
                  <option value="" disabled>
                    -- Select Department --
                  </option>
                  {availableUserList.map((user) => (
                    <option key={user.userListId} value={user.userListId}>
                      {user.department}
                    </option>
                  ))}
                </select>
                <select
                  className="form-select"
                  id="contactPerson3"
                  name="contactPerson3"
                  value={tenantData.contactPerson3}
                  onChange={handleLevelChange}
                  required
                >
                  <option value="" disabled>
                    -- Select Contact Person --
                  </option>
                  {availableUserList.map((user) => (
                    <option key={user.userListId} value={user.userListId}>
                      {user.contactPerson}
                    </option>
                  ))}
                </select>
                <button
        type="button"
        className="btn btn-primary"
        onClick={navigateUserList}
      >
        Add
      </button>
              </div>
            </div>



            

            

            <div>
              <label className="form-label" style={{ color: 'white' }} htmlFor="Hardware Resources">
                Hardware Resources:
              </label>

              <input
                className="form-control"
                placeholder="Enter vCPU"
                type="text"
                id="vCPU"
                name="vCPU"
                value={tenantData.vCPU}
                onChange={handleLevelChange}
                style={{ marginTop: '20px' }}
              />
              <input
                className="form-control"
                placeholder="Enter RAM"
                type="text"
                id="ram"
                name="ram"
                value={tenantData.ram}
                onChange={handleLevelChange}
                style={{ marginTop: '20px' }}
              />
              <input
                className="form-control"
                placeholder="Enter Storage"
                type="text"
                id="storage"
                name="storage"
                value={tenantData.storage}
                onChange={handleLevelChange}
                style={{ marginTop: '20px' }}
              />
            </div>

            <div className="d-flex justify-content-between" style={{ marginTop: '30px' }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClear}
                style={{ width: '40%', marginBottom: '60px' }}
              >
                Clear
              </button>
              <button type="submit" className="btn btn-primary" style={{ width: '40%', marginBottom: '60px' }}>
                Next
              </button>
            </div>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default AddTenant;
