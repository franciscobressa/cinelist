import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { getMovieDetails, type Movie } from "@/services/moviesService";
import MovieDetails from "@/components/MovieDetails";

export default function MovieDetailsPage() {
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
                <MovieDetails movie={movie} />
            )}
        </MainLayout >
    );
}


