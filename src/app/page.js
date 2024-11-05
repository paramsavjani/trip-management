"use client";

import { useState } from "react";

export default function Home() {
  const [memberId, setMemberId] = useState("");
  const [trips, setTrips] = useState([]);

  const fetchTrips = async () => {
    const response = await fetch(`/api/trip?memberId=${memberId}`);
    const data = await response.json();
    console.log(data);
    setTrips(data);
  };

  return (
    <div>
      <h1>Trip Management</h1>
      <input
        type="text"
        placeholder="Enter Member ID"
        value={memberId}
        onChange={(e) => setMemberId(e.target.value)}
      />
      <button onClick={fetchTrips}>Get Trips</button>

      <h2>Trips:</h2>
      <ul>
        {trips.map((trip) => (
          <li key={trip.trip_id}>Trip ID: {trip.trip_id}</li>
        ))}
      </ul>
    </div>
  );
}
