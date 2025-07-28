import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchSpaces } from "../../services/api";
export default function Home() {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    const getSpaces = async () => {
      try {
        const data = await fetchSpaces();
        setSpaces(data);
      } catch (err) {
        console.error("Error fetching spaces:", err);
      }
    };
    getSpaces();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Available Spaces</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {spaces.map((space) => (
          <div key={space.id} className="bg-white p-4 shadow-2xl rounded hover:scale-105 duration-500">
            <img src={space.image} alt={space.name} className="w-full h-40 object-cover rounded mb-2" />
            <h2 className="text-xl font-semibold">{space.name}</h2>
            <p className="text-gray-600">{space.location}</p>
            <p className="text-sm">{space.description.substring(0, 60)}...</p>
            <p className="mt-1"><strong>KES {space.price}</strong></p>
            <p className={`mt-1 font-semibold ${space.available ? 'text-green-600' : 'text-red-600'}`}>
              {space.available ? "Available" : "Unavailable"}
            </p>
            <Link
              to={`/spaces/${space.id}`}
              className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
