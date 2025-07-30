import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSpaceById } from "../../services/api";

export default function SpaceDetails() {
  const { id } = useParams();
  const [space, setSpace] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedSpace = getSpaceById(id);
    if (!fetchedSpace) {
      alert("Space not found.");
      navigate("/");
    } else {
      setSpace(fetchedSpace);
    }
  }, [id, navigate]);

  if (!space) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{space.name}</h1>
      <img src={space.image} alt={space.name} className="w-full rounded-lg mb-4" />
      <p className="text-gray-700">{space.description}</p>
      <p className="mt-2 text-lg">
        Status:{" "}
        <span className={space.available ? "text-green-600" : "text-red-600"}>
          {space.available ? "Available" : "Unavailable"}
        </span>
      </p>

      {space.available && (
        <Link
          to={`/book/${space.id}`}
          className="inline-block mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Book This Space
        </Link>
      )}
    </div>
  );
}
