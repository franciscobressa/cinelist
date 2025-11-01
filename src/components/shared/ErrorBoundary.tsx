import { Component, type ReactNode } from "react";
import ActionButton from "./ActionButton";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

/**
 * Error Boundary to catch React errors and display fallback UI
 */
export default class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Error Boundary caught an error:", error, errorInfo);
    }

    render() {
        const isDev = Boolean((globalThis as any)?.process?.env?.NODE_ENV !== "production");
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
                    <div className="max-w-md w-full bg-gray-900 rounded-lg p-8 text-center">
                        <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg
                                className="w-10 h-10 text-red-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">
                            Ops! Algo deu errado
                        </h2>
                        <p className="text-gray-400 mb-6">
                            Ocorreu um erro inesperado. Tente recarregar a página.
                        </p>
                        {isDev && this.state.error && (
                            <details className="text-left mb-4 bg-gray-800 rounded p-4">
                                <summary className="cursor-pointer text-red-400 font-mono text-sm mb-2">
                                    Detalhes do erro (dev only)
                                </summary>
                                <pre className="text-xs text-gray-300 overflow-auto">
                                    {this.state.error.message}
                                    {"\n\n"}
                                    {this.state.error.stack}
                                </pre>
                            </details>
                        )}
                        <ActionButton onClick={() => window.location.reload()}>
                            Recarregar Página
                        </ActionButton>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

