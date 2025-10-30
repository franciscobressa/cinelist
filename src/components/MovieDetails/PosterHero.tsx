export default function PosterHero({ backdropPath, title }: { backdropPath?: string; title: string }) {
    return (
        <div className="md:col-span-8 col-span-12">
            {backdropPath ? (
                <img
                    src={`https://image.tmdb.org/t/p/original${backdropPath}`}
                    alt={title}
                    className="w-full rounded-lg shadow"
                />
            ) : (
                <div className="w-full h-96 flex items-center justify-center text-gray-400 bg-gray-700 rounded-lg">
                    Sem poster
                </div>
            )}
        </div>
    );
}


