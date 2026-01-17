import { useReducer, useCallback, useEffect, useRef } from 'react';
import { infiniteQueryReducer, initialInfiniteState } from '../reducer/infiniteQueryReducer';
import openLibraryService from '../services/OpenLibraryService';

/**
 * Custom infinite books query hook
 * @param {string} query - Search query
 * @returns {Object} Query state and methods
 */
export const useInfiniteBooks = (query) => {
  const [state, dispatch] = useReducer(infiniteQueryReducer, initialInfiniteState);
  const abortControllerRef = useRef(null);

  const fetchBooks = useCallback(async (page) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    dispatch({ type: 'FETCH_START' });

    try {
      const data = await openLibraryService.searchBooks(query, page);
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (error) {
      if (error.name !== 'AbortError') {
        dispatch({ type: 'FETCH_ERROR', payload: error.message });
      }
    }
  }, [query]);

  const fetchNextPage = useCallback(() => {
    if (state.hasNextPage && !state.isFetchingNextPage && !state.isLoading) {
      fetchBooks(state.currentPage);
    }
  }, [state.currentPage, state.hasNextPage, state.isFetchingNextPage, state.isLoading, fetchBooks]);

  useEffect(() => {
    if (query.length > 0) {
      dispatch({ type: 'RESET' });
      fetchBooks(1);
    }
  }, [query, fetchBooks]);

  return {
    data: { pages: state.pages },
    fetchNextPage,
    hasNextPage: state.hasNextPage,
    isFetchingNextPage: state.isFetchingNextPage,
    isLoading: state.isLoading,
    error: state.error
  };
};