import { useEffect, useRef } from "react";
import { useAppContext } from "@/context/AppContext";
import MainLayout from "@/components/layouts/MainLayout";
import Title from "@/components/shared/Title";
import MovieList from "@/components/shared/MovieList";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "@/components/shared/ErrorMessage";

export default function Search() {
    const { searchQuery, results, loading, hasMore, loadNextPage, totalResults, searchError } = useAppContext();
    const navigate = useNavigate();
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!searchQuery.trim()) {
            navigate("/");
        }
    }, [searchQuery]);

    useEffect(() => {
        if (!sentinelRef.current) return;
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && !loading && hasMore) {
                    loadNextPage();
                }
            },
            { root: null, rootMargin: "200px", threshold: 0 }
        );
        observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, [loading, hasMore]);

    if (searchError) {
        return (
            <MainLayout>
                <div className="flex flex-col items-center justify-center">
                    <ErrorMessage title="Erro ao buscar filmes" message="Não foi possível buscar os filmes." />
                    <button
                        className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2"
                        onClick={() =>
                            navigate("/")
                        }>Voltar</button>
                </div>
            </MainLayout >
        );
    }
    return (
        <MainLayout>
            <Title>Resultados da busca: {searchQuery}</Title>
            {results.length > 0 && (
                <p className="text-gray-300 mb-3">
                    Encontramos <span className="font-semibold text-yellow-400">{totalResults}</span> filmes
                </p>
            )}
            <MovieList
                movies={results}
                loading={loading}
                sentinelRef={sentinelRef}
                showSkeletons={true}
            />
        </MainLayout>
    );
}


