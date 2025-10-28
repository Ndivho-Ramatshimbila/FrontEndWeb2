import React, { useState, useEffect } from 'react';
import "./_discover.scss";
import { useNavigate } from 'react-router-dom';

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

const Discover = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Events');
  const [filteredEvents, setFilteredEvents] = useState(eventsData.events);
  const [showSharePopup, setShowSharePopup] = useState(null); // 👈 track which event popup is open
  const navigate = useNavigate();

  useEffect(() => {
    let filtered = eventsData.events;

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
  }, [search, selectedCategory]);

  const handleCardClick = (id) => {
    navigate('/attendee/view-event/${event.id}');
  };

  const handleShareClick = (e, eventId) => {
    e.stopPropagation(); // prevent card navigation
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

                {/* 👇 Share popup */}
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
