import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleAdminDropdown = () => setAdminDropdownOpen(!adminDropdownOpen);

  const linkClasses = ({ isActive }) =>
    `hover:underline hover:text-blue-500 dark:hover:text-blue-400 ${
      isActive ? "text-blue-600 dark:text-blue-400 font-semibold" : ""
    }`;

  return (
    <nav className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-md transition duration-300">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center h-20">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          Spacer
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-base font-medium">
          <NavLink to="/" className={linkClasses}>
            Home
          </NavLink>

          <div className="relative">
            <button
              onClick={toggleAdminDropdown}
              className="flex items-center gap-1 hover:underline hover:text-blue-500"
            >
              Admin <ChevronDown size={16} />
            </button>
            {adminDropdownOpen && (
              <div className="absolute top-8 bg-white dark:bg-gray-800 shadow-lg rounded-md p-2 z-10 min-w-[150px]">
                <NavLink
                  to="/admin/add-space"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      isActive
                        ? "bg-gray-100 dark:bg-gray-700 font-semibold"
                        : ""
                    }`
                  }
                >
                  Add Space
                </NavLink>
                <NavLink
                  to="/admin/view-spaces"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      isActive
                        ? "bg-gray-100 dark:bg-gray-700 font-semibold"
                        : ""
                    }`
                  }
                >
                  View Spaces
                </NavLink>
              </div>
            )}
          </div>

          <NavLink to="/login" className={linkClasses}>
            Login
          </NavLink>
        </div>

        {/* Hamburger for Mobile */}
        <button onClick={toggleMenu} className="md:hidden">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-2 text-base font-medium">
          <NavLink to="/" onClick={() => setMenuOpen(false)} className={linkClasses}>
            Home
          </NavLink>

          <div>
            <button
              onClick={toggleAdminDropdown}
              className="flex items-center gap-1 w-full text-left"
            >
              Admin <ChevronDown size={16} />
            </button>
            {adminDropdownOpen && (
              <div className="ml-4 mt-2 flex flex-col gap-2">
                <NavLink
                  to="/admin/add-space"
                  onClick={() => setMenuOpen(false)}
                  className={linkClasses}
                >
                  Add Space
                </NavLink>
                <NavLink
                  to="/admin/view-spaces"
                  onClick={() => setMenuOpen(false)}
                  className={linkClasses}
                >
                  View Spaces
                </NavLink>
              </div>
            )}
          </div>

          <NavLink to="/login" onClick={() => setMenuOpen(false)} className={linkClasses}>
            Login
          </NavLink>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
