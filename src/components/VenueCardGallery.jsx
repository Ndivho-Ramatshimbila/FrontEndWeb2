import React from 'react';
import { MapPin } from 'lucide-react';
import { MdImage } from 'react-icons/md';
import "../styles/pages/_createEvent.scss";

export default function VenueCardGallery({
  venues = [],
  selectedVenue,
  setSelectedVenue,
  campusFilter = '',
  venueTypeFilter = '',
  minCapacity = 0,
}) {
  // ✅ Filter dynamically based on props
  const filteredVenues = venues.filter((venue) => {
    const campusMatch =
      !campusFilter ||
      venue.location?.toLowerCase().includes(campusFilter.toLowerCase());
    const typeMatch =
      !venueTypeFilter ||
      venue.type?.toLowerCase().includes(venueTypeFilter.toLowerCase()); // ✅ fixed
    const capacityMatch = !minCapacity || Number(venue.capacity) >= Number(minCapacity);
    return campusMatch && typeMatch && capacityMatch;
  });

  return (
    <section className="form-section">
      <div className="section-header">
        <h2 className="section-title">Venue Selection</h2>
      </div>

      <div className="venue-gallery">
        {filteredVenues.length === 0 ? (
          <p className="no-venues">No venues available that match your filters.</p>
        ) : (
          filteredVenues.map((venue, index) => (
            <div
              key={index}
              className={`venue-card ${selectedVenue?.name === venue.name ? 'selected' : ''}`}
              onClick={() => setSelectedVenue(venue)}
            >
              {/* Venue Info */}
              <div className="venue-info">
                <h3 className="venue-name">{venue.name}</h3>
                <p className="venue-location">
                  <MapPin size={14} /> {venue.location || 'Unknown location'}
                </p>
                <p className="venue-type">Type: {venue.type || '—'}</p> {/* ✅ added venue type */}
                <p className="venue-price">R{venue.price || '—'}</p>
              </div>

              {/* Venue Image */}
              <div className="venue-image">
                {venue.images && venue.images.length > 0 ? (
                  <img src={venue.images[0]} alt={venue.name} />
                ) : (
                  <div className="image-placeholder">
                    <MdImage size={40} color="#0077B6" />
                    <p>No image</p>
                  </div>
                )}
              </div>

              {/* Venue Availability */}
              <div className="venue-availability">
                <p>Live Availability:</p>
                <span className="capacity-badge">
                  Capacity: {venue.capacity || '—'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
