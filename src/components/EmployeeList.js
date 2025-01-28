import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faEdit, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FaTrash } from 'react-icons/fa';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import FileUploadWithPreview from './FileUploadWithPreview';

function EmployeeList() {
    const [employeelist, setEmployeeList] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [pageSizeOptions] = useState([5, 10, 20, 30]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(0);

    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showAddComponent, setShowAddComponent] = useState(false);
    const [showEmployeeList, setShowEmployeeList] = useState(true); // New state for listing page
    const [formMode, setFormMode] = useState("add");

    // const userId = document.getElementById('employee_list').getAttribute('data-user-id');
    const [userId, setUserId] = useState('')
    const fetchEmployeesList = async () => {
        try {
            const response = await axios.get("/api/employee-list", {
                params: {
                    start: currentPage * pageSize,
                    per_page: pageSize,
                    search_term: globalFilter,
                    user_id: userId
                },
            });
            console.log("Response from backend:", response.data);
            setEmployeeList(response.data.aaData);
            setTotalCount(response.data.iTotalDisplayRecords);
        } catch (error) {
            console.error("Error fetching EmployeesList:", error);
        }
    };

    useEffect(() => {
        fetchEmployeesList();
    }, [currentPage, pageSize, globalFilter]);

    const handleEditBtn = async (employeelist) => {
        alert(employeelist.user_id);
        try {
            const response = await axios.get(`api/employee/${employeelist.user_id}`, {
                headers: {
                    'userId': userId,
                    'employeeId': employeelist.user_id
                }
            });
            setSelectedEmployee(response.data);
            setShowAddComponent(true);
            setShowEmployeeList(false); // Hide the list when editing
            setFormMode("edit");
            console.log('response.data', response.data.employee_doc_infos);

            console.log('edit employeeList details:', response.data);
            fetchEmployeesList();
        } catch (error) {
            console.error("Error editing employeeList:", error);
        }
    };

    const handleDeleteBtn = async (employeelist) => {
        alert(employeelist.user_id);
        try {
            const response = await axios.delete(`api/employee/${employeelist.user_id}`, {
                headers: {
                    'userId': employeelist.user_id,
                }
            });
            console.log("clicked by the ID:", userId);
            console.log('Fetched employeeList details:', response.data);
            fetchEmployeesList();
            setSelectedEmployee(employeelist);
            toast.error('Deleted Successfully', {
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
                className: 'custom-toast-delete',
                bodyClassName: 'custom-toast-body-delete',
                closeButton: false
            });

        } catch (error) {
            console.error("Error deleting employeeList:", error);
        }
    };

    const columns = [
        { headerName: "#", valueGetter: (params) => currentPage * pageSize + (params.node.rowIndex + 1), sortable: true },
        { headerName: "EMP-CODE", field: "employee_code", sortable: true },
        { headerName: "Name", field: "name", sortable: true },
        { headerName: "DESIGNATION", field: "designation_name", sortable: true },
        { headerName: "JOINED DATE", field: "date_of_joining", sortable: true },
        { headerName: "Status", field: "status", sortable: true },
        {
            headerName: 'Action',
            field: 'action',
            cellRendererFramework: (params) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button className="cursor-pointer me-2" onClick={() => handleEditBtn(params.data)}>
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <a className="cursor-pointer text-danger ms-2 custom-icon"
                        onClick={() => handleDeleteBtn(params.data)}>
                        <FontAwesomeIcon icon={faTimes} />
                    </a>
                    <a className="cursor-pointer text-danger ms-2 custom-icon"
                        onClick={() => handleDeleteBtn(params.data)}>
                        <FontAwesomeIcon icon={faClock} />
                    </a>
                </div>
            ),
        },
    ];

    const changePageSize = (size) => {
        setPageSize(size);
        setCurrentPage(0);
    };

    const previousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if ((currentPage + 1) * pageSize < totalCount) {
            setCurrentPage(currentPage + 1);
        }
    };

    const canPreviousPage = currentPage > 0;
    const canNextPage = (currentPage + 1) * pageSize < totalCount;

    const firstRowIndex = currentPage * pageSize + 1;
    const lastRowIndex = Math.min((currentPage + 1) * pageSize, totalCount);

    const handleAddPage = () => {
        setFormMode("Add");
        setShowAddComponent(true);
    };

    // Handle the cancel or close action
    //   const handleClose = () => {
    //     setShowAddComponent(false);
    //     setShowEmployeeList(true); // Show the table again
    // };

    return (
        <div className="table-container" style={{ overflowX: 'hidden', overflowY: 'hidden', width: '100%', padding: '30px' }}>
            {/* <FileUploadWithPreview/> */}
            {/* {showAddComponent && <EmployeeAdd 
                userId={userId} 
                fetchEmployeesList={fetchEmployeesList} 
                onClose={() => {
                    setShowAddComponent(false);
                    setShowEmployeeList(true); // Show the list when closing the form
                }} 
                mode={formMode} 
                employeelist={selectedEmployee} 
            />} */}

            {/* {showEmployeeList && ( */}
            <>
                <div className="title-head d-flex justify-content-between">
                    <h6 className="mb-0 text-uppercase">EMPLOYEE LIST</h6>
                </div>

                <hr />

                <div className="row">
                    <div className="col-lg-12">
                        <div className="btm-for mb-4 text-lg-end">
                            <div className="ms-auto">
                                <div className="btn-group">
                                    <Button href='add-employee' className="btn template-btn px-5" onClick={handleAddPage}>
                                        Add
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='p-6 bg-white rounded-lg shadow' style={{ padding: '20px' }}>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="text-start ms-2">
                            <span>Show</span>
                            <select
                                className="mx-2"
                                value={pageSize}
                                onChange={(e) => changePageSize(Number(e.target.value))}
                            >
                                {pageSizeOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            <span>entries</span>
                        </div>

                        <div className="flex justify-center text-end mb-3 me-3" >
                            <input className='form-control' style={{ width: '100%' }}
                                value={globalFilter}
                                onChange={(e) => setGlobalFilter(e.target.value)}
                                placeholder="Search..." />
                        </div>
                    </div>

                    <div className="ag-theme-alpine" style={{ width: '100%', fontSize: '16px' }}>
                        <AgGridReact
                            columnDefs={columns}
                            rowData={employeelist}
                            domLayout='autoHeight'
                            defaultColDef={{ flex: 1, minWidth: 100 }}
                        />
                    </div>

                    <div className="text-end me-2 ">
                        <button className="btn btn-white" onClick={previousPage} disabled={!canPreviousPage}>
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
                        <button className="btn btn-white" onClick={nextPage} disabled={!canNextPage}>
                            Next
                        </button>
                    </div>

                    <div className="text-start ms-2 mb-2">
                        Showing {firstRowIndex} to {lastRowIndex} of {totalCount} entries
                    </div>
                </div>

            </>
            {/* )} */}
            <ToastContainer />
        </div>
    );
}


export default EmployeeList;
