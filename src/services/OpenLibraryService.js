import { SearchResponseModel } from '../models/BookModel';

/**
 * Open Library API Service
 * Handles all API interactions with Open Library
 */
class OpenLibraryService {
  constructor() {
    this.baseUrl = 'https://openlibrary.org';
    this.coverBaseUrl = 'https://covers.openlibrary.org/b/id';
    this.defaultLimit = 20;
  }

  /**
   * Search books from Open Library API
   * @param {string} query - Search query
   * @param {number} page - Page number (1-indexed)
   * @param {number} limit - Results per page
   * @returns {Promise<Object>}
   */
  async searchBooks(query, page = 1, limit = this.defaultLimit) {
    try {
      const searchUrl = `${this.baseUrl}/search.json`;
      const params = new URLSearchParams({
        q: query,
        page: page.toString(),
        limit: limit.toString()
      });

      const response = await fetch(`${searchUrl}?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      return SearchResponseModel.parse(data);
    } catch (error) {
      console.error('Error fetching books:', error);
      throw new Error(`Failed to fetch books: ${error.message}`);
    }
  }

  /**
   * Get cover image URL
   * @param {number} coverId - Cover ID from API
   * @param {string} size - Image size (S, M, L)
   * @returns {string|null}
   */
  getCoverUrl(coverId, size = 'L') {
    if (!coverId) return null;
    return `${this.coverBaseUrl}/${coverId}-${size}.jpg`;
  }

  /**
   * Get fallback cover URL
   * @param {number} coverId - Cover ID
   * @returns {string|null}
   */
  getFallbackCoverUrl(coverId) {
    return this.getCoverUrl(coverId, 'M');
  }
}

export default new OpenLibraryService();