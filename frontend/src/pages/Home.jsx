import { useContext, useEffect, useState } from 'react';
import '../css/Home.css';
import { fetchSlots, deleteSlot} from '../../api/slotsApi';

import toast from 'react-hot-toast';
import { SLOTS, VENUES } from '../../constants';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { approveBooking, rejectBooking } from '../../api/adminApi';

function Home() {
  const { role } = useContext(AuthContext);
  const [homeData, setHomeData] = useState({
    date: new Date(),
    status: '',
  });
  const [selectedVenue, setSelectedVenue] = useState('');
  const [todaySlots, setTodaySlots] = useState([]);

  const handleGoToDate = () => {
    const inputDate = new Date(document.getElementById('dateInput').value);
    if (inputDate == 'Invalid Date') {
      toast.error('Select a valid date');
      return;
    }
    setHomeData({ ...homeData, date: inputDate });
  };

  const maxDate = new Date().toISOString().split('T')[0];

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

  useEffect(() => {
    fetchTodaySlots();
  }, [homeData]);

  // const handleDeleteSlot = async (id) => {
  //   try {
  //     await deleteSlot(id);
  //     toast.success('Slot deleted successfully');
  //     fetchTodaySlots();
  //   } catch (error) {
  //     console.log(error);
  //     toast.error('Failed to delete slot');
  //   }
  // };

  const handleVenueChange = (venue) => {
    setSelectedVenue(venue);
  };

  const handleApprove = async (bookingId) => {
    try {
      const result = await approveBooking(bookingId);
      toast.success('Booking approved successfully');
      fetchTodaySlots()
      // Optionally update UI or fetch updated data
    } catch (error) {
      console.error('Error approving booking:', error);
      toast.error('Failed to approve booking');
    }
  };

  const handleReject = async (bookingId) => {
    try {
      const result = await rejectBooking(bookingId);
      toast.success('Booking rejected successfully');
      fetchTodaySlots()
      // Optionally update UI or fetch updated data
    } catch (error) {
      console.error('Error rejecting booking:', error);
      toast.error('Failed to reject booking');
    }
  };

  const renderEvents = () => {
    if (todaySlots.length === 0) {
      return <h1>No booked slots found</h1>;
    }

    let filteredSlots = todaySlots;
    if (selectedVenue) {
      filteredSlots = todaySlots.filter((slot) => slot.venue === selectedVenue);
    }

    if (filteredSlots.length === 0) {
      return <h1>No slots found for selected venue</h1>;
    }

    return (
      <div className='sections'>
        {filteredSlots.map((slot) => (
          <div className='todays-details'>
               <Link to={`/event/${slot._id}`} key={slot._id}>
              <section className='eventSection'>
                <h2>{VENUES[slot.venue]}</h2>
                <h3>
                  <b>Event :</b> {slot.title}
                </h3>
                <h3>
                  <div style={{ display: 'flex' }}>
                    <b>Slots : </b>{' '}
                    <div>
                      {slot.slots.sort().map((item) => (
                        <p style={{ marginLeft: '2px' }} key={item}>
                          {SLOTS[item]}
                        </p>
                      ))}
                      {slot.slots.length === 0 && <p>No slots booked</p>}
                    </div>
                  </div>
                </h3>
                <h3>
                  <b>Booked by :</b> {slot.organizer}
                </h3>
                <h3>
                  <b>Status:</b> {slot.status}
                </h3>
                <h5>{slot.details}</h5>

             

                {/* <FaTrash
                  className='del-icon'
                  onClick={() => handleDeleteSlot(slot._id)}
                /> */}
              </section>
               </Link>
               {role === 'admin' && (
                  <div>
                    <button onClick={() => handleApprove(slot._id)}>Approve</button>
                    <button onClick={() => handleReject(slot._id)}>Reject</button>
                  </div>
                )}
            </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className='todays-details' id='Date'>
        <p>
          {homeData.date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <div id='button-date'>
          <input type='date' id='dateInput' min={maxDate} />
          <button className='goToDateButton' onClick={handleGoToDate}>Go to </button>
        </div>
      </div>

      <div className='venue-tabs'>
        <button className='venueButton' onClick={() => handleVenueChange('')}>All</button>
        <button className='venueButton' onClick={() => handleVenueChange('RAJ_SOIN')}>RAJ SOIN HALL</button>
        <button className='venueButton' onClick={() => handleVenueChange('BR_AUDI')}>BR AUDI</button>
        <button className='venueButton' onClick={() => handleVenueChange('SPS_13')}>SPS 13</button>
      </div>

      {renderEvents()}
    </div>
  );
}

export default Home;
