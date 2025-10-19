import React, { useRef, useState, useEffect } from "react";
import ProfileCard from "../../components/ProfileCard";

const OrganizerProfilePage = () => {
  const fileInputRef = useRef(null);

  const [profileImg, setProfileImg] = useState(
    () => localStorage.getItem("organizerProfileImg") || "/profile.webp"
  );
  const [userName, setUserName] = useState(
    () => localStorage.getItem("organizerName") || "Organizer Miller"
  );
  const [userEmail, setUserEmail] = useState(
    () => localStorage.getItem("organizerEmail") || "alex.miller@gmail.com"
  );
  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => { localStorage.setItem("organizerProfileImg", profileImg); }, [profileImg]);
  useEffect(() => { localStorage.setItem("organizerName", userName); }, [userName]);
  useEffect(() => { localStorage.setItem("organizerEmail", userEmail); }, [userEmail]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setProfileImg(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleImgClick = () => fileInputRef.current.click();

  const handleProfileUpdate = (field, value) => {
    if (field === "name") setUserName(value);
    if (field === "email") setUserEmail(value);
  };

  const handleLogout = () => setLoggedOut(true);

  return (
    <div className="profile-page">
      <main className="profile-content">
        {loggedOut ? (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <h2 style={{ color: "#e60023" }}>You have logged out.</h2>
            <p>Thank you for using our service. See you next time!</p>
            <a href="/" style={{ color: "#007bff", textDecoration: "underline" }}>
              Go to Home Page
            </a>
          </div>
        ) : (
          <ProfileCard
            name={userName}
            email={userEmail}
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

export default OrganizerProfilePage;
