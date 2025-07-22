// src/pages/client/SpaceDetails.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSpaceById, bookSpace } from "../../services/api";

const SpaceDetails = () => {
  const { id } = useParams();
  const [space, setSpace] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    fetchSpaceById(id).then(setSpace);
  }, [id]);

  const handleBooking = async () => {
    if (space.status === "booked") return;
    const updated = await bookSpace(id, { bookedBy: name });
    setSpace(updated);
  };

  if (!space) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <img src={space.image} alt={space.name} className="w-full rounded-xl" />
      <h1 className="text-2xl font-bold mt-4">{space.name}</h1>
      <p className="text-gray-600">{space.description}</p>
      <p className="mt-2">Location: {space.location}</p>
      <p>Status: {space.status}</p>
      <div className="mt-4">
        {space.status !== "booked" ? (
          <>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded mr-2"
            />
            <button
              onClick={handleBooking}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Book Now
            </button>
          </>
        ) : (
          <p className="text-red-500">This space is already booked.</p>
        )}
      </div>
    </div>
  );
};

export default SpaceDetails;
