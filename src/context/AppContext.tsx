import type { Movie } from "@/services/moviesService";
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type AppContextType = {
    favorites: Movie[];
    addFavorite: (favorite: Movie) => void;
    removeFavorite: (id: number) => void;
    toggleFavorite: (movie: Movie) => void;
    isFavorite: (id: number) => boolean;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {

    const [favorites, setFavorites] = useState<Movie[]>([]);

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

    return (
        <AppContext.Provider value={{ favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) throw new Error("useAppContext must be used inside AppProvider");
    return context;
}
