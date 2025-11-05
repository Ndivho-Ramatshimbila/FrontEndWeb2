import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/components/_sidebar.scss';

const Sidebar = () => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const popupRef = useRef(null);

  // 📦 Load notifications from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('notifications') || '[]');
    setNotifications(stored);
  }, []);

  // 🔄 Listen for localStorage or custom updates
  useEffect(() => {
    const updateNotifications = () => {
      const updated = JSON.parse(localStorage.getItem('notifications') || '[]');
      setNotifications(updated);
    };

    window.addEventListener('storage', updateNotifications);
    window.addEventListener('notificationsUpdated', updateNotifications);

    return () => {
      window.removeEventListener('storage', updateNotifications);
      window.removeEventListener('notificationsUpdated', updateNotifications);
    };
  }, []);

  // 🛎️ Toggle notifications popup
  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  // ✅ Mark notifications as read when opened
  useEffect(() => {
    if (showNotifications && notifications.length > 0) {
      const updated = notifications.map((n) => ({ ...n, read: true }));
      setNotifications(updated);
      localStorage.setItem('notifications', JSON.stringify(updated));
    }
  }, [showNotifications]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // ❌ Dismiss a notification (with confirmation)
  const handleDismiss = (id) => {
    const noteToDelete = notifications.find((n) => n.id === id);
    if (!noteToDelete) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to remove this notification?\n\n"${noteToDelete.title}"`
    );

    if (!confirmDelete) return;

    const updated = notifications.filter((n) => n.id !== id);
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
  };

  return (
    <div className="sidebar">
      <div className="sidebar-menu">
        {/* Navigation Links */}
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
          <span>Rate Experience</span>
        </NavLink>

        {/* 🔔 Notifications */}
        <div
          className="sidebar-item notification-icon"
          onClick={toggleNotifications}
          ref={popupRef}
        >
          <i className="fas fa-bell"></i>
          <span>Notifications</span>
          {unreadCount > 0 && <span className="badge">{unreadCount}</span>}

          {showNotifications && (
            <div className="notification-popup">
              {notifications.length > 0 ? (
                <ul>
                  {notifications.map((note) => (
                    <li
                      key={note.id}
                      className={note.read ? 'read' : 'unread'}
                    >
                      <div className="note-content">
                        <strong>{note.title}</strong>
                        <p>{note.message}</p>
                        <small>
                          {note.timestamp || note.time || 'Just now'}
                        </small>
                      </div>

                      <button
                        className="dismiss-btn"
                        title="Remove notification"
                        onClick={(e) => {
                          e.stopPropagation(); // prevent popup toggle
                          handleDismiss(note.id);
                        }}
                      >
                        ×
                      </button>
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

export default Sidebar;
