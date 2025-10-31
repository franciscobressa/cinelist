import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";

export default function SearchBar() {
    const { searchQuery, setSearchQuery } = useAppContext();
    const navigate = useNavigate();
    const location = useLocation();
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const id = setTimeout(() => {
            setSearchQuery(searchQuery);
            const trimmed = searchQuery.trim();
            if (trimmed.length > 0) {
                navigate(`/search/${encodeURIComponent(trimmed)}`);
            }
        }, 400);
        return () => clearTimeout(id);
    }, [searchQuery, setSearchQuery]);

    useEffect(() => {
        const isOnSearch = location.pathname.startsWith("/search");
        if (!isOnSearch && searchQuery) {
            setSearchQuery("");
        }
        if (isOnSearch) {
            requestAnimationFrame(() => inputRef.current?.focus());
        }
    }, [location.pathname]);

    return (
        <div className="relative flex w-full items-center">
            <input
                type="text"
                placeholder="Buscar filmes..."
                className="w-full rounded-full border-2 border-gray-700 bg-gray-900 py-2 pl-4 text-white placeholder-gray-400 transition-all focus:border-gray-600 focus:outline-none"
                ref={inputRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    );
}
