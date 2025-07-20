import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass =
    "block px-4 py-2 rounded hover:bg-blue-700 hover:text-yellow-300 transition-colors duration-200";
  const activeClass = "bg-blue-900 text-yellow-300";

  return (
    <aside className="w-64 bg-blue-800 text-white p-4 min-h-screen">
      <h2 className="text-xl font-bold mb-6 text-yellow-300">Admin Panel</h2>
      <nav className="flex flex-col gap-2">
        <NavLink
          to="/admin/spaces/add"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Add Space
        </NavLink>

        <NavLink
          to="/admin/spaces"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
           View Spaces
        </NavLink>

        <NavLink
          to="/admin/users/add"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
           Add User
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
           View Users
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
