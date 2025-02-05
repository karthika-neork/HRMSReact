import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage';
import ForgotPassword from './components/ForgotPassword';
import Header from './components/Header';
import Role from './crudPages/Role';
import SubHeader from './components/SubHeader';
import AdminDashboard from './components/AdminDashboard';
import EmployeeDashboard from './components/EmployeeDashboardPage';
import PolicyPage from './components/PolicyPage'
import EmployeeHomePage from './components/EmployeeHomePage';
import Footer from './components/Footer';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/header" element={<Header />} />
          <Route path="/sub" element={<SubHeader />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/role" element={<Role />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
          <Route path="/policy" element={<PolicyPage />} />
          <Route path="/emp-home" element={<EmployeeHomePage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
