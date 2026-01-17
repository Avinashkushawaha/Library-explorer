import React from "react";

export const Button = ({ children, className = "", size, ...props }) => {
  const sizeClasses =
    size === "icon"
      ? "p-2"
      : "px-4 py-2";

  return (
    <button
      {...props}
      className={`bg-black text-white dark:bg-white dark:text-black rounded-lg hover:opacity-80 transition ${sizeClasses} ${className}`}
    >
      {children}
    </button>
  );
};
