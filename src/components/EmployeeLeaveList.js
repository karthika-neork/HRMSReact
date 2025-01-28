import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function EmployeeLeaveList() {
    const [empleavelist, setEmpLeaveList] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [pageSizeOptions] = useState([5, 10, 20, 30]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [userId, setUserId] = useState("")
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");

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

    const columns = [
        { headerName: "#", valueGetter: (params) => currentPage * pageSize + (params.node.rowIndex + 1), sortable: true, minWidth: 50, flex: 1 },
        { headerName: "EMP-CODE", field: "empCode", sortable: true, minWidth: 150, flex: 2 },
        { headerName: "NAME", field: "name", sortable: true, minWidth: 150, flex: 2 },
        { headerName: "CAUSUAL LEAVE COUNT", field: "casual_leave_count", sortable: true, minWidth: 200, flex: 2 },
        { headerName: "UNPAID LEAVE COUNT", field: "unpaid_leave_count", sortable: true, minWidth: 200, flex: 2 },
        { headerName: "SICK LEAVE COUNT", field: "sick_leave_count", sortable: true, minWidth: 170, flex: 2 },
        { headerName: "LOP", field: "lop", minWidth: 100, flex: 1 },
        {
            headerName: 'ACTION',
            field: 'action',
            minWidth: 100,
            flex: 2,
            cellRendererFramework: (params) => {
                return (
                    <div dangerouslySetInnerHTML={{ __html: params.value }}></div>
                );
            },
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

                    {/* Filter/search input */}
                    <div className="flex justify-center text-end mb-3 me-3" >
                        <input className='form-control' style={{ width: '100%' }}
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            placeholder="Search..." />
                    </div>
                    
                </div>

                {/* AG Grid */}
                <div className="ag-theme-alpine" style={{ width: '100%', fontSize: '16px' }}>
                    <AgGridReact
                        columnDefs={columns}
                        rowData={empleavelist}
                        pagination={true}
                        paginationPageSize={pageSize}
                        domLayout='autoHeight'
                        defaultColDef={{ flex: 2, minWidth: 50 }}
                    />
                </div>

                {/* Pagination */}
                <div className="text-end me-2 ">
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
                </div>

                {/* Data count */}
                <div className="text-start ms-2 mb-2">
                    Showing {firstRowIndex} to {lastRowIndex} of {totalCount} entries
                </div>
            </div>
        </div>

    )
}


export default EmployeeLeaveList