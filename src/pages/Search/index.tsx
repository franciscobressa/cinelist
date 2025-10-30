import { useState } from "react";
import { searchMovies } from "../../services/moviesService";
import type { Movie } from "../../services/moviesService";

export default function Search() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Movie[]>([]);

    async function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        const data = await searchMovies(query);
        setResults(data);
    }

    return (
        <div className="p-6">
            <form onSubmit={handleSearch} className="mb-4">
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="p-2 rounded text-black"
                    placeholder="Buscar filmes..."
                />
                <button className="ml-2 bg-blue-600 px-4 py-2 rounded text-white">
                    Buscar
                </button>
            </form>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {results.map((movie) => (
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
        </div>
    );
}


