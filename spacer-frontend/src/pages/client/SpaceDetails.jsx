// src/pages/client/SpaceDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getSpaceById } from "../../services/api";

export default function SpaceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [space, setSpace] = useState(null);

  useEffect(() => {
    async function fetchSpace() {
      try {
        const data = await getSpaceById(id);
        if (!data) {
          alert("Space not found.");
          navigate("/");
        } else {
          setSpace(data);
        }
      } catch (error) {
        console.error("Error fetching space:", error);
        alert("Failed to load space.");
        navigate("/");
      }
    }

    fetchSpace();
  }, [id, navigate]);

  if (!space) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">{space.name}</h1>
      <img
        src={space.image}
        alt={space.name}
        className="w-full h-96 object-cover rounded-xl shadow"
      />
      <p className="mt-6 text-gray-700">{space.description}</p>
      <p className="mt-4 font-semibold">Location: {space.location}</p>
      <p className="mt-2 font-semibold">Capacity: {space.capacity}</p>
      <p className="mt-2 font-semibold">
        Status:{" "}
        {space.available ? (
          <span className="text-green-600">Available</span>
        ) : (
          <span className="text-red-600">Unavailable</span>
        )}
      </p>

   {space.available ? (
  <Link to={`/book/${space.id}`}>
    <button className="bg-green-600 text-white px-4 py-2 rounded mt-4 hover:bg-green-700">
      Book This Space
    </button>
  </Link>
) : (
  <p className="text-red-500 mt-4 font-semibold">This space is unavailable</p>
)}

    </div>
  );
}
