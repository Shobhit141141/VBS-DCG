import { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker styles
import '../css/Book.css'; // Import CSS file

const Book = () => {
  const [formData, setFormData] = useState({
    title: '',
    slots: [],
    date: new Date(), // Set initial date value to today
    venue: '',
    organizer: '',
    details: '',
    file: ''
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === 'slots') {
      const updatedSlots = checked ?
        [...formData.slots, value] :
        formData.slots.filter(slot => slot !== value);
      setFormData({ ...formData, [name]: updatedSlots });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/booking/book-slot', formData);
      console.log('Booking created:', response.data);
      
    } catch (error) {
      console.error('Error creating booking:', error);
      
    }
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <DatePicker
        name="date"
        selected={formData.date}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        required
      />
      <select
        name="venue"
        value={formData.venue}
        onChange={handleChange}
        required
      >
        <option value="">Select Venue</option>
        <option value="Venue 1">Venue 1</option>
        <option value="Venue 2">Venue 2</option>
        <option value="Venue 3">Venue 3</option>
      </select>
      <input
        type="text"
        name="organizer"
        value={formData.organizer}
        onChange={handleChange}
        placeholder="Organizer"
        required
      />
      <textarea
        name="details"
        value={formData.details}
        onChange={handleChange}
        placeholder="Details"
        required
      />
      <div>
        <p>Select Slots:</p>
        <label>
          <input
            type="checkbox"
            name="slots"
            value="slot1"
            checked={formData.slots.includes('slot1')}
            onChange={handleChange}
          />
          Slot 1
        </label>
        <label>
          <input
            type="checkbox"
            name="slots"
            value="slot2"
            checked={formData.slots.includes('slot2')}
            onChange={handleChange}
          />
          Slot 2
        </label>
        <label>
          <input
            type="checkbox"
            name="slots"
            value="slot3"
            checked={formData.slots.includes('slot3')}
            onChange={handleChange}
          />
          Slot 3
        </label>
        <label>
          <input
            type="checkbox"
            name="slots"
            value="slot4"
            checked={formData.slots.includes('slot4')}
            onChange={handleChange}
          />
          Slot 4
        </label>
      </div>
      <input
        type="file"
        name="file"
        onChange={handleChange}
        accept=".pdf,.doc,.docx"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Book;
