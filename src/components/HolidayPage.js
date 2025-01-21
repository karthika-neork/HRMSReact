import React, { useState } from 'react'

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


  return (
    <div className="table-container" style={{ overflowX: 'hidden', overflowY: 'hidden',width:'100%',padding:'50px' }}>
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


    <div className="title-head d-flex justify-content-between">
        <h6 className="mb-0 text-uppercase">Holidays</h6>
    </div>

    <hr />
    <div className='p-6 bg-white rounded-lg shadow' style={{padding:'20px'}}>
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
                    border:'none solid 2px'                            
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
        <div className="flex justify-center text-end mb-3 me-3" >

            <input className='form-control' style={{ width: '100%' }}
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Search..." />
        </div>
        </div>

    {/* <div className="ag-theme-alpine" style={{  width: '100%', fontSize:'16px' }}>
        <AgGridReact
            rowData={leavetypes}
            columnDefs={columns}
            // pagination={true}
            // paginationPageSize={pageSize}
            // onPaginationChanged={(params) => onPageChanged(params.api.paginationGetCurrentPage())}
            domLayout='autoHeight'
            onGridReady={(params) => {
                params.api.sizeColumnsToFit();
            }}
        />
    </div> */}

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
)
}

export default HolidayPage