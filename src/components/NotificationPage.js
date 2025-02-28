import React, { useState } from 'react';
import '../commonStyle/NotificationPage.css'; // Import your CSS file
import Header from './Header';

function NotificationPage() {
    const [pageSizeOptions] = useState([5, 10, 20, 30]);
    const [pageSize, setPageSize] = useState(10);
    const [globalFilter, setGlobalFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [totalCount, setTotalCount] = useState(2); // Dummy total count for example
    const [pageIndex, setPageIndex] = useState(0);

    const notifications = [
        { id: 1, title: "New Message", description: "Message received", time: "2 minutes ago" },
        { id: 2, title: "New Message", description: "Message received", time: "2 minutes ago" },
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

    return (
        <div className='container-fluid py-5'>
            <div className='p-4 bg-white rounded-lg shadow notification-wrapper' style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div className="notification-page">
                    <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
                        <h4>Notifications</h4>
                        <div className="d-flex align-items-center">
                            <span className="me-2" style={{ fontWeight: "normal", fontSize: '17px' }}>Show</span>
                            <select
                                className="form-select"
                                style={{ width: "100px" }}
                                value={pageSize}
                                onChange={handlePageSizeChange}
                            >
                                {pageSizeOptions.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="notification-container">
                        {notifications.map((notification) => (
                            <div key={notification.id} className="notification-card shadow-sm p-3 d-flex align-items-center" style={{ backgroundColor: '#b0d3f2', borderRadius: '8px', marginBottom: '10px' }}>
                                <img src="https://via.placeholder.com/40" alt="User Avatar" className="rounded-circle me-3" />
                                <div>
                                    <h5 className="mb-1">{notification.title}</h5>
                                    <p className="mb-1 text-muted">{notification.description}</p>
                                    <span className="text-muted" style={{ fontSize: '14px' }}>{notification.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="d-flex flex-wrap justify-content-between align-items-center mt-4">
                        <div className="text-muted">
                            Showing {currentPage * pageSize + 1} to {Math.min((currentPage + 1) * pageSize, totalCount)} of {totalCount} entries
                        </div>

                        <div className='mt-2'>
                            <button className='btn btn-outline-primary me-1' onClick={() => onPageChanged(currentPage - 1)} disabled={pageIndex === 0}>
                                {'<'} Prev
                            </button>
                            {[...Array(Math.ceil(totalCount / pageSize))].map((_, index) => (
                                <button
                                    key={index}
                                    className={`btn ${currentPage === index ? 'btn-primary' : 'btn-outline-primary'} mx-1`}
                                    onClick={() => onPageChanged(index)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button className='btn btn-outline-primary ms-1' onClick={() => onPageChanged(currentPage + 1)} disabled={(currentPage + 1) * pageSize >= totalCount}>
                                Next {'>'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotificationPage;
