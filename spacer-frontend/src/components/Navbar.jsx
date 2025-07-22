import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-black shadow-md fixed top-0 left-0 right-0 z-50 border-b border-gray-200">
      <div className="w-full">
        <div className="items-center h-15 w-full">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-extrabold text-blue-600 flex text-center"
          >
            Spacer
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6 items-center text-gray-800 font-medium place-items-center justify-end pr-20">
            <Link
              to="/"
              className="hover:text-blue-600 hover:underline transition text-white"
            >
              Home
            </Link>

            <div className="relative">
              <button
                onClick={() => setShowAdminMenu(!showAdminMenu)}
                className="hover:text-blue-600 hover:underline transition text-white"
              >
                Admin ▾
              </button>
              {showAdminMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-blue rounded-md border border-b-emerald-500">
                  <Link
                    to="/admin/add-space"
                    onClick={() => setShowAdminMenu(false)}
                    className="block px-4 py-2 hover:bg-blue-50 text-sm text-blue"
                  >
                    ➕ Add Space
                  </Link>
                  <Link
                    to="/admin/view-spaces"
                    onClick={() => setShowAdminMenu(false)}
                    className="block px-4 py-2 hover:bg-blue-50 text-sm text-blue"
                  >
                    🏢 View Spaces
                  </Link>
                  <Link
                    to="/admin/add-user"
                    onClick={() => setShowAdminMenu(false)}
                    className="block px-4 py-2 hover:bg-blue-50 text-sm"
                  >
                    
                  </Link>
                 
                </div>
              )}
            </div>

            <Link
              to="/login"
              className="hover:text-blue-600 hover:underline transition text-white"
            >
              Login
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-800"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-md px-4 py-4 space-y-2 text-gray-800">
          <Link to="/" className="block py-2 hover:bg-gray-100 rounded">
            Home
          </Link>

          <div>
            <p className="font-semibold text-gray-700">Admin</p>
            <Link
              to="/admin/add-space"
              className="block py-20 mx-30 rounded text-blue-600 text-center"
            >
              ➕ Add Space
            </Link>
            <Link
              to="/admin/view-spaces"
              className="block py-2 rounded  text-gray-950 text-center"
            >
              🏢 View Spaces
            </Link>
        
          </div>

          <Link
            to="/login"
            className="block py-2 px-2 rounded"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
