import React from 'react';
import { BookOpen } from 'lucide-react';

/**
 * EmptyState Component
 * Display when no search results found
 */
export const EmptyState = ({ message = "No books found. Try a different search." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <BookOpen className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4" />
      <p className="text-gray-600 dark:text-gray-400">{message}</p>
    </div>
  );
};