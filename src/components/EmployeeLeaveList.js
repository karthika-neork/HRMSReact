import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from "react-data-table-component";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaFilePdf, FaPlusCircle } from "react-icons/fa";
import { Modal, Button, Form, Row, Col, InputGroup, FormControl } from "react-bootstrap";

function EmployeeLeaveList() {
    const [empleavelist, setEmpLeaveList] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [globalFilter, setGlobalFilter] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [lopCount, setLopCount] = useState("");

    const fetchEmployeesLeaveList = async () => {
        try {
            const response = await axios.get("/api/employee-leave-list", {
                params: {
                    start: currentPage * pageSize,
                    per_page: pageSize,
                    search_term: globalFilter
                },
            });
            setEmpLeaveList(response.data.aaData);
            setTotalCount(response.data.iTotalDisplayRecords);
        } catch (error) {
            console.error("Error fetching EmployeesList:", error);
        }
    };

    useEffect(() => {
        fetchEmployeesLeaveList();
    }, [currentPage, pageSize, globalFilter]);

    const generatePDF = (employee = null) => {
        const doc = new jsPDF();
        doc.text("Employee Leave Report", 14, 10);

        if (employee) {
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

    const sampleData = [
        {
            id: 1,
            empCode: "EMP001",
            name: "John Doe",
            casual_leave_count: 5,
            unpaid_leave_count: 2,
            sick_leave_count: 3,
            lop: 1
        },
        {
            id: 2,
            empCode: "EMP002",
            name: "Jane Smith",
            casual_leave_count: 4,
            unpaid_leave_count: 1,
            sick_leave_count: 2,
            lop: 0
        }
    ];
    
    // setEmpLeaveList(sampleData);
    
    const columns = [
        { name: "#", selector: (row, index) => index + 1, sortable: true },
        { name: "EMP-CODE", selector: (row) => row.empCode, sortable: true },
        { name: "NAME", selector: (row) => row.name, sortable: true },
        { name: "CASUAL LEAVE", selector: (row) => row.casual_leave_count, sortable: true },
        { name: "UNPAID LEAVE", selector: (row) => row.unpaid_leave_count, sortable: true },
        { name: "SICK LEAVE", selector: (row) => row.sick_leave_count, sortable: true },
        { name: "LOP", selector: (row) => row.lop, sortable: true },
        {
            name: "Actions",
            cell: (row) => (
                <div className="d-flex gap-2">
                    <div className="text-danger" style={{ cursor: "pointer" }} onClick={() => handleAddLOPClick(row)}>
                        <FaPlusCircle size={18} /> <span className="ms-1 text-primary">Add LOP</span>
                    </div>

                    <a className="text-danger" onClick={() => generatePDF(row)} style={{ cursor: "pointer" }}>
                        <FaFilePdf size={18} />
                    </a>
                </div>
            ),
            ignoreRowClick: true,
            button: true,
            width: "20%",
        }
    ];

    const clearFilters = () => {
        setGlobalFilter("");
        setSelectedMonth("");
        setSelectedYear("");
        setCurrentPage(0);
        fetchEmployeesLeaveList();
    };

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const years = Array.from({ length: 14 }, (_, i) => 2017 + i);

    return (
        <div className="container-fluid p-4">
           <div className="d-flex justify-content-between align-items-center mb-3 w-100">
                <h5 className="text-uppercase fw-bold">Employee Leave  List</h5>
                {/* <button className="btn btn-primary" onClick={handleAddAttendance}>
                    <i className="fa fa-plus me-2"></i> Add Attendance
                </button> */}
            </div>

            {/* Search & Filters */}
            <Row className="mb-3 g-2 d-flex flex-nowrap overflow-auto overflow-md-visible justify-content-md-end">
    <Col xs={6} sm={4} md={2} className="min-width">
        <InputGroup>
            <FormControl
                placeholder="Search..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
            />
        </InputGroup>
    </Col>
    <Col xs={6} sm={4} md={2} className="min-width">
        <Form.Select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
            <option value="">All Months</option>
            {months.map((month, index) => (
                <option key={index} value={month}>{month}</option>
            ))}
        </Form.Select>
    </Col>
    <Col xs={6} sm={4} md={2} className="min-width">
        <Form.Select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            <option value="">All Years</option>
            {years.map((year) => <option key={year} value={year}>{year}</option>)}
        </Form.Select>
    </Col>
    <Col xs={6} sm={4} md={2} className="min-width">
        <Button variant="secondary" onClick={clearFilters} className="w-100">Clear</Button>
    </Col>
</Row>
            {/* Data Table */}
            <div className="bg-white p-3 rounded shadow">
                <DataTable
                    columns={columns}
                    data={sampleData}
                    pagination
                    highlightOnHover
                    responsive
                />
            </div>

            {/* LOP Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add LOP</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Enter LOP</Form.Label>
                        <Form.Control type="number" value={lopCount} onChange={(e) => setLopCount(e.target.value)} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleAddLOP}>Add LOP</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default EmployeeLeaveList;
