import React from 'react';
import { useLocation } from 'react-router-dom';
import '../css/EventDetails.css';

const EventDetails = () => {
  const location = useLocation();
  const {slot} = location.state || {};

  if (!slot) {
    return <p>No event details available</p>;
  }

  return (
    <div className="event-details">
      <h2>{slot.title}</h2>
      <p><strong>Date:</strong> {slot.date}</p>
      <p><strong>Time:</strong> {slot.time}</p>
      <p><strong>Venue:</strong> {slot.venue}</p>
      <p><strong>Description:</strong> {slot.details}</p>
    </div>
  );
};

export default EventDetails;
