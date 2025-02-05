import React from 'react';
import "../commonStyle/Home.css";
import { BsCalendarEventFill } from "react-icons/bs";
import Header from './Header';

function AdminDashboard() {
  return (
    <>
    <Header/>

    {/* <div className="custom-container">
      <div className="homepage">
        <div className="row">
          <div className="col text-start">
            Revenue
            <p className="bold-text">$4805</p>
            <p className="green-text">$34 from the last week</p>
            <i className="icon-right"><BsCalendarEventFill /></i>
          </div>

          <div className="col text-start">
            Total Customers
            <p className="bold-text">250K</p>
            <p className="green-text">+15% from the last month</p>
            <i className="icon-right"><BsCalendarEventFill /></i>
          </div>

          <div className="col text-start">
            Store Visitors
            <p className="bold-text">1200K</p>
            <p className="green-text">+20% from last week</p>
            <i className="icon-right"><BsCalendarEventFill /></i>
          </div>

          <div className="col text-start">
            Bounce Rate
            <p className="bold-text">40%</p>
            <p className="green-text">-5% from last week</p>
            <i className="icon-right"><BsCalendarEventFill /></i>
          </div>
        </div>
      </div>
    </div> */}
    </>
  );
}

export default AdminDashboard;
