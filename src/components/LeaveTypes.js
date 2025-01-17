
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import axios from "axios";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
// import LeaveTypesAdd from './LeaveTypesAdd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal } from 'react-bootstrap';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrash,FaCheckCircle } from 'react-icons/fa';

function LeaveTypes() {
    const [pageSizeOptions] = useState([5, 10, 20, 30]);
    const [pageSize, setPageSize] = useState(10);
    const [globalFilter, setGlobalFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [leavetypes, setLeaveTypes] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [formMode, setFormMode] = useState("add");
    const [selectedLeaveTypes, setSelectedLeaveTypes] = useState(null);
    const [leaveTypeToDelete, setLeaveTypeToDelete] = useState(null);
    const [modalBox, setModalBox] = useState(false);

    useEffect(() => {
        fetchLeaveTypes();
    }, [currentPage, pageSize, globalFilter]);

    const [formData, setFormData] = useState({ leave_type_code: "", leave_type_name: "", status: "", leave_type_id: "" });
    const [errors, setErrors] = useState({})

    // const userId = document.getElementById('leavetype').getAttribute('data-user-id');
const [userId ,setUserId]=useState('')

    const fetchLeaveTypes = async () => {

        try {
            const response = await axios.get("/api/leave-types", {
                params: {
                    start: currentPage * pageSize,
                    per_page: pageSize,
                    search_term: globalFilter,
                    user_id: userId
                },
            });
            console.log("Response from backend:", response);
            setLeaveTypes(response.data.aaData);
            setTotalCount(response.data.iTotalDisplayRecords);
        } catch (error) {
            console.error("Error fetching leavetypes:", error);
        }
    };

    const toggleSidebar = () => {
        const sidebar = document.getElementById('offcanvasExample1');
        if (sidebar) {
            sidebar.classList.toggle('show');
        } else {
            console.error('Sidebar element not found');
        }
    };

    
    const handleEditBtn = async (leavetypes) => {
        //    console.log(technologies);
        try {
            const response = await axios.get(`api/leave_type/${leavetypes.leave_type_id}`,
                {
                    headers: {
                        'userId': userId,
                        'leaveId': leavetypes.leave_type_id
                    }
                })
            console.log("clicked by the ID:", leavetypes.leave_type_id);
            console.log('Fetched leavetypes details:', response.data);
            setSelectedLeaveTypes(leavetypes)
            setFormMode("edit");
            toggleSidebar()

        } catch (error) {
            console.error("Error editing leavetypes:", error);
        }
    }


    const handleDeleteBtn = (leavetypes) => {
        setLeaveTypeToDelete(leavetypes);
        setModalBox(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`/api/leave_type/${leaveTypeToDelete.leave_type_id}`, {
                headers: { 'userId': userId },
                // data: { 'userId': userId }
            });
            fetchLeaveTypes();
            toast.error('Inactivated Successfully', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                // theme: "#004eaa ",
                transition: Bounce,
                icon:<FaTrash/>,
                className: 'custom-toast-delete', // Apply custom class
                bodyClassName: 'custom-toast-body-delete', // Optional: Apply custom class to the body if needed
                closeButton: false
            });
        } catch (error) {
            console.error('Error deleting leavetypes:', error);
        } finally {
            setModalBox(false);
            setLeaveTypeToDelete(null);
        }
    };




    const columns = [
        {
            headerName: "#",
            width:100,
            valueGetter: (params) => currentPage * pageSize + (params.node.rowIndex + 1),
        },
        { headerName: "Leave Type Code", field: "leave_type_code", sortable: true },
        { headerName: "Leave Type Name", field: "leave_type_name", sortable: true },
        { headerName: "Status", field: "status", sortable: true },
        {
            headerName: 'Action',
            field: 'action',
            //         cellRendererFramework: (params) => {
            //             const { leave_type_id, status } = params.data;
            //             return(
            //             // <div dangerouslySetInnerHTML={{ __html: params.value }}></div>
            //             <div className="d-flex">
            //             <a className="cursor-pointer me-2" onClick={() => handleEditBtn(params.data)}>
            //                 <FontAwesomeIcon icon={faEdit} />
            //             </a>
            //         </div>
            //    ) },
            cellRendererFramework: (params) => {
                if (params.data.status === 'Active') {
                    const { technology_id } = params.data;
                    return (
                        <div className="d-flex">
                            <a className="cursor-pointer me-2" onClick={() => handleEditBtn(params.data)}>
                                  <FontAwesomeIcon icon={faEdit} />
                            </a>
                            <Button className="cursor-pointer ms-3 btn-danger"
                                style={{ width: "80px", height: "30px", margin: "5px", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}
                                onClick={() => handleDeleteBtn(params.data)}>
                                Inactive
                            </Button>
                        </div>
                    );
                } else {
                    return (
                        <div className="d-flex">
                            <a className="cursor-pointer me-2" onClick={() => handleEditBtn(params.data)}>
                                <FontAwesomeIcon icon={faEdit} />
                            </a>
                        </div>
                    );
                }
            },

                },

        ];

        const handlePageSizeChange = (e) => {
            const newSize = Number(e.target.value);
            setPageSize(newSize);
            setCurrentPage(0); // Reset to the first page
        };
    
    const onPageChanged = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleAddButtonClick = () => {
        setFormMode("add");

        const sidebar = document.getElementById('offcanvasExample1');
        if (sidebar) {
            sidebar.classList.toggle('show');
        } else {
            console.error('Sidebar element not found.');
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
    
        setErrors(prevErrors => ({
          ...prevErrors,
          [name]: ''
        }));
    
      }
    
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form data on submit:', formData); // Ensure status is included here
        
        const validationErrors = {};
        if (!formData.leave_type_code?.trim()) {
          validationErrors.leave_type_code = "Leave type code cannot be empty";
        }
        if (!formData.leave_type_name?.trim()) {
          validationErrors.leave_type_name = "Leave type name cannot be empty";
        }
      // Check if status is a valid number or an empty string
      if (formData.status === '' || formData.status === undefined) {
        validationErrors.status = "Status cannot be empty";
    }
        setErrors(validationErrors);
    
        if (Object.keys(validationErrors).length === 0) {
          try {
            if ( 'edit') {
              await axios.put(`/api/leave_type`, {
                leave_type_code: formData.leave_type_code,
                leave_type_name: formData.leave_type_name,
                status: formData.status,
                userId: userId,
                leaveId: formData.leave_type_id
              }, {
                headers: {
                  'userId': userId,
                  'leaveId': formData.leave_type_id
                }
              });
              toast.info('Leave Updated Successfully', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Bounce,
                icon: <FaCheckCircle />,
                className: 'custom-toast',
                bodyClassName: 'custom-toast-body',
                closeButton: false
              });
            } else {
              await axios.post('/api/leave_type', formData, {
                headers: {
                  'userId': userId
                }
              });
              toast.info('Leave Added Successfully', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Bounce,
                icon: <FaCheckCircle />,
                className: 'custom-toast',
                bodyClassName: 'custom-toast-body',
                closeButton: false
              });
              setFormData({ leave_type_code: "", leave_type_name: "", status: "", leave_type_id: "" });
            }
            fetchLeaveTypes();
            toggleSidebar();
          } catch (error) {
            console.error('Error saving leave:', error);
          }
        }
      };
    
      const handleCancel = () => {
        if ( 'edit') {
            setFormData({
                leave_type_code: leavetypes.leave_type_code || '',
                leave_type_name: leavetypes.leave_type_name || '',
                status: leavetypes.status === 'Inactive' ? 0 : 1,
                leave_type_id: leavetypes.leave_type_id || ''
            });
        } else {
            setFormData({
                leave_type_code: '',
                leave_type_name: '',
                status: '',
                leave_type_id: ''
            });
        }
        setErrors({});
        toggleSidebar();
    };
    
    

    return (
        <div className="table-container" style={{ overflowX: 'hidden', overflowY: 'hidden',width:'100%',padding:'30px' }}>
            {/* <LeaveTypesAdd fetchLeaveTypes={fetchLeaveTypes} mode={formMode} leavetypes={selectedLeaveTypes}></LeaveTypesAdd> */}
             <div className="page-breadcrumb d-flex align-items-center mb-3">
                <div className="ps-0">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 p-0">
                            <li className="breadcrumb-item"><a href="/admin/dashboard">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Leave Types</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12">
                    <div className="btm-for mb-4 text-lg-end">
                        <div className="ms-auto">
                            <div className="btn-group">
                                    <button onClick={(e) => handleAddButtonClick(e)}
                                        type="button"
                                        className="btn btn-primary template-btn px-5"
                                        data-bs-toggle="offcanvas"
                                        role="button"
                                        aria-controls="offcanvasExample1"
                                    >
                                        Add
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="title-head d-flex justify-content-between">
                <h6 className="mb-0 text-uppercase">Leave Types</h6>
            </div>

            <hr />
            <div className='p-6 bg-white rounded-lg shadow' style={{padding:'20px'}}>
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
                            border:'none solid 2px'                            
                        }}
                        value={pageSize}
                        onChange={handlePageSizeChange}
                    >
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

            <div className="ag-theme-alpine" style={{  width: '100%', fontSize:'16px' }}>
                <AgGridReact
                    rowData={leavetypes}
                    columnDefs={columns}
                    // pagination={true}
                    // paginationPageSize={pageSize}
                    // onPaginationChanged={(params) => onPageChanged(params.api.paginationGetCurrentPage())}
                    domLayout='autoHeight'
                    onGridReady={(params) => {
                        params.api.sizeColumnsToFit();
                    }}
                />
            </div>

            <div className="text-end me-2 mt-3">
                <button
                    className="btn btn-white"
                    onClick={() => onPageChanged(currentPage - 1)}
                    disabled={currentPage === 0}
                >
                    Prev
                </button>

                {[...Array(Math.ceil(totalCount / pageSize))].map((_, index) => (
                    <button
                        key={index}
                        className={`btn ${currentPage === index ? "btn-primary" : "btn-white"}`}
                        onClick={() => onPageChanged(index)}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    className="btn btn-white"
                    onClick={() => onPageChanged(currentPage + 1)}
                    disabled={(currentPage + 1) * pageSize >= totalCount}
                >
                    Next
                </button>
            </div>

            <div className="text-start ms-2 mb-2">
                Showing {currentPage * pageSize + 1} to {Math.min((currentPage + 1) * pageSize, totalCount)} of {totalCount} entries
            </div>
            </div>

            <Modal show={modalBox} onHide={() => setModalBox(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm to Inactivate</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to Inactivate this leavetypes?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalBox(false)}>Cancel</Button>
                    <Button variant="danger" onClick={confirmDelete}>Inactive</Button>
                </Modal.Footer>
            </Modal>

{/* Add and edit */}
            <div className="offcanvas offcanvas-end customeoff addtask" tabIndex="-1" id="offcanvasExample1">
      <div className="offcanvas-header" style={{backgroundColor:'blue'}}>
        <h5 className="modal-title" id="#gridSystemModal1">{ 'edit' ? 'Edit LeaveTypes' : 'Add New LeaveTypes'}</h5>
        <button onClick={handleCancel} type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close">
          <i className="fa fa-close"></i>
        </button>
      </div>
      <div className="offcanvas-body">
        <div className="container-fluid">
          <form id="leave_type-create" className="row g-3 needs-validation" noValidate method="post" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="col-md-12">
              <label htmlFor="leave_type_code" className="form-label">Leave Type Code <span className='text-danger' >*</span></label>
              <input
                type="text"
                className='form-control'
                id="leave_type_code"
                placeholder="Leave Type Code"
                value={formData.leave_type_code || ""}
                name="leave_type_code"
                onChange={handleChange}
                required
              />
              {errors.leave_type_code && <span className="text-danger">{errors.leave_type_code}</span>}
            </div>
            <div className="col-md-12">
              <label htmlFor="leave_type_name" className="form-label">Leave Type Name <span className='text-danger'>*</span></label>
              <input
                type="text"
                className='form-control'
                id="leave_type_name"
                placeholder="Leave Type Name"
                value={formData.leave_type_name || ""}
                name="leave_type_name"
                onChange={handleChange}
                required
              />
              {errors.leave_type_name && <span className="text-danger" >{errors.leave_type_name}</span>}
            </div>
            <div className="col-md-12">
              <div className="custom__form__inputs">
              <label htmlFor="status" className="form-label">Status <span className='text-danger'>*</span></label>
                <div className="">
                  <select onChange={handleChange}
                    className='form-select'
                    id="status"
                    name="status"
                    value={formData.status}
                    required>

                    <option value="">Select</option>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                  </div>

                  {errors.status && <span className='text-danger'>{errors.status}</span>}
                </div>
            </div>
            {/* <hr style={{ opacity: '.15' }} /> */}
          </form>
        </div>
      </div>
      <div className="mb-3">
        <div className="d-md-flex d-flex d-grid align-items-center gap-3 justify-content-end">
          <button type="submit" form="leave_type-create" className="btn btn-primary px-4 template-btn">{'edit' ? 'Update' : 'Add'}</button>
          <button className="btn btn-danger px-4" type="button" data-bs-dismiss="offcanvas" aria-label="Close" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>

            <ToastContainer />

        </div>
    );
}

// if (document.getElementById("leavetype")) {
//     createRoot(document.getElementById("leavetype")).render(<LeaveTypes />);
// }

export default LeaveTypes;
