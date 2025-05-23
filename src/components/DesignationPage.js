// import React, { useEffect, useMemo, useState } from 'react';
// import { createRoot } from 'react-dom/client';
// import axios from 'axios';
// import DataTable from 'react-data-table-component';
// import { Button } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
// import Modal from 'react-bootstrap/Modal';
// import { toast, ToastContainer, Bounce } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FaTrash } from 'react-icons/fa';
// import { useForm } from "react-hook-form";

// const dummyData = [
//     { id: 1, designation_code: 'D001', designation_name: 'Manager', status: 'Active' },
//     { id: 2, designation_code: 'D002', designation_name: 'Developer', status: 'Inactive' },
// ];
// function Desigination() {
//     const [designation, setDesignation] = useState([]);
//     const [pageIndex, setPageIndex] = useState(0);
//     const [pageSize, setPageSize] = useState(10);
//     const [globalFilter, setGlobalFilter] = useState('');
//     const [totalCount, setTotalCount] = useState(0);
//     const [currentPage, setCurrentPage] = useState(0);
//     const [selectedDesignation, setSelectedDesignation] = useState(null);
//     const [modalBox, setModalBox] = useState(false);
//     const [designationToDelete, setDesignationToDelete] = useState(null);
//     const [formMode, setFormMode] = useState("add");
//     const [data, setData] = useState(dummyData);
//     // const [formData, setFormData] = useState({
//     //     designation_code: "",
//     //     designation_name: "",
//     //     status: "",
//     // });
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         reset,
//         setValue
//     } = useForm({
//         defaultValues: {
//             designation_code: "",
//             designation_name: "",
//             status: ""
//         }
//     });

//     // const [errors, setErrors] = useState({});

//     useEffect(() => {
//         fetchData();
//     }, [pageIndex, pageSize, globalFilter]);

//     // const userId = document.getElementById('desingination').getAttribute('data-user-id');
//     const [userId, setUserId] = useState('')

//     const fetchData = async () => {
//         const params = {
//             start: pageIndex * pageSize,
//             per_page: pageSize,
//             search_term: globalFilter,
//             user_id: userId
//         };

//         try {
//             const response = await axios.get('/api/designations', { params });
//             setDesignation(response.data.aaData);
//             setTotalCount(response.data.iTotalDisplayRecords);
//         } catch (error) {
//             console.error('Error fetching designation data:', error);
//         }
//     };

//     const toggleSidebar = () => {
//         const sidebar = document.getElementById('offcanvasExample1');
//         if (sidebar) {
//             sidebar.classList.toggle('show');
//         } else {
//             console.error('Sidebar element not found');
//         }
//     };

//     const onSubmit = async (formData) => {
//         try {
//             const payload = {
//                 ...formData,
//                 user_id: userId
//             };

//             if (formMode === "edit" && selectedDesignation?.designation_id) {
//                 // Update existing designation
//                 await axios.put(`/api/designation/${selectedDesignation.designation_id}`, payload);
//                 toast.success("Designation updated successfully", {
//                     position: "bottom-right",
//                     autoClose: 2000,
//                     hideProgressBar: true,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined
//                 });
//             } else {
//                 // Add new designation
//                 await axios.post("/api/designation", payload);
//                 toast.success("Designation added successfully", {
//                     position: "bottom-right",
//                     autoClose: 2000,
//                     hideProgressBar: true,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined
//                 });
//             }

//             // Refresh the table
//             fetchData();

//             // Reset form & close sidebar
//             reset();
//             toggleSidebar();
//         } catch (error) {
//             console.error("Error submitting designation form:", error);
//             toast.error("Something went wrong. Please try again.", {
//                 position: "bottom-right",
//                 autoClose: 2000,
//                 hideProgressBar: true,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined
//             });
//         }
//     };


//     const handleEditBtn = (designation) => {
//         setFormMode("edit");
//         setSelectedDesignation(designation);

//         setValue("designation_code", designation.designation_code || "");
//         setValue("designation_name", designation.designation_name || "");
//         setValue("status", designation.status?.toLowerCase() === "inactive" ? "0" : "1");

//         toggleSidebar();
//     };

