import React from "react";
import { LogOut } from "lucide-react";

const AdminProfileCard = ({
  name,
  email,
  profileImg,
  onImgClick,
  fileInputRef,
  onImageChange,
  onLogout,
}) => {
  return (
    <div
      className="profile-card"
     
    >
      {/* Profile Image */}
      <img
       src={profileImg} alt="profile"
        style={{
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          objectFit: "cover",
          cursor: "pointer",
          border: "3px solid #001d3d",
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

      {/* Admin Info */}
      <div style={{ marginTop: "1rem" }}>
        <h3 style={{ margin: "0.5rem 0", color: "#001d3d" }}>{name}</h3>
        <p style={{ margin: 0, color: "#555", fontSize: "0.95rem" }}>{email}</p>
      </div>

      {/* Logout Button */}
      <div style={{ marginTop: "1.8rem" }}>
        <button onClick={onLogout} style={logoutBtnStyle}>
          <LogOut size={16} />
          <span style={{ marginLeft: "0.5rem" }}>Logout</span>
        </button>
      </div>
    </div>
  );
};

const logoutBtnStyle = {
  background: "#03045e",
  color: "white",
  border: "none",
  borderRadius: "6px",
  padding: "0.6rem 1.4rem",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  fontSize: "0.9rem",
  fontWeight: 500,
};

export default AdminProfileCard;
