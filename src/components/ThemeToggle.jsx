import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * ThemeToggle Component
 * Button to toggle between dark and light themes
 */
export const ThemeToggle = ({ theme, onToggle }) => {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onToggle}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </Button>
  );
};