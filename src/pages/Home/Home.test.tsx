import { render, act } from "@testing-library/react";
import Home from "./index";
import type { Movie } from "@/services/moviesService";

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

const mockMovie: Movie = {
  id: 1,
  title: "Matrix",
  overview: "A hacker discovers reality",
  poster_path: "/poster.jpg",
  release_date: "1999-03-31",
  vote_average: 8.7,
};

let intersectionCallback: IntersectionObserverCallback | undefined;
const observeMock = jest.fn();
const disconnectMock = jest.fn();

describe("Home page", () => {
  beforeEach(() => {
    intersectionCallback = undefined;
    (global as any).IntersectionObserver = jest.fn(
      (callback: IntersectionObserverCallback) => {
        intersectionCallback = callback;
        return {
          observe: observeMock,
          disconnect: disconnectMock,
          unobserve: jest.fn(),
          takeRecords: jest.fn(),
        } as unknown as IntersectionObserver;
      }
    );
    observeMock.mockClear();
    disconnectMock.mockClear();
    movieListPropsMock.mockClear();
    useAppContextMock.mockReset();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render popular movies list", () => {
    useAppContextMock.mockReturnValue({
      popular: [mockMovie],
      popularLoading: false,
      popularHasMore: false,
      loadNextPopularPage: jest.fn(),
      popularError: false,
      resetPopular: jest.fn(),
    });

    render(<Home />);

    expect(movieListPropsMock).toHaveBeenCalled();
    const props = movieListPropsMock.mock.calls[0][0];
    expect(props.movies).toHaveLength(1);
    expect(props.movies[0].title).toBe("Matrix");
  });

  it("should fetch next page when sentinel intersects", () => {
    const loadNextPopularPage = jest.fn();
    useAppContextMock.mockReturnValue({
      popular: [mockMovie],
      popularLoading: false,
      popularHasMore: true,
      loadNextPopularPage,
      popularError: false,
      resetPopular: jest.fn(),
    });

    render(<Home />);

    act(() => {
      intersectionCallback?.([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver);
    });

    expect(loadNextPopularPage).toHaveBeenCalled();
  });

  it("should handle error state gracefully", () => {
    const loadNextPopularPage = jest.fn();
    useAppContextMock.mockReturnValue({
      popular: [],
      popularLoading: false,
      popularHasMore: true,
      loadNextPopularPage,
      popularError: true,
      resetPopular: jest.fn(),
    });

    render(<Home />);

    act(() => {
      intersectionCallback?.([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver);
    });

    expect(loadNextPopularPage).not.toHaveBeenCalled();
  });
});

