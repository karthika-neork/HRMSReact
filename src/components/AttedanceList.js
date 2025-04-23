// import React, { useState } from "react";
// import DataTable from "react-data-table-component";
// import { FaEye, FaEdit } from "react-icons/fa";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Offcanvas } from "bootstrap";
// const AttendanceTable = () => {
//     const [isFormOpen, setIsFormOpen] = useState(false);
//     const [selectedRow, setSelectedRow] = useState(null);
//     const [globalFilter, setGlobalFilter] = useState("");
//     const [formData, setFormData] = useState({
//         name: "",
//         date: "",
//         punchIn: "",
//         punchOut: "",
//         workingHours: "",
//         breakHours: "",
//         extraHours: "",
//         reason: ""
//     });

//     const columns = [
//         { name: "SI No", selector: (row, index) => index + 1, sortable: false },
//         { name: "Name", selector: (row) => row.name, sortable: true },
//         { name: "Date", selector: (row) => row.date, sortable: true },
//         { name: "Punch In Time", selector: (row) => row.punchIn },
//         { name: "Punch Out Time", selector: (row) => row.punchOut },
//         { name: "Total Working Hours", selector: (row) => row.workingHours },
//         { name: "Break Hours", selector: (row) => row.breakHours },
//         { name: "Extra Hours", selector: (row) => row.extraHours },
//         {
//             name: "Action",
//             cell: (row) => (
//                 <div className="flex space-x-2">
//                     <FaEye className="cursor-pointer text-dark" onClick={() => handleView(row)} />
//                     <FaEdit className="cursor-pointer ms-2 text-primary" onClick={() => handleEditAttendance(row)} />
//                 </div>
//             ),
//         },
//     ];

//     const data = [
//         {
//             id: 1,
//             name: "John Doe",
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

//     const handleView = (row) => {
//         setSelectedRow(row);
//         setFormData(row);
//         setIsFormOpen(true);
//     };

//     const [selectedAttendance, setSelectedAttendance] = useState(null);
//     const [formMode, setFormMode] = useState("add");

//     const toggleSidebar = () => {
//         const sidebarElement = document.getElementById('attendanceSidebar');
//         if (sidebarElement) {
//             const offcanvasInstance = new Offcanvas(sidebarElement);
//             offcanvasInstance.show();
//         }
//     };

//     const closeSidebar = () => {
//         const sidebarElement = document.getElementById("attendanceSidebar");
//         if (sidebarElement) {
//             const offcanvasInstance = Offcanvas.getInstance(sidebarElement);
//             if (offcanvasInstance) {
//                 offcanvasInstance.hide();
//             }
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

//     const [errors, setErrors] = useState({});

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

//     const handleFormSubmit = (e) => {
//         e.preventDefault();
//         if (!validateForm()) return;

//         console.log('Form submitted:', formData);
//         setIsFormOpen(false);
//         setFormData({
//             name: "",
//             date: "",
//             punchIn: "",
//             punchOut: "",
//             workingHours: "",
//             breakHours: "",
//             extraHours: "",
//             reason: ""
//         });
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };
//     return (
//         <div className="p-4">
//             <div className="title-head d-flex justify-content-between">
//                 <h6 className="mb-0 text-uppercase">Attendance List</h6>
//             </div>

//             <div className="d-flex overflow-auto">
//                 <div className="d-flex flex-nowrap align-items-center gap-2 gap-md-3 py-2 w-100 justify-content-md-end">
//                     <input type="date" className="form-control w-auto w-md-25" style={{ minWidth: '150px', maxWidth: '200px' }} />
//                     <input type="date" className="form-control w-auto w-md-25" style={{ minWidth: '150px', maxWidth: '200px' }} />
//                     <button className="btn btn-primary" style={{ minWidth: '120px' }}>Search</button>
//                     <a className="text-primary cursor-pointer" style={{ minWidth: '80px' }}>Clear Filter</a>
//                     <button
//                         className="btn btn-primary"
//                         style={{ minWidth: '150px' }}
//                         data-bs-toggle=""
//                         data-bs-target="#attendanceOffcanvas"
//                         onClick={handleAddAttendance}
//                     >
//                         Add Attendance
//                     </button>
//                 </div>
//             </div>

//             <div className='p-6 bg-white rounded-lg shadow' style={{ padding: '20px', boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)' }}>
//                 <div className="container-fluid p-">
//                     <DataTable columns={columns} data={data} pagination={true} />
//                 </div>
//             </div>

//             {/* Offcanvas Form */}
//             <div className="offcanvas offcanvas-end" id="attendanceSidebar">
//                 <div className="offcanvas-header" style={{ backgroundColor: '#0047bb', color: 'white' }}>
//                     <h5 className="offcanvas-title">{formMode === "add" ? "Add Attendance" : "Edit Attendance"}</h5>
//                     <button type="button" className="btn-close" onClick={closeSidebar} aria-label="Close">
//                         <i className="fa fa-close"></i>
//                     </button>
//                 </div>
//                 <div className="offcanvas-body">
//                     <form onSubmit={handleFormSubmit}>
//                         <div className="mb-3">
//                             <label className="form-label">Name <span className="text-danger">*</span></label>
//                             <input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} />
//                             {errors.name && <small className="text-danger">{errors.name}</small>}
//                         </div>
//                         <div className="mb-3">
//                             <label className="form-label">Date <span className="text-danger">*</span></label>
//                             <input type="date" className="form-control" name="date" value={formData.date} onChange={handleInputChange} />
//                             {errors.date && <small className="text-danger">{errors.date}</small>}
//                         </div>
//                         <div className="mb-3">
//                             <label className="form-label">Punch In Time <span className="text-danger">*</span></label>
//                             <input type="time" className="form-control" name="punchIn" value={formData.punchIn} onChange={handleInputChange} />
//                             {errors.punchIn && <small className="text-danger">{errors.punchIn}</small>}
//                         </div>
//                         <div className="mb-3">
//                             <label className="form-label">Punch Out Time <span className="text-danger">*</span></label>
//                             <input type="time" className="form-control" name="punchOut" value={formData.punchOut} onChange={handleInputChange} />
//                             {errors.punchOut && <small className="text-danger">{errors.punchOut}</small>}
//                         </div>
//                         <div className="mb-3">
//                             <label className="form-label">Reason <span className="text-danger">*</span></label>
//                             <textarea type="text" className="form-control" name="reason" value={formData.reason} onChange={handleInputChange} />
//                             {errors.reason && <small className="text-danger">{errors.reason}</small>}
//                         </div>                        <div className="mb-3">
//                             <label className="form-label">Working Hours</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 name="workingHours"
//                                 value={formData.workingHours}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label className="form-label">Break Hours</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 name="breakHours"
//                                 value={formData.breakHours}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label className="form-label">Extra Hours</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 name="extraHours"
//                                 value={formData.extraHours}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                         </div>
//                         <div className="mt-4 text-end">
//                             <button type="submit" className="btn btn-primary me-2">
//                                 {formMode === "add" ? "Save" : "Update"}
//                             </button>
//                             <button type="button" className="btn btn-danger" onClick={closeSidebar}>
//                                 Cancel
//                             </button>

//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AttendanceTable;


import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useForm } from "react-hook-form";
import { FaEye, FaEdit } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { Offcanvas } from "bootstrap";

const AttendanceTable = () => {
    const [selectedAttendance, setSelectedAttendance] = useState(null);
    const [formMode, setFormMode] = useState("add");

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        mode: "onSubmit",
    });

    const columns = [
        { name: "SI No", selector: (row, index) => index + 1 },
        { name: "Name", selector: (row) => row.name },
        { name: "Date", selector: (row) => row.date },
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
            reason: "Normal day"
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
            reason: "Worked extra"
        },
    ];

    const toggleSidebar = () => {
        const sidebarElement = document.getElementById("attendanceSidebar");
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
        reset(); // Clear previous values and errors
        toggleSidebar();
    };

    const handleEditAttendance = (attendance) => {
        setFormMode("edit");
        setSelectedAttendance(attendance);
        reset(attendance); // Set form values and clear errors
        toggleSidebar();
    };

    const handleView = (row) => {
        alert(`Viewing attendance for ${row.name}`);
    };

    const onSubmit = (data) => {
        console.log("Form submitted:", data);
        closeSidebar();
        reset(); // Reset form after successful submit
    };

    return (
        <div className="p-4">
            <div className="title-head d-flex justify-content-between">
                <h6 className="mb-0 text-uppercase">Attendance List</h6>
            </div>

            <div className="d-flex overflow-auto">
                <div className="d-flex flex-nowrap align-items-center gap-2 gap-md-3 py-2 w-100 justify-content-md-end">
                    <input type="date" className="form-control w-auto w-md-25" style={{ minWidth: '150px', maxWidth: '200px' }} />
                    <input type="date" className="form-control w-auto w-md-25" style={{ minWidth: '150px', maxWidth: '200px' }} />
                    <button className="btn btn-primary" style={{ minWidth: '120px' }}>Search</button>
                    <a className="text-primary cursor-pointer" style={{ minWidth: '80px' }}>Clear Filter</a>
                    <button
                        className="btn btn-primary"
                        style={{ minWidth: '150px' }}
                        onClick={handleAddAttendance}
                    >
                        Add Attendance
                    </button>
                </div>
            </div>

            <div className='p-6 bg-white rounded-lg shadow' style={{ padding: '20px', boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)' }}>
                <div className="container-fluid">
                    <DataTable columns={columns} data={data} pagination />
                </div>
            </div>

            {/* Offcanvas Form */}
            <div className="offcanvas offcanvas-end" id="attendanceSidebar">
                <div className="offcanvas-header" style={{ backgroundColor: '#0047bb', color: 'white' }}>
                    <h5 className="offcanvas-title">{formMode === "add" ? "Add Attendance" : "Edit Attendance"}</h5>
                    <button type="button" className="btn-close" onClick={closeSidebar}></button>
                </div>
                <div className="offcanvas-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label className="form-label">Name <span className="text-danger">*</span></label>
                            <input className="form-control" {...register("name", { required: "Name is required" })} />
                            {errors.name && <small className="text-danger">{errors.name.message}</small>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Date <span className="text-danger">*</span></label>
                            <input type="date" className="form-control" {...register("date", { required: "Date is required" })} />
                            {errors.date && <small className="text-danger">{errors.date.message}</small>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Punch In Time <span className="text-danger">*</span></label>
                            <input type="time" className="form-control" {...register("punchIn", { required: "Punch In Time is required" })} />
                            {errors.punchIn && <small className="text-danger">{errors.punchIn.message}</small>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Punch Out Time <span className="text-danger">*</span></label>
                            <input type="time" className="form-control" {...register("punchOut", { required: "Punch Out Time is required" })} />
                            {errors.punchOut && <small className="text-danger">{errors.punchOut.message}</small>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Reason <span className="text-danger">*</span></label>
                            <textarea className="form-control" {...register("reason", { required: "Reason is required" })} />
                            {errors.reason && <small className="text-danger">{errors.reason.message}</small>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Working Hours</label>
                            <input className="form-control" {...register("workingHours")} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Break Hours</label>
                            <input className="form-control" {...register("breakHours")} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Extra Hours</label>
                            <input className="form-control" {...register("extraHours")} />
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
