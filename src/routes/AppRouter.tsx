import Home from "@/pages/Home";
import MovieDetails from "@/pages/MovieDetailsPage";
import Search from "@/pages/Search";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favorites" element={<MovieDetails />} />
                <Route path="/search/:query" element={<Search />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
            </Routes>
        </BrowserRouter>
    );
}
