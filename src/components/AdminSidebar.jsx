import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/components/_adminsidebar.scss';

const AdminSidebar = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    "New user registration pending approval",
    "Event 'Tech Conference 2025' requires review",
    "System backup completed successfully",
    "Revenue report for October is ready",
  ];

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="admin-sidebar-fixed">
      <div className="sidebar-menu">

        <NavLink to="/admin" end className="sidebar-item">
          <i className="fas fa-home"></i>
          <span>Home</span>
        </NavLink>

        <NavLink to="/admin/profile" className="sidebar-item">
          <i className="fas fa-user"></i>
          <span>Profile</span>
        </NavLink>

        <NavLink to="/admin/chat" className="sidebar-item">
          <i className="fas fa-comments"></i>
          <span>Chat</span>
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

export default AdminSidebar;