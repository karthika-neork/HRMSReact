import React, { useState } from "react";
import "../commonStyle/AddEmployee.css"
function AddEmployee() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        user_id: '',
        profile_img: null, first_name: '', last_name: '', gender: '', role_id: '', dob: '', blood_group: '', marital_status: '',
        address: '', email: '', company_mail: '', phone: '', aadhaar: '', emergency_contact_name_1: '',
        emergency_contact_relation_1: '',
        emergency_contact_phone_1: '',
        emergency_contact_name_2: '',
        emergency_contact_relation_2: '',
        emergency_contact_phone_2: '',
        education: [{ qualification: '', specialization: '', institution: '', start_date: '', end_date: '', percentage: '' }],
        experience: [{ employer_name: '', position_held: '', start_date: '', end_date: '' }],
        document_uploads: [{ document_type: '', file_name: null }],
        professional: [{ date_of_joining: '', designation_id: '', relieving_date: '', supervisor_id: '', technology_used: '' }],
        salary: [{
            basic_pay: '', da: '', pf_contribution: '', hra: '', bank_name: '', branch: '', account_number: '', ifsc: '',
            special_allowance: '', overtime_allowance: '', education_allowance: '', entertainment_allowance: '', conveyance_allowance: '', medical_allowance: ''
        }],
        leave: [{ no_of_leaves_alloted: '', effective_from: '', effective_to: '', leave_type_id: '' }]

    });
    const [errors, setErrors] = useState({});
    const [profileImage, setProfileImage] = useState(null);

    const steps = ['Personal', 'Education', 'Experience', 'Document Uploads', 'Professional', 'Salary', 'Leave'];
    // This function checks if the previous step is complete
    const isStepComplete = (stepNumber) => {
        return stepNumber < step; // Completed if the step number is less than the current step
    };

    // This function checks if the line should be active
    const isLineActive = (stepNumber) => {
        return stepNumber < step; // Line is active if the current step is beyond this step
    };
    const handleImageClick = () => {
        document.getElementById("profile_img").click();
    };

    // const handleInputChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onload = () => {
    //             setProfileImage(reader.result);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    //education

    const handleInputChange = (e, section = null, index = null) => {
        const { name, value, type, files, options, multiple } = e.target;

        if (errors[name]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: '',  // Clear the error message
            }));
        }

        if (type === 'file' && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Data = reader.result;

                setFormData(prevState => {
                    if (section && index !== null) {
                        const updatedSection = [...prevState[section]];
                        updatedSection[index] = {
                            ...updatedSection[index],
                            [name]: base64Data // Save the base64 string under the file name key
                        };

                        return {
                            ...prevState,
                            [section]: updatedSection
                        };
                    } else {
                        return {
                            ...prevState,
                            [name]: base64Data // Save the base64 string directly
                        };
                    }
                });
            };
            reader.readAsDataURL(file);

        } else if (multiple) {
            // Handle multiple selections
            const selectedValues = Array.from(options)
                .filter(option => option.selected)
                .map(option => option.value);

            setFormData(prevState => {
                if (section && index !== null) {
                    const updatedSection = [...prevState[section]];
                    updatedSection[index] = {
                        ...updatedSection[index],
                        [name]: selectedValues // Save the array of selected values
                    };

                    return {
                        ...prevState,
                        [section]: updatedSection
                    };
                } else {
                    return {
                        ...prevState,
                        [name]: selectedValues // Save the array of selected values
                    };
                }
            });

        } else {
            // Handle non-file, non-multiple fields immediately
            setFormData(prevState => {
                if (section && index !== null) {
                    const updatedSection = [...prevState[section]];
                    updatedSection[index] = {
                        ...updatedSection[index],
                        [name]: value
                    };

                    return {
                        ...prevState,
                        [section]: updatedSection
                    };
                } else {
                    return {
                        ...prevState,
                        [name]: value
                    };
                }
            });
        }
    };

    //   education multiple form
    const addCount = () => {
        setFormData(prevState => {
            const updatedEducation = Array.isArray(prevState.education) ? [...prevState.education, {}] : [{}];
            // console.log('Updated education:', updatedEducation);

            return {
                ...prevState,
                education: updatedEducation
            };
        });
    };
    const deleteCount = () => {
        setFormData(prevState => ({
            ...prevState,
            education: Array.isArray(prevState.education) && prevState.education.length > 1
                ? prevState.education.slice(0, -1)
                : prevState.education // If there's only one item, keep it as is
        }));
    };
    // experience
    const addExperience = () => {
        setFormData(prevState => ({
            ...prevState,
            experience: Array.isArray(prevState.experience) ? [...prevState.experience, {}] : [{}]
        }));
    };
    const deleteExperience = () => {
        setFormData(prevState => ({
            ...prevState,
            experience: Array.isArray(prevState.experience) && prevState.experience.length > 1
                ? prevState.experience.slice(0, -1)
                : prevState.experience // If there's only one item, keep it as is
        }));
    };
    //Document uploads mulitple form
    const addDocuments = () => {
        setFormData(prevState => ({
            ...prevState,
            document_uploads: Array.isArray(prevState.document_uploads) ? [...prevState.document_uploads, {}] : [{}]
        }));
    };
    const deleteDocuments = () => {
        setFormData(prevState => ({
            ...prevState,
            document_uploads: Array.isArray(prevState.document_uploads) && prevState.document_uploads.length > 1
                ? prevState.document_uploads.slice(0, -1)
                : prevState.document_uploads // If there's only one item, keep it as is
        }));
    };
    //Add Leave multiple form
    const addLeave = () => {
        setFormData(prevState => ({
            ...prevState,
            leave: Array.isArray(prevState.leave) ? [...prevState.leave, {}] : [{}]
        }));
    };
    const deleteLeave = () => {
        setFormData(prevState => ({
            ...prevState,
            leave: Array.isArray(prevState.leave) && prevState.leave.length > 1
                ? prevState.leave.slice(0, -1)
                : prevState.leave // If there's only one item, keep it as is
        }));
    };

    return (
        <div className="d-flex justify-content-center align-items-center"
            style={{ height: "", backgroundColor: "#f8f9fa" }} >

            <div className="p-6 bg-white rounded-lg shadow mt-4"
                style={{ width: "70%", padding: "40px" }} >
                <h5 className="text-start"> {/* {step === 1 ? "Add New Employee" : "Edit Employee"} */}
                    Add Profile
                </h5>

                {/* Tabs */}
                {/* <div className="form-header d-flex mb-4"
                    style={{ justifyContent: "space-between", borderBottom: "2px solid #d1e7fd", paddingBottom: "10px", }}>
                    {['Personal', 'Education', 'Experience', 'Document Uploads', 'Professional', 'Salary', 'Leave'].map((label, index) => (
                        <span key={index} className={`stepIndicator ${step === index + 1 ? "active" : ""}`}
                            style={{
                                padding: "10px", cursor: "default", // Disabling click behavior on tabs
                                color: step === index + 1 ? "#007bff" : "#333", fontWeight: step === index + 1 ? "bold" : "normal",
                            }}>
                            {label}
                        </span>
                    ))}
                </div> */}

                <div className="stepper-container">
                    <div className="step-wrapper">
                        {steps.map((label, index) => {
                            const isCompleted = isStepComplete(index + 1);
                            const isActive = step === index + 1;

                            return (
                                <div key={index}
                                    className={`step-item ${isCompleted ? "completed" : ""} ${isActive ? "active" : ""}`} >

                                    {/* The connecting line */}
                                    {index !== 0 && (
                                        <div className={`step-line ${isLineActive(index) ? "active" : ""}`} ></div>
                                    )}

                                    {/* The circle */}
                                    <div className={`step-circle ${isCompleted ? "completed" : isActive ? "active" : ""}`}>
                                        <span className="text-white"></span>
                                    </div>

                                    {/* The label */}
                                    <span className={`step-text ${isCompleted ? "completed" : isActive ? "active" : ""}`} >
                                        {label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {/* Profile form */}
                <form id="add-profile-form" encType="multipart/form-data">
                    <div className="form-body mt-4">
                        {step === 1 && (
                            <div>
                                <h5 className="text-center">Create account</h5>
                                <div className="row">
                                    <div className="col-md-12 mb-2 text-center">
                                        <div className="avatar-wrapper mb-2" onClick={handleImageClick}>
                                            {profileImage ? (
                                                <img className="profile-pic" alt="Profile" src={profileImage} />
                                            ) : (
                                                <img className="profile-pic" alt="Profile"
                                                    src="https://i.postimg.cc/L5gvKJM4/default-avatar-profile-icon-of-social-media-user-vector.jpg"
                                                    style={{ width: '20%', height: '20%' }} />

                                            )}
                                            <div className="upload-button">
                                                <i className="fa fa-arrow-circle-up" aria-hidden="true"></i>
                                            </div>
                                            <input className="form-control file-upload" type="file"
                                                name="profile_img" id="profile_img"
                                                accept=".jpg, .jpeg, .png"
                                                style={{ display: "none" }}
                                                onChange={(e) => handleInputChange(e)}
                                            />
                                        </div>
                                        <label htmlFor="profile_img" className="form-label">
                                            Profile picture
                                        </label>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-6 mt-3'>
                                            <div className="form-group">
                                                <label htmlFor="first_name">First Name<span className='text-danger'>*</span></label>
                                                <input
                                                    style={{ height: "50px" }}
                                                    className='form-control mt-2'
                                                    name='first_name'
                                                    value={formData.first_name}
                                                    type="text"
                                                    placeholder='First Name'
                                                    onChange={(e) => handleInputChange(e)}

                                                />
                                                {errors.first_name && <span className='text-danger'>{errors.first_name}</span>}
                                            </div>
                                        </div>

                                        <div className='col-md-6 mt-3'>
                                            <div className="form-group">
                                                <label htmlFor="last_name">Last Name<span className='text-danger'>*</span></label>
                                                <input
                                                    style={{ height: "50px" }}
                                                    className='form-control mt-2'
                                                    name='last_name'
                                                    value={formData.last_name}
                                                    type="text"
                                                    placeholder='Last Name'
                                                    onChange={(e) => handleInputChange(e)}
                                                />
                                                {errors.last_name && <span className='text-danger'>{errors.last_name}</span>}
                                            </div>
                                        </div>
                                        <div className="col-md-6 mt-3">
                                            <div className="form-group">
                                                <label htmlFor="gender">Gender<span className="text-danger">*</span></label>
                                                <select
                                                    id="gender"
                                                    name="gender"
                                                    className="form-control mt-2"
                                                    value={formData.gender}
                                                    onChange={(e) => handleInputChange(e)}
                                                    style={{ height: "50px" }}

                                                >
                                                    <option value="">-Select-</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                    <option value="other">Other</option>
                                                </select>
                                                {errors.gender && <span className='text-danger'>{errors.gender}</span>}
                                            </div>
                                        </div>

                                        <div className="col-md-6 mt-3">
                                            <div className="form-group">
                                                <label htmlFor="role_id">Role<span className="text-danger">*</span></label>
                                                <select id="role_id" name="role_id" className="form-control mt-2" value={formData.role_id}
                                                    onChange={(e) => handleInputChange(e)}
                                                    style={{ height: "50px" }}  >
                                                    <option value="">-Select-</option>

                                                    <option value="1">Employee</option>
                                                    <option value="2">Admin</option>
                                                    <option value="3">SuperAdmin</option>
                                                    <option value="other">Other</option>
                                                </select>
                                                {errors.role && <span className='text-danger'>{errors.role}</span>}
                                            </div>
                                        </div>

                                        <div className='col-md-6 mt-3'>
                                            <div className="form-group">
                                                <label htmlFor="dob">DOB<span className='text-danger'>*</span></label>
                                                <input id="dob" name="dob" value={formData.dob || ''}
                                                    onChange={(e) => handleInputChange(e)}
                                                    type="date" className="form-control mt-2"
                                                    placeholder="DOB" style={{ height: "50px" }}
                                                />
                                                {errors.dob && <span className='text-danger'>{errors.dob}</span>}
                                            </div>
                                        </div>

                                        <div className="col-md-6 mt-3">
                                            <div className="form-group">
                                                <label htmlFor="blood_group">Blood Group<span className="text-danger">*</span></label>
                                                <select id="blood_group" name="blood_group" className="form-control mt-2" value={formData.blood_group || ''}
                                                    onChange={(e) => handleInputChange(e)}
                                                    style={{ height: "50px" }}
                                                >
                                                    <option value="">-Select-</option>
                                                    <option value="A+ve">A+ve</option>
                                                    <option value="A-ve">A-ve</option>
                                                    <option value="B+ve">B+ve</option>
                                                    <option value="B-ve">B-ve</option>
                                                    <option value="AB+ve">AB+ve</option>
                                                    <option value="AB-ve">AB-ve</option>
                                                    <option value="O+ve">O+ve</option>
                                                    <option value="O-ve">O-ve</option>
                                                    <option value="other">Other</option>
                                                </select>
                                                {errors.blood_group && <span className='text-danger'>{errors.blood_group}</span>}
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-6 mt-3">
                                            <label htmlFor="marital_status" className="form-label">Marital Status</label>
                                            <select id="marital_status" name="marital_status" className="form-control mt-2" value={formData.marital_status || ''}
                                                onChange={(e) => handleInputChange(e)}
                                                style={{ height: "50px" }}
                                            >
                                                <option value="">--Select--</option>
                                                <option value="Married">Married</option>
                                                <option value="Single">Single</option>
                                                <option value="Divorced">Divorced</option>
                                                <option value="Widow">Widow/Widower</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            {/* {errors.marital_status && <span className='text-danger'>{errors.marital_status}</span>} */}
                                        </div>

                                        <div className="form-group mt-3">
                                            <label htmlFor="address">Address<span className='text-danger'>*</span></label>
                                            <textarea value={formData.address || ''}
                                                onChange={(e) => handleInputChange(e)}
                                                id="address" name="address" className="form-control mt-2"
                                                rows="2"
                                                placeholder="Enter address"


                                            />
                                            {errors.address && <span className='text-danger'>{errors.address}</span>}

                                        </div>

                                        <div className='col-md-6 mt-3'>
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">Email<span className='text-danger'>*</span ></label>
                                                <input value={formData.email || ''}
                                                    onChange={(e) => handleInputChange(e)}
                                                    style={{ height: "50px" }} type="email" name='email'

                                                    className="form-control mt-2" placeholder="Email" />
                                                {errors.email && <span className='text-danger'>{errors.email}</span>}

                                            </div>
                                        </div>

                                        <div className='col-md-6 mt-3'>
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">Company mail<span className='text-danger'>*</span ></label>
                                                <input value={formData.company_mail || ''}
                                                    onChange={(e) => handleInputChange(e)}
                                                    style={{ height: "50px" }} type="email" name='company_mail'
                                                    className="form-control mt-2" placeholder="Company Mail" />
                                                {errors.company_mail && <span className='text-danger'>{errors.company_mail}</span>}

                                            </div>
                                        </div>

                                        <div className='col-md-6 mt-3'>
                                            <div class="form-group">
                                                <label for="phone">Phone<span className='text-danger'>*</span ></label>
                                                <input value={formData.phone}
                                                    onChange={(e) => handleInputChange(e)}
                                                    style={{ height: "50px" }} type="text" name='phone'
                                                    className="form-control mt-2" placeholder="Phone" />
                                                {errors.phone && <span className='text-danger'>{errors.phone}</span>}

                                            </div>
                                        </div>

                                        <div className='col-md-6 mt-3'>
                                            <div class="form-group">
                                                <label >Aadhaar<span className='text-danger'>*</span ></label>
                                                <input value={formData.aadhaar || ''}
                                                    onChange={(e) => handleInputChange(e)}
                                                    style={{ height: "50px" }} type="text" name='aadhaar'
                                                    className="form-control mt-2" placeholder="Adhaar" />
                                                {errors.aadhaar && <span className='text-danger'>{errors.aadhaar}</span>}

                                            </div>
                                        </div>

                                        <div className='col-md-6 mt-3'>
                                            Emergency Contact 1
                                            <div class="form-group mt-2">
                                                <label >Name<span className='text-danger'>*</span ></label>
                                                <input value={formData.emergency_contact_name_1}
                                                    onChange={(e) => handleInputChange(e)}
                                                    style={{ height: "50px" }} type="text"
                                                    name='emergency_contact_name_1' className="form-control mt-2" placeholder="Name" />
                                                {errors.emergency_contact_name_1 && <span className='text-danger'>{errors.emergency_contact_name_1}</span>}
                                            </div>
                                        </div>

                                        <div className='col-md-6 mt-5'>
                                            <div class="form-group">
                                                <label >Relation</label>
                                                <input value={formData.emergency_contact_relation_1}
                                                    onChange={(e) => handleInputChange(e)}
                                                    style={{ height: "50px" }} type="text"
                                                    name='emergency_contact_relation_1' className="form-control mt-2" placeholder="Relation" />
                                            </div>
                                        </div>

                                        <div className='col-md-7 mt-3'>
                                            <div class="form-group">
                                                <label for="phone">Phone<span className='text-danger'>*</span ></label>
                                                <input value={formData.emergency_contact_phone_1}
                                                    onChange={(e) => handleInputChange(e)}
                                                    style={{ height: "50px" }} type="text"
                                                    name='emergency_contact_phone_1' className="form-control  mt-2" placeholder="Phone" />
                                                {errors.emergency_contact_phone_1 && <span className='text-danger'>{errors.emergency_contact_phone_1}</span>}

                                            </div>
                                        </div>

                                        <div className='col-md-6 mt-3 '>
                                            Emergency Contact 2
                                            <div class="form-group mt-2">
                                                <label >Name<span className='text-danger'>*</span ></label>
                                                <input value={formData.emergency_contact_name_2}
                                                    onChange={(e) => handleInputChange(e)}
                                                    style={{ height: "50px" }} type="text"
                                                    name='emergency_contact_name_2' className="form-control  mt-2" placeholder="Name" />
                                                {errors.emergency_contact_name_2 && <span className='text-danger'>{errors.emergency_contact_name_2}</span>}

                                            </div>
                                        </div>

                                        <div className='col-md-6 mt-5'>
                                            <div class="form-group">
                                                <label >Relation</label>
                                                <input value={formData.emergency_contact_relation_2}
                                                    onChange={(e) => handleInputChange(e)}
                                                    style={{ height: "50px" }} type="text"
                                                    name='emergency_contact_relation_2' className="form-control mt-2" placeholder="Relation" />
                                            </div>
                                        </div>

                                        <div className='col-md-6 mt-3'>
                                            <div class="form-group">
                                                <label for="phone">Phone<span className='text-danger'>*</span ></label>
                                                <input value={formData.emergency_contact_phone_2}
                                                    onChange={(e) => handleInputChange(e)}
                                                    style={{ height: "50px" }} type="text"
                                                    name='emergency_contact_phone_2' className="form-control  mt-2" placeholder="Phone" />
                                                {errors.emergency_contact_phone_2 && <span className='text-danger'>{errors.emergency_contact_phone_2}</span>}

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}
                        {step === 2 && (
                            <>
                                <div className="row">
                                    <h3 className="text-center">Education Details</h3>

                                    {(formData.education && formData.education.length > 0 ? formData.education : [{}]).map((education, index) => (
                                        <div key={index}>
                                            {index > 0 && (
                                                <h4 className="text-center mt-4">Education Details {index + 1}</h4>
                                            )}
                                            <div className='col-md-12 mt-3'>
                                                <div className="form-group">
                                                    <label htmlFor="institution">Institution Address<span className='text-danger'>*</span></label>
                                                    <input style={{ height: "50px" }}
                                                        // onChange={(e) => handleInputChange(e, 'education', index)}
                                                        // data-section="education"
                                                        // style={{ height: "40px" }}
                                                        // type="text"
                                                        // name='institution'
                                                        // value={education.institution}
                                                        className="form-control mt-2"
                                                        // placeholder="Institution"
                                                        data-section="education"
                                                        type="text"
                                                        name="institution"
                                                        value={education?.institution || ''}
                                                        onChange={(e) => handleInputChange(e, 'education', index)}
                                                        placeholder="Institution"
                                                    />

                                                    {errors[`education_${index}_institution`] && <div className="error">{errors[`education_${index}_institution`]}</div>}

                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className='col-md-6 mt-3'>
                                                    <div className="form-group">
                                                        <label htmlFor="qualification">Qualification<span className='text-danger'>*</span></label>
                                                        <input
                                                            onChange={(e) => handleInputChange(e, 'education', index)}
                                                            data-section="education"
                                                            style={{ height: "50px" }}
                                                            type="text"
                                                            name='qualification'
                                                            value={education?.qualification || ''}
                                                            className="form-control mt-2"
                                                            placeholder="Qualification"
                                                        />
                                                        {errors[`education_${index}_qualification`] && <div className="error">{errors[`education_${index}_qualification`]}</div>}

                                                    </div>
                                                </div>

                                                <div className='col-md-6 mt-3'>
                                                    <div className="form-group">
                                                        <label htmlFor="specialization">Specialization</label>
                                                        <input
                                                            onChange={(e) => handleInputChange(e, 'education', index)}
                                                            data-section="education"
                                                            style={{ height: "50px" }}
                                                            type="text"
                                                            name='specialization'

                                                            value={education?.specialization || ''}
                                                            className="form-control mt-2"
                                                            placeholder="Specialization"
                                                        />
                                                        {errors[`education_${index}_specialization`] && <div className="error">{errors[`education_${index}_specialization`]}</div>}

                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className='col-md-6 mt-3'>
                                                    <div className="form-group">
                                                        <label htmlFor="start_date">Start Date<span className='text-danger'>*</span></label>
                                                        <input
                                                            value={education?.start_date || ''}
                                                            onChange={(e) => handleInputChange(e, 'education', index)}
                                                            data-section="education"
                                                            style={{ height: "50px" }}
                                                            type="date"
                                                            name='start_date'
                                                            className="form-control mt-2"
                                                            placeholder="Start Date"
                                                        />
                                                        {errors[`education_${index}_start_date`] && <div className="error">{errors[`education_${index}_start_date`]}</div>}
                                                    </div>
                                                </div>

                                                <div className='col-md-6 mt-3'>
                                                    <div className="form-group">
                                                        <label htmlFor="end_date">End Date<span className='text-danger'>*</span></label>
                                                        <input
                                                            value={education?.end_date || ''}
                                                            onChange={(e) => handleInputChange(e, 'education', index)}
                                                            data-section="education"
                                                            style={{ height: "50px" }}
                                                            type="date"
                                                            name='end_date'
                                                            className="form-control mt-2"
                                                            placeholder="End Date"
                                                        />
                                                        {errors[`education_${index}_end_date`] && <div className="error">{errors[`education_${index}_end_date`]}</div>}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className='col-md-6 mt-3'>
                                                    <div className="form-group">
                                                        <label htmlFor="percentage">Percentage/GPA<span className='text-danger'>*</span></label>
                                                        <input
                                                            onChange={(e) => handleInputChange(e, 'education', index)}
                                                            data-section="education"
                                                            style={{ height: "50px" }}
                                                            type="text"
                                                            name='percentage'
                                                            value={education?.percentage || ''}
                                                            className="form-control mt-2"
                                                            placeholder="Percentage/GPA"
                                                        />
                                                        {errors[`education_${index}_percentage`] && <div className="error">{errors[`education_${index}_percentage`]}</div>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className='text-end'>
                                    {'edit' && (
                                        <button type="button" className="btn btn-primary mt-2" onClick={addCount}>Add Education</button>)}
                                    {formData.education?.length > 1 && (
                                        <button type="button" className="btn btn-secondary mt-2 ms-2" onClick={deleteCount}>Remove Education</button>
                                    )}
                                </div>
                            </>
                        )}

                        {step === 3 && (
                            <>
                                <div className="row">
                                    <h3 className="text-center">Experience Details</h3>
                                    {(formData.experience && formData.experience.length > 0 ? formData.experience : [{}]).map((experience, index) => (
                                        <div key={index}>
                                            {index > 0 && (
                                                <h4 className="text-center mt-4">Experience Details {index + 1}</h4>
                                            )}
                                            <div className='col-md-12 mt-3'>
                                                <div className="form-group">
                                                    <label htmlFor="">Employer Name with Address<span className='text-danger'>*</span></label>
                                                    <input
                                                        onChange={(e) => handleInputChange(e, 'experience', index)} data-section="experience" style={{ height: "50px" }} type="text" name='employer_name'
                                                        value={experience?.employer_name || ''} className="form-control mt-2" placeholder="Employer Name with Address" />
                                                    {errors[`experience_${index}_employer_name`] && <div className="error">{errors[`experience_${index}_employer_name`]}</div>}

                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className='col-md-6 mt-3'>
                                                    <div className="form-group">
                                                        <label htmlFor="start_date">Start Date<span className='text-danger'>*</span></label>
                                                        <input value={experience?.start_date || ''}
                                                            onChange={(e) => handleInputChange(e, 'experience', index)} data-section="experience" style={{ height: "50px" }} type="date"
                                                            name='start_date' className="form-control mt-2" placeholder="Start Date"
                                                        />
                                                        {errors[`experience_${index}_start_date`] && <div className="error">{errors[`experience_${index}_start_date`]}</div>}
                                                    </div>
                                                </div>

                                                <div className='col-md-6 mt-3'>
                                                    <div className="form-group">
                                                        <label htmlFor="start_date">End Date<span className='text-danger'>*</span></label>
                                                        <input value={experience?.end_date || ''}
                                                            onChange={(e) => handleInputChange(e, 'experience', index)} data-section="experience" style={{ height: "50px" }} type="date"
                                                            name='end_date' className="form-control mt-2" placeholder="End Date"
                                                        />
                                                        {errors[`experience_${index}_end_date`] && <div className="error">{errors[`experience_${index}_end_date`]}</div>}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='col-md-6 mt-3'>
                                                <div className="form-group">
                                                    <label htmlFor="">Position Held<span className='text-danger'>*</span></label>
                                                    <input onChange={(e) => handleInputChange(e, 'experience', index)} data-section="experience" style={{ height: "50px" }} type="text" name='position_held'
                                                        value={experience?.position_held || ''} className="form-control mt-2" placeholder="Position Held" />
                                                    {errors[`experience_${index}_position_held`] && <div className="error">{errors[`experience_${index}_position_held`]}</div>}
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                                <div className='text-end'>
                                    {'edit' && (
                                        <button type="button" className="btn btn-primary mt-2" onClick={addExperience}>Add Experience</button>)}
                                    {formData.experience?.length > 1 && (
                                        <button type="button" className="btn btn-secondary mt-2 ms-2" onClick={deleteExperience}>Remove Experience</button>
                                    )}
                                </div>
                            </>

                        )}
                        {step === 4 && (
                            <>
                                <div className='row mt-4'>
                                    <h3 className="text-center">Document Uploads</h3>
                                    {(formData.document_uploads && formData.document_uploads.length > 0 ? formData.document_uploads : [{}]).map((document_uploads, index) => (
                                        <div key={index}>
                                            {index > 0 && (
                                                <h4 className="text-center mt-4">Document Uploads Details {index + 1}</h4>
                                            )}
                                            <div className='col-md-12 mt-3'>
                                                <div className='row'>
                                                    <div className="col-md-6 mb-6">
                                                        <label className="form-label">Document Type<span className='text-danger'>*</span></label>
                                                        <select
                                                            value={document_uploads?.document_type || ''}
                                                            onChange={(e) => handleInputChange(e, 'document_uploads', index)}
                                                            className="form-control"
                                                            name="document_type"
                                                            style={{ height: "50px" }}
                                                        >
                                                            <option value="">--Select--</option>
                                                            <option value="Experience">Experience Certificate</option>
                                                            <option value="Salary">Salary Certificate</option>
                                                            <option value="Education">Education Certificate</option>
                                                            <option value="Relieving">Relieving Letter</option>
                                                            <option value="ID Proof">ID Proof</option>
                                                            <option value="Other">Other</option>
                                                        </select>
                                                        {errors[`document_uploads_${index}_document_type`] && <div className="error">{errors[`document_uploads_${index}_document_type`]}</div>}
                                                    </div>

                                                    <div className="col-md-6 mb-2">
                                                        <label className="form-label">
                                                            Upload File<span>*</span>
                                                            <a
                                                                className="view-file"
                                                                // onClick={viewFile}
                                                                data-section="document_uploads"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                style={{ marginLeft: '10px', cursor: 'pointer' }}
                                                            >
                                                                View File
                                                            </a>
                                                        </label>
                                                        <input style={{ height: '50px' }}
                                                            type="file"
                                                            className="form-control required-field"
                                                            data-section="document_uploads"
                                                            name="file_name"
                                                            id="file_name"
                                                            accept=".jpg, .jpeg, .png, .pdf"
                                                            onChange={(e) => handleInputChange(e, 'document_uploads', 0)}
                                                            placeholder="Upload File"
                                                        />
                                                        {errors[`document_uploads_${index}_file_name`] && <div className="error">{errors[`document_uploads_${index}_file_name`]}</div>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className='text-end'>
                                    {'edit' && (
                                        <button type="button" className="btn btn-primary mt-2" onClick={addDocuments}>Add Documents</button>
                                    )}
                                    {formData.document_uploads.length > 1 && (
                                        <button type="button" className="btn btn-secondary mt-2 ms-2" onClick={deleteDocuments}>Remove Documents</button>
                                    )}
                                </div>
                            </>

                        )}
                        {step === 5 && (
                            <>

                                <div className="row">
                                    <h3 className='text-center'>Professional Details</h3>
                                    {(formData.professional && formData.professional.length > 0 ? formData.professional : [{}]).map((professional, index) => (

                                        <div key={index}>
                                            {index > 0 && (
                                                <h4 className="text-center mt-4">Professional Details {index + 1}</h4>
                                            )}
                                            <div className="row">

                                                <div className='col-md-6 mt-3'>
                                                    <div className="form-group">
                                                        <label htmlFor="start_date">Date of Joining<span className='text-danger'>*</span></label>
                                                        <input value={professional?.date_of_joining}
                                                            onChange={(e) => handleInputChange(e, 'professional', index)} data-section="professional" style={{ height: "50px" }} type="date"
                                                            name='date_of_joining' className="form-control mt-2" placeholder="Date of Joining"
                                                        />
                                                        {errors[`professional_${index}_date_of_joining`] && <div className="error">{errors[`professional_${index}_date_of_joining`]} </div>}

                                                    </div>
                                                </div>

                                                <div class="col-md-6 mt-3">
                                                    <div className="form-group">

                                                        <label class="form-label">Designation<span className='text-danger'>*</span></label>
                                                        <select value={professional?.designation_id} onChange={(e) => handleInputChange(e, 'professional', index)} className="form-control mt-" name="designation_id" style={{ height: "50px" }}
                                                            data-section="professional" id="">
                                                            <option value="">--Select--</option>
                                                            <option value="1">Tester</option>
                                                            <option value="2">UI</option>
                                                            <option value="3">developer</option>
                                                            <option value="">other</option>
                                                        </select>
                                                        {errors[`professional_${index}_designation_id`] && <div className="error">{errors[`professional_${index}_designation_id`]} </div>}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className='col-md-6 '>
                                                    <div className="form-group">
                                                        <label htmlFor="start_date">Revieving Date<span className='text-danger'>*</span></label>
                                                        <input value={professional?.relieving_date}
                                                            onChange={(e) => handleInputChange(e, 'professional', index)} style={{ height: "50px" }} type="date"
                                                            data-section="professional" name="relieving_date" id="relieving_date" className="form-control mt-2" placeholder="Revieving Date"
                                                        />
                                                        {errors[`professional_${index}_relieving_date`] && <div className="error">{errors[`professional_${index}_relieving_date`]}</div>}

                                                    </div>
                                                </div>

                                                <div class="col-md-6 ">
                                                    <div className="form-group">

                                                        <label class="form-label">Supervisor Name<span className='text-danger'>*</span></label>
                                                        <select value={professional?.supervisor_id || ''} onChange={(e) => handleInputChange(e, 'professional', index)} className="form-control mt-" name="supervisor_id"
                                                            style={{ height: "50px" }} data-section="professional" id="supervisor">
                                                            <option value="">--select--</option>
                                                            <option value="1">Super Admin</option>
                                                            <option value="2">Admin</option>
                                                        </select>
                                                        {errors[`professional_${index}_supervisor_id`] && <div className="error">{errors[`professional_${index}_supervisor_id`]}</div>}

                                                    </div>
                                                </div>
                                            </div>

                                            <div className='col-md-2 mt-3'>
                                                <div className="form-group">
                                                    <label htmlFor="technology_used">Technology Used<span className='text-danger'>*</span></label>
                                                    <select
                                                        multiple
                                                        style={{ height: "105px" }}
                                                        data-section="professional"
                                                        value={professional?.technology_used || []} // Ensure this is an array
                                                        onChange={(e) => handleInputChange(e, 'professional', index)}
                                                        name='technology_used'
                                                        className="form-control mt-2"
                                                        id="technology_used"
                                                    >
                                                        <option value="1">php</option>
                                                        <option value="2">Laravel</option>
                                                        <option value="3">react</option>
                                                        <option value="4">python</option>
                                                        {/* Add more options as needed */}
                                                    </select>
                                                    {errors[`professional_${index}_technology_used`] && <div className="error">{errors[`professional_${index}_technology_used`]}</div>}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {/* {mode !== 'edit' && (
                                                                    <button type="button" className="btn btn-primary mt-2" onClick={addProfessional}>Add Professional</button>)}
                                                                {formData.professional?.length > 1 && (
                                                                    <button type="button" className="btn btn-secondary mt-2 ms-2" onClick={deleteProfessional}>Remove professional</button>
                                                                )} */}

                            </>

                        )}
                        {step === 6 && (
                            <div className="row">
                                <h3 className='text-center'>Salary Details</h3>
                                {(formData.salary && formData.salary.length > 0 ? formData.salary : [{}]).map((salary, index) => (
                                    <div key={index}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label htmlFor="">Grows Pay <span className='text-danger'>*</span></label>
                                                <input
                                                    value={salary?.grows_pay || ''}
                                                    onChange={(e) => handleInputChange(e, 'salary', index)}
                                                    data-section="salary"
                                                    style={{ height: "50px" }}
                                                    type="text"
                                                    name='grows_pay'
                                                    className="form-control mt-2"
                                                    placeholder="Grows Pay"
                                                />
                                                {errors[`salary_${index}_grows_pay`] && <div className="error">{errors[`salary_${index}_grows_pay`]}</div>}
                                            </div>

                                            <div className="col-md-6">
                                                <label htmlFor="">Basic Pay/DA<span className='text-danger'>*</span></label>
                                                <input
                                                    value={salary?.basic_pay || ''}
                                                    onChange={(e) => handleInputChange(e, 'salary', index)}
                                                    data-section="salary"
                                                    style={{ height: "50px" }}
                                                    type="text"
                                                    name='basic_pay'
                                                    className="form-control mt-2"
                                                    placeholder="Basic Pay"
                                                />
                                                {errors[`salary_${index}_basic_pay`] && <div className="error">{errors[`salary_${index}_basic_pay`]}</div>}
                                            </div>

                                            {/* <div className="col-md-6 ">
                                                <div className="form-group">
                                                    <label htmlFor="">DA</label>
                                                    <input
                                                        value={salary?.da || ''}
                                                        onChange={(e) => handleInputChange(e, 'salary', index)}
                                                        data-section="salary"
                                                        style={{ height: "50px" }}
                                                        type="text"
                                                        name='da'
                                                        className="form-control mt-2"
                                                        placeholder="DA"
                                                    />
                                                    {errors[`salary_${index}_da`] && <div className="error">{errors[`salary_${index}_da`]}</div>}
                                                </div>
                                            </div> */}
                                        </div>

                                        <div className="row mt-2">
                                            <div className="col-md-6  mt-3">
                                                <div className="form-group">
                                                    <label htmlFor="">HRA</label>
                                                    <input
                                                        value={salary?.hra || ''}
                                                        onChange={(e) => handleInputChange(e, 'salary', index)}
                                                        data-section="salary"
                                                        style={{ height: "50px" }}
                                                        type="text"
                                                        name='hra'
                                                        className="form-control mt-2"
                                                        placeholder="HRA"
                                                    />
                                                    {errors[`salary_${index}_hra`] && <div className="error">{errors[`salary_${index}_hra`]}</div>}
                                                </div>
                                            </div>
                                            <div className="col-md-6  mt-3">
                                                <div className="form-group">
                                                    <label htmlFor=""> Medical Allowance</label>
                                                    <input
                                                        value={salary?.medical_allowance || ''}
                                                        onChange={(e) => handleInputChange(e, 'salary', index)}
                                                        data-section="salary"
                                                        style={{ height: "50px" }}
                                                        type="text"
                                                        name='medical_allowance'
                                                        className="form-control mt-2"
                                                        placeholder="Medical Allowance
                                                        "
                                                    />
                                                    {errors[`salary_${index}_medical_allowance`] && <div className="error">{errors[`salary_${index}_medical_allowance`]}</div>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row  mt-2">
                                            <div className="col-md-6  mt-3">
                                                <div className="form-group">
                                                    <label htmlFor="">Conveyance Allowance </label>
                                                    <input
                                                        value={salary?.conveyance_allowance || ''}
                                                        onChange={(e) => handleInputChange(e, 'salary', index)}
                                                        data-section="salary"
                                                        style={{ height: "50px" }}
                                                        type="text"
                                                        name='conveyance_allowance'
                                                        className="form-control mt-2"
                                                        placeholder="Conveyance Allowance"
                                                    />
                                                    {errors[`salary_${index}_conveyance_allowance`] && <div className="error">{errors[`salary_${index}_conveyance_allowance`]}</div>}
                                                </div>
                                            </div>
                                            <div className="col-md-6  mt-3">
                                                <div className="form-group">
                                                    <label htmlFor="">Entertainment Allowance</label>
                                                    <input
                                                        value={salary?.entertainment_allowance || ''}
                                                        onChange={(e) => handleInputChange(e, 'salary', index)}
                                                        data-section="salary"
                                                        style={{ height: "50px" }}
                                                        type="text"
                                                        name='entertainment_allowance'
                                                        className="form-control mt-2"
                                                        placeholder="Entertainment Allowance"
                                                    />
                                                    {errors[`salary_${index}_entertainment_allowance`] && <div className="error">{errors[`salary_${index}_entertainment_allowance`]}</div>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row  mt-2">
                                            <div className="col-md-6  mt-3">
                                                <div className="form-group">
                                                    <label htmlFor="">Education Allowance</label>
                                                    <input
                                                        value={salary?.education_allowance || ''}
                                                        onChange={(e) => handleInputChange(e, 'salary', index)}
                                                        data-section="salary"
                                                        style={{ height: "50px" }}
                                                        type="text"
                                                        name='education_allowance'
                                                        className="form-control mt-2"
                                                        placeholder="Education Allowance"
                                                    />
                                                    {errors[`salary_${index}_education_allowance`] && <div className="error">{errors[`salary_${index}_education_allowance`]}</div>}
                                                </div>
                                            </div>

                                            <div className="col-md-6  mt-3">
                                                <div className="form-group">
                                                    <label htmlFor="">Special Allowance</label>
                                                    <input
                                                        value={salary?.special_allowance || ''}
                                                        onChange={(e) => handleInputChange(e, 'salary', index)}
                                                        data-section="salary"
                                                        style={{ height: "50px" }}
                                                        type="text"
                                                        name='special_allowance'
                                                        className="form-control mt-2"
                                                        placeholder="Special Allowance"
                                                    />
                                                    {errors[`salary_${index}_special_allowance`] && <div className="error">{errors[`salary_${index}_special_allowance`]}</div>}
                                                </div>
                                            </div>
                                        </div>


                                        <div className="row mt-2">
                                            <div className="col-md-6  mt-3">
                                                <div className="form-group">
                                                    <label htmlFor="">Overtime Allowance</label>
                                                    <input
                                                        value={salary?.overtime_allowance || ''}
                                                        onChange={(e) => handleInputChange(e, 'salary', index)}
                                                        data-section="salary"
                                                        style={{ height: "50px" }}
                                                        type="text"
                                                        name='overtime_allowance'
                                                        className="form-control mt-2"
                                                        placeholder="Overtime Allowance"
                                                    />
                                                    {errors[`salary_${index}_overtime_allowance`] && <div className="error">{errors[`salary_${index}_overtime_allowance`]}</div>}
                                                </div>
                                            </div>

                                            <div className="col-md-6  mt-3">
                                                <div className="form-group">
                                                    <label htmlFor=""> Contribution to PF</label>
                                                    <input
                                                        value={salary?.pf_contribution || ''}
                                                        onChange={(e) => handleInputChange(e, 'salary', index)}
                                                        data-section="salary"
                                                        style={{ height: "50px" }}
                                                        type="text"
                                                        name='pf_contribution'
                                                        className="form-control mt-2"
                                                        placeholder="Contribution to PF"
                                                    />
                                                    {errors[`salary_${index}_pf_contribution`] && <div className="error">{errors[`salary_${index}_pf_contribution`]}</div>}
                                                </div>
                                            </div>

                                        </div>


                                        <div className="row mt-2">
                                            <div className="col-md-6 mt-3">
                                                <div className="form-group">
                                                    <label htmlFor="">Bank Name<span className='text-danger'>*</span></label>
                                                    <input
                                                        value={salary?.bank_name || ''}
                                                        onChange={(e) => handleInputChange(e, 'salary', index)}
                                                        data-section="salary"
                                                        style={{ height: "50px" }}
                                                        type="text"
                                                        name='bank_name'
                                                        className="form-control mt-2"
                                                        placeholder="Bank Name"
                                                    />
                                                    {errors[`salary_${index}_bank_name`] && <div className="error">{errors[`salary_${index}_bank_name`]}</div>}
                                                </div>
                                            </div>

                                            <div className="col-md-6 mt-3">
                                                <div className="form-group">
                                                    <label htmlFor="">Branch<span className='text-danger'>*</span></label>
                                                    <input
                                                        value={salary?.branch || ''}
                                                        onChange={(e) => handleInputChange(e, 'salary', index)}
                                                        data-section="salary"
                                                        style={{ height: "50px" }}
                                                        type="text"
                                                        name='branch'
                                                        className="form-control mt-2"
                                                        placeholder="Branch"
                                                    />
                                                    {errors[`salary_${index}_branch`] && <div className="error">{errors[`salary_${index}_branch`]}</div>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-2">
                                            <div className="col-md-6 mt-3">
                                                <div className="form-group">
                                                    <label htmlFor="">Account No<span className='text-danger'>*</span></label>
                                                    <input
                                                        value={salary?.account_number || ''}
                                                        onChange={(e) => handleInputChange(e, 'salary', index)}
                                                        data-section="salary"
                                                        style={{ height: "50px" }}
                                                        type="text"
                                                        name='account_number'
                                                        className="form-control mt-2"
                                                        placeholder="Account No"
                                                    />
                                                    {errors[`salary_${index}_account_number`] && <div className="error">{errors[`salary_${index}_account_number`]}</div>}
                                                </div>
                                            </div>

                                            <div className="col-md-6 mt-3">
                                                <div className="form-group">
                                                    <label htmlFor="">IFSC<span className='text-danger'>*</span></label>
                                                    <input
                                                        value={salary?.ifsc || ''}
                                                        onChange={(e) => handleInputChange(e, 'salary', index)}
                                                        data-section="salary"
                                                        style={{ height: "50px" }}
                                                        type="text"
                                                        name='ifsc'
                                                        className="form-control mt-2"
                                                        placeholder="IFSC"
                                                    />
                                                    {errors[`salary_${index}_ifsc`] && <div className="error">{errors[`salary_${index}_ifsc`]}</div>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        )}
                        {/* {step === 7 && <div>Step 7: Leave Details</div>} */}
                    </div>

                    {/* Navigation Buttons */}
                    {step === 7 && (
                        <div className="row mt-2">
                            <h3 className="text-center mb-3">Leave Details</h3>
                            {(formData.leave && formData.leave.length > 0 ? formData.leave : [{}]).map((leave, index) => (
                                <div key={index} className="p-3 border rounded mb-4">
                                    {index > 0 && <h4 className="text-center mt-4">Leave Details {index + 1}</h4>}

                                    <div className="row mt-2">
                                        <div className="col-md-6 mt-3">
                                            <div className="form-group">
                                                <label className="form-label">Leave Type <span className='text-danger'>*</span></label>
                                                <select
                                                    value={leave?.leave_type_id || ''}
                                                    onChange={(e) => handleInputChange(e, 'leave', index)}
                                                    data-section="leave"
                                                    style={{ height: "50px" }}
                                                    className="form-control mt-2"
                                                    name="leave_type_id"
                                                >
                                                    <option value="">--select--</option>
                                                    <option value="1">Paid Leave</option>
                                                    <option value="2">Sick Leave</option>
                                                    <option value="3">Casual Leave</option>
                                                </select>
                                                {errors[`leave_${index}_leave_type_id`] && <div className="error">{errors[`leave_${index}_leave_type_id`]}</div>}
                                            </div>
                                        </div>

                                        <div className="col-md-6 mt-3">
                                            <div className="form-group">
                                                <label className="form-label">No of Leaves <span className='text-danger'>*</span></label>
                                                <input
                                                    value={leave?.no_of_leaves_alloted || ''}
                                                    onChange={(e) => handleInputChange(e, 'leave', index)}
                                                    data-section="leave"
                                                    style={{ height: "50px" }}
                                                    type="text"
                                                    name='no_of_leaves_alloted'
                                                    className="form-control mt-2"
                                                    placeholder="No of Leaves"
                                                />
                                                {errors[`leave_${index}_no_of_leaves_alloted`] && <div className="error">{errors[`leave_${index}_no_of_leaves_alloted`]}</div>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mt-2">
                                        <div className="col-md-6 mt-3">
                                            <div className="form-group">
                                                <label className="form-label">Effective from <span className='text-danger'>*</span></label>
                                                <input
                                                    value={leave?.effective_from || ''}
                                                    onChange={(e) => handleInputChange(e, 'leave', index)}
                                                    data-section="leave"
                                                    style={{ height: "50px" }}
                                                    type="date"
                                                    name='effective_from'
                                                    className="form-control mt-2"
                                                />
                                                {errors[`leave_${index}_effective_from`] && <div className="error">{errors[`leave_${index}_effective_from`]}</div>}
                                            </div>
                                        </div>

                                        <div className="col-md-6 mt-3">
                                            <div className="form-group">
                                                <label className="form-label">Effective to <span className='text-danger'>*</span></label>
                                                <input
                                                    value={leave?.effective_to || ''}
                                                    onChange={(e) => handleInputChange(e, 'leave', index)}
                                                    data-section="leave"
                                                    style={{ height: "50px" }}
                                                    type="date"
                                                    name='effective_to'
                                                    className="form-control mt-2"
                                                />
                                                {errors[`leave_${index}_effective_to`] && <div className="error">{errors[`leave_${index}_effective_to`]}</div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Buttons */}
                            <div className="text-end">
                                <button type="button" className="btn btn-primary mt-2 me-2" onClick={addLeave}>Add Leave</button>
                                {formData.leave?.length > 1 && (
                                    <button type="button" className="btn btn-danger mt-2" onClick={deleteLeave}>Remove Leave</button>
                                )}
                            </div>

                            <div className="text-center mt-4">
                                <button type="submit" className="btn btn-success">Submit</button>
                            </div>
                        </div>
                    )}
                    <div
                        className="form-footer d-flex justify-content-between mt-4"
                        style={{ gap: "10px" }}
                    >
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={() => setStep(step - 1)}
                                style={{
                                    padding: "10px 15px",
                                    borderRadius: "5px",
                                    border: "none",
                                    backgroundColor: "#6c757d",
                                    color: "#fff",
                                    cursor: "pointer",
                                }}
                            >
                                Previous
                            </button>
                        )}
                        {step < 7 && (

                            <button
                                type="button"
                                onClick={() => setStep(step + 1)}
                                style={{
                                    padding: "10px 15px",
                                    borderRadius: "5px",
                                    border: "none",
                                    backgroundColor: "#007bff",
                                    color: "#fff",
                                    cursor: "pointer",
                                }}
                            >
                                Next
                            </button>
                        )}

                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddEmployee;
