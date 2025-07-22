import axios from "axios";

const API_URL = "http://localhost:5000/api/spaces";

// Fetch all spaces
export const fetchSpaces = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// Fetch single space by ID
export const fetchSpaceById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

// Update space (e.g. mark as booked)
export const updateSpace = async (id, updatedSpace) => {
  const res = await axios.patch(`${API_URL}/${id}`, updatedSpace);
  return res.data;
};
