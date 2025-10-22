import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack, IoTicketOutline, IoCheckmark, IoLockClosedOutline, IoInformationCircleOutline } from "react-icons/io5";
import "../../styles/pages/_eventregistration.scss";

export default function EventRegistration() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [subscribeUpdates, setSubscribeUpdates] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) return alert("Please enter your full name");
    if (!formData.email.trim()) return alert("Please enter your email address");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email))
      return alert("Please enter a valid email address");

    if (!formData.phoneNumber.trim())
      return alert("Please enter your phone number");

    if (!acceptedTerms)
      return alert("Please accept the terms and conditions to continue");

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert(
        `Thank you ${formData.fullName}! You have successfully registered.${
          subscribeUpdates ? " You’ll receive event updates." : ""
        }`
      );
      navigate('/attendee/my-events');
    } catch {
      alert("Error registering. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="event-registration-container">
      {/* Header */}
      <div className="event-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <IoArrowBack size={20} />
        </button>
        <div className="header-info">
          <h1>Event Registration</h1>
          <p>Fill out the form to secure your spot</p>
        </div>
      </div>

      {/* Form Section */}
      <div className="event-content">
        <div className="event-card">
          <div className="event-heading">
            <IoTicketOutline size={36} color="#0077B6" />
            <h2>Reserve Your Spot</h2>
            <p>
              Complete the registration form below to reserve your place at the event.
            </p>
          </div>

          {/* Form Fields */}
          <div className="form-section">
            <label>Full Name *</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              placeholder="Enter your full name"
            />

            <label>Email Address *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter your email"
            />

            <label>Phone Number *</label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>

          {/* Checkboxes */}
          <div className="checkbox-section">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={() => setAcceptedTerms(!acceptedTerms)}
              />
              <span>
                I agree to the <a href="#">Terms</a> and{" "}
                <a href="#">Privacy Policy</a> *
              </span>
            </label>

            <label className="checkbox">
              <input
                type="checkbox"
                checked={subscribeUpdates}
                onChange={() => setSubscribeUpdates(!subscribeUpdates)}
              />
              <span>Subscribe to event updates and notifications</span>
            </label>
          </div>

          {/* Info Box */}
          <div className="info-box">
            <IoInformationCircleOutline size={20} color="#1976d2" />
            <p>
              You’ll receive a confirmation email with event details. Bring your student ID to check in.
            </p>
          </div>

          {/* Submit Button */}
          <button
            className="register-btn"
            onClick={handleRegister}
            disabled={!acceptedTerms || loading}
          >
            {loading ? "Processing..." : "Register Now"}
            <IoLockClosedOutline size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
