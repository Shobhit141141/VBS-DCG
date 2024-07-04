import React, { useContext, useEffect, useState } from "react";
import "../css/Home.css";
import { deleteSlot, fetchBookingsBySocId } from "../../api/slotsApi";
import toast from "react-hot-toast";
import { SLOTS, VENUES } from "../../constants";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BackgroundContext } from "../context/BgContext";

function MySlots() {
  const [selectedVenue, setSelectedVenue] = useState("");
  const [todaySlots, setTodaySlots] = useState([]);

  const { handleBg } = useContext(BackgroundContext);

  const fetchTodaySlots = async () => {
    const socId = localStorage.getItem("socId");
    if (socId) {
      try {
        const response = await fetchBookingsBySocId(socId);
        console.log(response.result);
        setTodaySlots(response.result);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast.error("Failed to fetch bookings");
      }
    }
  };

  useEffect(() => {
    fetchTodaySlots();
  }, []);

  const handleDeleteSlot = async (id) => {
    try {
      await deleteSlot(id);
      toast.success("Slot deleted successfully");
      fetchTodaySlots();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete slot");
    }
  };

  const handleVenueChange = (venue) => {
    handleBg(venue);
    setSelectedVenue(venue);
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "long", year: "numeric", timeZone: "Asia/Kolkata" };
    return new Intl.DateTimeFormat("en-IN", options).format(new Date(dateString));
  };

  const renderEvents = () => {
    if (todaySlots.length === 0) {
      return <h1>No booked slots found</h1>;
    }

    let filteredSlots = todaySlots;
    if (selectedVenue) {
      filteredSlots = todaySlots.filter((slot) => slot.venue === selectedVenue);
    }

    if (filteredSlots.length === 0) {
      return <h1>No slots found for selected venue</h1>;
    }

    return (
      <div className="sections">
        {filteredSlots.map((slot) => (
          <div className="todays-details" key={slot._id}>
            <Link to={`/event/${slot._id}`}>
              <section>
                <h2>{VENUES[slot.venue]}</h2>
                <h3>
                  <b>Event:</b> {slot.title}
                </h3>
                <h3 className="date-event">
                 {formatDate(slot.date)}
                </h3>
                <h3>
                  <div>
                    <div className="all-slots">
                      {slot.slots.sort().map((item) => (
                        <p
                          style={{ marginLeft: "2px" }}
                          key={item}
                          className="each-slot"
                        >
                          {SLOTS[item]}
                        </p>
                      ))}
                      {slot.slots.length === 0 && <p>No slots booked</p>}
                    </div>
                  </div>
                </h3>
                <h3 className={`status-${slot.status.toLowerCase()}`}>
                  <div className="status-box">
                    <pre className="dot-symbol">• </pre>
                    <p>{slot.status}</p>
                  </div>
                </h3>
                <FaTrash
                  className="del-icon"
                  onClick={() => handleDeleteSlot(slot._id)}
                />
              </section>
            </Link>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="venue-tabs">
        <button
          className={selectedVenue === "" ? "active" : ""}
          onClick={() => handleVenueChange("")}
        >
          All
        </button>
        <button
          className={selectedVenue === "RAJ_SOIN" ? "active" : ""}
          onClick={() => handleVenueChange("RAJ_SOIN")}
        >
          RAJ SOIN HALL
        </button>
        <button
          className={selectedVenue === "BR_AUDI" ? "active" : ""}
          onClick={() => handleVenueChange("BR_AUDI")}
        >
          BR AUDI
        </button>
        <button
          className={selectedVenue === "SPS_13" ? "active" : ""}
          onClick={() => handleVenueChange("SPS_13")}
        >
          SPS 13
        </button>
      </div>

      {renderEvents()}
    </div>
  );
}

export default MySlots;
