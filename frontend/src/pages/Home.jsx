import { useState } from "react";
import '../css/Home.css';

function Home() {
    const [formData, setFormData] = useState({
        title: '',
        startTime: '',
        endTime: '',
        date: '',
        venue: '',
        organizer: '',
        details: '',
        file: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
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
        setFormData({
            title: '',
            startTime: '',
            endTime: '',
            date: '',
            venue: '',
            organizer: '',
            details: '',
            file: null,
        });
    };

    return (
        <div className="form-main">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <section className="time">
                    <div className="form-group">
                        <label htmlFor="startTime">Start Time</label>
                        <input type="time" id="startTime" name="startTime" value={formData.startTime} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="endTime">End Time</label>
                        <input type="time" id="endTime" name="endTime" value={formData.endTime} onChange={handleChange} required />
                    </div>
                </section>


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
                    <label htmlFor="organizer">Organizer</label>
                    <input type="text" id="organizer" name="organizer" value={formData.organizer} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="details">Details</label>
                    <textarea id="details" name="details" value={formData.details} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="file">File</label>
                    <input type="file" id="file" name="file" onChange={handleFileChange} required />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Home;
