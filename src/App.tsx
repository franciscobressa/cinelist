import AppRouter from "./routes/AppRouter";
import { AppProvider } from "./context/AppContext";
import { ToastProvider } from "./context/ToastContext";
import ErrorBoundary from "./components/shared/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AppProvider>
          <div className="min-h-screen bg-gray-900 text-white">
            <AppRouter />
          </div>
        </AppProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}
