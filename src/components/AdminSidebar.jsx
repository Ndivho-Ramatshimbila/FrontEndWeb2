// src/components/AdminSidebar.jsx
import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import "../styles/components/_adminsidebar.scss";

const AdminSidebar = () => {
  const [adminNotifications, setAdminNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const popupRef = useRef(null);

  // 🟢 Load notifications for admin from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("adminNotifications") || "[]");
    setAdminNotifications(stored);
  }, []);

  // 🟢 Listen for updates triggered by organizers
  useEffect(() => {
    const updateAdminNotifications = () => {
      const updated = JSON.parse(localStorage.getItem("adminNotifications") || "[]");
      setAdminNotifications(updated);
    };

    // Listen for organizer-triggered updates
    window.addEventListener("storage", updateAdminNotifications);
    window.addEventListener("adminNotificationsUpdated", updateAdminNotifications);

    return () => {
      window.removeEventListener("storage", updateAdminNotifications);
      window.removeEventListener("adminNotificationsUpdated", updateAdminNotifications);
    };
  }, []);

  // 🟢 Toggle notification popup
  const toggleNotifications = () => setShowNotifications((prev) => !prev);

  // 🟢 Mark all as read when opened
  useEffect(() => {
    if (showNotifications && adminNotifications.length > 0) {
      const updated = adminNotifications.map((n) => ({ ...n, read: true }));
      setAdminNotifications(updated);
      localStorage.setItem("adminNotifications", JSON.stringify(updated));
    }
  }, [showNotifications]);

  // 🟢 Dismiss with confirmation
  const handleDismiss = (id) => {
    const confirmed = window.confirm("Are you sure you want to dismiss this notification?");
    if (!confirmed) return;
    const updated = adminNotifications.filter((n) => n.id !== id);
    setAdminNotifications(updated);
    localStorage.setItem("adminNotifications", JSON.stringify(updated));
  };

  const unreadCount = adminNotifications.filter((n) => !n.read).length;

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

        <NavLink to="/admin/user-management" className="sidebar-item">
          <i className="fas fa-comments"></i>
          <span>User Management</span>
        </NavLink>

        {/* 🔔 Admin Notifications */}
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
              {adminNotifications.length > 0 ? (
                <ul>
                  {adminNotifications.map((note) => (
                    <li key={note.id} className={note.read ? "read" : "unread"}>
                      <div>
                        <strong>{note.title}</strong>
                        <p>{note.message}</p>
                        <small>{note.timestamp}</small>
                      </div>
                      <button
                        className="dismiss-btn"
                        onClick={() => handleDismiss(note.id)}
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

export default AdminSidebar;
