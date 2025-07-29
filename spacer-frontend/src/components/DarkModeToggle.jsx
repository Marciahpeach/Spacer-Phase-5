// src/components/DarkModeToggle.jsx
import { useEffect, useState } from "react";

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-3 rounded-full shadow-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? "🌙" : "☀️"}
      </button>
    </div>
  );
}

export default DarkModeToggle;
