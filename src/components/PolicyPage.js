import React, { useState } from 'react';
import { FaEdit, FaDownload } from 'react-icons/fa';

function PolicyPage() {
    const [policyData] = useState([
        {
            id: 1,
            title: "Holiday List 2025",
            description: "Holiday List",
            effectiveFrom: "2025-01-01",
            status: "Active",
        },
    ]);

    const [selectedPolicy, setSelectedPolicy] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleEditClick = (policy) => {
        setSelectedPolicy(policy);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedPolicy(null);
    };

    const downloadCSV = () => {
        const csvData = [
            ["#", "Title", "Description", "Effective From", "Status"], // Header row
            ...policyData.map((row) => [
                row.id,
                row.title,
                row.description,
                row.effectiveFrom,
                row.status,
            ]),
        ];

        const csvContent =
            "data:text/csv;charset=utf-8," +
            csvData.map((e) => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "policy_data.csv");
        document.body.appendChild(link); // Required for Firefox
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <header style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Policy Details</h1>
                <button
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#007BFF',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}
                    onClick={downloadCSV}
                >
                    <FaDownload /> Download CSV
                </button>
            </header>

            <div>
                <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Policy Data Table</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#f9f9f9' }}>
                    <thead style={{ backgroundColor: '#f1f1f1' }}>
                        <tr>
                            <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>#</th>
                            <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>Title</th>
                            <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>Description</th>
                            <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>Effective From</th>
                            <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>Status</th>
                            <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {policyData.map((policy) => (
                            <tr key={policy.id}>
                                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{policy.id}</td>
                                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{policy.title}</td>
                                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{policy.description}</td>
                                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{policy.effectiveFrom}</td>
                                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{policy.status}</td>
                                <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>
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
                                        onClick={() => handleEditClick(policy)}
                                    >
                                        <FaEdit /> Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && selectedPolicy && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div
                        style={{
                            width: '400px',
                            backgroundColor: '#fff',
                            borderRadius: '8px',
                            padding: '20px',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Edit Policy</h2>
                        <p>
                            <strong>Title:</strong> {selectedPolicy.title}
                        </p>
                        <p>
                            <strong>Description:</strong> {selectedPolicy.description}
                        </p>
                        <p>
                            <strong>Effective From:</strong> {selectedPolicy.effectiveFrom}
                        </p>
                        <p>
                            <strong>Status:</strong> {selectedPolicy.status}
                        </p>
                        <button
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#FF4D4F',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                marginTop: '20px',
                            }}
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PolicyPage;