//     const handleDeleteBtn = (designation) => {
//         setDesignationToDelete(designation);
//         setModalBox(true);
//     };

//     const confirmDelete = async () => {
//         try {
//             await axios.delete(`/api/designation/${designationToDelete.designation_id}`, {
//                 headers: {},
//                 data: { 'userId': userId }
//             });
//             fetchData();
//             toast.error('Inactivated Successfully', {
//                 position: "bottom-right",
//                 autoClose: 2000,
//                 hideProgressBar: true,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 // theme: "#004eaa ",
//                 transition: Bounce,
//                 icon: <FaTrash />,
//                 className: 'custom-toast-delete', // Apply custom class
//                 bodyClassName: 'custom-toast-body-delete', // Optional: Apply custom class to the body if needed
//                 closeButton: false
//             });
//         } catch (error) {
//             console.error('Error deleting designation:', error);
//         } finally {
//             setModalBox(false);
//             setDesignationToDelete(null);
//         }
//     };

//     const columns = [
//         { name: '#', selector: row => row.id, sortable: true },
//         { name: 'Designation Code', selector: row => row.designation_code, sortable: true },
//         { name: 'Designation Name', selector: row => row.designation_name, sortable: true },
//         { name: 'Status', selector: row => row.status, sortable: true },
//         {
//             name: 'Actions',
//             cell: (row) => (
//                 <>
//                     <Button variant="info" size="sm" className="me-2" onClick={() => handleEditBtn(row)}
//                         style={{ background: "none", border: "none", outline: "none", cursor: "pointer", fontSize: "1rem", color: "blue" }}>
//                         <FontAwesomeIcon icon={faEdit} />
//                     </Button>
//                     <Button variant="danger" size="sm" onClick={() => handleDeleteBtn(row)}
//                         style={{ background: "none", border: "none", outline: "none", cursor: "pointer", fontSize: "1rem", color: "red" }}>
//                         <FontAwesomeIcon icon={faTrash} />
//                     </Button>
//                 </>
//             )
//         }
//     ];

//     const handlePageSizeChange = (e) => {
//         const newSize = Number(e.target.value);
//         setPageSize(newSize);
//         setPageIndex(0);
//     };

//     const handleAddButtonClick = () => {
//         setFormMode("add");
//         setSelectedDesignation(null);
//         const sidebar = document.getElementById('offcanvasExample1');
//         if (sidebar) {
//             sidebar.classList.toggle('show');
//         }
//     };

//     // const toggleSidebar = () => {
//     //     const sidebar = document.getElementById('offcanvasExample1');
//     //     if (sidebar) {
//     //         sidebar.classList.toggle('show');
//     //     }
//     // };

//     const onPageChanged = (newPage) => {
//         setCurrentPage(newPage);
//         setPageIndex(newPage);
//     };

//     // const handleChange = (e) => {
//     //     const { name, value } = e.target;
//     //     setFormData({
//     //         ...formData,
//     //         [name]: value
//     //     });

//     //     setErrors(prevErrors => ({
//     //         ...prevErrors,
//     //         [name]: ''
//     //     }));
//     // }

//     const handleCancel = () => {
//         reset();
//         toggleSidebar();
//     };

//     return (
//         <div className="table-container" style={{ overflowX: 'hidden', overflowY: 'hidden', width: '100%', padding: '70px' }}>

//             {/* <div className="page-breadcrumb d-flex align-items-center mb-3">
//                 <div className="ps-0">
//                     <nav aria-label="breadcrumb">
//                         <ol className="breadcrumb mb-0 p-0">
//                             <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
//                             <li className="breadcrumb-item active" aria-current="page">Designations</li>
//                         </ol>
//                     </nav>
//                 </div>
//             </div> */}

//             <div className="row">
//                 <div className="col-12">
//                     <div className="btm-for mb-4 d-flex justify-content-end">
//                         <div className="btn-group">
//                             <button
//                                 type="button"
//                                 className="btn template-btn px-5 btn-primary"
//                                 onClick={handleAddButtonClick}>
//                                 Add
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="title-head d-flex justify-content-between">
//                 <h6 className="mb-0 text-uppercase">Designations</h6>
//             </div>

//             <hr />

