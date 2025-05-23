// import React, { useState } from 'react'
// import DataTable from "react-data-table-component";
// import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Offcanvas } from "bootstrap";

// function MyAttendance() {
//     const [formData, setFormData] = useState({
//         date: "",
//         punchIn: "",
//         punchOut: "",
//         workingHours: "",
//         breakHours: "",
//         extraHours: "",
//         reason: ""
//     });
//     const [formMode, setFormMode] = useState("add");
//     const [errors, setErrors] = useState({});

//     // table 
//     const columns = [
//         { name: "SI No", selector: (row, index) => index + 1, sortable: false },
//         { name: "Date", selector: (row) => row.date, sortable: true },
//         { name: "Punch In Time", selector: (row) => row.punchIn, sortable: true },
//         { name: "Punch Out Time", selector: (row) => row.punchOut },
//         { name: "Total Working Hours", selector: (row) => row.workingHours },
//         { name: "Break Hours", selector: (row) => row.breakHours },
//         { name: "Extra Hours", selector: (row) => row.extraHours },
//         {
//             name: "Action",
//             cell: (row) => (
//                 <div className="flex space-x-2">
//                     <FaTrash className="cursor-pointer text-danger" onClick={() => handleDelete(row)} />
//                     <FaEdit className="cursor-pointer ms-2 text-primary" onClick={() => handleEditAttendance(row)} />
//                 </div>
//             ),
//         },
//     ];

//     const data = [
//         {
//             id: 1,
//             date: "2024-02-01",
//             punchIn: "09:00 AM",
//             punchOut: "06:00 PM",
//             workingHours: "8h",
//             breakHours: "1h",
//             extraHours: "0h",
//         },
//         {
//             id: 2,
//             name: "Jane Smith",
//             date: "2024-02-01",
//             punchIn: "08:30 AM",
//             punchOut: "05:30 PM",
//             workingHours: "8h",
//             breakHours: "1h",
//             extraHours: "0.5h",
//         },
//     ];

//     const [selectedAttendance, setSelectedAttendance] = useState(null);

//     const toggleSidebar = () => {
//         const sidebarElement = document.getElementById('attendanceSidebar');
//         if (sidebarElement) {
//             const offcanvasInstance = new Offcanvas(sidebarElement);
//             offcanvasInstance.show();
//         }
//     };

//     const handleAddAttendance = () => {
//         setFormMode("add");
//         setSelectedAttendance(null);
//         toggleSidebar();
//     };

//     const handleEditAttendance = (attendance) => {
//         setFormMode("edit");
//         setSelectedAttendance(attendance);
//         toggleSidebar();
//     };

//     const handleDelete = (row) => {
//         console.log("Deleting attendance:", row);
//         // Implement delete logic here
//     };

