// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const SubHeader = ({ activeTab, onTabChange, menuType }) => {
//   const mastersTabs = ['Masters', 'Roles', 'Designations', 'Technologies', 'Leave Types'];
//   const employeeTabs = ['Employee', 'Dashboard', 'User Attendance', 'My Attendance', 'Profile', 'Add Employee', 'Leave', 'Employee List', 'Employee Leave List', 'Payroll Report'];
//   const tabs = menuType === 'Masters' ? mastersTabs : employeeTabs;
//   return (
//     <nav className="bg-white shadow-sm">
//       <ul className="nav justify-content-left">
//         {tabs.map((tab, index) => (
//           <li key={tab} className="nav-item">
//             <a
//               href="#"
//               className={`nav-link fw-bold text-center px-3 py-2 ${index === 0
//                 ? 'text-white bg-primary not-allowed' // Masters/Employee tab in #4383ce 
//                 : activeTab === tab
//                   ? 'active text-white' // Active tab in #0047bb 
//                   : 'text-dark' // Default tab color
//                 }`}
//               style={{
//                 backgroundColor: index === 0 ? '#4383ce' : activeTab === tab ? '#0047bb' : 'transparent',
//                 pointerEvents: index === 0 ? 'none' : 'auto', // Prevent click on Masters/Employee
//                 cursor: index === 0 ? 'not-allowed' : 'pointer', // Show not-allowed cursor
//                 borderRadius: '0px', // Remove oval shape, make it square
//               }}
//               onClick={(e) => {
//                 if (index !== 0) {
//                   e.preventDefault();
//                   onTabChange(tab);
//                 }
//               }}
//             >
//               {tab}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// export default SubHeader;

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SubHeader = ({ activeTab, onTabChange, menuType }) => {
  const mastersTabs = ['Masters', 'Roles', 'Designations', 'Technologies', 'Leave Types'];
  const employeeTabs = ['Employee', 'Dashboard', 'User Attendance', 'My Attendance', 'Profile', 'Add Employee', 'Leave', 'Employee List', 'Employee Leave List', 'Payroll Report'];
  const tabs = menuType === 'Masters' ? mastersTabs : employeeTabs;

  return (
    <nav className="bg-white shadow-sm">
      <div className="container-fluid">
        <div className="d-flex overflow-auto flex-nowrap py-2">
          {tabs.map((tab, index) => (
            <div key={tab} className="px-2">
              <a
                href="#"
                className={`nav-link fw-bold text-center px-3 py-2 ${index === 0
                  ? 'text-white bg-primary not-allowed' // Masters/Employee tab in #4383ce
                  : activeTab === tab
                    ? 'active text-white' // Active tab in #0047bb
                    : 'text-dark' // Default tab color
                  }`}
                style={{
                  backgroundColor: index === 0 ? '#4383ce' : activeTab === tab ? '#0047bb' : 'transparent',
                  pointerEvents: index === 0 ? 'none' : 'auto', // Prevent click on Masters/Employee
                  cursor: index === 0 ? 'not-allowed' : 'pointer', // Show not-allowed cursor
                  borderRadius: '0px', // Remove oval shape, make it square
                  whiteSpace: 'nowrap', // Prevent text wrapping
                }}
                onClick={(e) => {
                  if (index !== 0) {
                    e.preventDefault();
                    onTabChange(tab);
                  }
                }}
              >
                {tab}
              </a>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default SubHeader;
