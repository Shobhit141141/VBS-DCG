import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../css/Event.css"
import { fetchSlot } from '../../api/slotsApi';
import { getImage } from '../utils/imageUtil';

function Event() {
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchSlotDetails = async () => {
      try {
        const response = await fetchSlot({ id });
        setBooking(response.result);
        console.log(response.result)
      } catch (error) {
        setError(error.message);
      }
    };



    fetchSlotDetails();
  }, [id]);


  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!booking) {
    return <div>Loading...</div>;
  }

  return (
    <div className="booking-details">
      <h2>Booking Details</h2>
      <p><strong>Title:</strong> {booking.title}</p>
      <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
      <p><strong>Venue:</strong> {booking.venue}</p>
      <p><strong>Organizer:</strong> {booking.organizer}</p>
      <p><strong>Details:</strong> {booking.details}</p>
      <div className='event-img-container'>
      {booking.file && booking.file.map((file,index) => (
        <img src={file}alt="" className='event-image'/>
      ))}
      </div>
    </div>
  );
}

export default Event;
