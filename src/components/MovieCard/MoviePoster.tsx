export default function MoviePoster({ src, alt }: { src?: string; alt: string }) {
    if (src) {
        return (
            <div className="aspect-2/3">
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover"
                />
            </div>
        );
    }
    return (
        <div className="aspect-2/3 flex items-center justify-center text-gray-400 text-sm bg-gray-700">
            Poster do Filme
        </div>
    );
}


