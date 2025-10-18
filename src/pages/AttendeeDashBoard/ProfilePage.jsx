import React, { useRef, useState, useEffect } from "react";

import ProfileCard from "../../components/ProfileCard";

const ProfilePage = () => {
        // Load from localStorage if available
            const [profileImg, setProfileImg] = useState(() => localStorage.getItem('profileImg') || "/profile.webp");
            const [userName, setUserName] = useState(() => localStorage.getItem('profileName') || "Attendee Adam");
            const [userEmail, setUserEmail] = useState(() => localStorage.getItem('profileEmail') || "adam.miller@gmail.com");
            const [loggedOut, setLoggedOut] = useState(false);
            const [deleted, setDeleted] = useState(false);
        const fileInputRef = useRef(null);

        useEffect(() => {
            localStorage.setItem('profileImg', profileImg);
        }, [profileImg]);
        useEffect(() => {
            localStorage.setItem('profileName', userName);
        }, [userName]);
        useEffect(() => {
            localStorage.setItem('profileEmail', userEmail);
        }, [userEmail]);

        const handleImageChange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    setProfileImg(event.target.result);
                };
                reader.readAsDataURL(file);
            }
        };

        const handleImgClick = () => {
            fileInputRef.current.click();
        };

                const handleProfileUpdate = (field, value) => {
                    if (field === 'name') setUserName(value);
                    if (field === 'email') setUserEmail(value);
                };

                const handleDeleteProfile = () => {
                    // Remove all profile data from localStorage and state
                    localStorage.removeItem('profileImg');
                    localStorage.removeItem('profileName');
                    localStorage.removeItem('profileEmail');
                    setProfileImg("");
                    setUserName("");
                    setUserEmail("");
                    setDeleted(true);
                };

        const handleLogout = () => {
            setLoggedOut(true);
        };

        return (
            <div className="profile-page">
                
                <main className="profile-content">
                            {deleted ? (
                                <div className="profile-card" style={{ textAlign: 'center', padding: '2rem' }}>
                                    <h2 style={{ color: '#e60023' }}>Profile Deleted</h2>
                                    <p>Your profile has been removed.</p>
                                </div>
                            ) : loggedOut ? (
                                <div className="profile-card" style={{ textAlign: 'center', padding: '2rem' }}>
                                    <h2 style={{ color: '#e60023' }}>You have logged out.</h2>
                                    <p>Thank you for using our service. See you next time!</p>
                                    <a href="/" style={{ color: '#007bff', textDecoration: 'underline' }}>Go to Home Page</a>
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
                                    onDeleteProfile={handleDeleteProfile}
                                />
                            )}
                </main>
            </div>
        );
};
export default ProfilePage;