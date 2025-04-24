import React, { useState, useEffect, useCallback, useMemo } from 'react';
import "../commonStyle/EmployeeDashboard.css";
import axios from '../axiosConfig';
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { Clock, PlayCircle, PauseCircle, TimerOff } from 'lucide-react';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import 'react-virtualized/styles.css';

function EmployeeDashboard() {

  const currentDate = new Date().toLocaleDateString();
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [punchInTime, setPunchInTime] = useState(null);
  const [punchOutTime, setPunchOutTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);
  const [userAttendance, setUserAttendance] = useState(null);

  const [leaves, setLeaves] = useState([]);

// Leave counts showing on the cards
  const [leaveCounts, setLeaveCounts] = useState(null);
  const fetchLeaveCounts = useCallback(async () => {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("user_id");

    if (!token || !userId) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    try {
      const { data, status } = await axios.get("get-leave-count", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          userId: userId,
        },
      });

      if (status !== 200 || !data?.data) {
        throw new Error("Failed to fetch leave counts");
      }

      setLeaveCounts(data.data);
    } catch (error) {
      setError(error.message || "Error fetching leave counts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaveCounts();
  }, [fetchLeaveCounts]);

  const leaveData = useMemo(() => {
    if (!leaveCounts) return null;
    return [
      { title: "Casual Leave", count: leaveCounts.TotalCasualLeaveCount ?? 0, taken: leaveCounts.CasualLeaveTaken ?? 0 },
      { title: "Sick Leave", count: leaveCounts.SickLeaveCount ?? 0, taken: 0 },
      { title: "Privilege Leave", count: 0, taken: 0 },
    ];
  }, [leaveCounts]);
  
  // const handlePunch = async () => {
  //   const token = sessionStorage.getItem('token');
  //   const userId = sessionStorage.getItem('user_id');

  //   if (!token || !userId) {
  //     alert('User not authenticated');
  //     return;
  //   }

  //   const url = isPunchedIn
  //     ? '/punch-out'
  //     : '/punch-in';

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

  // useEffect(() => {
  //   // Check if user is punched in from sessionStorage
  //   const storedPunchStatus = sessionStorage.getItem('punchStatus');
  //   if (storedPunchStatus === 'punchedIn') {
  //     setIsPunchedIn(true);

  //     // Also restore punch in time if available
  //     const storedPunchInTime = sessionStorage.getItem('punchInTime');
  //     if (storedPunchInTime) {
  //       setPunchInTime(new Date(storedPunchInTime));
  //     }
  //   } else {
  //     setIsPunchedIn(false);
  //   }
  // }, []);

  // // Update your handlePunch function
  // const handlePunch = async () => {
  //   const token = sessionStorage.getItem('token');
  //   const userId = sessionStorage.getItem('user_id');

  //   if (!token || !userId) {
  //     alert('User not authenticated');
  //     return;
  //   }

  //   const url = isPunchedIn
  //     ? '/punch-out'
  //     : '/punch-in';

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
  //       // When punching out, clear the punch status
  //       sessionStorage.removeItem('punchStatus');
  //       sessionStorage.removeItem('punchInTime');
  //     } else {
  //       const now = new Date();
  //       setPunchInTime(now);
  //       setPunchOutTime(null);
  //       // When punching in, save the status and time
  //       sessionStorage.setItem('punchStatus', 'punchedIn');
  //       sessionStorage.setItem('punchInTime', now.toISOString());
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


  // const handleBreak = async () => {
  //   if (loading) return; // Prevent multiple requests
  //   setLoading(true);

  //   const token = sessionStorage.getItem("token");
  //   const userId = sessionStorage.getItem("user_id");

  //   const apiUrl = onBreak
  //     ? "/break-end-hours"
  //     : "/break-start-hours";

  //   try {
  //     await axios.post(
  //       apiUrl,
  //       {}, // Empty body, since it's a POST request
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //           userId: userId,
  //         },
  //       }
  //     );

  //     // Toggle break state if API call is successful
  //     setOnBreak(!onBreak);
  //   } catch (error) {
  //     console.error("Error handling break:", error);
  //     alert("Something went wrong. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   const fetchAttendance = async () => {
  //     const token = sessionStorage.getItem("token");
  //     const userId = sessionStorage.getItem("user_id");

  //     if (!token || !userId) {
  //       console.error("Token or User ID is missing");
  //       return;
  //     }

  //     try {
  //       const response = await axios.get("/get-work-and-break-time", {
  //         headers: {
  //           'Authorization': `Bearer ${token}`,
  //           'Content-Type': 'application/json',
  //           'userId': userId
  //         },
  //       });

  //       console.log(response, "API Response"); // Debugging
  //       // setAttendanceData(response.data); // Assuming API returns an array
  //       // console.log(response.data, "API Response"); // Debugging
  //       setAttendanceData(response.data.data.Attendance);
  //       setUserAttendance(response.data.data.UserAttendance);
  //     } catch (error) {
  //       console.error("Error fetching attendance data:", error);
  //     }
  //   };

  //   fetchAttendance();
  // }, []);
  
    // Restore session storage data
    useEffect(() => {
      const storedPunchStatus = sessionStorage.getItem("punchStatus");
      const storedPunchInTime = sessionStorage.getItem("punchInTime");
  
      if (storedPunchStatus === "punchedIn") {
        setIsPunchedIn(true);
        if (storedPunchInTime) setPunchInTime(new Date(storedPunchInTime));
      }
    }, []);
  
    // Fetch attendance data
    const fetchAttendance = useCallback(async () => {
      const token = sessionStorage.getItem("token");
      const userId = sessionStorage.getItem("user_id");
  
      if (!token || !userId) return console.error("Token or User ID is missing");
  
      try {
        const response = await axios.get("/get-work-and-break-time", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            userId: userId,
          },
        });
        setAttendanceData(response.data.data.Attendance);
        setUserAttendance(response.data.data.UserAttendance);

      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    }, []);
  
    useEffect(() => {
      fetchAttendance();
    }, [fetchAttendance]);
  
    // Handle punch-in/out
    const handlePunch = useCallback(async () => {
      const token = sessionStorage.getItem("token");
      const userId = sessionStorage.getItem("user_id");
  
      if (!token || !userId) return alert("User not authenticated");
  
      const url = isPunchedIn ? "/punch-out" : "/punch-in";
  
      try {
        await axios.post(url, {}, { headers: { Authorization: `Bearer ${token}`, userId } });
  
        if (isPunchedIn) {
          setPunchOutTime(new Date());
          sessionStorage.removeItem("punchStatus");
          sessionStorage.removeItem("punchInTime");
        } else {
          const now = new Date();
          setPunchInTime(now);
          setPunchOutTime(null);
          sessionStorage.setItem("punchStatus", "punchedIn");
          sessionStorage.setItem("punchInTime", now.toISOString());
        }
  
        setIsPunchedIn(!isPunchedIn);
        setOnBreak(false);
      } catch (error) {
        console.error("Error:", error);
        alert(error.response?.data?.message || "Failed to punch in/out");
      }
    }, [isPunchedIn]);
  
    // Handle break start/end
    const handleBreak = useCallback(async () => {
      if (loading) return;
      setLoading(true);
  
      const token = sessionStorage.getItem("token");
      const userId = sessionStorage.getItem("user_id");
  
      if (!token || !userId) return alert("User not authenticated");
  
      const apiUrl = onBreak ? "/break-end-hours" : "/break-start-hours";
  
      try {
        await axios.post(apiUrl, {}, { headers: { Authorization: `Bearer ${token}`, userId } });
        setOnBreak(!onBreak);
      } catch (error) {
        console.error("Error handling break:", error);
        alert("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    }, [onBreak, loading]);
  
    // Compute percentage of daily target

  // Holiday table
  const [holidays, setHolidays] = useState([]);
  const [error, setError] = useState(null);

  // const fetchHolidays = async () => {
  //   const token = sessionStorage.getItem("token");
  //   const userId = sessionStorage.getItem("user_id");

  //   if (!token || !userId) {
  //     console.error("Token or User ID is missing");
  //     return;
  //   }
  //   try {
  //     const response = await axios.get('/holiday-list', {
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         'Content-Type': 'application/json',
  //         'userId': userId
  //       },
  //     });
  //     setHolidays(response.data.holidays || []);
  //   } catch (err) {
  //     setError(err.response?.data?.message || 'Failed to fetch holiday list');
  //   } finally {
  //     setLoading(false);
  //   }

  // }
  // useEffect(() => {
  //   fetchHolidays()
  // }, []);

  // Holiday api call
    const fetchHolidays = useCallback(async () => {
      const token = sessionStorage.getItem("token");
      const userId = sessionStorage.getItem("user_id");
  
      if (!token || !userId) {
        setError("Token or User ID is missing");
        setLoading(false);
        return;
      }
  
      try {
        const { data } = await axios.get("/holiday-list", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            userId: userId,
          },
        });
        setHolidays(data.holidays || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch holiday list");
      } finally {
        setLoading(false);
      }
    }, []);
  
    useEffect(() => {
      fetchHolidays();
    }, [fetchHolidays]);
  
    const renderedHolidays = useMemo(() => {
      if (!holidays) return null;
      return holidays.length > 0 ? (
        holidays.map(({ id, holiday_name, holiday_date, description }) => (
          <tr key={id}>
            <td className="text-center align-middle">{id}</td>
            <td className="text-center align-middle">{holiday_name}</td>
            <td className="text-center align-middle">{holiday_date}</td>
            <td className="text-center align-middle">{description}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="4" className="text-center py-3">No holidays available</td>
        </tr>
      );
    }, [holidays]);
  

  if (loading) return <p>Loading holidays...</p>;
  if (error) return <p>{error}</p>;


  // Component code...
  
  // Create a cache to store measured row heights
  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 60,
    minHeight: 50
  });
  

  // Text component that truncates long text and shows tooltip
  const TruncatedText = ({ text, maxLength = 25 }) => {
    const isTruncated = text && text.length > maxLength;
    const displayText = isTruncated ? `${text.substring(0, maxLength)}...` : text;
    
    return (
      <div 
        title={isTruncated ? text : ''}
        style={{ 
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          width: '100%',
        }}
      >
        {displayText}
      </div>
    );
  };

  // Header component for the list
  const HeaderRow = () => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0.75rem 1rem',
        borderBottom: '2px solid #dee2e6',
        backgroundColor: '#f8f9fa',
        fontWeight: 'bold',
      }}
    >
      <div style={{ width: '10%', textAlign: 'center' }}>ID</div>
      <div style={{ width: '30%', textAlign: 'center' }}>Holiday Name</div>
      <div style={{ width: '30%', textAlign: 'center' }}>Date</div>
      <div style={{ width: '30%', textAlign: 'center' }}>Description</div>
    </div>
  );

  const rowRenderer = ({ index, key, style, parent }) => {
    const { id, holiday_name, holiday_date, description } = holidays[index];
    
    return (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
      >
        {({ registerChild }) => (
          <div
            ref={registerChild}
            style={{
              ...style,
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0.5rem 1rem',
              borderBottom: '1px solid #dee2e6',
              backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#ffffff',
            }}
          >
            {/* ID column */}
            <div style={{ width: '10%', textAlign: 'center' }}>
              <TruncatedText text={id?.toString()} maxLength={5} />
            </div>
            
            {/* Holiday Name column */}
            <div style={{ width: '30%', textAlign: 'center' }}>
              <TruncatedText text={holiday_name} maxLength={20} />
            </div>
            
            {/* Holiday Date column */}
            <div style={{ width: '30%', textAlign: 'center' }}>
              <TruncatedText text={holiday_date} maxLength={12} />
            </div>
            
            {/* Description column with tooltip for long text */}
            <div style={{ width: '30%', textAlign: 'center' }}>
              <TruncatedText text={description} maxLength={25} />
            </div>
          </div>
        )}
      </CellMeasurer>
    );
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
    <div className="container-fluid p-4 bg-light" style={{ overflowX: 'hidden', overflowY: 'hidden' }}>
      <h6 className="mt-4 text-secondary">Employee Dashboard</h6>
      {/* <div className="row d-flex justify-content-center mt-5">
        <div className="col-md-4">
          <div className="card w-100 bg-white">
            <div className="card-body text-center">
              <h5 className="card-title">Casual Leave</h5>
              <p className="card-text d-flex justify-content-center">
                <span className="me-2">{leaveCounts?.TotalCasualLeaveCount ?? "0"}</span> /
                <span className="ms-2">{leaveCounts?.CasualLeaveTaken ?? "0"}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card w-100 bg-white">
            <div className="card-body text-center">
              <h5 className="card-title">Sick Leave</h5>
              <p className="card-text d-flex justify-content-center">
                <span className="me-2">{leaveCounts?.SickLeaveCount ?? "0"}</span> /<span className="ms-2">0</span>
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card w-100 bg-white">
            <div className="card-body text-center">
              <h5 className="card-title">Privilege Leave</h5>
              <p className="card-text d-flex justify-content-center">
                <span className="me-2">0</span> / <span className="ms-2">0</span>
              </p>
            </div>
          </div>
        </div>
      </div> */}

{/* Leave count cards count */}
<div className="row d-flex justify-content-center mt-5">
      {loading ? (
        <div className="text-center py-4">Loading leave count data...</div>
      ) : error ? (
        <div className="text-danger text-center py-4">{error}</div>
      ) : (
        leaveData?.map(({ title, count, taken }) => (
          <div className="col-md-4" key={title}>
            <div className="card w-100 bg-white">
              <div className="card-body text-center">
                <h5 className="card-title">{title}</h5>
                <p className="card-text d-flex justify-content-center">
                  <span className="me-2">{count}</span> / <span className="ms-2">{taken}</span>
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>

      <div className="row d-flex justify-content-center mt-5">
        {/* <div class="col-md-6">
          <div className="card w-100 bg-white shadow-lg rounded">
            <div className="card-header py-3">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0 text-dark d-flex align-items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Today's Timesheet
                </h5>
                <span className="text-white opacity-75">{new Date().toLocaleDateString()}</span>
              </div>
            </div>

            <div className="card-body p-4">
              <div className="row">
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
                      {userAttendance && (
                        <div className="text-center">
                          <h3 className="mb-0">{userAttendance.total_working_hours}</h3>
                          <small className="text-muted">hours logged</small>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-center mt-2 text-muted">
                    {percentage.toFixed(0)}% of daily target
                  </div>
                </div>

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

              {userAttendance && (
                <div className="row mt-4 bg-light rounded mx-0 py-3">
                  <div className="col-6 text-center">
                    <small className="text-muted d-block">Break Hours</small>
                    <span className="fs-5 text-warning fw-bold">{userAttendance.break_hours}</span>
                  </div>
                  <div className="col-6 text-center">
                    <small className="text-muted d-block">Overtime</small>
                    <span className="fs-5 text-danger fw-bold">{userAttendance.extra_hours}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
         */}
      <div className="col-md-6">
        <div className="card w-100 bg-white shadow-lg rounded">
          {/* Card Header */}
          <div className="card-header py-3 d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0 text-dark d-flex align-items-center gap-2">
              ⏳ Today's Timesheet
            </h5>
            <span className="text-muted">{new Date().toLocaleDateString()}</span>
          </div>

          {/* Card Body */}
          <div className="card-body p-4" style={{height:'400px'}}>
            <div className="row">
              {/* Time Progress Section */}
              <div className="col-md-6 d-flex flex-column align-items-center justify-content-center mb-4 mb-md-0">
                <div className="position-relative" style={{ width: "200px", height: "200px" }}>
                  <svg className="w-100 h-100" style={{ transform: "rotate(-90deg)" }}>
                    <circle cx="100" cy="100" r="88" stroke="#e6e6e6" strokeWidth="12" fill="none" />
                    <circle
                      cx="100"
                      cy="100"
                      r="88"
                      stroke="#1a75ff"
                      strokeWidth="12"
                      strokeDasharray={`${2 * Math.PI * 88}`}
                      strokeDashoffset={`${2 * Math.PI * 88 * (1 - percentage / 100)}`}
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                  <div className="position-absolute" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                    {userAttendance && (
                      <div className="text-center">
                        <h3 className="mb-0">{userAttendance.total_working_hours}</h3>
                        <small className="text-muted">hours logged</small>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-center mt-2 text-muted">{percentage.toFixed(0)}% of daily target</div>
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
                  <button onClick={handlePunch} className={`btn ${isPunchedIn ? "btn-danger" : "btn-success"} py-3`}>
                    {isPunchedIn ? <><TimerOff size={20} /> Punch Out</> : <><PlayCircle size={20} /> Punch In</>}
                  </button>

                  <button onClick={handleBreak} className={`btn ${onBreak ? "btn-warning" : "btn-primary"} py-3`}>
                    {onBreak ? <><PlayCircle size={20} /> Resume Work</> : <><PauseCircle size={20} /> Take Break</>}
                  </button>
                </div>
              </div>
            </div>

            {/* Statistics Section */}
            {userAttendance && (
              <div className="row mt-4 bg-light rounded mx-0 py-3 text-center">
                <div className="col-6"><small>Break Hours</small> <span>{userAttendance.break_hours}</span></div>
                <div className="col-6"><small>Overtime</small> <span>{userAttendance.extra_hours}</span></div>
              </div>
            )}
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
          {holidays.length === 0 ? (
            <div className="text-center py-3">No holidays available</div>
          ) : (
            <>
              <HeaderRow />
              <div style={{ height: '347px' }}> {/* Reduced height to account for header */}
                <AutoSizer>
                  {({ width, height }) => (
                    <List
                      width={width}
                      height={height}
                      rowCount={holidays.length}
                      deferredMeasurementCache={cache}
                      rowHeight={cache.rowHeight}
                      rowRenderer={rowRenderer}
                    />
                  )}
                </AutoSizer>
              </div>
            </>
          )}
        </div>
          </div>
</div>     
</div>     

 <div className="row d-flex justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card bg-white shadow-sm rounded p-3 w-100" style={{ height: "450px" }}>
            <h5 className="fw-bold text-dark mb-3 d-flex align-items-center card-titler">
              <FaClock className="me-2" size={20} /> Today's Activity
            </h5>

            {/* Scrollable Attendance List */}
            <div style={{ maxHeight: "350px", overflowY: "auto" }}>
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
                              {attendance.punch_in_time
                                ? new Date(attendance.punch_in_time).toLocaleTimeString()
                                : "N/A"}
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <FaSignOutAlt className="text-danger me-3" size={20} />
                          <div>
                            <p className="mb-0 fw-semibold">Punch Out at</p>
                            <p className="text-muted small">
                              {attendance.punch_out_time
                                ? new Date(attendance.punch_out_time).toLocaleTimeString()
                                : "N/A"}
                            </p>
                          </div>
                        </>
                      )}
                    </li>
                  ))
                ) : (
                  <li className="list-group-item text-muted text-center">No activity recorded today.</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* <div className="col-md-6">
          <div className="card bg-white shadow-sm rounded p-3 w-100" style={{ height: "450px" }}>
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
                            {attendance.punch_in_time
                              ? new Date(attendance.punch_in_time).toLocaleTimeString()
                              : "N/A"}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <FaSignOutAlt className="text-danger me-3" size={20} />
                        <div>
                          <p className="mb-0 fw-semibold">Punch Out at</p>
                          <p className="text-muted small">
                            {attendance.punch_out_time
                              ? new Date(attendance.punch_out_time).toLocaleTimeString()
                              : "N/A"}
                          </p>
                        </div>
                      </>
                    )}
                  </li>
                ))
              ) : (
                <li className="list-group-item text-muted text-center">No activity recorded today.</li>
              )}
            </ul>
          </div>
        </div> */}
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
                      <th className="text-center align-middle" style={{ width: '25%' }}>Name</th>
                      <th className="text-center align-middle" style={{ width: '35%' }}>Designation </th>
                      <th className="text-center align-middle" style={{ width: '35%' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {leaves.map((leave) => (
                      <tr key={leave.id}>
                        <td className="text-center align-middle">{leave.id}</td>
                        <td className="text-center align-middle">{leave.day}</td>
                        <td className="text-center align-middle">{leave.date}</td>
                        <td className="text-center align-middle">{leave.name}</td>
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
