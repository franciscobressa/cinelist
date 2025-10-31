import type { Movie } from "@/services/moviesService";
import MovieCard from "@/components/MovieCard";
import MovieListWrapper from "@/components/shared/MovieListWrapper";
import LoadingDots from "@/components/shared/LoadingDots";
import MovieCardSkeleton from "@/components/shared/MovieCardSkeleton";
import type { RefObject } from "react";

export default function MovieList({ 
    movies, 
    loading, 
    sentinelRef,
    showSkeletons = false 
}: { 
    movies: Movie[]; 
    loading?: boolean; 
    sentinelRef?: RefObject<HTMLDivElement | null>;
    showSkeletons?: boolean;
}) {
    // Show skeletons on initial load (when no movies and loading)
    const shouldShowSkeletons = showSkeletons && movies.length === 0 && loading;

    return (
        <>
            <MovieListWrapper>
                {shouldShowSkeletons ? (
                    // Show 12 skeleton cards during initial load
                    Array.from({ length: 12 }).map((_, index) => (
                        <MovieCardSkeleton key={`skeleton-${index}`} />
                    ))
                ) : (
                    movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))
                )}
            </MovieListWrapper>
            
            {/* Show loading dots only for pagination (when there are already movies) */}
            {loading && movies.length > 0 && (
                <div className="text-center mt-15">
                    <LoadingDots />
                </div>
            )}
            <div ref={sentinelRef} />
        </>
    );
}


