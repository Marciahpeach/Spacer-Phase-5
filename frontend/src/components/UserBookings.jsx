import React, { useState, useEffect } from 'react';

function UserBookings({ isAdminView = false }) {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const backendUrl = 'http://127.0.0.1:5000';

  const fetchUsersForDropdown = async () => {
    try {
      const response = await fetch(`${backendUrl}/users`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      const data = await response.json();
      setUsers(data.users);
      if (data.users.length > 0 && !isAdminView) {
        setSelectedUserId(data.users[0].id);
      }
    } catch (err) {
      console.error('Failed to fetch users for dropdown:', err);
      setError(`Could not load users for selection. Please add users in Admin Dashboard. Details: ${err.message}`);
    }
  };

  const fetchBookings = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      let url = `${backendUrl}/bookings`;
      if (userId && !isAdminView) {
        url += `?user_id=${userId}`;
      } else if (!isAdminView && !userId) {
        setBookings([]);
        setLoading(false);
        return;
      }

      const response = await fetch(url);
      if (!response.ok) {
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
    if (isAdminView) {
      fetchBookings(null);
    } else if (selectedUserId) {
      fetchBookings(selectedUserId);
    }
  }, [selectedUserId, isAdminView]);

  return (
    <div className="booking-list-section">
      <h3 className="booking-list-title">
        {isAdminView ? 'All Bookings' : 'My Bookings'}
      </h3>

      {!isAdminView && (
        <div className="user-select-container">
          <label htmlFor="userSelectBookings" className="form-label">Select User to View Bookings</label>
          <select
            id="userSelectBookings"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="form-input form-select"
          >
            <option value="">-- Select a User --</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.username} (ID: {user.id})</option>
            ))}
          </select>
          {users.length === 0 && (
              <p className="form-note error">No users available. Please add users in Admin Dashboard &gt; Manage Users.</p>
          )}
        </div>
      )}

      {loading && <p className="status-message loading">Loading bookings...</p>}
      {error && <p className="status-message error">{error}</p>}

      {bookings.length === 0 && !loading && !error && (isAdminView || selectedUserId) && (
        <p className="status-message no-bookings">No bookings found {isAdminView ? '' : 'for the selected user'}.</p>
      )}
      {bookings.length === 0 && !loading && !error && !isAdminView && !selectedUserId && (
        <p className="status-message no-bookings">Please select a user to view their bookings.</p>
      )}

      {bookings.length > 0 && (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Space Name</th>
                <th>Booked By</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Total Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td className="font-medium">{booking.space_name || 'N/A'}</td>
                  <td>{booking.username || 'N/A'}</td>
                  <td>{new Date(booking.start_time).toLocaleString()}</td>
                  <td>{new Date(booking.end_time).toLocaleString()}</td>
                  <td>${booking.total_price.toFixed(2)}</td>
                  <td>
                    <span className={`status-badge ${booking.status}`}>
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