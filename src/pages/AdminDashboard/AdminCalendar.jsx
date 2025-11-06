import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../styles/pages/_admincalendar.scss";
import { useAdminCalendar } from "../../hooks/useCalendar";

export default function AdminCalendar() {
  const { availableDates, approvedEvents, addDates, deleteDate } = useAdminCalendar();
  const [selectedDate, setSelectedDate] = useState(null);
  const [newSlot, setNewSlot] = useState({ startTime: "09:00", endTime: "17:00" });

  const dateStr = selectedDate ? selectedDate.toISOString().split("T")[0] : null;

  const hasApprovedEvents = (date) => {
    const key = date.toISOString().split("T")[0];
    const dayEvents = approvedEvents.filter(e => e.date === key);
    return dayEvents.length > 0;
  };

  const isAvailable = (date) => {
    const key = date.toISOString().split("T")[0];
    return availableDates.some(d => d.date === key);
  };

  const getTileContent = ({ date }) => {
    return (
      <div className="dot-container">
        {hasApprovedEvents(date) && <span className="dot red-dot" />}
        {isAvailable(date) && <span className="dot blue-dot" />}
      </div>
    );
  };

  const handleAddSlot = () => {
    if (!dateStr) return;
    addDates([{ date: dateStr, ...newSlot, venueIds: [1] }]);
  };

  const handleDeleteSlot = (slot) => {
    deleteDate(slot.date, slot.startTime, slot.endTime);
  };

  return (
    <div className="admin-calendar-container">
      <h2>Admin Calendar</h2>
      <Calendar
        onClickDay={setSelectedDate}
        tileContent={getTileContent}
      />

      {selectedDate && (
        <div className="calendar-details">
          <p><strong>Selected Date:</strong> {selectedDate.toDateString()}</p>

          <h4>Approved Events:</h4>
          <ul>
            {approvedEvents.filter(e => e.date === dateStr).length === 0 && <li>No approved events</li>}
            {approvedEvents.filter(e => e.date === dateStr).map(e => (
              <li key={e.id}>
                {e.title} ({e.startTime} - {e.endTime})
              </li>
            ))}
          </ul>

          <h4>Available Slots:</h4>
          <ul>
            {availableDates.filter(d => d.date === dateStr).length === 0 && <li>No available slots</li>}
            {availableDates.filter(d => d.date === dateStr).map((d, idx) => (
              <li key={idx}>
                {d.startTime} - {d.endTime}, Venues: {d.venueIds.join(", ")}
                <button onClick={() => handleDeleteSlot(d)}>Remove</button>
              </li>
            ))}
          </ul>

          <div className="calendar-actions">
            <input 
              type="time" 
              value={newSlot.startTime} 
              onChange={e => setNewSlot({ ...newSlot, startTime: e.target.value })}
            />
            <input 
              type="time" 
              value={newSlot.endTime} 
              onChange={e => setNewSlot({ ...newSlot, endTime: e.target.value })}
            />
            <button onClick={handleAddSlot}>Add Availability Slot</button>
          </div>
        </div>
      )}
    </div>
  );
}
