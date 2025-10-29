import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaBell, FaTimesCircle, FaInfoCircle } from "react-icons/fa";
import "../../styles/pages/Events.scss";

const filters = [
  { label: "All", key: "all" },
  { label: "Upcoming", key: "Upcoming" },
  { label: "Attended", key: "Attended" },
  { label: "Missed", key: "Missed" },
];

const notifications = [
  { id: "1", title: "Event Registration Approved", message: 'Your registration to attend "Campus Fest" has been approved.', time: "2 min ago" },
  { id: "2", title: "New Event", message: "Register for new event.", time: "1 hour ago" },
  { id: "3", title: "Event Registration Approved", message: 'Your registration to attend "Career Day" has been approved.', time: "3 hours ago" },
];

const mockEvents = [
  { id: 1, title: "Campus Fest", date: "2025-11-02", status: "Upcoming" },
  { id: 2, title: "Career Day", date: "2025-09-12", status: "Attended" },
  { id: 3, title: "Sports Day", date: "2025-07-10", status: "Missed" },
];

const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState(mockEvents);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  useEffect(() => {
    setFilteredEvents(
      selectedFilter === "all"
        ? events
        : events.filter((event) => event.status === selectedFilter)
    );
  }, [selectedFilter, events]);

  return (
    <div className="events-container">
      {/* Notification dropdown */}
      {isNotificationOpen && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h4>Notifications</h4>
            <button onClick={() => setIsNotificationOpen(false)}>
              <FaTimesCircle color="#999" />
            </button>
          </div>
          {notifications.length === 0 ? (
            <p className="empty-text">No new notifications</p>
          ) : (
            <div className="notification-list">
              {notifications.map((item) => (
                <div key={item.id} className="notification-item">
                  <FaInfoCircle size={18} color="#2623d3ff" className="notification-icon" />
                  <div className="notification-content">
                    <h5>{item.title}</h5>
                    <p>{item.message}</p>
                    <span>{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Header */}
      <div className="header-row">
        <h1>Events</h1>
      
      </div>

      {/* Filters */}
      <div className="filter-bar">
        {filters.map(({ label, key }) => (
          <button
            key={key}
            className={`filter-btn ${selectedFilter === key ? "active" : ""}`}
            onClick={() => setSelectedFilter(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <h2 className="section-title">Your Events</h2>

      {/* Event List */}
      <div className="event-list">
        {filteredEvents.length === 0 ? (
          <div className="empty-box">No events found in this category.</div>
        ) : (
          filteredEvents.map((item) => (
            <div key={item.id} className="event-row" onClick={() => navigate(`/attendee/view-event/${item.id}`, { state: { eventData: item } })}>
              <div className="event-left">
                <FaCalendarAlt size={26} color="#3627d7ff" />
              </div>
              <div className="event-info">
                <h4>{item.title}</h4>
                <p className="event-date">{item.date}</p>
                <p className="event-status">{item.status}</p>
              </div>
              <div className="event-right">
                {item.status === "Upcoming" && (
                  <button
                    className="action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`Viewing details for: ${item.title}`);
                      navigate("/attendee/qr-code");
                    }}
                  >
                    Ticket
                  </button>
                )}
                {item.status === "Attended" && (
                  <button
                    className="action-btn gray"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/attendee/rate-events");
                    }}
                  >
                    Rate Event
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Events;
