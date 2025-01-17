import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrash, FaCheckCircle } from "react-icons/fa";
import "../commonStyle/Home.css";

function Technologies() {
    const [pageSizeOptions] = useState([5, 10, 20, 30]);
    const [pageSize, setPageSize] = useState(10);
    const [globalFilter, setGlobalFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [technologies, setTechnologies] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [formMode, setFormMode] = useState("add");
    const [technologyToDelete, setTechnologyToDelete] = useState(null);
    const [modalBox, setModalBox] = useState(false);
    const [userId, setUserId] = useState('');
    const [formData, setFormData] = useState({
        technology_name: "",
        status: "",
        technology_id: ""
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchTechnologies();
    }, [currentPage, pageSize, globalFilter]);

    const fetchTechnologies = async () => {
        const params = {
            start: currentPage * pageSize,
            per_page: pageSize,
            search_term: globalFilter,
            user_id: userId
        }

        try {
            const response = await axios.get("/api/technologies", { params });
            setTechnologies(response.data.aaData);
            setTotalCount(response.data.iTotalDisplayRecords);
        } catch (error) {
            console.error("Error fetching technologies:", error);
        }
    };

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
        const validationErrors = {};
        if (!formData.technology_name?.trim()) {
            validationErrors.technology_name = "Technology name cannot be empty";
        }
        if (formData.status === '' || formData.status === undefined) {
            validationErrors.status = "Status cannot be empty";
        }
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                if (formMode === 'edit') {
                    await axios.put(`/api/technology`, {
                        technology_name: formData.technology_name,
                        status: formData.status,
                        userId: userId,
                        techId: formData.technology_id
                    }, {
                        headers: {
                            'userId': userId,
                            'techId': formData.technology_id
                        }
                    });
                    toast.info('Updated Successfully', {
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
                    await axios.post('/api/technology', formData, {
                        headers: {
                            'userId': userId
                        }
                    });
                    toast.success('Added Successfully', {
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
                }
                fetchTechnologies();
                toggleSidebar();
            } catch (error) {
                console.error('Error saving technology:', error);
            }
        }
    };

    const handleEditBtn = async (technology) => {
        try {
            const response = await axios.get(`api/technology/${technology.technology_id}`, {
                headers: {
                    'userId': userId,
                    'techId': technology.technology_id
                }
            });
            setFormData({
                technology_id: technology.technology_id,
                technology_name: technology.technology_name,
                status: technology.status === 'Inactive' ? '0' : '1'
            });
            setFormMode("edit");
            toggleSidebar();
        } catch (error) {
            console.error("Error editing technology:", error);
        }
    }

    const handleDeleteBtn = (technology) => {
        setTechnologyToDelete(technology);
        setModalBox(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`/api/technology/${technologyToDelete.technology_id}`, {
                headers: { 'userId': userId },
            });
            fetchTechnologies();
            toast.error('Inactivated Successfully', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Bounce,
                icon: <FaTrash />,
                className: 'custom-toast-delete',
                bodyClassName: 'custom-toast-body-delete',
                closeButton: false
            });
        } catch (error) {
            console.error('Error deleting technology:', error);
        } finally {
            setModalBox(false);
            setTechnologyToDelete(null);
        }
    };

    const toggleSidebar = () => {
        const sidebar = document.getElementById('offcanvasExample1');
        if (sidebar) {
            sidebar.classList.toggle('show');
        }
    };

    const handleCancel = () => {
        setFormData({
            technology_name: '',
            status: '',
            technology_id: ''
        });
        setErrors({});
        toggleSidebar();
    };

    const handleAddButtonClick = () => {
        setFormMode("add");
        setFormData({
            technology_name: '',
            status: '',
            technology_id: ''
        });
        toggleSidebar();
    }

    const columns = [
        {
          headerName: "#",
          width: 100,
          valueGetter: (params) =>
            currentPage * pageSize + (params.node.rowIndex + 1),
        },
        { headerName: "Technology", field: "technology_name", width: 350 },
        { headerName: "Status", field: "status", width: 400 },
        {
          headerName: "Actions",
          field: "actions",
          width: 300,
          cellRendererFramework: (params) => (
            <div>
              <FontAwesomeIcon
                icon={faEdit}
                onClick={() => handleEditBtn(params.data)}
              />
              {params.data.status === "Active" && (
                <Button
                  className="ms-3 btn-danger"
                  onClick={() => {
                    setTechnologyToDelete(params.data);
                    setModalBox(true);
                  }}
                >
                  Inactive
                </Button>
              )}
            </div>
          ),
        },
      ];
    return (
        <div className="table-container" style={{ overflowX: 'hidden', overflowY: 'hidden', width: '100%', padding: '70px' }}>
            <div className="page-breadcrumb d-flex align-items-center mb-3">
                <div className="ps-0">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 p-0">
                            <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Technologies</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12">
                    <div className="btm-for mb-4 text-lg-end">
                        <div className="ms-auto">
                            <div className="btn-group">
                                <button
                                    type="button"
                                    className="btn template-btn px-5 btn-primary"
                                    onClick={handleAddButtonClick}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="title-head d-flex justify-content-between">
                <h6 className="mb-0 text-uppercase">Technologies</h6>
            </div>

            <hr />
            <div className="p-6 bg-white rounded-lg shadow" style={{ padding: '20px' }}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="text-start ms-2" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <span>Show</span>
                        <select
                            className="form-control"
                            style={{
                                width: "150px",
                                height: "100%",
                                margin: "2px",
                                borderRadius: "8px",
                                border: 'none solid 2px'
                            }}
                            value={pageSize}
                            onChange={(e) => setPageSize(Number(e.target.value))}
                        >
                            {pageSizeOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-center text-end mb-3 me-3">
                        <input
                            className="form-control"
                            style={{ width: '100%' }}
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            placeholder="Search..."
                        />
                    </div>
                </div>

                <div className="ag-theme-alpine ag-grid-custom" style={{ width: '100%', fontSize: '16px' }}>
                    <AgGridReact
                        rowData={technologies}
                        columnDefs={columns}
                        domLayout="autoHeight"
                    />
                </div>

                <div className="text-end me-2 mt-3">
                    <button
                        className="btn btn-white"
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        disabled={currentPage === 0}
                    >
                        Prev
                    </button>

                    {[...Array(Math.ceil(totalCount / pageSize))].map((_, index) => (
                        <button
                            key={index}
                            className={`btn ${currentPage === index ? "btn-primary" : "btn-white"}`}
                            onClick={() => setCurrentPage(index)}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        className="btn btn-white"
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        disabled={(currentPage + 1) * pageSize >= totalCount}
                    >
                        Next
                    </button>
                </div>

                <div className="text-start ms-2 mb-2">
                    Showing {currentPage * pageSize + 1} to {Math.min((currentPage + 1) * pageSize, totalCount)} of {totalCount} entries
                </div>
            </div>

            {/* Sidebar for Add/Edit */}
            <div className="offcanvas offcanvas-end customeoff addtask" tabIndex="-1" id="offcanvasExample1">
                <div className="offcanvas-header" style={{ backgroundColor: 'blue' }}>
                    <h5 className="modal-title">{formMode === 'edit' ? 'Edit Technology' : 'Add New Technology'}</h5>
                    <button onClick={handleCancel} type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close">
                    <i className="fa fa-close" style={{ color: 'white' }}></i>
                    </button>
                </div>
                <div className="offcanvas-body">
                    <div className="container-fluid">
                        <form onSubmit={handleSubmit} id="technology-form" className="row g-3 needs-validation">
                            <div className="col-md-12">
                                <label htmlFor="technology_name" className="form-label">Technology Name <span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="technology_name"
                                    name="technology_name"
                                    placeholder="Technology Name"
                                    value={formData.technology_name}
                                    onChange={handleChange}
                                />
                                {errors.technology_name && <span className="text-danger">{errors.technology_name}</span>}
                            </div>
                            <div className="col-md-12">
                                <div className="custom__form__inputs">
                                    <label htmlFor="status" className="form-label">Status <span className="text-danger">*</span></label>
                                    <div className="">
                                        <select
                                            className="form-select"
                                            id="status"
                                            name="status"
                                            value={formData.status}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select</option>
                                            <option value="1">Active</option>
                                            <option value="0">Inactive</option>
                                        </select>
                                    </div>
                                    {errors.status && <span className="text-danger">{errors.status}</span>}
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="add-page-container">
    {/* Other content */}
    <div className="footer-buttons">
        <div className="d-md-flex d-flex d-grid align-items-center gap-3 justify-content-end">
            <button 
                onClick={fetchTechnologies} 
                type="submit" 
                form="technology-form" 
                className="btn px-4 template-btn btn-primary">
                {fetchTechnologies === 'edit' ? 'Update' : 'Add'}
            </button>
            <button 
                onClick={handleCancel} 
                className="btn btn-danger px-4" 
                type="button" 
                data-bs-dismiss="offcanvas" 
                aria-label="Close">
                Cancel
            </button>
        </div>
    </div>
</div>
                </div>
            </div>
        </div>
    );
};

{/* if (document.getElementById("technoAddBtn")) {
    createRoot(document.getElementById("technoAddBtn")).render(<TechnologyAdd />); */}
export default Technologies;

