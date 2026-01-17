import { useState, useEffect } from 'react';

/**
 * Track scroll position for UI elements
 * @param {number} threshold - Scroll threshold in pixels
 * @returns {boolean} Whether scroll exceeds threshold
 */
export const useScrollPosition = (threshold = 500) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > threshold);
    };

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll);
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [threshold]);

  return showButton;
};
