// src/pages/OrganizerDashboard/EventDetails.jsx
import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "../../styles/pages/_eventdetails.scss";

// 🧩 Mock event data (can be replaced later with API or DB)
const mockEventDetails = {
  1: {
    id: 1,
    title: "Annual Tech Summit",
    venueType: "Auditorium",
    venue: "Innovation Hall",
    campus: "TUT Emalahleni Campus",
    emailAddress: "organizer@tut.ac.za",
    telephone: "013 000 0000",
    cell: "082 555 0000",
    typeOfFunction: "Academic",
    typeOfGuests: ["Students", "Staff"],
    purposeOfFunction: "To introduce students to tech innovations at TUT",
    numberOfGuestsExpected: 150,
    dateOfCommencement: "2025-11-15",
    endingDate: "2025-11-15",
    timeOfCommencement: "09:00 AM",
    timeToLockup: "14:00 PM",
    useOfLiquor: "Yes",
    kitchenFacilities: "Yes",
    cleaningServices: "Yes",
    steelTable: 10,
    examTables: 12,
    plasticChairs: 150,
    parkingPlaces: 30,
    laptop: "Yes",
    sound: "Yes",
    screen: "Yes",
    videoConferencing: "No",
    dataProjector: "Yes",
    internetConnection: "Yes",
    microphone: "Yes",
    wifi: "Yes",
    remarks: "Ensure projector setup is ready before 8:30 AM",
    brandingImage: [],
    proofOfPayment: null,
    banner: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
  },
};

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the event ID from state or params
  const eventId = location.state?.eventData?.id || id;

  // Fetch full event details from localStorage or mock data
  const getFullEventDetails = (eventId) => {
    // First, check localStorage for submitted events
    const submittedEvents = JSON.parse(localStorage.getItem('submittedEvents') || '[]');
    const submittedEvent = submittedEvents.find(event => event.id == eventId);
    if (submittedEvent) {
      return submittedEvent;
    }

    // Fallback to mock data
    return mockEventDetails[eventId] || Object.values(mockEventDetails)[0];
  };

  const event = getFullEventDetails(eventId);

  // 🔹 Navigate to Modify Form with prefilled event data
  const handleModify = () => {
    console.log("➡️ Sending event data to modify form:", event);
    navigate("/modify-event", { state: { eventData: event } });
  };

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

    </div>
  );
};

export default EventDetails;
