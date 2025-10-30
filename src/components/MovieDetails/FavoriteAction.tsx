import { HeartIcon } from "@heroicons/react/24/solid";

export default function FavoriteAction({ onClick }: { onClick?: () => void }) {
    return (
        <div>
            <button onClick={onClick} className="mt-2 inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
                <HeartIcon className="w-4 h-4" />
                Adicionar aos Favoritos
            </button>
        </div>
    );
}


