// src/pages/admin/ViewSpaces.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const ViewSpaces = () => {
  const [spaces, setSpaces] = useState([]);

  const fetchSpaces = async () => {
    const res = await axios.get("http://localhost:5000/spaces");
    setSpaces(res.data);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    await axios.delete(`http://localhost:5000/spaces/${id}`);
    fetchSpaces();
  };

  useEffect(() => {
    fetchSpaces();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Spaces</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {spaces.map((space) => (
          <div key={space.id} className="border rounded p-4 shadow">
            <h3 className="text-xl font-bold">{space.title}</h3>
            <img src={space.image_url} alt={space.title} className="w-full h-48 object-cover mt-2" />
            <p className="text-gray-600">{space.description}</p>
            <p><strong>Location:</strong> {space.location}</p>
            <p><strong>Rate:</strong> ${space.rate_per_hour}/hr</p>
            <div className="mt-2 space-x-2">
              <button className="text-red-600" onClick={() => handleDelete(space.id)}>Delete</button>
              {/* Optional Edit button here */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewSpaces;
