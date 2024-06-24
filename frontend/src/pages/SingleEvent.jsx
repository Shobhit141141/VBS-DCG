import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../css/Event.css"
import toast from 'react-hot-toast';
import { fetchSlot, deleteSlot } from '../../api/slotsApi';
import { getImage } from '../utils/imageUtil';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { FaTrash } from 'react-icons/fa';

function Event() {
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const fetchTodaySlots = async () => {
    try {
      const slots = await fetchSlots({
        date: new Date(homeData.date).toISOString().slice(0, 10),
      });
      setTodaySlots(slots.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteSlot = async (id) => {
    try {
      await deleteSlot(id);
      toast.success('Slot deleted successfully');
      fetchTodaySlots();
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete slot');
    }
  };

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
      <p><strong>Booking ID:</strong> {booking._id}</p>
      <p><strong>Title:</strong> {booking.title}</p>
      <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
      <p><strong>Venue:</strong> {booking.venue}</p>
      <p><strong>Organizer:</strong> {booking.organizer}</p>
      <p><strong>Details:</strong> {booking.details}</p>
      <p><strong>Status:</strong> {booking.status}</p>
      <FaTrash
          className='del-icon'
          onClick={() => handleDeleteSlot(id)}
            />
      <div className='event-img-container'>
      {booking.file && booking.file.map((file,index) => (
        <Zoom
        zoomMargin={90} 
        overlayBgColorEnd="rgba(0, 0, 0, 0.85)" 
        transitionDuration={150} 
        classDialog="custom-zoom-zoomed"
        className="custom-zoom">
        <img src={file}alt="" className='event-image'/>
        </Zoom>
      ))}
      </div>
    </div>
  );
}

export default Event;
