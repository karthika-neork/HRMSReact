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
import DataTable from 'react-data-table-component';
import { FaEye } from "react-icons/fa";
import { FaCheckCircle } from 'react-icons/fa';
import RolePermission from "./RolePermission";

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

  const [roleData, setRoleData] = useState({})
  const [filterText, setFilterText] = useState('');
  // const userId = document.getElementById('role1').getAttribute('data-user-id');
  const [formData, setFormData] = useState({ name: "", description: "", permissions: [], role_id: "" });
  const [errors, setErrors] = useState({});

  const [userId, setUserId] = useState('')
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
      console.log("edit btn", response.data.permissions);

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


  const columns = [
    {
      name: "#",
      selector: (row, index) => (currentPage - 1) * pageSize + index + 1,
      sortable: false,
      width: '120px'
    },
    {
      name: "Role Name",
      selector: row => row.name,
      sortable: true,
      width: '350px'
    },
    {
      name: "Description",
      selector: row => row.description,
      sortable: true,
      width: '600px'
    },
    {
      name: "Action",
      cell: row => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <a className="cursor-pointer me-2" onClick={() => handleEditBtn(row)}>
            <FontAwesomeIcon icon={faEdit} />
          </a>
          <a className="cursor-pointer text-danger ms-2 custom-icon"
            onClick={() => handleDeleteBtn(row)}>
            <FontAwesomeIcon icon={faTimes} />
          </a>
          <a className="cursor-pointer text-primary ms-2 custom-icon"><FaEye /></a>
        </div>
      ),
      width: '130px'
    }
  ];
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

  useEffect(() => {

    if (roles) {
      setFormData({
        role_id: roles.role_id,
        name: roles.name,
        description: roles.description,
        permissions: roles.permissions || [] // Default to an empty object if undefined
      });
      console.log(permissions);

    } else {
      setFormData({
        name: "",
        description: "",
        permissions: [],
        role_id: ""
      });

    }
    console.log("Editing mode, roles:", roles);
    console.log("Initialized formData:", formData);
  }, [roles]);



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
  };

  const handlePermissionsChange = (selectedPermissionsArray) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      permissions: selectedPermissionsArray
    }));
  };

  // useEffect(() => {
  console.log("formData.permissions:", formData.permissions);
  // }, [formData.permissions]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data on submit:', formData);

    const validationErrors = {};
    if (!formData.name?.trim()) {
      validationErrors.name = "Role name cannot be empty";
    }
    if (!formData.description?.trim()) {
      validationErrors.description = "Description cannot be empty";
    }
    // Ensure permissions is always an array
    if (!Array.isArray(formData.permissions)) {
      validationErrors.permissions = "Permissions must be an array";
    }
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const roleDataa = {
          name: formData.name,
          description: formData.description,
          permissions: Array.isArray(formData.permissions) ? formData.permissions : []  // Ensure permissions is an array
        };
        console.log(roleData);
        if ('edit') {
          await axios.put(`/api/role/${formData.role_id}`, roleDataa, {
            headers: {
              'userId': userId,
              'roleId': formData.role_id
            }
          });
          toast.info('Role updated successfully', {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Bounce,
            icon: <FaCheckCircle />,
            className: 'custom-toast',
            bodyClassName: 'custom-toast-body',
            closeButton: true


          });

        } else {
          await axios.post('/api/role', roleDataa, {
            headers: {
              'userId': userId
            }
          });
          toast.info('Role added successfully', {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Bounce,
            icon: <FaCheckCircle />,
            className: 'custom-toast',
            bodyClassName: 'custom-toast-body',
            closeButton: true
          });
        }
        // Reset form data and close sidebar
        setFormData({ name: "", description: "", permissions: [] });
        fetchRoles();
        toggleSidebar();
      } catch (error) {
        console.error('Error saving roles:', error);
      }
    }
  };

  const handleCancel = () => {
    const sidebar = document.getElementById('offcanvasExample1');

    setFormData({ name: "", description: "", permissions: {} });
    setErrors({});
    toggleSidebar();
  };

  const sampleRoles = [
    {
      role_id: 1,
      name: "Administrator",
      description: "Has full access to all system features and settings.",
      permissions: ["view_users", "edit_users", "delete_users", "manage_roles"],
    },
    {
      role_id: 2,
      name: "Editor",
      description: "Can edit content but has limited access to system settings.",
      permissions: ["view_content", "edit_content"],
    },
  ];
  
  
  return (
    <div className="table-container" style={{ overflowX: 'hidden', overflowY: 'hidden', width: '100%', padding: '30px' }}>
      <div className="row">
        <div className="col-6">
          <div className="title-head d-flex justify-content-between ms-3">
            <h6 className="mb-0 text-uppercase">Roles</h6>
          </div>
        </div>
        <div className="col-6 d-flex justify-content-end">
          <div className="btn-group">
            <button type="button" className="btn template-btn px-5 btn-primary" onClick={handleAddButtonClick}>
              Add
            </button>
          </div>
        </div>
      </div>

      <div className='p-6 bg-white rounded-lg shadow mt-5' style={{ padding: '20px' }}>
        <div className="d-flex justify-content-end mb-2">
          <input
            className='form-control w-25'
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
          />
        </div>
        <DataTable
          columns={columns}
          data={sampleRoles}
          pagination
          paginationServer
          paginationTotalRows={totalCount}
          paginationPerPage={pageSize}
          paginationComponentOptions={{
            noRowsPerPage: false,
            selectAllRowsItem: false,
            rowsPerPageText: 'Show',
          }}
          onChangeRowsPerPage={setPageSize}
          onChangePage={setCurrentPage}
          subHeader
        />
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


      <div className="offcanvas offcanvas-end customeoff addtask" tabIndex="-1" id="offcanvasExample1">
        <div className="offcanvas-header" style={{ backgroundColor: '#0047bb' }}>
          <h5 className="modal-title text-white" id="gridSystemModal1">{ 'Add New Role'}</h5>
          <button onClick={handleCancel} type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close">
            <i className="fa fa-close"></i>
          </button>
        </div>
        <div className="offcanvas-body">
          <div className="container-fluid">
            <form onSubmit={handleSubmit} className="row g-3 needs-validation role-create-form" noValidate>
              <div className="col-md-12">
                <label htmlFor="bsValidation1" className="form-label">Role Name<span>*</span></label>
                <input
                  type="text"
                  className="form-control"
                  id="bsValidation1"
                  placeholder="Name"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  required
                />
                {errors.name && <span className='text-danger'>{errors.name}</span>}
              </div>

              <div className="col-md-12">
                <label htmlFor="bsValidation13" className="form-label">Description<span>*</span></label>
                <textarea
                  name="description"
                  className="form-control"
                  id="bsValidation13"
                  placeholder="Description ..."
                  rows="3"
                  value={formData.description || ""}
                  onChange={handleChange}
                  required
                ></textarea>
                {errors.description && <span className='text-danger'>{errors.description}</span>}
              </div>
              <RolePermission
                permissions={permissions}
                fetchRoles={fetchRoles}
                mode={formMode}
                roles={selectedRole}
                roleData={roleData}
              />

              <hr />
              <div className="button-footer">
                <div className="col-12 text-end ">
                  <button type="submit" className="btn btn-primary">{'edit' ? 'Update' : 'Add'}</button>
                  <button type="button" onClick={handleCancel} className="btn btn-danger ms-2 me-2" data-bs-dismiss="offcanvas">Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Role;


