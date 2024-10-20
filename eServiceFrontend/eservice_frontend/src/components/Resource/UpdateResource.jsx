import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

const UpdaterResource = () => {
  const navigate = useNavigate();
  const { rId } = useParams();

  const [resourceData, setResourceData] = useState({
    procurementDocs: null,
    srs: null,
    systemArchitecture: null,
    deploymentArchitecture: null,
    other: null,
    eId: null,
  });

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setResourceData({ ...resourceData, [name]: files[0] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResourceData({ ...resourceData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (const key in resourceData) {
      if (resourceData[key] !== null) {
        formData.append(key, resourceData[key]);
      }
    }

    try {
      await axios.put(
        `http://localhost:8080/eservices/api/resource/update/${rId}`,
        formData
      );

      alert("Resource updated successfully!");
    } catch (error) {
      console.error("Error updating the resource:", error);
      alert(
        "Error updating the resource. Please check the server logs for more details."
      );
    }
  };

  // Function to go back to view page
  const handleCurrentPage = () => {
    navigate('/resource/resourceView');
  };


  return (
    <div>
      <div className="addeservice-overlay">
        <div className="formConatiner">
          <h1 style={{ color: "white", padding: "10px" }}>
            <center>Update Resource</center>
          </h1>
          <form onSubmit={handleUpdate}>
            <div>
              <label className="form-label" style={{ color: "white", marginTop: "20px" }}>
                Procurement Documents
              </label>
              <input
                className="form-control"
                type="file"
                name="procurementDocs"
                onChange={handleFileChange}
              />
            </div>
            <div>
              <label className="form-label" style={{ color: "white", marginTop: "20px" }}>
                SRS
              </label>
              <input
                className="form-control"
                type="file"
                name="srs"
                onChange={handleFileChange}
              />
            </div>
            <div>
              <label className="form-label" style={{ color: "white", marginTop: "20px" }}>
                System Architecture
              </label>
              <input
                className="form-control"
                type="file"
                name="systemArchitecture"
                onChange={handleFileChange}
              />
            </div>
            <div>
              <label className="form-label" style={{ color: "white", marginTop: "20px" }}>
                Deployment Architecture
              </label>
              <input
                className="form-control"
                type="file"
                name="deploymentArchitecture"
                onChange={handleFileChange}
              />
            </div>
            <div>
              <label className="form-label" style={{ color: "white", marginTop: "20px" }}>
                Other Documents
              </label>
              <input
                className="form-control"
                type="file"
                name="other"
                onChange={handleFileChange}
              />
            </div>
            <div>
              <label className="form-label" style={{ color: "white", marginTop: "20px" }}>
                eId
              </label>
              <input
                className="form-control"
                type="text"
                name="eId"
                onChange={handleChange}
              />
            </div>
            <div
              className="d-flex justify-content-between"
              style={{ marginTop: "30px" }}
            >
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "50%", marginBottom: "60px" }}
              >
                Update
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleCurrentPage}
                style={{ width: "50%", marginBottom: "60px" }}
              >
                View Page
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdaterResource;
