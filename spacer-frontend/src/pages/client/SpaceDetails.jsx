import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SpaceDetails() {
  const { id } = useParams();
  const [space, setSpace] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const spaces = JSON.parse(localStorage.getItem("spaces")) || [];
    setSpace(spaces[parseInt(id)]);
  }, [id]);

  if (!space) return <p className="p-6">Loading space details...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <img src={space.image} alt={space.name} className="w-full h-70 object-cover rounded mb-4" />
      <h1 className="text-3xl font-bold mb-2">{space.name}</h1>
      <p className="text-gray-700 mb-2">{space.location}</p>
      <p className="text-gray-600 mb-4">{space.description}</p>
      <p className="text-lg font-semibold mb-2">KES {space.price}</p>
      <p className={`mb-4 font-bold ${space.available ? 'text-green-600' : 'text-red-600'}`}>
        {space.available ? "Available for Booking" : "Currently Unavailable"}
      </p>

      {space.available && (
        <button
          onClick={() => navigate(`/booking/${id}`)}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Book This Space
        </button>
      )}
    </div>
  );
}
