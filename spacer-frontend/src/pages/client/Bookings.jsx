import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSpaceById } from "../../services/api";
import axios from "axios";

export default function Booking() {
  const { id } = useParams();
  const [space, setSpace] = useState(null);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const data = await fetchSpaceById(id);
      if (data) setSpace(data);
    };
    load();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !date || !time) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      // Step 1: Create booking
      const response = await axios.post("http://localhost:5000/api/bookings", {
        name,
        date,
        time,
        space_id: id,
      });

      const booking = response.data;

      // Step 2: Update space status to unavailable
      await axios.patch(`http://localhost:5000/api/spaces/${id}`, {
        status: "unavailable",
      });

      // Step 3: Redirect to invoice
      navigate(`/invoice/${booking.id}`);
    } catch (err) {
      console.error("Booking error:", err);
      setError("Booking failed. Try again.");
    }
  };

  if (!space) return <div className="p-6">Loading space...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Book "{space.name}"</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Your Name</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Jane Doe"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Date</label>
          <input
            type="date"
            className="w-full border px-3 py-2 rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Time</label>
          <input
            type="time"
            className="w-full border px-3 py-2 rounded"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
}
