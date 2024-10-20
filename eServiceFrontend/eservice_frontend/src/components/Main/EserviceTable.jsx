import React from 'react';

const EserviceTable = ({ eserviceData, tenantData, serverData, resourceData }) => {
  return (
    <div>
      <h1>Form Data</h1>
      <table>
        <thead>
          <tr>
            <th>eService Data</th>
            <th>Tenant Data</th>
            <th>Server Data</th>
            <th>Resource Data</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{JSON.stringify(eserviceData)}</td>
            <td>{JSON.stringify(tenantData)}</td>
            <td>{JSON.stringify(serverData)}</td>
            <td>{JSON.stringify(resourceData)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EserviceTable;
