// import React, { useState, useRef } from "react";
// import axios from '../axiosConfig';
// import "../commonStyle/Login.css";
// import Captcha from '../components/CaptchaPage';
// import { FaEye } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const LoginPage = () => {
//     const [formData, setFormData] = useState({
//         email: "",
//         password: "",
//         captcha: "",
//         remember: false,
//     });
//     const [formErrors, setFormErrors] = useState({
//         email: '',
//         password: '',
//         captcha: '',
//         login: ''
//     });
//     const captchaRef = useRef(null);

//     const [errors, setErrors] = useState({});
//     const [captchaImage, setCaptchaImage] = useState("");
//     const [captchaInput, setCaptchaInput] = useState('');
//     const [captchaValue, setCaptchaValue] = useState('');
//     const [passwordVisible, setPasswordVisible] = useState(false);
//     const navigate = useNavigate()
//     const togglePasswordVisibility = () => {
//         setPasswordVisible(!passwordVisible);
//     };

//     // Handle input changes
//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData((prevState) => ({
//             ...prevState,
//             [name]: type === "checkbox" ? checked : value,
//         }));
//     };

//     const resetErrors = () => {
//         setFormErrors({
//             email: '',
//             password: '',
//             captcha: '',
//             login: ''
//         });
//     };

//     const validateForm = (email, password) => {
//         let isValid = true;
//         const newErrors = {
//             email: '',
//             password: '',
//             captcha: '',
//             login: ''
//         };

//         if (!email) {
//             newErrors.email = 'Email is required.';
//             isValid = false;
//         }

//         if (!password) {
//             newErrors.password = 'Password is required.';
//             isValid = false;
//         }

//         console.log("Captcha Input:", captchaInput);
//         console.log("Captcha Value:", captchaValue);

//         // Ensure captcha validation is properly checking user input
//         if (!captchaInput) {
//             newErrors.captcha = 'Captcha is required.';
//             isValid = false;
//         } else if (captchaInput.trim().toLowerCase() !== captchaValue.trim().toLowerCase()) {
//             newErrors.captcha = 'Captcha does not match.';
//             isValid = false;
//             setCaptchaInput(''); // Clear input if mismatched
//             if (captchaRef.current) {
//                 captchaRef.current.regenerateCaptcha(); // Regenerate on mismatch
//             }
//         }

//         setFormErrors(newErrors);
//         return isValid;
//     };
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const email = formData.email.trim();
//         const password = formData.password.trim();

//         // Preserve existing captcha error if it's a "does not match" error
//         const existingCaptchaError = formErrors.captcha;
//         resetErrors();

//         if (existingCaptchaError === 'Captcha does not match.') {
//             setFormErrors(prev => ({
//                 ...prev,
//                 captcha: existingCaptchaError
//             }));
//             return;
//         }

//         // Validate input fields
//         if (!validateForm(email, password)) {
//             return;
//         }
//         try {
//             const formData = new FormData();
//             formData.append('email', email);
//             formData.append('password', password);

//             const response = await axios.post("/login", formData);

//             if (response.data.status === 1) {
//                 // Store data in sessionStorage
//                 sessionStorage.setItem("access_token", response.data.access_token);
//                 sessionStorage.setItem("token", response.data.token);
//                 sessionStorage.setItem("user_id", response.data.user_id);
//                 // Redirect to home-layout
//                 navigate('/home-layout');
//             } else {
//                 // API returned an error (like invalid credentials)
//                 setFormErrors(prev => ({
//                     ...prev,
//                     login: response.data.message || "Invalid email and/or password."
//                 }));
//             }
//             console.log(response.data.token,"Token in sssssss");

//         } catch (error) {
//             if (error.response?.status === 403) {
//                 // Handle inactive account error
//                 setFormErrors(prev => ({
//                     ...prev,
//                     login: error.response.data.message || "Your account is in an inactive state. Please contact the Admin."
//                 }));
//             } else {
//                 // Handle general login error
//                 setFormErrors(prev => ({
//                     ...prev,
//                     login: 'Invalid email and/or password.'
//                 }));
//             }
//         }
//     };


//     const handleCaptchaChange = ({ captcha, input }) => {
//         setCaptchaInput(captcha);
//         setCaptchaValue(input);
//         // Clear captcha error when user starts entering new captcha
//         setFormErrors(prev => ({
//             ...prev,
//             captcha: ''
//         }));
//     };

