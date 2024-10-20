import React, { useState } from 'react';
import AddEservice from '../Eservice/AddEservice';
import AddTenant from '../Tenant/AddTenant';
import AddServer from '../Server/AddServer';
import AddResource from '../Resource/AddResource';
import EserviceManagementView from './EserviceManagementView'; 

const CombinedForm = () => {
  const [formData, setFormData] = useState({
    eserviceData: {},
    tenantData: {},
    serverData: {},
    resourceData: {},
  });

  const [submitted, setSubmitted] = useState(false);

  const handleEserviceData = (data) => {
    setFormData({ ...formData, eserviceData: data });
  };

  const handleTenantData = (data) => {
    setFormData({ ...formData, tenantData: data });
  };

  const handleServerData = (data) => {
    setFormData({ ...formData, serverData: data });
  };

  const handleResourceData = (data) => {
    setFormData({ ...formData, resourceData: data });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div>
      {!submitted ? ( // Render the form or view page based on the "submitted" state
        <div>
          <AddEservice onDataSubmit={handleEserviceData} />
          <AddTenant onDataSubmit={handleTenantData} />
          <AddServer onDataSubmit={handleServerData} />
          <AddResource onDataSubmit={handleResourceData} />
          <button type="button" onClick={handleSubmit}>
            Finish
          </button>
        </div>
      ) : (
        <EserviceManagementView formData={formData} />
      )}
    </div>
  );
};

export default CombinedForm;
