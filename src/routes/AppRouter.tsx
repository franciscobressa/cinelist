import Home from "@/pages/Home";
import MovieDetails from "@/pages/MovieDetails";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favorites" element={<MovieDetails />} />
            </Routes>
        </BrowserRouter>
    );
}
