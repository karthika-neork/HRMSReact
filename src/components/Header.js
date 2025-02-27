import React, { useEffect, useRef, useState } from "react";
import { FaSearch, FaCog, FaBell, FaSignOutAlt } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import SubHeader from "./SubHeader";
import EmployeeDashboard from './EmployeeDashboardPage';
import EmployeeProfile from './EmployeeProfilePage';
import EmployeeLeave from './EmployeeLeavePAge';
import RolePage from "./RolePage";
import DesignationPage from './DesignationPage';
import NotificationPage from './NotificationPage'
import Technologies from "./Technologies";
import LeaveTypes from "./LeaveTypes";
import PolicyPage from "./PolicyPage"
import HolidayPage from "./HolidayPage";
import EmployeeList from "./EmployeeList";
import EmployeeLeaveList from "./EmployeeLeaveList";
import PayrollReport from "./PayrollReport";
import AddEmployee from "./AddEmployee";
import AttedanceList from "./AttedanceList";
import MyAttendance from "./MyAttendance";
const Header = ({ defaultSection = "Employees" }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const [showSubHeader, setShowSubHeader] = useState(false);
  const [menuType, setMenuType] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);

  const settingsRef = useRef(null);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);


  useEffect(() => {
    if (defaultSection) {
      setShowSubHeader(true);
      setMenuType(defaultSection);
      setActiveTab(defaultSection === 'Employees' ? 'Dashboard' : 'Roles');
      setCurrentPage(defaultSection === 'Employees' ? 'dashboard' : 'roles');
    }
  }, [defaultSection]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (menuType === 'Employees') {
      switch (tab) {
        case 'Dashboard':
          setCurrentPage('dashboard');
          break;
        case 'User Attendance':
          setCurrentPage('attedance');
          break;
        case 'My Attendance':
          setCurrentPage('my-attendance');
          break;
        case 'Profile':
          setCurrentPage('profile');
          break;
        case 'Add Employee':
          setCurrentPage('add-employee');
          break;
        case 'Leave':
          setCurrentPage('leave');
          break;
        case 'Employee List':
          setCurrentPage('employee-list');
          break;
        case 'Employee Leave List':
          setCurrentPage('employee-leave-list');
          break;
        case 'Payroll Report':
          setCurrentPage('payroll-report');
          break;
        default:
          setCurrentPage(null);
      }
    } else if (menuType === 'Masters') {
      switch (tab) {
        case 'Roles':
          setCurrentPage('roles');
          break;
        case 'Designations':
          setCurrentPage('designations');
          break;
        case 'Technologies':
          setCurrentPage('technologies');
          break;
        case 'Leave Types':
          setCurrentPage('leaveTypes');
          break;
        default:
          setCurrentPage(null);
      }
    }
  };

  const handleDropdownClick = (menuItem) => {
    if (menuItem === "Masters") {
      setShowSubHeader(true);
      setMenuType('Masters');
      setActiveTab('Roles');
      setCurrentPage('roles');
    } else if (menuItem === "Employees") {
      setShowSubHeader(true);
      setMenuType('Employees');
      setActiveTab('Dashboard');
      setCurrentPage('dashboard');
    } else if (menuItem === "Notifications") {
      setShowSubHeader(false);
      setMenuType(null);
      setCurrentPage('notifications');
    } else if (menuItem === "Policy") {
      setShowSubHeader(false); // Adjust as per your requirements
      setMenuType('Policy');
      setActiveTab(null); // Adjust as per your requirements
      setCurrentPage('policy');
    }
    else if (menuItem === "Holiday") {
      setShowSubHeader(false);
      setMenuType('holiday');
      setActiveTab(null);
      setCurrentPage('holiday');
    } else {
      setShowSubHeader(false);
      setMenuType(null);
      setCurrentPage(null);
    }
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    // Add your logout logic here
  };

  return (
    <div>
    <div className="py-2 px-3 shadow-sm" style={{ backgroundColor: "#0047bb", color: "white" }}>
        <div className="container-fluid d-flex justify-content-between align-items-center">

          {/* Left Section */}
          <div className="d-flex align-items-center">
            <img src="https://i.postimg.cc/13MWDfQC/logo-white.png" alt="Logo" className="me-3" style={{ width: "100px" }} />
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search" />
              <span className="input-group-text bg-light">
                <FaSearch className="text-secondary" />
              </span>
            </div>
          </div>

          {/* Right Section */}
          <div className="d-flex align-items-center">

            {/* Settings Dropdown */}
            <Dropdown show={showSettings} onToggle={setShowSettings} ref={settingsRef} className="me-3">
              <Dropdown.Toggle variant="link" className="text-white p-0 border-0">
                <FaCog size={20} />
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-end">
                <Dropdown.Item onClick={() => handleDropdownClick("Masters")}>Masters</Dropdown.Item>
                <Dropdown.Item onClick={() => handleDropdownClick("Employees")}>Employees</Dropdown.Item>
                <Dropdown.Item onClick={() => handleDropdownClick("Notifications")}>Notifications</Dropdown.Item>
                <Dropdown.Item onClick={() => handleDropdownClick("Policy")}>Policy</Dropdown.Item>
                <Dropdown.Item onClick={() => handleDropdownClick("Holiday")}>Holiday</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {/* Notifications Dropdown */}
            <Dropdown show={showNotifications} onToggle={setShowNotifications} ref={notificationRef} className="me-3 position-relative">
              <Dropdown.Toggle variant="link" className="text-white p-0 border-0 position-relative">
                <FaBell size={20} />
                <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">0</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-end">
                <Dropdown.Header>Notifications</Dropdown.Header>
                <p className="text-center m-2">No new notifications</p>
                <Dropdown.Item className="text-center">
                  <button className="btn btn-primary w-100">View All</button>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {/* Profile Dropdown */}
            <div className="d-flex align-items-center cursor-pointer" ref={profileRef} onClick={() => setShowProfile(!showProfile)}>
              <div className="rounded-circle bg-secondary me-2" style={{ width: "35px", height: "35px" }}></div>
              <span className="fw-bold">Super Admin</span>
            </div>
            {showProfile && (
              <div className="dropdown-menu dropdown-menu-end show mt-2">
                <div className="dropdown-item text-danger d-flex align-items-center" onClick={handleLogout}>
                  <FaSignOutAlt className="me-2" />
                  Logout
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
      {showSubHeader && (
        <SubHeader
          activeTab={activeTab}
          onTabChange={handleTabChange}
          menuType={menuType}
        />
      )}

      {/* Render pages based on currentPage state */}
      {currentPage === 'dashboard' && <EmployeeDashboard />}
      {currentPage === 'attedance' && <AttedanceList />}
      {currentPage === 'my-attendance' && <MyAttendance />}
      {currentPage === 'profile' && <EmployeeProfile />}
      {currentPage === 'add-employee' && <AddEmployee />}
      {currentPage === 'leave' && <EmployeeLeave />}
      {currentPage === 'employee-list' && <EmployeeList />}
      {currentPage === 'employee-leave-list' && <EmployeeLeaveList />}
      {currentPage === 'payroll-report' && <PayrollReport />}
      {currentPage === 'roles' && <RolePage />}
      {currentPage === 'designations' && <DesignationPage />}
      {currentPage === 'technologies' && <Technologies />}
      {currentPage === 'leaveTypes' && <LeaveTypes />}
      {currentPage === 'notifications' && <NotificationPage />}
      {currentPage === 'policy' && <PolicyPage />}
      {currentPage === 'holiday' && <HolidayPage />}

    </div >
  );
};

export default Header;