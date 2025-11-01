import Home from "@/pages/Home";
import MovieDetails from "@/pages/MovieDetailsPage";
import Search from "@/pages/Search";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FavoritesPage from "@/pages/Favorites";
import NotFound from "@/pages/NotFound";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/search/:query" element={<Search />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
