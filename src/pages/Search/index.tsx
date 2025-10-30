import { useEffect, useRef } from "react";
import { useAppContext } from "@/context/AppContext";
import MainLayout from "@/components/layouts/MainLayout";
import Title from "@/components/shared/Title";
import MovieList from "@/components/shared/MovieList";
import { useNavigate } from "react-router-dom";

export default function Search() {
    const { searchQuery, results, loading, hasMore, loadNextPage, totalResults } = useAppContext();
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

    return (
        <MainLayout>
            <Title>Resultados da busca: {searchQuery}</Title>
            <p className="text-gray-300 mb-3">Encontramos <span className="font-semibold text-yellow-400">{totalResults}</span> filmes</p>
            <MovieList movies={results} loading={loading} sentinelRef={sentinelRef} />
        </MainLayout>
    );
}


