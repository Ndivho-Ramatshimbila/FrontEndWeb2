import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../styles/pages/AdminCalendar.scss";

export default function AdminCalendar() {
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleDayClick = (date) => {
    const isoDate = date.toISOString().split("T")[0];
    setSelectedDate(isoDate);
    setEventTitle("");
    setStartTime("");
    setEndTime("");
    setModalVisible(true);
  };

  const checkConflict = (date, newStart, newEnd) => {
    const dayEvents = events[date] || [];
    for (let e of dayEvents) {
      if (
        (newStart >= e.startTime && newStart < e.endTime) ||
        (newEnd > e.startTime && newEnd <= e.endTime) ||
        (newStart <= e.startTime && newEnd >= e.endTime)
      ) {
        return true;
      }
    }
    return false;
  };

  const handleSaveEvent = () => {
    if (!eventTitle || !startTime || !endTime) {
      alert("Please enter title, start time, and end time.");
      return;
    }

    if (startTime >= endTime) {
      alert("Start time must be before end time.");
      return;
    }

    if (checkConflict(selectedDate, startTime, endTime)) {
      alert("This event overlaps with another event.");
      return;
    }

    const dayEvents = events[selectedDate] || [];
    const updatedDayEvents = [...dayEvents, { title: eventTitle, startTime, endTime }];
    setEvents({ ...events, [selectedDate]: updatedDayEvents });

    setModalVisible(false);
    setEventTitle("");
    setStartTime("");
    setEndTime("");
    setSelectedDate("");
  };

  const tileContent = ({ date }) => {
    const isoDate = date.toISOString().split("T")[0];
    return events[isoDate] ? <div className="dot"></div> : null;
  };

  return (
    <div className="admin-calendar-container">
      <h2 className="header">Admin Event Calendar</h2>

      <Calendar
        onClickDay={handleDayClick}
        tileContent={tileContent}
        className="calendar"
      />

      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal">
            <h3 className="modal-header">Add Event - {selectedDate}</h3>

            <input
              type="text"
              placeholder="Event Title"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              className="input"
            />
            <input
              type="time"
              placeholder="Start Time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="input"
            />
            <input
              type="time"
              placeholder="End Time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="input"
            />

            <div className="modal-buttons">
              <button className="btn save" onClick={handleSaveEvent}>
                Save
              </button>
              <button className="btn cancel" onClick={() => setModalVisible(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
