import React from 'react';
import { ArrowLeft, Calendar, MapPin, Clock, Users, Building, Wine, Utensils, Sparkles, Monitor, Wifi, Mic, Video, Laptop } from 'lucide-react';
import "../../styles/pages/_confirmevent.scss";
import { useNavigate } from "react-router-dom";

export default function ConfirmEventDetails() {
  // This would come from your form submission or route params
  const navigate = useNavigate();
  const eventData = {
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

  const handleSubmit = () => {
    // Show success message
    alert("Booking request submitted successfully!");

    // Redirect after short delay (optional)
    setTimeout(() => {
      navigate("/my-events");
    }, 1000);
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
                 onClick={handleSubmit}
                 >
                  Submit
                 </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}