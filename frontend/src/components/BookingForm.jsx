import React, { useState, useEffect } from 'react';

function BookingForm({ space, onClose, onBookingSuccess }) {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const backendUrl = 'http://127.0.0.1:5000';

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${backendUrl}/users`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        const data = await response.json();
        setUsers(data.users);
        if (data.users.length > 0) {
          setSelectedUserId(data.users[0].id);
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

      if (!bookingResponse.ok) {
        const errorData = await bookingResponse.text();
        throw new Error(errorData || `HTTP error! status: ${bookingResponse.status}`);
      }

      await bookingResponse.json();

      setMessage('Booking successful! Updating space availability...');

      const updateSpaceResponse = await fetch(`${backendUrl}/spaces/${space.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_available: false }),
      });

      if (!updateSpaceResponse.ok) {
        const updateSpaceErrorData = await updateSpaceResponse.text();
        console.error('Failed to update space availability:', updateSpaceErrorData);
        setMessage('Booking successful, but failed to update space availability.');
      } else {
        setMessage('Booking successful and space updated to unavailable!');
      }

      onBookingSuccess();
    } catch (err) {
      console.error('Booking failed:', err);
      setError(err.message || 'An error occurred during booking.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close-button">&times;</button>
        <h3 className="modal-title">Book Space: <span>{space.name}</span></h3>
        <p className="modal-price-info">Price: <strong>${space.price_per_hour.toFixed(2)} / hour</strong></p>

        <form onSubmit={handleSubmit} className="booking-form">
          {error && <p className="message-box message-error">{error}</p>}
          {message && <p className="message-box message-success">{message}</p>}

          <div className="form-group">
            <label htmlFor="userSelect" className="form-label">Booked By (User)</label>
            <select
              id="userSelect"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="form-select"
              required
            >
              <option value="">Select a User</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.username} (ID: {user.id})</option>
              ))}
            </select>
            {users.length === 0 && (
                <p className="form-note error">No users available. Please add users in Admin Dashboard &gt; Manage Users.</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="startTime" className="form-label">Start Time</label>
            <input
              type="datetime-local"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="endTime" className="form-label">End Time</label>
            <input
              type="datetime-local"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || users.length === 0}
            className="btn btn-primary"
          >
            {loading ? 'Booking...' : 'Confirm Booking'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookingForm;