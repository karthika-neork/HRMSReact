import React, { useState, useMemo, useEffect } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
// import RolesAdd from "./RolesAdd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
import { toast, ToastContainer, Bounce } from 'react-toastify';
// import './Role.css'
import { FaTrash } from "react-icons/fa";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
// import PermissionCheck from "./PermissionCheck";
function Role() {
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [globalFilter, setGlobalFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [roles, setRoles] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [formMode, setFormMode] = useState("add");
    const [roleToDelete, setRoleToDelete] = useState(null);
    const [modalBox, setModalBox] = useState(false);

    const [selectedRole, setSelectedRole] = useState(null); // State to hold selected role for editing
    const [permissions, setPermissions] = useState({});

    const [roleData,setRoleData]=useState({})
    
    // const userId = document.getElementById('role1').getAttribute('data-user-id');

const [userId ,setUserId]=useState('')
    useEffect(() => {
        fetchRoles();
    }, [currentPage, pageSize, globalFilter]);

    const fetchRoles = async () => {

        try {
            const response = await axios.get("/api/roles", {
                params: {
                    start: currentPage * pageSize,
                    per_page: pageSize,
                    search_term: globalFilter,
                    user_id: userId
                },
            });

            setRoles(response.data.aaData);
            setTotalCount(response.data.iTotalDisplayRecords);
        } catch (error) {
            console.error("Error fetching roles:", error);
        }
    };

    
    const fetchPermissions = async () => {
        try {
            const response = await axios.get(`/api/permissions`, {
                headers: {
                    'userId': userId,
                }
            });
    
            console.log("Permissions data received:", response.data);
    
            if (response.data && response.data.permissions) {
                console.log("Permissions:", response.data.permissions);
                setPermissions(response.data.permissions);
            } else {
                console.log("Permissions data is not in expected format:", response.data);
            }
        } catch (error) {
            console.error("Error fetching permissions:", error);
        }
    };
    

    const handleEditBtn = async (roles) => {
        try {

            const response = await axios.get(`/api/role/${roles.role_id}`, {
                headers: {
                    'userId': userId,
                    'roleId': roles.role_id
                }
            });
    
            console.log("Clicked by the ID:", roles.role_id);
            console.log('Fetched role details:', response.data);
    
            await fetchPermissions();
    console.log("edit btn",response.data.permissions);

    //res to premissionCheck
    setRoleData(response.data.permissions)

            setSelectedRole(roles);
            setFormMode("edit");
            toggleSidebar();
        } catch (error) {
            console.error("Error editing role:", error);
        }
    };
    
    //Delete Function
    const handleDeleteBtn = (roles) => {
        alert(roles.role_id)
        setRoleToDelete(roles);
        setModalBox(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`/api/role/${roleToDelete.role_id}`, {
                headers: { 'userId': userId },
            });
            fetchRoles();
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
            console.error('Error deleting technology:', error);
        } finally {
            setModalBox(false);
            setRoleToDelete(null);
        }
    };



    const toggleSidebar = () => {
        const sidebar = document.getElementById('offcanvasExample1');
        if (sidebar) {
            sidebar.classList.toggle('show');
        }
    };

    const columns = useMemo(() => [
        {
            headerName: "#",
            valueGetter: (params) => currentPage * pageSize + (params.node.rowIndex + 1),
            sortable: false,
        },
        { headerName: "Role Name", field: "name", width: 330 },
        { headerName: "Description", field: "description", width: 330 },
        {
            headerName: 'Action',
            field: 'action',
            width: 330,
            sortable: false,
            cellRendererFramework: (params) => (
                // <a  dangerouslySetInnerHTML={{ __html: params.value }}></a>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <a className="cursor-pointer me-2" onClick={() => handleEditBtn(params.data)}>
                        <FontAwesomeIcon icon={faEdit} />
                    </a>
                   
                    <a className="cursor-pointer text-danger ms-2 custom-icon"
                        onClick={() => handleDeleteBtn(params.data)}> 
                        <FontAwesomeIcon icon={faTimes} />
                    </a>
                </div>
            ),
        },
    ], [currentPage, pageSize]);


    const handlePageSizeChange = (e) => {
        const newSize = Number(e.target.value);
        setPageSize(newSize);
        setPageIndex(0);
    };

    const onPageChanged = (newPage) => {
        setCurrentPage(newPage);
        setPageIndex(newPage);
    };

    const defaultColDef = {
        sortable: true,
        filter: true,
    };

    //Add button 
const handleAddButtonClick = async () => {
    await fetchPermissions();
    setFormMode("add");

    const sidebar = document.getElementById('offcanvasExample1');
    if (sidebar) {
        sidebar.classList.toggle('show');
    } else {
        console.error('Sidebar element not found.');
    }
};


    return (
        <div className="table-container" style={{ overflowX: 'hidden', overflowY: 'hidden' }}>
            {/* <Header/> */}
            {/* <SubHeader/> */}
            {/* <RolesAdd 
            permissions={permissions}
             fetchRoles={fetchRoles}
             mode={formMode}
              roles={selectedRole} 
              roleData={roleData}
              /> */}


                 <div className="page-breadcrumb d-flex align-items-center mt-3 ms-3">
                <div className="ps-0">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 p-0">
                            <li className="breadcrumb-item"><a href="/home">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Role</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="row me-2">
                <div className="col-lg-12">
                    <div className="btm-for mb-4  text-lg-end">
                        <div className="ms-auto">
                            <div className="btn-group">
                                <button type="button" className="btn template-btn px-5 btn-primary" onClick={ handleAddButtonClick}>
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="title-head d-flex justify-content-between ms-3">
                <h6 className="mb-0 text-uppercase">Roles</h6>
            </div>
            <hr />

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

            <div className="ag-theme-alpine ag-grid-custom" style={{ width: '100%', fontSize: '16px' }}>
                <AgGridReact
                    rowData={roles}
                    columnDefs={columns}
                    defaultColDef={defaultColDef}
                    domLayout='autoHeight'
                />
            </div>

            <div className='text-end  mt-2 me-3'>
                <button className='btn btn-white' onClick={() => onPageChanged(currentPage - 1)} disabled={pageIndex === 0}>
                    {'<'} Prev
                </button>
                {[...Array(Math.ceil(totalCount / pageSize))].map((_, index) => (
                    <button
                        key={index}
                        className={`btn ${currentPage === index ? 'btn-primary' : 'btn-white'}`}
                        onClick={() => onPageChanged(index)}>
                        {index + 1}
                    </button>
                ))}
                <button className='btn btn-white' onClick={() => onPageChanged(currentPage + 1)} disabled={(currentPage + 1) * pageSize >= totalCount}>
                    Next {'>'}
                </button>
            </div>

            <div className="text-start ms-2 mb-2">
                Showing {currentPage * pageSize + 1} to {Math.min((currentPage + 1) * pageSize, totalCount)} of {totalCount} entries
            </div>

            <Modal show={modalBox} onHide={() => setModalBox(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm to Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this role?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalBox(false)}>Cancel</Button>
                    <Button variant="danger" onClick={confirmDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer />

        </div>
    );
}

// if (document.getElementById("role1")) {
//     createRoot(document.getElementById("role1")).render(<Role />);
// }

export default Role;


