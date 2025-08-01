// / frontend/src/components/SpaceDetailsModal.jsx
import React from 'react';

function SpaceDetailsModal({ space, onClose, onBookNow }) {
  if (!space) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
        >
          &times;
        </button>
        <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">{space.name}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="relative h-64 w-full bg-gray-200 flex items-center justify-center text-gray-400 rounded-lg overflow-hidden">
            {space.image_url ? (
              <img src={space.image_url} alt={space.name} className="w-full h-full object-cover" onError={(e) => e.target.src = 'https://placehold.co/600x400/CCCCCC/FFFFFF?text=No+Image'} />
            ) : (
              <span className="text-center">No Image Available</span>
            )}
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <p className="mb-2"><span className="font-semibold text-gray-700">Location:</span> {space.location}</p>
              <p className="mb-2"><span className="font-semibold text-gray-700">Price:</span> ${space.price_per_hour.toFixed(2)} / hour</p>
              <p className="mb-2"><span className="font-semibold text-gray-700">Capacity:</span> {space.capacity} people</p>
              <p className="mb-2">
                <span className="font-semibold text-gray-700">Availability:</span>{' '}
                {space.is_available ? (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Available</span>
                ) : (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Unavailable</span>
                )}
              </p>
            </div>
            {space.is_available && (
              <button
                onClick={() => onBookNow(space)}
                className="mt-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out"
              >
                Book This Space
              </button>
            )}
          </div>
        </div>

        {space.description && (
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-gray-700 mb-2">Description:</h4>
            <p className="text-gray-700 leading-relaxed">{space.description}</p>
          </div>
        )}

        {space.amenities && space.amenities.length > 0 && (
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-gray-700 mb-2">Amenities:</h4>
            <ul className="list-disc list-inside text-gray-700 grid grid-cols-1 md:grid-cols-2 gap-1">
              {space.amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="text-right text-sm text-gray-500">
          <p>Space ID: {space.id}</p>
          <p>Owner ID: {space.owner_id}</p>
          <p>Created: {new Date(space.created_at).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}

export default SpaceDetailsModal;
