import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CreateEservice = () => {
  const { tId } = useParams(); // Get tId from the URL parameters
  const [eName, setEName] = useState('');
  const [status, setStatus] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [description, setDescription] = useState('');
  const [contactPerson, setContactPerson] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a POST request to create a new eService
    axios.post(`http://localhost:8080/eservices/api/eservice/add/${tId}`, {
      eName,
      status,
      organizationName,
      description,
      contactPerson,
      // ... include other state variables in the request payload
    })
      .then(response => {
        console.log('eService created successfully:', response.data);
        // Navigate to CreateTenant component after eService is created
        // You can redirect to another page or update the UI as needed
      })
      .catch(error => console.error('Error creating eService:', error));
  };

  return (
    <div>
      <h2>Create eService</h2>
      <form onSubmit={handleSubmit}>
        <label>
          eService Name:
          <input type="text" value={eName} onChange={(e) => setEName(e.target.value)} />
        </label>
        <br />

        <label>
          Status:
          <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
        </label>
        <br />

        <label>
          Organization Name:
          <input type="text" value={organizationName} onChange={(e) => setOrganizationName(e.target.value)} />
        </label>
        <br />

        <label>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />

        <label>
          Contact Person:
          <input type="text" value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} />
        </label>
        <br />

        <button type="submit">Create eService</button>
      </form>
    </div>
  );
};

export default CreateEservice;
