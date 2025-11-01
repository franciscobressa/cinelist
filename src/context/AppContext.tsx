import type { Movie } from "@/services/moviesService";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { searchMovies as searchMoviesServiceAPI, getPopularMovies } from "@/services/moviesService";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useDebounce } from "@/hooks/useDebounce";
import { useToast } from "@/context/ToastContext";
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
    popularError: boolean;
    loadNextPopularPage: (signal?: AbortSignal) => Promise<void>;
    resetPopular: () => void;
    searchError: boolean;
    setSearchError: (error: boolean) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const { showToast } = useToast();
    const [favorites, setFavorites] = useLocalStorage<Movie[]>(
        'cinelist-favorites',
        []
    );

    const [sortBy, setSortBy] = useLocalStorage<SortOption>(
        'cinelist-sortBy',
        'title'
    );

    const [searchQuery, setSearchQuery] = useState<string>("");
    const debouncedSearchQuery = useDebounce(searchQuery, 500);
    const [results, setResults] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [totalResults, setTotalResults] = useState(0);
    const [searchError, setSearchError] = useState(false);

    const resetSearch = () => {
        setResults([]);
        setPage(1);
        setHasMore(true);
        setTotalResults(0);
        setSearchError(false);
    };

    const loadNextPage = async () => {
        if (!debouncedSearchQuery.trim() || loading || !hasMore || searchError) return;
        setLoading(true);
        try {
            const data = await searchMoviesServiceAPI(debouncedSearchQuery, page);

            setResults((prev) => [...prev, ...data.results]);
            setHasMore(data.results.length > 0);
            setTotalResults(data.total_results || 0);
            if (data.results.length === 0) {
                setHasMore(false);
            } else {
                setPage((p) => p + 1);
            }
        } catch (error: any) {
            showToast("Erro ao buscar filmes", "error");
            setSearchError(true);
            if (error.name === 'CanceledError' || error.name === 'AbortError') {
                return;
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        resetSearch();
    }, [searchQuery]);

    useEffect(() => {
        loadNextPage();
    }, [debouncedSearchQuery]);

    const [popular, setPopular] = useState<Movie[]>([]);
    const [popularPage, setPopularPage] = useState(1);
    const [popularLoading, setPopularLoading] = useState(false);
    const [popularHasMore, setPopularHasMore] = useState(true);
    const [popularError, setPopularError] = useState(false);

    const resetPopular = () => {
        setPopular([]);
        setPopularPage(1);
        setPopularHasMore(true);
        setPopularError(false);
    };

    const loadNextPopularPage = async () => {
        if (popularLoading || !popularHasMore) return;
        setPopularLoading(true);
        try {
            const data = await getPopularMovies(popularPage);

            setPopular((prev) => [...prev, ...data]);
            setPopularHasMore(data.length > 0);
            setPopularPage((p) => p + 1);
        } catch (error: any) {
            showToast("Erro ao buscar filmes populares", "error");
            setPopularError(true);
            if (error.name === 'CanceledError' || error.name === 'AbortError') {
                return;
            }
        } finally {
            setPopularLoading(false);
        }
    };



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
        <AppContext.Provider value={{ favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite, sortBy, setSortBy, sortedFavorites, searchQuery, setSearchQuery, results, loading, hasMore, loadNextPage, resetSearch, totalResults, popular, popularLoading, popularHasMore, popularError, loadNextPopularPage, resetPopular, searchError, setSearchError }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) throw new Error("useAppContext must be used inside AppProvider");
    return context;
}
