import React, { useState } from 'react';
import "../commonStyle/EmployeeDashboard.css";
import axios from '../axiosConfig';
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { Clock, PlayCircle, PauseCircle, TimerOff } from 'lucide-react';


function EmployeeDashboard() {

  const currentDate = new Date().toLocaleDateString();
  const attendanceData = []; // Simulated attendance data

  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [punchInTime, setPunchInTime] = useState(null);
  const [punchOutTime, setPunchOutTime] = useState(null);
  const handlePunch = () => {
    if (isPunchedIn) {
      setPunchOutTime(new Date());
    } else {
      setPunchInTime(new Date());
      setPunchOutTime(null);
    }
    setIsPunchedIn(!isPunchedIn);
    setOnBreak(false); // Reset break status when punching out
  };



  // const handlePunch = async () => {
  //   const token = sessionStorage.getItem('token');
  //   const userId = sessionStorage.getItem('user_id');

  //   if (!token || !userId) {
  //     alert('User not authenticated');
  //     return;
  //   }

  //   const url = isPunchedIn
  //     ? 'https://hrmstest.neork.io/api/punch-out'
  //     : 'https://hrmstest.neork.io/api/punch-in';

  //   try {
  //     const response = await axios({
  //       method: 'POST',
  //       url: url,
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         'Content-Type': 'application/json',
  //         'userId': userId
  //       }
  //     });
  //     if (isPunchedIn) {
  //       setPunchOutTime(new Date());
  //     } else {
  //       setPunchInTime(new Date());
  //       setPunchOutTime(null);
  //     }
  //     setIsPunchedIn(!isPunchedIn);
  //     setOnBreak(false);
  //   } catch (error) {
  //     console.error('Error:', error);
  //     // Axios provides error.response for server errors
  //     const errorMessage = error.response?.data?.message || 'Failed to punch in/out';
  //     alert(errorMessage);
  //   }
  // };
  const handleBreak = () => {
    setOnBreak(!onBreak);
  };
  const holidays = [
    { id: 1, day: 'Wednesday', date: 'January 01, 2025', name: 'New Year' },
    { id: 2, day: 'Wednesday', date: 'February 26, 2025', name: 'Maha Shivaratri' },
    { id: 3, day: 'Wednesday', date: 'February 26, 2025', name: 'Maha Shivaratri' },
    { id: 4, day: 'Wednesday', date: 'February 26, 2025', name: 'Maha Shivaratri' },
    { id: 5, day: 'Wednesday', date: 'February 26, 2025', name: 'Maha Shivaratri' },
    { id: 6, day: 'Wednesday', date: 'February 26, 2025', name: 'Maha Shivaratri' },
    { id: 7, day: 'Wednesday', date: 'February 26, 2025', name: 'Maha Shivaratri' },
    { id: 7, day: 'Wednesday', date: 'February 26, 2025', name: 'Maha Shivaratri' },
    { id: 7, day: 'Wednesday', date: 'February 26, 2025', name: 'Maha Shivaratri' },
    { id: 7, day: 'Wednesday', date: 'February 26, 2025', name: 'Maha Shivaratri' },
    { id: 7, day: 'Wednesday', date: 'February 26, 2025', name: 'Maha Shivaratri' },
    { id: 7, day: 'Wednesday', date: 'February 26, 2025', name: 'Maha Shivaratri' },
    { id: 7, day: 'Wednesday', date: 'February 26, 2025', name: 'Maha Shivaratri' },
    { id: 7, day: 'Wednesday', date: 'February 26, 2025', name: 'Maha Shivaratri' },

  ];

  const calculateLoggedHours = (inTime, outTime) => {
    const inDate = new Date(inTime);
    const outDate = new Date(outTime);
    const diffMs = Math.max(outDate - inDate, 0); // Ensure no negative difference
    return diffMs / (1000 * 60 * 60); // Convert ms to hours
  };
  const punchIn = "2025-01-10T08:00:00";
  const punchOut = "2025-01-10T14:00:00";

  const maxHours = 8; // Define a typical working day in hours
  const loggedHours = calculateLoggedHours(punchIn, punchOut);
  const percentage = Math.min((loggedHours / maxHours) * 100, 100); // Cap at 100%

  // Dynamically calculate stroke offset for the circle
  const circleRadius = 40; // Radius of the circle
  const circleCircumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circleCircumference * (1 - percentage / 100);

  return (
    <div className="container-fluid p-4 bg-light" style={{ overflowX: 'hidden', overflowY: 'hidden' }}>
      <h6 className="mt-4 text-secondary">Employee Dashboard</h6>
      <div className="row d-flex justify-content-center mt-5">
        <div className="col-md-4">
          <div className="card w-100 bg-white">
            <div className="card-body">
              <h5 className="card-title">Casual Leave</h5>
              <p className="card-text">Details about casual leave.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card w-100 bg-white">
            <div className="card-body">
              <h5 className="card-title">Sick Leave</h5>
              <p className="card-text">Details about sick leave.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card w-100 bg-white">
            <div className="card-body">
              <h5 className="card-title">Privilege Leave</h5>
              <p className="card-text">Details about privilege Leave.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row d-flex justify-content-center mt-5">
        <div class="col-md-6">
          <div className="card w-100 bg-white shadow-lg rounded">
            {/* Card Header */}
            <div className="card-header py-3">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0 text-dark d-flex align-items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Today's Timesheet
                </h5>
                <span className="text-white opacity-75">{new Date().toLocaleDateString()}</span>
              </div>
            </div>

            {/* Card Body */}
            <div className="card-body p-4">
              <div className="row">
                {/* Time Progress Section */}
                <div className="col-md-6 d-flex flex-column align-items-center justify-content-center mb-4 mb-md-0">
                  <div className="position-relative" style={{ width: '200px', height: '200px' }}>
                    <svg className="w-100 h-100" style={{ transform: 'rotate(-90deg)' }}>
                      <circle
                        cx="100"
                        cy="100"
                        r="88"
                        className="fill-none"
                        stroke="#e6e6e6"
                        strokeWidth="12"
                        fill="none"
                      />
                      <circle
                        cx="100"
                        cy="100"
                        r="88"
                        className="fill-none"
                        stroke="#1a75ff"
                        strokeWidth="12"
                        strokeDasharray={`${2 * Math.PI * 88}`}
                        strokeDashoffset={`${2 * Math.PI * 88 * (1 - percentage / 100)}`}
                        strokeLinecap="round"
                        fill="none"
                      />
                    </svg>
                    <div className="position-absolute" style={{
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}>
                      <div className="text-center">
                        <h3 className="mb-0">{loggedHours.toFixed(1)}</h3>
                        <small className="text-muted">hours logged</small>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-2 text-muted">
                    {percentage.toFixed(0)}% of daily target
                  </div>
                </div>

                {/* Controls Section */}
                <div className="col-md-6 d-flex flex-column justify-content-center">
                  {punchInTime && (
                    <div className="text-center p-3 mb-4 bg-light rounded">
                      <small className="text-muted">Punched In at</small>
                      <h5 className="mb-0 text-primary">{punchInTime.toLocaleTimeString()}</h5>
                    </div>
                  )}

                  <div className="d-flex flex-column gap-3">
                    <button
                      onClick={handlePunch}
                      className={`btn ${isPunchedIn ? 'btn-danger' : 'btn-success'} d-flex align-items-center justify-content-center gap-2 py-3`}
                    >
                      {isPunchedIn ? (
                        <><TimerOff size={20} /> Punch Out</>
                      ) : (
                        <><PlayCircle size={20} /> Punch In</>
                      )}
                    </button>

                    <button
                      onClick={handleBreak}
                      className={`btn ${onBreak ? 'btn-warning' : 'btn-primary'} d-flex align-items-center justify-content-center gap-2 py-3`}
                    >
                      {onBreak ? (
                        <><PlayCircle size={20} /> Resume Work</>
                      ) : (
                        <><PauseCircle size={20} /> Take Break</>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Statistics Section */}
              <div className="row mt-4 bg-light rounded mx-0 py-3">
                <div className="col-6 text-center">
                  <small className="text-muted d-block">Break Hours</small>
                  <span className="fs-5 text-warning fw-bold">0.5 hrs</span>
                </div>
                <div className="col-6 text-center">
                  <small className="text-muted d-block">Overtime</small>
                  <span className="fs-5 text-danger fw-bold">1.2 hrs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card border shadow-sm w-100">
            <div className="card-header bg-white py-3">
              <h5 className="card-title mb-0 d-flex align-items-center">
                <span className="me-2">📅</span> Holiday List
              </h5>
            </div>

            <div className="card-body p-0">
              <div className="table-responsive" style={{ height: '389px' }}>
                <table className="table table-bordered table-hover mb-0">
                  <thead>
                    <tr className="bg-dark text-white position-sticky top-0">
                      <th className="text-center align-middle" style={{ width: '5%' }}>#</th>
                      <th className="text-center align-middle" style={{ width: '25%' }}>Holiday Day</th>
                      <th className="text-center align-middle" style={{ width: '35%' }}>Holiday Date</th>
                      <th className="text-center align-middle" style={{ width: '35%' }}>Holiday Name</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {holidays.map((holiday) => (
                      <tr key={holiday.id}>
                        <td className="text-center align-middle">{holiday.id}</td>
                        <td className="text-center align-middle">{holiday.day}</td>
                        <td className="text-center align-middle">{holiday.date}</td>
                        <td className="text-center align-middle">{holiday.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row d-flex justify-content-center mt-5">
        <div class="col-md-6">
          <div className="card bg-white shadow-sm rounded p-3 w-100" style={{ height: '446px' }}>
            <h5 className="fw-bold text-dark mb-3 d-flex align-items-center card-titler">
              <FaClock className="me-2" size={20} /> Today's Activity
            </h5>
            <ul className="list-group list-group-flush">
              {attendanceData.length > 0 ? (
                attendanceData.map((attendance, index) => (
                  <li key={index} className="list-group-item d-flex align-items-center">
                    {attendance.status === "punch_in" ? (
                      <>
                        <FaSignInAlt className="text-success me-3" size={20} />
                        <div>
                          <p className="mb-0 fw-semibold">Punch In at</p>
                          <p className="text-muted small">
                            {new Date(attendance.punch_in_time).toLocaleTimeString()}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <FaSignOutAlt className="text-danger me-3" size={20} />
                        <div>
                          <p className="mb-0 fw-semibold">Punch Out at</p>
                          <p className="text-muted small">
                            {new Date(attendance.punch_out_time).toLocaleTimeString()}
                          </p>
                        </div>
                      </>
                    )}
                  </li>
                ))
              ) : (
                <li className="list-group-item text-muted text-center">
                  No activity recorded today.
                </li>
              )}
            </ul>
          </div>

        </div>
        <div className="col-md-6">
          <div className="card border shadow-sm w-100">
            <div className="card-header bg-white py-3">
              <h5 className="card-title mb-0 d-flex align-items-center">
                <span className="me-2 text-secondary">👤</span> Employees on Leave
              </h5>
            </div>

            <div className="card-body p-0">
              <div className="table-responsive" style={{ height: '389px' }}>
                <table className="table table-bordered table-hover mb-0">
                  <thead>
                    <tr className="bg-dark text-white position-sticky top-0">
                      <th className="text-center align-middle" style={{ width: '5%' }}>#</th>
                      <th className="text-center align-middle" style={{ width: '25%' }}>Holiday Day</th>
                      <th className="text-center align-middle" style={{ width: '35%' }}>Holiday Date</th>
                      <th className="text-center align-middle" style={{ width: '35%' }}>Holiday Name</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {holidays.map((holiday) => (
                      <tr key={holiday.id}>
                        <td className="text-center align-middle">{holiday.id}</td>
                        <td className="text-center align-middle">{holiday.day}</td>
                        <td className="text-center align-middle">{holiday.date}</td>
                        <td className="text-center align-middle">{holiday.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default EmployeeDashboard;
