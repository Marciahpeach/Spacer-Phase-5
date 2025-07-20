import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md py-4 px-6 md:px-10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between items-center">
        {/* Brand */}
        <Link
          to="/"
          className="text-2xl md:text-3xl font-extrabold text-blue-700 tracking-wide mb-2 md:mb-0"
        >
          Spacer
        </Link>

        {/* Navigation Links */}
        <ul className="flex flex-wrap justify-center gap-6 md:gap-12 text-gray-800 font-semibold text-base md:text-lg">
          <li>
            <Link
              to="/"
              className="hover:text-blue-500 transition duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/admin/spaces"
              className="hover:text-blue-500 transition duration-200"
            >
              Spaces
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className="hover:text-blue-500 transition duration-200"
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="hover:text-blue-500 transition duration-200"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
