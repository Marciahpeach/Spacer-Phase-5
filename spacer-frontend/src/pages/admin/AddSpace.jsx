import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createSpace, updateSpace, getSpaces } from "../../services/api";

const AddSpace = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [spaceData, setSpaceData] = useState({
    name: "",
    description: "",
    image_url: "",
    location: "",
    type: "",
    price: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      getSpaces().then((res) => {
        const existing = res.data.find((space) => space.id === parseInt(id));
        if (existing) {
          setSpaceData(existing);
        }
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setSpaceData({ ...spaceData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, description, image_url, location, type, price } = spaceData;

    if (!name || !description || !image_url || !location || !type || !price) {
      setError("All fields are required.");
      return;
    }

    try {
      if (id) {
        await updateSpace(id, spaceData);
        alert("Space updated!");
      } else {
        await createSpace({ ...spaceData, status: "available" });
        alert("Space created!");
      }
      navigate("/admin/spaces");
    } catch (err) {
      setError("Something went wrong.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        {id ? "Edit Space" : "Add New Space"}
      </h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-3 gap-6"
      >
        {/* Form Fields */}
        <div className="md:col-span-2 space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={spaceData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              rows="4"
              value={spaceData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="text"
              name="image_url"
              value={spaceData.image_url}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Grouped fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={spaceData.location}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Type</label>
              <select
                name="type"
                value={spaceData.type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Select Type</option>
                <option value="office">Office</option>
                <option value="event">Event</option>
                <option value="meeting">Meeting</option>
                <option value="co-working">Co-Working</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Price (Ksh)</label>
              <input
                type="number"
                name="price"
                value={spaceData.price}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Submit button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-200"
            >
              {id ? "Update Space" : "Create Space"}
            </button>
          </div>
        </div>

        {/* Image Preview */}
        <div className="rounded-md border border-gray-200 bg-gray-100 flex items-center justify-center p-4 min-h-[250px]">
          {spaceData.image_url ? (
            <img
              src={spaceData.image_url}
              alt="Preview"
              className="w-full h-64 object-cover rounded-md"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/400x300?text=Invalid+Image+URL";
              }}
            />
          ) : (
            <p className="text-gray-500 text-center text-sm">Image preview will appear here</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddSpace;