//             <div className="p-4 bg-white rounded-lg shadow">
//                 <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
//                     <div className="d-flex flex-wrap align-items-center gap-2 ms-auto">
//                         <span>Search:</span>
//                         <input
//                             className="form-control"
//                             style={{
//                                 padding: "6px 12px",
//                                 borderRadius: "4px",
//                                 border: "1px solid #ced4da",
//                                 width: "200px", /* Fixed width for all screen sizes */
//                                 maxWidth: "100%" /* Prevent overflow on small screens */
//                             }}
//                             value={globalFilter}
//                             onChange={(e) => setGlobalFilter(e.target.value)}
//                             placeholder="Search..."
//                         />
//                     </div>
//                 </div>

//                 <DataTable
//                     columns={columns}
//                     data={data}
//                     pagination
//                     highlightOnHover
//                     striped
//                 />
//             </div>

//             <Modal show={modalBox} onHide={() => setModalBox(false)}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Confirm to Inactivate</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>Are you sure you want to Inactivate this designation?</Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setModalBox(false)}>Cancel</Button>
//                     <Button variant="danger" onClick={confirmDelete}>Inactive</Button>
//                 </Modal.Footer>
//             </Modal>

//             <ToastContainer />

//             <div className="offcanvas offcanvas-end customeoff addtask" tabIndex="-1" id="offcanvasExample1">
//                 <div className="offcanvas-header" style={{ backgroundColor: '#0047bb' }}>
//                     <h5 className="modal-title text-white">{formMode === 'edit' ? 'Edit Designation' : 'Add New Designation'}</h5>
//                     <button onClick={handleCancel} type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close">
//                         <i className="fa fa-close" style={{ color: 'white' }}></i>
//                     </button>
//                 </div>
//                 <div className="offcanvas-body">
//                     <div className="container-fluid">
//                     <form id="technology-form" className="row g-3" onSubmit={handleSubmit(onSubmit)}>

// <div className="col-md-12">
//     <label className="form-label">Designation Code <span className="text-danger">*</span></label>
//     <input
//         type="text"
//         className={`form-control ${errors.designation_code ? 'is-invalid' : ''}`}
//         {...register("designation_code", { required: "Designation Code is required" })}
//     />
//     {errors.designation_code && <span className="text-danger">{errors.designation_code.message}</span>}
// </div>

// <div className="col-md-12">
//     <label className="form-label">Designation Name <span className="text-danger">*</span></label>
//     <input
//         type="text"
//         className={`form-control ${errors.designation_name ? 'is-invalid' : ''}`}
//         {...register("designation_name", { required: "Designation Name is required" })}
//     />
//     {errors.designation_name && <span className="text-danger">{errors.designation_name.message}</span>}
// </div>

// <div className="col-md-12">
//     <label className="form-label">Status <span className="text-danger">*</span></label>
//     <select
//         className={`form-select ${errors.status ? 'is-invalid' : ''}`}
//         {...register("status", { required: "Status is required" })}
//     >
//         <option value="">Select</option>
//         <option value="1">Active</option>
//         <option value="0">Inactive</option>
//     </select>
//     {errors.status && <span className="text-danger">{errors.status.message}</span>}
// </div>
// </form>
//                 </div>
//                     <div className="add-page-container">
//                         {/* Other content */}
//                         <div className="footer-buttons d-flex justify-content-end gap-3">
//     <button
//         type="submit"
//         className="btn px-4 template-btn btn-primary">
//         {formMode === 'edit' ? 'Update' : 'Add'}
//     </button>
//     <button
//         type="button"
//         onClick={handleCancel}
//         className="btn btn-danger px-4">
//         Cancel
//     </button>
// </div>
//                     </div>
//                 </div>
//             </div>

//         </div>
//     );
// }

// export default Desigination;



import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrash } from 'react-icons/fa';
import { useForm } from "react-hook-form";

