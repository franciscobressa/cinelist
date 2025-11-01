import AppRouter from "./routes/AppRouter";
import { AppProvider } from "./context/AppContext";
import ErrorBoundary from "./components/shared/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <div className="min-h-screen bg-gray-900 text-white">
          <AppRouter />
        </div>
      </AppProvider>
    </ErrorBoundary >
  );
}
