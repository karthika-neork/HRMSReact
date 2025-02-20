import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage';
import ForgotPassword from './components/ForgotPassword';
import Header from './components/Header';
import Role from './crudPages/Role';
import SubHeader from './components/SubHeader';
import HomeLayout from './components/HomeLayout';
import EmployeeDashboard from './components/EmployeeDashboardPage';
import PolicyPage from './components/PolicyPage'
import EmployeeHomePage from './components/EmployeeHomePage';
import Footer from './components/Footer';
import ResetPassword from './components/ResetPassword';


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
          <Route path="/home-layout" element={<HomeLayout />} />
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
          <Route path="/policy" element={<PolicyPage />} />
          <Route path="/emp-home" element={<EmployeeHomePage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
