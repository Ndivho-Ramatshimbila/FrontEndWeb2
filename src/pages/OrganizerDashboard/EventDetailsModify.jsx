// src/pages/OrganizerDashboard/EventDetailsModify.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/pages/_eventdetails.scss";

const EventDetailsModify = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // Load event data from localStorage
    const submittedEvents = JSON.parse(localStorage.getItem('submittedEvents') || '[]');
    const eventData = submittedEvents.find(e => e.id === id);
    if (eventData) {
      setEvent(eventData);
    } else {
      // Fallback to static data if not found
      setEvent({
        id: id,
        title: "Event Not Found",
        venueType: "N/A",
        venue: "N/A",
        campus: "N/A",
        emailAddress: "",
        telephone: "",
        cell: "",
        typeOfFunction: "N/A",
        typeOfGuests: [],
        purposeOfFunction: "N/A",
        numberOfGuestsExpected: 0,
        dateOfCommencement: "",
        endingDate: "",
        timeOfCommencement: "",
        timeToLockup: "",
        useOfLiquor: "No",
        kitchenFacilities: "No",
        cleaningServices: "No",
        steelTable: 0,
        examTables: 0,
        plasticChairs: 0,
        parkingPlaces: 0,
        laptop: "No",
        sound: "No",
        screen: "No",
        videoConferencing: "No",
        dataProjector: "No",
        internetConnection: "No",
        microphone: "No",
        wifi: "No",
        remarks: "",
        brandingImage: [],
        proofOfPayment: null,
        banner: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      });
    }
  }, [id]);

  // 🔹 Navigate to Modify Form with prefilled event data
  const handleModify = () => {
    console.log("➡️ Sending event data to modify form:", event);
    navigate("/modify-event", { state: { eventData: event } });
  };

  if (!event) {
    return (
      <div className="event-details-page">
        <div className="top-bar">
          <button className="back-btn" onClick={() => navigate("/my-events")}>
            ← Back
          </button>
          <h2>Loading Event Details...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="event-details-page">
      <div className="top-bar">
        <button className="back-btn" onClick={() => navigate("/my-events")}>
          ← Back
        </button>
        <h2>Event Details</h2>
      </div>

      <div className="banner">
        <img src={event.banner} alt={event.title} />
      </div>

      <div className="details-container">
        <div className="event-section">
          <h3>Event Information</h3>
          <p><strong>{event.title}</strong></p>
          <p>Type of Function: {event.typeOfFunction}</p>
          <p>Purpose: {event.purposeOfFunction}</p>
          <p>Expected Guests: {event.numberOfGuestsExpected}</p>
          <p>Campus: {event.campus}</p>
          <p>Venue: {event.venue}</p>
          <p>Date: {event.dateOfCommencement}</p>
          <p>Time: {event.timeOfCommencement} - {event.timeToLockup}</p>
        </div>

        <div className="service-section">
          <h3>Services Required</h3>
          <p>Liquor: {event.useOfLiquor}</p>
          <p>Kitchen Facilities: {event.kitchenFacilities}</p>
          <p>Cleaning Services: {event.cleaningServices}</p>

          <h3>Resources</h3>
          <p>{event.plasticChairs} Chairs</p>
          <p>{event.examTables} Exam Tables</p>
          <p>{event.steelTable} Steel Tables</p>
          <p>{event.parkingPlaces} Parking Spaces</p>
          <p>Projector: {event.dataProjector}</p>
          <p>Microphone: {event.microphone}</p>
          <p>Sound: {event.sound}</p>
          <p>Internet: {event.internetConnection}</p>
        </div>
      </div>

      <div className="actions">
        <button
          className="modify-btn"
          onClick={handleModify}
        >
          Modify Details
        </button>
      </div>
    </div>
  );
};

export default EventDetailsModify;
