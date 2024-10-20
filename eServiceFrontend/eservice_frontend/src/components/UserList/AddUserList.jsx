import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style.css';

const AddUserList = () => {

  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [userListData, setUserListData] = useState({
    department: '',
    contactPerson: '',
  });

  //Function handle for add new useeList
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/api/eService/userList/add', userListData);
      //Reset the form and display a success message
      setUserListData({
        department:'',
        contactPerson:'',
      });
      setMessage('UserList added successfully..!');
      //Naviagate to the Tenant Page
      navigate('/tenant/addTenant');
    } catch (error) {
      setMessage('Error adding the tenant');
    }
  };

  //Function to clear from feilds
  const handleClear = () => {
    setUserListData({
      department:'',
      contactPerson:'',
    });
  };

  //Function to cancel and navigate without adding data
  const handleCancel = () => {
    navigate('/tenant/addTenant')
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserListData({ ...userListData, [name]: value });
  }
  
  return (
    <div>
      <div className="addeservice-overlay">
        <div className="formConatiner">
          <h1 style={{ color: 'white' }}>
            <center>Add New Developer</center>
          </h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="form-label" style={{ color: 'white' }}>
                Department
              </label>
              <input
                className="form-control"
                type="text"
                name="department"
                value={userListData.department}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="form-label" style={{ color: 'white' }}>
                Contact Person
              </label>
              <input
                className="form-control"
                type="text"
                name="contactPerson"
                value={userListData.contactPerson}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="d-flex justify-content-between" style={{ marginTop: '20px' }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClear}
                style={{ width: '20%', marginBottom: '60px' }}
              >
                Clear
              </button>
              <button type="submit" className="btn btn-primary" style={{ width: '20%', marginBottom: '60px' }}>
                Back
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCancel}
                style={{ width: '20%', marginBottom: '60px' }}
              >
                Cancel
              </button>
            </div>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default AddUserList