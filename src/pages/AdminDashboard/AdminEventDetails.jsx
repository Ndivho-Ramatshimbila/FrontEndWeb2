import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaTag, FaUsers, FaGlobe, FaMapMarkerAlt, FaClock, FaBuilding, FaWineGlassAlt, FaUtensils, FaBroom, FaShieldAlt, FaChair, FaVideo, FaMicrophone, FaTable } from 'react-icons/fa';
import eventPic from '../../assets/images/eventPic.PNG';
import '../../styles/pages/EventDetails.scss';

const staticEventsData = [
    {
      id: "REQ004",
      title: "Tech Conference 2024",
      type: "Conference",
      date: "2024-10-15 at 10:00 AM",
      status: "Pending",
    },
    {
      id: "REQ007",
      title: "Charity Run",
      type: "Sports Event",
      date: "2025-01-15 at 08:00 AM",
      status: "Pending",
    },
    {
      id: "REQ011",
      title: "Film Screening",
      type: "Entertainment",
      date: "2025-05-15 at 07:00 PM",
      status: "Pending",
    },

  // You can add more events if needed
];

export default function AdminEventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const loadEvents = () => {
      const submittedEvents = JSON.parse(localStorage.getItem('submittedEvents') || '[]');
      const allEvents = [...staticEventsData];

      // Override static events with submitted events if they have the same id
      submittedEvents.forEach(submittedEvent => {
        const index = allEvents.findIndex(staticEvent => staticEvent.id === submittedEvent.id);
        if (index !== -1) {
          allEvents[index] = submittedEvent;
        } else {
          allEvents.push(submittedEvent);
        }
      });

      return allEvents;
    };

    const events = loadEvents();
    const foundEvent = events.find(e => e.id === id);
    setEvent(foundEvent);
  }, [id]);

  const handleApprove = () => {
    updateEventStatus("Approved");
  };

  const handleReject = () => {
    updateEventStatus("Rejected");
  };

  const updateEventStatus = (newStatus) => {
    const submittedEvents = JSON.parse(localStorage.getItem('submittedEvents') || '[]');
    const staticEvents = staticEventsData;

    // Check if event is in submittedEvents
    const submittedIndex = submittedEvents.findIndex(e => e.id === id);
    if (submittedIndex !== -1) {
      submittedEvents[submittedIndex].status = newStatus;
      submittedEvents[submittedIndex].organizerStatus = newStatus; // Update organizerStatus as well
      localStorage.setItem('submittedEvents', JSON.stringify(submittedEvents));
    } else {
      // If not in submitted, assume it's static, but since static is read-only, we might need to handle differently
      // For now, alert or handle as needed. But since static is in code, perhaps add to submitted if not there.
      const modifiedEvent = { ...event, status: newStatus, organizerStatus: newStatus };
      submittedEvents.push(modifiedEvent);
      localStorage.setItem('submittedEvents', JSON.stringify(submittedEvents));
    }

    // Update the local state to reflect the change immediately
    setEvent(prevEvent => ({ ...prevEvent, status: newStatus }));

    // Dispatch custom event to notify ApprovalScreen to refresh
    window.dispatchEvent(new Event('localStorageUpdate'));

    // Navigate back to approvals
    navigate('/admin/approvals');
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "pending";
      case "Approved":
        return "approved";
      case "Rejected":
        return "rejected";
      default:
        return "";
    }
  };

  return (
    <div className="event-details">
      <h2 className="header-title">Details</h2>

      <img
        className="event-image"
        src={eventPic} alt="Event" />

      <section className="info-section">
        <h3>Event Details</h3>
        <p className="subtitle">{event.title}</p>
        <ul>
          <li><FaGlobe /> Type - {event.type}</li>
          <li><FaUsers /> Capacity - 150</li>
          <li><FaCalendarAlt /> {event.date}</li>
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
        {event.status === "Pending" && (
          <>
            <button className="approve" onClick={handleApprove}>Approve</button>
            <button className="reject" onClick={handleReject}>Reject</button>
          </>
        )}
        {event.status === "Approved" && (
          <button className="reject" onClick={handleReject}>Reject</button>
        )}
        {event.status === "Rejected" && (
          <button className="approve" onClick={handleApprove}>Approve</button>
        )}
      </div>
    </div>
  );
}
