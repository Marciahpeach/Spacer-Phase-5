// src/pages/client/Booking.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSpaceById, updateSpaceAvailability } from "../../services/api";

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [space, setSpace] = useState(null);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    async function fetchSpace() {
      try {
        const data = await getSpaceById(id);
        if (!data || !data.available) {
          alert("This space is unavailable or does not exist.");
          navigate("/");
        } else {
          setSpace(data);
        }
      } catch (err) {
        console.error("Error loading space:", err);
        alert("Something went wrong while fetching the space.");
        navigate("/");
      }
    }

    fetchSpace();
  }, [id, navigate]);

  async function handleBooking(e) {
    e.preventDefault();
    try {
      console.log("Booking payload:", {
  name,
  date,
  available: false,
});
      const res = await updateSpaceAvailability(id, {
        name,
        date,
        available: false,
      });

      if (res.success) {
        alert("Booking successful!");
        navigate("/");
      } else {
        alert("Failed to book the space.");
      }
    }catch (err) {
  console.error("Booking error (raw):", err);
  console.error("Booking error (string):", JSON.stringify(err, Object.getOwnPropertyNames(err)));

  const msg =
    err?.response?.data?.message || err?.message || "Unknown error occurred.";
  alert("Something went wrong during booking:\n" + msg);
}
  }

  if (!space) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleBooking}
        className="bg-white shadow-md rounded-xl p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Book "{space.name}"
        </h1>

        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-700">Your Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-semibold text-gray-700">Booking Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
}
