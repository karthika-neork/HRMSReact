import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../commonStyle/Login.css";
import { FaEye } from "react-icons/fa";

const ResetPassword = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [formErrors, setFormErrors] = useState({});
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    // password showing
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!formData.email) {
            errors.email = "Email is required.";
            isValid = false;
        }
        if (!formData.password) {
            errors.password = "Password is required.";
            isValid = false;
        } else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters.";
            isValid = false;
        }
        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "Passwords do not match.";
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await axios.post("https://hrms.neork.io/api/reset-password", formData);
            if (response.data.status === "success") {
                alert("Password reset successful.");
                navigate("/login");
            } else {
                setFormErrors({ general: response.data.message || "Error resetting password." });
            }
        } catch (error) {
            setFormErrors({ general: "Something went wrong. Please try again." });
        }
    };

    return (
        <div className="container">
            <div className="card" style={{ width: "35%", textAlign: "center", backgroundColor: "white" }}>
                <div className="card-body">
                    <div className="text-center mb-4">
                        <img
                            src="https://i.postimg.cc/xdr6DCmg/neork-logo-200.png"
                            alt="Neork Logo"
                            className="mb-3"
                            style={{ width: '200px', height: 'auto' }}
                        />
                        <h5 className="mb-3 " style={{ fontSize: '13px', color: 'grey' }}>Please fill the below details to reset your password</h5>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                placeholder=""
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {formErrors.email && <span className="text-danger">{formErrors.email}</span>}
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="password" className="form-label">Password</label>
                            <div className="input-group">
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    className="form-control"
                                    placeholder=""
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="new-password" // Prevents the unwanted icon
                                />
                                <button type="button" className="input-group-text" onClick={togglePasswordVisibility}>
                                    <FaEye />
                                </button>
                            </div>
                            {formErrors.password && <span className="text-danger">{formErrors.password}</span>}
                        </div>

                        <div className="mb-3 text-start">
                            <label htmlFor="confirmPassword" className="form-label">Re-enter Password</label>
                            <div className="input-group">
                                <input
                                    type={confirmPasswordVisible ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    className="form-control"
                                    placeholder=""
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    autoComplete="off" />
                                <button type="button" className="input-group-text" onClick={toggleConfirmPasswordVisibility}>
                                    <FaEye />
                                </button>
                            </div>
                            {formErrors.confirmPassword && <span className="text-danger">{formErrors.confirmPassword}</span>}
                        </div>
                        {formErrors.general && <span className="text-danger">{formErrors.general}</span>}
                        <button type="submit" className="btn btn-primary w-75">Reset Password</button>
                    </form>

                    <p className="mt-4">Already have an account? <a href="/">Sign in here</a></p>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
