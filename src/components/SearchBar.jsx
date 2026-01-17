import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

/**
 * SearchBar Component
 * Search input with icon
 */
export const SearchBar = ({ value, onChange, placeholder = "Search for books..." }) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
};