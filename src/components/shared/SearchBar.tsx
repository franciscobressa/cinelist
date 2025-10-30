import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";

export default function SearchBar() {
    const { setSearchQuery } = useAppContext();
    const [value, setValue] = useState("");

    useEffect(() => {
        const id = setTimeout(() => {
            setSearchQuery(value);
        }, 400);
        return () => clearTimeout(id);
    }, [value, setSearchQuery]);

    return (
        <div className="relative flex items-center w-75 max-w-md mx-auto">
            <input
                type="text"
                placeholder="Buscar filmes..."
                className="w-full bg-gray-900 border-2 border-gray-700 py-2 pl-4 rounded-full text-white placeholder-gray-400 focus:outline-none  focus:border-gray-600 transition-all"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
}
