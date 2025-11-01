import { useEffect, useRef } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import MovieList from "@/components/shared/MovieList";
import { useAppContext } from "@/context/AppContext";
import ErrorMessage from "@/components/shared/ErrorMessage";
import ActionButton from "@/components/shared/ActionButton";

export default function Home() {
    const { popular, popularLoading, popularHasMore, loadNextPopularPage, popularError, resetPopular } = useAppContext();
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!sentinelRef.current) return;
        if (popularError) return;
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && !popularLoading && popularHasMore) {
                    loadNextPopularPage();
                }
            },
            { root: null, rootMargin: "200px", threshold: 0 }
        );
        observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, [popularLoading, popularHasMore, popularError]);

    if (popularError) {
        return (
            <MainLayout>
                <div className="flex flex-col items-center justify-center">
                    <ErrorMessage title="Erro ao buscar filmes populares" message="Não foi possível buscar os filmes populares. Tente novamente." />
                    <ActionButton
                        onClick={() => {
                            resetPopular();
                            loadNextPopularPage();
                        }}
                    >
                        Tentar Novamente
                    </ActionButton>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <MovieList
                movies={popular}
                loading={popularLoading}
                sentinelRef={sentinelRef}
                showSkeletons={true}
            />
        </MainLayout>
    );
}


