import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';
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

    useEffect(() => {
        setEmployeeList([
            {
                user_id: 1,
                employee_code: "EMP001",
                name: "John Doe",
                designation_name: "Software Engineer",
                date_of_joining: "2021-06-15",
                status: "Active",
            },
            {
                user_id: 2,
                employee_code: "EMP002",
                name: "Jane Smith",
                designation_name: "Project Manager",
                date_of_joining: "2019-03-10",
                status: "Inactive",
            },
        ]);
    }, []);

    // PDF Generator Function
    const generatePDF = async (employee = null) => {
        const doc = new jsPDF();
        
        // Add image
        const imgUrl = "https://i.postimg.cc/xdr6DCmg/neork-logo-200.png";
        const imgWidth = 40; // Adjust as needed
        const imgHeight = 20; // Adjust as needed
    
        const addImageToPDF = (imageData) => {
            doc.addImage(imageData, "PNG", 150, 10, imgWidth, imgHeight); // Adjust position as needed
        };
    
        try {
            const imgData = await getBase64ImageFromUrl(imgUrl);
            addImageToPDF(imgData);
        } catch (error) {
            console.error("Error loading image:", error);
        }
    
        // Add title
        doc.text("Employee Report", 14, 30);
    
        if (employee) {
            autoTable(doc, {
                startY: 40, // Adjust position after the image
                head: [["Field", "Value"]],
                body: [
                    ["Employee Code", employee.employee_code],
                    ["Name", employee.name],
                    ["Designation", employee.designation_name],
                    ["Joined Date", employee.date_of_joining],
                    ["Status", employee.status],
                ],
            });
            doc.save(`${employee.name}_Employee.pdf`);
        } else {
            autoTable(doc, {
                startY: 40, // Adjust position after the image
                head: [["EMP-CODE", "Name", "DESIGNATION", "JOINED DATE", "Status"]],
                body: employeelist.map((emp) => [
                    emp.employee_code,
                    emp.name,
                    emp.designation_name,
                    emp.date_of_joining,
                    emp.status,
                ]),
            });
            doc.save("Employee_List.pdf");
        }
    };
    
    // Function to convert image URL to Base64
    const getBase64ImageFromUrl = async (imageUrl) => {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };
    
    // Table Columns
    const columns = [
        { name: "#", selector: (row, index) => index + 1, sortable: true, width: "5%" },
        { name: "EMP-CODE", selector: (row) => row.employee_code, sortable: true, width: "15%" },
        { name: "Name", selector: (row) => row.name, sortable: true, width: "20%" },
        { name: "DESIGNATION", selector: (row) => row.designation_name, sortable: true, width: "20%" },
        { name: "JOINED DATE", selector: (row) => row.date_of_joining, sortable: true, width: "15%" },
        { name: "Status", selector: (row) => row.status, sortable: true, width: "10%" },
        {
            name: ( 
                <div className="d-flex align-items-center gap-2">
                    <span>Action</span>
                    <a className='mb-2' onClick={() => generatePDF()} style={{ background: "none", border: "none", outline: "none", cursor: "pointer", fontSize: "2rem", color: "blue" }}>
        <FontAwesomeIcon style={{ width: "", height: "20px" }} icon={faFilePdf} />
    </a>
                </div>
            ),
            cell: (row) => (
<div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "15px" }}>
    <a onClick={() => handleEditBtn(row)} style={{ background: "none", border: "none", outline: "none", cursor: "pointer", fontSize: "1rem", color: "blue" }}>
        <FontAwesomeIcon icon={faEdit} />
    </a>
    
    <a onClick={() => handleDeleteBtn(row)} style={{ background: "none", border: "none", outline: "none", cursor: "pointer", fontSize: "1rem", color: "red" }}>
        <FontAwesomeIcon icon={faTrash} />
    </a>
    
    <a className='mb-2' onClick={() => generatePDF(row)} style={{ background: "none", border: "none", outline: "none", cursor: "pointer", fontSize: "2rem", color: "blue" }}>
        <FontAwesomeIcon style={{ width: "", height: "20px" }} icon={faFilePdf} />
    </a>
</div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: "15%",
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
                                    <Button href='add-employees' className="btn template-btn px-5" onClick={handleAddPage}>
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
                            {/* <span>Show</span>
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
                            <span>entries</span> */}
                        </div>

                        <div className="flex justify-center text-end mb-3 me-3" >
                            <input className='form-control' style={{ width: '100%' }}
                                value={globalFilter}
                                onChange={(e) => setGlobalFilter(e.target.value)}
                                placeholder="Search..." />
                        </div>
                    </div>
<div style={{ overflowX: 'hidden', overflowY: 'hidden',   }}>
                    <DataTable
                columns={columns}
                data={employeelist}
                pagination
                highlightOnHover
                responsive
            />
</div>
                    {/* <div className="text-end me-2 ">
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
                    </div> */}
                </div>

            </>
            {/* )} */}
            <ToastContainer />
        </div>
    );
}


