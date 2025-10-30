import type { Movie } from "@/services/moviesService";
import MovieCard from "@/components/MovieCard";
import MovieListWrapper from "@/components/shared/MovieListWrapper";
import LoadingDots from "@/components/shared/LoadingDots";
import type { RefObject } from "react";

export default function MovieList({ movies, loading, sentinelRef }: { movies: Movie[]; loading?: boolean; sentinelRef?: RefObject<HTMLDivElement | null> }) {
    return (
        <>
            <MovieListWrapper>
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </MovieListWrapper>
            {loading && (
                <div className="text-center mt-15">
                    <LoadingDots />
                </div>
            )}
            <div ref={sentinelRef} />
        </>
    );
}


