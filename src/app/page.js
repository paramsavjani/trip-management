"use client";
// src/app/page.js
import { useState } from "react";

export default function Home() {
  const [memberId, setMemberId] = useState("");
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTrips = async () => {
    if (!memberId) {
      setError("Please enter a Member ID");
      return;
    }

    setError("");
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

      {loading && <div className="loader"></div>}
      {error && <p className="error-message">{error}</p>}

      <h2>Trips:</h2>
      {trips.length > 0 ? (
        <div className="trip-list">
          {trips.map((trip, i) => (
            <div key={i} className="trip-item">
              <h3>Trip ID: {trip.trip_id}</h3>
              <p>
                <strong>Description:</strong> {trip.description}
              </p>
              <p>
                <strong>Duration:</strong> {trip.duration} days
              </p>
              <p>
                <strong>Start Date:</strong>{" "}
                {trip.start_time_of_trip.substring(0, 10)}
              </p>
              <p>
                <strong>Price:</strong> ${trip.price}
              </p>
              <p>
                <strong>Total Stops:</strong> {trip.total_stop}
              </p>
            </div>
          ))}
        </div>
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
          color: #333;
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
          flex: 1;
        }
        .fetch-button {
          padding: 10px 20px;
          font-size: 16px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.2s;
        }
        .fetch-button:hover {
          background-color: #005bb5;
          transform: scale(1.05);
        }
        .loader {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #0070f3;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          animation: spin 1s linear infinite;
          margin: 0 auto;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .error-message {
          color: red;
          margin: 10px 0;
        }
        .trip-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-top: 20px;
        }
        .trip-item {
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 10px;
          background-color: #f9f9f9;
          text-align: left;
          transition: transform 0.3s, box-shadow 0.3s;
          box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
        }
        .trip-item:hover {
          transform: translateY(-5px);
          box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15);
          background-color: #eaf6ff;
        }
        .trip-item h3 {
          margin: 0;
          font-size: 20px;
          color: #0070f3;
        }
        .trip-item p {
          margin: 5px 0;
          font-size: 16px;
          color: #555;
        }
      `}</style>
    </div>
  );
}
