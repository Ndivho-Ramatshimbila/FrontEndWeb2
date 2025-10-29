import React, { useState, useEffect } from "react";
import "../../styles/pages/_approvalqueue.scss";
import { FaCalendarAlt, FaTag } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';


const eventsData = [
  {
      id: "REQ003",
      title: "Annual TUT Athletics Day",
      type: "Sports Event",
      date: "2024-09-10 at 09:00 AM",
      status: "Approved", // ✅ Approved
    },
    {
      id: "REQ004",
      title: "Tech Conference 2024",
      type: "Conference",
      date: "2024-10-15 at 10:00 AM",
      status: "Pending", // ✅ Pending
    },
    {
      id: "REQ005",
      title: "Music Festival",
      type: "Entertainment",
      date: "2024-11-20 at 02:00 PM",
      status: "Rejected", // ✅ Rejected
    },
    {
      id: "REQ006",
      title: "Workshop on AI",
      type: "Educational",
      date: "2024-12-05 at 10:00 AM",
      status: "Approved",
    },
    {
      id: "REQ007",
      title: "Charity Run",
      type: "Sports Event",
      date: "2025-01-15 at 08:00 AM",
      status: "Pending",
    },
    {
      id: "REQ008",
      title: "Art Exhibition",
      type: "Cultural",
      date: "2025-02-10 at 11:00 AM",
      status: "Approved",
    },
    {
      id: "REQ009",
      title: "Business Seminar",
      type: "Professional",
      date: "2025-03-05 at 09:00 AM",
      status: "Rejected",
    },
    {
      id: "REQ010",
      title: "Science Fair",
      type: "Educational",
      date: "2025-04-20 at 10:00 AM",
      status: "Approved",
    },
    {
      id: "REQ011",
      title: "Film Screening",
      type: "Entertainment",
      date: "2025-05-15 at 07:00 PM",
      status: "Pending",
    },
    {
      id: "REQ012",
      title: "Book Launch",
      type: "Literary",
      date: "2025-06-10 at 03:00 PM",
      status: "Rejected",
    },

  // You can add more events if needed
];

const tabs = ["All", "Pending", "Approved", "Rejected"];

export default function ApprovalScreen() {
  const [selectedTab, setSelectedTab] = useState("All");
  const [filteredEvents, setFilteredEvents] = useState(eventsData);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    let filtered = selectedTab === "All"
      ? eventsData
      : eventsData.filter((event) => event.status === selectedTab);

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  }, [selectedTab, searchTerm]);

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
    <div className="approval-container">
      {selectedEvent ? (
        <div className="details-container">
          <h2>Event Details</h2>
          <h3>{selectedEvent.title}</h3>
          <p><strong>Type:</strong> {selectedEvent.details.type}</p>
          <p><strong>Purpose:</strong> {selectedEvent.details.purpose}</p>
          <p><strong>Capacity:</strong> {selectedEvent.details.capacity}</p>
          <p><strong>Date:</strong> {selectedEvent.details.eventDate}</p>
          <p>
            <strong>Venue:</strong> {selectedEvent.details.venue.campus}, {selectedEvent.details.venue.hall}
          </p>
          <p><strong>Buildings:</strong> {selectedEvent.details.venue.buildings.join(", ")}</p>
          <p><strong>Time:</strong> {selectedEvent.details.time}</p>

          <h4>Services Required</h4>
          <ul>
            {Object.entries(selectedEvent.details.services).map(([key, value]) => (
              <li key={key}>
                {key}: {value ? "Yes" : "No"}
              </li>
            ))}
          </ul>

          <h4>Resources</h4>
          <ul>
            {Object.entries(selectedEvent.details.resources).map(([key, value]) => (
              <li key={key}>
                {key}: {value}
              </li>
            ))}
          </ul>

          <div className="details-actions">
            <button className="approve">Approve</button>
            <button className="reject">Reject</button>
          </div>

          <button className="back-btn" onClick={() => setSelectedEvent(null)}>
            ← Back
          </button>
        </div>
      ) : (
        <>
          <h1 className="page-title">Event Requests</h1>

          {/* Search Bar */}
          <div className="search-container">
            <FiSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Tabs */}
          <div className="tabs-row">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${selectedTab === tab ? "active" : ""}`}
                onClick={() => setSelectedTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <h3 className="tab-heading">{selectedTab}</h3>
          <p className="count">{filteredEvents.length} items</p>

          <div className="cards">
            {filteredEvents.length === 0 ? (
              <p className="empty">No events in this category</p>
            ) : (
              filteredEvents.map((event) => (
                <div key={event.id} className="event-card">
                  <div className="event-left">
                    <div className="icon-circle">
                      <FaCalendarAlt className="calendar-icon" />
                    </div>
                    <div className="event-info">
                      <h4 className="title">{event.title}</h4>
                      <p className="request-id">Request ID: {event.id}</p>
                      <p className="meta">
                        <FaTag /> {event.category}
                      </p>
                      <p className="meta">
                        <FaCalendarAlt /> {event.date}
                      </p>
                      <p className={`status ${getStatusColor(event.status)}`}>{event.status}</p>
                    </div>
                  </div>
                  <button
                  className="view-btn"
                  onClick={() => navigate(`/admin/details/${event.id}`)}
                  >
                  View Details
                  </button>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
