import React, { useState } from 'react';
import UserManagement from './UserManagement';
import SpaceManagement from './SpaceManagement';
import UserBookings from './UserBookings';

function AdminDashboard() {
  const [adminCurrentView, setAdminCurrentView] = useState('users');

  return (
    <div className="admin-dashboard-container">
      <h2 className="admin-dashboard-title">Admin Dashboard</h2>

      <div className="admin-nav">
        <button
          onClick={() => setAdminCurrentView('users')}
          className={`admin-nav-button ${adminCurrentView === 'users' ? 'active' : ''}`}
        >
          Manage Users
        </button>
        <button
          onClick={() => setAdminCurrentView('spaces')}
          className={`admin-nav-button ${adminCurrentView === 'spaces' ? 'active' : ''}`}
        >
          Manage Spaces
        </button>
        <button
          onClick={() => setAdminCurrentView('bookings')}
          className={`admin-nav-button ${adminCurrentView === 'bookings' ? 'active' : ''}`}
        >
          View All Bookings
        </button>
      </div>

      <div className="admin-content">
        {adminCurrentView === 'users' && <UserManagement />}
        {adminCurrentView === 'spaces' && <SpaceManagement />}
        {adminCurrentView === 'bookings' && <UserBookings isAdminView={true} />}
      </div>
    </div>
  );
}

export default AdminDashboard;