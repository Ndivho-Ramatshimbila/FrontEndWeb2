import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FaCalendarAlt, FaUsers, FaGlobe, FaMapMarkerAlt, FaClock,
  FaBuilding, FaWineGlassAlt, FaUtensils, FaBroom, FaShieldAlt,
  FaChair, FaVideo, FaMicrophone, FaTable
} from 'react-icons/fa';
import eventPic from '../../assets/images/eventPic.PNG';
import '../../styles/pages/EventDetails.scss';

const staticEventsData = [
  { id: "REQ004", title: "Tech Conference 2024", type: "Conference", date: "2024-10-15 at 10:00 AM", status: "Pending" },
  { id: "REQ007", title: "Charity Run", type: "Sports Event", date: "2025-01-15 at 08:00 AM", status: "Pending" },
  { id: "REQ011", title: "Film Screening", type: "Entertainment", date: "2025-05-15 at 07:00 PM", status: "Pending" },
];

export default function AdminEventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const loadEvents = () => {
      const submittedEvents = JSON.parse(localStorage.getItem('submittedEvents') || '[]');
      const allEvents = [...staticEventsData];
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

  const handleApprove = () => updateEventStatus("Approved");
  const handleReject = () => updateEventStatus("Rejected");

  const updateEventStatus = (newStatus) => {
    const submittedEvents = JSON.parse(localStorage.getItem('submittedEvents') || '[]');
    const submittedIndex = submittedEvents.findIndex(e => e.id === id);

    if (submittedIndex !== -1) {
      submittedEvents[submittedIndex].status = newStatus;
      submittedEvents[submittedIndex].organizerStatus = newStatus;
      localStorage.setItem('submittedEvents', JSON.stringify(submittedEvents));
    } else {
      const modifiedEvent = { ...event, status: newStatus, organizerStatus: newStatus };
      submittedEvents.push(modifiedEvent);
      localStorage.setItem('submittedEvents', JSON.stringify(submittedEvents));
    }

    // ✅ Create a user notification
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const newNotification = {
      id: Date.now(),
      title: `Event ${newStatus}`,
      message:
        newStatus === "Approved"
          ? `Your event "${event.title}" has been approved. 🎉`
          : `Your event "${event.title}" has been rejected.`,
      timestamp: new Date().toLocaleString(),
      read: false,
    };

    // Add and save the new notification
    const updatedNotifications = [newNotification, ...notifications];
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));

    // 🔄 Let user sidebar update immediately
    window.dispatchEvent(new Event('notificationsUpdated'));

    // Update local UI
    setEvent((prev) => ({ ...prev, status: newStatus }));

    // Notify admin approval screen to refresh
    window.dispatchEvent(new Event('localStorageUpdate'));

    // ✅ Go back to approvals page
    navigate('/admin/approvals');
  };

  if (!event) return <div>Loading...</div>;

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "pending";
      case "Approved": return "approved";
      case "Rejected": return "rejected";
      default: return "";
    }
  };

  return (
    <div className="event-details">
      <h2 className="header-title">Details</h2>

      <img className="event-image" src={eventPic} alt="Event" />

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
