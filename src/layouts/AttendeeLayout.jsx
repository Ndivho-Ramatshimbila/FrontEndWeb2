import React from 'react';
import { Outlet } from 'react-router-dom';
import AttendeeSidebar from '../components/AttendeeSidebar';
import Footer from '../components/Footer';
import "../styles/components/_attendeelayout.scss";

const AttendeeLayout = () => {
  return (
    <div className="attendee-layout-container">
      {/* Fixed Sidebar */}
      <AttendeeSidebar />

      {/* Main Content Area with Footer */}
      <div className="attendee-main-wrapper">
        <div className="attendee-content-area">
          <Outlet />
        </div>

       
      </div>
       {/* Footer stays at bottom */}
        <Footer />
    </div>
  );
};

export default AttendeeLayout;