//     return (
//         <div className="container">
//             <div className="card" style={{ width: '35%', textAlign: 'center', backgroundColor: 'white' }}>
//                 <div className="card-body">
//                     <div className="text-center mb-4">
//                         <img
//                             src="https://i.postimg.cc/xdr6DCmg/neork-logo-200.png"
//                             alt="Neork Logo"
//                             className="mb-3"
//                             style={{ width: '200px', height: 'auto' }}
//                         />
//                         <h5 className="mb-3 " style={{ fontSize: '13px', color: 'grey' }}>Please fill the below details to create your account</h5>
//                     </div>
//                     <form onSubmit={handleSubmit}>
//                         <div className="mb-3 text-start">
//                             <label htmlFor="email" className="form-label">Email</label>
//                             <input
//                                 type="email"
//                                 id="email"
//                                 name="email"
//                                 className={`form-control ${errors.email ? "is-invalid" : ""}`}
//                                 placeholder="Enter Email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                             />
//                             {errors.email && <span className="error-msg">{errors.email}</span>}
//                         </div>
//                         <div className="mb-3 text-start">
//                             <label htmlFor="password" className="form-label ">Password</label>
//                             <div className="input-group">
//                                 <input
//                                     type={passwordVisible ? 'text' : 'password'}
//                                     id="password"
//                                     name="password"
//                                     className={`form-control ${errors.password ? "is-invalid" : ""}`}
//                                     placeholder="Enter Password"
//                                     value={formData.password}
//                                     onChange={handleChange}
//                                 />
//                                 <button type="button" className="input-group-text" onClick={togglePasswordVisibility}>
//                                     <FaEye />
//                                 </button>
//                             </div>
//                             {errors.password && <span className="error-msg">{errors.password}</span>}

//                             <div className="text-start mt-3">
//                                 <a href="/forgot-password" className="text-primary">Forgot Password?</a>
//                             </div>
//                         </div>

//                         {/* <div className="col-12 text-start mb-3">
//     <label htmlFor="captcha" className="form-label">Captcha</label>
//     <div className="input-group">
//         <Captcha ref={captchaRef} onChange={handleCaptchaChange} />
//         <button 
//             type="button" 
//             className="btn btn-primary" 
//             style={{ marginLeft: '8px' }} 
//             onClick={() => captchaRef.current && captchaRef.current.regenerateCaptcha()}
//         >
//             Reset Captcha
//         </button>
//     </div>
//     {formErrors.captcha && (
//         <div className="text-danger mt-1" style={{ fontSize: '0.875rem' }}>
//             {formErrors.captcha}
//         </div>
//     )}
// </div> */}

//                         <div className="col-12 text-start mb-3">
//                             <label htmlFor="captcha" className="form-label">Captcha</label>
//                             <div className="captcha-wrapper">
//                                 <Captcha
//                                     ref={captchaRef}
//                                     onChange={handleCaptchaChange}
//                                 />
//                                 <button style={{ marginLeft: '-37px' }}
//                                     type="button"
//                                     className="btn btn-primary d-flex align-items-center mb-"
//                                     onClick={() => captchaRef.current && captchaRef.current.regenerateCaptcha()}
//                                 >
//                                     <i className="bi bi-arrow-clockwise ms-2"></i>
//                                 </button>
//                             </div>
//                             {formErrors.captcha && (
//                                 <div className="text-danger mt-1" style={{ fontSize: '0.875rem' }}>
//                                     {formErrors.captcha}
//                                 </div>
//                             )}
//                         </div>

//                         {errors.captcha && <span className="error-msg">{errors.captcha}</span>}
//                         <div className="form-check my-4 " style={{ display: 'flex', alignItems: 'center' }}>
//                             <input
//                                 type="checkbox"
//                                 className="form-check-input"
//                                 id="remember"
//                                 name="remember"
//                                 checked={formData.remember}
//                                 onChange={handleChange}
//                             />
//                             <label
//                                 htmlFor="remember"
//                                 className="form-check-label"
//                                 style={{ marginLeft: '8px' }}
//                             >
//                                 Remember Me
//                             </label>
//                         </div>
//                         <button type="submit" className="btn btn-primary w-75 login-bt">Login</button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LoginPage;


