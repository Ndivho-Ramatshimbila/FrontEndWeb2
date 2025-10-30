// src/pages/OrganizerDashboard/ConfirmEventDetails.jsx
import React from "react";
import {
  ArrowLeft, Calendar, MapPin, Clock, Users, Building, Wine, Utensils,
  Sparkles, Monitor, Mic
} from "lucide-react";
import "../../styles/pages/_confirmevent.scss";
import { useNavigate } from "react-router-dom";

export default function ConfirmEventDetails() {
  const navigate = useNavigate();

  const eventData = {
    eventTitle: "New Student Orientation",
    eventType: "Social Event",
    purpose: "Purpose of event is to introduce the students to the Campus",
    capacity: 150,
    date: "Friday, October 27, 2024",
    venue: "TUT Emalahleni Campus, Innovation Hall",
    time: "09:00 AM - 14:00 PM",
    venueSelection: {
      buildings: ["Building 16", "Building 15"],
    },
    services: {
      liquor: "Yes",
      kitchenFacilities: "yes",
      cleaningServices: "yes",
      extraSecurity: "yes",
    },
    resources: {
      chairs: 150,
      projectors: 3,
      microphones: 3,
      tables: 12,
    },
    headerImage:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
  };

  const handleSubmit = () => {
  console.log("Event confirmed and submitted");

  // 🟢 Create a notification for the ADMIN (not the organizer)
  const adminNotifications = JSON.parse(localStorage.getItem("adminNotifications") || "[]");
  const newAdminNotification = {
    id: Date.now(),
    title: "New Event Submission",
    message: `An organizer has submitted a new event: "${eventData.eventTitle}" for approval.`,
    timestamp: new Date().toLocaleString(),
    read: false,
  };

  const updatedAdminNotifications = [newAdminNotification, ...adminNotifications];
  localStorage.setItem("adminNotifications", JSON.stringify(updatedAdminNotifications));

  // 🟢 Dispatch event to update admin sidebar in real time
  window.dispatchEvent(new Event("adminNotificationsUpdated"));

  // Continue normal navigation
  navigate("/my-events");
};


  return (
    <div className="confirm-event-page">
      <div className="confirm-event-container">
        {/* Header */}
        <div className="confirm-event-header">
          <button
            className="back-button"
            type="button"
            aria-label="Go back"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="page-title">Details</h1>
        </div>

        {/* Main Card */}
        <div className="confirm-event-card">
          <div className="event-header-image">
            <img src={eventData.headerImage} alt="Event header" />
          </div>

          <div className="confirm-event-content">
            <section className="confirm-section">
              <h2 className="section-title">Event Details</h2>
              <h3 className="section-subtitle">{eventData.eventTitle}</h3>
              <div className="detail-list">
                <div className="detail-item">
                  <Users size={18} className="detail-icon" />
                  <span>Type - {eventData.eventType}</span>
                </div>
                <div className="detail-item">
                  <Building size={18} className="detail-icon" />
                  <span>{eventData.purpose}</span>
                </div>
                <div className="detail-item">
                  <Users size={18} className="detail-icon" />
                  <span>Capacity - {eventData.capacity}</span>
                </div>
                <div className="detail-item">
                  <Calendar size={18} className="detail-icon" />
                  <span>{eventData.date}</span>
                </div>
                <div className="detail-item">
                  <MapPin size={18} className="detail-icon" />
                  <span>{eventData.venue}</span>
                </div>
                <div className="detail-item">
                  <Clock size={18} className="detail-icon" />
                  <span>{eventData.time}</span>
                </div>
              </div>
            </section>

            {/* Submit Button */}
            <div className="submit-button-container">
              <button className="btn-submit" type="button" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
