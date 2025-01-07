import React, { useState } from 'react'
import "../commonStyle/Login.css";

function ForgotPassword() {
    const [formData, setFormData] = useState({
        email: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target; // Handle only the 'value' for text fields
        setFormData((prevState) => ({
            ...prevState,
            [name]: value, // Update state based on the field name
        }));
    };
    return (
        <div className='container'>
            <div className="card" style={{ width: '50%' }}>
                <div className="text-center mb-4">
                    <img
                        src="https://i.postimg.cc/xdr6DCmg/neork-logo-200.png"
                        alt="Neork Logo"
                        className="mb-3"
                        style={{ width: '200px', height: 'auto' }}
                    />
                    <h2 className="mb-" style={{ fontSize: '13px' }}>Please fill the below details to reset you password</h2>
                </div>

                <div className="card-body">
                <form >
                        <div className="mb-3 w-75 mx-auto">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                // className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                className='form-control'
                                placeholder="Enter Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {/* {errors.email && <span className="error-msg">{errors.email}</span>} */}
                        </div>
                        </form>
                </div>
                <div className="d-flex justify-content-center mb-4 ">
                    <button className="btn btn-primary reset">Send Password Reset Link</button>
                </div>

            </div>
        </div>
    )
}

export default ForgotPassword