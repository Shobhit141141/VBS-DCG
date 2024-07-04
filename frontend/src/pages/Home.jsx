import React, { useContext, useEffect, useState } from "react";
import "../css/Home.css";
import { fetchSlots, deleteSlot } from "../../api/slotsApi";

import toast from "react-hot-toast";
import { SLOTS, VENUES } from "../../constants";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { approveBooking, rejectBooking } from "../../api/adminApi";
import { BackgroundContext } from "../context/BgContext";

function Home() {
  const { role } = useContext(AuthContext);
  const [homeData, setHomeData] = useState({
    date: new Date(),
    status: "",
  });
  const [selectedVenue, setSelectedVenue] = useState("");
  const [todaySlots, setTodaySlots] = useState([]);
  const [confirmAction, setConfirmAction] = useState({
    action: "",
    bookingId: null,
  });

  const { handleBg } = useContext(BackgroundContext);

  const changeBackground = (venue) => {
    handleBg(venue);
  };

  const handleGoToDate = () => {
    const inputDate = new Date(document.getElementById("dateInput").value);
    if (inputDate == "Invalid Date") {
      toast.error("Select a valid date");
      return;
    }
    setHomeData({ ...homeData, date: inputDate });
  };

  const maxDate = new Date().toISOString().split("T")[0];

  const fetchTodaySlots = async () => {
    try {
      const slots = await fetchSlots({
        date: new Date(homeData.date).toISOString().slice(0, 10),
      });
      setTodaySlots(slots.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodaySlots();
  }, [homeData]);

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

  const handleApprove = async (bookingId) => {
    setConfirmAction({ action: "approve", bookingId });
  };

  const handleReject = async (bookingId) => {
    setConfirmAction({ action: "reject", bookingId });
  };

  const confirmActionHandler = async () => {
    const { action, bookingId } = confirmAction;
    if (action === "approve") {
      try {
        const result = await approveBooking(bookingId);
        toast.success("Booking approved successfully");
        fetchTodaySlots();
      } catch (error) {
        console.error("Error approving booking:", error);
        toast.error("Failed to approve booking");
      }
    } else if (action === "reject") {
      try {
        const result = await rejectBooking(bookingId);
        toast.success("Booking rejected successfully");
        fetchTodaySlots();
      } catch (error) {
        console.error("Error rejecting booking:", error);
        toast.error("Failed to reject booking");
      }
    }

    // Clear the confirmation action after handling
    setConfirmAction({ action: "", bookingId: null });
  };

  const renderEvents = () => {
    if (todaySlots.length === 0) {
      return <h1>No booked slots found</h1>;
    }

    let filteredSlots = todaySlots;
    if (selectedVenue) {
      filteredSlots = todaySlots.filter((slot) => slot.venue === selectedVenue);
    }

    if (role !== "admin") {
      filteredSlots = filteredSlots.filter(
        (slot) => slot.status === "Approved"
      );
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
                {/* <h3>
                  <b>Event :</b> {slot.title}
                </h3>
                
                <h3>
                  <b>Booked by :</b> {slot.organizer}
                </h3> */}

                <h3>
                {slot.title} <b>by {slot.organizer}</b> 
                </h3>

                <h3>
                  <div>
                
                    <div className="all-slots">
                      {slot.slots.sort().map((item) => (
                        <p style={{ marginLeft: "2px" }} key={item} className="each-slot">
                          {SLOTS[item]}
                        </p>
                      ))}
                      {slot.slots.length === 0 && <p>No slots booked</p>}
                    </div>
                  </div>
                </h3>
                {role === "admin" && (
                  <h3
                    className={`status-${slot.status.toLowerCase()}`}
                  >
                   <div className="status-box">
                   <pre className="dot-symbol">• </pre>
                   <p>{slot.status}</p>
                   </div>
                  </h3>
                )}
              </section>
            </Link>
            {role === "admin" && (
              <div className="admin-panel">
                <button
                  className="button-approve"
                  onClick={() => handleApprove(slot._id)}
                >
                  Approve
                </button>
                <button
                  className="button-reject"
                  onClick={() => handleReject(slot._id)}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="todays-details" id="Date">
        <p>
          {homeData.date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <div id="button-date">
          <input type="date" id="dateInput" min={maxDate} />
          <button onClick={handleGoToDate}>Go to </button>
        </div>
      </div>

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

      {/* Confirmation Dialog */}
      {confirmAction.action && (
        <div className="confirmation">
          <div className="confirmation-dialog">
            <p>Are you sure you want to {confirmAction.action} this booking?</p>
            <button onClick={confirmActionHandler}>Confirm</button>
            <button
              onClick={() => setConfirmAction({ action: "", bookingId: null })}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* {confirmAction.action && (
        <div className="confirmation">
          <div className="confirmation-dialog">
            <p className="conf-message">Are you sure you want to {confirmAction.action === "approve" ? <p className="conf-approve">Approve</p> : <p className="conf-reject">Reject</p> } this booking?</p>
            <button onClick={confirmActionHandler}>Confirm</button>
            <button
              onClick={() => setConfirmAction({ action: "", bookingId: null })}
            >
              Cancel
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default Home;
