// src/pages/admin/AddSpace.jsx
import { useState } from "react";
import axios from "axios";

const AddSpace = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    location: "",
    rate_per_hour: "",
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/spaces", formData);
      alert("Space added successfully!");
      setFormData({ title: "", description: "", image_url: "", location: "", rate_per_hour: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to add space.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Add New Space</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["title", "description", "image_url", "location", "rate_per_hour"].map((field) => (
          <input
            key={field}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            placeholder={field.replace("_", " ")}
            className="w-full p-2 border rounded"
            required
          />
        ))}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default AddSpace;
