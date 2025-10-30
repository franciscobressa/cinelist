import { useEffect, useState } from "react";
import { getPopularMovies } from "../services/moviesService";
import type { Movie } from "../services/moviesService";
import MainLayout from "@/components/layouts/MainLayout";

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
            <h1 className="text-2xl font-bold mb-4">Filmes Populares</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {movies.map((movie) => (
                    <div key={movie.id} className="bg-gray-800 p-2 rounded">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="rounded mb-2"
                        />
                        <p className="text-center">{movie.title}</p>
                    </div>
                ))}
            </div>
        </MainLayout>
    );
}
