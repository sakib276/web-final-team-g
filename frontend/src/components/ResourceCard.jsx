import { useState } from "react";
import BookingForm from "./BookingForm";

export default function ResourceCard({ resource, onBooked }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="card">
      <h3>{resource.name}</h3>
      <p>Type: {resource.type}</p>
      <p>Capacity: {resource.capacity}</p>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close" : "Book Now"}
      </button>
      {showForm && (
        <BookingForm
          resourceId={resource.id}
          onBooked={() => { setShowForm(false); onBooked(); }}
        />
      )}
    </div>
  );
}