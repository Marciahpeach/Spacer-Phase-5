import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [showAdminMenu, setShowAdminMenu] = useState(false);

  return (
    <nav className="bg-blue-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-gray-200">
          Spacer
        </Link>

        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="hover:text-gray-300 text-lg font-medium transition"
          >
            Home
          </Link>

          {/* Admin Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowAdminMenu(!showAdminMenu)}
              className="hover:text-gray-300 text-lg font-medium transition focus:outline-none"
            >
              Admin
            </button>

            {showAdminMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg z-10">
                <Link
                  to="/admin/add-space"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setShowAdminMenu(false)}
                >
                  Add Space
                </Link>
                <Link
                  to="/admin/view-spaces"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setShowAdminMenu(false)}
                >
                  View Spaces
                </Link>
                <Link
                  to="/admin/add-user"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setShowAdminMenu(false)}
                >
                  Add User
                </Link>
                <Link
                  to="/admin/view-users"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setShowAdminMenu(false)}
                >
                  View Users
                </Link>
              </div>
            )}
          </div>

          {/* Login Link */}
          <Link
            to="/login"
            className="hover:text-gray-300 text-lg font-medium transition"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
