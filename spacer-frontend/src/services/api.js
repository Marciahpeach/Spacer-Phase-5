import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";  // change if your backend URL differs

export const fetchSpaces = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/spaces`);
    return response.data;  // assuming backend returns array of spaces
  } catch (error) {
    console.error("Failed to fetch spaces", error);
    return [];
  }
};

export const fetchSpaceById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/spaces/${id}`);
    return response.data;  // single space object
  } catch (error) {
    console.error(`Failed to fetch space with id ${id}`, error);
    return null;
  }
};
