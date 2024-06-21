import { server_uri } from "./authApi";
import axios from "axios";

export const fetchSlots = async (slotDetails) => {
  const res = await axios.post(
    `${server_uri}/booking/fetch/booked-slots`,
    {
      date: slotDetails.date,
      venue: slotDetails.venue,
    },
    { headers: { Authorization: localStorage.getItem("token") } }
  );
  return res;
};

export const fetchSlot = async ({ id }) => {
    const res = await axios.get(
      `${server_uri}/booking/fetch/booked-slot/${id}`,
      { headers: { Authorization: localStorage.getItem("token") } }
    );
    return res.data; 
 
};
export const bookSlot = async (slotDetails) => {
  const res = await axios.post(
    `${server_uri}/booking/book-slot`,
    slotDetails,
    { headers: { Authorization: localStorage.getItem('token') } }
  );
  return res;
};

export const deleteSlot = async (slotId) => {
  const res = await axios.delete(
    `${server_uri}/booking/delete-slot/${slotId}`,
    { headers: { Authorization: localStorage.getItem("token") } }
  );
  return res;
};
