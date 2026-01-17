import React from 'react';
import { BookCard } from './BookCard';
import { BookCardSkeleton } from './BookCardSkeleton';

/**
 * BookGrid Component
 * Responsive grid container for book cards
 */
export const BookGrid = ({ books, isLoading, skeletonCount = 20 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 auto-rows-max">
      {books.map((book) => (
        <BookCard key={book.key} book={book} />
      ))}
      
      {isLoading && Array.from({ length: skeletonCount }).map((_, idx) => (
        <BookCardSkeleton key={`skeleton-${idx}`} />
      ))}
    </div>
  );
};
