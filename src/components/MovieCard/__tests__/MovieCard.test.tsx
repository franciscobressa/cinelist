import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import MovieCard from "@/components/MovieCard";
import type { Movie } from "@/services/moviesService";

jest.mock("@/context/AppContext", () => ({
    useAppContext: jest.fn(),
}));

jest.mock("@/context/ToastContext", () => ({
    useToast: jest.fn(() => ({ showToast: jest.fn() })),
}));

const navigateMock = jest.fn();

jest.mock("react-router-dom", () => {
    const actual = jest.requireActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => navigateMock,
    };
});

const { useAppContext } = jest.requireMock("@/context/AppContext");

const movie: Movie = {
    id: 42,
    title: "Inception",
    overview: "dreams",
    poster_path: "/poster.png",
    release_date: "2010-07-16",
    vote_average: 8.8,
};

const renderComponent = () =>
    render(
        <MemoryRouter>
            <MovieCard movie={movie} />
        </MemoryRouter>
    );

describe("MovieCard", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        navigateMock.mockClear();
        (useAppContext as jest.Mock).mockReturnValue({
            toggleFavorite: jest.fn(),
            isFavorite: jest.fn(() => false),
        });
    });

    it("should render poster, title and rating", () => {
        const { getByText, getByRole } = renderComponent();

        expect(getByText("Inception")).toBeInTheDocument();
        expect(getByRole("img")).toHaveAttribute(
            "src",
            expect.stringContaining(movie.poster_path!)
        );
        expect(getByText(movie.vote_average.toFixed(1))).toBeInTheDocument();
    });

    it("should navigate to movie details when clicked", () => {
        const { container } = renderComponent();

        const card = container.firstElementChild as HTMLElement;
        fireEvent.click(card);

        expect(navigateMock).toHaveBeenCalledWith(`/movie/${movie.id}`);
    });
});

