import type { Movie } from "@/services/moviesService";
import FavoriteButton from "./FavoriteButton";
import MoviePoster from "./MoviePoster";
import MovieTitle from "./MovieTitle";
import RatingBadge from "./RatingBadge";

export default function MovieCard({ movie }: { movie: Movie }) {
    return (
        <div className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
            <FavoriteButton />

            <MoviePoster
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : undefined}
                alt={movie.title}
            />

            <div className="p-3 bg-gray-800 flex flex-col gap-2">
                <MovieTitle title={movie.title} />
                <div className="flex items-center justify-start">
                    <RatingBadge rating={movie.vote_average} />
                </div>
            </div>
        </div>
    );
}


