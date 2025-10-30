import { HeartIcon } from "@heroicons/react/24/solid";
import { useAppContext } from "@/context/AppContext";
import type { Movie } from "@/services/moviesService";

export default function FavoriteAction({ movie }: { movie: Movie }) {
    const { toggleFavorite, isFavorite: checkFavorite } = useAppContext();
    const isFavorite = checkFavorite(movie.id);

    return (
        <div>
            <button onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(movie);
            }} className={`mt-2 inline-flex items-center gap-2 cursor-pointer ,
                ${isFavorite ? "bg-red-700 hover:bg-red-800" : "bg-gray-700 hover:bg-gray-700"}
                text-white px-4 py-2 rounded`}>
                <HeartIcon className="w-4 h-4 text-white" />
                {isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
            </button>
        </div>
    );
}
