import React, { useState, useEffect } from "react";
import "../../styles/pages/_approvalqueue.scss";
import { FaCalendarAlt, FaTag } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

const staticEventsData = [
  {
    id: "REQ004",
    title: "Tech Conference 2024",
    type: "Conference",
    date: "2024-10-15 at 10:00 AM",
    status: "Pending",
    category: "Conference",
  },
  {
    id: "REQ007",
    title: "Charity Run",
    type: "Sports Event",
    date: "2025-01-15 at 08:00 AM",
    status: "Pending",
    category: "Sports",
  },
  {
    id: "REQ011",
    title: "Film Screening",
    type: "Entertainment",
    date: "2025-05-15 at 07:00 PM",
    status: "Pending",
    category: "Entertainment",
  },
];

const tabs = ["All", "Pending", "Approved", "Rejected"];

export default function ApprovalScreen() {
  const [selectedTab, setSelectedTab] = useState("All");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [refresh, setRefresh] = useState(0);
  const navigate = useNavigate();

  // Load events from localStorage and combine with static data
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

  // Save updated events to localStorage
  const saveEvents = (events) => {
    localStorage.setItem('submittedEvents', JSON.stringify(events));
    window.dispatchEvent(new Event('localStorageUpdate')); // notify other components
  };

  // Approve or reject an event
  const updateEventStatus = (eventId, status) => {
    const events = loadEvents();
    const index = events.findIndex(e => e.id === eventId);
    if (index !== -1) {
      events[index].status = status;
      saveEvents(events);
      setRefresh(prev => prev + 1); // refresh filtered list
    }
  };

  useEffect(() => {
    const eventsData = loadEvents();
    let filtered = selectedTab === "All"
      ? eventsData
      : eventsData.filter((event) => event.status === selectedTab);

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (event.category && event.category.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredEvents(filtered);
  }, [selectedTab, searchTerm, refresh]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "pending";
      case "Approved": return "approved";
      case "Rejected": return "rejected";
      default: return "";
    }
  };

  return (
    <div className="approval-container">
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
                  <p className="meta"><FaTag /> {event.category}</p>
                  <p className="meta"><FaCalendarAlt /> {event.date}</p>
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
    </div>
  );
}
