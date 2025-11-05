import React, { useState } from "react";
import { LogOut, Edit3, Save } from "lucide-react";

const AdminProfileCard = ({
  name,
  email,
  profileImg,
  onImgClick,
  fileInputRef,
  onImageChange,
  onLogout,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  // Load from localStorage or default
  const [phone, setPhone] = useState(() => localStorage.getItem("adminPhone") || "+27123456789");
  const [tempPhone, setTempPhone] = useState(phone);

  // --- Strict +27 + 9 digits handling ---
  const handlePhoneChange = (e) => {
    let value = e.target.value;

    // Ensure it always starts with +27
    if (!value.startsWith("+27")) value = "+27";

    // Allow only 9 digits after +27
    const digits = value.slice(3).replace(/\D/g, "");
    const limitedDigits = digits.slice(0, 9);
    setTempPhone("+27" + limitedDigits);
  };

  const handleEditClick = () => {
    if (isEditing) {
      if (tempPhone.length === 12) {
        setPhone(tempPhone);
        localStorage.setItem("adminPhone", tempPhone);
      } else {
        alert("Phone number must start with +27 and contain exactly 9 digits after +27.");
        return; // stay in editing mode
      }
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="profile-card" style={{ textAlign: "center" }}>
      {/* Profile Image */}
      <img
        src={profileImg && profileImg.trim() !== "" ? profileImg : "/profile.webp"}
        alt="profile"
        onError={(e) => (e.target.src = "/profile.webp")}
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

      {/* Phone Section */}
      <div style={{ marginTop: "1rem" }}>
        <label
          style={{
            fontWeight: "bold",
            color: "#001d3d",
            marginRight: "0.5rem",
          }}
        >
          Phone:
        </label>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
          <input
            type="text"
            value={isEditing ? tempPhone : phone}
            onChange={handlePhoneChange}
            disabled={!isEditing}
            style={{
              width: "140px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              padding: "0.3rem",
              fontSize: "0.9rem",
              textAlign: "center",
              backgroundColor: isEditing ? "#fff" : "#f8f9fa",
              color: "#333",
            }}
          />
          <button onClick={handleEditClick} style={editBtnStyle}>
            {isEditing ? <Save size={14} /> : <Edit3 size={14} />}
          </button>
        </div>
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

// --- Button Styles ---
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

const editBtnStyle = {
  ...logoutBtnStyle,
  padding: "0.3rem 0.6rem",
};

export default AdminProfileCard;
