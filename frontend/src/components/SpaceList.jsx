// frontend/src/components/SpaceList.jsx
import React, { useState, useEffect } from 'react';
import BookingForm from './BookingForm'; // Import the BookingForm component

function SpaceList() {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState(null);

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
      // Filter for available spaces for the client view
      setSpaces(data.spaces.filter(space => space.is_available));
    } catch (err) {
      console.error('Failed to fetch spaces:', err);
      setError(`Failed to load spaces. Is the backend running? Details: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpaces();
  }, []);

  const handleBookClick = (space) => {
    setSelectedSpace(space);
    setShowBookingModal(true);
  };

  const handleBookingSuccess = () => {
    setShowBookingModal(false);
    setSelectedSpace(null);
    fetchSpaces(); // Refresh the space list to reflect availability change
  };

  const handleCloseModal = () => {
    setShowBookingModal(false);
    setSelectedSpace(null);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-gray-700 mb-6">Available Spaces for Booking</h3>

      {loading && <p className="text-blue-500">Loading spaces...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {spaces.length === 0 && !loading && !error && (
        <p className="text-gray-500">No available spaces found. Check back later or contact an admin!</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {spaces.map((space) => (
          <div key={space.id} className="bg-gray-50 rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className="relative h-48 w-full bg-gray-200 flex items-center justify-center text-gray-400">
              {space.image_url ? (
                <img src={space.image_url} alt={space.name} className="w-full h-full object-cover" onError={(e) => e.target.src = 'https://placehold.co/400x200/CCCCCC/FFFFFF?text=No+Image'} />
              ) : (
                <span className="text-center">No Image Available</span>
              )}
            </div>
            <div className="p-4 flex-grow flex flex-col">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">{space.name}</h4>
              <p className="text-gray-600 text-sm mb-1">
                <span className="font-medium">Location:</span> {space.location}
              </p>
              <p className="text-gray-600 text-sm mb-1">
                <span className="font-medium">Price:</span> ${space.price_per_hour.toFixed(2)} / hour
              </p>
              <p className="text-gray-600 text-sm mb-1">
                <span className="font-medium">Capacity:</span> {space.capacity} people
              </p>
              {space.description && (
                <p className="text-gray-700 text-sm mt-2 flex-grow">{space.description}</p>
              )}
              {space.amenities && space.amenities.length > 0 && (
                <div className="mt-2">
                  <span className="font-medium text-gray-700 text-sm">Amenities:</span>
                  <ul className="list-disc list-inside text-xs text-gray-600">
                    {space.amenities.map((amenity, index) => (
                      <li key={index}>{amenity}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
                <button
                  onClick={() => handleBookClick(space)}
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showBookingModal && selectedSpace && (
        <BookingForm
          space={selectedSpace}
          onClose={handleCloseModal}
          onBookingSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
}

export default SpaceList;