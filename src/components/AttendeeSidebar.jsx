import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/components/_attendeesidebar.scss';

const AttendeeSidebar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // 🔹 Load notifications from localStorage
  useEffect(() => {
    const storedNotifications = JSON.parse(localStorage.getItem('attendeeNotifications') || '[]');
    setNotifications(storedNotifications);

    // 🔹 Listen for updates (live)
    const handleNotificationsUpdated = () => {
      const updatedNotifications = JSON.parse(localStorage.getItem('attendeeNotifications') || '[]');
      setNotifications(updatedNotifications);
    };

    window.addEventListener('attendeeNotificationsUpdated', handleNotificationsUpdated);
    return () => window.removeEventListener('attendeeNotificationsUpdated', handleNotificationsUpdated);
  }, []);

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

        {/* Notifications */}
        <div className="sidebar-item notification-icon" onClick={toggleNotifications}>
          <i className="fas fa-bell"></i>
          <span>Notifications</span>
          {notifications.length > 0 && <span className="badge">{notifications.filter(n => !n.read).length}</span>}
          
          {showNotifications && (
            <div className="notification-popup">
              {notifications.length > 0 ? (
                <ul>
                  {notifications.map((note) => (
                    <li key={note.id} className={note.read ? 'read' : 'unread'}>
                      <strong>{note.title}</strong>
                      <p>{note.message}</p>
                      <small>{note.timestamp}</small>
                    </li>
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
