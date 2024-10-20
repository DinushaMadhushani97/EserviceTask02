import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServerView = () => {
  const [servers, setServers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [sortBy, setSortBy] = useState('sId');
  const [sortOrder, setSortOrder] = useState('ASC');
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/eservices/api/server/list', {
          params: {
            pageNumber,
            pageSize,
            sortBy,
            sortOrder,
          },
        });

        const data = response.data;
        setServers(data);
      } catch (error) {
        console.error('Error fetching Server data:', error);
      }
    };

    fetchData();
  }, [pageNumber, pageSize, sortBy, sortOrder]);

  const handleSort = (column) => {
    if (column === sortBy) {
      setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setSortBy(column);
      setSortOrder('ASC');
    }
  };

  return (
    <div>
      <h1>Server List</h1>

      <div className="controls">
        <label htmlFor="pageSize">Items per page:</label>
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
        <label htmlFor="sortBy">Sorted By:</label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="sId">ID</option>
          <option value="sIpAddress">IP Address</option>
          <option value="sType">Type</option>
        </select>
      </div>

      <table className="table-View">
        <thead>
          <tr>
            <th onClick={() => handleSort('sId')}>Server ID</th>
            <th onClick={() => handleSort('sIpAddress')}>IP Address</th>
            <th onClick={() => handleSort('sType')}>Type</th>
          </tr>
        </thead>
        <tbody>
          {servers.map((server) => (
            <tr key={server.sId}>
              <td>{server.sId}</td>
              <td>{server.sIpAddress}</td>
              <td>{server.sType}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => setPageNumber(pageNumber - 1)}
          disabled={pageNumber === 0}
        >
          Previous
        </button>
        <button
          onClick={() => setPageNumber(pageNumber + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ServerView;
