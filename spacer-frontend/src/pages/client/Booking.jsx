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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = getSpaceById(id);
    if (!data || !data.available) {
      alert("This space is unavailable or does not exist.");
      navigate("/");
    } else {
      setSpace(data);
    }
  }, [id, navigate]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedSpace = {
        available: false,
        bookedBy: name,
        bookedDate: date,
      };

      await updateSpaceAvailability(id, updatedSpace);

      alert(`✅ Booking confirmed for "${space.name}" on ${date}`);
      navigate(`/spaces/${id}`);
    } catch (error) {
      console.error("Booking error:", error);
      alert("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!space) return <p className="text-center mt-10">Loading space details...</p>;

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
          disabled={loading}
          className={`w-full py-3 rounded-md transition text-white ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
}
