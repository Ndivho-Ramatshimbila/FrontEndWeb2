import React, { useState, useEffect } from 'react';
import "./_discover.scss";
import { useNavigate } from 'react-router-dom';

// ✅ Local fallback data
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
  ]
};

// ✅ Function to get only approved events from localStorage
const getApprovedEvents = () => {
  const submittedEvents = JSON.parse(localStorage.getItem('submittedEvents') || '[]');
  return submittedEvents
    .filter(event => event.status === 'Approved')
    .map(event => ({
      id: event.id,
      title: event.title,
      date: event.date,
      location: event.venue || "TUT Polokwane Campus",
      image: event.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      tags: [event.typeOfFunction || "Event"],
      category: event.category || "Academic"
    }));
};

const Discover = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Events');
  const [showSharePopup, setShowSharePopup] = useState(null);
  const navigate = useNavigate();

  // ✅ Load events immediately from fallback + approved events
  useEffect(() => {
    const approvedEvents = getApprovedEvents();
    const initialEvents = [...eventsData.events, ...approvedEvents];
    setEvents(initialEvents);
    setFilteredEvents(initialEvents);
    setLoading(false); // UI loads immediately

    // Try fetching API but don't block UI
    const fetchEvents = async () => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 1000); // 1s timeout
      try {
        const response = await fetch("https://your-api-url.com/events", { signal: controller.signal });
        if (response.ok) {
          const data = await response.json();
          const apiEvents = data.events || [];
          setEvents(prev => [...apiEvents, ...prev]); // Merge API events on top
          setFilteredEvents(prev => [...apiEvents, ...prev]);
        }
      } catch (err) {
        console.warn("API fetch failed or timed out, using fallback:", err.message);
      } finally {
        clearTimeout(timeout);
      }
    };

    fetchEvents();
  }, []);

  // ✅ Filter and search
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
  const handleCardClick = (id) => navigate(`/organizer-view-event/${id}`);
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

      <div className="categories-container">
        <div className="categories-scroll">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-button ${selectedCategory === cat.name ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.name)}
            >
              <i className={`fas ${cat.icon}`}></i>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

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
                  {event.tags.map((tag, i) => <span key={i} className="tag">{tag}</span>)}
                </div>

                <button className="share-button" onClick={(e) => handleShareClick(e, event.id)}>
                  <i className="fas fa-share-alt"></i><span>Share</span>
                </button>

                {showSharePopup === event.id && (
                  <div className="share-popup" onClick={(e) => e.stopPropagation()}>
                    <a href={links.facebook} target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
                    <a href={links.twitter} target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                    <a href={links.linkedin} target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
                    <a href={links.whatsapp} target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp"></i></a>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

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

export default Discover;
