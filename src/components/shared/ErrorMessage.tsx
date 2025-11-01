import ActionButton from "./ActionButton";

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
  title?: string;
}

export default function ErrorMessage({
  message = "Ocorreu um erro ao carregar os dados.",
  title = "Erro",
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center mt-12 mb-3 px-4">
      <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
        <svg
          className="w-8 h-8 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-center mb-6 max-w-md">{message}</p>
      {onRetry && (
        <ActionButton
          onClick={onRetry}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Tentar Novamente
        </ActionButton>
      )}
    </div>
  );
}

