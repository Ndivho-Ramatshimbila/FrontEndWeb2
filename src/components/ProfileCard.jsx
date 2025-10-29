import React, { useState } from "react";
import { LogOut, Edit3, Save } from "lucide-react";

const ProfileCard = ({
  name,
  email,
  profileImg,
  onImgClick,
  fileInputRef,
  onImageChange,
  onProfileUpdate,
  onLogout,
}) => {
  const [editingField, setEditingField] = useState(null);
  const [userName, setUserName] = useState(name);
  const [userEmail, setUserEmail] = useState(email);
  const [isEditingPhone, setIsEditingPhone] = useState(false);

  // Load phone from localStorage or default +27 number
  const [phone, setPhone] = useState(() => localStorage.getItem("organizerPhone") || "+27123456789");
  const [tempPhone, setTempPhone] = useState(phone);

  const handleSave = (field) => {
    setEditingField(null);
    if (field === "name") onProfileUpdate("name", userName);
    if (field === "email") onProfileUpdate("email", userEmail);
  };

  // --- Strict +27 + 9 digits handling ---
  const handlePhoneChange = (e) => {
    let value = e.target.value;

    // Ensure it always starts with "+27"
    if (!value.startsWith("+27")) value = "+27";

    // Allow only 9 digits after +27
    const digits = value.slice(3).replace(/\D/g, "");
    const limitedDigits = digits.slice(0, 9);
    setTempPhone("+27" + limitedDigits);
  };

  const handlePhoneEdit = () => {
    if (isEditingPhone) {
      if (tempPhone.length === 12) {
        setPhone(tempPhone);
        localStorage.setItem("organizerPhone", tempPhone);
      } else {
        alert("Phone number must start with +27 and contain exactly 9 digits after +27.");
        return; // stay in editing mode
      }
    }
    setIsEditingPhone(!isEditingPhone);
  };

  return (
    <div className="profile-card" style={{ textAlign: "center" }}>
      {/* Profile Image */}
      <img
        src={profileImg && profileImg.trim() !== "" ? profileImg : "/profile.webp"}
        alt="profile"
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

      {/* Name */}
      <div style={{ marginTop: "1rem" }}>
        {editingField === "name" ? (
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            onBlur={() => handleSave("name")}
            style={{
              fontSize: "1.1rem",
              padding: "0.2rem 0.5rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
              textAlign: "center",
            }}
          />
        ) : (
          <h3
            onClick={() => setEditingField("name")}
            style={{
              margin: "0.5rem 0",
              color: "#001d3d",
              cursor: "pointer",
            }}
          >
            {userName}
          </h3>
        )}
      </div>

      {/* Email */}
      <div>
        {editingField === "email" ? (
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            onBlur={() => handleSave("email")}
            style={{
              fontSize: "0.95rem",
              padding: "0.2rem 0.5rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
              textAlign: "center",
            }}
          />
        ) : (
          <p
            onClick={() => setEditingField("email")}
            style={{
              margin: "0",
              color: "#555",
              fontSize: "0.95rem",
              cursor: "pointer",
            }}
          >
            {userEmail}
          </p>
        )}
      </div>

      {/* Phone Number */}
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
            value={isEditingPhone ? tempPhone : phone}
            onChange={handlePhoneChange}
            disabled={!isEditingPhone}
            style={{
              width: "140px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              padding: "0.3rem",
              fontSize: "0.9rem",
              textAlign: "center",
              backgroundColor: isEditingPhone ? "#fff" : "#f8f9fa",
              color: "#333",
            }}
          />
          <button onClick={handlePhoneEdit} style={btnStyleSmall}>
            {isEditingPhone ? <Save size={14} /> : <Edit3 size={14} />}
          </button>
        </div>
      </div>

      {/* Logout Button */}
      <div style={{ marginTop: "1.5rem" }}>
        <button onClick={onLogout} style={btnStyle}>
          <LogOut size={16} />
          <span style={{ marginLeft: "0.5rem" }}>Logout</span>
        </button>
      </div>
    </div>
  );
};

const btnStyle = {
  background: "#03045e",
  color: "white",
  border: "none",
  borderRadius: "6px",
  padding: "0.6rem 1.2rem",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  fontSize: "0.9rem",
  fontWeight: 500,
};

const btnStyleSmall = {
  ...btnStyle,
  padding: "0.3rem 0.6rem",
};

export default ProfileCard;
