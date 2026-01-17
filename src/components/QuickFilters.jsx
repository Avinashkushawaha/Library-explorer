import React from 'react';
import { Button } from '@/components/ui/button';

/**
 * QuickFilters Component
 * Pre-defined topic filter buttons
 */
export const QuickFilters = ({ onSelect, activeQuery }) => {
  const filters = ['science', 'mathematics', 'history', 'biology', 'astronomy'];
  
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Button
          key={filter}
          variant={activeQuery === filter ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSelect(filter)}
          className="capitalize"
        >
          {filter}
        </Button>
      ))}
    </div>
  );
};
