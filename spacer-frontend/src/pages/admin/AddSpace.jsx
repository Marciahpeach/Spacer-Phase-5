import { useState } from "react";
import { addSpace } from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function AddSpace() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    location: "",
    price: "",
    image: "",
    description: "",
    amenities: [],
    available: true,
  });

  const amenityOptions = ["Wi-Fi", "Parking", "Projector", "Kitchen", "Air Conditioning"];

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    if (name === "available") {
      setForm({ ...form, available: checked });
    } else if (name === "amenities") {
      if (checked) {
        setForm({ ...form, amenities: [...form.amenities, value] });
      } else {
        setForm({ ...form, amenities: form.amenities.filter((a) => a !== value) });
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { name, location, price, image, description } = form;

    if (!name || !location || !price || !image || !description) {
      alert("All fields are required");
      return;
    }

    addSpace(form);
    alert("Space added successfully");
    navigate("/admin/view-spaces");
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 py-8">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Add a New Space</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Space Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price (KES)"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div>
            <label className="block font-semibold mb-2 text-gray-700">Amenities:</label>
            <div className="grid grid-cols-2 gap-3">
              {amenityOptions.map((amenity) => (
                <label key={amenity} className="flex items-center space-x-2 text-gray-600">
                  <input
                    type="checkbox"
                    name="amenities"
                    value={amenity}
                    checked={form.amenities.includes(amenity)}
                    onChange={handleChange}
                    className="accent-blue-500"
                  />
                  <span>{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="available"
              checked={form.available}
              onChange={handleChange}
              id="available"
              className="accent-blue-500 w-5 h-5"
            />
            <label htmlFor="available" className="text-gray-700">
              Mark as Available
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            Add Space
          </button>
        </form>
      </div>
    </div>
  );
}
