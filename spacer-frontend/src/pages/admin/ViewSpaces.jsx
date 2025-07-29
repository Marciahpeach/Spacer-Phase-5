import { useEffect, useState } from "react";
import { getSpaces } from "../../services/api";

export default function ViewSpaces() {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    const data = getSpaces();
    setSpaces(data);
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">All Spaces</h1>

      {spaces.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">
          No spaces found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {spaces.map((space) => (
            <div
              key={space.id}
              className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden border dark:border-gray-700"
            >
              <img
                src={space.image || "https://via.placeholder.com/400x250"}
                alt={space.name}
                className="w-full h-52 object-cover"
              />

              <div className="p-4 space-y-2">
                <h2 className="text-xl font-semibold">{space.name}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Location: {space.location}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Price: <span className="font-medium">KES {space.price}</span>
                </p>

                <p
                  className={`text-sm font-medium ${
                    space.available
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {space.available ? "Available" : "Booked"}
                </p>

                {space.booking && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Booked by: {space.booking.name} on {space.booking.date}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
