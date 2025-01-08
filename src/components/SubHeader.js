import React from 'react';
import "../commonStyle/HeaderPage.css";

const SubHeader = ({ activeTab, onTabChange, menuType }) => {
  const mastersTabs = ['Masters', 'Roles', 'Designations', 'Technologies', 'Leave Types'];
  const employeeTabs = ['Dashboard', 'Profile', 'Leave'];
  
  const tabs = menuType === 'Masters' ? mastersTabs : employeeTabs;

  return (
    <div className="subheader-wrapper">
      <div className="tabs-container">
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubHeader;