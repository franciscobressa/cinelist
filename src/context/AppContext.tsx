import type { Movie } from "@/services/moviesService";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { searchMovies as searchMoviesServiceAPI } from "@/services/moviesService";

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
    setResults: (results: Movie[]) => void;
    searchMovies: (query: string) => void;
    loading: boolean;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<Movie[]>([]);
    const [sortBy, setSortBy] = useState<SortOption>("title");
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [results, setResults] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);

    const searchMovies = async (query: string) => {
        setLoading(true);
        const data = await searchMoviesServiceAPI(query);
        setResults(data);
        setLoading(false);
    };

    useEffect(() => {
        searchMovies(searchQuery);
    }, [searchQuery]);

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
        <AppContext.Provider value={{ favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite, sortBy, setSortBy, sortedFavorites, searchQuery, setSearchQuery, results, setResults, searchMovies, loading }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) throw new Error("useAppContext must be used inside AppProvider");
    return context;
}
