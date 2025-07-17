
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="flex gap-4">
        <Link to="/admin/spaces/add" className="hover:underline">Add Space</Link>
        <Link to="/admin/spaces" className="hover:underline">View Spaces</Link>
        <Link to="/admin/users/add" className="hover:underline">Add User</Link>
        <Link to="/admin/users" className="hover:underline">View Users</Link>
      </div>
    </nav>
  );
};

export default Navbar;
