import React, { useEffect, useState } from "react";
import { fetchSpaces } from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadSpaces = async () => {
      const allSpaces = await fetchSpaces();
      // Filter to only available spaces
      const availableSpaces = allSpaces.filter(space => space.status === "available");
      setSpaces(availableSpaces);
      setLoading(false);
    };
    loadSpaces();
  }, []);

  if (loading) return <div className="p-6">Loading spaces...</div>;

  if (spaces.length === 0)
    return <div className="p-6">No available spaces found.</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Available Spaces</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {spaces.map(space => (
          <div
            key={space.id}
            className="cursor-pointer border rounded shadow hover:shadow-lg transition p-4"
            onClick={() => navigate(`/spaces/${space.id}`)}
          >
            <img
              src={space.image}
              alt={space.name}
              className="h-40 w-full object-cover rounded mb-4"
            />
            <h2 className="text-xl font-semibold">{space.name}</h2>
            <p className="text-gray-600">{space.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
