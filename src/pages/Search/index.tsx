import { useAppContext } from "@/context/AppContext";
import MovieListWrapper from "@/components/shared/MovieListWrapper";
import MovieCard from "@/components/MovieCard";
import MainLayout from "@/components/layouts/MainLayout";
import Title from "@/components/shared/Title";

export default function Search() {
    const { searchQuery } = useAppContext();
    const { results } = useAppContext();

    return (
        <MainLayout>
            <Title>Resultados da busca: {searchQuery}</Title>
            <MovieListWrapper>
                {results.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </MovieListWrapper>
        </MainLayout>
    );
}


