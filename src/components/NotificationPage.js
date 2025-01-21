import React, { useState } from 'react';
import '../commonStyle/NotificationPage.css'; // Import your CSS file
import Header from './Header';

function NotificationPAge() {
    const [pageSizeOptions] = useState([5, 10, 20, 30]);
    const [pageSize, setPageSize] = useState(10);
    const [globalFilter, setGlobalFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [pageIndex, setPageIndex] = useState(0);

    // Dummy notifications data
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
        <div className='' style={{ padding: '150px' }}>
            {/* <Header/> */}
            <div className='p-6 bg-white rounded-lg shadow' style={{ padding: '20px' }}>

                <div className="notification-page">
                    <h1 className="header-title d-flex justify-content-between align-items-center">
                        <span>Notifications</span>
                        <div className="d-flex justify-content-between align-items-center">
                            <span style={{ fontWeight: "normal", fontSize: '17px' }}>show</span>
                            <select
                                className="form-control"
                                style={{
                                    width: "150px",
                                    marginLeft: "8px",
                                    borderRadius: "8px",
                                    border: "2px solid #ddd",
                                }}
                                value={pageSize}
                                onChange={(e) => setPageSize(Number(e.target.value))}
                            >
                                {pageSizeOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </h1>

                    <div className="notification-container">
                        {notifications.map((notification) => (
                            <div key={notification.id} className="notification-card shadow-sm" style={{backgroundColor:'#b0d3f2'}}>
                                <div className="notification-avatar">
                                    <img
                                        src="https://via.placeholder.com/40"
                                        alt="User Avatar"
                                        className="avatar-img"
                                    />
                                </div>
                                <div className="notification-content">
                                    <h5 className="notification-title">{notification.title}</h5>
                                    <p className="notification-description">{notification.description}</p>
                                    <span className="notification-time">{notification.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="d-flex justify-content-between align-items-center mt-5 mx-4">
                        <div className="text-start ms-2 mb-">
                            Showing {currentPage * pageSize + 1} to {Math.min((currentPage + 1) * pageSize, totalCount)} of {totalCount} entries
                        </div>

                        <div className='text-end  mt-2 me-4'>
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
                    </div>

                </div>
            </div>
        </div>
    );
}

export default NotificationPAge;
