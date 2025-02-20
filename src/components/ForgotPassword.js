import React, { useState } from 'react';
import "../commonStyle/Login.css";
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
function ForgotPassword() {
    const [formData, setFormData] = useState({
        email: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const response = await fetch('https://hrms.neork.io/api/forgot-password-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: formData.email })
            });

            const result = await response.json();

            if (response.ok) {
                setMessage("Password reset link sent successfully!");
                setMessageType("success");
            } else {
                setMessage(result.message || "Something went wrong. Please try again.");
                setMessageType("error");
            }
        } catch (error) {
            setMessage("Network error. Please try again later.");
            setMessageType("error");
        } finally {
            setLoading(false);
            setTimeout(() => setMessage(null), 5000); // Hide message after 5 seconds
        }
    };

    return (
        <div className='container'>
            <div className="card" style={{ width: '50%', padding: '20px' }}>

                {/* back button to login */}
                <button onClick={() => navigate('/')} className="btn btn-light" style={{ position: "absolute", left: "20px", top: "20px", transition: "color 0.3s ease" }}
                    onMouseOver={(e) => e.target.style.color = "blue"}
                    onMouseOut={(e) => e.target.style.color = "black"}>
                    <FaArrowLeft /> Back
                </button>
                {/* neork logo */}
                <div className="text-center mb-4">
                    <img
                        src="https://i.postimg.cc/xdr6DCmg/neork-logo-200.png"
                        alt="Neork Logo"
                        className="mb-3"
                        style={{ width: '200px', height: 'auto' }}
                    />
                    <h2 className="mb-" style={{ fontSize: '13px' }}>Please fill the below details to reset your password</h2>
                </div>
                <div className="card-body">
                    {message && (
                        <div className={`alert ${messageType === "success" ? "alert-success" : "alert-danger"}`}
                         style={{ textAlign: "center", padding: "10px", borderRadius: "5px", marginBottom: "10px",
                            backgroundColor: messageType === "success" ? "#d4edda" : "#f8d7da",
                            color: messageType === "success" ? "#155724" : "#721c24"
                        }}>
                            {message}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 w-75 mx-auto">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className='form-control'
                                placeholder="Enter Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="d-flex justify-content-center mb-4">
                            <button type="submit" className="btn btn-primary reset" disabled={loading}>
                                {loading ? "Sending..." : "Send Password Reset Link"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;