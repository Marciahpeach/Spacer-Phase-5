import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Update this if your Flask backend URL is different
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

// Save updated list of spaces to localStorage
function saveSpaces(spaces) {
  try {
    localStorage.setItem(SPACES_KEY, JSON.stringify(spaces));
  } catch (error) {
    console.error("Error saving spaces to localStorage:", error);
  }
}

// Get one space by ID
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

// Add a new space to localStorage (and optionally backend)
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

// ✅ Book a space — update both backend and localStorage
export async function bookSpace(id, bookingDetails) {
  try {
    // Post booking to backend
    await axios.post(`${API_BASE_URL}/bookings`, {
      space_id: id,
      ...bookingDetails,
    });

    // Mark space as unavailable in backend
    await axios.patch(`${API_BASE_URL}/spaces/${id}`, {
      available: false,
    });

    // Optional localStorage update for smoother UI
    const spaces = getSpaces();
    const index = spaces.findIndex((s) => String(s.id) === String(id));
    if (index !== -1) {
      spaces[index].available = false;
      spaces[index].booking = bookingDetails;
      saveSpaces(spaces);
    }

    return true;
  } catch (error) {
    console.error("❌ Booking failed:", error.response?.data || error.message);
    return false;
  }
}

// ✅ Update availability only (if admin manually toggles availability)
export async function updateSpaceAvailability(id, available) {
  try {
    const res = await axios.patch(`${API_BASE_URL}/spaces/${id}`, {
      available,
    });

    // Optional: update localStorage too
    const spaces = getSpaces();
    const index = spaces.findIndex((s) => String(s.id) === String(id));
    if (index !== -1) {
      spaces[index].available = available;
      saveSpaces(spaces);
    }

    return res.data;
  } catch (error) {
    console.error("❌ Failed to update availability:", error.response?.data || error.message);
    return null;
  }
}
