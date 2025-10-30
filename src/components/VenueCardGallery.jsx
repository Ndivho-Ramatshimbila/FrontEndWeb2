import React from 'react';
import { MapPin } from 'lucide-react';
import hall from '../assets/images/hall.jpg';
import sport from '../assets/images/sport.jpg';
import auditorium from '../assets/images/auditorium.jpg';
import lecturer from '../assets/images/lecturer.jpg';
import "../styles/pages/_createEvent.scss";

export default function VenueCardGallery({ selectedVenue, setSelectedVenue, campusFilter = '', venueTypeFilter = '', minCapacity = 0 }) {
  const venues = [
    { name: 'Library Center', image: hall, location: 'Emalahleni Campus, Building 12', campus: 'Emalahleni', type: 'indoor', capacity: 70, price: 4000 },
    { name: 'Sport Centre', image: sport, location: 'Polokwane Campus, Sports Complex', campus: 'Polokwane', type: 'outdoor', capacity: 150, price: 3000 },
    { name: 'Auditorium', image: auditorium, location: 'Polokwane Campus, Main Building', campus: 'Polokwane', type: 'indoor', capacity: 300, price: 7000 },
    { name: 'Lecturer Room', image: lecturer, location: 'Polokwane Campus, Academic Block', campus: 'Polokwane', type: 'indoor', capacity: 50, price: 1000 },
  ];

  // Filter venues based on selections
  const filteredVenues = venues.filter(venue => {
    const campusMatch = !campusFilter || venue.campus === campusFilter;
    const typeMatch = !venueTypeFilter || venue.type === venueTypeFilter;
    const capacityMatch = venue.capacity >= minCapacity;
    return campusMatch && typeMatch && capacityMatch;
  });

  return (
    <section className="form-section">
      <div className="section-header">
        <h2 className="section-title">Venue Selection</h2>
      </div>

      {/* Horizontally scrollable venue list */}
      <div className="venue-gallery">
        {filteredVenues.map((venue, index) => (
          <div 
            key={index} 
            className={`venue-card ${selectedVenue?.name === venue.name ? 'selected' : ''}`}
            onClick={() => setSelectedVenue(venue)}
          >
            <div className="venue-info">
              <h3 className="venue-name">{venue.name}</h3>
              <p className="venue-location">
                <MapPin size={14} /> {venue.location}
              </p>
              <p className="venue-price">R{venue.price}</p>
            </div>

            <div className="venue-image">
              <img src={venue.image} alt={venue.name} />
            </div>

            <div className="venue-availability">
              <p>Live Availability:</p>
              <span className="capacity-badge">Capacity: {venue.capacity}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
