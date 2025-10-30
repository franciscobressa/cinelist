export default function RatingBadge({ rating }: { rating?: number }) {
    return (
        <span className="bg-yellow-500 text-black font-bold px-2 py-1 rounded-full text-sm">
            {typeof rating === "number" ? rating.toFixed(1) : "N/A"}
        </span>
    );
}


