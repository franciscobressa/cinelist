import { useParams } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { getMovieDetails } from "@/services/moviesService";
import MovieDetails from "@/components/MovieDetails";
import { useAsync } from "@/hooks/useAsync";
import LoadingDots from "@/components/shared/LoadingDots";
import ErrorMessage from "@/components/shared/ErrorMessage";

export default function MovieDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const { data: movie, loading, error, execute } = useAsync(
    async (signal) => {
      if (!id) throw new Error("ID do filme não encontrado");
      return await getMovieDetails(Number(id), signal);
    },
    [id]
  );

  return (
    <MainLayout>
      {loading && (
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingDots />
        </div>
      )}

      {error && (
        <ErrorMessage
          title="Erro ao carregar filme"
          message="Não foi possível carregar os detalhes do filme. Tente novamente."
          onRetry={() => {
            const controller = new AbortController();
            execute(controller.signal);
          }}
        />
      )}

      {!loading && !error && movie && <MovieDetails movie={movie} />}
    </MainLayout>
  );
}
