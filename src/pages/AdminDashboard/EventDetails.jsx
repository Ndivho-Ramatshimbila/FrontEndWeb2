// EventDetails.jsx
import React from 'react';
import '../../styles/pages/EventDetails.scss';
import eventPic from '/public/eventPic.png';

import {
  FaUsers,
  FaGlobe,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaBuilding,
  FaWineGlassAlt,
  FaUtensils,
  FaBroom,
  FaShieldAlt,
  FaChair,
  FaVideo,
  FaMicrophone,
  FaTable
} from 'react-icons/fa';

const EventDetails = () => {
  return (
    <div className="event-details">
      <h2 className="header-title">Details</h2>

      <img
        className="event-image"
         src={eventPic} alt="Event" />
     

      <section className="info-section">
        <h3>Event Details</h3>
        <p className="subtitle">New Student Orientation</p>
        <ul>
          <li><FaGlobe /> Type - Social Event</li>
          <li><FaUsers /> Capacity - 150</li>
          <li><FaCalendarAlt /> Wednesday, September 17, 2025</li>
          <li><FaClock /> 09:00 AM - 14:00 PM</li>
          <li><FaMapMarkerAlt /> TUT Polokwane Campus, Tech 9</li>
        </ul>
      </section>

      <section className="info-section">
        <h3>Venue Selection</h3>
        <p><FaBuilding /> Building 1</p>
      </section>

      <section className="info-section">
        <h3>Service Required</h3>
        <ul>
          <li><FaWineGlassAlt /> Liquor - yes</li>
          <li><FaUtensils /> Kitchen - yes</li>
          <li><FaBroom /> Cleaning Service - yes</li>
          <li><FaShieldAlt /> Extra Security - yes</li>
        </ul>
      </section>

      <section className="info-section">
        <h3>Resource Catalogue</h3>
        <ul>
          <li><FaChair /> 150 Chairs</li>
          <li><FaVideo /> 3 Projectors</li>
          <li><FaMicrophone /> 3 Microphones</li>
          <li><FaTable /> 12 Tables</li>
        </ul>
      </section>

      <div className="buttons">
        <button className="approve">Approve</button>
        <button className="reject">Reject</button>
      </div>
    </div>
  );
};

export default EventDetails;
