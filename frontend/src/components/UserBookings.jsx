// frontend/src/components/UserBookings.jsx
import React, { useState, useEffect } from 'react';

function UserBookings({ isAdminView = false }) { // Add isAdminView prop
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]); // To select which user's bookings to view
  const [selectedUserId, setSelectedUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const backendUrl = 'http://127.0.0.1:5000'; // Corrected URL

  // Function to fetch users to populate the dropdown
  const fetchUsersForDropdown = async () => {
    try {
      const response = await fetch(`${backendUrl}/users`);
      if (!response.ok) {
        // Attempt to parse error message if response is not OK
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      const data = await response.json();
      setUsers(data.users);
      if (data.users.length > 0 && !isAdminView) { // Only pre-select for non-admin view
        setSelectedUserId(data.users[0].id);
      }
    } catch (err) {
      console.error('Failed to fetch users for dropdown:', err);
      setError(`Could not load users for selection. Please add users in Admin Dashboard. Details: ${err.message}`);
    }
  };

  // Fetch bookings based on selected user or all bookings for admin
  const fetchBookings = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      let url = `${backendUrl}/bookings`;
      if (userId && !isAdminView) { // Filter by user_id only if not admin view
        url += `?user_id=${userId}`;
      } else if (!isAdminView && !userId) { // If not admin and no user selected, clear bookings
        setBookings([]);
        setLoading(false);
        return;
      }

      const response = await fetch(url);
      if (!response.ok) {
        // Attempt to parse error message if response is not OK
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      const data = await response.json();
      setBookings(data.bookings);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
      setError(`Failed to load bookings. Is the backend running? Details: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersForDropdown();
  }, []);

  useEffect(() => {
    // Fetch all bookings if it's an admin view, otherwise fetch based on selectedUserId
    if (isAdminView) {
      fetchBookings(null); // Pass null to fetch all bookings
    } else if (selectedUserId) {
      fetchBookings(selectedUserId);
    }
  }, [selectedUserId, isAdminView]); // Re-fetch when selectedUserId or isAdminView changes

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-gray-700 mb-6">
        {isAdminView ? 'All Bookings' : 'My Bookings'}
      </h3>

      {!isAdminView && ( // Only show user selection for client's "My Bookings"
        <div className="mb-6">
          <label htmlFor="userSelectBookings" className="block text-sm font-medium text-gray-700 mb-1">Select User to View Bookings</label>
          <select
            id="userSelectBookings"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">-- Select a User --</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.username} (ID: {user.id})</option>
            ))}
          </select>
          {users.length === 0 && (
              <p className="text-sm text-red-500 mt-1">No users available. Please add users in Admin Dashboard &gt; Manage Users.</p>
          )}
        </div>
      )}

      {loading && <p className="text-blue-500">Loading bookings...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {bookings.length === 0 && !loading && !error && (isAdminView || selectedUserId) && (
        <p className="text-gray-500">No bookings found {isAdminView ? '' : 'for the selected user'}.</p>
      )}
      {bookings.length === 0 && !loading && !error && !isAdminView && !selectedUserId && (
        <p className="text-gray-500">Please select a user to view their bookings.</p>
      )}

      {bookings.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">Booking ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Space Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booked By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{booking.space_name || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{booking.username || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(booking.start_time).toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(booking.end_time).toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${booking.total_price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserBookings;