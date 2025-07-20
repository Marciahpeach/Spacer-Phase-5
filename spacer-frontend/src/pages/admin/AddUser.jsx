import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../services/api"; // <-- fixed path

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "client",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(formData);
      alert("User added successfully");
      navigate("/admin/users");
    } catch (error) {
      alert("Failed to add user");
      console.error(error); 
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add User</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white shadow-md p-6 rounded-xl"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-2 border rounded"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <select
          name="role"
          className="w-full p-2 border rounded"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="client">Client</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Save User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
