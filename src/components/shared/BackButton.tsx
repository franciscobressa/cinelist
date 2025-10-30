import { ChevronLeftIcon } from "@heroicons/react/24/solid";

export default function BackButton({ onClick }: { onClick: () => void }) {
    return (
        <button onClick={onClick} className="flex items-center gap-2 cursor-pointer text-gray-400">
            <ChevronLeftIcon className="w-5 h-5" />
            Voltar
        </button>
    );
}


