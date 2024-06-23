import axios from 'axios';
import { server_uri } from './authApi';

export const approveBooking = async (bookingId) => {
  try {
    const res = await axios.post(
      `${server_uri}/admin/approve-booking`,
      { bookingId },
      { headers: { Authorization: localStorage.getItem('token') } }
    );
    return res.data;
  } catch (error) {
    console.error('Error approving booking:', error);
    throw error;
  }
};

export const rejectBooking = async (bookingId) => {
  try {
    const res = await axios.post(
      `${server_uri}/admin/reject-booking`,
      { bookingId },
      { headers: { Authorization: localStorage.getItem('token') } }
    );
    return res.data;
  } catch (error) {
    console.error('Error rejecting booking:', error);
    throw error;
  }
};
