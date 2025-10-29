import React, { useState } from "react";
import { LogOut, Edit3, Save } from "lucide-react";

const AttendeeProfileCard = ({
  name,
  email,
  profileImg,
  onImgClick,
  fileInputRef,
  onImageChange,
  onProfileUpdate,
  onLogout,
}) => {
  const [isEditingPhone, setIsEditingPhone] = useState(false);

  // Load from localStorage or default
  const [phone, setPhone] = useState(() => localStorage.getItem("attendeePhone") || "+27123456789");
  const [tempPhone, setTempPhone] = useState(phone);

  const handlePhoneChange = (e) => {
    let value = e.target.value;

    // Ensure it always starts with "+27"
    if (!value.startsWith("+27")) {
      value = "+27";
    }

    // Limit to 9 digits after +27
    const digits = value.slice(3).replace(/\D/g, ""); // remove non-digits
    const limitedDigits = digits.slice(0, 9); // max 9 digits
    setTempPhone("+27" + limitedDigits);
  };

  const handlePhoneEdit = () => {
    if (isEditingPhone) {
      if (tempPhone.length === 12) {
        setPhone(tempPhone);
        localStorage.setItem("attendeePhone", tempPhone);
      } else {
        alert("Phone number must start with +27 and contain exactly 9 digits after +27.");
        return; // Keep editing mode
      }
    }
    setIsEditingPhone(!isEditingPhone);
  };

  return (
    <div
      className="profile-card"
      style={{
        maxWidth: "400px",
        margin: "2rem auto",
        padding: "1.5rem",
        borderRadius: "10px",
        textAlign: "center",
        background: "#fff",
      }}
    >
      {/* Profile Image */}
      <img
        src={profileImg}
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

      {/* Attendee Info */}
      <div style={{ marginTop: "1rem" }}>
        <h3 style={{ margin: "0.5rem 0", color: "#001d3d" }}>{name}</h3>
        <p style={{ margin: 0, color: "#555", fontSize: "0.95rem" }}>{email}</p>
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
          <button
            onClick={handlePhoneEdit}
            style={{
              background: "#03045e",
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: "0.3rem 0.6rem",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            {isEditingPhone ? <Save size={14} /> : <Edit3 size={14} />}
          </button>
        </div>
      </div>

      {/* Logout Button */}
      <div style={{ marginTop: "1.8rem" }}>
        <button
          onClick={onLogout}
          style={{
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
          }}
        >
          <LogOut size={16} />
          <span style={{ marginLeft: "0.5rem" }}>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AttendeeProfileCard;
