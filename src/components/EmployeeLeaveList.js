// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { createRoot } from 'react-dom/client';
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';

// function EmployeeLeaveList() {
//     const [empleavelist, setEmpLeaveList] = useState([]);
//     const [totalCount, setTotalCount] = useState(0);
//     const [currentPage, setCurrentPage] = useState(0);
//     const [pageSize, setPageSize] = useState(5);
//     const [pageSizeOptions] = useState([5, 10, 20, 30]);
//     const [globalFilter, setGlobalFilter] = useState("");
//     const [userId, setUserId] = useState("")
//     const [selectedMonth, setSelectedMonth] = useState("");
//     const [selectedYear, setSelectedYear] = useState("");

//     const fetchEmployeesLeaveList = async () => {
//         // const userId = document.getElementById('employee_leavelist').getAttribute('data-user-id');

//         try {
//             const response = await axios.get("/api/employee-leave-list", {
//                 params: {
//                     start: currentPage * pageSize,
//                     per_page: pageSize,
//                     search_term: globalFilter,
//                     user_id: userId
//                 },
//             });
//             console.log("Response from backend:", response);
//             setEmpLeaveList(response.data.aaData);
//             setTotalCount(response.data.iTotalDisplayRecords);
//         } catch (error) {
//             console.error("Error fetching EmployeesList:", error);
//         }
//     };

//     useEffect(() => {
//         fetchEmployeesLeaveList();
//     }, [currentPage, pageSize, globalFilter]);

//     const columns = [
//         { headerName: "#", valueGetter: (params) => currentPage * pageSize + (params.node.rowIndex + 1), sortable: true, minWidth: 50, flex: 1 },
//         { headerName: "EMP-CODE", field: "empCode", sortable: true, minWidth: 150, flex: 2 },
//         { headerName: "NAME", field: "name", sortable: true, minWidth: 150, flex: 2 },
//         { headerName: "CAUSUAL LEAVE COUNT", field: "casual_leave_count", sortable: true, minWidth: 200, flex: 2 },
//         { headerName: "UNPAID LEAVE COUNT", field: "unpaid_leave_count", sortable: true, minWidth: 200, flex: 2 },
//         { headerName: "SICK LEAVE COUNT", field: "sick_leave_count", sortable: true, minWidth: 170, flex: 2 },
//         { headerName: "LOP", field: "lop", minWidth: 100, flex: 1 },
//         {
//             headerName: 'ACTION',
//             field: 'action',
//             minWidth: 100,
//             flex: 2,
//             cellRendererFramework: (params) => {
//                 return (
//                     <div dangerouslySetInnerHTML={{ __html: params.value }}></div>
//                 );
//             },
//         },
//     ];

//     const changePageSize = (size) => {
//         setPageSize(size);
//         setCurrentPage(0);
//     };

//     const previousPage = () => {
//         if (currentPage > 0) {
//             setCurrentPage(currentPage - 1);
//         }
//     };

//     const nextPage = () => {
//         if ((currentPage + 1) * pageSize < totalCount) {
//             setCurrentPage(currentPage + 1);
//         }
//     };

//     const canPreviousPage = currentPage > 0;
//     const canNextPage = (currentPage + 1) * pageSize < totalCount;

//     const firstRowIndex = currentPage * pageSize + 1;
//     const lastRowIndex = Math.min((currentPage + 1) * pageSize, totalCount);

//     const clearFilters = () => {
//         setGlobalFilter("");
//         setSelectedMonth("");
//         setSelectedYear("");
//         setCurrentPage(0);
//         fetchEmployeesLeaveList();
//     };

//     const months = [
//         "January", "February", "March", "April", "May", "June",
//         "July", "August", "September", "October", "November", "December",
//     ];

//     const years = Array.from({ length: 14 }, (_, i) => 2017 + i);
//     const handleSearch = () => {
//         fetchEmployeesLeaveList();
//     };

//     return (
//         <div className="table-container" style={{ overflowX: 'hidden', overflowY: 'hidden', width: '100%', padding: '30px' }}>

//             <div className="title-head d-flex justify-content-between">
//                 <h6 className="mb-0 text-uppercase">EMPLOYEE LIST</h6>
//             </div>

