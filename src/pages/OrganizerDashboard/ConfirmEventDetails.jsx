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
          {/* Header Image */}
          <div className="event-header-image">
            <img 
              src={eventData.headerImage} 
              alt="Event header"
            />
          </div>

          {/* Content */}
          <div className="confirm-event-content">
            {/* Event Details Section */}
            <section className="confirm-section">
              <h2 className="section-title">Event Details</h2>
              <h3 className="section-subtitle">{eventData.eventTitle}</h3>
              
              <div className="detail-list">
                <div className="detail-item">
                  <Users size={18} className="detail-icon" />
                  <span className="detail-text">Type - {eventData.eventType}</span>
                </div>

                <div className="detail-item">
                  <Building size={18} className="detail-icon" />
                  <span className="detail-text">{eventData.purpose}</span>
                </div>

                <div className="detail-item">
                  <Users size={18} className="detail-icon" />
                  <span className="detail-text">Capacity - {eventData.capacity}</span>
                </div>

                <div className="detail-item">
                  <Calendar size={18} className="detail-icon" />
                  <span className="detail-text">{eventData.date}</span>
                </div>

                <div className="detail-item">
                  <MapPin size={18} className="detail-icon" />
                  <span className="detail-text">{eventData.venue}</span>
                </div>

                <div className="detail-item">
                  <Clock size={18} className="detail-icon" />
                  <span className="detail-text">{eventData.time}</span>
                </div>
              </div>
            </section>

            {/* Venue Selection */}
            <section className="confirm-section">
              <h2 className="section-title">Venue Selection</h2>
              <div className="detail-item">
                <Building size={18} className="detail-icon" />
                <span className="detail-text">{eventData.venueSelection.buildings.join(', ')}</span>
              </div>
            </section>

            {/* Service Required */}
            <section className="confirm-section">
              <h2 className="section-title">Service Required</h2>
              <div className="detail-list">
                <div className="detail-item">
                  <Wine size={18} className="detail-icon" />
                  <span className="detail-text">Liquor - {eventData.services.liquor}</span>
                </div>

                <div className="detail-item">
                  <Utensils size={18} className="detail-icon" />
                  <span className="detail-text">Kitchen facilities - {eventData.services.kitchenFacilities}</span>
                </div>

                <div className="detail-item">
                  <Sparkles size={18} className="detail-icon" />
                  <span className="detail-text">Cleaning Services - {eventData.services.cleaningServices}</span>
                </div>

                <div className="detail-item">
                  <Building size={18} className="detail-icon" />
                  <span className="detail-text">Extra security - {eventData.services.extraSecurity}</span>
                </div>
              </div>
            </section>

            {/* Resource Catalogue */}
            <section className="confirm-section">
              <h2 className="section-title">Resource Catalogue</h2>
              <div className="detail-list">
                <div className="detail-item">
                  <Users size={18} className="detail-icon" />
                  <span className="detail-text">{eventData.resources.chairs} chairs</span>
                </div>

                <div className="detail-item">
                  <Monitor size={18} className="detail-icon" />
                  <span className="detail-text">{eventData.resources.projectors} Projectors</span>
                </div>

                <div className="detail-item">
                  <Mic size={18} className="detail-icon" />
                  <span className="detail-text">{eventData.resources.microphones} microphones</span>
                </div>

                <div className="detail-item">
                  <Building size={18} className="detail-icon" />
                  <span className="detail-text">{eventData.resources.tables} Tables</span>
                </div>
              </div>
            </section>

            {/* Submit Button */}
            <div className="submit-button-container">
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
