import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/Book.css';
import toast from 'react-hot-toast';
import { SLOTS } from '../../constants';
import { bookSlot } from '../../api/slotsApi';
import { useNavigate } from 'react-router-dom';

const Book = () => {
  const [formData, setFormData] = useState({
    title: '',
    slots: [],
    date: new Date().toISOString().slice(0, 10),
    venue: '',
    details: '',
    file: '',
    soc: localStorage.getItem('socId'),
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === 'slots') {
      const updatedSlots = checked
        ? [...formData.slots, value]
        : formData.slots.filter((slot) => slot !== value);
      setFormData({ ...formData, [name]: updatedSlots });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date: new Date(date).toISOString().slice(0, 10),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await bookSlot(formData)
      toast.success('Slot booking request created');
      console.log('Booking created:', response.data);
      navigate('/')
      
    } catch (error) {
      toast.error(error.response.data.error);
      console.error('Error creating booking:', error);
    }
  };

  return (
    <form
      style={{ width: '100%', textAlign: 'left', padding: '10px' }}
      className='booking-form'
      onSubmit={handleSubmit}
    >
      <input
        type='text'
        name='title'
        value={formData.title}
        onChange={handleChange}
        placeholder='Event name: (eg - orientation, speaker session)'
        required
      />
      <DatePicker
        name='date'
        selected={formData.date}
        onChange={handleDateChange}
        dateFormat='yyyy-MM-dd'
        required
      />
      <select
        name='venue'
        value={formData.venue}
        onChange={handleChange}
        required
      >
        <option value=''>Select Venue</option>
        <option value='RAJ_SOIN'>RAJ SOIN HALL</option>
        <option value='BR_AUDI'>BR AUDI</option>
        <option value='SPS_13'>SPS 13</option>
      </select>
      <textarea
        name='details'
        value={formData.details}
        onChange={handleChange}
        placeholder='Details of the event'
        required
      />
      <div>
        <p>Select Slots:</p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'normal',
            gap: '0',
          }}
        >
          <input
            type='checkbox'
            name='slots'
            value='slot1'
            checked={formData.slots.includes('slot1')}
            onChange={handleChange}
          />
          <label style={{ width: '100%' }}>{SLOTS['slot1']}</label>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'normal',
            gap: '0',
          }}
        >
          <input
            type='checkbox'
            name='slots'
            value='slot2'
            checked={formData.slots.includes('slot2')}
            onChange={handleChange}
          />
          <label style={{ width: '100%' }}>{SLOTS['slot2']}</label>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'normal',
            gap: '0',
          }}
        >
          <input
            type='checkbox'
            name='slots'
            value='slot3'
            checked={formData.slots.includes('slot3')}
            onChange={handleChange}
          />
          <label style={{ width: '100%' }}>{SLOTS['slot3']}</label>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'normal',
            gap: '0',
          }}
        >
          <input
            type='checkbox'
            name='slots'
            value='slot4'
            checked={formData.slots.includes('slot4')}
            onChange={handleChange}
          />
          <label style={{ width: '100%' }}>{SLOTS['slot4']}</label>
        </div>
      </div>
      <label>Attatch PDF file containing all necessary details and docs</label>
      <input
        type='file'
        name='file'
        onChange={handleChange}
        accept='.pdf,.doc,.docx'
      />
      <button type='submit'>Submit</button>
    </form>
  );
};

export default Book;
