// frontend/src/components/AdminDashboard.jsx
import React, { useState } from 'react';
import UserManagement from './UserManagement';
import SpaceManagement from './SpaceManagement';
import UserBookings from './UserBookings'; // This is for Admin to view all bookings

function AdminDashboard() {
  const [adminCurrentView, setAdminCurrentView] = useState('users'); // 'users', 'spaces', or 'bookings'

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Admin Dashboard</h2>

      {/* Admin Sub-Navigation */}
      <div className="mb-8 flex space-x-4">
        <button
          onClick={() => setAdminCurrentView('users')}
          className={`px-5 py-2 rounded-lg font-semibold transition-colors duration-200 ${
            adminCurrentView === 'users' ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Manage Users
        </button>
        <button
          onClick={() => setAdminCurrentView('spaces')}
          className={`px-5 py-2 rounded-lg font-semibold transition-colors duration-200 ${
            adminCurrentView === 'spaces' ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Manage Spaces
        </button>
        <button
          onClick={() => setAdminCurrentView('bookings')}
          className={`px-5 py-2 rounded-lg font-semibold transition-colors duration-200 ${
            adminCurrentView === 'bookings' ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          View All Bookings
        </button>
      </div>

      {/* Render content based on sub-navigation */}
      {adminCurrentView === 'users' && <UserManagement />}
      {adminCurrentView === 'spaces' && <SpaceManagement />}
      {adminCurrentView === 'bookings' && <UserBookings isAdminView={true} />} {/* Pass prop for admin view */}
    </div>
  );
}

export default AdminDashboard;