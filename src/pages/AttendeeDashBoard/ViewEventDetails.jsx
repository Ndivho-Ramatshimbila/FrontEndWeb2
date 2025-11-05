import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Building, Tag, Mail, ArrowLeft } from 'lucide-react';
import '../../styles/pages/ViewEventDetails.scss';
import { useNavigate, useLocation } from 'react-router-dom';

const ViewEventDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { eventData } = location.state || {};

  const [event] = useState(eventData || {
    title: "Annual Tech Summit",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
    date: "Saturday, 19 October at 09:00 AM",
    location: "San Francisco Convention Center",
    duration: "8 hours",
    capacity: "500 attendees",
    organizer: "Tech Innovators Inc.",
    price: "Free",
    description:
      "Join industry leaders for a full day of talks, workshops, and networking around the latest in AI, cloud computing, and startup innovation.",
    tags: ["AI", "Startup", "Networking"],
    contact: "info@techinnovators.com",
  });

  const handleContact = () => {
    window.location.href = `mailto:${event.contact}`;
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="event-details">
      {/* Image & Back Button */}
      <div className="event-details__image-container">
        <img src={event.image} alt={event.title} className="event-details__image" />
        <button className="event-details__back-button" onClick={handleBack}>
          <ArrowLeft size={24} />
        </button>
      </div>

      <div className="event-details__content">
        {/* Header */}
        <div className="event-details__header">
          <h1 className="event-details__title">{event.title}</h1>
          <span className="event-details__category">{event.category}</span>
        </div>

        {/* Event Info */}
        <div className="event-details__details-section">
          <div className="event-details__detail-row">
            <Calendar size={20} className="event-details__icon" />
            <span>{event.date}</span>
          </div>
          <div className="event-details__detail-row">
            <MapPin size={20} className="event-details__icon" />
            <span>{event.location}</span>
          </div>
          <div className="event-details__detail-row">
            <Clock size={20} className="event-details__icon" />
            <span>{event.duration}</span>
          </div>
          <div className="event-details__detail-row">
            <Users size={20} className="event-details__icon" />
            <span>{event.capacity}</span>
          </div>
          <div className="event-details__detail-row">
            <Building size={20} className="event-details__icon" />
            <span>Organized by: {event.organizer}</span>
          </div>
          <div className="event-details__detail-row">
            <Tag size={20} className="event-details__icon" />
            <span>Price: {event.price}</span>
          </div>
        </div>

        {/* About Section */}
        <section className="event-details__section">
          <h2 className="event-details__section-title">About this Event</h2>
          <p className="event-details__description">{event.description}</p>
        </section>

        {/* Tags */}
        <section className="event-details__section">
          <h2 className="event-details__section-title">Tags</h2>
          <div className="event-details__tags">
            {event.tags.map((tag, index) => (
              <span key={index} className="event-details__tag">{tag}</span>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="event-details__section">
          <h2 className="event-details__section-title">Contact Information</h2>
          <button className="event-details__contact-row" onClick={handleContact}>
            <Mail size={20} className="event-details__icon" />
            <span>{event.contact}</span>
          </button>
        </section>
      </div>
    </div>
  );
};

export default ViewEventDetails;
