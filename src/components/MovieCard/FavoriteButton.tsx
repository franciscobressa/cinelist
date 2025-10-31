import { HeartIcon } from "@heroicons/react/24/solid";
import { useAppContext } from "@/context/AppContext";
import { useToast } from "@/context/ToastContext";
import type { Movie } from "@/services/moviesService";

export default function FavoriteButton({ movie }: { movie: Movie }) {
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
        <button
            className="absolute top-2 right-2 bg-black/40 hover:bg-black/70 p-2 rounded-full transition-all"
            onClick={handleClick}
        >
            {isFavorite ? (
                <HeartIcon className="w-5 h-5 text-red-500" />
            ) : (
                <HeartIcon className="w-5 h-5 text-gray-500" />
            )}
        </button>
    );
}


