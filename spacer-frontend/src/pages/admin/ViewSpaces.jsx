// src/pages/admin/ViewSpaces.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSpaces, deleteSpace } from "../../services/api";
import { Button } from "../../components/Button";

function ViewSpaces() {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSpaces();
  }, []);

  const fetchSpaces = async () => {
    try {
      const data = await getSpaces();
      setSpaces(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch spaces:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this space?")) {
      try {
        await deleteSpace(id);
        fetchSpaces();
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">All Spaces</h2>
        <Link to="/admin/spaces/add">
          <Button>Add New Space</Button>
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading spaces...</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto border border-gray-200">
            <thead className="bg-gray-100 text-gray-700 text-left">
              <tr>
                <th className="px-4 py-3 border">Image</th>
                <th className="px-4 py-3 border">Name</th>
                <th className="px-4 py-3 border">Location</th>
                <th className="px-4 py-3 border">Type</th>
                <th className="px-4 py-3 border">Price</th>
                <th className="px-4 py-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {spaces.map((space) => (
                <tr key={space.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 border">
                    <img
                      src={space.image_url}
                      alt={space.name}
                      className="w-20 h-20 object-cover rounded-md shadow-sm"
                      onError={(e) =>
                        (e.target.src =
                          "https://via.placeholder.com/80x80.png?text=No+Image")
                      }
                    />
                  </td>
                  <td className="px-4 py-2 border font-medium text-gray-800">
                    {space.name}
                  </td>
                  <td className="px-4 py-2 border text-gray-600">
                    {space.location}
                  </td>
                  <td className="px-4 py-2 border capitalize text-gray-600">
                    {space.type}
                  </td>
                  <td className="px-4 py-2 border text-gray-700 font-semibold">
                    Ksh {space.price}
                  </td>
                  <td className="px-4 py-2 border">
                    <div className="flex space-x-2">
                      <Link to={`/admin/spaces/edit/${space.id}`}>
                        <Button variant="outline">Edit</Button>
                      </Link>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(space.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {spaces.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                    No spaces found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ViewSpaces;
