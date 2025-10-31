import type { Movie } from "@/services/moviesService";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { searchMovies as searchMoviesServiceAPI, getPopularMovies } from "@/services/moviesService";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useDebounce } from "@/hooks/useDebounce";
import { isValidMovieArray, isValidSortOption } from "@/utils/storage";

export type SortOption = "title" | "title-desc" | "rating" | "rating-desc" | "year" | "year-desc";

type AppContextType = {
    favorites: Movie[];
    addFavorite: (favorite: Movie) => void;
    removeFavorite: (id: number) => void;
    toggleFavorite: (movie: Movie) => void;
    isFavorite: (id: number) => boolean;
    sortBy: SortOption;
    setSortBy: (sort: SortOption) => void;
    sortedFavorites: Movie[];
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    results: Movie[];
    loading: boolean;
    hasMore: boolean;
    loadNextPage: (signal?: AbortSignal) => Promise<void>;
    resetSearch: () => void;
    totalResults: number;
    popular: Movie[];
    popularLoading: boolean;
    popularHasMore: boolean;
    loadNextPopularPage: (signal?: AbortSignal) => Promise<void>;
    resetPopular: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    // Persisted state using custom localStorage hook with validation
    const [favorites, setFavorites] = useLocalStorage<Movie[]>(
        'cinelist-favorites',
        [],
        isValidMovieArray
    );
    const [sortBy, setSortBy] = useLocalStorage<SortOption>(
        'cinelist-sortBy',
        'title',
        isValidSortOption
    );
    const [searchQuery, setSearchQuery] = useState<string>("");
    const debouncedSearchQuery = useDebounce(searchQuery, 500);
    const [results, setResults] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [totalResults, setTotalResults] = useState(0);

    const resetSearch = () => {
        setResults([]);
        setPage(1);
        setHasMore(true);
        setTotalResults(0);
    };

    const loadNextPage = async (signal?: AbortSignal) => {
        if (!debouncedSearchQuery.trim() || loading || !hasMore) return;
        setLoading(true);
        try {
            const data = await searchMoviesServiceAPI(debouncedSearchQuery, page, signal);

            // Check if request was aborted
            if (signal?.aborted) return;

            setResults((prev) => [...prev, ...data.results]);
            setHasMore(data.results.length > 0);
            setTotalResults(data.total_results || 0);
            setPage((p) => p + 1);
        } catch (error: any) {
            // Don't update state if request was cancelled
            if (error.name === 'CanceledError' || error.name === 'AbortError') {
                console.log('Search request cancelled');
                return;
            }
            console.error('Error loading search results:', error);
        } finally {
            // Only set loading to false if not aborted
            if (!signal?.aborted) {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        if (!debouncedSearchQuery.trim()) {
            setResults([]);
            setHasMore(false);
            setPage(1);
            return;
        }

        // Create AbortController to cancel request if needed
        const controller = new AbortController();

        // Trigger search after debounce delay (500ms)
        resetSearch();
        loadNextPage(controller.signal);

        // Cleanup: abort request if query changes or component unmounts
        return () => {
            controller.abort();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchQuery]);

    // Popular movies (Home) pagination
    const [popular, setPopular] = useState<Movie[]>([]);
    const [popularPage, setPopularPage] = useState(1);
    const [popularLoading, setPopularLoading] = useState(false);
    const [popularHasMore, setPopularHasMore] = useState(true);

    const resetPopular = () => {
        setPopular([]);
        setPopularPage(1);
        setPopularHasMore(true);
    };

    const loadNextPopularPage = async (signal?: AbortSignal) => {
        if (popularLoading || !popularHasMore) return;
        setPopularLoading(true);
        try {
            const data = await getPopularMovies(popularPage, signal);

            // Check if request was aborted
            if (signal?.aborted) return;

            // artificial small delay to smooth UX
            await new Promise((r) => setTimeout(r, 500));

            // Check again after delay
            if (signal?.aborted) return;

            setPopular((prev) => [...prev, ...data]);
            setPopularHasMore(data.length > 0);
            setPopularPage((p) => p + 1);
        } catch (error: any) {
            // Don't update state if request was cancelled
            if (error.name === 'CanceledError' || error.name === 'AbortError') {
                console.log('Popular movies request cancelled');
                return;
            }
            console.error('Error loading popular movies:', error);
        } finally {
            // Only set loading to false if not aborted
            if (!signal?.aborted) {
                setPopularLoading(false);
            }
        }
    };

    // initial load for home
    useEffect(() => {
        if (popular.length === 0 && !popularLoading) {
            // Create AbortController to cancel request if component unmounts
            const controller = new AbortController();
            loadNextPopularPage(controller.signal);

            // Cleanup: abort request if component unmounts
            return () => {
                controller.abort();
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addFavorite = (favorite: Movie) => {
        if (!favorites.some((f) => f.id === favorite.id)) {
            setFavorites([...favorites, favorite]);
        }
    };

    const removeFavorite = (id: number) => {
        setFavorites(favorites.filter((favorite) => favorite.id !== id));
    };

    const toggleFavorite = (movie: Movie) => {
        if (favorites.some((f) => f.id === movie.id)) {
            removeFavorite(movie.id);
        } else {
            addFavorite(movie);
        }
    };

    const isFavorite = (id: number) => {
        return favorites.some((favorite) => favorite.id === id);
    };

    const sortedFavorites = useMemo(() => {
        // Create a copy to avoid mutations - always safe and predictable
        const sorted = [...favorites];

        switch (sortBy) {
            case "title":
                return sorted.sort((a, b) => a.title.localeCompare(b.title));
            case "title-desc":
                return sorted.sort((a, b) => b.title.localeCompare(a.title));
            case "rating":
                return sorted.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
            case "rating-desc":
                return sorted.sort((a, b) => (a.vote_average || 0) - (b.vote_average || 0));
            case "year":
                return sorted.sort((a, b) => a.release_date.localeCompare(b.release_date));
            case "year-desc":
                return sorted.sort((a, b) => b.release_date.localeCompare(a.release_date));
            default:
                return sorted;
        }
    }, [favorites, sortBy]);


    return (
        <AppContext.Provider value={{ favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite, sortBy, setSortBy, sortedFavorites, searchQuery, setSearchQuery, results, loading, hasMore, loadNextPage, resetSearch, totalResults, popular, popularLoading, popularHasMore, loadNextPopularPage, resetPopular }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) throw new Error("useAppContext must be used inside AppProvider");
    return context;
}
