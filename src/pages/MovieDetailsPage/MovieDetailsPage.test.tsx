import { render, screen, fireEvent } from "@testing-library/react";
import MovieDetailsPage from "./index";
import type { Movie } from "@/services/moviesService";

jest.mock("@/services/moviesService", () => ({
  getMovieDetails: jest.fn(),
}));

const useAsyncMock = jest.fn();
jest.mock("@/hooks/useAsync", () => ({
  useAsync: (...args: any[]) => useAsyncMock(...args),
}));

jest.mock("@/components/layouts/MainLayout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="layout">{children}</div>
  ),
}));

const movieDetailsMock = jest.fn();
jest.mock("@/components/MovieDetails", () => ({
  __esModule: true,
  default: (props: any) => {
    movieDetailsMock(props);
    return <div data-testid="movie-details" />;
  },
}));

jest.mock("@/components/shared/LoadingDots", () => ({
  __esModule: true,
  default: () => <div data-testid="loading" />,
}));

const executeMock = jest.fn();
const errorMessageMock = jest.fn();
jest.mock("@/components/shared/ErrorMessage", () => ({
  __esModule: true,
  default: ({ onRetry, title, message }: { onRetry: () => void; title: string; message: string }) => {
    errorMessageMock({ onRetry, title, message });
    return (
      <div data-testid="error">
        <p>{title}</p>
        <p>{message}</p>
        <button onClick={onRetry}>Retry</button>
      </div>
    );
  },
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: "1" }),
}));

const mockMovie: Movie = {
  id: 1,
  title: "Matrix",
  overview: "A hacker discovers reality",
  poster_path: "/poster.jpg",
  release_date: "1999-03-31",
  vote_average: 8.7,
};


describe("MovieDetailsPage", () => {
  beforeEach(() => {
    (useAsyncMock as jest.Mock).mockReset();
    movieDetailsMock.mockClear();
    errorMessageMock.mockClear();
    executeMock.mockClear();
    useAsyncMock.mockReturnValue({
      data: null,
      loading: false,
      error: null,
      execute: executeMock,
    });
  });

  it("should fetch and display movie details", () => {
    (useAsyncMock as jest.Mock).mockReturnValue({
      data: mockMovie,
      loading: false,
      error: null,
      execute: executeMock,
    });

    render(<MovieDetailsPage />);

    expect(movieDetailsMock).toHaveBeenCalledWith({ movie: mockMovie });
    expect(screen.getByTestId("movie-details")).toBeInTheDocument();
  });

  it("should show loading indicator while fetching", () => {
    (useAsyncMock as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null,
      execute: executeMock,
    });

    render(<MovieDetailsPage />);

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("should show retry option when request fails", () => {
    (useAsyncMock as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: new Error("fail"),
      execute: executeMock,
    });

    render(<MovieDetailsPage />);

    expect(screen.getByTestId("error")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Retry"));
    expect(executeMock).toHaveBeenCalled();
  });
});

