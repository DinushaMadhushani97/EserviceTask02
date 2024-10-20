import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const ServerView = () => {
  const navigate = useNavigate();
  const [servers, setServers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [sortBy, setSortBy] = useState("sId");
  const [sortOrder, setSortOrder] = useState("ASC");
  const [pageSize, setPageSize] = useState(10);
  const [hasMoreData, setHasMoreData] = useState(true);

  useEffect(() => {
    // Function to fetch server data
    const fetchServerData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/eservices/api/server/list",
          {
            params: {
              pageNumber,
              pageSize,
              sortBy,
              sortOrder,
            },
          }
        );

        const data = response.data;
        console.log("Response data:", data);

        if (data.length === 0) {
          setHasMoreData(false);
        } else {
          setServers(data);
          setHasMoreData(true);
        }
      } catch (error) {
        console.error("Error fetching Server data:", error);
      }
    };

    // Call the function to fetch data whenever dependencies change
    fetchServerData();
  }, [pageNumber, sortBy, sortOrder, pageSize]);

  function handleSort(column) {
    // Toggle sort order when clicking on a column header
    if (column === sortBy) {
      setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
    } else {
      setSortBy(column);
      setSortOrder("ASC");
    }
  }

  return (
    <div>
      <h1 style={{ margin: "30px", padding: "0px", color: "white" }}>
        <center>Server List</center>
      </h1>

      <div
        className="controls"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="pagination">
          <label htmlFor="pageSize" style={{ color: "white" }}>
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
          <label htmlFor="sortBy" style={{ color: "white" }}>
            Sorted By:
          </label>
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
      </div>

      <table className="table-View">
        <thead>
          <tr>
            <th className="table-View th" onClick={() => handleSort("sId")}>
              Server ID
            </th>
            <th
              className="table-View th"
              onClick={() => handleSort("ipAddress")}
            >
              IP Address
            </th>
            <th className="table-View th" onClick={() => handleSort("type")}>
              Type
            </th>
            <th
              className="table-View th"
              onClick={() => handleSort("Update")}
            ></th>
            <th
              className="table-View th"
              onClick={() => handleSort("Disable")}
            ></th>
          </tr>
        </thead>
        <tbody>
          {servers.map((server) => (
            <tr key={server.sId}>
              <td className="table-View td">{server.sId}</td>
              <td className="table-View td">{server.ipAddress}</td>
              <td className="table-View td">{server.type}</td>
              <td className="table-View td">
                <button
                  className="btn btn-dark"
                  onClick={() => navigate(`/update/${server.sId}`)}
                >
                  Update
                </button>
              </td>
              <td className="table-View td">
                <button className="btn btn-dark">Disable</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        className="pagination"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
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

      <Link to="/server/addNewServer">Add New Server</Link>
    </div>
  );
};

export default ServerView;
