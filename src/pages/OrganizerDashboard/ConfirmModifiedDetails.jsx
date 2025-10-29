import React from 'react';
import { ArrowLeft, Calendar, MapPin, Clock, Users, Building, Wine, Utensils, Sparkles, Monitor, Wifi, Mic, Video, Laptop } from 'lucide-react';
import "../../styles/pages/_confirmevent.scss";
import { useNavigate, useLocation } from 'react-router-dom';

export default function ConfirmModifiedDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get modified data from location state
  const modifiedData = location.state?.modifiedData;

  // Fallback to static data if no modified data
  const eventData = modifiedData ? {
    eventTitle: modifiedData.eventTitle,
    eventType: modifiedData.typeOfFunction,
    purpose: modifiedData.purposeOfFunction,
    capacity: modifiedData.numberOfGuestsExpected,
    date: modifiedData.dateOfCommencement,
    venue: `${modifiedData.campus}, ${modifiedData.venue}`,
    time: `${modifiedData.timeOfCommencement} - ${modifiedData.timeToLockup}`,
    venueSelection: {
      buildings: [modifiedData.venue]
    },
    services: {
      liquor: modifiedData.useOfLiquor,
      kitchenFacilities: modifiedData.kitchenFacilities,
      cleaningServices: modifiedData.cleaningServices,
      extraSecurity: 'No' // Assuming not in form
    },
    resources: {
      chairs: modifiedData.plasticChairs,
      projectors: modifiedData.dataProjector === 'Yes' ? 1 : 0,
      microphones: modifiedData.microphone === 'Yes' ? 1 : 0,
      tables: modifiedData.steelTable + modifiedData.examTables
    },
    headerImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80'
  } : {
    eventTitle: 'New Student Orientation',
    eventType: 'Social Event',
    purpose: 'purpose of event is to introduce the students to the Campus',
    capacity: 150,
    date: 'Friday, October 27, 2024',
    venue: 'TUT emalahleni Campus, Innovation Hall',
    time: '09:00 AM - 14:00 PM',
    venueSelection: {
      buildings: ['Building 16', 'Building 15']
    },
    services: {
      liquor: 'Yes',
      kitchenFacilities: 'yes',
      cleaningServices: 'yes',
      extraSecurity: 'yes'
    },
    resources: {
      chairs: 150,
      projectors: 3,
      microphones: 3,
      tables: 12
    },
    headerImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80'
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
                  // Handle final submission - update localStorage with modified data
                  if (modifiedData) {
                    const submittedEvents = JSON.parse(localStorage.getItem('submittedEvents') || '[]');
                    // Find the original event and update it (assuming we have an ID or some identifier)
                    // For now, we'll just add the modified data as a new entry or update existing
                    // In a real app, you'd have proper ID matching
                    const updatedEvents = submittedEvents.map(event =>
                      event.id === modifiedData.id ? { ...event, ...modifiedData, status: 'Pending' } : event
                    );
                    localStorage.setItem('submittedEvents', JSON.stringify(updatedEvents));
                  }
                  console.log('Event modification confirmed and submitted');
                  navigate("/my-events");
                }}
              >
                Submit Modification
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}