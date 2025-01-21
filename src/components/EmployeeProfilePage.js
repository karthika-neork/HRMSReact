import React, { useState } from 'react';

const EmployeeProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
  };

  const profileData = {
    name: 'ARGI GOPI',
    role: 'SENIOR SOFTWARE ENGINEER',
    employeeId: 'NT023',
    joiningDate: '05-08-2024',
    phone: '9876543210',
    email: 'argi.gopi@neork.com',
    dob: '08-01-1998',
    address: 'Thirunilathil(h) Vettamppara PO Kulangattukuzhi 686681'
  };

  return (
    <div className="container-fluid bg-light min-vh-100 p-4 m-5">
      {/* Header Section */}
      <div className="bg-white p-4 mb-3 shadow-sm">
        <div className="d-flex">
          <div className="me-3 position-relative" style={{ width: '150px', height: '150px' }}>
            {imagePreview ? (
              <div className="rounded-circle bg-secondary position-relative" style={{ width: '150px', height: '150px', overflow: 'hidden' }}>
                <img
                  src={imagePreview}
                  alt="Uploaded Preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onClick={() => document.getElementById('fileInput').click()}
                />
                <button
                  className="btn btn-danger position-absolute"
                  style={{ top: '-10px', right: '-10px', borderRadius: '50%' }}
                  onClick={handleRemoveImage}
                >
                  &times;
                </button>
              </div>
            ) : (
              <div
                className="rounded-circle bg-secondary d-flex align-items-center justify-content-center"
                style={{ width: '150px', height: '150px', cursor: 'pointer' }}
                onClick={() => document.getElementById('fileInput').click()}
              >
                <span className="text-white">Upload</span>
              </div>
            )}
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </div>
          {/* <div className="me-3">
            <div className="rounded-circle bg-secondary" style={{ width: '150px', height: '150px' }}></div>
          </div> */}
          <div className="flex-grow-1">
            <div className="row">
              <div className="col-md-6">
                <h4 className="mb-1 fw-bold text-black">{profileData.name}</h4>
                <p className="text-secondary mb-1">{profileData.role}</p>
                <p className="text-secondary mb-1">Employee ID: {profileData.employeeId}</p>
                <p className="text-secondary mb-0">Date of Joining: {profileData.joiningDate}</p>
              </div>
              <div className="col-md-6 text-md-start">
                <p className="mb-1">Phone: {profileData.phone}</p>
                <p className="mb-1">Email: {profileData.email}</p>
                <p className="mb-1">DOB: {profileData.dob}</p>
                <p className="mb-0">Address: {profileData.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-4">
        <ul className="nav nav-tabs border-bottom">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'profile' ? 'active text-primary' : 'text-secondary'}`}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'bank' ? 'active text-primary' : 'text-secondary'}`}
              onClick={() => setActiveTab('bank')}
            >
              Bank & Statutory <span className="text-danger">(Admin Only)</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Content Area */}
      <div className="p-4 m-4">
        {activeTab === 'profile' ? (
          <>
            <div className="bg-white p-4 shadow-sm">
              <div className="row p-4 d-flex justify-content-center">
                <div className="col-5 mb-4">
                  <div className="bg-white p-4 h-100 shadow-sm">
                    <h5 className="mb-4">Emergency Contact</h5>
                    <div className="mb-4">
                      <h6 className="text-primary">Primary</h6>
                      <div className="ms-3">
                        <p className="mb-2">Name: Gopi T.K</p>
                        <p className="mb-2">Relationship: Father</p>
                        <p className="mb-2">Phone: 9876543210</p>
                      </div>
                    </div>
                    <div>
                      <h6 className="text-primary">Secondary</h6>
                      <div className="ms-3">
                        <p className="mb-2">Name: Rajani Gopi</p>
                        <p className="mb-2">Relationship: Mother</p>
                        <p className="mb-2">Phone: 9876543210</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-5 mb-4">
                  <div className="bg-white p-4 h-100 shadow-sm">
                    <h5 className="mb-4">Bank Information</h5>
                    <p className="mb-3">Bank Name:</p>
                    <p className="mb-3">Branch:</p>
                    <p className="mb-3">Bank Account No:</p>
                    <p className="mb-3">IFSC Code:</p>
                  </div>
                </div>
              </div><div className="row p-4 d-flex justify-content-center">
                <div className="col-5 mb-4">
                  <div className="bg-white p-4 h-100 shadow-sm">
                    <h5 className="mb-4">Education Information</h5>
                  </div>
                </div>
                <div className="col-5 mb-4">
                  <div className="bg-white p-4 h-100 shadow-sm">
                    <h5 className="mb-4">Bank Information</h5>
                  </div>
                </div>
              </div>
            </div></>

        ) : (
          <div className="bg-white p-4 shadow-sm">
            <div className="mb-5">
              <h5 className="mb-4">Basic Salary Information</h5>
              <div className="mb-3">
                <label className="form-label">Net Salary</label>
                <input type="text" className="form-control" readOnly />
              </div>
            </div>
            <div>
              <h5 className="mb-4">Earnings</h5>
              <div className="mb-3">
                <label className="form-label">Basic</label>
                <input type="text" className="form-control" readOnly />
              </div>
              <div className="mb-3">
                <label className="form-label">DA</label>
                <input type="text" className="form-control" readOnly />
              </div>
              <div className="mb-3">
                <label className="form-label">HRA</label>
                <input type="text" className="form-control" readOnly />
              </div>
              <div className="mb-3">
                <label className="form-label">Contribution to PF</label>
                <input type="text" className="form-control" readOnly />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeProfile;