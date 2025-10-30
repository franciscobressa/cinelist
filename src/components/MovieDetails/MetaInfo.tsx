import { formatDate } from "@/utils/date";

export default function MetaInfo({ releaseDate, rating }: { releaseDate?: string; rating?: number }) {
    return (
        <div className="items-center gap-3 text-sm text-gray-300">
            <div className="flex items-center gap-1">
                <span className="font-semibold text-gray-400">Data de lançamento:</span>
                <span>{formatDate(releaseDate)}</span>
            </div>
            <div className="flex items-center gap-1">
                <span className="font-semibold text-gray-400">Nota TMDB:</span>
                <span className="bg-yellow-500 text-black font-bold px-2 py-1 rounded-full text-sm">
                    {typeof rating === "number" ? rating.toFixed(1) : "N/A"}
                </span>
            </div>
        </div>
    );
}


