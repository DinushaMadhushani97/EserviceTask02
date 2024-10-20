import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const TenantView = () => {
  const navigate = useNavigate();
  const [tenants, setTenants] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [sortBy, setSortBy] = useState('tId');
  const [sortOrder, setSortOrder] = useState('ASC');
  const [pageSize, setPageSize] = useState(10);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [eservices, setEservices] = useState([]); // Add state for eServices

  useEffect(() => {
    // Fetch tenant data from the server when the component mounts or when any of the dependencies change
    axios
      .get('http://localhost:8080/eservices/api/tenant/list', {
        params: {
          pageNumber,
          pageSize,
          sortBy,
          sortOrder,
        },
      })
      .then((response) => {
        const data = response.data;
        // Check if there's any data to fetch
        if (data.length === 0) {
          setHasMoreData(false);
        } else {
          setTenants(data);
          setHasMoreData(true);
        }
      })
      .catch((error) => {
        console.error('Error fetching Tenant data:', error);
      });
  }, [pageNumber, sortBy, sortOrder, pageSize]);

  // Fetch eService data for each tenant
  useEffect(() => {
    // Extract tenant IDs
    const tenantIds = tenants.map((tenant) => tenant.tId);

    // Fetch eService data for each tenant
    axios
      .post('http://localhost:8080/eservices/api/tenant/eserviceList', {
        tenantIds,
      })
      .then((response) => {
        const data = response.data;
        if (data.length === 0) {
          setHasMoreData(false);
        } else {
          setEservices(data);
          setHasMoreData(true);
        }
      })
      .catch((error) => {
        console.error('Error fetching eService data:', error);
      });
  }, [tenants]);

  function handleSort(column) {
    // Toggle sort order when clicking on a column header
    if (column === sortBy) {
      setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setSortBy(column);
      setSortOrder('ASC');
    }
  }

  return (
    <div>
      <h1 style={{ margin: '30px', padding: '0px', color: 'white' }}>
        <center>Tenant List</center>
      </h1>

      <div className="controls" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="pagination">
          <label htmlFor="pageSize" style={{ color: 'white' }}>
            Items per page:
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>

        <div className="sorting">
          <label htmlFor="sortBy" style={{ color: 'white' }}>
            Sorted By:
          </label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="tId">ID</option>
            <option value="tName">Name</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>

      <table className="table-View">
        <thead>
          <tr>
            <th className='table-View th' onClick={() => handleSort('tId')}>Tenant ID</th>
            <th className='table-View th' onClick={() => handleSort('tName')}>Tenant Name</th>
            <th className='table-View th'>eService Name</th>
            <th className='table-View th' onClick={() => handleSort('Update')}></th>
            <th className='table-View th' onClick={() => handleSort('Disable')}></th>
          </tr>
        </thead>
        <tbody>
          {tenants.map((tenant) => (
            <tr key={tenant.tId}>
              <td className='table-View td'>{tenant.tId}</td>
              <td className='table-View td'>{tenant.tName}</td>
              <td className='table-View td'>
                {/* Find the corresponding eService for the tenant */}
                {eservices.find((eservice) => eservice.tId === tenant.tId)?.eName || 'No eService'}
              </td>
              <td className='table-View td'>
                <button onClick={() => navigate(`/update/${tenant.tId}`)}>
                  Update
                </button>
              </td>
              <td className='table-View td'><button>Disable</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button
          className="btn btn-dark"
          onClick={() => setPageNumber(pageNumber - 1)}
          disabled={pageNumber === 0}
        >
          Previous
        </button>
        <button
          className="btn btn-dark"
          onClick={() => setPageNumber(pageNumber + 1)}
          disabled={!hasMoreData}
        >
          Next
        </button>
      </div>

      <Link to="/tenant/addNewTenant">Add New Tenant</Link>
    </div>
  );
};

export default TenantView;
