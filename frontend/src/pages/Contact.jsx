import React, { useState } from 'react';
import '../css/Contact.css';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!message) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted', { name, email, message });
      // Perform the form submission logic here
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="contact-container">
      <a href="mailto:contact@dtu.edu" className="contact-email">contact@dtu.edu</a>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Your Name"
            className="contact-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="input-group">
          <input
            type="email"
            placeholder="Your Email"
            className="contact-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="input-group">
          <textarea
            placeholder="Your Message"
            className="contact-textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {errors.message && <span className="error">{errors.message}</span>}
        </div>
        <button type="submit" className="contact-submit">Submit</button>
      </form>
    </div>
  );
};

export default Contact;
