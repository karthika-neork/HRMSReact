// import React, { useEffect, useState } from "react";
// import DataTable from 'react-data-table-component';
// import { FaEye, FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
// import { FaCheckCircle } from 'react-icons/fa';
// import { Modal, Button } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
// import axios from '../axiosConfig';
// import { toast } from "react-toastify";

// // Inside your component
// function EmployeeLeave() {
//   const [activeTab, setActiveTab] = useState("apply");
//   const [pageIndex, setPageIndex] = useState(0);
//   const [pageSize, setPageSize] = useState(10);
//   const [globalFilter, setGlobalFilter] = useState("");
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalCount, setTotalCount] = useState(0);

//   const handlePageSizeChange = (e) => {
//     const newSize = Number(e.target.value);
//     setPageSize(newSize);
//     setPageIndex(0);
//   };

//   const onPageChanged = (newPage) => {
//     setCurrentPage(newPage);
//     setPageIndex(newPage);
//   };

//   // apply form
//   const [formData, setFormData] = useState({
//     leaveType: '',
//     leavesRemaining: '',
//     fromDate: '',
//     toDate: "",
//     partial_days: "partial_none", // Default: Full Day (None)
//     startSession: "", // Start Day Session (AM/PM)
//     endSession: "",
//     totalDuration: '',
//     comments: '',
//     attachments: null
//   });



//   // Handle input changes
//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [allowedPartialDays, setAllowedPartialDays] = useState(["none", "Half day", "Start Day Only", "End Day Only", "Start and End Day"]);


//   const partialDaysOptions = [
//     { value: "partial_none", label: "None" },
//     { value: "partial_all", label: "Half Day" },
//     { value: "partial_start", label: "Start Day Only" },
//     { value: "partial_end", label: "End Day Only" },
//     { value: "partial_start_end", label: "Start and End Day" },
//   ];

//   const getPartialDaysOptions = () => {
//     if (!formData.fromDate || !formData.toDate) {
//       return ["partial_none", "partial_all", "partial_start", "partial_end", "partial_start_end"];
//     }

//     if (formData.fromDate === formData.toDate) {
//       return ["partial_none", "partial_all"]; // Only show None & Half Day
//     } else {
//       return ["partial_none", "partial_start", "partial_end", "partial_start_end"]; // Exclude Half Day
//     }
//   };

//   // Calculate duration based on selection
//   const calculateTotalDuration = (fromDate, toDate, partialDays) => {
//     if (!fromDate || !toDate) return "";
//     const from = new Date(fromDate);
//     const to = new Date(toDate);
//     let totalDays = (to - from) / (1000 * 60 * 60 * 24) + 1; // Inclusive

//     switch (partialDays) {
//       case "partial_all": return "0.5"; // Half Day (only for same-day leave)
//       case "partial_start":
//       case "partial_end": return (totalDays - 0.5).toFixed(1); // Deduct 0.5 for either start or end
//       case "partial_start_end": return (totalDays - 1).toFixed(1); // Deduct 1 full day
//       default: return totalDays.toString(); // Full day
//     }
//   };

//   // Update allowed Partial Days & Duration
//   const updatePartialDaysAndDuration = (updatedForm) => {
//     const { fromDate, toDate, partial_days } = updatedForm;
//     if (!fromDate || !toDate) return;

//     const from = new Date(fromDate);
//     const to = new Date(toDate);
//     const diffDays = (to - from) / (1000 * 60 * 60 * 24) + 1;

//     let updatedAllowedPartialDays = ["partial_none"];

//     if (diffDays === 1) {
//       updatedAllowedPartialDays = ["partial_none", "partial_all"];
//     } else {
//       updatedAllowedPartialDays = ["partial_none", "partial_start", "partial_end", "partial_start_end"];
//     }

//     let newDuration = calculateTotalDuration(fromDate, toDate, partial_days);

//     setFormData((prev) => ({
//       ...prev,
//       totalDuration: newDuration,
//       partial_days: updatedAllowedPartialDays.includes(partial_days) ? partial_days : "partial_none",
//     }));

//     setAllowedPartialDays(updatedAllowedPartialDays);
//   };

//   // Handle input changes
//   const handleChange = (e) => {
//     const { id, name, value, type, files } = e.target;
//     const fieldId = id || name;

//     setFormData((prev) => {
//       const updatedForm = { ...prev, [fieldId]: type === "file" ? files[0] : value };

//       if (fieldId === "fromDate" || fieldId === "toDate" || fieldId === "partial_days") {
//         updatePartialDaysAndDuration(updatedForm);
//       }

//       return updatedForm;
//     });
//   };
//   // Update Partial Days Options and Calculate Total Duration
//   // const updatePartialDaysAndDuration = (updatedForm) => {
//   //   const { fromDate, toDate, partialDays } = updatedForm;

//   //   if (!fromDate || !toDate) return;

//   //   const from = new Date(fromDate);
//   //   const to = new Date(toDate);
//   //   const diffDays = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1; // Inclusive of both dates

//   //   let allowedPartialDays = ["none"];
//   //   if (diffDays === 1) {
//   //     // Same Day Leave → Only show None & Half Day
//   //     allowedPartialDays = ["none", "Half Day"];
//   //   } else if (diffDays > 1) {
//   //     // Multi-day Leave → Show Start Day, End Day, Both
//   //     allowedPartialDays = ["none", "Start Day Only", "End Day Only", "Start and End Day"];
//   //   }

//   //   let duration = diffDays;
//   //   if (partialDays === "Half Day" && diffDays === 1) {
//   //     duration = 0.5;
//   //   } else if (partialDays === "Start Day Only" || partialDays === "End Day Only") {
//   //     duration = diffDays - 0.5;
//   //   } else if (partialDays === "Start and End Day") {
//   //     duration = diffDays - 1;
//   //   }

//   //   setFormData((prev) => ({
//   //     ...prev,
//   //     totalDuration: duration,
//   //     partialDays: allowedPartialDays.includes(partialDays) ? partialDays : "none", // Reset partialDays if it's invalid
//   //   }));

//   //   setAllowedPartialDays(allowedPartialDays);
//   // };

//   // Handle input changes
//   // const handleChange = (e) => {
//   //   const { id, value, type, files, name } = e.target;
//   //   const fieldId = id || name;

//   //   setFormData((prev) => ({
//   //     ...prev,
//   //     [fieldId]: type === "file" ? files[0] : value,
//   //   }));

//   //   setTouched((prev) => ({
//   //     ...prev,
//   //     [fieldId]: true,
//   //   }));

//   //   if (errors[fieldId]) {
//   //     setErrors((prev) => ({
//   //       ...prev,
//   //       [fieldId]: "",
//   //     }));
//   //   }
//   // };
//   // Handle field blur for validation


//   const handleBlur = (e) => {
//     const { id, name } = e.target;
//     const fieldId = id || name;
//     setTouched((prev) => ({
//       ...prev,
//       [fieldId]: true,
//     }));

//     const fieldError = validateField(fieldId, formData[fieldId]);
//     if (fieldError) {
//       setErrors((prev) => ({
//         ...prev,
//         [fieldId]: fieldError,
//       }));
//     }
//   };

//   // Validate single field
//   const validateField = (fieldName, value) => {
//     switch (fieldName) {
//       case 'leaveType':
//         return !value ? 'Leave type is required' : '';

//       case 'leavesRemaining':
//         return !value ? 'Leave remaining is required' : '';

//       case 'fromDate':
//         return !value ? 'From date is required' : '';
//       case 'toDate':
//         if (!value) return 'To date is required';
//         if (formData.fromDate && new Date(value) < new Date(formData.fromDate)) {
//           return 'End date cannot be before start date';
//         }
//         return '';
//       case 'partialDays':
//         return !value ? 'Please select a partial days option' : '';
//       case 'comments':
//         return !value ? 'Comments are required' : '';
//       // case 'attachments':
//       //   if (!value) return '';
//       //   const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
//       //   const maxSize = 5 * 1024 * 1024; // 5MB
//       //   if (!allowedTypes.includes(value.type)) {
//       //     return 'File type not supported. Please upload JPG, PNG, or PDF';
//       //   }
//       //   if (value.size > maxSize) {
//       //     return 'File size should not exceed 5MB';
//       //   }
//       //   return '';
//       default:
//         return '';
//     }
//   };

//   // Validate the form
//   const validateForm = () => {
//     const newErrors = {};
//     Object.keys(formData).forEach((key) => {
//       const error = validateField(key, formData[key]);
//       if (error) newErrors[key] = error;
//     });
//     return newErrors;
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       setIsSubmitting(false);
//       return;
//     }

//     const token = sessionStorage.getItem("token");
//     const userId = sessionStorage.getItem("user_id");
//     console.log("Token:", token);
//     console.log("User ID:", userId);

//     if (!token || !userId) {
//       alert("Authentication error: Please log in again.");
//       setIsSubmitting(false);
//       return;
//     }

