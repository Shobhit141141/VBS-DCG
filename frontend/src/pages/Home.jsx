import { useEffect, useState } from 'react';
import '../css/Home.css';
import { fetchSlots } from '../../api/slotsApi';

function Home() {
  const [homeData, setHomeData] = useState({
    date: new Date(),
    status: '',
  });

  const handleGoToDate = () => {
    const inputDate = new Date(document.getElementById('dateInput').value);
    setHomeData({ ...homeData, date: inputDate });
  };

  const maxDate = new Date().toISOString().split('T')[0];

  const [todaySlots, setTodaySlots] = useState([]);

  const fetchTodaySlots = async () => {
    try {
      const slots = await fetchSlots({
        date: new Date().toISOString().slice(0, 10),
      });
      console.log(slots.data);
      setTodaySlots(slots.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodaySlots();
  }, []);

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
        {todaySlots.map((slot) => {
          return (
            <div key={slot._id} className='todays-details'>
              <section>
                <h2>{slot.venue}</h2>
                <h3>{slot.title}</h3>
                <h4>{slot.slots}</h4>
                <h4>Booked by : {slot.organizer}</h4>
                <h4>Status: {slot.status}</h4>
                <h5>{slot.details}</h5>
              </section>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
