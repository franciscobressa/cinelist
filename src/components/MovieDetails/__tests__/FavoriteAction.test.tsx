import { fireEvent, render } from "@testing-library/react";

import FavoriteAction from "@/components/MovieDetails/FavoriteAction";
import type { Movie } from "@/services/moviesService";

jest.mock("@/context/AppContext", () => ({
    useAppContext: jest.fn(),
}));

jest.mock("@/context/ToastContext", () => ({
    useToast: jest.fn(),
}));

const { useAppContext } = jest.requireMock("@/context/AppContext");
const { useToast } = jest.requireMock("@/context/ToastContext");

const movie: Movie = {
    id: 7,
    title: "Dune",
    overview: "Spice",
    poster_path: "/poster.png",
    release_date: "2021-10-22",
    vote_average: 8.1,
};

describe("FavoriteAction", () => {
    const toggleFavorite = jest.fn();
    const showToast = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useToast as jest.Mock).mockReturnValue({ showToast });
    });

    it("should add movie to favorites and show success toast", () => {
        (useAppContext as jest.Mock).mockReturnValue({
            toggleFavorite,
            isFavorite: jest.fn(() => false),
        });

        const { getByRole } = render(<FavoriteAction movie={movie} />);

        fireEvent.click(getByRole("button"));

        expect(toggleFavorite).toHaveBeenCalledWith(movie);
        expect(showToast).toHaveBeenCalledWith("Adicionado aos favoritos!", "success");
    });

    it("should remove movie from favorites and show info toast", () => {
        (useAppContext as jest.Mock).mockReturnValue({
            toggleFavorite,
            isFavorite: jest.fn(() => true),
        });

        const { getByRole, getByText } = render(<FavoriteAction movie={movie} />);

        expect(getByText("Remover dos Favoritos")).toBeInTheDocument();

        fireEvent.click(getByRole("button"));

        expect(toggleFavorite).toHaveBeenCalledWith(movie);
        expect(showToast).toHaveBeenCalledWith("Removido dos favoritos", "info");
    });
});