//     // Convert date format to `DD-MM-YYYY`
//     const formatDate = (dateString) => {
//       if (!dateString) return null;
//       const date = new Date(dateString);
//       return date.toLocaleDateString('en-GB').split('/').join('-'); // Converts to `DD-MM-YYYY`
//     };

//     // Convert leaveType to an integer
//     const leaveTypeId = Number(formData.leaveType);
//     if (!leaveTypeId) {
//       alert("Please select a valid leave type.");
//       setIsSubmitting(false);
//       return;
//     }

//     // Ensure partialDays matches API expected values
//     const partialDaysMap = {
//       none: "partial_none",
//       start: "partial_start",
//       end: "partial_end",
//       both: "partial_start_end",
//       all: "partial_all", // Ensure "all" is handled if needed
//     };

//     const partialDaysValue = partialDaysMap[formData.partialDays] || null;
//     console.log("Partial Days Sent:", partialDaysValue);

//     // Ensure at least 0.5 leave days
//     const totalLeaves = parseFloat(formData.totalDuration) || 0;
//     if (totalLeaves < 0.5) {
//       alert("Total leave duration must be at least 0.5 days.");
//       setIsSubmitting(false);
//       return;
//     }

//     // Prepare API request data
//     const requestData = {
//       user_id: parseInt(userId, 10),
//       leave_type_id: leaveTypeId,
//       from_date: formatDate(formData.fromDate),
//       to_date: formatDate(formData.toDate),
//       no_of_leaves: totalLeaves,
//       reason_for_leave: formData.comments,
//       partial_days: partialDaysValue,
//     };

//     // Add `partial_start_day` and `partial_end_day` conditionally
//     if (partialDaysValue === "partial_start" || partialDaysValue === "partial_start_end") {
//       requestData.partial_start_day = "FN"; // or "AN" based on user input
//     }

//     if (partialDaysValue === "partial_end" || partialDaysValue === "partial_start_end") {
//       requestData.partial_end_day = "AN"; // or "FN" based on user input
//     }

//     try {
//       const response = await axios.post(
//         "/apply-leave",
//         requestData,
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//             'userId': userId
//           },
//         }
//       );
//       console.log("Request Data:", requestData);
//       console.log("Partial Days Sent:", partialDaysValue);
//       console.log("Leave application submitted", response.data);

//       toast.success("Leave application submitted successfully!");
//       handleReset();
//     } catch (error) {
//       alert(error.response?.data?.message || "Failed to apply for leave. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
//   // Reset form
//   const handleReset = () => {
//     setFormData({
//       leaveType: '',
//       leavesRemaining: '',
//       fromDate: '',
//       toDate: '',
//       partialDays: 'none',
//       totalDuration: '',
//       comments: '',
//       attachments: null,
//     });
//     setErrors({});
//     setTouched({});
//   };

//   //view leave status form
//   const [leaveList, setLeaveList] = useState([]);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [selectedRow, setSelectedRow] = useState(null);

//   useEffect(() => {
//     fetchEmployeesLeaveList();
//   }, []);

//   const fetchEmployeesLeaveList = async () => {
//     const token = sessionStorage.getItem("token");
//     const userId = sessionStorage.getItem("user_id");
//     try {
//       const response = await axios.get("get-leave-list", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//           userId: userId,
//         },
//       });
//       if (response.data.status === "success") {
//         setLeaveList(response.data.LeaveRecord);
//       } else {
//         console.error("Unexpected response format:", response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching EmployeesList:", error);
//     }
//   };

//   const handleView = (row) => {
//     setSelectedRow(row);
//     setModalIsOpen(true);
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//     setSelectedRow(null);
//   };

//   const handleDelete = (row) => {
//     console.log("Deleting:", row);
//   };
//   //View leave status
//   // Update your customStyles object to remove overflow constraints
//   const customStyles = {
//     table: {
//       style: {
//         width: '100%',
//         tableLayout: 'fixed', // This helps with column width distribution
//       },
//     },
//     headRow: {
//       style: {
//         backgroundColor: '#f8f9fa',
//         minHeight: '56px',
//         whiteSpace: 'normal', // Allow text wrapping in headers
//         wordBreak: 'break-word' // Break words if needed
//       },
//     },
//     rows: {
//       style: {
//         minHeight: '50px',
//       },
//     },
//     cells: {
//       style: {
//         paddingLeft: '8px',
//         paddingRight: '8px',
//         whiteSpace: 'normal', // Allow text wrapping in cells
//         wordBreak: 'break-word' // Break words if needed
//       },
//     },
//   };

//   // Update your columns with better width distribution
//   const columns = [
//     { name: "#", selector: (row) => row.id, sortable: true, width: "60px" },
//     { name: "Employee ID", selector: (row) => row.user_id, sortable: true, width: "130px" },
//     { name: "Leave Type", selector: (row) => row.leave_type_name, sortable: true, width: "120px" },
//     { name: "Start Date", selector: (row) => row.leave_start_date, sortable: true, width: "110px" },
//     { name: "End Date", selector: (row) => row.leave_end_date, sortable: true, width: "110px" },
//     { name: "Duration", selector: (row) => row.no_of_leaves, sortable: true, width: "100px" },
//     {
//       name: "Status", selector: (row) => row.request_status, sortable: true, width: "100px",
//       cell: (row) => (<span className={`badge ${row.request_status === "Approved" ? "bg-success" : "bg-warning"}`}>{row.request_status}</span>)
//     },
//     {
//       name: "Actions",
//       cell: (row) => (
//         <div className="d-flex gap-2">
//           <button className="cursor-pointer btn btn-primary me-"
//             style={{ background: "none", border: "none", outline: "none", cursor: "pointer", fontSize: "1rem", color: "#0047bb" }}>
//             <FontAwesomeIcon icon={faEdit} />
//           </button>
//           <button className="btn btn-primary btn-sm" onClick={() => handleView(row)}
//             style={{ background: "none", border: "none", outline: "none", cursor: "pointer", fontSize: "1rem", color: "#0047bb" }}>
//             <FontAwesomeIcon icon={faEye} />
//           </button>
//           <button className="btn btn-danger btn-sm" onClick={() => handleDelete(row)}
//             style={{ background: "none", border: "none", outline: "none", cursor: "pointer", fontSize: "1rem", color: "red" }}>
//             <FontAwesomeIcon icon={faTrash} />
//           </button>
//         </div>
//       ),
//       width: "110px",
//     },
//   ];
//   //entitlementForm 
//   const [entitlementForm, setEntitlementForm] = useState({
//     leave_type: '',
//     employee_name: '',
//     from_date: '',
//     to_date: '',
//     entitlements: 'none',
//     status: '',
//   });
//   const EntitlementData = [
//     {
//       id: 1,
//       employee: "John Doe",
//       leaveType: "Annual Leave",
//       creditOn: "2024-01-01",
//       validFrom: "2024-01-01",
//       validTo: "2024-12-31",
//       entitlement: 5,
//       status: "Approved",
//     },
//     {
//       id: 2,
//       employee: "Jane Smith",
//       leaveType: "Sick Leave",
//       creditOn: "2024-02-15",
//       validFrom: "2024-02-15",
//       validTo: "2024-12-31",
//       entitlement: 3,
//       status: "Pending",
//     },
//   ];

//   // Table Columns for Entitlements
//   const entitlementColumns = [
//     {
//       name: "S.No",
//       selector: (row, index) => index + 1, // Generate serial numbers
//       sortable: false,
//       width: "80px", // Adjust width
//     },
//     {
//       name: "Employee",
//       selector: (row) => row.employee,
//       sortable: true,
//     },
//     {
//       name: "Leave Type",
//       selector: (row) => row.leaveType,
//       sortable: true,
//     },
//     {
//       name: "Credit On",
//       selector: (row) => row.creditOn,
//     },
//     {
//       name: "Valid From",
//       selector: (row) => row.validFrom,
//     },
//     {
//       name: "Valid To",
//       selector: (row) => row.validTo,
//     },
//     {
//       name: "Leave Entitlement",
//       selector: (row) => row.entitlement,
//       sortable: true,
//     },
//     {
//       name: "Status",
//       selector: (row) => row.status,
//       cell: (row) => (
//         <span
//           className={`badge ${row.status === "Approved" ? "bg-success" : "bg-warning"
//             }`}
//         >
//           {row.status}
//         </span>
//       ),
//     },
//     {
//       name: "Action",
//       cell: (row) => (
//         <div className="d-flex gap-2">
//           <button className="btn btn-sm btn-primary">
//             <FaEdit />
//           </button>
//           <button className="btn btn-sm btn-danger">
//             <FaTrash />
//           </button>
//         </div>
//       ),
//       ignoreRowClick: true,
//       allowOverflow: true,
//       button: true,
//     },
//   ];

