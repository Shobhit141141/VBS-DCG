import { useEffect, useState } from 'react';
import '../css/MySlots.css';
import { fetchSlots, deleteSlot } from '../../api/slotsApi'; // Import the deleteSlot function
import toast from 'react-hot-toast';
import { SLOTS, VENUES } from '../../constants';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

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

  return (
    <div>
      <div className='heading'>
        <h1>DTU CONSULTING GROUP</h1>
      </div>
      <div className='todays-details' id='Date'>
        <p>
          {homeData.date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        
      </div>

      {todaySlots.length === 0 && <h1>No booked slots found</h1>}
      <div className='sections'>
        {todaySlots.map((slot) => {
          return (
            <Link to={`/event/${slot._id}`}>
            <div key={slot._id} className='todays-details'>
              <section>
                <h2>{VENUES[slot.venue]}</h2>
                <h3>
                  <b>Event :</b> {slot.title}
                </h3>
                <h3>
                  <div style={{ display: 'flex' }}>
                    <b>Slots : </b>{'  '}
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
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
