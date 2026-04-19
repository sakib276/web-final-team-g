import { useEffect, useState } from "react";
import { getBookings } from "../api/api";
import BookingTable from "../components/BookingTable";

export default function Schedule() {
  const [bookings, setBookings] = useState([]);

  
  const load = () => getBookings().then(r => setBookings(r));
  // console.log(bookings);

  useEffect(() => { load(); }, []);

  return (
    <div>
      <h2>All Bookings</h2>
      <BookingTable bookings={bookings} onCancel={load} />
    </div>
  );
}