import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/Book.css";
import toast from "react-hot-toast";
import { SLOTS } from "../../constants";
import { bookSlot } from "../../api/slotsApi";
import { useNavigate } from "react-router-dom";
import ToolTip from "../components/ToolTip";

const Book = () => {
  const [formData, setFormData] = useState({
    title: "",
    slots: [],
    date: new Date().toISOString().slice(0, 10),
    venue: "",
    details: "",
    files: [],
    soc: localStorage.getItem("socId"),
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, checked, files } = e.target;
    if (name === "slots") {
      let updatedSlots;
      if (checked) {
        updatedSlots = [...formData.slots, value];
      } else {
        updatedSlots = formData.slots.filter((slot) => slot !== value);
      }
      setFormData({ ...formData, [name]: updatedSlots });
    } else if (name === "files") {
      setFormData({ ...formData, [name]: [...formData.files, ...files] });
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
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'slots') {
        formData[key].forEach(slot => data.append('slots', slot));
      } else if (key === 'files') {
        Array.from(formData[key]).forEach(file => data.append('images', file));
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      const response = await bookSlot(data);
      toast.success("Slot booking request created");
      console.log("Booking created:", response.data);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.error);
      console.error("Error creating booking:", error);
    }
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>
          <h3>Event Name</h3>
          <ToolTip text="Event name: (eg - orientation, speaker session)" />
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Event name: (eg - orientation, speaker session)"
        />
      </div>

      <div className="form-group">
        <label>
          <h3>Event Date</h3>
          <ToolTip text="Select Date" />
        </label>
        <DatePicker
          name="date"
          selected={formData.date}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
        />
      </div>

      <div className="form-group">
        <label>
          <h3>Venue</h3>
          <ToolTip text="Select Venue" />
        </label>
        <select name="venue" value={formData.venue} onChange={handleChange}>
          <option value="">Select Venue</option>
          <option value="RAJ_SOIN">RAJ SOIN HALL</option>
          <option value="BR_AUDI">BR AUDI</option>
          <option value="SPS_13">SPS 13</option>
        </select>
      </div>

      <div className="form-group">
        <label>
          <h3>Event Details</h3>
          <ToolTip text="Details of the event" />
        </label>
        <textarea
          name="details"
          value={formData.details}
          onChange={handleChange}
          placeholder="Details of the event"
        />
      </div>

      <div className="form-group">
        <h3>Select Slots</h3>
        {Object.keys(SLOTS).map((slotKey) => (
          <div key={slotKey} className="slot-group">
            <input
              type="checkbox"
              name="slots"
              value={slotKey}
              checked={formData.slots.includes(slotKey)}
              onChange={handleChange}
            />
            <p>{SLOTS[slotKey]}</p>
          </div>
        ))}
      </div>

      <div className="form-group">
        <label>
          <h3>Attach files related to event</h3>
          <ToolTip text="Attach PDF file containing all necessary details and docs" />
        </label>
        <input
          type="file"
          name="files"
          onChange={handleChange}
          multiple
          accept=".jpg,.jpeg,.png,.gif"
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Book;
