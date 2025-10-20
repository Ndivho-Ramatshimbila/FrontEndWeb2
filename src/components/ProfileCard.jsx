

import React, { useState } from "react";
import { LogOut } from "lucide-react";

const ProfileCard = ({ name, email, profileImg, onImgClick, fileInputRef, onImageChange, onProfileUpdate, onLogout, onDeleteProfile }) => {
  const [editingField, setEditingField] = useState(null);
  const [userName, setUserName] = useState(name);
  const [userEmail, setUserEmail] = useState(email);
  const [deleted, setDeleted] = useState(false);

  const handleEdit = (field) => {
    setEditingField(field);
  };

  const handleSave = (field) => {
    setEditingField(null);
    if (field === 'name') onProfileUpdate('name', userName);
    if (field === 'email') onProfileUpdate('email', userEmail);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      onDeleteProfile();
    }
  };

  if (deleted) {
    return (
      <div className="profile-card" style={{ textAlign: 'center', padding: '2rem' }}>
        <h2 style={{ color: '#e60023' }}>Profile Deleted</h2>
        <p>Your profile has been removed.</p>
      </div>
    );
  }

  return (
    <div className="profile-card">
      <img
        src={profileImg}
        alt="profile"
        style={{
          marginLeft: "0.5rem",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          objectFit: "cover",
          cursor: "pointer",
        }}
        onClick={onImgClick}
        title="Click to change profile picture"
      />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={onImageChange}
      />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
        {editingField === 'name' ? (
          <React.Fragment>
            <input
              type="text"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              style={{ fontSize: '1.1rem', padding: '0.2rem 0.5rem', borderRadius: 4, border: '1px solid #ccc' }}
            />

          </React.Fragment>
        ) : (
          <React.Fragment>
            <h3 className="profile-name" style={{ margin: 0 }}>{userName}</h3>


          </React.Fragment>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {editingField === 'email' ? (
          <React.Fragment>
            <input
              type="email"
              value={userEmail}
              onChange={e => setUserEmail(e.target.value)}
              style={{ fontSize: '0.93rem', padding: '0.2rem 0.5rem', borderRadius: 4, border: '1px solid #ccc' }}
            />
         
          </React.Fragment>
        ) : (
          <React.Fragment>
            <p className="profile-email" style={{ margin: 0 }}>{userEmail}</p>
            
          </React.Fragment>
        )}
      </div>
      
      <button
        className="logout-btn"
        style={{ marginTop: '1.2rem' }}
        onClick={onLogout}
      >
        <LogOut size={16} />
        <span style={{ marginLeft: "0.5rem" }}>Logout</span>
      </button>
    </div>
  );
};
export default ProfileCard;