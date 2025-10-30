import { useEffect, useRef, useState } from "react";
import { getPopularMovies } from "../services/moviesService";
import type { Movie } from "../services/moviesService";
import MainLayout from "@/components/layouts/MainLayout";
import MovieCard from "@/components/MovieCard";
import LoadingDots from "@/components/shared/LoadingDots";

export default function Home() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        async function loadMovies() {
            setLoading(true);
            const data = await getPopularMovies(page);
            await new Promise((resolve) => setTimeout(resolve, 1700));
            setMovies((prev) => [...prev, ...data]);
            setHasMore(data.length > 0);
            setLoading(false);
        }
        loadMovies();
    }, [page]);

    useEffect(() => {
        if (!sentinelRef.current) return;
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && !loading && hasMore) {
                    setPage((p) => p + 1);
                }
            },
            { root: null, rootMargin: "200px", threshold: 0 }
        );
        observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, [loading, hasMore]);

    return (
        <MainLayout>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
            {loading && (
                <div className="text-center mt-15">
                    <LoadingDots />
                </div>
            )}
            <div ref={sentinelRef} />
        </MainLayout>
    );
}
