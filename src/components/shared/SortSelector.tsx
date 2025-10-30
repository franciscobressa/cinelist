import { useAppContext, type SortOption } from "@/context/AppContext";

const sortOptions: { value: SortOption; label: string }[] = [
    { value: "title", label: "Título (A-Z)" },
    { value: "title-desc", label: "Título (Z-A)" },
    { value: "rating", label: "Avaliação (Alta-Baixa)" },
    { value: "rating-desc", label: "Avaliação (Baixa-Alta)" },
    { value: "year", label: "Ano (Crescente)" },
    { value: "year-desc", label: "Ano (Descrescente)" },
];

export default function SortSelector() {
    const { sortBy, setSortBy } = useAppContext();

    return (
        <div className="mb-6 flex items-center gap-3">
            <span className="text-gray-300 font-medium">Ordenar por:</span>
            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
            >
                {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

