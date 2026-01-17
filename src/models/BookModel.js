export const BookModel = {
  /**
   * Validate if an object is a valid book
   * @param {Object} book - Book object to validate
   * @returns {boolean}
   */
  isValid(book) {
    return book && typeof book.key === 'string' && typeof book.title === 'string';
  },
  
  /**
   * Get default values for missing book fields
   * @returns {Object}
   */
  getDefaults() {
    return {
      title: 'Unknown Title',
      author_name: [],
      first_publish_year: null,
      cover_i: null,
      subject: []
    };
  },

  /**
   * Parse and sanitize book data from API
   * @param {Object} rawBook - Raw book data from API
   * @returns {Object}
   */
  parse(rawBook) {
    return {
      key: rawBook.key || '',
      title: rawBook.title || 'Unknown Title',
      author_name: rawBook.author_name || [],
      first_publish_year: rawBook.first_publish_year || null,
      cover_i: rawBook.cover_i || null,
      subject: rawBook.subject || []
    };
  }
};

/**
 * Search Response Model
 * Defines the structure for API search responses
 */
export const SearchResponseModel = {
  /**
   * Parse and validate API response
   * @param {Object} response - Raw API response
   * @returns {Object}
   */
  parse(response) {
    return {
      docs: (response.docs || []).map(BookModel.parse),
      numFound: response.numFound || 0,
      start: response.start || 0
    };
  }
};