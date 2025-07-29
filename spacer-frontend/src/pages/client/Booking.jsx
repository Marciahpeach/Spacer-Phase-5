import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSpaceById, updateSpaceAvailability } from "../../services/api";

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [space, setSpace] = useState(null);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSpace() {
      try {
        const data = await getSpaceById(id);
        if (!data) {
          alert("Space doesn't exist.");
          navigate("/");
        } else if (!data.available) {
          alert("This space is already booked and unavailable.");
          navigate("/");
        } else {
          setSpace(data);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        alert("Failed to fetch space.");
        navigate("/");
      }
    }

    fetchSpace();
  }, [id, navigate]);

  async function handleBooking(e) {
    e.preventDefault();

    if (!name || !date) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      // Update the availability
      await updateSpaceAvailability(id, false);

      // Show success message
      alert("✅ Booking confirmed successfully!");

      // Optionally reset or disable form (or just navigate back)
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to book space. Try again.");
    }
  }

  if (loading) return <p className="text-center mt-10">Loading space...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Book: {space.name}
      </h2>
      <form onSubmit={handleBooking} className="space-y-4">
        <div>
          <label className="block font-semibold">Your Name:</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Booking Date:</label>
          <input
            type="date"
            className="w-full border px-3 py-2 rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
}
