// frontend/src/components/SpaceManagement.jsx
import React, { useState, useEffect } from 'react';

function SpaceManagement() {
  const [spaces, setSpaces] = useState([]);
  const [users, setUsers] = useState([]); // To populate owner_id dropdown
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [pricePerHour, setPricePerHour] = useState('');
  const [capacity, setCapacity] = useState('');
  const [ownerId, setOwnerId] = useState(''); // Added ownerId state
  const [isAvailable, setIsAvailable] = useState(true);
  const [imageUrl, setImageUrl] = useState(''); // New state for image URL
  const [amenities, setAmenities] = useState(''); // New state for amenities (comma-separated string)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const backendUrl = 'http://127.0.0.1:5000'; // Corrected URL

  // Function to fetch spaces from the backend
  const fetchSpaces = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${backendUrl}/spaces`);
      if (!response.ok) {
        // Attempt to parse error message if response is not OK
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

  // Function to fetch users for the owner dropdown
  const fetchUsersForDropdown = async () => {
    try {
      const response = await fetch(`${backendUrl}/users`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data.users);
      // Set a default owner if users exist and no owner is selected
      if (data.users.length > 0 && !ownerId) {
        setOwnerId(data.users[0].id);
      }
    } catch (err) {
      console.error('Failed to fetch users for dropdown:', err);
      // Optionally set an error for the dropdown specifically
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchSpaces();
    fetchUsersForDropdown();
  }, []);

  // Function to handle adding a new space
  const handleAddSpace = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    // Basic client-side validation
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
          image_url: imageUrl, // Send new field
          amenities: amenities, // Send new field (comma-separated string)
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      setMessage(data.message);
      // Clear form fields
      setName('');
      setLocation('');
      setDescription('');
      setPricePerHour('');
      setCapacity('');
      // Keep ownerId as it might be common, or reset if preferred: setOwnerId('');
      setIsAvailable(true);
      setImageUrl(''); // Clear new field
      setAmenities(''); // Clear new field
      fetchSpaces(); // Refresh the space list
    } catch (err) {
      console.error('Failed to add space:', err);
      setError(err.message || 'An unexpected error occurred while adding the space.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-gray-700 mb-6">Manage Spaces</h3>

      {/* Add New Space Form */}
      <form onSubmit={handleAddSpace} className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50">
        <h4 className="text-xl font-medium text-gray-700 mb-4">Add New Space</h4>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {message && <p className="text-green-500 mb-4">{message}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="spaceName" className="block text-sm font-medium text-gray-700 mb-1">Space Name</label>
            <input
              type="text"
              id="spaceName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="pricePerHour" className="block text-sm font-medium text-gray-700 mb-1">Price Per Hour ($)</label>
            <input
              type="number"
              id="pricePerHour"
              value={pricePerHour}
              onChange={(e) => setPricePerHour(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              step="0.01"
              required
            />
          </div>
          <div>
            <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
            <input
              type="number"
              id="capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="ownerId" className="block text-sm font-medium text-gray-700 mb-1">Owner (User ID)</label>
            <select
              id="ownerId"
              value={ownerId}
              onChange={(e) => setOwnerId(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            >
              <option value="">Select an Owner</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.username} (ID: {user.id})</option>
              ))}
            </select>
            {users.length === 0 && (
              <p className="text-sm text-red-500 mt-1">No users available. Please add users in Admin Dashboard &gt; Manage Users.</p>
            )}
          </div>
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">Image URL (Optional)</label>
            <input
              type="url"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="e.g., https://placehold.co/600x400"
            />
          </div>
          <div>
            <label htmlFor="amenities" className="block text-sm font-medium text-gray-700 mb-1">Amenities (comma-separated)</label>
            <input
              type="text"
              id="amenities"
              value={amenities}
              onChange={(e) => setAmenities(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="e.g., Wi-Fi, Projector, Whiteboard"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          ></textarea>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center mt-6 md:mt-0">
            <input
              type="checkbox"
              id="isAvailable"
              checked={isAvailable}
              onChange={(e) => setIsAvailable(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="isAvailable" className="ml-2 block text-sm font-medium text-gray-700">Is Available</label>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Adding Space...' : 'Add Space'}
        </button>
      </form>

      {/* Space List */}
      <h4 className="text-xl font-medium text-gray-700 mb-4">Existing Spaces</h4>
      {loading && <p className="text-blue-500">Loading spaces...</p>}
      {error && !message && <p className="text-red-500">{error}</p>}

      {spaces.length === 0 && !loading && !error && (
        <p className="text-gray-500">No spaces found. Add one above!</p>
      )}

      {spaces.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price/Hr</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amenities</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">Created At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {spaces.map((space) => (
                <tr key={space.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{space.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{space.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{space.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${space.price_per_hour.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{space.capacity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{space.owner_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {space.image_url ? (
                      <img src={space.image_url} alt={space.name} className="h-12 w-12 object-cover rounded-md" onError={(e) => e.target.src = 'https://placehold.co/100x100/CCCCCC/FFFFFF?text=No+Image'} />
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {space.amenities && space.amenities.length > 0 ? (
                      <ul className="list-disc list-inside text-xs">
                        {space.amenities.map((amenity, index) => (
                          <li key={index}>{amenity}</li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-400">None</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {space.is_available ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Yes
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        No
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(space.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SpaceManagement;