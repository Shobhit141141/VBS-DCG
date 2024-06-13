import React, { useEffect, useState } from 'react';
import '../css/Holidays.css';

const Holidays = () => {
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    fetch('/holidays.json')
      .then(response => response.json())
      .then(data => setHolidays(data));
  }, []);

  return (
    <div>
      <h1>Holiday dates for the University</h1>
      <h3>Booking shall be closed on the following dates</h3>
      <div className="holiday_table_container">
        <table className="holiday_table">
          <thead>
            <tr>
              <th>Holiday</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {holidays.map((holiday, index) => (
              <tr key={index}>
                <td>{holiday.holiday}</td>
                <td>{holiday.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Holidays;