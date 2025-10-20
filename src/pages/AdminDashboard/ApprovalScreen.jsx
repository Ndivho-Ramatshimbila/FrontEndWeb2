import React, { useState } from "react";
import "../../styles/pages/_approvalqueue.scss"; // Updated SCSS file name
import { FiSearch } from "react-icons/fi";
import { MdEvent, MdSchedule } from "react-icons/md";

export default function ApprovalQueue() {
  const [selectedTab, setSelectedTab] = useState("All"); // Now supports All/Pending/Approved/Rejected

  const [approvalItems] = useState([
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
  ]);

  const filteredItems = selectedTab === "All" 
    ? approvalItems 
    : approvalItems.filter(item => item.status === selectedTab);

  const getStatusClass = (status) => {
    switch (status) {
      case "Approved":
        return "status-approved";
      case "Pending":
        return "status-pending";
      case "Rejected":
        return "status-rejected";
      default:
        return "";
    }
  };

  return (
    <div className="approval-queue-screen">
      {/* Search Bar */}
      <div className="search-container">
        <FiSearch className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search approvals..."
        />
      </div>

      {/* Tabs */}
      <div className="tabs-row">
        {["All", "Pending", "Approved", "Rejected"].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${selectedTab === tab ? "active" : ""}`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Section Title with Count */}
      <div className="section-title-container">
        <h2 className="section-title">Approval Queue</h2>
        <span className="count-text">{filteredItems.length} items</span>
      </div>

      {/* Scrollable Content */}
      <div className="scroll-view">
        {filteredItems.length === 0 ? (
          <p className="empty-text">No items match this filter.</p>
        ) : (
          filteredItems.map((item) => (
            <div key={item.id} className="card">
              <div className="card-header">
                <div className="avatar"></div>
                <div className="card-title-group">
                  <h3 className="event-title">{item.title}</h3>
                  <p className="event-id">Request ID: {item.id}</p>
                </div>
              </div>

              <div className="card-body">
                <div className="row">
                  <MdEvent className="icon" />
                  <span className="event-type">{item.type}</span>
                </div>
                <div className="row">
                  <MdSchedule className="icon" />
                  <span className="event-date">{item.date}</span>
                </div>
              </div>

              <div className="card-footer">
                <button className="details-button">View Details</button>
                <span className={`status-badge ${getStatusClass(item.status)}`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}