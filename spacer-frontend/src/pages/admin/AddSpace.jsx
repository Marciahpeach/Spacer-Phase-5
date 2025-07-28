import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddSpace() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    price: "",
    image: "",
    capacity: "",
    amenities: [],
    available: true,
  });

  const amenitiesList = ["Wi-Fi", "Parking", "Projector", "AC", "Whiteboard"];

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const updatedAmenities = checked
        ? [...formData.amenities, value]
        : formData.amenities.filter((a) => a !== value);

      setFormData({ ...formData, amenities: updatedAmenities });
    } else if (type === "radio") {
      setFormData({ ...formData, [name]: value === "true" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const spaces = JSON.parse(localStorage.getItem("spaces")) || [];
    const newSpace = {
      ...formData,
      id: Date.now(), // unique id
      price: parseFloat(formData.price),
      capacity: parseInt(formData.capacity),
    };
    const updatedSpaces = [...spaces, newSpace];
    localStorage.setItem("spaces", JSON.stringify(updatedSpaces));
    alert("Space added successfully!");
    navigate("/admin/view-spaces");
  }

  return (
    <div className="max-w-2xl mx-auto p-6 mt-[150px] bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Add New Space</h1>
      <form onSubmit={handleSubmit} className="space-y-4 border-green-400 ">
        <input name="name" onChange={handleChange} placeholder="Name" className="w-full p-2 rounded-xl border" required />
        <input name="location" onChange={handleChange} placeholder="Location" className="w-full p-2 rounded-xl border" required />
        <input name="capacity" onChange={handleChange} placeholder="Capacity (e.g. 50)" className="w-full p-2 rounded-xl border" required />
        <textarea name="description" onChange={handleChange} placeholder="Description" className="w-full p-6 rounded-xl border" required />
        <input name="price" type="number" onChange={handleChange} placeholder="Price (KES)" className="w-full p-2 rounded-xl border" required />
        <input name="image" onChange={handleChange} placeholder="Image URL" className="w-full p-2 rounded-xl border" required />

        {/* Availability */}
        <div className="flex items-center gap-4">
          <span className="font-medium">Available?</span>
          <label className="flex items-center gap-1">
            <input type="radio" name="available" value="true" defaultChecked onChange={handleChange} />
            Yes
          </label>
          <label className="flex items-center gap-1">
            <input type="radio" name="available" value="false" onChange={handleChange} />
            No
          </label>
        </div>

        {/* Amenities */}
        <div>
          <h2 className="font-medium mb-1">Amenities</h2>
          <div className="grid grid-cols-2 gap-2">
            {amenitiesList.map((item) => (
              <label key={item} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="amenities"
                  value={item}
                  onChange={handleChange}
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Add Space
        </button>
      </form>
    </div>
  );
}
