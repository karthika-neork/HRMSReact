import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage';
import ForgotPassword from './components/ForgotPassword';
import Header from './components/Header';
import Role from './crudPages/Role';
import HomePage from './components/HomePage';
import SubHeader from './components/SubHeader';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/header" element={<Header />} />
        <Route path="/sub" element={<SubHeader />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/role" element={<Role />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
