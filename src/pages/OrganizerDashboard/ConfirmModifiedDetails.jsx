// src/pages/organizer/ConfirmModifiedDetails.jsx
import React, { useState } from 'react';
import axios from "axios";
import {
  ArrowLeft, Calendar, MapPin, Clock, Users, Building, Wine, Utensils,
  Sparkles, Monitor, Mic
} from 'lucide-react';
import "../../styles/pages/_confirmevent.scss";
import { useNavigate, useLocation } from 'react-router-dom';

export default function ConfirmModifiedDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);

  const modifiedData = location.state?.modifiedData;

  const eventData = modifiedData ? {
    eventId: modifiedData.id,
    eventTitle: modifiedData.eventTitle,
    eventType: modifiedData.typeOfFunction,
    purpose: modifiedData.purposeOfFunction,
    capacity: modifiedData.numberOfGuestsExpected,
    date: modifiedData.dateOfCommencement,
    venue: `${modifiedData.campus}, ${modifiedData.venue}`,
    time: `${modifiedData.timeOfCommencement} - ${modifiedData.timeToLockup}`,
    venueSelection: { buildings: [modifiedData.venue] },
    services: {
      liquor: modifiedData.useOfLiquor,
      kitchenFacilities: modifiedData.kitchenFacilities,
      cleaningServices: modifiedData.cleaningServices,
      extraSecurity: 'No',
    },
    resources: {
      chairs: modifiedData.plasticChairs,
      projectors: modifiedData.dataProjector === 'Yes' ? 1 : 0,
      microphones: modifiedData.microphone === 'Yes' ? 1 : 0,
      tables: modifiedData.steelTable + modifiedData.examTables,
    },
  } : null;

  const handleSubmit = async () => {
    if (!eventData) return alert("No event data found");

    setLoading(true);

    try {
      // ✅ 1. Send modified event to backend
      await axios.post(
        "https://your-backend-domain.com/api/events/modify", // ✅ change to your real API URL
        eventData
      );

      // ✅ 2. Store admin notification (local UI support)
      const adminNotifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
      const newNotification = {
        id: `admin-notif-${Date.now()}`,
        title: "Event Modification Pending Review",
        message: `Organizer modified "${eventData.eventTitle}". Please review.`,
        timestamp: new Date().toLocaleString(),
        read: false,
      };

      localStorage.setItem('adminNotifications', JSON.stringify([newNotification, ...adminNotifications]));
      window.dispatchEvent(new Event("adminNotificationsUpdated"));

      alert(`✅ "${eventData.eventTitle}" submitted for admin review.`);
      navigate("/my-events");
    } catch (error) {
      console.error("❌ Error submitting event:", error);
      alert("❌ Something went wrong submitting your event. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="confirm-event-page">
      <div className="confirm-event-container">
        <div className="confirm-event-header">
          <button className="back-button" type="button" aria-label="Go back" onClick={() => window.history.back()}>
            <ArrowLeft size={20} />
          </button>
          <h1 className="page-title">Details</h1>
        </div>

        <div className="confirm-event-card">
          <div className="event-header-image">
            <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80" alt="Event header" />
          </div>

          <div className="confirm-event-content">
            {/* Event info... stays same */}

            <div className="submit-button-container">
              <button className="btn-submit" type="button" onClick={handleSubmit} disabled={loading}>
                {loading ? "Submitting..." : "Submit Modification"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
