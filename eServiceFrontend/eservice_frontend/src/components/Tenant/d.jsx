import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddTenant = () => {
  const navigate = useNavigate();
  const [tenantData, setTenantData] = useState({
    tName: "",
    userListId: 1,
    department1: "",
    contactPerson1: "",
    department2: "",
    contactPerson2: "",
    department3: "",
    contactPerson3: "",
    vCPU: "",
    ram: "",
    storage: "",
  });
  const [availableUserList, setAvailableUserList] = useState([]);
  const [availableTenantNames, setAvailableTenantNames] = useState([]);
  // const [newTenantName, setNewTenantName] = useState([]);
  const [message, setMessage] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("User List ID:", tenantData.userListId);
      await axios.post(
        `http://localhost:8080/eservices/api/add/${tenantData.userListId}`,
        tenantData
      );

      // Reset the form and display a success message
      setTenantData({
        tName: "",
        userListId: 1,
        department1: "",
        contactPerson1: "",
        department2: "",
        contactPerson2: "",
        department3: "",
        contactPerson3: "",
        vCPU: "",
        ram: "",
        storage: "",
      });
      setMessage("Tenant added successfully!");

      // Navigate to the AddServer page
      navigate("/server/addServer");
    } catch (error) {
      console.error("Error adding the tenant:", error);
      setMessage(
        "Error adding the tenant. Please check the server logs for more details."
      );
    }
  };

  // Function to navigate to addNew tenant page
  const navigateNewTenant = () => {
    navigate("/tenant/addNewTenant");
  };

  // Function to navigate to AddUserList page
  const navigateUserList = () => {
    navigate("/userList/addUserList");
  };

  // Function to clear form fields
  const handleClear = () => {
    setTenantData({
      tName: "",
      userListId: 1,
      department1: "",
      contactPerson1: "",
      department2: "",
      contactPerson2: "",
      department3: "",
      contactPerson3: "",
      vCPU: "",
      ram: "",
      storage: "",
    });
  };

  // Function to handle input changes for Level Supports
  const handleLevelChange = (e) => {
    const { name, value } = e.target;
    setTenantData({
      ...tenantData,
      [name]: value,
    });
  };

  // Function to filter contact persons based on department
  const getContactPersons = (department) => {
    return availableUserList
      .filter((user) => user.department === department)
      .map((user) => ({
        userListId: user.userListId,
        contactPerson: user.contactPerson,
      }));
  };

  // Fetch available user list data from the server when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:8080/eservices/api/tenant/userList")
      .then((response) => {
        const userListData = response.data;
        setAvailableUserList(userListData);
      })
      .catch((error) => {
        console.error("Error fetching user list data:", error);
      });

    // Fetch available Tenant Names from the server when the component mounts
    axios
      .get("http://localhost:8080/eservices/api/tenant/tenantList")
      .then((response) => {
        const tNameData = response.data.map((tenant) => tenant.tName);
        setAvailableTenantNames(tNameData);
      })
      .catch((error) => {
        console.error("Error fetching Tenant Name data:", error);
      });
  }, []);

  //Fetch currntly added Tname

  return (
    <div>
      <div className="addeservice-overlay">
        <div className="formConatiner">
          <h1 style={{ color: "white" }}>
            <center> Tenant & Resource Management</center>
          </h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label
                className="form-label"
                style={{ color: "white" }}
                htmlFor="tName"
              >
                Tenant Name:
              </label>
              <div className="select-container">
                <select
                  className="form-select"
                  id="tName"
                  name="tName"
                  value={tenantData.tName}
                  onChange={handleLevelChange}
                  required
                >
                  <option value="" disabled>
                    -- Select Tenant Name --
                  </option>
                  {availableTenantNames.map((tName) => (
                    <option key={tName} value={tName}>
                      {tName}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={navigateNewTenant}
                >
                  Add
                </button>
              </div>
            </div>

            {/* Level 1 Support */}
            <div>
              <label
                className="form-label"
                style={{ color: "white" }}
                htmlFor="department1"
              >
                Level 1 Support:
              </label>
              <div className="select-container">
                <select
                  className="form-select"
                  id="department1"
                  name="department1"
                  value={tenantData.department1}
                  onChange={handleLevelChange}
                  required
                >
                  <option value="" disabled>
                    -- Select Department --
                  </option>
                  {availableUserList.map((user) => (
                    <option key={user.userListId} value={user.department}>
                      {user.department}
                    </option>
                  ))}
                </select>
                <select
                  className="form-select"
                  id="contactPerson1"
                  name="contactPerson1"
                  value={tenantData.contactPerson1}
                  onChange={handleLevelChange}
                  required
                >
                  <option value="" disabled>
                    -- Select Contact Person --
                  </option>
                  {getContactPersons(tenantData.department1).map((user) => (
                    <option key={user.userListId} value={user.userListId}>
                      {user.contactPerson}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={navigateUserList}
                >
                  Add
                </button>
              </div>
            </div>

            {/* Level 2 Support */}
            <div>
              <label
                className="form-label"
                style={{ color: "white" }}
                htmlFor="department2"
              >
                Level 2 Support:
              </label>
              <div className="select-container">
                <select
                  className="form-select"
                  id="department2"
                  name="department2"
                  value={tenantData.department2}
                  onChange={handleLevelChange}
                  required
                >
                  <option value="" disabled>
                    -- Select Department --
                  </option>
                  {availableUserList.map((user) => (
                    <option key={user.userListId} value={user.department}>
                      {user.department}
                    </option>
                  ))}
                </select>
                <select
                  className="form-select"
                  id="contactPerson2"
                  name="contactPerson2"
                  value={tenantData.contactPerson2}
                  onChange={handleLevelChange}
                  required
                >
                  <option value="" disabled>
                    -- Select Contact Person --
                  </option>
                  {getContactPersons(tenantData.department2).map((user) => (
                    <option key={user.userListId} value={user.userListId}>
                      {user.contactPerson}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={navigateUserList}
                >
                  Add
                </button>
              </div>
            </div>

            {/* Level 3 Support */}
            <div>
              <label
                className="form-label"
                style={{ color: "white" }}
                htmlFor="department3"
              >
                Level 3 Support:
              </label>
              <div className="select-container">
                <select
                  className="form-select"
                  id="department3"
                  name="department3"
                  value={tenantData.department3}
                  onChange={handleLevelChange}
                  required
                >
                  <option value="" disabled>
                    -- Select Department --
                  </option>
                  {availableUserList.map((user) => (
                    <option key={user.userListId} value={user.department}>
                      {user.department}
                    </option>
                  ))}
                </select>
                <select
                  className="form-select"
                  id="contactPerson3"
                  name="contactPerson3"
                  value={tenantData.contactPerson3}
                  onChange={handleLevelChange}
                  required
                >
                  <option value="" disabled>
                    -- Select Contact Person --
                  </option>
                  {getContactPersons(tenantData.department3).map((user) => (
                    <option key={user.userListId} value={user.userListId}>
                      {user.contactPerson}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={navigateUserList}
                >
                  Add
                </button>
              </div>
            </div>

            <div>
              <label
                className="form-label"
                style={{ color: "white" }}
                htmlFor="Hardware Resources"
              >
                Hardware Resources:
              </label>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  placeholder="Enter vCPU"
                  type="text"
                  id="vCPU"
                  name="vCPU"
                  value={tenantData.vCPU}
                  onChange={handleLevelChange}
                  style={{ marginTop: "10px" }}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="ram"
                  name="ram"
                  placeholder="Enter RAM"
                 
                  value={tenantData.ram}
                  onChange={handleLevelChange}
                  style={{ marginTop: "10px" }}
                />
                <span className="input-group-text" id="basic-addon2">
                  GB
                </span>
              </div>

              {/* <input
                className="form-control"
                placeholder="Enter RAM"
                type="text"
                id="ram"
                name="ram"
                value={tenantData.ram}
                onChange={handleLevelChange}
                style={{ marginTop: '20px' }}
                
              />

              <input
                className="form-control"
                placeholder="Enter Storage"
                type="text"
                id="storage"
                name="storage"
                value={tenantData.storage}
                onChange={handleLevelChange}
                style={{ marginTop: '20px' }}
              /> */}

              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="storage"
                  placeholder="Enter Storage"
                  name="storage"
                  value={tenantData.storage}
                  onChange={handleLevelChange}
                  style={{ marginTop: "10px" }}
                />
                <span className="input-group-text" id="basic-addon2">
                  GB
                </span>
              </div>


              {/* RAM Input */}
{/* <div className="input-group mb-3">
  <input
    className="form-control"
    placeholder="Enter RAM"
    type="text"
    id="ram"
    name="ram"
    value={tenantData.ram}
    onChange={handleLevelChange}
    style={{ marginTop: '10px' }}
  />
  <span className="input-group-text" id="basic-addon2">
    GB
  </span>
</div> */}

{/* Storage Input */}
{/* <div className="input-group mb-3">
  <input
    className="form-control"
    placeholder="Enter Storage"
    type="text"
    id="storage"
    name="storage"
    value={tenantData.storage}
    onChange={handleLevelChange}
    style={{ marginTop: '10px' }}
  />
  <span className="input-group-text" id="basic-addon2">
    GB
  </span>
</div> */}

            </div>

            <div
              className="d-flex justify-content-between"
              style={{ marginTop: "30px" }}
            >
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClear}
                style={{ width: "40%", marginBottom: "60px" }}
              >
                Clear
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "40%", marginBottom: "60px" }}
              >
                Next
              </button>
            </div>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default AddTenant;
