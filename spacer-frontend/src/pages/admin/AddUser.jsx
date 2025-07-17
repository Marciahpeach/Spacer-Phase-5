// src/pages/admin/AddUser.jsx
import { useState } from "react";
import axios from "axios";

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "client",
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", formData);
      alert("User created!");
      setFormData({ name: "", email: "", password: "", role: "client" });
    } catch (err) {
      console.error(err);
      alert("Failed to create user.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Add User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-2 border rounded" required />
        <select name="role" value={formData.role} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="admin">Admin</option>
          <option value="owner">Owner</option>
          <option value="client">Client</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Create User</button>
      </form>
    </div>
  );
};

export default AddUser;
