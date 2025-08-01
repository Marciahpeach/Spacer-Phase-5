// src/services/api.js
import axios from "axios";

export const API_BASE_URL = "http://localhost:5000/api";
const SPACES_KEY = "spaces";

// Get all spaces from localStorage
export function getSpaces() {
  try {
    const stored = localStorage.getItem(SPACES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error getting spaces from localStorage:", error);
    return [];
  }
}

// Save updated space list to localStorage
function saveSpaces(spaces) {
  try {
    localStorage.setItem(SPACES_KEY, JSON.stringify(spaces));
  } catch (error) {
    console.error("Error saving spaces to localStorage:", error);
  }
}

// Get a specific space by ID
export function getSpaceById(id) {
  try {
    const spaces = getSpaces();
    return spaces.find((s) => String(s.id) === String(id)) || null;
  } catch (error) {
    console.error("Error finding space by ID:", error);
    return null;
  }
}

// Add a new space (local only)
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

// ✅ Book a space by updating its availability on backend and in localStorage
export async function updateSpaceAvailability(spaceId, isAvailable) {
  try {
    const response = await axios.patch(`${BASE_URL}/spaces/${spaceId}`, {
      is_available: isAvailable,
    });
    return response.data;
  } catch (error) {
    console.error("❌ Failed to update availability:", error.message);
    throw error;
  }
}
