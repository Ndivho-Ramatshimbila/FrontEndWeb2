import React, { useState, useEffect } from 'react';
import "./_attendee-discover.scss";
import { useNavigate } from 'react-router-dom';

// ✅ Local fallback data (used if API fails or not yet connected)
const eventsData = {
  events: [
    {
      id: 1,
      title: "Annual Tech Summit",
      date: "Saturday, 19 October at 09:00 AM",
      location: "Innovation Hub, Building 4",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      tags: ["Leadership", "Networking", "Enterprise"],
      category: "Academic"
    },
    {
      id: 2,
      title: "Spring Arts Festival",
      date: "Sunday, 27 October at 14:00 PM",
      location: "Central Park Amphitheater",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
      tags: ["Music", "Art", "Culture"],
      category: "Arts & Culture"
    },
    {
      id: 3,
      title: "Career Development Workshop",
      date: "Friday, 25 October at 18:30 PM",
      location: "TechHub Co-working Space",
      image: "https://images.unsplash.com/photo-1559223607-ca4c3a29500d?w=800&q=80",
      tags: ["Entrepreneurship", "Networking", "Innovation"],
      category: "Academic"
    },
    {
      id: 4,
      title: "Jazz Under The Stars",
      date: "Saturday, 02 November at 19:00 PM",
      location: "Riverside Gardens",
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80",
      tags: ["Music", "Entertainment", "Outdoor"],
      category: "Arts & Culture"
    },
    {
      id: 5,
      title: "AI & Machine Learning Workshop",
      date: "Wednesday, 30 October at 10:00 AM",
      location: "Digital Innovation Center, Room 301",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
      tags: ["Technology", "Workshop", "AI"],
      category: "Academic"
    }
  ]
};

// ✅ Function to get approved events from localStorage
const getApprovedEvents = () => {
  const submittedEvents = JSON.parse(localStorage.getItem('submittedEvents') || '[]');
  console.log('Submitted events:', submittedEvents); // Debug log
  const approvedEvents = submittedEvents.filter(event => event.status === 'Approved');
  console.log('Approved events:', approvedEvents); // Debug log

  return approvedEvents.map(event => ({
    id: event.id,
    title: event.title,
    date: event.date,
    location: event.venue || "TUT Polokwane Campus",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80", // Use fallback image for now
    tags: [event.typeOfFunction || "Event"],
    category: event.category || "Academic"
  }));
};

const AttendeeDiscover = () => {
  const [events, setEvents] = useState([]);            // all events (from API or fallback)
  const [filteredEvents, setFilteredEvents] = useState([]); // filtered display list
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Events');
  const [showSharePopup, setShowSharePopup] = useState(null);
  const navigate = useNavigate();

  // ✅ Fetch data (with fallback and approved events)
 useEffect(() => {
  const fetchEvents = async () => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1000); // 3s timeout

    try {
      setLoading(true);
      const response = await fetch("https://your-api-url.com/events", {
        signal: controller.signal,
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      const approvedEvents = getApprovedEvents();
      const allEvents = [...(data.events || []), ...approvedEvents];
      setEvents(allEvents);
      setFilteredEvents(allEvents);
    } catch (err) {
      console.warn("Using fallback data:", err.message);
      const approvedEvents = getApprovedEvents();
      const allEvents = [...eventsData.events, ...approvedEvents];
      setEvents(allEvents);
      setFilteredEvents(allEvents);
    } finally {
      clearTimeout(timeout);
      setLoading(false);
    }
  };

  fetchEvents();
}, []);


  // ✅ Filter & search logic
  useEffect(() => {
    let filtered = [...events];

    if (selectedCategory !== 'All Events') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    if (search.trim()) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.location.toLowerCase().includes(search.toLowerCase()) ||
        event.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      );
    }

    setFilteredEvents(filtered);
  }, [search, selectedCategory, events]);

  // ✅ Handlers
  const handleCardClick = (id) => {
    navigate(`/organizer-view-event/${id}`);
  };

  const handleShareClick = (e, eventId) => {
    e.stopPropagation(); 
    setShowSharePopup(showSharePopup === eventId ? null : eventId);
  };

  const shareLinks = (event) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out this event: ${event.title}`);
    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`,
      whatsapp: `https://api.whatsapp.com/send?text=${text} ${url}`
    };
  };

  const categories = [
    { id: 'all', name: 'All Events', icon: 'fa-th' },
    { id: 'academic', name: 'Academic', icon: 'fa-graduation-cap' },
    { id: 'arts', name: 'Arts & Culture', icon: 'fa-music' },
    { id: 'sport', name: 'Sport', icon: 'fa-football-ball' },
    { id: 'cultural', name: 'Cultural', icon: 'fa-palette' },
    { id: 'tech', name: 'Technology', icon: 'fa-laptop' },
    { id: 'community', name: 'Community', icon: 'fa-users' }
  ];

  // ✅ Loading state
  if (loading) {
    return (
      <div className="loading-container">
        <i className="fas fa-spinner fa-spin"></i>
        <p>Loading events...</p>
      </div>
    );
  }

  // ✅ Error state
  if (error) {
    return (
      <div className="error-container">
        <i className="fas fa-exclamation-circle"></i>
        <p>Failed to load events: {error}</p>
      </div>
    );
  }

  // ✅ Main UI
  return (
    <div className="discover-container">
      <div className="discover-header">
        <h1 className="discover-title">Discover Events</h1>
        <input
          type="text"
          className="discover-search"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Category Filter Bar */}
      <div className="categories-container">
        <div className="categories-scroll">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-button ${selectedCategory === category.name ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.name)}
            >
              <i className={`fas ${category.icon}`}></i>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Events List */}
      <div className="events-list">
        {filteredEvents.map(event => {
          const links = shareLinks(event);
          return (
            <div
              key={event.id}
              className="event-card"
              onClick={() => handleCardClick(event.id)}
              style={{ cursor: "pointer" }}
            >
              <img src={event.image} alt={event.title} className="event-image" />
              <div className="event-content">
                <h3 className="event-title">{event.title}</h3>
                <div className="event-meta">
                  <i className="fas fa-calendar"></i>
                  <span>{event.date}</span>
                </div>
                <div className="event-meta">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>{event.location}</span>
                </div>
                <div className="tags-container">
                  {event.tags.map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>

                <button
                  className="share-button"
                  onClick={(e) => handleShareClick(e, event.id)}
                >
                  <i className="fas fa-share-alt"></i>
                  <span>Share</span>
                </button>

                {/* Share popup */}
                {showSharePopup === event.id && (
                  <div className="share-popup" onClick={(e) => e.stopPropagation()}>
                    <a href={links.facebook} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-facebook"></i>
                    </a>
                    <a href={links.twitter} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-linkedin"></i>
                    </a>
                    <a href={links.whatsapp} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-whatsapp"></i>
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <div className="empty-container">
          <i className="fas fa-search"></i>
          <p className="empty-text">No events found</p>
          <p className="empty-subtext">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default AttendeeDiscover;