import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from '../axiosConfig';
import "../commonStyle/Login.css";
import Captcha from '../components/CaptchaPage';
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
        getValues,
        trigger,
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
            captcha: "",
            remember: false
        },
        mode: "onSubmit"
    });

    const [loginError, setLoginError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [captchaValue, setCaptchaValue] = useState("");
    const [captchaInput, setCaptchaInput] = useState("");
    const captchaRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            const emailInput = document.getElementById("email");
            const passwordInput = document.getElementById("password");

            const email = emailInput?.value || "";
            const password = passwordInput?.value || "";

            if (email) setValue("email", email);
            if (password) setValue("password", password);
        }, 300);
    }, [setValue]);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleCaptchaChange = ({ captcha, input }) => {
        setCaptchaInput(captcha);
        setCaptchaValue(input);
        setValue('captcha', captcha);
        clearErrors("captcha");
    };

    const validateCaptcha = (value) => {
        if (!value) return "Captcha is required";
        if (!captchaValue) return "Captcha is invalid";
        if (value.trim().toLowerCase() !== captchaValue.trim().toLowerCase()) {
            if (captchaRef.current) {
                captchaRef.current.regenerateCaptcha();
            }
            return "Captcha does not match";
        }
        return true;
    };

    const onSubmit = async (data) => {
        setLoginError('');

        // Re-check autofilled values
        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");

        const email = emailInput?.value || "";
        const password = passwordInput?.value || "";

        setValue("email", email);
        setValue("password", password);

        const isValid = await trigger();
        if (!isValid) return;

        try {
            const formData = new FormData();
            formData.append('email', email.trim());
            formData.append('password', password.trim());

            const response = await axios.post("/login", formData);

            if (response.data.status === 1) {
                sessionStorage.setItem("access_token", response.data.access_token);
                sessionStorage.setItem("token", response.data.token);
                sessionStorage.setItem("user_id", response.data.user_id);
                navigate('/home-layout');
            } else {
                setLoginError(response.data.message || "Invalid email and/or password.");
            }
        } catch (error) {
            if (error.response?.status === 403) {
                setLoginError(error.response.data.message || "Your account is inactive. Contact Admin.");
            } else {
                setLoginError("Invalid email and/or password.");
            }
        }
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
                        <h5 className="mb-3" style={{ fontSize: '13px', color: 'grey' }}>
                            Please fill the below details to login
                        </h5>
                    </div>

                    {loginError && (
                        <div className="alert alert-danger" role="alert">
                            {loginError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="mb-3 text-start">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                placeholder="Enter Email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                            />
                            {errors.email && (
                                <div className="text-danger mt-1" style={{ fontSize: '0.875rem' }}>
                                    {errors.email.message}
                                </div>
                            )}
                        </div>

                        <div className="mb-3 text-start">
                            <label htmlFor="password" className="form-label">Password</label>
                            <div className="input-group">
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    id="password"
                                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                    placeholder="Enter Password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 4,
                                            message: "Password must be at least 4 characters long"
                                        }
                                    })}
                                />
                                <button
                                    type="button"
                                    className="input-group-text"
                                    onClick={togglePasswordVisibility}
                                >
                                    <FaEye />
                                </button>
                            </div>
                            {errors.password && (
                                <div className="text-danger mt-1" style={{ fontSize: '0.875rem' }}>
                                    {errors.password.message}
                                </div>
                            )}
                            <div className="text-start mt-3">
                                <a href="/forgot-password" className="text-primary">Forgot Password?</a>
                            </div>
                        </div>

                        <div className="col-12 text-start mb-3">
                            <label htmlFor="captcha" className="form-label">Captcha</label>
                            <div className="captcha-wrapper">
                                <Captcha ref={captchaRef} onChange={handleCaptchaChange} />
                                <button
                                    style={{ marginLeft: '-37px' }}
                                    type="button"
                                    className="btn btn-primary d-flex align-items-center"
                                    onClick={() => captchaRef.current?.regenerateCaptcha()}
                                >
                                    <i className="bi bi-arrow-clockwise ms-2"></i>
                                </button>
                            </div>
                            <input
                                type="hidden"
                                id="captcha"
                                {...register("captcha", { validate: validateCaptcha })}
                            />
                            {errors.captcha && (
                                <div className="text-danger mt-1" style={{ fontSize: '0.875rem' }}>
                                    {errors.captcha.message}
                                </div>
                            )}
                        </div>

                        <div className="form-check my-4" style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="remember"
                                {...register("remember")}
                            />
                            <label htmlFor="remember" className="form-check-label" style={{ marginLeft: '8px' }}>
                                Remember Me
                            </label>
                        </div>

                        <button type="submit" className="btn btn-primary w-75 login-bt">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