//   // Apply/Reject froms
//   const [approveData, setApproveData] = useState([
//     {
//       employee: 'Pishuu',
//       date: '2025-02-01',
//       leave: 'Paid Leave',
//       requested_duration: '5 days',
//       status: 'Pending',
//     },
//     {
//       employee: 'Sammm',
//       date: '2025-02-05',
//       leave: 'Sick Leave',
//       requested_duration: '3 days',
//       status: 'Pending',
//     }
//   ]);

//   // Columns for DataTable, including action buttons
//   const approveColumns = [
//     { name: "#", selector: (row, index) => index + 1, width: "80px" },
//     { name: "Employee", selector: (row) => row.employee, width: "200px" },
//     { name: "Date", selector: (row) => row.date, width: "150px" },
//     { name: "Leave Type", selector: (row) => row.leave, width: "180px" },
//     { name: "Requested Duration", selector: (row) => row.requested_duration, width: "250px" },
//     { name: "Status", selector: (row) => row.status, width: "230px" },
//     {
//       name: "Action",
//       cell: (row) => (
//         <div className="d-flex gap-1">
//           <button className="btn btn-sm btn-primary" onClick={() => handleApprove(row)}>
//             <FaCheck />
//           </button>
//           <button className="btn btn-sm btn-danger" onClick={() => handleReject(row)}>
//             <FaTimes />
//           </button>
//           <button className="btn btn-sm btn-primary" onClick={() => handleApproveView(row)}>
//             <FaEye />
//           </button>
//         </div>
//       ),
//       width: "",
//     },
//   ];

//   // Handlers for action buttons
//   const handleApprove = (row) => {
//     console.log("Approve", row);
//     // Your approve logic goes here
//   };

//   const handleReject = (row) => {
//     console.log("Reject", row);
//     // Your reject logic goes here
//   };

//   const handleApproveView = (row) => {
//     console.log("View", row);
//     // Your view logic goes here
//   };

//   // Assign Leave
//   const handleChangeAssign = (event) => {
//     const { name, value, type, files } = event.target;

//     setFormData((prevData) => {
//       if (type === "file") {
//         return {
//           ...prevData,
//           [name]: files[0],
//         };
//       } else if (type === "radio") {
//         return {
//           ...prevData,
//           [name]: value,
//         };
//       } else {
//         return {
//           ...prevData,
//           [name]: value,
//         };
//       }
//     });

//     // Clear validation error when user makes a change
//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       [name]: "",
//     }));
//   };

//   return (
//     <div className="" style={{ overflowX: 'hidden', overflowY: 'hidden', width: '100%', padding: '30px' }}>
//       {/* Top Tabs */}
//       {/* <div className="row justify-content-center mt-4">
//   <div className="col-auto bg-white rounded-lg shadow p-3">
//     <div className="d-flex flex-nowrap overflow-auto px-2"></div> */}

//       <div className="row justify-content-left  mt-4">
//         <div className="col-12 col-md-10 col-lg-8 bg-white rounded-lg shadow p- w-100">
//           {/* Scrollable container with Bootstrap classes only */}
//           <div className="d-flex flex-nowrap overflow-auto pb-2" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
//             <button
//               className={`btn ${activeTab === "leave_entitlement" ? "btn-primary" : "btn-outline-primary"} me-2 flex-shrink-0 text-nowrap`}
//               onClick={() => setActiveTab("leave_entitlement")}
//             >
//               Leave Entitlement
//             </button>
//             <button
//               className={`btn ${activeTab === "approve" ? "btn-primary" : "btn-outline-primary"} me-2 flex-shrink-0 text-nowrap`}
//               onClick={() => setActiveTab("approve")}
//             >
//               Approve/Reject
//             </button>
//             <button
//               className={`btn ${activeTab === "assign" ? "btn-primary" : "btn-outline-primary"} me-2 flex-shrink-0 text-nowrap`}
//               onClick={() => setActiveTab("assign")}
//             >
//               Assign
//             </button>
//             <button
//               className={`btn ${activeTab === "apply" ? "btn-primary" : "btn-outline-primary"} me-2 flex-shrink-0 text-nowrap`}
//               onClick={() => setActiveTab("apply")}
//             >
//               Apply Leave
//             </button>
//             <button
//               className={`btn ${activeTab === "status" ? "btn-primary" : "btn-outline-primary"} me-2 flex-shrink-0 text-nowrap`}
//               onClick={() => setActiveTab("status")}
//             >
//               View Leave Status
//             </button>
//           </div>
//         </div>
//       </div>
//       {/* Content Based on Active Tab */}
//       {activeTab === "apply" && (
//         <div className="mt-5">
//           <div className="row justify-content-center">
//             <div className="col-12 col-md-10 col-lg-8 p-4 bg-white rounded-lg shadow">
//               <h3 className="mb-4">Apply Leave</h3>
//               <form onSubmit={handleSubmit} onReset={handleReset}>
//                 <div className="row g-3">
//                   {/* Leave Type */}
//                   <div className="col-md-6">
//                     <label htmlFor="leaveType" className="form-label">
//                       Leave Type <span className="text-danger">*</span>
//                     </label>
//                     {/* <select
//                       id="leaveType"
//                       className={`form-select ${errors.leaveType ? 'is-invalid' : ''}`}
//                       value={formData.leaveType}
//                       onChange={handleChange}
//                     >
//                       <option value="">--Select--</option>
//                       <option value="sick">Sick Leave</option>
//                       <option value="casual">Casual Leave</option>
//                     </select>
//                     {errors.leaveType && <div className="invalid-feedback">{errors.leaveType}</div>} */}
//                     <select className={`form-select ${errors.leaveType ? 'is-invalid' : ''}`}
//                       name="leaveType"
//                       value={formData.leaveType}
//                       onChange={(e) => setFormData({ ...formData, leaveType: e.target.value })}
//                     >
//                       <option value="">Select Leave Type</option>
//                       <option value="1">Sick Leave</option>
//                       <option value="2">Casual Leave</option>
//                       <option value="3">Annual Leave</option>
//                     </select>

//                   </div>

//                   {/* Leaves Remaining */}
//                   <div className="col-md-6">
//                     <label htmlFor="leavesRemaining" className="form-label">
//                       Leaves Remaining <span className="text-danger">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       id="leavesRemaining"
//                       className="form-control"
//                       value={formData.leavesRemaining}
//                       onChange={handleChange} />
//                   </div>

//                   {/* From Date */}
//                   <div className="col-md-6">
//                     <label htmlFor="fromDate" className="form-label">
//                       From Date <span className="text-danger">*</span>
//                     </label>
//                     <input
//                       type="date"
//                       id="fromDate"
//                       className={`form-control ${errors.fromDate ? 'is-invalid' : ''}`}
//                       value={formData.fromDate}
//                       onChange={handleChange}
//                     />
//                     {errors.fromDate && <div className="invalid-feedback">{errors.fromDate}</div>}
//                   </div>

//                   {/* To Date */}
//                   <div className="col-md-6">
//                     <label htmlFor="toDate" className="form-label">
//                       To Date <span className="text-danger">*</span>
//                     </label>
//                     <input
//                       type="date"
//                       id="toDate"
//                       className={`form-control ${errors.toDate ? 'is-invalid' : ''}`}
//                       value={formData.toDate}
//                       onChange={handleChange}
//                     />
//                     {errors.toDate && <div className="invalid-feedback">{errors.toDate}</div>}
//                   </div>

//                   {/* Partial Days */}
//                   {/* Partial Days */}
//                   <div className="col-12">
//                     <label className="form-label">Partial Days</label>
//                     <div className="d-flex flex-wrap gap-3"> {/* Use flexbox to align side by side */}
//                       {partialDaysOptions.map((option) => (
//                         <div className="form-check" key={option.value}>
//                           <input
//                             className="form-check-input"
//                             type="radio"
//                             name="partial_days"
//                             value={option.value}
//                             checked={formData.partial_days === option.value}
//                             onChange={handleChange}
//                             disabled={!getPartialDaysOptions().includes(option.value)}
//                           />
//                           <label className="form-check-label">{option.label}</label>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Show Start Day Session ONLY if "Start Day Only" or "Start & End Day" is selected */}
//                   {(formData.partial_days === "partial_start" || formData.partial_days === "partial_start_end") && (
//                     <div className="col-md-6">
//                       <label htmlFor="startSession" className="form-label">Start Day Session (AN/FN)</label>
//                       <select id="startSession" className="form-select" value={formData.startSession} onChange={handleChange}>
//                         <option value="">Select</option>
//                         <option value="AM">Morning (AN)</option>
//                         <option value="PM">Afternoon (FN)</option>
//                       </select>
//                     </div>
//                   )}

//                   {/* Show End Day Session ONLY if "End Day Only" or "Start & End Day" is selected */}
//                   {(formData.partial_days === "partial_end" || formData.partial_days === "partial_start_end") && (
//                     <div className="col-md-6">
//                       <label htmlFor="endSession" className="form-label">End Day Session (AN/FN)</label>
//                       <select id="endSession" className="form-select" value={formData.endSession} onChange={handleChange}>
//                         <option value="">Select</option>
//                         <option value="AM">Morning (AN)</option>
//                         <option value="PM">Afternoon (FN)</option>
//                       </select>
//                     </div>
//                   )}

