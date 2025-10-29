import React, { useRef, useState, useEffect } from "react";
import AdminProfileCard from "../../components/AdminProfileCard";

const AdminProfilePage = () => {
  const [profileImg, setProfileImg] = useState(() => localStorage.getItem("adminImg") || "/profile.webp");
  const [userName, setUserName] = useState(() => localStorage.getItem("adminName") || "Admin Johnson");
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem("adminEmail") || "admin.johnson@system.com");
  const [userRole, setUserRole] = useState(() => localStorage.getItem("adminRole") || "System Administrator");
  const [loggedOut, setLoggedOut] = useState(false);

  const fileInputRef = useRef(null);

  // ✅ Save updates to localStorage when data changes
  useEffect(() => {
    if (profileImg && profileImg !== "/profile.webp") {
      localStorage.setItem("adminImg", profileImg);
    }
    localStorage.setItem("adminName", userName);
    localStorage.setItem("adminEmail", userEmail);
    localStorage.setItem("adminRole", userRole);
  }, [profileImg, userName, userEmail, userRole]);

  // ✅ Upload handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImg(event.target.result);
        localStorage.setItem("adminImg", event.target.result); // Save instantly
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImgClick = () => fileInputRef.current.click();

  const handleProfileUpdate = (field, value) => {
    if (field === "name") setUserName(value);
    if (field === "email") setUserEmail(value);
    if (field === "role") setUserRole(value);
  };

  const handleLogout = () => setLoggedOut(true);

  return (
    <div className="profile-page">
      <main className="profile-content" style={{ paddingTop: "5rem" }}>
        {loggedOut ? (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <h2 style={{ color: "#b22222" }}>Admin Logged Out</h2>
            <p>Goodbye! You have been safely logged out.</p>
            <a href="/" style={{ color: "#007bff", textDecoration: "underline" }}>
              Go to Home Page
            </a>
          </div>
        ) : (
          <AdminProfileCard
            name={userName}
            email={userEmail}
            role={userRole}
            profileImg={profileImg}
            onImgClick={handleImgClick}
            fileInputRef={fileInputRef}
            onImageChange={handleImageChange}
            onProfileUpdate={handleProfileUpdate}
            onLogout={handleLogout}
          />
        )}
      </main>
    </div>
  );
};

export default AdminProfilePage;
