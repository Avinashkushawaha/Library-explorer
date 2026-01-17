import React, { useState, useCallback } from 'react';
import { BookOpen } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { useTheme } from '../hooks/useTheme';
import { useInfiniteBooks } from '../hooks/useInfiniteBooks';
import { BookGrid } from '../components/BookGrid';
import { QuickFilters } from '../components/QuickFilters';
import { SearchBar } from '../components/SearchBar';
import { ThemeToggle } from '../components/ThemeToggle';
import { BackToTopButton } from '../components/BackToTopButton';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { BookCardSkeleton } from '../components/BookCardSkeleton';

/**
 * LibraryPage Component
 * Main page orchestrating all functionality
 */
export const LibraryPage = () => {
  const [searchInput, setSearchInput] = useState('science');
  const debouncedQuery = useDebounce(searchInput, 400);
  const { theme, toggleTheme } = useTheme();
  const showBackToTop = useScrollPosition(500);

  const { 
    data, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage, 
    isLoading, 
    error 
  } = useInfiniteBooks(debouncedQuery);

  const sentinelRef = useInfiniteScroll(
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  );

  const handleQuickFilter = useCallback((filter) => {
    setSearchInput(filter);
  }, []);

  const allBooks = data?.pages.flatMap(page => page.docs) || [];
  const totalBooks = data?.pages[0]?.numFound || 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Open Library Explorer
              </h1>
            </div>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
          
          <div className="space-y-3">
            <SearchBar value={searchInput} onChange={setSearchInput} />
            <QuickFilters onSelect={handleQuickFilter} activeQuery={debouncedQuery} />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {error && <ErrorState message={error} />}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {Array.from({ length: 20 }).map((_, idx) => (
              <BookCardSkeleton key={idx} />
            ))}
          </div>
        ) : allBooks.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Found {totalBooks.toLocaleString()} books
            </div>
            <BookGrid books={allBooks} isLoading={isFetchingNextPage} skeletonCount={20} />
            
            <div ref={sentinelRef} className="h-20 flex items-center justify-center mt-8">
              {isFetchingNextPage && <LoadingSpinner message="Loading more books..." />}
              {!hasNextPage && allBooks.length > 0 && (
                <p className="text-gray-500 dark:text-gray-400">
                  You've reached the end • {allBooks.length.toLocaleString()} books loaded
                </p>
              )}
            </div>
          </>
        )}
      </main>

      <BackToTopButton show={showBackToTop} />
    </div>
  );
};

