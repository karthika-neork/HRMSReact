// import React, { useState } from 'react';
// import { FaEdit, FaDownload } from 'react-icons/fa';
// import DataTable from 'react-data-table-component';
// const dummyData = [
//     { id: 1, title: 'Leave Policy', description: 'Details about leave policy', effectiveFrom: '2024-01-01', status: 'Active' },
//     { id: 2, title: 'Work From Home', description: 'WFH guidelines and rules', effectiveFrom: '2023-06-15', status: 'Inactive' },
//     { id: 3, title: 'Overtime Policy', description: 'Overtime pay and limits', effectiveFrom: '2022-12-01', status: 'Active' },
//     { id: 4, title: 'Dress Code', description: 'Official dress code rules', effectiveFrom: '2024-03-10', status: 'Active' }
// ];
// function PolicyPage() {
//     const columns = [
//         {
//             name: '#',
//             selector: row => row.id,
//             sortable: true,
//         },
//         {
//             name: 'Title',
//             selector: row => row.title,
//             sortable: true,
//         },
//         {
//             name: 'Description',
//             selector: row => row.description,
//             sortable: false,
//         },
//         {
//             name: 'Effective From',
//             selector: row => row.effectiveFrom,
//             sortable: true,
//         },
//         {
//             name: 'Status',
//             selector: row => row.status,
//             sortable: true,
//         },
//         {
//             name: 'Action',
//             cell: row => (
//                 <button
//                     style={{
//                         padding: '5px 10px',
//                         backgroundColor: '#007BFF',
//                         color: '#fff',
//                         border: 'none',
//                         borderRadius: '4px',
//                         cursor: 'pointer',
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '5px',
//                     }}
//                     onClick={() => handleEditClick(row)}
//                 >
//                     <FaEdit /> Edit
//                 </button>
//             ),
//             ignoreRowClick: true,
//             allowOverflow: true,
//             button: true,
//         }
//     ];

//     const [selectedPolicy, setSelectedPolicy] = useState(null);
//     const [showModal, setShowModal] = useState(false);

//     const handleEditClick = (policy) => {
//         setSelectedPolicy(policy);
//         setShowModal(true);
//     };

//     const closeModal = () => {
//         setShowModal(false);
//         setSelectedPolicy(null);
//     };

//     const downloadCSV = () => {
//         const csvData = [
//             ["#", "Title", "Description", "Effective From", "Status"], // Header row
//             ...dummyData.map((row) => [
//                 row.id,
//                 row.title,
//                 row.description,
//                 row.effectiveFrom,
//                 row.status,
//             ]),
//         ];

//         const csvContent =
//             "data:text/csv;charset=utf-8," +
//             csvData.map((e) => e.join(",")).join("\n");

//         const encodedUri = encodeURI(csvContent);
//         const link = document.createElement("a");
//         link.setAttribute("href", encodedUri);
//         link.setAttribute("download", "policy_data.csv");
//         document.body.appendChild(link); // Required for Firefox
//         link.click();
//         document.body.removeChild(link);
//     };

//     return (
//         <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//             {/* <div className='row'>
//                 <div className='col-6'> <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Policy Details</h1></div>
                
//             </div> */}
//             <div className='col-6 d-flex justify-content-end ms-auto' >
//                     <button className="btn btn-primary" onClick={downloadCSV}>
//                         <FaDownload className="me-2" /> Download CSV
//                     </button>
//                 </div>
//                 <div className='row'>
//                 <div className='col-6'> <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Policy Details</h1></div>
                
