// src/components/Button.jsx
export function Button({ children, onClick, variant = "primary", ...props }) {
  const base = "px-4 py-2 rounded font-semibold transition-all";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-100",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
}
