// src/components/ui/Badge.jsx
import React from "react";

export const Badge = ({ children, className = "", variant }) => {
  const baseClasses = "inline-block px-2 py-1 rounded text-white text-xs font-medium";

  let variantClasses = "";
  switch (variant) {
    case "secondary":
      variantClasses = "bg-gray-500";
      break;
    case "primary":
      variantClasses = "bg-blue-500";
      break;
    default:
      variantClasses = "bg-gray-400";
  }

  return (
    <span className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </span>
  );
};
