import React from 'react';
import hall from '../assets/images/hall.jpg';
import sport from '../assets/images/sport.jpg';
import auditorium from '../assets/images/auditorium.jpg';
import lecturer from '../assets/images/lecturer.jpg';
import "../styles/pages/_createEvent.scss";

export default function VenueCardGallery({ selectedVenue, setSelectedVenue, minCapacity = 0, campusFilter = '', venueTypeFilter = '' }) {
  const venues = [
    // --- Polokwane Campus Venues ---
    { name: 'Hall', image: hall, location: 'Polokwane', campus: 'Polokwane', type: 'indoor', capacity: 200, price: 5000 },
    { name: 'Sport Centre', image: sport, location: 'Polokwane', campus: 'Polokwane', type: 'outdoor', capacity: 150, price: 3000 },
    { name: 'Auditorium', image: auditorium, location: 'Polokwane', campus: 'Polokwane', type: 'indoor', capacity: 300, price: 7000 },
    { name: 'Lecturer Room', image: lecturer, location: 'Polokwane', campus: 'Polokwane', type: 'indoor', capacity: 50, price: 1000 },

    // --- Emalahleni Campus Venues ---
    { name: 'Conference Hall', image: hall, location: 'Emalahleni', campus: 'Emalahleni', type: 'indoor', capacity: 180, price: 4800 },
    { name: 'Sports Arena', image: sport, location: 'Emalahleni', campus: 'Emalahleni', type: 'outdoor', capacity: 200, price: 3500 },
    { name: 'Auditorium B', image: auditorium, location: 'Emalahleni', campus: 'Emalahleni', type: 'indoor', capacity: 280, price: 6500 },
    { name: 'Seminar Room', image: lecturer, location: 'Emalahleni', campus: 'Emalahleni', type: 'indoor', capacity: 60, price: 1200 },
  ];

  // Filter by campus, venue type, and capacity
  const filteredVenues = venues.filter(venue => {
    const campusMatch = !campusFilter || venue.campus === campusFilter;
    const typeMatch = !venueTypeFilter || venue.type === venueTypeFilter;
    const capacityMatch = venue.capacity >= minCapacity;
    return campusMatch && typeMatch && capacityMatch;
  });

  const maxCapacity = Math.max(...venues.map(v => v.capacity));

  return (
    <section className="form-section">
      <h2 className="section-title">Select Venue *</h2>

      {minCapacity > 0 && filteredVenues.length === 0 && (
        <div className="warning-box">
          No venues available for {minCapacity} guests. The largest venue can accommodate {maxCapacity} guests.
        </div>
      )}

      {campusFilter === '' && (
        <div className="hint-box">Please select a campus to view available venues.</div>
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
              <p>Campus: {venue.campus}</p>
              <p>Location: {venue.location}</p>
              <p>Type: {venue.type}</p>
              <p>Capacity: {venue.capacity}</p>
              <p>Price: R{venue.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
