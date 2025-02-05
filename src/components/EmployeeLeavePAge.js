import React, { useState } from "react";
import DataTable from 'react-data-table-component';
import { FaEye, FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { FaCheckCircle } from 'react-icons/fa';
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

// Inside your component

function EmployeeLeave() {
  const [activeTab, setActiveTab] = useState("apply");
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [globalFilter, setGlobalFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const handlePageSizeChange = (e) => {
    const newSize = Number(e.target.value);
    setPageSize(newSize);
    setPageIndex(0);
  };

  const onPageChanged = (newPage) => {
    setCurrentPage(newPage);
    setPageIndex(newPage);
  };

  // apply form
  const [formData, setFormData] = useState({
    leaveType: '',
    leavesRemaining: '',
    fromDate: '',
    toDate: '',
    partialDays: 'none',
    totalDuration: '',
    comments: '',
    attachments: null
  });



  // Handle input changes
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value, type, files, name } = e.target;
    const fieldId = id || name;

    setFormData((prev) => ({
      ...prev,
      [fieldId]: type === 'file' ? files[0] : value,
    }));

    setTouched((prev) => ({
      ...prev,
      [fieldId]: true,
    }));

    if (errors[fieldId]) {
      setErrors((prev) => ({
        ...prev,
        [fieldId]: '',
      }));
    }
  };

  // Handle field blur for validation
  const handleBlur = (e) => {
    const { id, name } = e.target;
    const fieldId = id || name;
    setTouched((prev) => ({
      ...prev,
      [fieldId]: true,
    }));

    const fieldError = validateField(fieldId, formData[fieldId]);
    if (fieldError) {
      setErrors((prev) => ({
        ...prev,
        [fieldId]: fieldError,
      }));
    }
  };

  // Validate single field
  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'leaveType':
        return !value ? 'Leave type is required' : '';

      case 'leavesRemaining':
        return !value ? 'Leave remaining is required' : '';

      case 'fromDate':
        return !value ? 'From date is required' : '';
      case 'toDate':
        if (!value) return 'To date is required';
        if (formData.fromDate && new Date(value) < new Date(formData.fromDate)) {
          return 'End date cannot be before start date';
        }
        return '';
      case 'partialDays':
        return !value ? 'Please select a partial days option' : '';
      case 'comments':
        return !value ? 'Comments are required' : '';
      // case 'attachments':
      //   if (!value) return '';
      //   const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      //   const maxSize = 5 * 1024 * 1024; // 5MB
      //   if (!allowedTypes.includes(value.type)) {
      //     return 'File type not supported. Please upload JPG, PNG, or PDF';
      //   }
      //   if (value.size > maxSize) {
      //     return 'File size should not exceed 5MB';
      //   }
      //   return '';
      default:
        return '';
    }
  };

  // Validate the form
  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    console.log('Form submitted:', formData);
    handleReset();
    setIsSubmitting(false);
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      leaveType: '',
      leavesRemaining: '',
      fromDate: '',
      toDate: '',
      partialDays: 'none',
      totalDuration: '',
      comments: '',
      attachments: null,
    });
    setErrors({});
    setTouched({});
  };
  const data = [
    { id: 1, employee_name: "John Doe", date: "2025-01-10", leave_type: "Sick Leave", requested_duration: "2 days", status: "Pending" },
    { id: 2, employee_name: "Jane Smith", date: "2025-01-12", leave_type: "Casual Leave", requested_duration: "1 day", status: "Approved" },
  ];

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleView = (row) => {
    setSelectedRow(row);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedRow(null);
  };
  const handleDelete = (row) => {
    console.log("Deleting:", row);
  };

  // Define columns for DataTable
  const columns = [
    {
      name: '#',
      selector: row => row.id,
      sortable: true,
      width: '70px'
    },
    {
      name: 'Employee',
      selector: row => row.employee_name,
      sortable: true,
    },
    {
      name: 'Date',
      selector: row => row.date,
      sortable: true,
    },
    {
      name: 'Leave Type',
      selector: row => row.leave_type,
      sortable: true,
    },
    {
      name: 'Duration',
      selector: row => row.requested_duration,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
      cell: row => (
        <span className={`badge ${row.status === 'Approved' ? 'bg-success' : 'bg-warning'}`}>
          {row.status}
        </span>
      )
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="d-flex gap-2">

          <button className="cursor-pointer btn btn-primary me-" >
            <FontAwesomeIcon icon={faEdit} />
          </button>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => handleView(row)}
          >
            <FaEye />
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(row)}
          >
            <FaTrash />
          </button>
        </div>
      ),
      width: '120px'
    }
  ];

  // Custom styles for DataTable
  const customStyles = {
    headRow: {
      style: {
        backgroundColor: '#f8f9fa',
        borderTopStyle: 'solid',
        borderTopWidth: '1px',
        borderTopColor: '#dee2e6',
      },
    },
    headCells: {
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
        padding: '16px',
      },
    },
    cells: {
      style: {
        padding: '16px',
      },
    },
  };

  //entitlementForm 
  const [entitlementForm, setEntitlementForm] = useState({
    leave_type: '',
    employee_name: '',
    from_date: '',
    to_date: '',
    entitlements: 'none',
    status: '',
  });
  const EntitlementData = [
    {
      id: 1,
      employee: "John Doe",
      leaveType: "Annual Leave",
      creditOn: "2024-01-01",
      validFrom: "2024-01-01",
      validTo: "2024-12-31",
      entitlement: 5,
      status: "Approved",
    },
    {
      id: 2,
      employee: "Jane Smith",
      leaveType: "Sick Leave",
      creditOn: "2024-02-15",
      validFrom: "2024-02-15",
      validTo: "2024-12-31",
      entitlement: 3,
      status: "Pending",
    },
  ];

  // Table Columns for Entitlements
  const entitlementColumns = [
    {
      name: "S.No",
      selector: (row, index) => index + 1, // Generate serial numbers
      sortable: false,
      width: "80px", // Adjust width
    },
    {
      name: "Employee",
      selector: (row) => row.employee,
      sortable: true,
    },
    {
      name: "Leave Type",
      selector: (row) => row.leaveType,
      sortable: true,
    },
    {
      name: "Credit On",
      selector: (row) => row.creditOn,
    },
    {
      name: "Valid From",
      selector: (row) => row.validFrom,
    },
    {
      name: "Valid To",
      selector: (row) => row.validTo,
    },
    {
      name: "Leave Entitlement",
      selector: (row) => row.entitlement,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => (
        <span
          className={`badge ${row.status === "Approved" ? "bg-success" : "bg-warning"
            }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button className="btn btn-sm btn-primary">
            <FaEdit />
          </button>
          <button className="btn btn-sm btn-danger">
            <FaTrash />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const [approveData, setApproveData] = useState([
    {
      employee: 'Pishuu',
      date: '2025-02-01',
      leave: 'Paid Leave',
      requested_duration: '5 days',
      status: 'Pending',
    },
    {
      employee: 'Sammm',
      date: '2025-02-05',
      leave: 'Sick Leave',
      requested_duration: '3 days',
      status: 'Pending',
    }
  ]);

  // Columns for DataTable, including action buttons
  const approveColumns = [
    { name: "#", selector: (row, index) => index + 1, width: "80px" },
    { name: "Employee", selector: (row) => row.employee, width: "200px" },
    { name: "Date", selector: (row) => row.date, width: "150px" },
    { name: "Leave Type", selector: (row) => row.leave, width: "180px" },
    { name: "Requested Duration", selector: (row) => row.requested_duration, width: "250px" },
    { name: "Status", selector: (row) => row.status, width: "230px" },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-1">
          <button className="btn btn-sm btn-primary" onClick={() => handleApprove(row)}>
            <FaCheck />
          </button>
          <button className="btn btn-sm btn-danger" onClick={() => handleReject(row)}>
            <FaTimes />
          </button>
          <button className="btn btn-sm btn-primary" onClick={() => handleApproveView(row)}>
            <FaEye />
          </button>
        </div>
      ),
      width: "",
    },
  ];

  // Handlers for action buttons
  const handleApprove = (row) => {
    console.log("Approve", row);
    // Your approve logic goes here
  };

  const handleReject = (row) => {
    console.log("Reject", row);
    // Your reject logic goes here
  };

  const handleApproveView = (row) => {
    console.log("View", row);
    // Your view logic goes here
  };

  // Assign Leave
  const handleChangeAssign = (event) => {
    const { name, value, type, files } = event.target;
    
    setFormData((prevData) => {
      if (type === "file") {
        return {
          ...prevData,
          [name]: files[0],
        };
      } else if (type === "radio") {
        return {
          ...prevData,
          [name]: value,
        };
      } else {
        return {
          ...prevData,
          [name]: value,
        };
      }
    });
  
    // Clear validation error when user makes a change
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };
  
  return (
    <div>
      {/* Top Tabs */}
      <div className='' style={{ padding: '20px' }} >
        <div className="d-flex mb- border-bottom bg-white rounded-lg shadow" style={{ width: '95%', marginLeft: '40px', padding: '8px' }}>
          <button
            className={`btn ${activeTab === "leave_entitlement" ? "btn-primary" : "btn-outline-primary"} me-2`}
            onClick={() => setActiveTab("leave_entitlement")}
          >
            Leave Entitlement
          </button>
          <button
            className={`btn ${activeTab === "approve" ? "btn-primary" : "btn-outline-primary"} me-2`}
            onClick={() => setActiveTab("approve")}
          >
            Approve/Reject
          </button>
          <button
            className={`btn ${activeTab === "assign" ? "btn-primary" : "btn-outline-primary"} me-2`}
            onClick={() => setActiveTab("assign")}
          >
            Assign
          </button>
          <button
            className={`btn ${activeTab === "apply" ? "btn-primary" : "btn-outline-primary"} me-2`}
            onClick={() => setActiveTab("apply")}
          >
            Apply Leave
          </button>
          <button
            className={`btn ${activeTab === "status" ? "btn-primary" : "btn-outline-primary"
              }`}
            onClick={() => setActiveTab("status")}
          >
            View Leave Status
          </button>
        </div>
      </div>
      {/* Content Based on Active Tab */}
      {activeTab === "apply" && (
        <div style={{ padding: '50px' }}>
          <div className='p-6 bg-white rounded-lg shadow' style={{ padding: '20px' }}>
            <h3 className="mb-4">Apply Leave</h3>
            <form onSubmit={handleSubmit} onReset={handleReset}>
              <div className="d-flex">
                {/* Leave Type */}
                <div style={{ flex: 1 }}>
                  <label htmlFor="leaveType" className="form-label">
                    Leave Type <span className="text-danger">*</span>
                  </label>
                  <select
                    id="leaveType"
                    className={`form-select ${errors.leaveType ? 'is-invalid' : ''}`}
                    value={formData.leaveType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">--Select--</option>
                    <option value="sick">Sick Leave</option>
                    <option value="casual">Casual Leave</option>
                  </select>
                  {errors.leaveType && <div className="invalid-feedback">{errors.leaveType}</div>}
                </div>

                {/* Leaves Remaining */}
                <div className="ms-4" style={{ flex: 1 }}>
                  <label htmlFor="leavesRemaining" className="form-label">
                    Leaves Remaining <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="leavesRemaining"
                    className={`form-control ${errors.fromDate ? 'is-invalid' : ''}`}
                    value={formData.leavesRemaining}
                  />
                  {errors.leavesRemaining && <div className="invalid-feedback">{errors.leavesRemaining}</div>}
                </div>
              </div>
              <div className="d-flex mt-4">
                {/* From Date */}
                <div style={{ flex: 1 }}>
                  <label htmlFor="fromDate" className="form-label">
                    From Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    id="fromDate"
                    className={`form-control ${errors.fromDate ? 'is-invalid' : ''}`}
                    value={formData.fromDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.fromDate && <div className="invalid-feedback">{errors.fromDate}</div>}
                </div>

                {/* To Date */}
                <div className="ms-4" style={{ flex: 1 }}>
                  <label htmlFor="toDate" className="form-label">
                    To Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    id="toDate"
                    className={`form-control ${errors.toDate ? 'is-invalid' : ''}`}
                    value={formData.toDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.toDate && <div className="invalid-feedback">{errors.toDate}</div>}
                </div>
              </div>

              {/* Partial Days */}
              <div className="row mt-4">
                <div className="col-12 mb-3">
                  <label className="form-label">
                    Partial Days <span className="text-danger">*</span>
                  </label>
                  <div className="d-flex gap-3">
                    {[
                      { value: 'none', label: 'None' },
                      { value: 'half', label: 'Half Day' },
                      { value: 'start', label: 'Start Day Only' },
                      { value: 'end', label: 'End Day Only' },
                      { value: 'both', label: 'Start and End Day' }
                    ].map(option => (
                      <div className="form-check" key={option.value}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="partialDays"
                          value={option.value}
                          checked={formData.partialDays === option.value}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor={`partial${option.value}`}>
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  {errors.partialDays && <div className="invalid-feedback">{errors.partialDays}</div>}

                </div>
              </div>
              {/* Total Duration */}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="totalDuration" className="form-label">
                    Total Duration
                  </label>
                  <input
                    type="text"
                    id="totalDuration"
                    className="form-control"
                    value={formData.totalDuration}
                    readOnly
                  />
                </div>
              </div>

              {/* Comments */}
              <div className="row">
                <div className="col-12 mb-3">
                  <label htmlFor="comments" className="form-label">
                    Comments <span className="text-danger">*</span>
                  </label>
                  <textarea
                    id="comments"
                    className={`form-control ${errors.comments ? 'is-invalid' : ''}`}
                    value={formData.comments}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.comments && <div className="invalid-feedback">{errors.comments}</div>}
                </div>
              </div>

              {/* Attachments */}
              <div className="row">
                <div className="col-12 mb-3">
                  <label htmlFor="attachments" className="form-label">
                    Attachments
                  </label>
                  <input
                    type="file"
                    id="attachments"
                    className={`form-control ${touched.attachments && errors.attachments ? 'is-invalid' : ''}`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    accept=".jpg,.jpeg,.png,.pdf"
                  />
                  {touched.attachments && errors.attachments && (
                    <div className="invalid-feedback d-block">{errors.attachments}</div>
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div className="d-flex justify-content-end">
                <button
                  type="submit"
                  className="btn btn-primary me-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Applying...' : 'Apply'}
                </button>
                <button type="reset" className="btn btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {activeTab === "status" && (
        <div style={{ width: "95%", margin: "20px auto" }}>
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="mb-4">View Leave Status</h3>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="text-start ms-2" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <span>Show</span>
                <select
                  className='form-control'
                  style={{
                    width: "150px",
                    height: "100%",
                    margin: "2px",
                    borderRadius: "8px",
                    border: 'none solid 2px'
                  }}
                  value={pageSize}
                  onChange={handlePageSizeChange}>
                  {[5, 10, 20, 30].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-center text-end mb-3 me-3" >
                <input className='form-control' style={{ width: '100%' }}
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  placeholder="Search..." />
              </div>
            </div>

            <DataTable
              columns={columns}
              data={data}
              pagination
              paginationPerPage={10}
              paginationRowsPerPageOptions={[5, 10, 15, 20]}
              customStyles={customStyles}
              responsive
              highlightOnHover
              pointerOnHover
              striped
            />
          </div>
          <Modal
            show={modalIsOpen}
            onHide={closeModal}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Leave Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedRow && (
                <div>
                  <p><strong>Employee Name:</strong> {selectedRow.employee_name}</p>
                  <p><strong>Date:</strong> {selectedRow.date}</p>
                  <p><strong>Leave Type:</strong> {selectedRow.leave_type}</p>
                  <p><strong>Requested Duration:</strong> {selectedRow.requested_duration}</p>
                  <p><strong>Status:</strong> {selectedRow.status}</p>
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>;
        </div>
      )}

      {activeTab === "leave_entitlement" && (
        <div className="" style={{ padding: '40px', }}>
          <div className="d-flex gap-3">

            {/* Form Section - Left */}
            <div className="col-md-6 p-3 bg-white shadow rounded" style={{ boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)' }}>
              <h4 className="mb-3">Leave Entitlements</h4>
              <form>
                <div className="row mt-2">
                  <div className="col-md-6 mt-3">
                    <div className="form-group">
                      <label className="form-label">Employee Name <span className='text-danger'>*</span></label>
                      <select
                        data-section="leave"
                        style={{ height: "50px" }}
                        className="form-control mt-2"
                        name="employee_name"
                      >
                        <option value="">--select--</option>
                        <option value="1">Pishuu</option>
                        <option value="2">Sammm</option>
                        <option value="3"> karrran</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6 mt-3">
                    <div className="form-group">
                      <label className="form-label">Leave Type <span className='text-danger'>*</span></label>
                      <select
                        data-section="leave"
                        style={{ height: "50px" }}
                        className="form-control mt-2"
                        name="leave_type_id"
                      >
                        <option value="">--select--</option>
                        <option value="1">Paid Leave</option>
                        <option value="2">Sick Leave</option>
                        <option value="3">Casual Leave</option>
                      </select>
                    </div>

                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-md-6 mt-3">
                    <div className="form-group">
                      <label className="form-label">Effective from <span className='text-danger'>*</span></label>
                      <input
                        data-section="leave"
                        style={{ height: "50px" }}
                        type="date"
                        name='effective_from'
                        className="form-control mt-2"
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mt-3">
                    <div className="form-group">
                      <label className="form-label">Effective to <span className='text-danger'>*</span></label>
                      <input
                        data-section="leave"
                        style={{ height: "50px" }}
                        type="date"
                        name='effective_to'
                        className="form-control mt-2"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-6 mt-3">
                    <div className="form-group">
                      <label className="form-label">Entitlements(Days) <span className='text-danger'>*</span></label>
                      <input
                        style={{ height: "50px" }}
                        type="text"
                        name='entitlements'
                        className="form-control mt-2"
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mt-3">
                    <div className="form-group">
                      <label className="form-label">Status <span className='text-danger'>*</span></label>
                      <select
                        style={{ height: "50px" }}
                        type="text"
                        name='status'
                        className="form-control mt-2"
                      >
                        <option value="">--select--</option>
                        <option value="1">Active</option>
                        <option value="2">Inactive</option>
                      </select>

                    </div>
                  </div>
                </div>
                <div className="mt-3 text-end">
                  <button className="btn btn-primary">set </button>
                  <button className="btn btn-danger ms-3">Cancel </button>

                </div>
              </form>
            </div>

            {/* Table Section */}
            <div className="col-md-6 p-3 bg-white shadow rounded" style={{ boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)' }}>
              <div className="row mt-2">
                <div className="col-md-6 mt-3">
                  <div className="form-group">
                    <label className="form-label">Employee Name <span className='text-danger'>*</span></label>
                    <select
                      data-section="leave"
                      style={{ height: "50px" }}
                      className="form-control mt-2"
                      name="employee_name"
                    >
                      <option value="">--select--</option>
                      <option value="1">Pishuu</option>
                      <option value="2">Sammm</option>
                      <option value="3"> karrran</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-6 mt-3">
                  <div className="form-group">
                    <label className="form-label">Leave Type <span className='text-danger'>*</span></label>
                    <select
                      data-section="leave"
                      style={{ height: "50px" }}
                      className="form-control mt-2"
                      name="leave_type_id"
                    >
                      <option value="">--select--</option>
                      <option value="1">Paid Leave</option>
                      <option value="2">Sick Leave</option>
                      <option value="3">Casual Leave</option>
                    </select>
                  </div>

                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-4">
                <div className="text-start ms-2" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  {/* <span>Show</span>
                  <select
                    className='form-control'
                    style={{
                      width: "150px",
                      height: "100%",
                      margin: "2px",
                      borderRadius: "8px",
                      border: 'none solid 2px'
                    }}
                    value={pageSize}
                    onChange={handlePageSizeChange}
                  >
                    {[5, 10, 20, 30].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select> */}
                </div>
                <div className="flex justify-center text-end mb-3 me-3" >

                  <input className='form-control' style={{ width: '100%' }}
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Search..." />
                </div>
              </div>

              <div className=" p-2 bg-white shadow rounded">
                <DataTable
                  columns={entitlementColumns}
                  data={EntitlementData}
                  pagination
                  striped
                  className="shadow-sm" // Extra shadow for effect
                />
              </div>
            </div>

          </div>
        </div>
      )}

      {activeTab === "approve" && (
        <div className="d-flex justify-content-center align-items-center -100" >
          <div className="col-lg-11 col-md-8 p-4 bg-white shadow rounded" style={{ boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)' }}>
            <div className="row">
              {/* Employee Name Field */}
              <div className="col-md-2 mt-3">
                <div className="form-group">
                  <label className="form-label">
                    Employee Name <span className="text-danger">*</span>
                  </label>
                  <select
                    data-section="leave"
                    style={{ height: "40px" }}
                    className="form-control mt-2"
                    name="employee_name"
                  >
                    <option value="">--select--</option>
                    <option value="1">Pishuu</option>
                    <option value="2">Sammm</option>
                    <option value="3">Karran</option>
                  </select>
                </div>
              </div>

              {/* Leave Type Field */}
              <div className="col-md-2 mt-3">
                <div className="form-group">
                  <label className="form-label">
                    Leave Type <span className="text-danger">*</span>
                  </label>
                  <select
                    data-section="leave"
                    style={{ height: "40px" }}
                    className="form-control mt-2"
                    name="leave_type_id"
                  >
                    <option value="">--select--</option>
                    <option value="1">Paid Leave</option>
                    <option value="2">Sick Leave</option>
                    <option value="3">Casual Leave</option>
                  </select>
                </div>
              </div>

              {/* From Date Field */}
              <div className="col-md-2 mt-3">
                <div className="form-group">
                  <label htmlFor="fromDate" className="form-label">
                    From <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    id="from"
                    className={`form-control ${errors.from ? "is-invalid" : ""} mt-2`}
                    // value={approveForm.from}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.from && <div className="invalid-feedback">{errors.from}</div>}
                </div>
              </div>

              {/* To Date Field */}
              <div className="col-md-2 mt-3">
                <div className="form-group">
                  <label htmlFor="toDate" className="form-label">
                    To <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    id="to"
                    className={`form-control ${errors.to ? "is-invalid" : ""} mt-2`}
                    value={formData.to}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.to && <div className="invalid-feedback">{errors.to}</div>}
                </div>
              </div>
            </div>

            {/* Search Box */}
            <div className="d-flex justify-content-between align-items-center mt-4">
              <div className="flex justify-center text-end mb-3 me-3">
                <input
                  className="form-control"
                  style={{ width: "100%" }}
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  placeholder="Search..."
                />
              </div>
            </div>

            {/* Data Table */}
            <div style={{ overflowX: 'hidden', overflowY: '', width: '100%', }}>
              <DataTable
                columns={approveColumns}
                data={approveData}
                pagination
                striped
                className="shadow-sm"
              />
            </div>
          </div>
        </div>
      )}

{activeTab === "assign" && (
  <div style={{ padding: "50px" }}>
    <div className="p-4 bg-white rounded-lg shadow" style={{ padding: "20px" }}>
      <h3 className="mb-4">Assign Leave</h3>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        
        {/* First Row: Employee Name, Leave Type */}
        <div className="d-flex gap-3">
          {/* Employee Name */}
          <div className="col-md-6">
            <label className="form-label">
              Employee Name <span className="text-danger">*</span>
            </label>
            <select
              data-section="leave"
              className="form-control mt-2"
              name="employee_name"
              style={{ height: "40px" }}
              onClick={handleChangeAssign}
            >
              <option value="">--select--</option>
              <option value="1">Pishuu</option>
              <option value="2">Sammm</option>
              <option value="3">Karran</option>
            </select>
          </div>

          {/* Leave Type */}
          <div className="col-md-6">
            <label className="form-label">
              Leave Type <span className="text-danger">*</span>
            </label>
            <select 
              id="leaveType"
              className={`form-select ${errors.leaveType ? "is-invalid" : ""} mt-2`}
              value={formData.leaveType}
              onClick={handleChangeAssign}
              onBlur={handleBlur}
            >
              <option value="">--Select--</option>
              <option value="sick">Sick Leave</option>
              <option value="casual">Casual Leave</option> 
            </select>
            {errors.leaveType && <div className="invalid-feedback">{errors.leaveType}</div>}
          </div>
        </div>

        {/* Second Row: Leaves Remaining, From Date */}
        <div className="d-flex gap-3 mt-3">
          {/* Leaves Remaining */}
          <div className="col-md-6">
            <label className="form-label">
              Leaves Remaining <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="leavesRemaining"
              className="form-control"
              value={formData.leavesRemaining}
              readOnly
            />
          </div>

          {/* From Date */}
          <div className="col-md-6">
            <label className="form-label">
              From Date <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              id="fromDate"
              className={`form-control ${errors.fromDate ? "is-invalid" : ""}`}
              value={formData.fromDate}
              onClick={handleChangeAssign}
              onBlur={handleBlur}
            />
            {errors.fromDate && <div className="invalid-feedback">{errors.fromDate}</div>}
          </div>
        </div>

        {/* Third Row: To Date (Alone) */}
        <div className="col-md-6 mt-3">
          <label className="form-label">
            To Date <span className="text-danger">*</span>
          </label>
          <input
            type="date"
            id="toDate"
            className={`form-control ${errors.toDate ? "is-invalid" : ""}`}
            value={formData.toDate}
            onClick={handleChangeAssign}
            onBlur={handleBlur}
          />
          {errors.toDate && <div className="invalid-feedback">{errors.toDate}</div>}
        </div>

        {/* Partial Days */}
        <div className="row mt-4">
          <div className="col-12 mb-3">
            <label className="form-label">
              Partial Days <span className="text-danger">*</span>
            </label>
            <div className="d-flex gap-3">
              {[
                { value: "none", label: "None" },
                { value: "half", label: "Half Day" },
                { value: "start", label: "Start Day Only" },
                { value: "end", label: "End Day Only" },
                { value: "both", label: "Start and End Day" },
              ].map((option) => (
                <div className="form-check" key={option.value}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="partialDays"
                    value={option.value}
                    checked={formData.partialDays === option.value}
                    onClick={handleChangeAssign}
                  />
                  <label className="form-check-label">{option.label}</label>
                </div>
              ))}
            </div>
            {errors.partialDays && <div className="invalid-feedback">{errors.partialDays}</div>}
          </div>
        </div>

        {/* Total Duration */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Total Duration</label>
            <input type="text" id="totalDuration" className="form-control" value={formData.totalDuration} 
             onClick={handleChangeAssign} />
          </div>
        </div>

        {/* Comments */}
        <div className="row">
          <div className="col-12 mb-3">
            <label className="form-label">
              Comments <span className="text-danger">*</span>
            </label>
            <textarea
              id="comments"
              className={`form-control ${errors.comments ? "is-invalid" : ""}`}
              value={formData.comments}
              onClick={handleChangeAssign}
              onBlur={handleBlur}
            />
            {errors.comments && <div className="invalid-feedback">{errors.comments}</div>}
          </div>
        </div>

        {/* Attachments */}
        <div className="row">
          <div className="col-12 mb-3">
            <label className="form-label">Attachments</label>
            <input
              type="file"
              id="attachments"
              className={`form-control ${touched.attachments && errors.attachments ? "is-invalid" : ""}`}
              onClick={handleChangeAssign}
              onBlur={handleBlur}
              accept=".jpg,.jpeg,.png,.pdf"
            />
            {touched.attachments && errors.attachments && <div className="invalid-feedback d-block">{errors.attachments}</div>}
          </div>
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary me-2" disabled={isSubmitting}>
            {isSubmitting ? "Applying..." : "Apply"}
          </button>
          <button type="reset" className="btn btn-secondary">Cancel</button>
        </div>

      </form>
    </div>
  </div>
)}
    </div>

  );
}

export default EmployeeLeave;
