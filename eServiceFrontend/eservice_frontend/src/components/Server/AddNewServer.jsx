import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style.css';

const AddNewServer = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [serverData, setServerData] = useState({
    type: '', 
    ipAddress: '',
    eId: 1,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:8080/eservices/api/server/add/${serverData.eId}`, serverData);
      
      // Reset the form and display a success message
      setServerData({
        type: '', 
        ipAddress: '',
        eId: 1,
      });
      setMessage('Server added successfully..!');
      
      // Navigate to the Server Page
      navigate('/server/addServer');
    } catch (error) {
      setMessage('Error adding the Server');
    }
  };
 //Function to clear from feilds
  const handleClear = () => {
    setServerData({
      type: '', 
      ipAddress: '',
      eId: 1,
    });
  };

  const handleCancel = () => {
    navigate('/server/addServer');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServerData({ ...serverData, [name]: value });
  };

  return (
    <div>
      <div className="addeservice-overlay">
        <div className="formConatiner">
          <h1 style={{ color: 'white' }}>
            <center>Add New Server</center>
          </h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="form-label" style={{ color: 'white' }}>
                Server Type
              </label>
              <select
                className="form-control"
                name="type"
                value={serverData.type}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  ----Select Server Type ----
                </option>
                <option value="AppServer">App Server</option>
                <option value="DBServer">DB Server</option>
                <option value="ProxyServer">Proxy Server</option>
              </select>
            </div>
            <div>
              <label className="form-label" style={{ color: 'white' }}>
                Server IP Address
              </label>
              <input
                className="form-control"
                type="text"
                name="ipAddress"
                value={serverData.ipAddress}
                onChange={handleInputChange}
                required
              />
            </div>
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

export default AddNewServer;
