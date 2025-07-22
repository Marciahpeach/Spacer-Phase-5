import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ViewSpaces() {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("spaces");
    if (stored) {
      setSpaces(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Admin: View All Spaces</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {spaces.map((space, index) => (
          <Link key={index} to={`/space/${index}`}>
            <div className="bg-gray-100 p-4 rounded shadow hover:shadow-lg">
              <img src={space.image} alt={space.name} className="w-full h-40 object-cover rounded mb-4" />
              <h2 className="text-lg font-bold">{space.name}</h2>
              <p className="text-sm">{space.location}</p>
              <p className="text-blue-500 mt-1">Ksh {space.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
