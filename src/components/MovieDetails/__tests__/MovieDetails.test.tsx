import { fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import MovieDetails from "@/components/MovieDetails";
import type { Movie } from "@/services/moviesService";

jest.mock("@/context/AppContext", () => ({
    useAppContext: jest.fn(),
}));

jest.mock("@/context/ToastContext", () => ({
    useToast: jest.fn(() => ({ showToast: jest.fn() })),
}));

jest.mock("react-router-dom", () => {
    const actual = jest.requireActual("react-router-dom");
    return {
        ...actual,
        useNavigate: jest.fn(),
    };
});

jest.mock("@/components/shared/BackButton", () => ({ onClick }: { onClick: () => void }) => (
    <button data-testid="back-button" onClick={onClick}>
        Voltar
    </button>
));

const { useAppContext } = jest.requireMock("@/context/AppContext");
const { useNavigate } = jest.requireMock("react-router-dom");

const navigateMock = jest.fn();

const movie: Movie = {
    id: 101,
    title: "Blade Runner",
    overview: "Replicants story",
    poster_path: "/poster.jpg",
    backdrop_path: "/backdrop.jpg",
    release_date: "1982-06-25",
    vote_average: 8.2,
    genres: [
        { id: 1, name: "Sci-Fi" },
        { id: 2, name: "Thriller" },
    ],
};

describe("MovieDetails", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (useAppContext as jest.Mock).mockReturnValue({
            toggleFavorite: jest.fn(),
            isFavorite: jest.fn(() => false),
        });
        (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    });

    it("should render movie information", () => {
        const { getByText, getByRole } = render(
            <MemoryRouter>
                <MovieDetails movie={movie} />
            </MemoryRouter>
        );

        expect(getByText("Blade Runner")).toBeInTheDocument();
        expect(getByText("Sci-Fi")).toBeInTheDocument();
        expect(getByText("Thriller")).toBeInTheDocument();
        expect(getByText("Replicants story")).toBeInTheDocument();
        expect(getByRole("img")).toHaveAttribute(
            "src",
            expect.stringContaining(movie.backdrop_path!)
        );
    });

    it("should navigate back when back button is clicked", () => {
        const { getByTestId } = render(
            <MemoryRouter>
                <MovieDetails movie={movie} />
            </MemoryRouter>
        );

        fireEvent.click(getByTestId("back-button"));

        expect(navigateMock).toHaveBeenCalledWith("/");
    });
});

