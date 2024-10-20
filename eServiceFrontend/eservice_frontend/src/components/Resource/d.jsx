import React, { useState } from "react";
import axios from "axios";
import "../style.css";
import "bootstrap/dist/css/bootstrap.min.css";

const AddResource = () => {
  const [resourceData, setResourceData] = useState({
    procurementDocs: null,
    srs: null,
    systemArchitecture: null,
    deploymentArchitecture: null,
    other: null,
    status: "",
    eId: 1,
  });

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setResourceData({ ...resourceData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allFieldsEmpty = Object.values(resourceData).every((value) => value === null);

    if (allFieldsEmpty) {
      alert("Cannot submit form. At least one field should be filled.");
      return;
    }

    const isConfirmed = window.confirm("Form Submitted Successfully....");

    if (isConfirmed) {
      const formData = new FormData();

      for (const key in resourceData) {
        if (resourceData[key]) {
          formData.append(key, resourceData[key]);
        }
      }

      try {
        await axios.post(
          `http://localhost:8080/eservices/api/resource/add/${resourceData.eId}`,
          formData
        );

        alert("Resource added successfully!");
      } catch (error) {
        console.error("Error adding the resource:", error);
        alert(
          "Error adding the resource. Please check the server logs for more details."
        );
      }
    } else {
      alert("Submission Canceled");
    }
  };

  return (
    <div>
      <div className="addeservice-overlay">
        <div className="formConatiner">
          <h1 style={{ color: "white", padding: "10px" }}>
            <center>Document Management</center>
          </h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="form-label" style={{ color: "white", marginTop: "20px" }}>
                Procurement Documents
              </label>
              <input
                className="form-control"
                id="inputGroupFile01"
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
                id="inputGroupFile01"
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
                id="inputGroupFile01"
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
                id="inputGroupFile01"
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
                id="inputGroupFile01"
                type="file"
                name="other"
                onChange={handleFileChange}
              />
            </div>
            <div
              className="d-flex justify-content-center"
              style={{ marginTop: "30px" }}
            >
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "50%", marginBottom: "60px" }}
              >
                Finish
              </button>

            </div>

            
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddResource;
