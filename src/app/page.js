"use client";
// src/app/page.js
import { useState } from 'react';

export default function Home() {
  const [memberId, setMemberId] = useState('');
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchTrips = async () => {
    if (!memberId) {
      setError("Please enter a Member ID");
      return;
    }

    setError('');
    setLoading(true);
    
    try {
      const response = await fetch(`/api/trip?memberId=${memberId}`);
      if (!response.ok) throw new Error("Failed to fetch trips");

      const data = await response.json();
      setTrips(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Trip Management System</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter Member ID"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
          className="input-field"
        />
        <button onClick={fetchTrips} className="fetch-button">
          Get Trips
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      <h2>Trips:</h2>
      {trips.length > 0 ? (
        <ul className="trip-list">
          {trips.map((trip) => (
            <li key={trip.trip_id} className="trip-item">
              Trip ID: {trip.trip_id}
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>No trips found for this Member ID.</p>
      )}

      <style jsx>{`
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
          font-family: Arial, sans-serif;
        }
        .input-group {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }
        .input-field {
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 4px;
          margin-right: 10px;
          flex: 1; // Makes the input field take available space
        }
        .fetch-button {
          padding: 10px 20px;
          font-size: 16px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .fetch-button:hover {
          background-color: #005bb5;
        }
        .error-message {
          color: red;
          margin: 10px 0;
        }
        .trip-list {
          list-style: none;
          padding: 0;
        }
        .trip-item {
          padding: 10px;
          border: 1px solid #ddd;
          margin: 5px 0;
          border-radius: 4px;
          background-color: #f9f9f9;
        }
      `}</style>
    </div>
  );
}
