import React, { useState, useEffect } from 'react';

function SpaceManagement() {
  const [spaces, setSpaces] = useState([]);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [pricePerHour, setPricePerHour] = useState('');
  const [capacity, setCapacity] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [amenities, setAmenities] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const backendUrl = 'http://127.0.0.1:5000';

  const fetchSpaces = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${backendUrl}/spaces`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      const data = await response.json();
      setSpaces(data.spaces);
    } catch (err) {
      console.error('Failed to fetch spaces:', err);
      setError(`Failed to load spaces. Is the backend running? Details: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsersForDropdown = async () => {
    try {
      const response = await fetch(`${backendUrl}/users`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data.users);
      if (data.users.length > 0 && !ownerId) {
        setOwnerId(data.users[0].id);
      }
    } catch (err) {
      console.error('Failed to fetch users for dropdown:', err);
    }
  };

  useEffect(() => {
    fetchSpaces();
    fetchUsersForDropdown();
  }, []);

  const handleAddSpace = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (!name || !location || !pricePerHour || !capacity || !ownerId) {
      setError('Please fill in all required fields (Name, Location, Price, Capacity, Owner).');
      setLoading(false);
      return;
    }
    if (isNaN(parseFloat(pricePerHour)) || parseFloat(pricePerHour) <= 0) {
      setError('Price per hour must be a positive number.');
      setLoading(false);
      return;
    }
    if (isNaN(parseInt(capacity)) || parseInt(capacity) <= 0) {
      setError('Capacity must be a positive integer.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/spaces`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          location,
          description,
          price_per_hour: parseFloat(pricePerHour),
          capacity: parseInt(capacity),
          owner_id: parseInt(ownerId),
          is_available: isAvailable,
          image_url: imageUrl,
          amenities: amenities,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      setMessage(data.message);
      setName('');
      setLocation('');
      setDescription('');
      setPricePerHour('');
      setCapacity('');
      setIsAvailable(true);
      setImageUrl('');
      setAmenities('');
      fetchSpaces();
    } catch (err) {
      console.error('Failed to add space:', err);
      setError(err.message || 'An unexpected error occurred while adding the space.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="management-section">
      <h3 className="management-title">Manage Spaces</h3>

      <div className="form-section">
        <h4 className="form-section-title">Add New Space</h4>
        <form onSubmit={handleAddSpace}>
          {error && <p className="message-box message-error">{error}</p>}
          {message && <p className="message-box message-success">{message}</p>}

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="spaceName" className="form-label">Space Name</label>
              <input
                type="text"
                id="spaceName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="location" className="form-label">Location</label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="pricePerHour" className="form-label">Price Per Hour ($)</label>
              <input
                type="number"
                id="pricePerHour"
                value={pricePerHour}
                onChange={(e) => setPricePerHour(e.target.value)}
                className="form-input"
                step="0.01"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="capacity" className="form-label">Capacity</label>
              <input
                type="number"
                id="capacity"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="ownerId" className="form-label">Owner (User ID)</label>
              <select
                id="ownerId"
                value={ownerId}
                onChange={(e) => setOwnerId(e.target.value)}
                className="form-input"
                required
              >
                <option value="">Select an Owner</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.username} (ID: {user.id})</option>
                ))}
              </select>
              {users.length === 0 && (
                <p className="form-note error">No users available. Please add users in Admin Dashboard &gt; Manage Users.</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="imageUrl" className="form-label">Image URL (Optional)</label>
              <input
                type="url"
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="form-input"
                placeholder="e.g., https://placehold.co/600x400"
              />
            </div>
            <div className="form-group form-grid-full-width">
              <label htmlFor="amenities" className="form-label">Amenities (comma-separated)</label>
              <input
                type="text"
                id="amenities"
                value={amenities}
                onChange={(e) => setAmenities(e.target.value)}
                className="form-input"
                placeholder="e.g., Wi-Fi, Projector, Whiteboard"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="description" className="form-label">Description (Optional)</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="form-input form-textarea"
            ></textarea>
          </div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="isAvailable"
              checked={isAvailable}
              onChange={(e) => setIsAvailable(e.target.checked)}
              className="checkbox-input"
            />
            <label htmlFor="isAvailable" className="checkbox-label">Is Available</label>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? 'Adding Space...' : 'Add Space'}
          </button>
        </form>
      </div>

      <div className="table-section">
        <h4 className="table-section-title">Existing Spaces</h4>
        {loading && <p className="status-message loading">Loading spaces...</p>}
        {error && !message && <p className="status-message error">{error}</p>}
        {spaces.length === 0 && !loading && !error && (
          <p className="status-message no-spaces">No spaces found. Add one above!</p>
        )}

        {spaces.length > 0 && (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Price/Hr</th>
                  <th>Capacity</th>
                  <th>Owner ID</th>
                  <th>Image</th>
                  <th>Amenities</th>
                  <th>Available</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {spaces.map((space) => (
                  <tr key={space.id}>
                    <td>{space.id}</td>
                    <td className="font-medium">{space.name}</td>
                    <td>{space.location}</td>
                    <td>${space.price_per_hour.toFixed(2)}</td>
                    <td>{space.capacity}</td>
                    <td>{space.owner_id}</td>
                    <td>
                      {space.image_url ? (
                        <img src={space.image_url} alt={space.name} className="table-image" onError={(e) => e.target.src = 'https://placehold.co/100x100/CCCCCC/FFFFFF?text=No+Image'} />
                      ) : (
                        <span className="table-image-placeholder">N/A</span>
                      )}
                    </td>
                    <td>
                      {space.amenities && space.amenities.length > 0 ? (
                        <ul className="amenities-list">
                          {space.amenities.map((amenity, index) => (
                            <li key={index}>{amenity}</li>
                          ))}
                        </ul>
                      ) : (
                        <span className="amenities-none">None</span>
                      )}
                    </td>
                    <td>
                      {space.is_available ? (
                        <span className="status-badge green">Yes</span>
                      ) : (
                        <span className="status-badge red">No</span>
                      )}
                    </td>
                    <td>{new Date(space.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default SpaceManagement;