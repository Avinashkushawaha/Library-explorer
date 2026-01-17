import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { Card } from "@/components/ui/card";

import { Badge } from '@/components/ui/badge';
//  import * as openLibraryService from '@/services/openLibrary.service';
 import openLibraryService from '../services/OpenLibraryService';

/**
 * BookCard Component
 * Displays individual book with cover, title, author, year, subjects
 */
export const BookCard = ({ book }) => {
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(() => 
    book.cover_i ? openLibraryService.getCoverUrl(book.cover_i) : null
  );

  const handleImageError = () => {
    if (book.cover_i && !imageError) {
      setImageSrc(openLibraryService.getFallbackCoverUrl(book.cover_i));
      setImageError(true);
    } else {
      setImageSrc(null);
    }
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
      <div className="aspect-[2/3] relative bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={book.title}
            className="w-full h-full object-cover"
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-gray-400 dark:text-gray-500" />
          </div>
        )}
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-bold text-lg line-clamp-2 text-gray-900 dark:text-white">
          {book.title || 'Unknown Title'}
        </h3>

        {book.author_name && book.author_name.length > 0 && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
            {book.author_name.slice(0, 2).join(', ')}
          </p>
        )}

        {book.first_publish_year && (
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Published: {book.first_publish_year}
          </p>
        )}

        {book.subject && book.subject.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {book.subject.slice(0, 3).map((subject, idx) => (
              <Badge 
                key={idx} 
                variant="secondary" 
                className="text-xs truncate max-w-full"
              >
                {subject}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};