//                   {/* Total Duration */}
//                   <div className="col-md-6">
//                     <label htmlFor="totalDuration" className="form-label">Total Duration</label>
//                     <input type="text" id="totalDuration" className="form-control" value={formData.totalDuration} readOnly />
//                   </div>

//                   {/* Comments */}
//                   <div className="col-12">
//                     <label htmlFor="comments" className="form-label">
//                       Comments
//                     </label>
//                     <textarea
//                       id="comments"
//                       className={`form-control ${errors.comments ? 'is-invalid' : ''}`}
//                       value={formData.comments}
//                       onChange={handleChange}
//                       rows={3}
//                     />
//                   </div>

//                   {/* Attachments */}
//                   <div className="col-12">
//                     <label htmlFor="attachments" className="form-label">Attachments</label>
//                     <input type="file" id="attachments" className="form-control" onChange={handleChange} accept=".jpg,.jpeg,.png,.pdf" />
//                   </div>

//                   {/* Buttons */}
//                   <div className="col-12 d-flex justify-content-end">
//                     <button type="reset" className="btn btn-secondary me-2">Cancel</button>
//                     <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
//                       {isSubmitting ? 'Applying...' : 'Apply'}
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//       {activeTab === "status" && (
//         <div className="container-fluid py-4" >
//           <div className="row justify-content-center">
//             <div className="col-12 col-md-10 col-lg-8 p-4 bg-white rounded-lg shadow">
//               <h3 className="mb-4">View Leave Status</h3>

//               {/* Filters & Search */}
//               <div className="row mb-3 d-flex justify-content-end">
//                 <div className="col-auto">
//                   <input
//                     className="form-control"
//                     value={globalFilter}
//                     onChange={(e) => setGlobalFilter(e.target.value)}
//                     placeholder="Search..."
//                   />
//                 </div>
//               </div>


//               {/* Data Table */}
//               <DataTable
//                 columns={columns}
//                 data={leaveList}
//                 pagination
//                 paginationPerPage={10}
//                 paginationRowsPerPageOptions={[5, 10, 15, 20]}
//                 customStyles={customStyles}
//                 responsive
//                 highlightOnHover
//                 pointerOnHover
//                 striped
//               />

//               {/* Modal for Leave Details */}
//               <Modal show={modalIsOpen} onHide={closeModal} centered>
//                 <Modal.Header closeButton>
//                   <Modal.Title>Leave Details</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                   {selectedRow && (
//                     <div>
//                       <p><strong>Employee Name:</strong> {selectedRow.employee_name}</p>
//                       <p><strong>Date:</strong> {selectedRow.date}</p>
//                       <p><strong>Leave Type:</strong> {selectedRow.leave_type}</p>
//                       <p><strong>Requested Duration:</strong> {selectedRow.requested_duration}</p>
//                       <p><strong>Status:</strong> {selectedRow.status}</p>
//                     </div>
//                   )}
//                 </Modal.Body>
//                 <Modal.Footer>
//                   <Button variant="secondary" onClick={closeModal}>Close</Button>
//                 </Modal.Footer>
//               </Modal>
//             </div>
//           </div>
//         </div>

//       )}

//       {activeTab === "leave_entitlement" && (
//         <div className="container-fluid py-4">
//           <div className="row ">
//             {/* Form Section - Left */}
//             <div className="col-12 col-md-6 p-3 bg-white shadow rounded">
//               <h4 className="mb-3">Leave Entitlements</h4>
//               <form>
//                 <div className="row g-3">
//                   <div className="col-md-6">
//                     <label className="form-label">Employee Name <span className="text-danger">*</span></label>
//                     <select className="form-select" name="employee_name">
//                       <option value="">--select--</option>
//                       <option value="1">Pishuu</option>
//                       <option value="2">Sammm</option>
//                       <option value="3">Karrran</option>
//                     </select>
//                   </div>

//                   <div className="col-md-6">
//                     <label className="form-label">Leave Type <span className="text-danger">*</span></label>
//                     <select className="form-select" name="leave_type_id">
//                       <option value="">--select--</option>
//                       <option value="1">Paid Leave</option>
//                       <option value="2">Sick Leave</option>
//                       <option value="3">Casual Leave</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div className="row g-3 mt-1">
//                   <div className="col-md-6">
//                     <label className="form-label">Effective from <span className="text-danger">*</span></label>
//                     <input type="date" name="effective_from" className="form-control" />
//                   </div>

//                   <div className="col-md-6">
//                     <label className="form-label">Effective to <span className="text-danger">*</span></label>
//                     <input type="date" name="effective_to" className="form-control" />
//                   </div>
//                 </div>

//                 <div className="row g-3 mt-1">
//                   <div className="col-md-6">
//                     <label className="form-label">Entitlements (Days) <span className="text-danger">*</span></label>
//                     <input type="text" name="entitlements" className="form-control" />
//                   </div>

//                   <div className="col-md-6">
//                     <label className="form-label">Status <span className="text-danger">*</span></label>
//                     <select className="form-select" name="status">
//                       <option value="">--select--</option>
//                       <option value="1">Active</option>
//                       <option value="2">Inactive</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div className="mt-3 text-end">
//                   <button className="btn btn-primary">Set</button>
//                   <button className="btn btn-danger ms-3">Cancel</button>
//                 </div>
//               </form>
//             </div>

//             {/* Table Section - Right */}
//             <div className="col-12 col-md-6 p-3 bg-white shadow rounded">
//               <h4 className="mb-3">Entitlement Records</h4>

//               {/* Search Bar */}
//               <div className="row g-3 align-items-center">
//                 <div className="col-md-6">
//                   <label className="form-label">Employee Name</label>
//                   <select className="form-select" name="employee_name">
//                     <option value="">--select--</option>
//                     <option value="1">Pishuu</option>
//                     <option value="2">Sammm</option>
//                     <option value="3">Karrran</option>
//                   </select>
//                 </div>

//                 <div className="col-md-6">
//                   <label className="form-label">Leave Type</label>
//                   <select className="form-select" name="leave_type_id">
//                     <option value="">--select--</option>
//                     <option value="1">Paid Leave</option>
//                     <option value="2">Sick Leave</option>
//                     <option value="3">Casual Leave</option>
//                   </select>
//                 </div>

//                 <div className="col-12">
//                   <input
//                     className="form-control"
//                     value={globalFilter}
//                     onChange={(e) => setGlobalFilter(e.target.value)}
//                     placeholder="Search..."
//                   />
//                 </div>
//               </div>

//               {/* Data Table */}
//               <div className="mt-3">
//                 <DataTable
//                   columns={entitlementColumns}
//                   data={EntitlementData}
//                   pagination
//                   striped
//                   className="shadow-sm"
//                 />
//               </div>
//             </div>

//           </div>
//         </div>

//       )}

//       {activeTab === "approve" && (
//         <div className="container-fluid align-items-center py-4">
//           <div className="row p-4 bg-white shadow rounded">
//             {/* Employee Name */}
//             <div className=" col-md-2">
//               <label className="form-label">Employee Name <span className="text-danger">*</span></label>
//               <select className="form-select" name="employee_name">
//                 <option value="">Employee Name </option>
//                 <option value="1">Pishuu</option>
//                 <option value="2">Sammm</option>
//                 <option value="3">Karran</option>
//               </select>
//             </div>

//             {/* Leave Type */}
//             <div className=" col-md-2">
//               <label className="form-label">Leave Type <span className="text-danger">*</span></label>
//               <select className="form-select" name="leave_type_id">
//                 <option value="">Leave Type</option>
//                 <option value="1">Paid Leave</option>
//                 <option value="2">Sick Leave</option>
//                 <option value="3">Casual Leave</option>
//               </select>
//             </div>

//             {/* From Date */}
//             <div className="col-md-2 ">
//               <label className="form-label">From <span className="text-danger">*</span></label>
//               <input
//                 type="date"
//                 id="from"
//                 className={`form-control ${errors?.from ? "is-invalid" : ""}`}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//               />
//               {errors?.from && <div className="invalid-feedback">{errors.from}</div>}
//             </div>

//             {/* To Date */}
//             <div className="col-md-2">
//               <label className="form-label">To <span className="text-danger">*</span></label>
//               <input
//                 type="date"
//                 id="to"
//                 className={`form-control ${errors?.to ? "is-invalid" : ""}`}
//                 value={formData?.to}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//               />
//               {errors?.to && <div className="invalid-feedback">{errors.to}</div>}
//             </div>

//             {/* Search Bar */}
//             <div className="col-md-4">
//               <input
//                 className="form-control mt-4"
//                 value={globalFilter}
//                 onChange={(e) => setGlobalFilter(e.target.value)}
//                 placeholder="Search..."
//               />
//             </div>
//           </div>
//           <div className="col-lg-12 col-md-12 p-4 bg-white shadow rounded mt-3">

