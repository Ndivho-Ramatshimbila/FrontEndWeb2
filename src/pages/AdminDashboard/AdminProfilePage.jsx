import React, { useRef, useState, useEffect } from "react";
import AdminProfileCard from "../../components/AdminProfileCard";



const AdminProfilePage = () => {
  const [profileImg, setProfileImg] = useState(() => localStorage.getItem('adminImg') || "/admin.webp");
  const [userName, setUserName] = useState(() => localStorage.getItem('adminName') || "Admin Johnson");
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem('adminEmail') || "admin.johnson@system.com");
  const [userRole, setUserRole] = useState(() => localStorage.getItem('adminRole') || "System Administrator");
  const [loggedOut, setLoggedOut] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('adminImg', profileImg);
    localStorage.setItem('adminName', userName);
    localStorage.setItem('adminEmail', userEmail);
    localStorage.setItem('adminRole', userRole);
  }, [profileImg, userName, userEmail, userRole]);

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
    if (field === 'name') setUserName(value);
    if (field === 'email') setUserEmail(value);
    if (field === 'role') setUserRole(value);
  };

  const handleDeleteProfile = () => {
    if (window.confirm("Are you sure you want to delete the admin profile?")) {
      localStorage.removeItem('adminImg');
      localStorage.removeItem('adminName');
      localStorage.removeItem('adminEmail');
      localStorage.removeItem('adminRole');
      setProfileImg("");
      setUserName("");
      setUserEmail("");
      setUserRole("");
      setDeleted(true);
    }
  };

  const handleLogout = () => setLoggedOut(true);

  return (
    <div className="profile-page">
   
      <main className="profile-content" style={{ paddingTop: '5rem' }}>
        {deleted ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h2 style={{ color: '#b22222' }}>Admin Profile Deleted</h2>
            <p>This admin account has been removed from the system.</p>
          </div>
        ) : loggedOut ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h2 style={{ color: '#b22222' }}>Admin Logged Out</h2>
            <p>Goodbye! You have been safely logged out.</p>
            <a href="/" style={{ color: '#007bff', textDecoration: 'underline' }}>Go to Home Page</a>
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
            onDeleteProfile={handleDeleteProfile}
          />
        )}
      </main>
    </div>
  );
};

export default AdminProfilePage;
