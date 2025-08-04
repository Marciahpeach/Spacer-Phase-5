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
    fetchSpaces();
  };

  const handleCloseModal = () => {
    setShowBookingModal(false);
    setSelectedSpace(null);
  };

  return (
    <div className="space-list-section">
      <h3 className="space-list-title">Available Spaces for Booking</h3>

      {loading && <p className="status-message loading">Loading spaces...</p>}
      {error && <p className="status-message error">{error}</p>}

      {spaces.length === 0 && !loading && !error && (
        <p className="status-message no-spaces">No available spaces found. Check back later or contact an admin!</p>
      )}
      
      {/* This is the container that will hold the cards */}
      <div className="space-grid">
        {spaces.map((space) => (
          <div key={space.id} className="space-card">
            <div className="space-card-image-container">
              {space.image_url ? (
                <img src={space.image_url} alt={space.name} className="space-card-image" onError={(e) => e.target.src = 'https://placehold.co/400x200/CCCCCC/FFFFFF?text=No+Image'} />
              ) : (
                <span className="space-card-no-image">No Image Available</span>
              )}
            </div>
            <div className="space-card-content">
              <h4 className="space-card-title">{space.name}</h4>
              <p className="space-card-detail">
                <span className="space-card-detail-label">Location:</span> {space.location}
              </p>
              <p className="space-card-detail">
                <span className="space-card-detail-label">Price:</span> ${space.price_per_hour.toFixed(2)} / hour
              </p>
              <p className="space-card-detail">
                <span className="space-card-detail-label">Capacity:</span> {space.capacity} people
              </p>
              {space.description && (
                <p className="space-card-description">{space.description}</p>
              )}
              {space.amenities && space.amenities.length > 0 && (
                <div className="space-card-amenities">
                  <span className="space-card-detail-label">Amenities:</span>
                  <ul className="space-card-amenities-list">
                    {space.amenities.map((amenity, index) => (
                      <li key={index}>{amenity}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="space-card-footer">
              <button
                onClick={() => handleBookClick(space)}
                className="btn btn-primary"
              >
                Book Now
              </button>
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