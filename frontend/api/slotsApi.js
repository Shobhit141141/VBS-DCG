import { server_uri } from './authApi';
import axios from 'axios';

export const fetchSlots = async (slotDetails) => {
  const res = await axios.post(
    `${server_uri}/booking/fetch/booked-slots`,
    {
      date: slotDetails.date,
      venue: slotDetails.venue,
    },
    { headers: { Authorization: localStorage.getItem('soc-token') } }
  );
  return res;
};

export const bookSlot = async (slotDetails) => {
  const res = await axios.post(
    `${server_uri}/booking/book-slot`,
    slotDetails,
    { headers: { Authorization: localStorage.getItem('soc-token') } }
  );
  return res;
};
