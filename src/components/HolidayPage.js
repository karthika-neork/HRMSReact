import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

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
                <div className='row'>
                    <div className='col-md-4 mt-3'>
                        <div className="form-group">
                            <label htmlFor="start_date">From<span className='text-danger'>*</span></label>
                            <input
                                style={{ width: "50%", height: '40px' }} type="date"
                                name='' className="form-control mt-2" placeholder=""
                            />

                        </div>
                    </div>

                    <div class="col-md-4 mt-3">
                        <div className="form-group">

                            <label class="form-label">To<span className='text-danger'>*</span></label>
                            <input
                                style={{ width: "50%", height: '40px' }} type="date"
                                name='to' className="form-control mt-" placeholder="to"
                            />
                        </div>
                    </div>
                </div>


                <div className="d-flex justify-content-between align-items-center mb- mt-3">
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
                            onChange={handlePageSizeChange}
                        >
                            {[5, 10, 20, 30].map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-center text-end mb- me-3" >

                        <input className='form-control' style={{ width: '100%' }}
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            placeholder="Search..." />
                    </div>
                </div>

                <div className="container-fluid p-">


                    <div className="">
                        <div className="card-body">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Date</th>
                                        <th>Name</th>
                                        <th>Holiday Type</th>
                                        <th>Description</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {holidays.map((holiday, index) => (
                                        <tr key={holiday.id}>
                                            <td>{index + 1}</td>
                                            <td>{holiday.date}</td>
                                            <td>{holiday.name}</td>
                                            <td>{holiday.type}</td>
                                            <td>{holiday.description}</td>
                                            <td>
                                                <span className={`badge ${holiday.status === 'Active' ? 'bg-success' : 'bg-danger'}`}>{holiday.status}</span>
                                            </td>
                                            <td>
                                                <button className="btn btn-sm btn-primary me-2" onClick={handleEdit}>✏️</button>
                                                <button className="btn btn-sm btn-danger">❌</button>
                                                <button className="btn btn-sm btn-info ms-2">👁️</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasForm" style={{ width: '400px', visibility: 'hidden' }}>
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title">{formMode === 'add' ? 'Add Holiday' : 'Edit Holiday'}</h5>
                    <button type="button" className="btn-close" onClick={closeOffcanvas}></button>
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
                    <div className="text-end me-2 mt-3">
                        <button
                            className="btn btn-white"
                            onClick={() => onPageChanged(currentPage - 1)}
                            disabled={currentPage === 0}
                        >
                            Prev
                        </button>

                        {[...Array(Math.ceil(totalCount / pageSize))].map((_, index) => (
                            <button
                                key={index}
                                className={`btn ${currentPage === index ? "btn-primary" : "btn-white"}`}
                                onClick={() => onPageChanged(index)}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            className="btn btn-white"
                            onClick={() => onPageChanged(currentPage + 1)}
                            disabled={(currentPage + 1) * pageSize >= totalCount}
                        >
                            Next
                        </button>
                    </div>

                    <div className="text-start ms-2 mb-2">
                        Showing {currentPage * pageSize + 1} to {Math.min((currentPage + 1) * pageSize, totalCount)} of {totalCount} entries
                    </div>
                </div>

            </div>
        </div>
    )
}
export default HolidayPage;