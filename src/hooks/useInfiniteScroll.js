import { useEffect, useRef } from 'react';

/**
 * Infinite scroll hook using IntersectionObserver
 * @param {Function} callback - Callback when sentinel is visible
 * @param {boolean} hasMore - Whether more data exists
 * @param {boolean} isLoading - Whether currently loading
 * @returns {React.RefObject} Sentinel ref
 */
export const useInfiniteScroll = (callback, hasMore, isLoading) => {
  const observerRef = useRef(null);
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !isLoading) {
          callback();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observerRef.current.observe(currentSentinel);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [callback, hasMore, isLoading]);

  return sentinelRef;
};
