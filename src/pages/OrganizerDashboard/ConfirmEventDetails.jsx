import React, { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Clock, Users, Building, Wine, Utensils, Sparkles, Monitor, Wifi, Mic, Video, Laptop } from 'lucide-react';
import "../../styles/pages/_confirmevent.scss";
import { useNavigate, useLocation } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function ConfirmEventDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData, selectedVenue, termsAccepted } = location.state || {};

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const toastTimerRef = React.useRef(null);

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);

    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  // Build dynamic eventData from formData
  const eventData = {
    eventTitle: formData?.eventTitle || 'Event Title',
    eventType: formData?.typeOfFunction || 'Event Type',
    purpose: formData?.purposeOfFunction || 'Purpose of event',
    capacity: formData?.numberOfGuestsExpected || 0,
    date: formData?.dateOfCommencement ? `${formData.dateOfCommencement.toDateString()} - ${formData.endingDate?.toDateString() || 'TBD'}` : 'Date TBD',
    venue: `${formData?.campus || 'Campus'} ${formData?.venueType || 'Venue Type'}, ${formData?.venue || 'Venue'}`,
    time: `${formData?.timeOfCommencement || 'TBD'} - ${formData?.timeToLockup || 'TBD'}`,
    venueSelection: {
      buildings: selectedVenue ? [selectedVenue.name] : ['Venue not selected']
    },
    services: {
      liquor: formData?.useOfLiquor || 'No',
      kitchenFacilities: formData?.kitchenFacilities || 'No',
      cleaningServices: formData?.cleaningServices || 'No',
      extraSecurity: 'No' // Assuming not in formData
    },
    resources: {
      chairs: formData?.plasticChairs || 0,
      projectors: formData?.dataProjector === 'Yes' ? 1 : 0,
      microphones: formData?.microphone === 'Yes' ? 1 : 0,
      tables: (formData?.steelTable || 0) + (formData?.examTables || 0)
    },
    headerImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80' // Default image
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
              <button
                className="btn-submit"
                type="button"
                onClick={async () => {
                try {
                  // Data to send to backend
                  const submissionData = {
                    eventTitle: formData.eventTitle,
                    eventType: formData.typeOfFunction,
                    purpose: formData.purposeOfFunction,
                    capacity: formData.numberOfGuestsExpected,
                    dateStart: formData.dateOfCommencement,
                    dateEnd: formData.endingDate,
                    timeStart: formData.timeOfCommencement,
                    timeEnd: formData.timeToLockup,
                    campus: formData.campus,
                    venueType: formData.venueType,
                    venue: selectedVenue?.name,
                    services: {
                      liquor: formData.useOfLiquor,
                      kitchenFacilities: formData.kitchenFacilities,
                      cleaningServices: formData.cleaningServices,
                    },
                    resources: {
                      chairs: formData.plasticChairs,
                      microphones: formData.microphone === "Yes" ? 1 : 0,
                      projectors: formData.dataProjector === "Yes" ? 1 : 0,
                      tables: (formData.steelTable || 0) + (formData.examTables || 0),
                    },
                    termsAccepted,
                    submittedAt: new Date().toISOString(),
                  };

                  // ✅ Make API Request to backend
                  const response = await fetch(`${API_BASE_URL}/api/events`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      // ✅ If your backend uses auth token, include it:
                      // "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify(submissionData),
                  });

                  if (!response.ok) {
                    throw new Error("Failed to submit event to server");
                  }

                  // Optional: Get server response
                  const result = await response.json();
                  console.log("✅ Event saved to DB:", result);

                  showToastMessage("Event booking request submitted successfully!");

                  setTimeout(() => {
                    navigate("/my-events");
                  }, 2000);

                } catch (error) {
                  console.error("❌ Error submitting event:", error);
                  showToastMessage("Failed to submit event. Please try again.");
                }
              }}

              >
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* TOAST NOTIFICATION */}
        {showToast && (
          <div className="bottom-toast" role="status" aria-live="polite">
            <div className="bottom-toast-inner">
              <span className="toast-message">{toastMessage}</span>
              <button
                type="button"
                className="toast-close"
                aria-label="Dismiss notification"
                onClick={() => {
                  setShowToast(false);
                  if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
                }}
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
 