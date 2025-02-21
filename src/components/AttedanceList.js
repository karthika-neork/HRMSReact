import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { FaEye, FaEdit } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { Offcanvas } from "bootstrap";
const AttendanceTable = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [globalFilter, setGlobalFilter] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        date: "",
        punchIn: "",
        punchOut: "",
        workingHours: "",
        breakHours: "",
        extraHours: "",
        reason: ""
    });

    const columns = [
        { name: "SI No", selector: (row, index) => index + 1, sortable: false }, 
        { name: "Name", selector: (row) => row.name, sortable: true },
        { name: "Date", selector: (row) => row.date, sortable: true },
        { name: "Punch In Time", selector: (row) => row.punchIn },
        { name: "Punch Out Time", selector: (row) => row.punchOut },
        { name: "Total Working Hours", selector: (row) => row.workingHours },
        { name: "Break Hours", selector: (row) => row.breakHours },
        { name: "Extra Hours", selector: (row) => row.extraHours },
        {
            name: "Action",
            cell: (row) => (
                <div className="flex space-x-2">
                    <FaEye className="cursor-pointer text-dark" onClick={() => handleView(row)} />
                    <FaEdit className="cursor-pointer ms-2 text-primary" onClick={() => handleEditAttendance(row)} />
                </div>
            ),
        },
    ];

    const data = [
        {
            id: 1,
            name: "John Doe",
            date: "2024-02-01",
            punchIn: "09:00 AM",
            punchOut: "06:00 PM",
            workingHours: "8h",
            breakHours: "1h",
            extraHours: "0h",
        },
        {
            id: 2,
            name: "Jane Smith",
            date: "2024-02-01",
            punchIn: "08:30 AM",
            punchOut: "05:30 PM",
            workingHours: "8h",
            breakHours: "1h",
            extraHours: "0.5h",
        },
    ];

    const handleView = (row) => {
        setSelectedRow(row);
        setFormData(row);
        setIsFormOpen(true);
    };

    const [selectedAttendance, setSelectedAttendance] = useState(null);
    const [formMode, setFormMode] = useState("add");

    const toggleSidebar = () => {
        const sidebarElement = document.getElementById('attendanceSidebar');
        if (sidebarElement) {
            const offcanvasInstance = new Offcanvas(sidebarElement);
            offcanvasInstance.show();
        }
    };

    const closeSidebar = () => {
        const sidebarElement = document.getElementById("attendanceSidebar");
        if (sidebarElement) {
            const offcanvasInstance = Offcanvas.getInstance(sidebarElement);
            if (offcanvasInstance) {
                offcanvasInstance.hide();
            }
        }
    };

    const handleAddAttendance = () => {
        setFormMode("add");
        setSelectedAttendance(null);
        toggleSidebar();
    };

    const handleEditAttendance = (attendance) => {
        setFormMode("edit");
        setSelectedAttendance(attendance);
        toggleSidebar();
    };

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let newErrors = {};
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.date) newErrors.date = "Date is required";
        if (!formData.punchIn) newErrors.punchIn = "Punch In Time is required";
        if (!formData.punchOut) newErrors.punchOut = "Punch Out Time is required";
        if (!formData.reason) newErrors.reason = "Reason is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        console.log('Form submitted:', formData);
        setIsFormOpen(false);
        setFormData({
            name: "",
            date: "",
            punchIn: "",
            punchOut: "",
            workingHours: "",
            breakHours: "",
            extraHours: "",
            reason: ""
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    return (
        <div className="p-4">
            <div className="title-head d-flex justify-content-between">
                <h6 className="mb-0 text-uppercase">Attendance List</h6>
            </div>

            <div className="d-flex align-items-center justify-content-end mb-3 gap-4">
                <input type="date" className="form-control me-2" style={{ maxWidth: '150px' }} />
                <input type="date" className="form-control me-2" style={{ maxWidth: '150px' }} />
                <button className="btn btn-primary me-2">Search</button>
                <a className="text-primary me-2 cursor-pointer">Clear Filter</a>
                <button
                    className="btn btn-primary"
                    data-bs-toggle=""
                    data-bs-target="#attendanceOffcanvas"
                    onClick={handleAddAttendance}
                >
                    Add Attendance
                </button>
            </div>

            <div className='p-6 bg-white rounded-lg shadow' style={{ padding: '20px', boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)' }}>
                <div className="container-fluid p-">
                    <DataTable columns={columns} data={data} pagination={true} />
                </div>
            </div>

            {/* Offcanvas Form */}
            <div className="offcanvas offcanvas-end" id="attendanceSidebar">
                <div className="offcanvas-header" style={{ backgroundColor: '#0047bb', color: 'white' }}>
                    <h5 className="offcanvas-title">{formMode === "add" ? "Add Attendance" : "Edit Attendance"}</h5>
                    <button type="button" className="btn-close" onClick={closeSidebar} aria-label="Close">
                        <i className="fa fa-close"></i>
                    </button>
                </div>
                <div className="offcanvas-body">
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Name <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} />
                            {errors.name && <small className="text-danger">{errors.name}</small>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Date <span className="text-danger">*</span></label>
                            <input type="date" className="form-control" name="date" value={formData.date} onChange={handleInputChange} />
                            {errors.date && <small className="text-danger">{errors.date}</small>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Punch In Time <span className="text-danger">*</span></label>
                            <input type="time" className="form-control" name="punchIn" value={formData.punchIn} onChange={handleInputChange} />
                            {errors.punchIn && <small className="text-danger">{errors.punchIn}</small>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Punch Out Time <span className="text-danger">*</span></label>
                            <input type="time" className="form-control" name="punchOut" value={formData.punchOut} onChange={handleInputChange} />
                            {errors.punchOut && <small className="text-danger">{errors.punchOut}</small>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Reason <span className="text-danger">*</span></label>
                            <textarea type="text" className="form-control" name="reason" value={formData.reason} onChange={handleInputChange} />
                            {errors.reason && <small className="text-danger">{errors.reason}</small>}
                        </div>                        <div className="mb-3">
                            <label className="form-label">Working Hours</label>
                            <input
                                type="text"
                                className="form-control"
                                name="workingHours"
                                value={formData.workingHours}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Break Hours</label>
                            <input
                                type="text"
                                className="form-control"
                                name="breakHours"
                                value={formData.breakHours}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Extra Hours</label>
                            <input
                                type="text"
                                className="form-control"
                                name="extraHours"
                                value={formData.extraHours}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mt-4 text-end">
                            <button type="submit" className="btn btn-primary me-2">
                                {formMode === "add" ? "Save" : "Update"}
                            </button>
                            <button type="button" className="btn btn-danger" onClick={closeSidebar}>
                                Cancel
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AttendanceTable;