//             {/* Form Section */}
//             {/* Data Table */}
//             <div className="mt-4">
//               <DataTable
//                 columns={approveColumns}
//                 data={approveData}
//                 pagination
//                 striped
//                 className="shadow-sm"
//               />
//             </div>

//           </div>
//         </div>

//       )}

//       {activeTab === "assign" && (
//         <div className="container-fluid py-4">
//           <div className="col-lg-10 col-md-10 mx-auto p-4 bg-white rounded-lg shadow">

//             <h3 className="mb-4">Assign Leave</h3>

//             <form onReset={handleReset}>

//               {/* First Row: Employee Name, Leave Type */}
//               <div className="row g-3">

//                 {/* Employee Name */}
//                 <div className="col-12 col-md-6">
//                   <label className="form-label">Employee Name <span className="text-danger">*</span></label>
//                   <select className="form-select" name="employee_name" onChange={handleChangeAssign}>
//                     <option value="">--select--</option>
//                     <option value="1">Pishuu</option>
//                     <option value="2">Sammm</option>
//                     <option value="3">Karran</option>
//                   </select>
//                 </div>

//                 {/* Leave Type */}
//                 <div className="col-12 col-md-6">
//                   <label className="form-label">Leave Type <span className="text-danger">*</span></label>
//                   <select id="leaveType" className={`form-select ${errors.leaveType ? "is-invalid" : ""}`} value={formData.leaveType} onChange={handleChangeAssign} onBlur={handleBlur}>
//                     <option value="">--Select--</option>
//                     <option value="sick">Sick Leave</option>
//                     <option value="casual">Casual Leave</option>
//                   </select>
//                   {errors.leaveType && <div className="invalid-feedback">{errors.leaveType}</div>}
//                 </div>
//               </div>

//               {/* Second Row: Leaves Remaining, From Date */}
//               <div className="row g-3 mt-2">

//                 {/* Leaves Remaining */}
//                 <div className="col-12 col-md-6">
//                   <label className="form-label">Leaves Remaining <span className="text-danger">*</span></label>
//                   <input type="text" className="form-control" value={formData.leavesRemaining} readOnly />
//                 </div>

//                 {/* From Date */}
//                 <div className="col-12 col-md-6">
//                   <label className="form-label">From Date <span className="text-danger">*</span></label>
//                   <input type="date" className={`form-control ${errors.fromDate ? "is-invalid" : ""}`} value={formData.fromDate} onChange={handleChangeAssign} onBlur={handleBlur} />
//                   {errors.fromDate && <div className="invalid-feedback">{errors.fromDate}</div>}
//                 </div>
//               </div>

//               {/* Third Row: To Date */}
//               <div className="row g-3 mt-2">
//                 <div className="col-12 col-md-6">
//                   <label className="form-label">To Date <span className="text-danger">*</span></label>
//                   <input type="date" className={`form-control ${errors.toDate ? "is-invalid" : ""}`} value={formData.toDate} onChange={handleChangeAssign} onBlur={handleBlur} />
//                   {errors.toDate && <div className="invalid-feedback">{errors.toDate}</div>}
//                 </div>
//               </div>

//               {/* Partial Days */}
//               <div className="row g-3 mt-3">
//                 <div className="col-12">
//                   <label className="form-label">Partial Days <span className="text-danger">*</span></label>
//                   <div className="d-flex flex-wrap gap-3">
//                     {[
//                       { value: "none", label: "None" },
//                       { value: "half", label: "Half Day" },
//                       { value: "start", label: "Start Day Only" },
//                       { value: "end", label: "End Day Only" },
//                       { value: "both", label: "Start and End Day" },
//                     ].map((option) => (
//                       <div className="form-check" key={option.value}>
//                         <input className="form-check-input" type="radio" name="partialDays" value={option.value} checked={formData.partialDays === option.value} onChange={handleChangeAssign} />
//                         <label className="form-check-label">{option.label}</label>
//                       </div>
//                     ))}
//                   </div>
//                   {errors.partialDays && <div className="invalid-feedback">{errors.partialDays}</div>}
//                 </div>
//               </div>

//               {/* Total Duration */}
//               <div className="row g-3 mt-2">
//                 <div className="col-12 col-md-6">
//                   <label className="form-label">Total Duration</label>
//                   <input type="text" className="form-control" value={formData.totalDuration} readOnly />
//                 </div>
//               </div>

//               {/* Comments */}
//               <div className="row g-3 mt-2">
//                 <div className="col-12">
//                   <label className="form-label">Comments <span className="text-danger">*</span></label>
//                   <textarea className={`form-control ${errors.comments ? "is-invalid" : ""}`} value={formData.comments} onChange={handleChangeAssign} onBlur={handleBlur}></textarea>
//                   {errors.comments && <div className="invalid-feedback">{errors.comments}</div>}
//                 </div>
//               </div>

//               {/* Attachments */}
//               <div className="row g-3 mt-2">
//                 <div className="col-12">
//                   <label className="form-label">Attachments</label>
//                   <input type="file" className={`form-control ${touched.attachments && errors.attachments ? "is-invalid" : ""}`} onChange={handleChangeAssign} onBlur={handleBlur} accept=".jpg,.jpeg,.png,.pdf" />
//                   {touched.attachments && errors.attachments && <div className="invalid-feedback">{errors.attachments}</div>}
//                 </div>
//               </div>

//               {/* Buttons */}
//               <div className="d-flex justify-content-end mt-4">
//                 <button type="submit" className="btn btn-primary me-2" disabled={isSubmitting}>{isSubmitting ? "Applying..." : "Apply"}</button>
//                 <button type="reset" className="btn btn-secondary">Cancel</button>
//               </div>

//             </form>

//           </div>
//         </div>

//       )}
//     </div>

//   );
// }

// export default EmployeeLeave;



