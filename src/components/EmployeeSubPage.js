import React from "react";
import "../commonStyle/SubHeader.css";

const EmployeeSubHeader = ({ activeTab, tabOptions, onTabChange }) => {
    return (
        <div className="subheader">
            <ul className="tab-list">
                {tabOptions.map((tab) => (
                    <li
                        key={tab}
                        className={`tab-item ${activeTab === tab ? "active" : ""}`}
                        onClick={() => onTabChange(tab)}
                    >
                        {tab}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeSubHeader;
