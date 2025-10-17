// src/layouts/AdminLayout.jsx
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Home, Bell, User, MessageSquare, X } from 'lucide-react';
import "../styles/components/_adminlayout.scss"; // your SCSS path
import Footer from '../components/Footer'; // import Footer

const AdminLayout = () => {
  const navigate = useNavigate();

  // Profile modal state
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileName, setProfileName] = useState('Admin');
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/35');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileImage(url);
    }
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2>Admin Dashboard</h2>

        <button className="sidebar-btn" onClick={() => navigate('/admin')}>
          <Home size={18} /> Home
        </button>

        <button className="sidebar-btn" onClick={() => navigate('/admin/notifications')}>
          <Bell size={18} /> Notifications
        </button>

        <button className="sidebar-btn" onClick={() => navigate('/admin/profile')}>
          <User size={18} /> Profile
        </button>

        <button className="sidebar-btn" onClick={() => navigate('/admin/chat')}>
          <MessageSquare size={18} /> Chat
        </button>
      </aside>

      {/* Main Content */}
      <div className="admin-content">
        <Outlet /> {/* renders child route */}
        <Footer />  {/* Footer added here */}
      </div>

      {/* Profile Modal */}
      {profileOpen && (
        <div className="profile-modal">
          <div className="profile-modal-content">
            <button className="close-btn" onClick={() => setProfileOpen(false)}>
              <X size={20} />
            </button>
            <h3>Edit Profile</h3>
            <div className="profile-image-section">
              <img src={profileImage} alt="Profile" />
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
            <input
              type="text"
              value={profileName}
              onChange={e => setProfileName(e.target.value)}
              placeholder="Your name"
            />
            <button className="save-btn" onClick={() => setProfileOpen(false)}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
