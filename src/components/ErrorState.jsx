import React from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * ErrorState Component
 * Display when API error occurs
 */
export const ErrorState = ({ message = "Error loading books. Please try again." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <AlertCircle className="w-16 h-16 text-red-500 dark:text-red-400 mb-4" />
      <p className="text-red-600 dark:text-red-400">{message}</p>
    </div>
  );
};
