import { useEffect, useState } from "react";
import { getSpaces } from "../../services/api";
import { Link } from "react-router-dom";

export default function Home() {
  const [spaces, setSpaces] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    async function fetchSpaces() {
      try {
        const data = await getSpaces();
        setSpaces(data);
      } catch (error) {
        console.error("Error fetching spaces:", error);
      }
    }

    fetchSpaces();
  }, []);

  // Toggle handler
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <div className="px-6 py-10 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen transition-colors duration-300">
        {/* Dark Mode Toggle Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
          >
            {isDarkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
          </button>
        </div>

        <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-800 dark:text-white">
          Explore Unique Spaces
        </h1>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {spaces.map((space) => (
            <div
              key={space.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col group cursor-pointer"
            >
              {space.image ? (
                <div className="overflow-hidden">
                  <img
                    src={space.image}
                    alt={space.name}
                    className="w-full h-52 object-cover transform transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="w-full h-52 bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors duration-300">
                  {space.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{space.location}</p>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  KES {space.price}
                </p>
                <span
                  className={`text-xs font-semibold mb-2 ${
                    space.available ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {space.available ? "Available" : "Unavailable"}
                </span>

                <div className="mt-auto">
                  <Link
                    to={`/spaces/${space.id}`}
                    className="inline-block mt-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-transform duration-300 transform hover:scale-105 px-4 py-2 rounded-lg text-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
