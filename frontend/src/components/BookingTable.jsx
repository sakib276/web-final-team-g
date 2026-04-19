import { deleteBooking } from "../api/api";

export default function BookingTable({ bookings, onCancel }) {
  const handleDelete = async (id) => {
    await deleteBooking(id);
    onCancel();
  };

  console.log("table", bookings);


  return (
    <table>
      <thead>
        <tr>
          <th>Resource</th>
          <th>Requested By</th>
          <th>Date</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map(b => {
          console.log(b);

          return (
            <tr key={b.id}>
              <td>{b.resource_id}</td>
              <td>{b.requested_by}</td>
              <td>{b.booking_date.toLocaleString()}</td>
              <td>{b.status}</td>
              <td>
                <button onClick={() => handleDelete(b.id)} className="cancel-btn">Cancel</button>
              </td>
            </tr>
          )
        })}

      </tbody>
    </table>
  );
}