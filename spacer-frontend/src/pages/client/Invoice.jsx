import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function Invoice() {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [space, setSpace] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooking = async () => {
      try {
        // Step 1: Get booking details
        const res = await axios.get(`http://localhost:5000/api/bookings/${bookingId}`);
        setBooking(res.data);

        // Step 2: Get space details using space_id from booking
        const spaceRes = await axios.get(`http://localhost:5000/api/spaces/${res.data.space_id}`);
        setSpace(spaceRes.data);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching invoice:", err);
        setLoading(false);
      }
    };

    loadBooking();
  }, [bookingId]);

  if (loading) return <div className="p-6">Loading invoice...</div>;
  if (!booking || !space) return <div className="p-6">Booking not found.</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Booking Confirmed!</h1>
      <p className="text-lg mb-2">Thank you, <strong>{booking.name}</strong>.</p>

      <div className="border p-4 rounded shadow mb-6 bg-gray-50">
        <p><strong>Space:</strong> {space.name}</p>
        <p><strong>Location:</strong> {space.location}</p>
        <p><strong>Date:</strong> {booking.date}</p>
        <p><strong>Time:</strong> {booking.time}</p>
      </div>

      <Link
        to="/"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
      >
        Back to Home
      </Link>
    </div>
  );
}
