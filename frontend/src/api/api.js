// const BASE = "/api";
const BASE = "http://localhost:5000/api";

export const getResources = () => {
  // console.log("Fetching resources...");
  return fetch(`${BASE}/resources`).then(r => r.json());
}

export const getBookings = () => 
     fetch(`${BASE}/bookings`).then(r => r.json());

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