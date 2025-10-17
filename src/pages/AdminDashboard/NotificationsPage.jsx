import React, { useState } from 'react';
import { X } from 'lucide-react';

const NotificationsPage = () => {
  // Sample notifications
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New event created: Annual Sports Day', read: false },
    { id: 2, message: 'User John Doe registered', read: true },
    { id: 3, message: 'Event booking exceeded capacity', read: false },
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="notifications-page" style={{ padding: '1rem' }}>
      <h2>Notifications</h2>
      {notifications.length === 0 && <p>No notifications</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {notifications.map(n => (
          <li 
            key={n.id} 
            style={{ 
              background: n.read ? '#f0f0f0' : '#e0f7fa', 
              padding: '0.75rem 1rem', 
              borderRadius: '5px', 
              marginBottom: '0.5rem', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }}
          >
            <span>{n.message}</span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {!n.read && <button onClick={() => markAsRead(n.id)} style={{ cursor: 'pointer' }}>Mark read</button>}
              <button onClick={() => deleteNotification(n.id)} style={{ cursor: 'pointer', color: 'red' }}>
                <X size={16} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsPage;
