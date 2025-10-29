import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/_myevents.scss';

const staticMyEventsData = [
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
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [refresh, setRefresh] = useState(0);
  const navigate = useNavigate();

  // Memoize events data to avoid recalculating on every render
  const myEventsData = useMemo(() => {
    const submittedEvents = JSON.parse(localStorage.getItem('submittedEvents') || '[]');
    // Transform submitted events to match the format expected by MyEvents
    const transformedSubmittedEvents = submittedEvents.map(event => ({
      id: event.id,
      title: event.title,
      date: event.dateOfCommencement, // Use commencement date for filtering
      status: event.organizerStatus, // Use organizerStatus for display
      category: event.category,
    }));
    return [...staticMyEventsData, ...transformedSubmittedEvents];
  }, [refresh]); // Only recalculate when refresh changes

  const filteredEvents = useMemo(() => {
    return myEventsData.filter(event => {
      if (filter === "All") return true;
      if (filter === "Upcoming") return new Date(event.date) > new Date();
      if (filter === "Past") return new Date(event.date) <= new Date();
      if (filter === "Cancelled") return event.status === "Cancelled";
      return false;
    }).sort((a, b) => {
      let aValue, bValue;

      if (sortBy === "name") {
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
      } else if (sortBy === "date") {
        aValue = new Date(a.date);
        bValue = new Date(b.date);
      } else {
        return 0;
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });
  }, [myEventsData, filter, sortBy, sortOrder]);

  // Force re-render when refresh changes
  React.useEffect(() => {
    // This effect will trigger when refresh changes
  }, [refresh]);

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
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [newSortBy, newSortOrder] = e.target.value.split('-');
                setSortBy(newSortBy);
                setSortOrder(newSortOrder);
              }}
            >
              <option value="date-asc">Date (Ascending)</option>
              <option value="date-desc">Date (Descending)</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
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
                  onClick={() => navigate(`/event-details-modify/${event.id}`)}
                >
                  Modify
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
