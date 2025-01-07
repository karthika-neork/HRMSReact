import React, { useEffect, useRef, useState } from "react";
import { FaSearch, FaCog, FaBell, FaSignOutAlt } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import SubHeader from "./SubHeader"; // Import SubHeader
import "../commonStyle/HeaderPage.css";

const Header = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [activeTab, setActiveTab] = useState("Roles"); // Default tab for Masters
  const [showSubHeader, setShowSubHeader] = useState(false); // Show SubHeader only for Masters

  const settingsRef = useRef(null);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDropdownClick = (menuItem) => {
    if (menuItem === "Masters") {
      setShowSubHeader(true); // Show SubHeader when Masters is clicked
      setActiveTab("Roles"); // Default to Roles tab
    } else {
      setShowSubHeader(false); // Hide SubHeader for other dropdown items
    }
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    // Add your logout logic here
  };

  return (
    <>
      <div className="header-wrapper">
        <div className="header-content">
          {/* Left section */}
          <div className="header-left">
            <div className="logo">
              {/* Neork<span className="trademark">®</span> */}
              <img src="https://i.postimg.cc/13MWDfQC/logo-white.png" alt=""  style={{ width: '100px', height: 'auto' }}/>

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
                  <FaCog
                    className="icon"
                    onClick={() => setShowSettings(!showSettings)}
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => handleDropdownClick("Masters")} // Show SubHeader for Masters
                    className="dropdown-item"
                  >
                    Masters
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleDropdownClick("Employees")}
                    className="dropdown-item"
                  >
                    Employees
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleDropdownClick("Notifications")}
                    className="dropdown-item"
                  >
                    Notification
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleDropdownClick("Others")}
                    className="dropdown-item"
                  >
                    Others
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
                  <Dropdown.Item className="notification-item">
                    No new notifications
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

      {/* Render SubHeader only when showSubHeader is true */}
      {showSubHeader && (
        <SubHeader activeTab={activeTab} onTabChange={setActiveTab} />
      )}
    </>
  );
};

export default Header;