export default EmployeeList;



// import React, { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
// import { Button } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFilePdf, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// function EmployeeList() {
//     const [employeelist, setEmployeeList] = useState([]);

//     // Dummy Data
//     useEffect(() => {
//         setEmployeeList([
//             {
//                 user_id: 1,
//                 employee_code: "EMP001",
//                 name: "John Doe",
//                 designation_name: "Software Engineer",
//                 date_of_joining: "2021-06-15",
//                 status: "Active",
//             },
//             {
//                 user_id: 2,
//                 employee_code: "EMP002",
//                 name: "Jane Smith",
//                 designation_name: "Project Manager",
//                 date_of_joining: "2019-03-10",
//                 status: "Inactive",
//             },
//         ]);
//     }, []);

//     // PDF Generator Function
//     const generatePDF = (employee = null) => {
//         const doc = new jsPDF();
//         doc.text("Employee Report", 14, 10);

//         if (employee) {
//             // ✅ Single Employee PDF
//             autoTable(doc, {
//                 head: [["Field", "Value"]],
//                 body: [
//                     ["Employee Code", employee.employee_code],
//                     ["Name", employee.name],
//                     ["Designation", employee.designation_name],
//                     ["Joined Date", employee.date_of_joining],
//                     ["Status", employee.status],
//                 ],
//             });
//             doc.save(`${employee.name}_Employee.pdf`);
//         } else {
//             // ✅ Entire Table PDF
//             autoTable(doc, {
//                 head: [["EMP-CODE", "Name", "DESIGNATION", "JOINED DATE", "Status"]],
//                 body: employeelist.map((emp) => [
//                     emp.employee_code,
//                     emp.name,
//                     emp.designation_name,
//                     emp.date_of_joining,
//                     emp.status,
//                 ]),
//             });
//             doc.save("Employee_List.pdf");
//         }
//     };

//     // Table Columns
//     const columns = [
//         { name: "#", selector: (row, index) => index + 1, sortable: true },
//         { name: "EMP-CODE", selector: (row) => row.employee_code, sortable: true },
//         { name: "Name", selector: (row) => row.name, sortable: true },
//         { name: "DESIGNATION", selector: (row) => row.designation_name, sortable: true },
//         { name: "JOINED DATE", selector: (row) => row.date_of_joining, sortable: true },
//         { name: "Status", selector: (row) => row.status, sortable: true },
//         {
//             name: (
//                 <div className="d-flex align-items-center gap-2">
//                     <span>Action</span>
//                     <Button variant="primary" size="sm" onClick={() => generatePDF()}>
//                         <FontAwesomeIcon icon={faFilePdf} className="me-1" />
                       
//                     </Button>
//                 </div>
//             ),
//             cell: (row) => (
//                 <div style={{ display: "flex", gap: "10px" }}>
//                     <Button variant="warning" size="sm">
//                         <FontAwesomeIcon icon={faEdit} />
//                     </Button>
//                     <Button variant="danger" size="sm">
//                         <FontAwesomeIcon icon={faTrash} />
//                     </Button>
//                     <Button variant="secondary" size="sm" onClick={() => generatePDF(row)}>
//                         <FontAwesomeIcon icon={faFilePdf} />
//                     </Button>
//                 </div>
//             ),
//             ignoreRowClick: true,
//             allowOverflow: true,
//             button: true,
//         },
//     ];
    
//     return (
//         <div className=" mt-4">
//             <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h4>Employee List</h4>
//                 {/* <Button variant="primary" onClick={() => generatePDF()}>
//                     <FontAwesomeIcon icon={faFilePdf} className="me-2" />
//                     Download All
//                 </Button> */}
//             </div>

//             <DataTable
//                 columns={columns}
//                 data={employeelist}
//                 pagination
//                 highlightOnHover
//                 responsive
//             />
//         </div>
//     );
// }

// export default EmployeeList;