import React, { useEffect, useState, useCallback, useMemo } from "react";
import DataTable from 'react-data-table-component';
import { FaEye, FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { FaCheckCircle } from 'react-icons/fa';
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from '../axiosConfig';
import { toast } from "react-toastify";

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
    toDate: "",
    partial_days: "partial_none", // Default: Full Day (None)
    startSession: "", // Start Day Session (AM/PM)
    endSession: "",
    totalDuration: '',
    comments: '',
    attachments: null
  });



  // Handle input changes
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [allowedPartialDays, setAllowedPartialDays] = useState(["none", "Half day", "Start Day Only", "End Day Only", "Start and End Day"]);


  const partialDaysOptions = [
    { value: "partial_none", label: "None" },
    { value: "partial_all", label: "Half Day" },
    { value: "partial_start", label: "Start Day Only" },
    { value: "partial_end", label: "End Day Only" },
    { value: "partial_start_end", label: "Start and End Day" },
  ];

  const getPartialDaysOptions = useCallback(() => {
    if (!formData.fromDate || !formData.toDate) {
      return ["partial_none", "partial_all", "partial_start", "partial_end", "partial_start_end"];
    }
    return formData.fromDate === formData.toDate
      ? ["partial_none", "partial_all"] // Only None & Half Day for same-day leave
      : ["partial_none", "partial_start", "partial_end", "partial_start_end"]; // Exclude Half Day
  }, [formData.fromDate, formData.toDate]);
  
  const calculateTotalDuration = useCallback((fromDate, toDate, partialDays) => {
    if (!fromDate || !toDate) return "";
  
    const from = new Date(fromDate);
    const to = new Date(toDate);
    let totalDays = (to - from) / (1000 * 60 * 60 * 24) + 1; // Inclusive of both dates
  
    switch (partialDays) {
      case "partial_all":
        return "0.5"; // Half Day
      case "partial_start":
      case "partial_end":
        return (totalDays - 0.5).toFixed(1); // Deduct 0.5 for either start or end
      case "partial_start_end":
        return (totalDays - 1).toFixed(1); // Deduct 1 full day
      default:
        return totalDays.toString(); // Full day count
    }
  }, []);
  
  const updatePartialDaysAndDuration = useCallback(
    (updatedForm) => {
      const { fromDate, toDate, partial_days } = updatedForm;
      if (!fromDate || !toDate) return;
  
      const from = new Date(fromDate);
      const to = new Date(toDate);
      const diffDays = (to - from) / (1000 * 60 * 60 * 24) + 1;
  
      const updatedAllowedPartialDays =
        diffDays === 1
          ? ["partial_none", "partial_all"]
          : ["partial_none", "partial_start", "partial_end", "partial_start_end"];
  
      const newDuration = calculateTotalDuration(fromDate, toDate, partial_days);
  
      setFormData((prev) => ({
        ...prev,
        totalDuration: newDuration,
        partial_days: updatedAllowedPartialDays.includes(partial_days) ? partial_days : "partial_none",
      }));
  
      setAllowedPartialDays(updatedAllowedPartialDays);
    },
    [calculateTotalDuration]
  );
  
  const handleChange = useCallback(
    (e) => {
      const { id, name, value, type, files } = e.target;
      const fieldId = id || name;
  
      setFormData((prev) => {
        const updatedForm = { ...prev, [fieldId]: type === "file" ? files[0] : value };
  
        if (["fromDate", "toDate", "partial_days"].includes(fieldId)) {
          updatePartialDaysAndDuration(updatedForm);
        }
  
        return updatedForm;
      });
    },
    [updatePartialDaysAndDuration]
  );

  // Update Partial Days Options and Calculate Total Duration
  // const updatePartialDaysAndDuration = (updatedForm) => {
  //   const { fromDate, toDate, partialDays } = updatedForm;

  //   if (!fromDate || !toDate) return;

  //   const from = new Date(fromDate);
  //   const to = new Date(toDate);
  //   const diffDays = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1; // Inclusive of both dates

  //   let allowedPartialDays = ["none"];
  //   if (diffDays === 1) {
  //     // Same Day Leave → Only show None & Half Day
  //     allowedPartialDays = ["none", "Half Day"];
  //   } else if (diffDays > 1) {
  //     // Multi-day Leave → Show Start Day, End Day, Both
  //     allowedPartialDays = ["none", "Start Day Only", "End Day Only", "Start and End Day"];
  //   }

  //   let duration = diffDays;
  //   if (partialDays === "Half Day" && diffDays === 1) {
  //     duration = 0.5;
  //   } else if (partialDays === "Start Day Only" || partialDays === "End Day Only") {
  //     duration = diffDays - 0.5;
  //   } else if (partialDays === "Start and End Day") {
  //     duration = diffDays - 1;
  //   }

  //   setFormData((prev) => ({
  //     ...prev,
  //     totalDuration: duration,
  //     partialDays: allowedPartialDays.includes(partialDays) ? partialDays : "none", // Reset partialDays if it's invalid
  //   }));

  //   setAllowedPartialDays(allowedPartialDays);
  // };

  // Handle input changes
  // const handleChange = (e) => {
  //   const { id, value, type, files, name } = e.target;
  //   const fieldId = id || name;

  //   setFormData((prev) => ({
  //     ...prev,
  //     [fieldId]: type === "file" ? files[0] : value,
  //   }));

  //   setTouched((prev) => ({
  //     ...prev,
  //     [fieldId]: true,
  //   }));

  //   if (errors[fieldId]) {
  //     setErrors((prev) => ({
  //       ...prev,
  //       [fieldId]: "",
  //     }));
  //   }
  // };
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
  const validateForm = useCallback(() => {
    return Object.keys(formData).reduce((errors, key) => {
      const error = validateField(key, formData[key]);
      if (error) errors[key] = error;
      return errors;
    }, {});
  }, [formData, validateField]); 
  
      // Reset form
      const handleReset = useCallback(() => {
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
      }, []);
  
  // Handle form submission
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("user_id");
    console.log("Token:", token);
    console.log("User ID:", userId);

    if (!token || !userId) {
      alert("Authentication error: Please log in again.");
      setIsSubmitting(false);
      return;
    }

    // Convert date format to `DD-MM-YYYY`
    const formatDate = (dateString) => {
      if (!dateString) return null;
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB').split('/').join('-'); // Converts to `DD-MM-YYYY`
    };

    // Convert leaveType to an integer
    const leaveTypeId = Number(formData.leaveType);
    if (!leaveTypeId) {
      alert("Please select a valid leave type.");
      setIsSubmitting(false);
      return;
    }

    // Ensure partialDays matches API expected values
    const partialDaysMap = {
      none: "partial_none",
      start: "partial_start",
      end: "partial_end",
      both: "partial_start_end",
      all: "partial_all", // Ensure "all" is handled if needed
    };

    const partialDaysValue = partialDaysMap[formData.partialDays] || null;
    console.log("Partial Days Sent:", partialDaysValue);

    // Ensure at least 0.5 leave days
    const totalLeaves = parseFloat(formData.totalDuration) || 0;
    if (totalLeaves < 0.5) {
      alert("Total leave duration must be at least 0.5 days.");
      setIsSubmitting(false);
      return;
    }

    // Prepare API request data
    const requestData = {
      user_id: parseInt(userId, 10),
      leave_type_id: leaveTypeId,
      from_date: formatDate(formData.fromDate),
      to_date: formatDate(formData.toDate),
      no_of_leaves: totalLeaves,
      reason_for_leave: formData.comments,
      partial_days: partialDaysValue,
    };

    // Add `partial_start_day` and `partial_end_day` conditionally
    if (partialDaysValue === "partial_start" || partialDaysValue === "partial_start_end") {
      requestData.partial_start_day = "FN"; // or "AN" based on user input
    }

    if (partialDaysValue === "partial_end" || partialDaysValue === "partial_start_end") {
      requestData.partial_end_day = "AN"; // or "FN" based on user input
    }

    try {
      const response = await axios.post(
        "/apply-leave",
        requestData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'userId': userId
          },
        }
      );
      console.log("Request Data:", requestData);
      console.log("Partial Days Sent:", partialDaysValue);
      console.log("Leave application submitted", response.data);

      toast.success("Leave application submitted successfully!");
      handleReset();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to apply for leave. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm, handleReset]); 
  
    
  //view leave status form
  const [leaveList, setLeaveList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    fetchEmployeesLeaveList();
  }, []);

  // Fetch Leave List with useCallback to prevent re-creation
  const fetchEmployeesLeaveList = useCallback(async () => {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("user_id");

    if (!token || !userId) return;

    try {
      const response = await axios.get("get-leave-list", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          userId,
        },
      });

      if (response.data.status === "success") {
        setLeaveList(response.data.LeaveRecord);
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching EmployeesList:", error);
    }
  }, []);

  const handleView = useCallback((row) => {
    if (!row) return; // Avoid unnecessary state updates if row is undefined
    setSelectedRow(row);
    setModalIsOpen(true);
  }, []);
  
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedRow(null);
  };

  const handleDelete =useCallback((row) => {
    if (!row) return; // Avoid unnecessary operations if row is undefined
    console.log("Deleting:", row);
  },[]);

  //View leave status
  // Update your customStyles object to remove overflow constraints
  const customStyles = {
    table: {
      style: {
        width: '100%',
        tableLayout: 'fixed', // This helps with column width distribution
      },
    },
    headRow: {
      style: {
        backgroundColor: '#f8f9fa',
        minHeight: '56px',
        whiteSpace: 'normal', // Allow text wrapping in headers
        wordBreak: 'break-word' // Break words if needed
      },
    },
    rows: {
      style: {
        minHeight: '50px',
      },
    },
    cells: {
      style: {
        paddingLeft: '8px',
        paddingRight: '8px',
        whiteSpace: 'normal', // Allow text wrapping in cells
        wordBreak: 'break-word' // Break words if needed
      },
    },
  };

  // Update your columns with better width distribution
  const columns = useMemo(
    () => [
      { name: "#", selector: (row) => row.id, sortable: true, width: "60px" },
      { name: "Employee ID", selector: (row) => row.user_id, sortable: true, width: "130px" },
      { name: "Leave Type", selector: (row) => row.leave_type_name, sortable: true, width: "120px" },
      { name: "Start Date", selector: (row) => row.leave_start_date, sortable: true, width: "110px" },
      { name: "End Date", selector: (row) => row.leave_end_date, sortable: true, width: "110px" },
      { name: "Duration", selector: (row) => row.no_of_leaves, sortable: true, width: "100px" },
      {
        name: "Status", selector: (row) => row.request_status, sortable: true, width: "100px",
        cell: (row) => (<span className={`badge ${row.request_status === "Approved" ? "bg-success" : "bg-warning"}`}>{row.request_status}</span>)
      },
      {
        name: "Actions",
        cell: (row) => (
          <div className="d-flex gap-2">
            <button className="cursor-pointer btn btn-primary me-"
              style={{ background: "none", border: "none", outline: "none", cursor: "pointer", fontSize: "1rem", color: "#0047bb" }}>
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => handleView(row)}
              style={{ background: "none", border: "none", outline: "none", cursor: "pointer", fontSize: "1rem", color: "#0047bb" }}>
              <FontAwesomeIcon icon={faEye} />
            </button>
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(row)}
              style={{ background: "none", border: "none", outline: "none", cursor: "pointer", fontSize: "1rem", color: "red" }}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ),
        width: "110px",
      },
    ],
    []
  );


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
  const entitlementColumns = useMemo(()=>[
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
  ]
)

  // Apply/Reject froms
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
  const approveColumns = useMemo(()=> [
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
  ]
)

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
    <div className="" style={{ overflowX: 'hidden', overflowY: 'hidden', width: '100%', padding: '30px' }}>
      {/* Top Tabs */}

      <div className="row justify-content-left  mt-4">
        <div className="col-12 col-md-10 col-lg-8 bg-white rounded-lg shadow p- w-100">
          {/* Scrollable container with Bootstrap classes only */}
          <div className="d-flex flex-nowrap overflow-auto pb-2" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
            <button className={`btn ${activeTab === "leave_entitlement" ? "btn-primary" : "btn-outline-primary"} me-2 flex-shrink-0 text-nowrap`}
              onClick={() => setActiveTab("leave_entitlement")} >
              Leave Entitlement
            </button>
            <button className={`btn ${activeTab === "approve" ? "btn-primary" : "btn-outline-primary"} me-2 flex-shrink-0 text-nowrap`}
              onClick={() => setActiveTab("approve")}>
              Approve/Reject
            </button>
            <button className={`btn ${activeTab === "assign" ? "btn-primary" : "btn-outline-primary"} me-2 flex-shrink-0 text-nowrap`}
              onClick={() => setActiveTab("assign")}>
              Assign
            </button>
            <button className={`btn ${activeTab === "apply" ? "btn-primary" : "btn-outline-primary"} me-2 flex-shrink-0 text-nowrap`}
              onClick={() => setActiveTab("apply")} >
              Apply Leave
            </button>
            <button className={`btn ${activeTab === "status" ? "btn-primary" : "btn-outline-primary"} me-2 flex-shrink-0 text-nowrap`}
              onClick={() => setActiveTab("status")} >
              View Leave Status
            </button>
          </div>
        </div>
      </div>
      {/* Content Based on Active Tab */}
      {activeTab === "apply" && (
        <div className="mt-5">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8 p-4 bg-white rounded-lg shadow">
              <h3 className="mb-4">Apply Leave</h3>
              <form onSubmit={handleSubmit} onReset={handleReset}>
                <div className="row g-3">
                  {/* Leave Type */}
                  <div className="col-md-6">
                    <label htmlFor="leaveType" className="form-label">
                      Leave Type <span className="text-danger">*</span>
                    </label>
                    {/* <select
                      id="leaveType"
                      className={`form-select ${errors.leaveType ? 'is-invalid' : ''}`}
                      value={formData.leaveType}
                      onChange={handleChange}
                    >
                      <option value="">--Select--</option>
                      <option value="sick">Sick Leave</option>
                      <option value="casual">Casual Leave</option>
                    </select>
                    {errors.leaveType && <div className="invalid-feedback">{errors.leaveType}</div>} */}
                    <select className={`form-select ${errors.leaveType ? 'is-invalid' : ''}`}
                      name="leaveType"
                      value={formData.leaveType}
                      onChange={(e) => setFormData({ ...formData, leaveType: e.target.value })}
                    >
                      <option value="">Select Leave Type</option>
                      <option value="1">Sick Leave</option>
                      <option value="2">Casual Leave</option>
                      <option value="3">Annual Leave</option>
                    </select>

                  </div>

                  {/* Leaves Remaining */}
                  <div className="col-md-6">
                    <label htmlFor="leavesRemaining" className="form-label">
                      Leaves Remaining <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="leavesRemaining"
                      className="form-control"
                      value={formData.leavesRemaining}
                      onChange={handleChange} />
                  </div>

                  {/* From Date */}
                  <div className="col-md-6">
                    <label htmlFor="fromDate" className="form-label">
                      From Date <span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      id="fromDate"
                      className={`form-control ${errors.fromDate ? 'is-invalid' : ''}`}
                      value={formData.fromDate}
                      onChange={handleChange}
                    />
                    {errors.fromDate && <div className="invalid-feedback">{errors.fromDate}</div>}
                  </div>

                  {/* To Date */}
                  <div className="col-md-6">
                    <label htmlFor="toDate" className="form-label">
                      To Date <span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      id="toDate"
                      className={`form-control ${errors.toDate ? 'is-invalid' : ''}`}
                      value={formData.toDate}
                      onChange={handleChange}
                    />
                    {errors.toDate && <div className="invalid-feedback">{errors.toDate}</div>}
                  </div>

                  {/* Partial Days */}
                  {/* Partial Days */}
                  <div className="col-12">
                    <label className="form-label">Partial Days</label>
                    <div className="d-flex flex-wrap gap-3"> {/* Use flexbox to align side by side */}
                      {partialDaysOptions.map((option) => (
                        <div className="form-check" key={option.value}>
                          <input
                            className="form-check-input"
                            type="radio"
                            name="partial_days"
                            value={option.value}
                            checked={formData.partial_days === option.value}
                            onChange={handleChange}
                            disabled={!getPartialDaysOptions().includes(option.value)}
                          />
                          <label className="form-check-label">{option.label}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Show Start Day Session ONLY if "Start Day Only" or "Start & End Day" is selected */}
                  {(formData.partial_days === "partial_start" || formData.partial_days === "partial_start_end") && (
                    <div className="col-md-6">
                      <label htmlFor="startSession" className="form-label">Start Day Session (AN/FN)</label>
                      <select id="startSession" className="form-select" value={formData.startSession} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="AM">Morning (AN)</option>
                        <option value="PM">Afternoon (FN)</option>
                      </select>
                    </div>
                  )}

                  {/* Show End Day Session ONLY if "End Day Only" or "Start & End Day" is selected */}
                  {(formData.partial_days === "partial_end" || formData.partial_days === "partial_start_end") && (
                    <div className="col-md-6">
                      <label htmlFor="endSession" className="form-label">End Day Session (AN/FN)</label>
                      <select id="endSession" className="form-select" value={formData.endSession} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="AM">Morning (AN)</option>
                        <option value="PM">Afternoon (FN)</option>
                      </select>
                    </div>
                  )}

                  {/* Total Duration */}
                  <div className="col-md-6">
                    <label htmlFor="totalDuration" className="form-label">Total Duration</label>
                    <input type="text" id="totalDuration" className="form-control" value={formData.totalDuration} readOnly />
                  </div>

                  {/* Comments */}
                  <div className="col-12">
                    <label htmlFor="comments" className="form-label">
                      Comments
                    </label>
                    <textarea
                      id="comments"
                      className={`form-control ${errors.comments ? 'is-invalid' : ''}`}
                      value={formData.comments}
                      onChange={handleChange}
                      rows={3}
                    />
                  </div>

                  {/* Attachments */}
                  <div className="col-12">
                    <label htmlFor="attachments" className="form-label">Attachments</label>
                    <input type="file" id="attachments" className="form-control" onChange={handleChange} accept=".jpg,.jpeg,.png,.pdf" />
                  </div>

                  {/* Buttons */}
                  <div className="col-12 d-flex justify-content-end">
                    <button type="reset" className="btn btn-secondary me-2">Cancel</button>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                      {isSubmitting ? 'Applying...' : 'Apply'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {activeTab === "status" && (
        <div className="container-fluid py-4" >
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8 p-4 bg-white rounded-lg shadow">
              <h3 className="mb-4">View Leave Status</h3>

              {/* Filters & Search */}
              <div className="row mb-3 d-flex justify-content-end">
                <div className="col-auto">
                  <input
                    className="form-control"
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Search..."
                  />
                </div>
              </div>


              {/* Data Table */}
              <DataTable
                columns={columns}
                data={leaveList}
                pagination
                paginationPerPage={10}
                paginationRowsPerPageOptions={[5, 10, 15, 20]}
                customStyles={customStyles}
                responsive
                highlightOnHover
                pointerOnHover
                striped
              />

              {/* Modal for Leave Details */}
              {/* Modal for Leave Details */}
              <Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)} centered>
                <Modal.Header closeButton>
                  <Modal.Title>Leave Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {selectedRow && (
                    <div>
                      <p><strong>Employee Name:</strong> {selectedRow.employee_name}</p>
                      <p><strong>Start Date:</strong> {selectedRow.leave_start_date}</p>
                      <p><strong>End Date:</strong> {selectedRow.leave_end_date}</p>
                      <p><strong>Leave Type:</strong> {selectedRow.leave_type_name}</p>
                      <p><strong>Requested Duration:</strong> {selectedRow.no_of_leaves}</p>
                      <p><strong>Status:</strong> {selectedRow.status}</p>
                    </div>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setModalIsOpen(false)}>Close</Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>

      )}

      {activeTab === "leave_entitlement" && (
        <div className="container-fluid py-4">
          <div className="row ">
            {/* Form Section - Left */}
            <div className="col-12 col-md-6 p-3 bg-white shadow rounded">
              <h4 className="mb-3">Leave Entitlements</h4>
              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Employee Name <span className="text-danger">*</span></label>
                    <select className="form-select" name="employee_name">
                      <option value="">--select--</option>
                      <option value="1">Pishuu</option>
                      <option value="2">Sammm</option>
                      <option value="3">Karrran</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Leave Type <span className="text-danger">*</span></label>
                    <select className="form-select" name="leave_type_id">
                      <option value="">--select--</option>
                      <option value="1">Paid Leave</option>
                      <option value="2">Sick Leave</option>
                      <option value="3">Casual Leave</option>
                    </select>
                  </div>
                </div>

                <div className="row g-3 mt-1">
                  <div className="col-md-6">
                    <label className="form-label">Effective from <span className="text-danger">*</span></label>
                    <input type="date" name="effective_from" className="form-control" />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Effective to <span className="text-danger">*</span></label>
                    <input type="date" name="effective_to" className="form-control" />
                  </div>
                </div>

                <div className="row g-3 mt-1">
                  <div className="col-md-6">
                    <label className="form-label">Entitlements (Days) <span className="text-danger">*</span></label>
                    <input type="text" name="entitlements" className="form-control" />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Status <span className="text-danger">*</span></label>
                    <select className="form-select" name="status">
                      <option value="">--select--</option>
                      <option value="1">Active</option>
                      <option value="2">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="mt-3 text-end">
                  <button className="btn btn-primary">Set</button>
                  <button className="btn btn-danger ms-3">Cancel</button>
                </div>
              </form>
            </div>

            {/* Table Section - Right */}
            <div className="col-12 col-md-6 p-3 bg-white shadow rounded">
              <h4 className="mb-3">Entitlement Records</h4>

              {/* Search Bar */}
              <div className="row g-3 align-items-center">
                <div className="col-md-6">
                  <label className="form-label">Employee Name</label>
                  <select className="form-select" name="employee_name">
                    <option value="">--select--</option>
                    <option value="1">Pishuu</option>
                    <option value="2">Sammm</option>
                    <option value="3">Karrran</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Leave Type</label>
                  <select className="form-select" name="leave_type_id">
                    <option value="">--select--</option>
                    <option value="1">Paid Leave</option>
                    <option value="2">Sick Leave</option>
                    <option value="3">Casual Leave</option>
                  </select>
                </div>

                <div className="col-12">
                  <input
                    className="form-control"
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Search..."
                  />
                </div>
              </div>

              {/* Data Table */}
              <div className="mt-3">
                <DataTable
                  columns={entitlementColumns}
                  data={EntitlementData}
                  pagination
                  striped
                  className="shadow-sm"
                />
              </div>
            </div>

          </div>
        </div>

      )}

      {activeTab === "approve" && (
        <div className="container-fluid align-items-center py-4">
          <div className="row p-4 bg-white shadow rounded">
            {/* Employee Name */}
            <div className=" col-md-2">
              <label className="form-label">Employee Name <span className="text-danger">*</span></label>
              <select className="form-select" name="employee_name">
                <option value="">Employee Name </option>
                <option value="1">Pishuu</option>
                <option value="2">Sammm</option>
                <option value="3">Karran</option>
              </select>
            </div>

            {/* Leave Type */}
            <div className=" col-md-2">
              <label className="form-label">Leave Type <span className="text-danger">*</span></label>
              <select className="form-select" name="leave_type_id">
                <option value="">Leave Type</option>
                <option value="1">Paid Leave</option>
                <option value="2">Sick Leave</option>
                <option value="3">Casual Leave</option>
              </select>
            </div>

            {/* From Date */}
            <div className="col-md-2 ">
              <label className="form-label">From <span className="text-danger">*</span></label>
              <input
                type="date"
                id="from"
                className={`form-control ${errors?.from ? "is-invalid" : ""}`}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors?.from && <div className="invalid-feedback">{errors.from}</div>}
            </div>

            {/* To Date */}
            <div className="col-md-2">
              <label className="form-label">To <span className="text-danger">*</span></label>
              <input
                type="date"
                id="to"
                className={`form-control ${errors?.to ? "is-invalid" : ""}`}
                value={formData?.to}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors?.to && <div className="invalid-feedback">{errors.to}</div>}
            </div>

            {/* Search Bar */}
            <div className="col-md-4">
              <input
                className="form-control mt-4"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Search..."
              />
            </div>
          </div>
          <div className="col-lg-12 col-md-12 p-4 bg-white shadow rounded mt-3">

            {/* Form Section */}
            {/* Data Table */}
            <div className="mt-4">
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
        <div className="container-fluid py-4">
          <div className="col-lg-10 col-md-10 mx-auto p-4 bg-white rounded-lg shadow">

            <h3 className="mb-4">Assign Leave</h3>

            <form onReset={handleReset}>

              {/* First Row: Employee Name, Leave Type */}
              <div className="row g-3">

                {/* Employee Name */}
                <div className="col-12 col-md-6">
                  <label className="form-label">Employee Name <span className="text-danger">*</span></label>
                  <select className="form-select" name="employee_name" onChange={handleChangeAssign}>
                    <option value="">--select--</option>
                    <option value="1">Pishuu</option>
                    <option value="2">Sammm</option>
                    <option value="3">Karran</option>
                  </select>
                </div>

                {/* Leave Type */}
                <div className="col-12 col-md-6">
                  <label className="form-label">Leave Type <span className="text-danger">*</span></label>
                  <select id="leaveType" className={`form-select ${errors.leaveType ? "is-invalid" : ""}`} value={formData.leaveType} onChange={handleChangeAssign} onBlur={handleBlur}>
                    <option value="">--Select--</option>
                    <option value="sick">Sick Leave</option>
                    <option value="casual">Casual Leave</option>
                  </select>
                  {errors.leaveType && <div className="invalid-feedback">{errors.leaveType}</div>}
                </div>
              </div>

              {/* Second Row: Leaves Remaining, From Date */}
              <div className="row g-3 mt-2">

                {/* Leaves Remaining */}
                <div className="col-12 col-md-6">
                  <label className="form-label">Leaves Remaining <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" value={formData.leavesRemaining} readOnly />
                </div>

                {/* From Date */}
                <div className="col-12 col-md-6">
                  <label className="form-label">From Date <span className="text-danger">*</span></label>
                  <input type="date" className={`form-control ${errors.fromDate ? "is-invalid" : ""}`} value={formData.fromDate} onChange={handleChangeAssign} onBlur={handleBlur} />
                  {errors.fromDate && <div className="invalid-feedback">{errors.fromDate}</div>}
                </div>
              </div>

              {/* Third Row: To Date */}
              <div className="row g-3 mt-2">
                <div className="col-12 col-md-6">
                  <label className="form-label">To Date <span className="text-danger">*</span></label>
                  <input type="date" className={`form-control ${errors.toDate ? "is-invalid" : ""}`} value={formData.toDate} onChange={handleChangeAssign} onBlur={handleBlur} />
                  {errors.toDate && <div className="invalid-feedback">{errors.toDate}</div>}
                </div>
              </div>

              {/* Partial Days */}
              <div className="row g-3 mt-3">
                <div className="col-12">
                  <label className="form-label">Partial Days <span className="text-danger">*</span></label>
                  <div className="d-flex flex-wrap gap-3">
                    {[
                      { value: "none", label: "None" },
                      { value: "half", label: "Half Day" },
                      { value: "start", label: "Start Day Only" },
                      { value: "end", label: "End Day Only" },
                      { value: "both", label: "Start and End Day" },
                    ].map((option) => (
                      <div className="form-check" key={option.value}>
                        <input className="form-check-input" type="radio" name="partialDays" value={option.value} checked={formData.partialDays === option.value} onChange={handleChangeAssign} />
                        <label className="form-check-label">{option.label}</label>
                      </div>
                    ))}
                  </div>
                  {errors.partialDays && <div className="invalid-feedback">{errors.partialDays}</div>}
                </div>
              </div>

              {/* Total Duration */}
              <div className="row g-3 mt-2">
                <div className="col-12 col-md-6">
                  <label className="form-label">Total Duration</label>
                  <input type="text" className="form-control" value={formData.totalDuration} readOnly />
                </div>
              </div>

              {/* Comments */}
              <div className="row g-3 mt-2">
                <div className="col-12">
                  <label className="form-label">Comments <span className="text-danger">*</span></label>
                  <textarea className={`form-control ${errors.comments ? "is-invalid" : ""}`} value={formData.comments} onChange={handleChangeAssign} onBlur={handleBlur}></textarea>
                  {errors.comments && <div className="invalid-feedback">{errors.comments}</div>}
                </div>
              </div>

              {/* Attachments */}
              <div className="row g-3 mt-2">
                <div className="col-12">
                  <label className="form-label">Attachments</label>
                  <input type="file" className={`form-control ${touched.attachments && errors.attachments ? "is-invalid" : ""}`} onChange={handleChangeAssign} onBlur={handleBlur} accept=".jpg,.jpeg,.png,.pdf" />
                  {touched.attachments && errors.attachments && <div className="invalid-feedback">{errors.attachments}</div>}
                </div>
              </div>

              {/* Buttons */}
              <div className="d-flex justify-content-end mt-4">
                <button type="submit" className="btn btn-primary me-2" disabled={isSubmitting}>{isSubmitting ? "Applying..." : "Apply"}</button>
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
