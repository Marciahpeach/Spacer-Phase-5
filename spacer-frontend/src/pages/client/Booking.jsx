import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [space, setSpace] = useState(null);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const spaces = JSON.parse(localStorage.getItem("spaces")) || [];
    const selected = spaces[parseInt(id)];
    if (!selected || !selected.available) {
      alert("This space is currently unavailable for booking.");
      navigate("/");
    } else {
      setSpace(selected);
    }
  }, [id, navigate]);

  const handleBooking = () => {
    if (!name || !date) {
      alert("Please enter your name and a booking date.");
      return;
    }

    // Mark the space as unavailable
    const spaces = JSON.parse(localStorage.getItem("spaces")) || [];
    spaces[parseInt(id)].available = false;
    localStorage.setItem("spaces", JSON.stringify(spaces));

    alert(`Thank you ${name}! You’ve successfully booked "${space.name}" on ${date}.`);
    navigate("/");
  };

  if (!space) return <p className="p-6">Loading booking form...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Book "{space.name}"</h2>

      <div className="mb-4">
        <label className="block font-medium mb-1">Your Name</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Booking Date</label>
        <input
          type="date"
          className="w-full border p-2 rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <button
        onClick={handleBooking}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Confirm Booking
      </button>
    </div>
  );
}
