import { HeartIcon } from "@heroicons/react/24/solid";

export default function FavoriteButton() {
    return (
        <button
            className="absolute top-2 right-2 bg-black/40 hover:bg-black/70 p-2 rounded-full transition-all"
        >
            <HeartIcon className="w-5 h-5 text-red-500" />
        </button>
    );
}


