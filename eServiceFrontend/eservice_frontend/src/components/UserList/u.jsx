import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style.css';

const AddUserList = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [userListData, setUserListData] = useState({
    department: '',
    contactPerson: '',
  });

  // Function handle for adding a new user list
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/api/eService/userList/add', userListData);
      // Reset the form and display a success message
      setUserListData({
        department: '',
        contactPerson: '',
      });
      setMessage('UserList added successfully..!');
      // Navigate to the Tenant Page
      navigate('/tenant/addTenant');
    } catch (error) {
      setMessage('Error adding the user list'); // Error message should reflect adding a user list, not a tenant
    }
  };

  // Function to clear form fields
  const handleClear = () => {
    setUserListData({
      department: '',
      contactPerson: '',
    });
  };

  // Function to cancel and navigate back without adding data
  const handleCancel = () => {
    navigate('/tenant/addTenant');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserListData({ ...userListData, [name]: value });
  };

  return (
    <div>
      <div className="addeservice-overlay">
        <div className="formConatiner">
          <h1 style={{ color: 'white' }}>
            <center>Add New Developer</center>
          </h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="form-label" style={{ color: 'white' }}>
                Department
              </label>
              <input
                className="form-control"
                type="text"
                name="department"
                value={userListData.department}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="form-label" style={{ color: 'white' }}>
                Contact Person
              </label>
              <input
                className="form-control"
                type="text"
                name="contactPerson"
                value={userListData.contactPerson}
                onChange={handleInputChange}
              />
            </div>
            <div className="d-flex justify-content-between" style={{ marginTop: '20px' }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClear}
                style={{ width: '40%', marginBottom: '60px' }}
              >
                Clear
              </button>
              <button type="submit" className="btn btn-primary" style={{ width: '40%', marginBottom: '60px' }}>
                Back
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCancel}
                style={{ width: '40%', marginBottom: '60px' }}
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

export default AddUserList;
