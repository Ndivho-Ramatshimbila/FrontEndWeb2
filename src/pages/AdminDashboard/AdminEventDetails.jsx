// EventDetails.jsx
import React, { useState, useEffect } from 'react';
import '../../styles/pages/EventDetails.scss';
import eventPic from '../../assets/images/eventPic.PNG';
import { useNavigate, useParams } from 'react-router-dom';

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
  const navigate = useNavigate();
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    // Load event data from localStorage
    const submittedEvents = JSON.parse(localStorage.getItem('submittedEvents') || '[]');
    const event = submittedEvents.find(e => e.id === id);
    if (event) {
      setEventData(event);
    } else {
      // Fallback to static data if not found
      setEventData({
        title: "New Student Orientation",
        details: {
          type: "Social Event",
          capacity: 150,
          eventDate: "Wednesday, September 17, 2025",
          time: "09:00 AM - 14:00 PM",
          venue: { campus: "TUT Polokwane Campus", hall: "Tech 9" },
          buildings: ["Building 1"],
          services: {
            liquor: true,
            kitchen: true,
            cleaning: true,
            security: true
          },
          resources: {
            chairs: 150,
            projectors: 3,
            microphones: 3,
            tables: 12
          }
        }
      });
    }
  }, [id]);

  const handleAction = (action) => {
    if (eventData) {
      const submittedEvents = JSON.parse(localStorage.getItem('submittedEvents') || '[]');
      const updatedEvents = submittedEvents.map(event =>
        event.id === id
          ? {
              ...event,
              status: action === "approve" ? 'Approved' : 'Rejected',
              organizerStatus: action === "approve" ? 'Approved' : 'Rejected'
            }
          : event
      );
      localStorage.setItem('submittedEvents', JSON.stringify(updatedEvents));
    }

    // Navigate to approvals page
    navigate("/admin/approvals");
  };

  if (!eventData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="event-details">
      <h2 className="header-title">Details</h2>

      <img className="event-image" src={eventPic} alt="Event" />

      <section className="info-section">
        <h3>Event Details</h3>
        <p className="subtitle">{eventData.title}</p>
        <ul>
          <li><FaGlobe /> Type - {eventData.details?.type || 'N/A'}</li>
          <li><FaUsers /> Capacity - {eventData.details?.capacity || 'N/A'}</li>
          <li><FaCalendarAlt /> {eventData.details?.eventDate || 'N/A'}</li>
          <li><FaClock /> {eventData.details?.time || 'N/A'}</li>
          <li><FaMapMarkerAlt /> {eventData.details?.venue?.campus || 'N/A'}, {eventData.details?.venue?.hall || 'N/A'}</li>
        </ul>
      </section>

      <section className="info-section">
        <h3>Venue Selection</h3>
        <p><FaBuilding /> {eventData.details?.buildings?.join(", ") || 'N/A'}</p>
      </section>

      <section className="info-section">
        <h3>Service Required</h3>
        <ul>
          <li><FaWineGlassAlt /> Liquor - {eventData.details?.services?.liquor ? 'yes' : 'no'}</li>
          <li><FaUtensils /> Kitchen - {eventData.details?.services?.kitchen ? 'yes' : 'no'}</li>
          <li><FaBroom /> Cleaning Service - {eventData.details?.services?.cleaning ? 'yes' : 'no'}</li>
          <li><FaShieldAlt /> Extra Security - {eventData.details?.services?.security ? 'yes' : 'no'}</li>
        </ul>
      </section>

      <section className="info-section">
        <h3>Resource Catalogue</h3>
        <ul>
          <li><FaChair /> {eventData.details?.resources?.chairs || 0} Chairs</li>
          <li><FaVideo /> {eventData.details?.resources?.projectors || 0} Projectors</li>
          <li><FaMicrophone /> {eventData.details?.resources?.microphones || 0} Microphones</li>
          <li><FaTable /> {eventData.details?.resources?.tables || 0} Tables</li>
        </ul>
      </section>

      {eventData.status === 'Pending' && (
        <div className="buttons">
          <button className="approve" onClick={() => handleAction("approve")}>
            Approve
          </button>
          <button className="reject" onClick={() => handleAction("reject")}>
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