//     // Validation 
//     const validateForm = () => {
//         let newErrors = {};
//         if (!formData.name) newErrors.name = "Name is required";
//         if (!formData.date) newErrors.date = "Date is required";
//         if (!formData.punchIn) newErrors.punchIn = "Punch In Time is required";
//         if (!formData.punchOut) newErrors.punchOut = "Punch Out Time is required";
//         if (!formData.reason) newErrors.reason = "Reason is required";

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleFormSubmit = (event) => {
//         event.preventDefault();
//         if (!validateForm()) return;

//         console.log("Form submitted:", formData);
//         // Implement form submission logic here
//     };

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     // sidebar Closing
//     const closeSidebar = () => {
//         const sidebarElement = document.getElementById("attendanceSidebar");
//         if (sidebarElement) {
//             const offcanvasInstance = Offcanvas.getInstance(sidebarElement);
//             if (offcanvasInstance) {
//                 offcanvasInstance.hide();
//             }
//         }
//     };

//     return (
//         <div className="container-fluid mt-5 w-100 p-4" >
//             <div className="row">
//                 <div className="col-12">
//                     <div className="btm-for mb-4 d-flex justify-content-end">
//                         <div className="btn-group">
//                             <button className="btn btn-primary" onClick={handleAddAttendance}>
//                                 <i className="fa fa-plus me-2"></i> Add Attendance
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="title-head d-flex justify-content-between">
//                 <h6 className="mb-0 text-uppercase">My Attendance List</h6>
//             </div>
//             <hr />
//             <div className="card shadow-sm border-0 p-3 w-100">
//                 <DataTable columns={columns} data={data} pagination responsive className="w-100" />
//             </div>

//             {/* Offcanvas Sidebar */}
//             <div className="offcanvas offcanvas-end" id="attendanceSidebar" tabIndex="-1" aria-labelledby="attendanceSidebarLabel">
//                 {/* Header */}
//                 <div className="offcanvas-header text-white" style={{ backgroundColor: "#0047bb" }}>
//                     <h5 className="offcanvas-title">{formMode === "add" ? "Add My Attendance" : "Edit My Attendance"}</h5>
//                     <button type="button" className="btn-close text-white" onClick={closeSidebar}>
//                         <i className="fa fa-close"></i>
//                     </button>
//                 </div>

//                 {/* Offcanvas Body - Scrollable Form */}
//                 <div className="offcanvas-body d-flex flex-column">
//                     <form className="flex-grow-1">
//                         <div className="mb-3">
//                             <label className="form-label fw-bold">Date <span className="text-danger">*</span></label>
//                             <input type="date" className="form-control" name="date" value={formData.date} onChange={handleInputChange} />
//                             {errors.date && <small className="text-danger">{errors.date}</small>}
//                         </div>
//                         <div className="mb-3">
//                             <label className="form-label fw-bold">Punch In Time <span className="text-danger">*</span></label>
//                             <input type="time" className="form-control" name="punchIn" value={formData.punchIn} onChange={handleInputChange} />
//                             {errors.punchIn && <small className="text-danger">{errors.punchIn}</small>}
//                         </div>
//                         <div className="mb-3">
//                             <label className="form-label fw-bold">Punch Out Time <span className="text-danger">*</span></label>
//                             <input type="time" className="form-control" name="punchOut" value={formData.punchOut} onChange={handleInputChange} />
//                             {errors.punchOut && <small className="text-danger">{errors.punchOut}</small>}
//                         </div>
//                         <div className="mb-3">
//                             <label className="form-label fw-bold">Reason <span className="text-danger">*</span></label>
//                             <textarea className="form-control" name="reason" value={formData.reason} onChange={handleInputChange} />
//                             {errors.reason && <small className="text-danger">{errors.reason}</small>}
//                         </div>
//                     </form>
//                 </div>

//                 {/* Footer with Buttons at the Bottom */}
//                 <div className="offcanvas-footer p-3 bg-light border-top">
//                     <button type="submit" className="btn btn-primary me-2 " onClick={handleFormSubmit}>
//                         {formMode === "add" ? "Save" : "Update"}
//                     </button>
//                     <button type="button" className="btn btn-danger" onClick={closeSidebar}>
//                         Cancel
//                     </button>
//                 </div>
//             </div>
//         </div>

//     )
// }

// export default MyAttendance

import React, { useState, useEffect } from 'react';
import DataTable from "react-data-table-component";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { Offcanvas } from "bootstrap";
import { useForm } from "react-hook-form";

function MyAttendance() {
    // React Hook Form setup
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        defaultValues: {
            date: "",
            punchIn: "",
            punchOut: "",
            workingHours: "",
            breakHours: "",
            extraHours: "",
            reason: ""
        },
        mode: "onSubmit" // Only validate on form submission
    });
    const [formMode, setFormMode] = useState("add");
    const [selectedAttendance, setSelectedAttendance] = useState(null);

    // table 
    const columns = [
        { name: "SI No", selector: (row, index) => index + 1, sortable: false },
        { name: "Date", selector: (row) => row.date, sortable: true },
        { name: "Punch In Time", selector: (row) => row.punchIn, sortable: true },
        { name: "Punch Out Time", selector: (row) => row.punchOut },
        { name: "Total Working Hours", selector: (row) => row.workingHours },
        { name: "Break Hours", selector: (row) => row.breakHours },
        { name: "Extra Hours", selector: (row) => row.extraHours },
        {
            name: "Action",
            cell: (row) => (
                <div className="flex space-x-2">
                    <FaTrash className="cursor-pointer text-danger" onClick={() => handleDelete(row)} />
                    <FaEdit className="cursor-pointer ms-2 text-primary" onClick={() => handleEditAttendance(row)} />
                </div>
            ),
        },
    ];

    const data = [
        {
            id: 1,
            date: "2024-02-01",
            punchIn: "09:00",
            punchOut: "18:00",
            workingHours: "8h",
            breakHours: "1h",
            extraHours: "0h",
            reason: "Regular work day"
        },
        {
            id: 2,
            date: "2024-02-02",
            punchIn: "08:30",
            punchOut: "17:30",
            workingHours: "8h",
            breakHours: "1h",
            extraHours: "0.5h",
            reason: "Project deadline"
        },
    ];

    const toggleSidebar = () => {
        const sidebarElement = document.getElementById('attendanceSidebar');
        if (sidebarElement) {
            const offcanvasInstance = new Offcanvas(sidebarElement);
            offcanvasInstance.show();
        }
    };

    const handleAddAttendance = () => {
        setFormMode("add");
        setSelectedAttendance(null);
        // Reset form AND clear errors when adding new attendance
        reset({
            date: "",
            punchIn: "",
            punchOut: "",
            workingHours: "",
            breakHours: "",
            extraHours: "",
            reason: ""
        }, { 
            keepErrors: false, // This ensures errors are cleared
            keepDirty: false
        });
        toggleSidebar();
    };
    
    const handleEditAttendance = (attendance) => {
        setFormMode("edit");
        setSelectedAttendance(attendance);
        
        // Reset the form with the new values AND clear previous errors
        reset({
            date: attendance.date,
            punchIn: attendance.punchIn,
            punchOut: attendance.punchOut,
            workingHours: attendance.workingHours,
            breakHours: attendance.breakHours,
            extraHours: attendance.extraHours,
            reason: attendance.reason
        }, {
            keepErrors: false, // Clear any existing errors
            keepDirty: false
        });
        
        toggleSidebar();
    };
    const handleDelete = (row) => {
        console.log("Deleting attendance:", row);
        // Implement delete logic here
    };

    // Form submission using React Hook Form
    const onSubmit = (data) => {
        console.log("Form submitted:", data);
        
        if (formMode === "add") {
            // Add new attendance logic
            console.log("Adding new attendance:", data);
        } else {
            // Update existing attendance logic
            console.log("Updating attendance:", data);
        }
        
        // Close the sidebar after submission
        closeSidebar();
    };

    // sidebar Closing
    const closeSidebar = () => {
        const sidebarElement = document.getElementById("attendanceSidebar");
        if (sidebarElement) {
            const offcanvasInstance = Offcanvas.getInstance(sidebarElement);
            if (offcanvasInstance) {
                offcanvasInstance.hide();
            }
        }
    };

    return (
        <div className="container-fluid mt-5 w-100 p-4" >
            <div className="row">
                <div className="col-12">
                    <div className="btm-for mb-4 d-flex justify-content-end">
                        <div className="btn-group">
                            <button className="btn btn-primary" onClick={handleAddAttendance}>
                                <i className="fa fa-plus me-2"></i> Add Attendance
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="title-head d-flex justify-content-between">
                <h6 className="mb-0 text-uppercase">My Attendance List</h6>
            </div>
            <hr />
            <div className="card shadow-sm border-0 p-3 w-100">
                <DataTable columns={columns} data={data} pagination responsive className="w-100" />
            </div>

            {/* Offcanvas Sidebar */}
            <div className="offcanvas offcanvas-end" id="attendanceSidebar" tabIndex="-1" aria-labelledby="attendanceSidebarLabel">
                {/* Header */}
                <div className="offcanvas-header text-white" style={{ backgroundColor: "#0047bb" }}>
                    <h5 className="offcanvas-title">{formMode === "add" ? "Add My Attendance" : "Edit My Attendance"}</h5>
                    <button type="button" className="btn-close text-white" onClick={closeSidebar}>
                        <i className="fa fa-close"></i>
                    </button>
                </div>

                {/* Offcanvas Body - Scrollable Form */}
                <div className="offcanvas-body d-flex flex-column">
                    <form id="attendanceForm" className="flex-grow-1" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Date <span className="text-danger">*</span></label>
                            <input 
                                type="date" 
                                className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                                {...register("date", { required: "Date is required" })}
                            />
                            {errors.date && <small className="text-danger">{errors.date.message}</small>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Punch In Time <span className="text-danger">*</span></label>
                            <input 
                                type="time" 
                                className={`form-control ${errors.punchIn ? 'is-invalid' : ''}`}
                                {...register("punchIn", { required: "Punch In Time is required" })}
                            />
                            {errors.punchIn && <small className="text-danger">{errors.punchIn.message}</small>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Punch Out Time <span className="text-danger">*</span></label>
                            <input 
                                type="time" 
                                className={`form-control ${errors.punchOut ? 'is-invalid' : ''}`}
                                {...register("punchOut", { required: "Punch Out Time is required" })}
                            />
                            {errors.punchOut && <small className="text-danger">{errors.punchOut.message}</small>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Working Hours</label>
                            <input 
                                type="text" 
                                className="form-control"
                                {...register("workingHours")}
                                readOnly
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Break Hours</label>
                            <input 
                                type="text" 
                                className="form-control"
                                {...register("breakHours")}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Extra Hours</label>
                            <input 
                                type="text" 
                                className="form-control"
                                {...register("extraHours")}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Reason <span className="text-danger">*</span></label>
                            <textarea 
                                className={`form-control ${errors.reason ? 'is-invalid' : ''}`}
                                {...register("reason", { required: "Reason is required" })}
                            />
                            {errors.reason && <small className="text-danger">{errors.reason.message}</small>}
                        </div>
                    </form>
                </div>

                {/* Footer with Buttons at the Bottom */}
                <div className="offcanvas-footer p-3 bg-light border-top">
                    <button type="submit" form="attendanceForm" className="btn btn-primary me-2">
                        {formMode === "add" ? "Save" : "Update"}
                    </button>
                    <button type="button" className="btn btn-danger" onClick={closeSidebar}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MyAttendance;