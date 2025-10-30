type Genre = { id: number; name: string };

export default function GenreBadges({ genres }: { genres?: Genre[] }) {
    if (!genres || genres.length === 0) return null;
    return (
        <div className="flex flex-wrap gap-2">
            {genres.map((g) => (
                <span key={g.id} className="px-2 py-1 text-xs rounded-full bg-blue-600 text-white">
                    {g.name}
                </span>
            ))}
        </div>
    );
}


