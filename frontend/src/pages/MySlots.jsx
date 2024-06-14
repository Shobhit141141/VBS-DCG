
import React, { useEffect, useState } from 'react';
import '../css/Home.css';
import { fetchSlots, deleteSlot } from '../../api/slotsApi';
import toast from 'react-hot-toast';
import { SLOTS, VENUES } from '../../constants';
import { FaTrash } from 'react-icons/fa';

function Home() {
  const [homeData, setHomeData] = useState({
    date: new Date(),
    status: '',
  });
  const handleGoToDate = () => {
    const inputDate = new Date(document.getElementById('dateInput').value);
    if (inputDate == 'Invalid Date') {
      toast.error('Select a valid date');
      return;
    }
    setHomeData({ ...homeData, date: inputDate });
  };

  const maxDate = new Date().toISOString().split('T')[0];

  const [todaySlots, setTodaySlots] = useState([]);

  const fetchTodaySlots = async () => {
    try {
      // Dummy data to simulate slots
      const dummySlots = [
        {
          _id: '1',
          venue: 'venue1',
          title: 'Dummy Event 1',
          slots: ['slot1', 'slot2'],
          organizer: 'Organizer 1',
          status: 'Booked',
          details: 'Details for slot 1',
        },
        {
          _id: '2',
          venue: 'venue2',
          title: 'Dummy Event 2',
          slots: ['slot3', 'slot4'],
          organizer: 'Organizer 2',
          status: 'Booked',
          details: 'Details for slot 2',
        },
        {
          _id: '3',
          venue: 'venue3',
          title: 'Dummy Event 3',
          slots: ['slot5', 'slot6'],
          organizer: 'Organizer 3',
          status: 'Booked',
          details: 'Details for slot 3',
        },
      ];
      setTodaySlots(dummySlots);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodaySlots();
  }, [homeData]);

  const handleDeleteSlot = async (id) => {
    try {
      // Dummy function as deletion doesn't actually occur in this example
      toast.success('Slot deleted successfully');
      fetchTodaySlots();
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete slot');
    }
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
          <button onClick={handleGoToDate}>Go to </button>
        </div>
      </div>

      <div className='sections'>
        {todaySlots.length === 0 && <h1>No booked slots found</h1>}
        {todaySlots.map((slot) => {
          return (
            <div key={slot._id} className='todays-details section'>
              <section>
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

                <FaTrash
                  className='del-icon'
                  onClick={() => handleDeleteSlot(slot._id)}
                />
              </section>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
