export default function MoviePoster({ src, alt }: { src?: string; alt: string }) {
    if (src) {
        return (
            <img
                src={src}
                alt={alt}
                className="w-[300px] h-[450px] object-cover"
            />
        );
    }
    return (
        <div className="w-[300px] h-[450px] flex items-center justify-center text-gray-400 text-sm bg-gray-700">
            Poster do Filme
        </div>
    );
}