//             <hr />
//             <div className="d-flex justify-content-end align-items-center mb-3">
//                 <div className="me-2">
//                     <select
//                         className="form-select"
//                         value={selectedMonth}
//                         onChange={(e) => setSelectedMonth(e.target.value)}
//                     >
//                         <option value="">All Months</option>
//                         {months.map((month, index) => (
//                             <option key={index} value={month}>
//                                 {month}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 <div className="me-2">
//                     <select
//                         className="form-select"
//                         value={selectedYear}
//                         onChange={(e) => setSelectedYear(e.target.value)}
//                     >
//                         <option value="">All Years</option>
//                         {years.map((year) => (
//                             <option key={year} value={year}>
//                                 {year}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 <div className="me-2">
//                     <button className="btn btn-primary" onClick={handleSearch}>
//                         Search
//                     </button>
//                 </div>

//                 <div>
//                     <button className="btn btn-secondary" onClick={clearFilters}>
//                         Clear Filters
//                     </button>
//                 </div>
//             </div>

//             {/* Pagination controls */}
//             <div className='p-6 bg-white rounded-lg shadow' style={{ padding: '20px' }}>

//                 <div className="d-flex justify-content-between align-items-center mb-3">
//                     <div className="text-start ms-2">
//                         <span>Show</span>
//                         <select
//                             className="mx-2"
//                             value={pageSize}
//                             onChange={(e) => changePageSize(Number(e.target.value))}
//                         >
//                             {pageSizeOptions.map((option) => (
//                                 <option key={option} value={option}>
//                                     {option}
//                                 </option>
//                             ))}
//                         </select>
//                         <span>entries</span>
//                     </div>

//                     {/* Filter/search input */}
//                     <div className="flex justify-center text-end mb-3 me-3" >
//                         <input className='form-control' style={{ width: '100%' }}
//                             value={globalFilter}
//                             onChange={(e) => setGlobalFilter(e.target.value)}
//                             placeholder="Search..." />
//                     </div>

//                 </div>

//                 {/* AG Grid */}
//                 <div className="ag-theme-alpine" style={{ width: '100%', fontSize: '16px' }}>
//                     <AgGridReact
//                         columnDefs={columns}
//                         rowData={empleavelist}
//                         pagination={true}
//                         paginationPageSize={pageSize}
//                         domLayout='autoHeight'
//                         defaultColDef={{ flex: 2, minWidth: 50 }}
//                     />
//                 </div>

//                 {/* Pagination */}
//                 <div className="text-end me-2 ">
//                     <button
//                         className="btn btn-white"
//                         onClick={previousPage}
//                         disabled={!canPreviousPage}
//                     >
//                         Prev
//                     </button>
//                     {[...Array(Math.ceil(totalCount / pageSize))].map(
//                         (_, index) => (
//                             <button
//                                 key={index}
//                                 className={`btn ${currentPage === index ? "btn-primary" : "btn-white"}`}
//                                 onClick={() => setCurrentPage(index)}
//                             >
//                                 {index + 1}
//                             </button>
//                         )
//                     )}
//                     <button
//                         className="btn btn-white"
//                         onClick={nextPage}
//                         disabled={!canNextPage}
//                     >
//                         Next
//                     </button>
//                 </div>

//                 {/* Data count */}
//                 <div className="text-start ms-2 mb-2">
//                     Showing {firstRowIndex} to {lastRowIndex} of {totalCount} entries
//                 </div>
//             </div>
//         </div>

//     )
// }


