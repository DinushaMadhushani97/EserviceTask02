import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../style.css";

const EserviceView = () => {
  const navigate = useNavigate();

  const [eservices, setEservices] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [sortBy, setSortBy] = useState('eId');
  const [sortOrder, setSortOrder] = useState('ASC');
  const [pageSize, setPageSize] = useState(10);
  const [hasMoreData, setHasMoreData] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:8080/eservices/api/eservice/list', {
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
          setEservices(data);
          setHasMoreData(true);
        }
      })
      .catch((error) => {
        console.error('Error fetching eService data:', error);
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
      <h1 className='title'>
        <center>eService List</center>
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
            <option value="eId">ID</option>
            <option value="eName">Name</option>
            <option value="organizationName">Organization</option>
          </select>
        </div>
      </div>

      <table className="table-View">
        <thead>
          <tr>
            <th className='table-View th' onClick={() => handleSort('eId')}>eService ID</th>
            <th className='table-View th' onClick={() => handleSort('eName')}>eService Name</th>
            <th className='table-View th' onClick={() => handleSort('status')}>Status</th>
            <th className='table-View th' onClick={() => handleSort('organizationName')}>Organization</th>
            <th className='table-View th' onClick={() => handleSort('description')}>Description</th>
            <th className='table-View th' onClick={() => handleSort('contactPerson')}>Contact</th>
            <th className='table-View th' onClick={() => handleSort('Update')}></th>
            <th className='table-View th' onClick={() => handleSort('Disable')}></th>
          
          </tr>
        </thead>
        <tbody>
          {eservices.map((eservice) => (
            <tr key={eservice.eId}>
              <td className='table-View td'>{eservice.eId}</td>
              <td className='table-View td'>{eservice.eName}</td>
              <td className='table-View td'>{eservice.status}</td>
              <td className='table-View td'>{eservice.organizationName}</td>
              <td className='table-View td'>{eservice.description}</td>
              <td className='table-View td'>{eservice.contactPerson}</td>
             
              <td className='table-View td'>
                <button className='btn btn-dark' onClick={() => navigate(`/update/${eservice.eId}`)}>
                  Update
                </button>
              </td>
              <td className='table-View td'><button onClick={() => navigate(`/eservice/disableEservice/${eservice.eId}`)}className='btn btn-dark'>Disable</button></td>
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

export default EserviceView;
