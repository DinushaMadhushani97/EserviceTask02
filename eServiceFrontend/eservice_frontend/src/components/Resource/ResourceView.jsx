import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../style.css";
import { useNavigate } from 'react-router-dom';
const ResourceView = () => {
    const navigate = useNavigate();

  const [resources, setResources] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [sortBy, setSortBy] = useState('rId');
  const [sortOrder, setSortOrder] = useState('ASC');
  const [pageSize, setPageSize] = useState(10);
  const [hasMoreData, setHasMoreData] = useState(true);


  
  useEffect(() => {
    axios
      .get('http://localhost:8080/eservices/api/resource/list', {
        params: {
          pageNumber,
          pageSize,
          sortBy,
          sortOrder,
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.length === 0) {
          setHasMoreData(false);
        } else {
          setResources(data);
          setHasMoreData(true);
        }
      })
      .catch((error) => {
        console.error('Error fetching Resource data:', error);
      });
  }, [pageNumber, sortBy, sortOrder, pageSize]);

  function handleSort(column) {
    if (column === sortBy) {
      setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setSortBy(column);
      setSortOrder('ASC');
    }
  }

  return (
    <div>
      <h1 className='title' >
        <center>Resource List</center>
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
            <option value="rId">ID</option>
            {/* <option value="procurementDocs">Procurement Docs</option>
            <option value="srs">SRS</option>
            <option value="systemArchitecture">System Architecture</option>
            <option value="deploymentArchitecture">Deployment Architecture</option>
            <option value="other">Other</option>
            <option value="status">Status</option> */}
          </select>
        </div>
      </div>

      <table className="table-View">
        <thead>
          <tr>
            <th className='table-View th' onClick={() => handleSort('rId')}>Resource ID</th>
            <th className='table-View th' onClick={() => handleSort('procurementDocs')}>Procurement Docs</th>
            <th className='table-View th' onClick={() => handleSort('srs')}>SRS</th>
            <th className='table-View th' onClick={() => handleSort('systemArchitecture')}>System Architecture</th>
            <th className='table-View th' onClick={() => handleSort('deploymentArchitecture')}>Deployment Architecture</th>
            <th className='table-View th' onClick={() => handleSort('other')}>Other</th>
            <th className='table-View th' onClick={() => handleSort('Update')}></th>
            <th className='table-View th' onClick={() => handleSort('Disable')}></th>
            {/* <th onClick={() => handleSort('status')}>Status</th> */}
          </tr>
        </thead>
        <tbody>
          {resources.map((resource) => (
            <tr key={resource.rId}>
              <td className='table-View td'>{resource.rId}</td>
              <td className='table-View td'>{resource.procurementDocs}</td>
              <td className='table-View td'>{resource.srs}</td>
              <td className='table-View td'>{resource.systemArchitecture}</td>
              <td className='table-View td'>{resource.deploymentArchitecture}</td>
              <td className='table-View td'>{resource.other}</td>
              <td className='table-View td'>
  <button className="btn btn-dark"onClick={() => navigate(`/resource/updateResource/${resource.rId}`)}>
    Update
  </button>
</td>
              <td className='table-View td'><button className="btn btn-dark" onClick={() => navigate(`/resource/disableResource/${resource.rId}`)}>Disable</button></td>
              {/* <td>{resource.status}</td> */}
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
    </div>
  );
};

export default ResourceView;
