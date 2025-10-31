import { HeartIcon } from "@heroicons/react/24/solid";
import { useAppContext } from "@/context/AppContext";
import { useToast } from "@/context/ToastContext";
import type { Movie } from "@/services/moviesService";

export default function FavoriteAction({ movie }: { movie: Movie }) {
    const { toggleFavorite, isFavorite: checkFavorite } = useAppContext();
    const { showToast } = useToast();
    const isFavorite = checkFavorite(movie.id);

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleFavorite(movie);
        
        // Show toast notification
        if (isFavorite) {
            showToast("Removido dos favoritos", "info");
        } else {
            showToast("Adicionado aos favoritos!", "success");
        }
    };

    return (
        <div>
            <button 
                onClick={handleClick}
                className={`mt-2 inline-flex items-center gap-2 cursor-pointer transition-colors ,
                    ${isFavorite ? "bg-red-700 hover:bg-red-800" : "bg-gray-700 hover:bg-gray-800"}
                    text-white px-4 py-2 rounded`}
            >
                <HeartIcon className="w-4 h-4 text-white" />
                {isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
            </button>
        </div>
    );
}
