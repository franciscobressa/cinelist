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
        <div className="relative flex items-center w-75 max-w-md mx-auto">
            <input
                type="text"
                placeholder="Buscar filmes..."
                className="w-full bg-gray-900 border-2 border-gray-700 py-2 pl-4 rounded-full text-white placeholder-gray-400 focus:outline-none  focus:border-gray-600 transition-all"
                ref={inputRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    );
}
