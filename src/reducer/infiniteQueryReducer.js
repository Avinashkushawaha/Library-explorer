export const initialInfiniteState = {
  pages: [],
  isLoading: false,
  isFetchingNextPage: false,
  error: null,
  hasNextPage: true,
  currentPage: 1
};

/**
 * Reducer for managing infinite scroll state
 * @param {Object} state - Current state
 * @param {Object} action - Action to perform
 * @returns {Object} New state
 */
export function infiniteQueryReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        isLoading: state.pages.length === 0,
        isFetchingNextPage: state.pages.length > 0,
        error: null
      };
    
    case 'FETCH_SUCCESS':
      const newPages = [...state.pages, action.payload];
      const totalFetched = newPages.length * 20;
      const hasMore = totalFetched < action.payload.numFound;
      
      return {
        ...state,
        pages: newPages,
        isLoading: false,
        isFetchingNextPage: false,
        hasNextPage: hasMore,
        currentPage: state.currentPage + 1
      };
    
    case 'FETCH_ERROR':
      return {
        ...state,
        isLoading: false,
        isFetchingNextPage: false,
        error: action.payload
      };
    
    case 'RESET':
      return {
        ...initialInfiniteState,
        currentPage: 1
      };
    
    default:
      return state;
  }
}