import { useEffect, useState } from "react";

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    const theme = localStorage.getItem("theme");
    if (theme !== null) return theme === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
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
        className="w-12 h-12 text-xl flex items-center justify-center rounded-full shadow-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        aria-label="Toggle Dark Mode"
        title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        <span className="transition duration-300 ease-in-out transform scale-125">
          {darkMode ? "🌙" : "☀️"}
        </span>
      </button>
    </div>
  );
}

export default DarkModeToggle;
