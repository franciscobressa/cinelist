import { act, renderHook, waitFor } from "@testing-library/react";

import { AppProvider, useAppContext } from "@/context/AppContext";

const mockSearchMovies = jest.fn();
const mockGetPopularMovies = jest.fn();

jest.mock("@/services/moviesService", () => ({
  searchMovies: (...args: unknown[]) => mockSearchMovies(...args),
  getPopularMovies: (...args: unknown[]) => mockGetPopularMovies(...args),
}));

jest.mock("@/hooks/useDebounce", () => ({
  useDebounce: (value: string) => value,
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AppProvider>{children}</AppProvider>
);

const flushPendingTimers = async () => {
  await act(async () => {
    jest.runOnlyPendingTimers();
    await Promise.resolve();
  });
};

const movie = {
  id: 1,
  title: "Matrix",
  overview: "A hacker discovers reality",
  poster_path: "/poster.jpg",
  release_date: "1999-03-31",
  vote_average: 8.7,
};

describe("AppContext", () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    mockGetPopularMovies.mockResolvedValue([movie]);
    mockSearchMovies.mockResolvedValue({
      results: [movie],
      total_results: 1,
    });
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => { });
  });

  afterEach(async () => {
    await flushPendingTimers();
    jest.useRealTimers();
    consoleErrorSpy.mockRestore();
  });

  it("should toggle favorites correctly", () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });

    act(() => {
      result.current.toggleFavorite(movie as any);
    });

    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.isFavorite(movie.id)).toBe(true);

    act(() => {
      result.current.toggleFavorite(movie as any);
    });

    expect(result.current.favorites).toHaveLength(0);
    expect(result.current.isFavorite(movie.id)).toBe(false);
  });

  it("should fetch search results when loadNextPage is called", async () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });

    await act(async () => {
      result.current.setSearchQuery("matrix");
    });

    await act(async () => {
      await result.current.loadNextPage();
    });

    await waitFor(() => {
      expect(mockSearchMovies).toHaveBeenCalledWith("matrix", 1, undefined);
      expect(result.current.results).toHaveLength(1);
      expect(result.current.totalResults).toBe(1);
      expect(result.current.loading).toBe(false);
    });
  });

  it("should load popular movies when requested", async () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });

    await act(async () => {
      const promise = result.current.loadNextPopularPage();
      jest.advanceTimersByTime(500);
      await promise;
    });

    await waitFor(() => {
      const calls = mockGetPopularMovies.mock.calls;
      expect(calls.length).toBeGreaterThan(0);
      expect(calls[calls.length - 1][0]).toBe(1);
      expect(result.current.popular).toHaveLength(1);
    });
  });
});

