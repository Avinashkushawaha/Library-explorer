import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * LoadingSpinner Component
 * Centered loading indicator with optional message
 */
export const LoadingSpinner = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600 dark:text-blue-400" />
      {message && (
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">{message}</p>
      )}
    </div>
  );
};