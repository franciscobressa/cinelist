import { FilmIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { useAppContext } from "@/context/AppContext";
import MovieCard from "@/components/MovieCard";
import Title from "@/components/shared/Title";
import MovieListWrapper from "@/components/shared/MovieListWrapper";
import SortSelector from "@/components/shared/SortSelector";

export default function FavoritesPage() {
    const navigate = useNavigate();
    const { favorites, sortedFavorites } = useAppContext();

    if (favorites.length === 0) {
        return (
            <MainLayout>
                <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
                    <div className="w-24 h-24 bg-linear-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center">
                        <FilmIcon className="w-14 h-14 text-white" />
                    </div>
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold text-gray-300 mb-2">Nenhum filme favorito ainda</h1>
                        <p className="text-gray-400">Comece explorando filmes populares e adicione seus favoritos!</p>
                    </div>
                    <button
                        onClick={() => navigate("/")}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                        Explorar Filmes
                    </button>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <Title>Meus Filmes Favoritos</Title>
            <SortSelector />
            <MovieListWrapper>
                {sortedFavorites.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </MovieListWrapper>
        </MainLayout>
    );
}