import React from 'react';
import hall from '../assets/images/hall.jpg';
import sport from '../assets/images/sport.jpg';
import auditorium from '../assets/images/auditorium.jpg';
import lecturer from '../assets/images/lecturer.jpg';
import '../styles/abstracts/main.scss';

export default function VenueCardGallery({ selectedVenue, setSelectedVenue, minCapacity = 0 }) {
  const venues = [
    { name: 'Hall', image: hall, location: 'Main Campus', capacity: 200, price: 5000 },
    { name: 'Sport Centre', image: sport, location: 'North Wing', capacity: 150, price: 3000 },
    { name: 'Auditorium', image: auditorium, location: 'Block A', capacity: 300, price: 7000 },
    { name: 'Lecturer Room', image: lecturer, location: 'Block B', capacity: 50, price: 1000 }
  ];

  // Filter venues: only show venues where capacity >= number of expected guests
  const filteredVenues = venues.filter(venue => venue.capacity >= minCapacity);

  const maxCapacity = Math.max(...venues.map(v => v.capacity));

  return (
    <section className="form-section">
      <h2 className="section-title">Select Venue *</h2>
      
      {minCapacity > 0 && filteredVenues.length === 0 && (
        <div style={{
          padding: '16px',
          background: '#fef3c7',
          border: '1px solid #f59e0b',
          borderRadius: '8px',
          color: '#92400e',
          marginBottom: '16px',
          fontSize: '14px'
        }}>
          No venues available for {minCapacity} guests. Our largest venue can accommodate {maxCapacity} guests. 
          Please enter a number of guests that is {maxCapacity} or less.
        </div>
      )}

      <div className="venue-gallery">
        {filteredVenues.map((venue, index) => (
          <div
            key={index}
            className={`venue-card ${selectedVenue?.name === venue.name ? 'selected' : ''}`}
            onClick={() => setSelectedVenue(venue)}
          >
            <h3 className="venue-name">{venue.name}</h3>
            <img src={venue.image} alt={venue.name} />
            <div className="venue-details">
              <p>Location: {venue.location}</p>
              <p>Capacity: {venue.capacity}</p>
              <p>Price: R{venue.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}