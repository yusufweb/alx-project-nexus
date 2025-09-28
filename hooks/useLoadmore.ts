import { useState, useEffect, useCallback } from "react";
import { UseLoadMoreState } from "@/interfaces";
import { PaginatedResponse } from "@/interfaces";

// Define the shape of the fetcher function required by the hook
type Fetcher<T> = (page: number) => Promise<PaginatedResponse<T>>;

/**
 * Custom hook to handle fetching and concatenating paginated data (Load More pattern).
 * * @param fetcher A function that takes a page number and returns a Promise of the paginated data.
 * @param initialData The initial array of items (Page 1 results from getServerSideProps).
 * @param initialTotalPages The initial total number of pages.
 */
export function useLoadMore<T>(
  fetchFunction: Fetcher<T>,
  initialData: T[] = [],
  initialTotalPages: number = 1
): UseLoadMoreState<T> {
  // State for the main data array
  const [items, setItems] = useState<T[]>(initialData);

  // State for the current page number (starts at 1, the page we already have)
  const [pageCount, setPageCount] = useState<number>(1);

  // State for loading status
  const [loading, setLoading] = useState<boolean>(false);

  // State to determine if there are more pages to load
  const [hasMore, setHasMore] = useState<boolean>(
    initialData.length > 0 && initialTotalPages > 1
  );

  // --- CRITICAL FIX: Reset state when new search results are provided ---
  useEffect(() => {
    // This runs whenever the component receives new initial data (i.e., a new search query runs)
    // The previous state is discarded, and the hook is re-initialized with the new props.
    setItems(initialData);
    setPageCount(1); // Reset to page 1
    setHasMore(initialTotalPages > 1);
  }, [initialData, initialTotalPages]);

  // Function to load the next page of results
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const nextPage = pageCount + 1;

    try {
      const data = await fetchFunction(nextPage);

      // Append new items to the existing list
      setItems((prevItems) => [...prevItems, ...data.results]);

      // Update page tracking
      setPageCount(nextPage);

      // Check if we have reached the last page
      if (nextPage >= data.total_pages) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more items:", error);
      // In a real app, you might set an error state here
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, pageCount, fetchFunction]);

  return {
    items,
    loading,
    hasMore,
    loadMore,
  };
}
