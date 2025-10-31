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
        const controller = new AbortController();
        
        async function load() {
            try {
                setLoading(true);
                setError(null);
                if (!id) return;
                const data = await getMovieDetails(Number(id), controller.signal);
                
                // Don't update state if request was aborted
                if (controller.signal.aborted) return;
                
                setMovie(data);
            } catch (e: any) {
                // Don't show error if request was cancelled
                if (e.name === 'CanceledError' || e.name === 'AbortError') {
                    return;
                }
                setError("Falha ao carregar detalhes do filme.");
            } finally {
                // Only set loading to false if not aborted
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }
        load();
        
        // Cleanup: abort request if id changes or component unmounts
        return () => {
            controller.abort();
        };
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


