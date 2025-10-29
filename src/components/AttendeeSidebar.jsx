import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/components/_attendeesidebar.scss';

const AttendeeSidebar = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    "Your QR Code is ready for 'Music Fest 2025'.",
    "Event 'Tech Conference 2025' starts tomorrow!",
    "You rated 'Digital Expo' successfully.",
  ];

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-menu">
        <NavLink to="/attendee" className="sidebar-item">
          <i className="fas fa-home"></i>
          <span>Home</span>
        </NavLink>

        <NavLink to="/attendee/events-profile" className="sidebar-item">
          <i className="fas fa-calendar-alt"></i>
          <span>Profile</span>
        </NavLink>

        <NavLink to="/attendee/my-events" className="sidebar-item">
          <i className="fas fa-ticket-alt"></i>
          <span>My Events</span>
        </NavLink>

        {/* Notifications at Bottom */}
        <div className="sidebar-item notification-icon" onClick={toggleNotifications}>
          <i className="fas fa-bell"></i>
          <span>Notifications</span>
          {showNotifications && (
            <div className="notification-popup">
              {notifications.length > 0 ? (
                <ul>
                  {notifications.map((note, index) => (
                    <li key={index}>{note}</li>
                  ))}
                </ul>
              ) : (
                <p className="empty">No new notifications</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendeeSidebar;