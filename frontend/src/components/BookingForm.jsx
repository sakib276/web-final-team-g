import { useState } from "react";
import { createBooking } from "../api/api";

export default function BookingForm({ resourceId, onBooked }) {
  const [requestedBy, setRequestedBy] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async () => {
    if (!requestedBy || !bookingDate) {
      setMsg("⚠️ All fields are required.");
      return;
    }
    setLoading(true);
    try {
      await createBooking({ resource_id: resourceId, requested_by: requestedBy, booking_date: bookingDate });
      setMsg("✅ Booking confirmed!");
      onBooked();
    } catch (err) {
      setMsg(err.response?.data?.message || "❌ Error creating booking.");
    }
    setLoading(false);
  };

  return (
    <div className="form">
      <input placeholder="Requested By" value={requestedBy} onChange={e => setRequestedBy(e.target.value)} />
      <input type="date" value={bookingDate} onChange={e => setBookingDate(e.target.value)} />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Submitting..." : "Confirm Booking"}
      </button>
      {msg && <p>{msg}</p>}
    </div>
  );
}