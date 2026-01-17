// src/components/ui/Input.jsx
import React from "react";

export const Input = ({ value, onChange, placeholder = "", className = "" }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border border-gray-300 dark:border-gray-700 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  );
};
