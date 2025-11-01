import { render, screen, act } from "@testing-library/react";
import Search from "./index";

const useAppContextMock = jest.fn();
jest.mock("@/context/AppContext", () => ({
  useAppContext: () => useAppContextMock(),
}));

const movieListPropsMock = jest.fn();
jest.mock("@/components/shared/MovieList", () => ({
  __esModule: true,
  default: (props: any) => {
    movieListPropsMock(props);
    return (
      <div data-testid="movie-list">
        <div data-testid="sentinel" ref={props.sentinelRef} />
      </div>
    );
  },
}));

jest.mock("@/components/layouts/MainLayout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="layout">{children}</div>
  ),
}));

const errorMessageMock = jest.fn();
jest.mock("@/components/shared/ErrorMessage", () => ({
  __esModule: true,
  default: (props: any) => {
    errorMessageMock(props);
    return <div data-testid="error-message">Erro</div>;
  },
}));

const navigateMock = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => navigateMock,
}));

let intersectionCallback: IntersectionObserverCallback | undefined;
const observeMock = jest.fn();

const mockMovie = {
  id: 1,
  title: "Matrix",
  overview: "A hacker discovers reality",
  poster_path: "/poster.jpg",
  release_date: "1999-03-31",
  vote_average: 8.7,
};

describe("Search page", () => {
  beforeEach(() => {
    intersectionCallback = undefined;
    (global as any).IntersectionObserver = jest.fn(
      (callback: IntersectionObserverCallback) => {
        intersectionCallback = callback;
        return {
          observe: observeMock,
          disconnect: jest.fn(),
          unobserve: jest.fn(),
          takeRecords: jest.fn(),
        } as unknown as IntersectionObserver;
      }
    );
    observeMock.mockClear();
    movieListPropsMock.mockClear();
    errorMessageMock.mockClear();
    navigateMock.mockClear();
    useAppContextMock.mockReset();
  });

  it("should display results for the current query", () => {
    useAppContextMock.mockReturnValue({
      searchQuery: "matrix",
      results: [mockMovie],
      loading: false,
      hasMore: false,
      loadNextPage: jest.fn(),
      totalResults: 1,
      searchError: false,
    });

    render(<Search />);

    expect(screen.getByText(/Resultados da busca: matrix/i)).toBeInTheDocument();
    const props = movieListPropsMock.mock.calls[0][0];
    expect(props.movies).toHaveLength(1);
  });

  it("should show error message and retry on failure", () => {
    useAppContextMock.mockReturnValue({
      searchQuery: "matrix",
      results: [],
      loading: false,
      hasMore: false,
      loadNextPage: jest.fn(),
      totalResults: 0,
      searchError: true,
    });

    render(<Search />);

    expect(screen.getByTestId("error-message")).toBeInTheDocument();
  });

  it("should trigger infinite scroll when sentinel enters viewport", () => {
    const loadNextPage = jest.fn();
    useAppContextMock.mockReturnValue({
      searchQuery: "matrix",
      results: [mockMovie],
      loading: false,
      hasMore: true,
      loadNextPage,
      totalResults: 1,
      searchError: false,
    });

    render(<Search />);

    act(() => {
      intersectionCallback?.([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver);
    });

    expect(loadNextPage).toHaveBeenCalled();
  });
});

