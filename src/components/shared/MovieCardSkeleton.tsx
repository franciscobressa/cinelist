/**
 * Skeleton loader for MovieCard
 * Shows a placeholder while movie data is loading
 */
export default function MovieCardSkeleton() {
  return (
    <div className="h-min-[450px] relative rounded-xl overflow-hidden shadow-md bg-gray-800 animate-pulse">
      {/* Poster placeholder */}
      <div className="w-full aspect-2/3 bg-gray-700" />

      {/* Content placeholder */}
      <div className="p-3 bg-gray-800 flex flex-col gap-2">
        {/* Title */}
        <div className="h-5 bg-gray-700 rounded w-3/4" />

        {/* Rating badge */}
        <div className="flex items-center justify-start">
          <div className="h-6 w-12 bg-gray-700 rounded-full" />
        </div>
      </div>
    </div>
  );
}

