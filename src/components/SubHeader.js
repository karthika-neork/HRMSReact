import React from 'react';
import "../commonStyle/HeaderPage.css";

const SubHeader = ({ activeTab, onTabChange }) => {
  const tabs = ['Masters', 'Roles', 'Designations', 'Technologies', 'Leave Types'];

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

