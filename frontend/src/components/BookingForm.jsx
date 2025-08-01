// frontend/src/components/BookingForm.jsx
import React, { useState, useEffect } from 'react';

function BookingForm({ space, onClose, onBookingSuccess }) {
  const [users, setUsers] = useState([]); // To select the booking user
  const [selectedUserId, setSelectedUserId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const backendUrl = 'http://127.0.0.1:5000'; // Corrected URL

  useEffect(() => {
    // Fetch users to populate the dropdown for who is booking
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${backendUrl}/users`);
        if (!response.ok) {
          // Attempt to parse error message if response is not OK
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        const data = await response.json();
        setUsers(data.users);
        if (data.users.length > 0) {
          setSelectedUserId(data.users[0].id); // Select first user by default
        }
      } catch (err) {
        console.error('Failed to fetch users for booking form:', err);
        setError(`Could not load users for booking. Please ensure users exist. Details: ${err.message}`);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (!selectedUserId || !startTime || !endTime) {
      setError('Please fill all booking details.');
      setLoading(false);
      return;
    }

    // Convert local time strings to UTC ISO format for backend
    const startUTC = new Date(startTime).toISOString();
    const endUTC = new Date(endTime).toISOString();

    if (new Date(startTime) >= new Date(endTime)) {
      setError('End time must be after start time.');
      setLoading(false);
      return;
    }

    try {
      const bookingResponse = await fetch(`${backendUrl}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          space_id: space.id,
          user_id: parseInt(selectedUserId),
          start_time: startUTC,
          end_time: endUTC,
        }),
      });

      // Check if the response is OK before trying to parse JSON
      if (!bookingResponse.ok) {
        const errorData = await bookingResponse.text(); // Use .text() to avoid JSON parsing error
        throw new Error(errorData || `HTTP error! status: ${bookingResponse.status}`);
      }

      const bookingData = await bookingResponse.json();

      setMessage('Booking successful! Updating space availability...');

      // --- New: Update space availability to false after successful booking ---
      const updateSpaceResponse = await fetch(`${backendUrl}/spaces/${space.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_available: false }),
      });

      if (!updateSpaceResponse.ok) {
        const updateSpaceErrorData = await updateSpaceResponse.text(); // Use .text()
        console.error('Failed to update space availability:', updateSpaceErrorData);
        // Don't throw error here, as booking was successful. Just log/display warning.
        setMessage('Booking successful, but failed to update space availability.');
      } else {
        setMessage('Booking successful and space updated to unavailable!');
      }
      // --- End New ---

      onBookingSuccess(); // Notify parent component (SpaceList) to refresh
    } catch (err) {
      console.error('Booking failed:', err);
      setError(err.message || 'An error occurred during booking.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
        >
          &times;
        </button>
        <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Book Space: {space.name}</h3>
        <p className="text-gray-600 mb-4">Price: ${space.price_per_hour.toFixed(2)} / hour</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {message && <p className="text-green-500 mb-4">{message}</p>}

          <div>
            <label htmlFor="userSelect" className="block text-sm font-medium text-gray-700 mb-1">Booked By (User)</label>
            <select
              id="userSelect"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            >
              <option value="">Select a User</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.username} (ID: {user.id})</option>
              ))}
            </select>
            {users.length === 0 && (
                <p className="text-sm text-red-500 mt-1">No users available. Please add users in Admin Dashboard &gt; Manage Users.</p>
            )}
          </div>

          <div>
            <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
            <input
              type="datetime-local"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
            <input
              type="datetime-local"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || users.length === 0}
            className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Booking...' : 'Confirm Booking'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookingForm;