import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddServer = () => {
  const navigate = useNavigate();

  const [serverData, setServerData] = useState({
    appServer: '',
    dBServer: '',
    proxyServer: '',
    eId: 1,
  });

  const [availableServers, setAvailableServers] = useState([]);
  const [newIpAddresses, setNewIpAddresses] = useState([]);

  const [message, setMessage] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  useEffect(() => {
    // Fetch available serverTypes from the server when the component mounts
    axios
      .get('http://localhost:8080/eservices/api/server/serverList')
      .then((response) => {
        const serverTypes = response.data.map((server) => ({
          sId: server.sId,
          ipAddress: server.ipAddress,
          type: server.type,
        }));
        setAvailableServers(serverTypes);
      })
      .catch((error) => {
        console.error('Error fetching Server data:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isConfirmed) {
      const confirmed = window.confirm("Are you sure you want to submit the form?");
      if (!confirmed) {
        return;
      }
      setIsConfirmed(true);
    }
    try {
      await axios.post(`http://localhost:8080/eservices/api/server/add/${serverData.eId}`, serverData);

      // Store the newly added IP addresses
      setNewIpAddresses((ipAddresses) => [...ipAddresses, serverData.appServer, serverData.dBServer, serverData.proxyServer]);

      // Reset the form and display a success message
      setServerData({
        appServer: '',
        dBServer: '',
        proxyServer: '',
        eId: 1,
      });
      setMessage('Server added successfully!');

      // Navigate to the AddResource page
      navigate('/resource/addResource');
    } catch (error) {
      console.error('Error adding the server:', error);
      setMessage('Error adding the server. Please check the server logs for more details.');
    }
  };

  // Function to navigate to addNew tenant page
  const navigateNewServer = () => {
    navigate('/server/addNewServer');
  };
  const handleClear = () => {
    setServerData({
      appServer: '',
      dBServer: '',
      proxyServer: '',
      eId: 1,
    });
  };

  const handleServerChange = (e) => {
    const { name, value } = e.target;
    setServerData({
      ...serverData,
      [name]: value,
    });
  };

  return (
    <div>
      <div className="addeservice-overlay">
        <div className="formConatiner">
          <h1 style={{ color: 'white' }}>
            <center>Server Management</center>
          </h1>
          <form onSubmit={handleSubmit}>
            {/* App Server */}
            <div>
              <label className="form-label" style={{ color: 'white' }}>
                App Server:
              </label>
              <div className="select-container">
                <select
                  className="form-select"
                  name="appServer"
                  value={serverData.appServer}
                  onChange={handleServerChange}
                  
                >
                  <option value="" disabled>
                    -- Select App Server --
                  </option>
                  {availableServers.map((server) => (
                    <option key={server.sId} value={server.sId}>
                      {server.ipAddress}
                    </option>
                  ))}
                  {newIpAddresses.map((ipAddress) => (
                    <option key={ipAddress} value={ipAddress}>
                      {ipAddress}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={navigateNewServer}
                >
                  Add
                </button>
              </div>
            </div>

            {/* DB Server */}
            <div>
              <label className="form-label" style={{ color: 'white' }}>
                DB Server:
              </label>
              <div className="select-container">
                <select
                  className="form-select"
                  name="dBServer"
                  value={serverData.dBServer}
                  onChange={handleServerChange}
                  
                >
                  <option value="" disabled>
                    -- Select DB Server --
                  </option>
                  {availableServers.map((server) => (
                    <option key={server.sId} value={server.sId}>
                      {server.ipAddress}
                    </option>
                  ))}
                  {newIpAddresses.map((ipAddress) => (
                    <option key={ipAddress} value={ipAddress}>
                      {ipAddress}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={navigateNewServer}
                >
                  Add
                </button>
              </div>
            </div>

            {/* Proxy Server */}
            <div>
              <label className="form-label" style={{ color: 'white' }}>
                Proxy Server:
              </label>
              <div className="select-container">
                <select
                  className="form-select"
                  name="proxyServer"
                  value={serverData.proxyServer}
                  onChange={handleServerChange}
                  
                >
                  <option value="" disabled>
                    -- Select Proxy Server --
                  </option>
                  {availableServers.map((server) => (
                    <option key={server.sId} value={server.sId}>
                      {server.ipAddress}
                    </option>
                  ))}
                  {newIpAddresses.map((ipAddress) => (
                    <option key={ipAddress} value={ipAddress}>
                      {ipAddress}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={navigateNewServer}
                >
                  Add
                </button>
              </div>
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

          {/* Display the success message */}
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default AddServer;