const dummyData = [
    { id: 1, designation_code: 'D001', designation_name: 'Manager', status: 'Active' },
    { id: 2, designation_code: 'D002', designation_name: 'Developer', status: 'Inactive' },
];
function Desigination() {
    const [designation, setDesignation] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [globalFilter, setGlobalFilter] = useState('');
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedDesignation, setSelectedDesignation] = useState(null);
    const [modalBox, setModalBox] = useState(false);
    const [designationToDelete, setDesignationToDelete] = useState(null);
    const [formMode, setFormMode] = useState("add");
    const [data, setData] = useState(dummyData);
    // const [formData, setFormData] = useState({
    //     designation_code: "",
    //     designation_name: "",
    //     status: "",
    // });
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm({
        defaultValues: {
            designation_code: "",
            designation_name: "",
            status: ""
        }
    });

    // const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchData();
    }, [pageIndex, pageSize, globalFilter]);

    // const userId = document.getElementById('desingination').getAttribute('data-user-id');
    const [userId, setUserId] = useState('')

    const fetchData = async () => {
        const params = {
            start: pageIndex * pageSize,
            per_page: pageSize,
            search_term: globalFilter,
            user_id: userId
        };

        try {
            const response = await axios.get('/api/designations', { params });
            setDesignation(response.data.aaData);
            setTotalCount(response.data.iTotalDisplayRecords);
        } catch (error) {
            console.error('Error fetching designation data:', error);
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

    const onSubmit = async (formData) => {
        try {
            const payload = {
                ...formData,
                user_id: userId
            };

            if (formMode === "edit" && selectedDesignation?.designation_id) {
                // Update existing designation
                await axios.put(`/api/designation/${selectedDesignation.designation_id}`, payload);
                toast.success("Designation updated successfully", {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
            } else {
                // Add new designation
                await axios.post("/api/designation", payload);
                toast.success("Designation added successfully", {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
            }

            // Refresh the table
            fetchData();

            // Reset form & close sidebar
            reset();
            toggleSidebar();
        } catch (error) {
            console.error("Error submitting designation form:", error);
            toast.error("Something went wrong. Please try again.", {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
        }
    };


    const handleEditBtn = (designation) => {
        setFormMode("edit");
        setSelectedDesignation(designation);

        setValue("designation_code", designation.designation_code || "");
        setValue("designation_name", designation.designation_name || "");
        setValue("status", designation.status?.toLowerCase() === "inactive" ? "0" : "1");

        toggleSidebar();
    };

    const handleDeleteBtn = (designation) => {
        setDesignationToDelete(designation);
        setModalBox(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`/api/designation/${designationToDelete.designation_id}`, {
                headers: {},
                data: { 'userId': userId }
            });
            fetchData();
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
                icon: <FaTrash />,
                className: 'custom-toast-delete', // Apply custom class
                bodyClassName: 'custom-toast-body-delete', // Optional: Apply custom class to the body if needed
                closeButton: false
            });
        } catch (error) {
            console.error('Error deleting designation:', error);
        } finally {
            setModalBox(false);
            setDesignationToDelete(null);
        }
    };

    const columns = [
        { name: '#', selector: row => row.id, sortable: true },
        { name: 'Designation Code', selector: row => row.designation_code, sortable: true },
        { name: 'Designation Name', selector: row => row.designation_name, sortable: true },
        { name: 'Status', selector: row => row.status, sortable: true },
        {
            name: 'Actions',
            cell: (row) => (
                <>
                    <Button variant="info" size="sm" className="me-2" onClick={() => handleEditBtn(row)}
                        style={{ background: "none", border: "none", outline: "none", cursor: "pointer", fontSize: "1rem", color: "blue" }}>
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDeleteBtn(row)}
                        style={{ background: "none", border: "none", outline: "none", cursor: "pointer", fontSize: "1rem", color: "red" }}>
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </>
            )
        }
    ];

    const handlePageSizeChange = (e) => {
        const newSize = Number(e.target.value);
        setPageSize(newSize);
        setPageIndex(0);
    };

    const handleAddButtonClick = () => {
        setFormMode("add");
        setSelectedDesignation(null);
        const sidebar = document.getElementById('offcanvasExample1');
        if (sidebar) {
            sidebar.classList.toggle('show');
        }
    };

    // const toggleSidebar = () => {
    //     const sidebar = document.getElementById('offcanvasExample1');
    //     if (sidebar) {
    //         sidebar.classList.toggle('show');
    //     }
    // };

    const onPageChanged = (newPage) => {
        setCurrentPage(newPage);
        setPageIndex(newPage);
    };

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({
    //         ...formData,
    //         [name]: value
    //     });

    //     setErrors(prevErrors => ({
    //         ...prevErrors,
    //         [name]: ''
    //     }));
    // }

    const handleCancel = () => {
        reset();
        toggleSidebar();
    };

    return (
        <div className="table-container" style={{ overflowX: 'hidden', overflowY: 'hidden', width: '100%', padding: '70px' }}>

            {/* <div className="page-breadcrumb d-flex align-items-center mb-3">
                <div className="ps-0">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 p-0">
                            <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Designations</li>
                        </ol>
                    </nav>
                </div>
            </div> */}

            <div className="row">
                <div className="col-12">
                    <div className="btm-for mb-4 d-flex justify-content-end">
                        <div className="btn-group">
                            <button
                                type="button"
                                className="btn template-btn px-5 btn-primary"
                                onClick={handleAddButtonClick}>
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="title-head d-flex justify-content-between">
                <h6 className="mb-0 text-uppercase">Designations</h6>
            </div>

            <hr />

            <div className="p-4 bg-white rounded-lg shadow">
                <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                    <div className="d-flex flex-wrap align-items-center gap-2 ms-auto">
                        <span>Search:</span>
                        <input
                            className="form-control"
                            style={{
                                padding: "6px 12px",
                                borderRadius: "4px",
                                border: "1px solid #ced4da",
                                width: "200px", /* Fixed width for all screen sizes */
                                maxWidth: "100%" /* Prevent overflow on small screens */
                            }}
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            placeholder="Search..."
                        />
                    </div>
                </div>

                <DataTable
                    columns={columns}
                    data={data}
                    pagination
                    highlightOnHover
                    striped
                />
            </div>

            <Modal show={modalBox} onHide={() => setModalBox(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm to Inactivate</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to Inactivate this designation?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalBox(false)}>Cancel</Button>
                    <Button variant="danger" onClick={confirmDelete}>Inactive</Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer />

            <div className="offcanvas offcanvas-end customeoff addtask" tabIndex="-1" id="offcanvasExample1">
                <div className="offcanvas-header" style={{ backgroundColor: '#0047bb' }}>
                    <h5 className="modal-title text-white">{formMode === 'edit' ? 'Edit Designation' : 'Add New Designation'}</h5>
                    <button onClick={handleCancel} type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close">
                        <i className="fa fa-close" style={{ color: 'white' }}></i>
                    </button>
                </div>
                <div className="offcanvas-body">
                    <div className="container-fluid">
                        <form id="designation-form" className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                            <div className="col-md-12">
                                <label className="form-label">Designation Code <span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.designation_code ? 'is-invalid' : ''}`}
                                    {...register("designation_code", { required: "Designation Code is required" })}
                                />
                                {errors.designation_code && <span className="text-danger">{errors.designation_code.message}</span>}
                            </div>

                            <div className="col-md-12">
                                <label className="form-label">Designation Name <span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.designation_name ? 'is-invalid' : ''}`}
                                    {...register("designation_name", { required: "Designation Name is required" })}
                                />
                                {errors.designation_name && <span className="text-danger">{errors.designation_name.message}</span>}
                            </div>

                            <div className="col-md-12">
                                <label className="form-label">Status <span className="text-danger">*</span></label>
                                <select
                                    className={`form-select ${errors.status ? 'is-invalid' : ''}`}
                                    {...register("status", { required: "Status is required" })}
                                >
                                    <option value="">Select</option>
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </select>
                                {errors.status && <span className="text-danger">{errors.status.message}</span>}
                            </div>
                        </form>
                    </div>
                    <div className="add-page-container">
                        {/* Other content */}
                        <div className="footer-buttons">
                            <div className="d-md-flex d-flex d-grid align-items-center gap-3 justify-content-end">
                                <button
                                    type="submit"
                                    form="designation-form"  // This connects the button to the form
                                    className="btn px-4 template-btn btn-primary">
                                    {formMode === 'edit' ? 'Update' : 'Add'}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="btn btn-danger px-4">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Desigination;