// export default EmployeeLeaveList


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from "react-data-table-component";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaFilePdf, FaPlusCircle, FaDownload } from "react-icons/fa";
import { Modal, Button, Form } from "react-bootstrap";
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function EmployeeLeaveList() {
    const [empleavelist, setEmpLeaveList] = useState([
        {
            id: 1,
            empCode: "EMP001",
            name: "John Doe",
            casual_leave_count: 2,
            unpaid_leave_count: 1,
            sick_leave_count: 3,
            lop: 0,
        },
        {
            id: 2,
            empCode: "EMP002",
            name: "Jane Smith",
            casual_leave_count: 5,
            unpaid_leave_count: 2,
            sick_leave_count: 1,
            lop: 1,
        },
    ]);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [pageSizeOptions] = useState([5, 10, 20, 30]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [userId, setUserId] = useState("")
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [lopCount, setLopCount] = useState("");
    const fetchEmployeesLeaveList = async () => {
        // const userId = document.getElementById('employee_leavelist').getAttribute('data-user-id');

        try {
            const response = await axios.get("/api/employee-leave-list", {
                params: {
                    start: currentPage * pageSize,
                    per_page: pageSize,
                    search_term: globalFilter,
                    user_id: userId
                },
            });
            console.log("Response from backend:", response);
            setEmpLeaveList(response.data.aaData);
            setTotalCount(response.data.iTotalDisplayRecords);
        } catch (error) {
            console.error("Error fetching EmployeesList:", error);
        }
    };

    useEffect(() => {
        fetchEmployeesLeaveList();
    }, [currentPage, pageSize, globalFilter]);

    // const columns = [
    //     { headerName: "#", valueGetter: (params) => currentPage * pageSize + (params.node.rowIndex + 1), sortable: true, minWidth: 50, flex: 1 },
    //     { headerName: "EMP-CODE", field: "empCode", sortable: true, minWidth: 150, flex: 2 },
    //     { headerName: "NAME", field: "name", sortable: true, minWidth: 150, flex: 2 },
    //     { headerName: "CAUSUAL LEAVE COUNT", field: "casual_leave_count", sortable: true, minWidth: 200, flex: 2 },
    //     { headerName: "UNPAID LEAVE COUNT", field: "unpaid_leave_count", sortable: true, minWidth: 200, flex: 2 },
    //     { headerName: "SICK LEAVE COUNT", field: "sick_leave_count", sortable: true, minWidth: 170, flex: 2 },
    //     { headerName: "LOP", field: "lop", minWidth: 100, flex: 1 },
    //     {
    //         headerName: 'ACTION',
    //         field: 'action',
    //         minWidth: 100,
    //         flex: 2,
    //         cellRendererFramework: (params) => {
    //             return (
    //                 <div dangerouslySetInnerHTML={{ __html: params.value }}></div>
    //             );
    //         },
    //     },
    // ];

    const generatePDF = (employee = null) => {
        const doc = new jsPDF();
        doc.text("Employee Leave Report", 14, 10);

        if (employee) {
            // ✅ Single Employee PDF
            autoTable(doc, {
                head: [["Field", "Value"]],
                body: [
                    ["Employee Code", employee.empCode],
                    ["Name", employee.name],
                    ["Casual Leave", employee.casual_leave_count],
                    ["Unpaid Leave", employee.unpaid_leave_count],
                    ["Sick Leave", employee.sick_leave_count],
                    ["LOP", employee.lop],
                ],
            });
            doc.save(`${employee.name}_LeaveReport.pdf`);
        } else {
            // ✅ Full Table PDF
            autoTable(doc, {
                head: [["EMP-CODE", "NAME", "CASUAL LEAVE", "UNPAID LEAVE", "SICK LEAVE", "LOP"]],
                body: empleavelist.map((emp) => [
                    emp.empCode,
                    emp.name,
                    emp.casual_leave_count,
                    emp.unpaid_leave_count,
                    emp.sick_leave_count,
                    emp.lop,
                ]),
            });
            doc.save("Employee_Leave_List.pdf");
        }
    };

    const handleAddLOPClick = (employee) => {
        setSelectedEmployee(employee);
        setLopCount("");
        setShowModal(true);
    };

    // 📌 Handle LOP Submission
    const handleAddLOP = () => {
        if (selectedEmployee && lopCount !== "") {
            setEmpLeaveList((prevList) =>
                prevList.map((emp) =>
                    emp.id === selectedEmployee.id
                        ? { ...emp, lop: emp.lop + parseInt(lopCount) }
                        : emp
                )
            );
            setShowModal(false);
        }
    };
    // 📌 Table Columns
    const columns = [
        { name: "#", selector: (row, index) => index + 1, sortable: true },
        { name: "EMP-CODE", selector: (row) => row.empCode, sortable: true },
        { name: "NAME", selector: (row) => row.name, sortable: true },
        { name: "CASUAL LEAVE", selector: (row) => row.casual_leave_count, sortable: true },
        { name: "UNPAID LEAVE", selector: (row) => row.unpaid_leave_count, sortable: true },
        { name: "SICK LEAVE", selector: (row) => row.sick_leave_count, sortable: true },
        { name: "LOP", selector: (row) => row.lop, sortable: true },
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
                <div className="d-flex gap-2">
                    {/* Add LOP */}
                    <div
                        style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
                        onClick={() => handleAddLOPClick(row)}
                    >
                        <FaPlusCircle className="text-danger" size={16} />
                        <span className="ms-1 text-primary">Add LOP</span>
                    </div>

                    {/* Download Single PDF */}
                    <a className='mb-2' onClick={() => generatePDF(row)} style={{ background: "none", border: "none", outline: "none", cursor: "pointer", fontSize: "2rem", color: "blue" }}>
                        <FontAwesomeIcon style={{ width: "", height: "20px" }} icon={faFilePdf} />
                    </a>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: "20%",
        }
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

    const clearFilters = () => {
        setGlobalFilter("");
        setSelectedMonth("");
        setSelectedYear("");
        setCurrentPage(0);
        fetchEmployeesLeaveList();
    };

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
    ];

    const years = Array.from({ length: 14 }, (_, i) => 2017 + i);
    const handleSearch = () => {
        fetchEmployeesLeaveList();
    };

    return (
        <div className="table-container" style={{ overflowX: 'hidden', overflowY: 'hidden', width: '100%', padding: '30px' }}>

            <div className="title-head d-flex justify-content-between">
                <h6 className="mb-0 text-uppercase">EMPLOYEE LIST</h6>
            </div>

            <hr />
            <div className="d-flex justify-content-end align-items-center mb-3">
                <div className="me-2">
                    <select
                        className="form-select"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                        <option value="">All Months</option>
                        {months.map((month, index) => (
                            <option key={index} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="me-2">
                    <select
                        className="form-select"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                    >
                        <option value="">All Years</option>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="me-2">
                    <button className="btn btn-primary" onClick={handleSearch}>
                        Search
                    </button>
                </div>

                <div>
                    <button className="btn btn-secondary" onClick={clearFilters}>
                        Clear Filters
                    </button>
                </div>
            </div>

            {/* Pagination controls */}
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

                    {/* Filter/search input */}
                    <div className="flex justify-center text-end mb-3 me-3" >
                        <input className='form-control' style={{ width: '100%' }}
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            placeholder="Search..." />
                    </div>

                </div>

                {/* AG Grid */}
                <DataTable
                    columns={columns}
                    data={empleavelist.filter(emp =>
                        emp.name.toLowerCase().includes(globalFilter.toLowerCase()) ||
                        emp.empCode.toLowerCase().includes(globalFilter.toLowerCase())
                    )}
                    pagination
                    highlightOnHover
                    responsive
                />

                {/* Pagination */}
                {/* <div className="text-end me-2 ">
                    <button
                        className="btn btn-white"
                        onClick={previousPage}
                        disabled={!canPreviousPage}
                    >
                        Prev
                    </button>
                    {[...Array(Math.ceil(totalCount / pageSize))].map(
                        (_, index) => (
                            <button
                                key={index}
                                className={`btn ${currentPage === index ? "btn-primary" : "btn-white"}`}
                                onClick={() => setCurrentPage(index)}
                            >
                                {index + 1}
                            </button>
                        )
                    )}
                    <button
                        className="btn btn-white"
                        onClick={nextPage}
                        disabled={!canNextPage}
                    >
                        Next
                    </button>
                </div> */}

                {/* Data count */}
                {/* <div className="text-start ms-2 mb-2">
                    Showing {firstRowIndex} to {lastRowIndex} of {totalCount} entries
                </div> */}
            </div>
            {/* Modal for Adding LOP */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add LOP</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Enter LOP </Form.Label>
                        <Form.Control
                            type="number"
                            value={lopCount}
                            onChange={(e) => setLopCount(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAddLOP}>
                        Add LOP
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}


export default EmployeeLeaveList