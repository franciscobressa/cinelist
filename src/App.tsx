import AppRouter from "./routes/AppRouter";
import { AppProvider } from "./context/AppContext";

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-900 text-white">
        <AppRouter />
      </div>
    </AppProvider>
  );
}
