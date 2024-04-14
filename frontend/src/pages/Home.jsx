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
            <div className="todays-details" id="Date">
                <p>{homeData.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <div id="button-date">
                    <input type="date" id="dateInput" min={maxDate} />
                    <button onClick={handleGoToDate}>Go to </button>
                </div>
            </div>

            <div className="sections">
                <div className="todays-details">
                    <section>
                        <h2> Venue 1</h2>
                        <h3>Event 1</h3>
                        <h4>Slots: 1(8-11) 
                        </h4>
                        <h4> 2(12-15)</h4>
                        <h4>Status: Pending</h4>
                        <h5>more details</h5>
                    </section>
                </div>

                <div className="todays-details">
                    <section>
                        <h2>Venue 1</h2>
                        <h3> Event 2</h3>
                        <h4>Slots: 1(8-11)</h4>
                        <h4> 2(12-15)</h4>
                        <h4>Status: Approved</h4>
                        <h5>more details</h5>
                    </section>
                </div>

                <div className="todays-details">
                    <section>
                        <h2>Venue 1</h2>
                        <h3>Event 3</h3>
                        <h4>Slots: 1(8-11) </h4>
                        <h4> 2(12-15)</h4>
                        <h4>Status: Pending</h4>
                        <h5>more details</h5>
                    </section>
                </div>
                <div className="todays-details">
                    <section>
                        <h2>Venue 1</h2>
                        <h3> Event 4</h3>
                        <h4>Slots: 1(8-11)</h4>
                        <h4> 2(12-15)</h4>
                        <h4>Status: Approved</h4>
                        <h5>more details</h5>
                    </section>
                </div>
                <div className="todays-details">
                    <section>
                        <h2>Venue 1</h2>
                        <h3> Event 5</h3>
                        <h4>Slots: 1(8-11)</h4>
                        <h4> 2(12-15)</h4>
                        <h4>Status: Approved</h4>
                        <h5>more details</h5>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Home;
