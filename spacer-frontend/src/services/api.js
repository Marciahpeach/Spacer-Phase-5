import axios from "axios";

// Create an Axios instance
const API = axios.create({
  baseURL: "http://localhost:5000", // Ensure this matches your Flask backend
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // Set true only if using cookies or auth
});

// -------------------------
// SPACE ROUTES
// -------------------------

// GET all spaces
export const getSpaces = async () => {
  try {
    const res = await API.get("/spaces");
    return res.data;
  } catch (err) {
    console.error("Error fetching spaces:", err);
    throw err;
  }
};

// POST create a new space
export const createSpace = async (data) => {
  try {
    const res = await API.post("/spaces", data);
    return res.data;
  } catch (err) {
    console.error("Error creating space:", err);
    throw err;
  }
};

// PATCH update space by ID
export const updateSpace = async (id, data) => {
  try {
    const res = await API.patch(`/spaces/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("Error updating space:", err);
    throw err;
  }
};

// DELETE a space by ID
export const deleteSpace = async (id) => {
  try {
    const res = await API.delete(`/spaces/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting space:", err);
    throw err;
  }
};

// -------------------------
// USER ROUTES
// -------------------------

// GET all users
export const getUsers = async () => {
  try {
    const res = await API.get("/users");
    return res.data;
  } catch (err) {
    console.error("Error fetching users:", err);
    throw err;
  }
};

// POST create a new user
export const createUser = async (data) => {
  try {
    const res = await API.post("/users", data);
    return res.data;
  } catch (err) {
    console.error("Error creating user:", err);
    throw err;
  }
};

// PATCH update user by ID
export const updateUser = async (id, data) => {
  try {
    const res = await API.patch(`/users/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("Error updating user:", err);
    throw err;
  }
};
