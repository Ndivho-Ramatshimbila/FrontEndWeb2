// src/hooks/useOrganizerCalendar.js
import { useState, useEffect } from "react";
import { getAvailableDates as getAdminAvailableDates, getApprovedEvents as getAdminApprovedEvents } from "../data/calendar";

export const useOrganizerCalendar = () => {
  const [availableDates, setAvailableDates] = useState([]);
  const [approvedEvents, setApprovedEvents] = useState([]);

  useEffect(() => {
    setAvailableDates(getAdminAvailableDates());
    setApprovedEvents(getAdminApprovedEvents());
  }, []);

  const isDateFullyBooked = (date) => {
    const key = date.toISOString().split("T")[0];
    return approvedEvents.some(e => e.date === key);
  };

  const isDateAvailable = (date) => {
    const key = date.toISOString().split("T")[0];
    return availableDates.some(d => d.date === key) && !isDateFullyBooked(date);
  };

  return { availableDates, approvedEvents, isDateFullyBooked, isDateAvailable };
};
