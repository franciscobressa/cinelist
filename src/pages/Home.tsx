import { useEffect, useState } from "react";
import { getPopularMovies } from "../services/moviesService";
import type { Movie } from "../services/moviesService";
import MainLayout from "@/components/layouts/MainLayout";
import MovieCard from "@/components/MovieCard";

export default function Home() {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        async function loadMovies() {
            const data = await getPopularMovies();
            setMovies(data);
        }
        loadMovies();
    }, []);

    return (
        <MainLayout>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </MainLayout>
    );
}
