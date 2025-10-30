<<<<<<< HEAD
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
=======
import React, { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Clock, Users, Building, Wine, Utensils, Sparkles, Monitor, Wifi, Mic, Video, Laptop } from 'lucide-react';
import "../../styles/pages/_confirmevent.scss";
import { useNavigate, useLocation } from 'react-router-dom';

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
>>>>>>> 0ed39e0034e5a3fe7f795713b7191b3f28f92cfc
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
<<<<<<< HEAD
              <button className="btn-submit" type="button" onClick={handleSubmit}>
=======
              <button
                className="btn-submit"
                type="button"
                onClick={() => {
                  // Handle final submission
                  const submissionData = {
                    id: `REQ${Date.now()}`, // Generate unique ID
                    title: formData.eventTitle,
                    type: formData.typeOfFunction,
                    date: `${formData.dateOfCommencement} at ${formData.timeOfCommencement || 'TBD'}`,
                    status: 'Pending', // For admin approval
                    organizerStatus: 'Waiting for Approval', // For organizer
                    category: formData.typeOfFunction,
                    ...formData,
                    selectedVenue: selectedVenue,
                    termsAccepted: termsAccepted,
                    submittedAt: new Date().toISOString()
                  };

                  // Save to localStorage
                  const existingEvents = JSON.parse(localStorage.getItem('submittedEvents') || '[]');
                  existingEvents.push(submissionData);
                  localStorage.setItem('submittedEvents', JSON.stringify(existingEvents));

                  // Add notification for event submission
                  const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
                  notifications.unshift({
                    id: `notif-${Date.now()}`,
                    title: "Event Submission",
                    message: `Your event "${formData.eventTitle}" has been submitted for approval.`,
                    time: "Just now"
                  });
                  localStorage.setItem('notifications', JSON.stringify(notifications));

                  console.log('Event confirmed and submitted:', submissionData);
                  showToastMessage('Event booking request submitted successfully!');
                  setTimeout(() => {
                    navigate('/my-events');
                  }, 2000); // waits 2 seconds before redirecting
                }}
              >
>>>>>>> 0ed39e0034e5a3fe7f795713b7191b3f28f92cfc
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
