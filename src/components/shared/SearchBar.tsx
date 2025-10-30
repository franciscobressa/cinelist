export default function SearchBar() {
    return (
        <div className="relative flex items-center w-75 max-w-md mx-auto">
            <input
                type="text"
                placeholder="Buscar filmes..."
                className="w-full bg-gray-900 border-2 border-gray-700 py-2 pl-4 rounded-full text-white placeholder-gray-400 focus:outline-none  focus:border-gray-600 transition-all"
            />
        </div>
    );
}
