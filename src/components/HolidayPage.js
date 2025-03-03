import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit, FaTrash, FaCheckCircle ,FaEye} from "react-icons/fa";
import { Button } from 'react-bootstrap';

function HolidayPage() {
    const [pageSizeOptions] = useState([5, 10, 20, 30]);
    const [pageSize, setPageSize] = useState(10);
    const [globalFilter, setGlobalFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    const handlePageSizeChange = (e) => {
        const newSize = Number(e.target.value);
        setPageSize(newSize);
        setCurrentPage(0); // Reset to the first page
    };

    const onPageChanged = (newPage) => {
        setCurrentPage(newPage);
    };
    const [formMode, setFormMode] = useState(null); // 'add' or 'edit'
    const [selectedHoliday, setSelectedHoliday] = useState(null);
    const [holidays, setHolidays] = useState([
        { id: 1, date: '2024-08-15', name: 'Independence Day', type: 'Holiday', description: 'Independence Day', status: 'Active' },
        { id: 2, date: '2024-09-16', name: 'Third Onam', type: 'Holiday', description: 'Third Onam', status: 'Active' },
        { id: 3, date: '2024-09-17', name: 'Fourth Onam', type: 'Holiday', description: 'Fourth Onam', status: 'Active' },
        { id: 4, date: '2024-10-01', name: 'Dussehra', type: 'Holiday', description: 'Holiday', status: 'Inactive' },
    ]);

    // Define columns for DataTable
    const columns = [
        { name: "#", selector: (row, index) => index + 1, sortable: false, width: "60px" },
        { name: "Date", selector: row => row.date, sortable: true },
        { name: "Name", selector: row => row.name, sortable: true },
        { name: "Holiday Type", selector: row => row.type, sortable: true },
        { name: "Description", selector: row => row.description, sortable: false },
        {
            name: "Status",
            selector: row => row.status,width: "130px" ,
            cell: row => (
                <span className={`badge ${row.status === 'Active' ? 'bg-success' : 'bg-danger'}`}>
                    {row.status}
                </span>
            ),
            sortable: true,
        },
        {
            name: "Action", width: "130px" ,
            cell: row => (
                <>
                <Button variant="primary" size="sm" onClick={() => handleEdit(row)} className="me-2"
                    style={{ background: "none", border: "none", outline: "none", cursor: "pointer", fontSize: "1rem", color: "blue" }}>
                    <FaEdit />
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(row.id)}
                    style={{ background: "none", border: "none", outline: "none", cursor: "pointer", fontSize: "1rem", color: "red" }}>
                    <FaTrash />
                </Button>
                <a className="cursor-pointer text-primary ms-2 custom-icon"><FaEye /></a>
                
                </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ];

    const handleAdd = () => {
        setFormMode('add');
        setSelectedHoliday({ id: null, date: '', name: '', type: '', description: '', status: 'Active' });
        openOffcanvas();
    };

    const handleEdit = (holiday) => {
        setFormMode('edit');
        setSelectedHoliday(holiday);
        openOffcanvas();
    };

    const handleDelete = (id) => {
        setHolidays(holidays.filter(h => h.id !== id));
    };

    const openOffcanvas = () => {
        document.getElementById("offcanvasForm").classList.add("show");
        document.getElementById("offcanvasForm").style.visibility = "visible";
    };

    const closeOffcanvas = () => {
        document.getElementById("offcanvasForm").classList.remove("show");
        document.getElementById("offcanvasForm").style.visibility = "hidden";
        setFormMode(null);
    };
    return (
        <div className="table-container" style={{ overflowX: 'hidden', overflowY: 'hidden', width: '100%', padding: '50px' }}>
            {/* <LeaveTypesAdd fetchLeaveTypes={fetchLeaveTypes} mode={formMode} leavetypes={selectedLeaveTypes}></LeaveTypesAdd> */}
            <div className="page-breadcrumb d-flex align-items-center mb-3">
                <div className="ps-0">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 p-0">
                            <li className="breadcrumb-item"><a href="/admin/dashboard">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Holiday</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-primary" onClick={handleAdd}>Add Holiday</button>
            </div>

            <div className="title-head d-flex justify-content-between">
                <h6 className="mb-0 text-uppercase">Holidays</h6>
            </div>

            <hr />
            <div className='p-6 bg-white rounded-lg shadow' style={{ padding: '20px' }}>
                <div className='row d-flex align-items-end gap-2'>
                    {/* From Date */}
                    <div className='col-auto mt-3'>
                        <div className="form-group">
                            <label htmlFor="start_date">From<span className='text-danger'>*</span></label>
                            <input
                                style={{ width: "150px", height: '40px' }} type="date"
                                name='from' className="form-control mt-2"
                            />
                        </div>
                    </div>

                    {/* To Date */}
                    <div className="col-auto mt-3">
                        <div className="form-group">
                            <label className="form-label">To<span className='text-danger'>*</span></label>
                            <input
                                style={{ width: "150px", height: '40px' }} type="date"
                                name='to' className="form-control mt-2"
                            />
                        </div>
                    </div>

                    {/* Search Button */}
                    <div className="col-auto mt-4">
                        <button className="btn btn-primary" style={{ height: '40px', padding: '5px 15px' }}>
                            Search
                        </button>
                    </div>
                </div>

                <div className='p-6 bg-white rounded-lg ' style={{ padding: '', }}>
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


                    <DataTable columns={columns} data={holidays} pagination highlightOnHover responsive />
                </div>


                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasForm" style={{ width: '400px', visibility: 'hidden' }}>
                    <div className="offcanvas-header" style={{ backgroundColor: '#0047bb' }}>
                        <h5 className="modal-title text-white">{formMode === 'edit' ? 'Edit Holiday' : 'Add Holiday'}</h5>
                        <button onClick={closeOffcanvas} type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close">
                            <i className="fa fa-close" style={{ color: 'white' }}></i>
                        </button>
                    </div>

                    <div className="offcanvas-body">
                        <form >
                            <div className="mb-3">
                                <label className="form-label">Date:</label>
                                <input type="date" className="form-control" value={selectedHoliday?.date || ''} onChange={(e) => setSelectedHoliday({ ...selectedHoliday, date: e.target.value })} required />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Name:</label>
                                <input type="text" className="form-control" value={selectedHoliday?.name || ''} onChange={(e) => setSelectedHoliday({ ...selectedHoliday, name: e.target.value })} required />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Type:</label>
                                <input type="text" className="form-control" value={selectedHoliday?.type || ''} onChange={(e) => setSelectedHoliday({ ...selectedHoliday, type: e.target.value })} required />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Description:</label>
                                <textarea className="form-control" value={selectedHoliday?.description || ''} onChange={(e) => setSelectedHoliday({ ...selectedHoliday, description: e.target.value })} required></textarea>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Status:</label>
                                <select className="form-control" value={selectedHoliday?.status || ''} onChange={(e) => setSelectedHoliday({ ...selectedHoliday, status: e.target.value })}>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>

                            <button type="submit" className="btn btn-success">Save</button>
                            <button type="button" className="btn btn-secondary ms-2" onClick={closeOffcanvas}>Cancel</button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default HolidayPage;