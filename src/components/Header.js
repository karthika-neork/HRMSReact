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
        case 'Profile':
          setCurrentPage('profile');
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
      <div className="header-wrapper">
        <div className="header-content">
          {/* Left section */}
          <div className="header-left">
            <div className="logo">
              <img
                src="https://i.postimg.cc/13MWDfQC/logo-white.png"
                alt=""
                style={{ width: '100px', height: 'auto' }}
              />
            </div>
            <div className="search-container ms-5">
              <input
                type="text"
                placeholder="Search"
                className="search-input"
              />
              <FaSearch className="search-icon" />
            </div>
          </div>

          <div className="header-right">
            {/* Settings Dropdown */}
            <div className="dropdown-container" ref={settingsRef}>
              <Dropdown
                show={showSettings}
                onToggle={(isOpen) => setShowSettings(isOpen)}
              >
                <Dropdown.Toggle bsPrefix="custom-dropdown-toggle" className="icon-btn">
                  <FaCog className="icon" onClick={() => setShowSettings(!showSettings)} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleDropdownClick("Masters")}>
                    Masters
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleDropdownClick("Employees")}>
                    Employees
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleDropdownClick("Notifications")}
                    className="dropdown-item"
                  >
                    Notification
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleDropdownClick("Policy")}
                    className="dropdown-item"
                  >
                    Policy
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleDropdownClick("Holiday")}
                    className="dropdown-item"
                  >
                    Holiday
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

            </div>
            {/* Notifications Dropdown */}
            <div className="dropdown-container" ref={notificationRef}>
              <Dropdown
                show={showNotifications}
                onToggle={(isOpen) => setShowNotifications(isOpen)}
              >
                <Dropdown.Toggle bsPrefix="custom-dropdown-toggle" className="icon-btn">
                  <FaBell
                    className="icon"
                    onClick={() => setShowNotifications(!showNotifications)}
                  />
                  <span className="notification-badge">0</span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="notifications-menu">
                  <Dropdown.Header>Notifications</Dropdown.Header>
                  <p>No new notifications</p>
                  <Dropdown.Item className="notification-item" onClick={() => handleDropdownClick("Notifications")}>
                    <button className="btn btn-primary">View All Message</button>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {/* Profile Dropdown */}
            <div className="dropdown-container" ref={profileRef}>
              <div
                className="profile-container"
                onClick={() => setShowProfile(!showProfile)}
              >
                <div className="avatar"></div>
                <span className="username">Super Admin</span>
              </div>
              {showProfile && (
                <div className="dropdown-menu profile-menu">
                  <div
                    className="dropdown-item logout-item"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="logout-icon" />
                    Logout
                  </div>
                </div>
              )}
            </div>
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
      {currentPage === 'profile' && <EmployeeProfile />}
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