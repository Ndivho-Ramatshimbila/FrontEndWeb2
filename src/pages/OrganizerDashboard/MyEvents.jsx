import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/_myevents.scss';

const myEventsData = [
  {
    id: 1,
    title: "Annual Tech Summit",
    date: "2025-11-15",
    status: "Waiting for Approval",
    category: "Academic",
  },
  {
    id: 2,
    title: "Marketing Strategy Workshop",
    date: "2025-10-28",
    status: "Approved",
    category: "Academic",
  },
  {
    id: 3,
    title: "Product Launch Event",
    date: "2025-09-01",
    status: "Past",
    category: "Academic",
  },
  {
    id: 4,
    title: "Team Building Retreat",
    date: "2025-08-20",
    status: "Past",
    category: "Academic",
  },
  {
    id: 5,
    title: "Quarterly Review Meeting",
    date: "2025-07-05",
    status: "Past",
    category: "Academic",
  },
  {
    id: 6,
    title: "Client Appreciation Gala",
    date: "2025-05-18",
    status: "Past",
    category: "Academic",
  },
];

const MyEvents = () => {
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  const filteredEvents = myEventsData.filter(event => {
    if (filter === "All") return true;
    if (filter === "Upcoming") return new Date(event.date) > new Date();
    if (filter === "Past") return new Date(event.date) <= new Date();
    if (filter === "Cancelled") return event.status === "Cancelled";
    return false;
  });

  return (
    <div className="my-events-page">
      <div className="header">
        <h2>My Events</h2>
        <div className="filter-sort">
          <div className="filters">
            {["All", "Upcoming", "Past", "Cancelled"].map(btn => (
              <button
                key={btn}
                className={filter === btn ? 'active' : ''}
                onClick={() => setFilter(btn)}
              >
                {btn}
              </button>
            ))}
          </div>
          <div className="sort-dropdown">
            <select>
              <option>Sort By</option>
            </select>
          </div>
        </div>
      </div>

      <div className="event-list">
        {filteredEvents.map(event => (
          <div key={event.id} className="event-card">
            <div className="event-info">
              <h4>{event.title}</h4>
              <p className="date">{event.date}</p>
              {event.status !== "Past" && (
                <p className="status">{event.status}</p>
              )}
            </div>
            <div className="event-action">
              {/* ✅ Only show Modify button if event is Waiting for Approval */}
              {event.status === "Waiting for Approval" && (
                <button
                  className="modify-btn"
                  onClick={() => navigate(`/event/${event.id}`)}
                >
                  Modify
                </button>
              )}

              {/* Show Rate button if event is in the past */}
              {new Date(event.date) <= new Date() && (
              <button
              className="rate-btn"
             onClick={() => navigate('/rate-your-event')}
             >
             Rate
             </button>
            )}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEvents;
