export default function Synopsis({ overview }: { overview?: string }) {
    return (
        <div>
            <h2 className="text-lg font-semibold text-white mb-1">Sinopse</h2>
            <p className="text-gray-300 leading-7">{overview || "Sem descrição disponível."}</p>
        </div>
    );
}


