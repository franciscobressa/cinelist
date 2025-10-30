import BackButton from "../shared/BackButton";
import FavoriteAction from "./FavoriteAction";
import PosterHero from "./PosterHero";
import GenreBadges from "./GenreBadges";
import MetaInfo from "./MetaInfo";
import Synopsis from "./Synopsis";
import type { Movie } from "@/services/moviesService";
import { useNavigate } from "react-router-dom";

export default function MovieDetails({ movie }: { movie: Movie }) {
    const navigate = useNavigate();
    return (
        <div className="mx-auto grid grid-cols-12 gap-6">
            <div className="col-span-12">
                <BackButton onClick={() => navigate("/")} />
            </div>
            <PosterHero backdropPath={movie.backdrop_path} title={movie.title} />
            <div className="flex flex-col gap-4 md:col-span-4 col-span-12">
                <h1 className="text-3xl font-bold text-white">{movie.title}</h1>
                <GenreBadges genres={movie.genres} />
                <MetaInfo releaseDate={movie.release_date} rating={movie.vote_average} />
                <Synopsis overview={movie.overview} />
                <FavoriteAction movie={movie} />
            </div>
        </div>
    );
}