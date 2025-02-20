import React, { useState, useRef } from "react";
import axios from '../axiosConfig';
import "../commonStyle/Login.css";
import Captcha from '../components/CaptchaPage';
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        captcha: "",
        remember: false,
    });
    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
        captcha: '',
        login: ''
    });
    const captchaRef = useRef(null);

    const [errors, setErrors] = useState({});
    const [captchaImage, setCaptchaImage] = useState("");
    const [captchaInput, setCaptchaInput] = useState('');
    const [captchaValue, setCaptchaValue] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate()
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const resetErrors = () => {
        setFormErrors({
            email: '',
            password: '',
            captcha: '',
            login: ''
        });
    };

    const validateForm = (email, password) => {
        let isValid = true;
        const newErrors = {
            email: '',
            password: '',
            captcha: '',
            login: ''
        };

        if (!email) {
            newErrors.email = 'Email is required.';
            isValid = false;
        }

        if (!password) {
            newErrors.password = 'Password is required.';
            isValid = false;
        }

        console.log("Captcha Input:", captchaInput);
        console.log("Captcha Value:", captchaValue);

        // Ensure captcha validation is properly checking user input
        if (!captchaInput) {
            newErrors.captcha = 'Captcha is required.';
            isValid = false;
        } else if (captchaInput.trim().toLowerCase() !== captchaValue.trim().toLowerCase()) {
            newErrors.captcha = 'Captcha does not match.';
            isValid = false;
            setCaptchaInput(''); // Clear input if mismatched
            if (captchaRef.current) {
                captchaRef.current.regenerateCaptcha(); // Regenerate on mismatch
            }
        }

        setFormErrors(newErrors);
        return isValid;
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = formData.email.trim();
        const password = formData.password.trim();

        // Preserve existing captcha error if it's a "does not match" error
        const existingCaptchaError = formErrors.captcha;
        resetErrors();

        if (existingCaptchaError === 'Captcha does not match.') {
            setFormErrors(prev => ({
                ...prev,
                captcha: existingCaptchaError
            }));
            return;
        }

        // Validate input fields
        if (!validateForm(email, password)) {
            return;
        }
        try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);

            const response = await axios.post("https://hrms.neork.io/api/login", formData);

            if (response.data.status === 1) {
                // Store data in sessionStorage
                sessionStorage.setItem("access_token", response.data.access_token);
                sessionStorage.setItem("token", response.data.token);
                sessionStorage.setItem("user_id", response.data.user_id);
                // Redirect to home-layout
                navigate('/home-layout');
            } else {
                // API returned an error (like invalid credentials)
                setFormErrors(prev => ({
                    ...prev,
                    login: response.data.message || "Invalid email and/or password."
                }));
            }
            console.log(response.data.token,"Token in sssssss");

        } catch (error) {
            if (error.response?.status === 403) {
                // Handle inactive account error
                setFormErrors(prev => ({
                    ...prev,
                    login: error.response.data.message || "Your account is in an inactive state. Please contact the Admin."
                }));
            } else {
                // Handle general login error
                setFormErrors(prev => ({
                    ...prev,
                    login: 'Invalid email and/or password.'
                }));
            }
        }
    };


    const handleCaptchaChange = ({ captcha, input }) => {
        setCaptchaInput(captcha);
        setCaptchaValue(input);
        // Clear captcha error when user starts entering new captcha
        setFormErrors(prev => ({
            ...prev,
            captcha: ''
        }));
    };

    return (
        <div className="container">
            <div className="card" style={{ width: '35%', textAlign: 'center', backgroundColor: 'white' }}>
                <div className="card-body">
                    <div className="text-center mb-4">
                        <img
                            src="https://i.postimg.cc/xdr6DCmg/neork-logo-200.png"
                            alt="Neork Logo"
                            className="mb-3"
                            style={{ width: '200px', height: 'auto' }}
                        />
                        <h5 className="mb-3 " style={{ fontSize: '13px', color: 'grey' }}>Please fill the below details to create your account</h5>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                placeholder="Enter Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <span className="error-msg">{errors.email}</span>}
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="password" className="form-label ">Password</label>
                            <div className="input-group">
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                    placeholder="Enter Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <button type="button" className="input-group-text" onClick={togglePasswordVisibility}>
                                    <FaEye />
                                </button>
                            </div>
                            {errors.password && <span className="error-msg">{errors.password}</span>}

                            <div className="text-start mt-3">
                                <a href="/forgot-password" className="text-primary">Forgot Password?</a>
                            </div>
                        </div>

                        {/* <div className="col-12 text-start mb-3">
    <label htmlFor="captcha" className="form-label">Captcha</label>
    <div className="input-group">
        <Captcha ref={captchaRef} onChange={handleCaptchaChange} />
        <button 
            type="button" 
            className="btn btn-primary" 
            style={{ marginLeft: '8px' }} 
            onClick={() => captchaRef.current && captchaRef.current.regenerateCaptcha()}
        >
            Reset Captcha
        </button>
    </div>
    {formErrors.captcha && (
        <div className="text-danger mt-1" style={{ fontSize: '0.875rem' }}>
            {formErrors.captcha}
        </div>
    )}
</div> */}

                        <div className="col-12 text-start mb-3">
                            <label htmlFor="captcha" className="form-label">Captcha</label>
                            <div className="captcha-wrapper">
                                <Captcha
                                    ref={captchaRef}
                                    onChange={handleCaptchaChange}
                                />
                                <button style={{ marginLeft: '-37px' }}
                                    type="button"
                                    className="btn btn-primary d-flex align-items-center mb-"
                                    onClick={() => captchaRef.current && captchaRef.current.regenerateCaptcha()}
                                >
                                    <i className="bi bi-arrow-clockwise ms-2"></i>
                                </button>
                            </div>
                            {formErrors.captcha && (
                                <div className="text-danger mt-1" style={{ fontSize: '0.875rem' }}>
                                    {formErrors.captcha}
                                </div>
                            )}
                        </div>

                        {errors.captcha && <span className="error-msg">{errors.captcha}</span>}
                        <div className="form-check my-4 " style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="remember"
                                name="remember"
                                checked={formData.remember}
                                onChange={handleChange}
                            />
                            <label
                                htmlFor="remember"
                                className="form-check-label"
                                style={{ marginLeft: '8px' }}
                            >
                                Remember Me
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary w-75 login-bt">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
