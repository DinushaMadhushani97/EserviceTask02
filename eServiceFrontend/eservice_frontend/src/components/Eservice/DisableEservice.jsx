import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

const DisableEservice = () => {
  const navigate = useNavigate();
  const { eId } = useParams();

  const [status, setStatus] = useState("");

  useEffect(() => {
    // Fetch the existing resource details and populate the status
    const fetchEserviceDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/eservices/api/eservice/${eId}`);
        setStatus(response.data.status);
      } catch (error) {
        console.error("Error fetching eservice details:", error);
      }
    };

    fetchEserviceDetails();
  }, [eId]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleDisable = async () => {
    try {
      await axios.patch(`http://localhost:8080/eservices/api/eservice/disable/${eId}`, { status });
      alert("Eservice disabled successfully!");
      navigate('/eservice/eserviceView');
    } catch (error) {
      console.error("Error disabling the eservice:", error);
      alert("Error disabling the resource. Please check the server logs for more details.");
    }
  };

  return (
    <div className="addeservice-overlay">
    <div className="formConatiner">
      <h1 style={{ color: "white", padding: "10px" }}>
      Disable Resource</h1>

      <div>
              <label style={{ color: 'white' }}>Status: </label>
              <select
                className="form-select"
                name="status"
                value={status}
                onChange={handleStatusChange}
                required
              >
                <option value="">Select Status</option>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>
            <div  className="d-flex justify-content-center"
              style={{ marginTop: "30px" }}>
      <button className="btn btn-primary" onClick={handleDisable}>Disable Resource</button>
      </div>
    </div>
    </div>
  );
};

export default DisableEservice;
