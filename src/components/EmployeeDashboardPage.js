import React, { useState } from 'react';
import "../commonStyle/EmployeeDashboard.css";
import { FaClock } from 'react-icons/fa';
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

  const handleBreak = () => {
    setOnBreak(!onBreak);
  };

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
    <div className="container-body"  style={{ overflowX: 'hidden', overflowY: 'hidden',width:'100%',padding:'30px' }}>
      <h4>Employee Dashboard</h4>      
      {/* Row for leave data */}
      <div className="row justify-content-start mb-4"> 
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <span>Total Casual Leave</span>
              <p>0</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <span>Casual Leave Taken</span>
              <p>0</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <span>Sick Leave Taken</span>
              <p>0</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Timesheet and Activity Section */}
      <div className="row">
    <div className="col-lg-6">
      <div className="card" style={{height:'auto'}}>
        <div className="card-body">
          <h5 className="card-title">
            Timesheet <small className="text-muted">{currentDate}</small>
          </h5>
          <input type="text" className='form-control ' disabled />
          <div className=" d-flex align-items-center justify-content-center">
            <div className="position-relative mt-5">
              {/* Circular Progress */}
              <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
                <circle
                  cx="60"
                  cy="60"
                  r={circleRadius}
                  stroke="#f0f0f0"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="60"
                  cy="60"
                  r={circleRadius}
                  stroke="#007BFF"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={strokeDashoffset}
                />
              </svg>

              {/* Text in the center */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#333',
                }}
              >
                {loggedHours.toFixed(1)} hrs
              </div>
            </div>
          </div>
          <p className="mt-3 text-center">
            You have logged <strong>{loggedHours.toFixed(1)} hours</strong> today, which is{" "}
            <strong>{percentage.toFixed(0)}%</strong> of your workday goal.
          </p>
        </div>

        <input type="text" className='form-control ' disabled placeholder='Reason for Punchout' />
        <div className="col-md-4" style={{marginLeft:'180px'}}>
        <div className="d-flex justify-content-between align-items-center mt-4">
          <button className="btn btn-primary rounded" onClick={handlePunch}>
            {isPunchedIn ? 'Punch Out' : 'Punch In'}
          </button>
          {/* {isPunchedIn && ( */}
            <button
              className={`btn ${onBreak ? 'btn-warning' : 'btn-primary'}`}
              onClick={handleBreak}
            >
              {onBreak ? 'Resume Work' : 'Break'}
            </button>
          {/* )} */}
        </div>

      </div>

      {/* Punch Buttons Section */}
      </div>

          </div>
            <div className="col-lg-4" style={{marginRight:'100px'}}>
        <div className='p-6 bg-white rounded-lg shadow' >
        <div className="table-responsive" style={{padding:'10px'}}>
          Holiday List
          <table className=" table table-bordered w-full">
            <thead>
              <tr>
                <th className="text-left py-2">#</th>
                <th className="text-left py-2">Holiday Day</th>
                <th className="text-left py-2">Holiday Date</th>
                <th className="text-left py-2">Holiday Name</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2">1</td>
                <td>Wednesday</td>
                <td>January 01, 2025</td>
                <td>New Year</td>
              </tr>
              <tr>
                <td className="py-2">2</td>
                <td>Wednesday</td>
                <td>February 26, 2025</td>
                <td>Maha Shivaratri</td>
              </tr>
              {/* Add more holiday rows as needed */}
            </tbody>
          </table>
        </div>
        </div>
        </div>

        {/* Today Activity Card */}
        <div className="col-md-6" style={{marginTop:''}}>
          <div className="card recent-activity mb-4">
            <div className="card-body">
              <h5 className="card-title">Today Activity</h5>
              <ul className="res-activity-list">
                {attendanceData.length > 0 &&
                  attendanceData.map((attendance, index) => (
                    <li key={index}>
                      {attendance.status === 'punch_in' ? (
                        <div>
                          <p className="mb-0">Punch In at</p>
                          <p className="res-activity-time">{new Date(attendance.punch_in_time).toLocaleTimeString()}</p>
                        </div>
                      ) : (
                        <div>
                          <p className="mb-0">Punch Out at</p>
                          <p className="res-activity-time">{new Date(attendance.punch_out_time).toLocaleTimeString()}</p>
                        </div>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-lg-4" style={{marginTop:'',marginRight:'100px'}}>
        <div className='p-6 bg-white rounded-lg shadow' style={{padding:'20px'}}>
          Employee Leaves
        <div className="table-responsive">
        <table className="table table-bordered mb-0">
          <thead className="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Designation</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>Software Engineer</td>
              <td className="text-danger">Sick Leave</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jane Smith</td>
              <td>Product Manager</td>
              <td className="text-danger">Annual Leave</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Mike Johnson</td>
              <td>UI Designer</td>
              <td className="text-danger">Personal Leave</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
    </div>
    </div>
  );
}

export default EmployeeDashboard;
