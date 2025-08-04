import React from 'react';

function SpaceDetailsModal({ space, onClose, onBookNow }) {
  if (!space) return null;

  return (
    <div className="modal-overlay">
      <div className="space-details-modal-content">
        <button onClick={onClose} className="modal-close-button">&times;</button>
        <h3 className="modal-title">{space.name}</h3>

        <div className="space-details-grid">
          <div className="space-details-image-container">
            {space.image_url ? (
              <img src={space.image_url} alt={space.name} className="space-details-image" onError={(e) => e.target.src = 'https://placehold.co/600x400/CCCCCC/FFFFFF?text=No+Image'} />
            ) : (
              <span className="space-details-no-image">No Image Available</span>
            )}
          </div>
          <div className="space-details-info">
            <div>
              <p className="space-details-item"><span className="space-details-label">Location:</span> {space.location}</p>
              <p className="space-details-item"><span className="space-details-label">Price:</span> ${space.price_per_hour.toFixed(2)} / hour</p>
              <p className="space-details-item"><span className="space-details-label">Capacity:</span> {space.capacity} people</p>
              <p className="space-details-item">
                <span className="space-details-label">Availability:</span>{' '}
                {space.is_available ? (
                  <span className="status-badge status-available">Available</span>
                ) : (
                  <span className="status-badge status-unavailable">Unavailable</span>
                )}
              </p>
            </div>
            {space.is_available && (
              <button
                onClick={() => onBookNow(space)}
                className="btn btn-primary"
              >
                Book This Space
              </button>
            )}
          </div>
        </div>

        {space.description && (
          <div className="space-details-section">
            <h4 className="space-details-section-title">Description:</h4>
            <p className="space-details-description">{space.description}</p>
          </div>
        )}

        {space.amenities && space.amenities.length > 0 && (
          <div className="space-details-section">
            <h4 className="space-details-section-title">Amenities:</h4>
            <ul className="space-details-amenities">
              {space.amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="space-details-footer">
          <p>Space ID: {space.id}</p>
          <p>Owner ID: {space.owner_id}</p>
          <p>Created: {new Date(space.created_at).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}

export default SpaceDetailsModal;