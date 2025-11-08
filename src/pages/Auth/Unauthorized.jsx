import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/abstracts-auth/_unauthorized.scss"; 

export default function Unauthorized() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role")?.toUpperCase();

  const getRedirectPath = () => {
    if (role === "ADMIN") return "/admin";
    if (role === "ORGANIZER") return "/dashboard";
    if (role === "ATTENDEE") return "/attendee";
    return "/";
  };

  return (
    <div className="unauthorized-page">
      <div className="unauthorized-card">
        <h1 className="unauthorized-title">403</h1>
        <h2 className="unauthorized-subtitle">Unauthorized</h2>
        <p className="unauthorized-message">
          You don’t have permission to access this page.
        </p>
        <button
          className="unauthorized-button"
          onClick={() => navigate(getRedirectPath())}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
