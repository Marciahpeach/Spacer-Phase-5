// api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";
const SPACES_KEY = "spaces";

export function getSpaces() {
  try {
    const stored = localStorage.getItem(SPACES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error getting spaces from localStorage:", error);
    return [];
  }
}

function saveSpaces(spaces) {
  try {
    localStorage.setItem(SPACES_KEY, JSON.stringify(spaces));
  } catch (error) {
    console.error("Error saving spaces to localStorage:", error);
  }
}

export function getSpaceById(id) {
  try {
    const spaces = getSpaces();
    const space = spaces.find((s) => String(s.id) === String(id));
    return space || null;
  } catch (error) {
    console.error("Error finding space by ID:", error);
    return null;
  }
}

export function addSpace(newSpace) {
  try {
    const spaces = getSpaces();
    const spaceWithId = {
      ...newSpace,
      id: Date.now(),
      available: true,
      booking: null,
    };
    spaces.push(spaceWithId);
    saveSpaces(spaces);
    return spaceWithId;
  } catch (error) {
    console.error("Error adding new space:", error);
    return null;
  }
}

// ✅ Book space (mark unavailable)
export async function updateSpaceAvailability(id, bookingData) {
  try {
    const res = await axios.patch(`${API_BASE_URL}/spaces/${id}`, bookingData);

    // Optional: update localStorage if `available` is present
    if (bookingData.hasOwnProperty("available")) {
      const spaces = getSpaces();
      const index = spaces.findIndex((s) => String(s.id) === String(id));
      if (index !== -1) {
        spaces[index].available = bookingData.available;
        saveSpaces(spaces);
      }
    }
    return res.data;
  } catch (error) {
    console.error("Failed to update availability:", error.response?.data || error.message);
    throw error;
  }
}
