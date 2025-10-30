import { useAppContext } from "@/context/AppContext";

export default function MovieTitle({ title }: { title: string }) {
    const { searchQuery } = useAppContext();

    const query = searchQuery?.trim();
    if (!query) {
        return (
            <p className="text-white font-semibold truncate">{title}</p>
        );
    }

    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escaped})`, "ig");
    const parts = title.split(regex);

    return (
        <p className="text-white font-semibold truncate">
            {parts.map((part, idx) =>
                regex.test(part) ? (
                    <span key={idx} className="bg-yellow-400 text-black px-1 rounded-sm">{part}</span>
                ) : (
                    <span key={idx}>{part}</span>
                )
            )}
        </p>
    );
}


