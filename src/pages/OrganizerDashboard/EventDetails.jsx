// src/pages/EventDetails.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/pages/_eventdetails.scss";

const mockEventDetails = {
  1: {
    title: "Annual Tech Summit",
    type: "Academic",
    purpose: "To introduce students to tech innovations at TUT",
    capacity: 150,
    date: "2025-11-15",
    time: "09:00 AM - 14:00 PM",
    venue: "TUT Emalahleni Campus, Innovation Hall",
    services: {
      liquor: "Yes",
      kitchen: "Yes",
      cleaning: "Yes",
      security: "Yes",
    },
    resources: {
      chairs: 150,
      projectors: 3,
      microphones: 3,
      tables: 12,
    },
    banner: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
  },
};

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = mockEventDetails[id] || Object.values(mockEventDetails)[0];

  return (
    <div className="event-details-page">
      <div className="top-bar">
        <button className="back-btn" onClick={() => navigate("/my-events")}>
          ← Back
        </button>
        <h2>Details</h2>
      </div>

      <div className="banner">
        <img src={event.banner} alt={event.title} />
      </div>

      <div className="details-container">
        <div className="event-section">
          <h3>Event Details</h3>
          <p><strong>{event.title}</strong></p>
          <p>Type: {event.type}</p>
          <p>Purpose: {event.purpose}</p>
          <p>Capacity: {event.capacity}</p>
          <p>Date: {event.date}</p>
          <p>Time: {event.time}</p>
          <p>Venue: {event.venue}</p>
        </div>

        <div className="service-section">
          <h3>Service Required</h3>
          <p>Liquor: {event.services.liquor}</p>
          <p>Kitchen Facilities: {event.services.kitchen}</p>
          <p>Cleaning Services: {event.services.cleaning}</p>
          <p>Extra Security: {event.services.security}</p>

          <h3>Resource Catalogue</h3>
          <p>{event.resources.chairs} chairs</p>
          <p>{event.resources.projectors} projectors</p>
          <p>{event.resources.microphones} microphones</p>
          <p>{event.resources.tables} tables</p>
        </div>
      </div>

      <div className="actions">
        <button
  className="modify-btn"
  onClick={() => navigate(`/event/${event.id}/edit`)}
>
  Modify Details
</button>
      </div>
    </div>
  );
};

export default EventDetails;
