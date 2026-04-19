const BASE = "/api";

export const getResources = async () => {
  return [
    {
      id: 1,
      name: "A",
      type: "Room",
      capacity: 30
    },
    {
      id: 2,
      name: "B",
      type: "Room",
      capacity: 30
    }
  ]
}

export const getBookings = async () => {
  return [
    {
      id: 1,
      resource_id: 1,
      requested_by: "A",
      booking_date: new Date(),
      status: "Confirmed"
    },
    {
      id: 2,
      resource_id: 1,
      requested_by: "B",
      booking_date: new Date(),
      status: "Confirmed"
    },
  ]

}

export const createBooking = (data) =>
  fetch(`${BASE}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  }).then(r => r.json());

export const deleteBooking = (id) =>
  fetch(`${BASE}/bookings/${id}`,
    { method: "DELETE" }).then(r => r.json());