import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/components/_sidebar.scss';

const Sidebar = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    "Event 'Annual Tech Summit' approved!",
    "Reminder: 'Marketing Strategy Workshop' in 3 days",
    "You have a new message in your inbox",
  ];

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-menu">

        <NavLink to="/dashboard" className="sidebar-item">
          <i className="fas fa-home"></i>
          <span>Home</span>
        </NavLink>

        <NavLink to="/my-events" className="sidebar-item">
          <i className="fas fa-calendar-alt"></i>
          <span>My Events</span>
        </NavLink>

        <NavLink to="/inbox" className="sidebar-item">
          <i className="fas fa-inbox"></i>
          <span>Inbox</span>
        </NavLink>

        <NavLink to="/profile" className="sidebar-item">
          <i className="fas fa-user"></i>
          <span>Profile</span>
        </NavLink>

        <NavLink to="/discover" className="sidebar-item">
          <i className="fas fa-compass"></i>
          <span>Discover</span>
        </NavLink>

        <NavLink to="/rate-your-event" className="sidebar-item">
        <i className="fas fa-star"></i>
        <span>Rate Your Events</span>
        </NavLink>

        {/* Notification Icon */}
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

export default Sidebar;