//             </div>
// <hr />
//             <div className='row'>
//                 <DataTable
//                     // title="Policy List"
//                     columns={columns}
//                     data={dummyData}
//                     pagination
//                     highlightOnHover
//                     responsive
//                 />
//             </div>
//             {/* Modal */}
//             {showModal && selectedPolicy && (
//                 <div
//                     style={{
//                         position: 'fixed',
//                         top: 0,
//                         left: 0,
//                         width: '100%',
//                         height: '100%',
//                         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//                         display: 'flex',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                     }}
//                 >
//                     <div
//                         style={{
//                             width: '400px',
//                             backgroundColor: '#fff',
//                             borderRadius: '8px',
//                             padding: '20px',
//                             boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//                         }}
//                     >
//                         <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Edit Policy</h2>
//                         <p>
//                             <strong>Title:</strong> {selectedPolicy.title}
//                         </p>
//                         <p>
//                             <strong>Description:</strong> {selectedPolicy.description}
//                         </p>
//                         <p>
//                             <strong>Effective From:</strong> {selectedPolicy.effectiveFrom}
//                         </p>
//                         <p>
//                             <strong>Status:</strong> {selectedPolicy.status}
//                         </p>
//                         <button
//                             style={{
//                                 padding: '10px 20px',
//                                 backgroundColor: '#FF4D4F',
//                                 color: '#fff',
//                                 border: 'none',
//                                 borderRadius: '4px',
//                                 cursor: 'pointer',
//                                 marginTop: '20px',
//                             }}
//                             onClick={closeModal}
//                         >
//                             Close
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default PolicyPage;


import React, { useState, useCallback, useMemo } from 'react';
import { FaEdit, FaDownload } from 'react-icons/fa';
import DataTable from 'react-data-table-component';

const PolicyPage = () => {
    const dummyData = useMemo(() => [
        { id: 1, title: 'Leave Policy', description: 'Details about leave policy', effectiveFrom: '2024-01-01', status: 'Active' },
        { id: 2, title: 'Work From Home', description: 'WFH guidelines and rules', effectiveFrom: '2023-06-15', status: 'Inactive' },
        { id: 3, title: 'Overtime Policy', description: 'Overtime pay and limits', effectiveFrom: '2022-12-01', status: 'Active' },
        { id: 4, title: 'Dress Code', description: 'Official dress code rules', effectiveFrom: '2024-03-10', status: 'Active' }
    ], []);

    const [selectedPolicy, setSelectedPolicy] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleEditClick = useCallback((policy) => {
        setSelectedPolicy(policy);
        setShowModal(true);
    }, []);

    const closeModal = useCallback(() => {
        setShowModal(false);
        setSelectedPolicy(null);
    }, []);

    const downloadCSV = useCallback(() => {
        const csvData = [
            ['#', 'Title', 'Description', 'Effective From', 'Status'],
            ...dummyData.map(row => [
                row.id,
                row.title,
                row.description,
                row.effectiveFrom,
                row.status,
            ]),
        ];
        const csvContent = 'data:text/csv;charset=utf-8,' + csvData.map(e => e.join(',')).join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'policy_data.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, [dummyData]);

    const columns = useMemo(() => [
        {
            name: '#',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Description',
            selector: row => row.description,
            sortable: false,
        },
        {
            name: 'Effective From',
            selector: row => row.effectiveFrom,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
        },
        {
            name: 'Action',
            cell: row => (
                <button
                    style={{
                        padding: '5px 10px',
                        backgroundColor: '#007BFF',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                    }}
                    onClick={() => handleEditClick(row)}
                >
                    <FaEdit /> Edit
                </button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ], [handleEditClick]);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <div className='col-6 d-flex justify-content-end ms-auto'>
                <button className='btn btn-primary' onClick={downloadCSV}>
                    <FaDownload className='me-2' /> Download CSV
                </button>
            </div>
            <div className='row'>
                <div className='col-6'><h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Policy Details</h1></div>
            </div>
            <hr />
            <div className='row'>
                <DataTable
                    columns={columns}
                    data={dummyData}
                    pagination
                    highlightOnHover
                    responsive
                />
            </div>
            {showModal && selectedPolicy && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                    <div style={{
                        width: '400px', backgroundColor: '#fff', borderRadius: '8px',
                        padding: '20px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}>
                        <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Edit Policy</h2>
                        <p><strong>Title:</strong> {selectedPolicy.title}</p>
                        <p><strong>Description:</strong> {selectedPolicy.description}</p>
                        <p><strong>Effective From:</strong> {selectedPolicy.effectiveFrom}</p>
                        <p><strong>Status:</strong> {selectedPolicy.status}</p>
                        <button style={{
                            padding: '10px 20px', backgroundColor: '#FF4D4F', color: '#fff',
                            border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '20px'
                        }} onClick={closeModal}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PolicyPage;
