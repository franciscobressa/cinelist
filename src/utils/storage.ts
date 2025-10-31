import type { Movie } from "@/services/moviesService";
import type { SortOption } from "@/context/AppContext";

/**
 * Validates if a value is a valid Movie object
 */
function isValidMovie(obj: any): obj is Movie {
  return (
    obj &&
    typeof obj === "object" &&
    typeof obj.id === "number" &&
    typeof obj.title === "string" &&
    typeof obj.poster_path === "string" &&
    typeof obj.release_date === "string"
  );
}

/**
 * Validates if an array contains only valid Movie objects
 */
export function isValidMovieArray(arr: any): arr is Movie[] {
  return Array.isArray(arr) && arr.every(isValidMovie);
}

/**
 * Validates if a value is a valid SortOption
 */
export function isValidSortOption(value: any): value is SortOption {
  const validOptions: SortOption[] = [
    "title",
    "title-desc",
    "rating",
    "rating-desc",
    "year",
    "year-desc",
  ];
  return (
    typeof value === "string" && validOptions.includes(value as SortOption)
  );
}
