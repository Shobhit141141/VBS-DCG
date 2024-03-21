import { useState } from "react";
import '../css/Book.css';

function Book() {
    const [formData, setFormData] = useState({
        title: '',
        slots: [],
        date: '',
        venue: '',
        organizer: '',
        details: '',
        file: null,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            let updatedSlots;
            if (checked) {
                updatedSlots = [...formData.slots, name];
            } else {
                updatedSlots = formData.slots.filter(slot => slot !== name);
            }
            setFormData({
                ...formData,
                slots: updatedSlots
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            file: file,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Add your logic to handle form submission
    };

    return (
        <div className="form-main">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="venue">Venue</label>
                    <select id="venue" name="venue" value={formData.venue} onChange={handleChange} required>
                        <option value="">Select a venue</option>
                        <option value="Venue 1">Venue 1</option>
                        <option value="Venue 2">Venue 2</option>
                        <option value="Venue 3">Venue 3</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Slots</label><br />
                    <label><input type="checkbox" name="slot1" checked={formData.slots.includes("slot1")} onChange={handleChange} /> Slot 1 (08:00 - 11:00)</label><br />
                    <label><input type="checkbox" name="slot2" checked={formData.slots.includes("slot2")} onChange={handleChange} /> Slot 2 (11:00 - 14:00)</label><br />
                    <label><input type="checkbox" name="slot3" checked={formData.slots.includes("slot3")} onChange={handleChange} /> Slot 3 (14:00 - 17:00)</label><br />
                    <label><input type="checkbox" name="slot4" checked={formData.slots.includes("slot4")} onChange={handleChange} /> Slot 4
                    (17:00 - 20:00)</label><br />
                </div>

                <div className="form-group">
                    <label htmlFor="organizer">Organizer</label>
                    <input type="text" id="organizer" name="organizer" value={formData.organizer} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="details">Details</label>
                    <textarea id="details" name="details" value={formData.details} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="file">File</label>
                    <input type="file" id="file" name="file" onChange={handleFileChange}  />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Book;
