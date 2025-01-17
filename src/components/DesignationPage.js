import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
// import DesigntnAddBtn from './DesigntnAddBtn';
// import './Desigination.css';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrash } from 'react-icons/fa';

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

    useEffect(() => {
        fetchData();
    }, [pageIndex, pageSize, globalFilter]);

    // const userId = document.getElementById('desingination').getAttribute('data-user-id');
const [userId ,setUserId]=useState('')

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

    const handleEditBtn = async (designation) => {
        try {
            const response = await axios.get(`/api/designation/${designation.designation_id}`, {
                headers: {
                    'userId': userId,
                    'desigId': designation.designation_id
                }
            });
            console.log('Fetched designation details:', response.data);
            setSelectedDesignation(designation);
            // console.log(toggleSidebar);

            setFormMode("edit");
            toggleSidebar()
            // const sidebar = document.getElementById('offcanvasExample1');
            // if (sidebar) {
            //     sidebar.classList.toggle('show');
            // }
        } catch (error) {
            console.error('Error fetching designation details:', error);
        }
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
                icon:<FaTrash/>,
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

    const columnDefs = useMemo(() => [
        {
            headerName: "#",
            field: 'index',
            valueGetter: (params) => currentPage * pageSize + (params.node.rowIndex + 1),
            sortable: true,
            width: 80
        },
        { headerName: 'Designation Code', field: 'designation_code', width: 300, sortable: true },
        { headerName: 'Designation Name', field: 'designation_name', width: 300, sortable: true },
        { headerName: 'Status', field: 'status', width: 300, sortable: true },
        {
            headerName: 'Actions',
            field: 'action',
            cellRendererFramework: (params) => {
                if (params.data.status === 'Active') {
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
            sortable: false,
            width: 150,
        },
    ], [currentPage, pageSize]);

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

    const onPageChanged = (newPage) => {
        setCurrentPage(newPage);
        setPageIndex(newPage);
    };

    return (
        <div className="table-container" style={{ overflowX: 'hidden', overflowY: 'hidden' ,width:'100%',padding:'70px'}}>

            {/* <DesigntnAddBtn
                designation={selectedDesignation}
                mode={formMode}
                fetchData={fetchData}
            /> */}

            <div className="page-breadcrumb d-flex align-items-center mb-3">
                <div className="ps-0">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 p-0">
                            <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Designations</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12">
                    <div className="btm-for mb-4 text-lg-end">
                        <div className="ms-auto">
                            <div className="btn-group">
                                <button type="button" className="btn template-btn px-5 btn-primary" onClick={handleAddButtonClick}>
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="title-head d-flex justify-content-between">
                <h6 className="mb-0 text-uppercase">Designations</h6>
            </div>

            <hr />

            <div className='p-6 bg-white rounded-lg shadow' style={{padding:'20px'}}>
                <div className="d-flex justify-content-between align-items-center mb-4 ">
                    <div className="d-flex align-items-center gap-2">
                        <span>Show</span>
                        <select
                            className="form-select"
                            style={{
                                width: "80px",
                                padding: "6px 12px",
                                borderRadius: "4px",
                                border: "1px solid #ced4da"
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
                        <span>Entries</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <span>Search:</span>
                        <input
                            className="form-control"
                            style={{
                                padding: "6px 12px",
                                borderRadius: "4px",
                                border: "1px solid #ced4da",
                                width: "200px"
                            }}
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            placeholder="Search..."
                        />
                    </div>
                </div>

                <div 
                    className="ag-theme-alpine" >
                    <AgGridReact
                        rowData={designation}
                        columnDefs={columnDefs}
                        domLayout='autoHeight'
                    />
                </div>

                <div className="d-flex justify-content-between align-items-center mt-4">
                    <div className="text-muted">
                        Showing {currentPage * pageSize + 1} to {Math.min((currentPage + 1) * pageSize, totalCount)} of {totalCount} entries
                    </div>
                    <div className="d-flex gap-2">
                        <button 
                            className="btn btn-outline-secondary"
                            onClick={() => onPageChanged(currentPage - 1)} 
                            disabled={pageIndex === 0}
                        >
                            Prev
                        </button>
                        {[...Array(Math.ceil(totalCount / pageSize))].map((_, index) => (
                            <button
                                key={index}
                                className={`btn ${currentPage === index ? 'btn-primary' : 'btn-outline-secondary'}`}
                                onClick={() => onPageChanged(index)}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button 
                            className="btn btn-outline-secondary"
                            onClick={() => onPageChanged(currentPage + 1)} 
                            disabled={(currentPage + 1) * pageSize >= totalCount}
                        >
                            Next
                        </button>
                    </div>
                </div>
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
        </div>
    );
}

// if (document.getElementById('desingination')) {
//     createRoot(document.getElementById('desingination')).render(<Desigination />);
// }

export default Desigination;
