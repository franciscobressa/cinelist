import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { getMovieDetails, type Movie } from "@/services/moviesService";
import BackButton from "@/components/shared/BackButton";
import PosterHero from "@/components/MovieDetails/PosterHero";
import GenreBadges from "@/components/MovieDetails/GenreBadges";
import MetaInfo from "@/components/MovieDetails/MetaInfo";
import Synopsis from "@/components/MovieDetails/Synopsis";
import FavoriteAction from "@/components/MovieDetails/FavoriteAction";

export default function MovieDetailsPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                setError(null);
                if (!id) return;
                const data = await getMovieDetails(Number(id));
                setMovie(data);
            } catch (e) {
                setError("Falha ao carregar detalhes do filme.");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [id]);

    return (
        <MainLayout>
            {loading && <div className="text-center text-gray-400">Carregando...</div>}
            {error && <div className="text-center text-red-500">{error}</div>}
            {!loading && movie && (
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
                        <FavoriteAction />
                    </div>
                </div>
            )
            }
        </MainLayout >
    );
}


