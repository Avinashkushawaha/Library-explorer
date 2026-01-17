import React from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * BackToTopButton Component
 * Floating button to scroll to page top
 */
export const BackToTopButton = ({ show }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!show) return null;

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 rounded-full w-12 h-12 shadow-lg z-50 transition-opacity duration-300"
      size="icon"
      aria-label="Back to top"
    >
      <ArrowUp className="w-5 h-5" />
    </Button>
  );
};