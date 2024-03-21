import React, { useState } from "react";
import '../css/Home.css'

function Home() {
    const [homeData, setHomeData] = useState({
        date: new Date(),
        status: '',
    });

    const handleGoToDate = () => {
        const inputDate = new Date(document.getElementById("dateInput").value);
        setHomeData({ ...homeData, date: inputDate });
    };

    const maxDate = new Date().toISOString().split("T")[0]; 

    return (
        <div>
            <h1>Current Date:</h1>
            <p>{homeData.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            

           
            <input type="date" id="dateInput" min={maxDate} />
            <button onClick={handleGoToDate}>Go to Date</button>

            <div className="todays-details">
                <section>
                    <h2>Event 1</h2>
                    <h4>Organized by: Soc1</h4>
                    <h4>Status: Pending</h4>
                </section>
            </div>

            <div className="todays-details">
                <section>
                    <h2>Event 2</h2>
                    <h4>Organized by: Soc2</h4>
                    <h4>Status: Pending</h4>
                </section>
            </div>

            <div className="todays-details">
                <section>
                    <h2>Event 1</h2>
                    <h4>Organized by: Soc3</h4>
                    <h4>Status: Pending</h4>
                </section>
            </div>
        </div>
    );
}

export default Home;
