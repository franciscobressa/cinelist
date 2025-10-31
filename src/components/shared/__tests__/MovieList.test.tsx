import { render } from "@testing-library/react";
import { createRef } from "react";

import MovieList from "@/components/shared/MovieList";
import type { Movie } from "@/services/moviesService";

jest.mock("@/components/MovieCard", () => jest.fn(() => <div data-testid="movie-card" />));
jest.mock("@/components/shared/MovieListWrapper", () =>
  ({ children }: { children: React.ReactNode }) => (
    <div data-testid="movie-list-wrapper">{children}</div>
  )
);
jest.mock("@/components/shared/LoadingDots", () => () => <div data-testid="loading-dots" />);
jest.mock("@/components/shared/MovieCardSkeleton", () => () => <div data-testid="movie-skeleton" />);

const movies: Movie[] = [
  {
    id: 1,
    title: "Movie 1",
    overview: "Overview",
    poster_path: "/poster1.jpg",
    release_date: "2020-01-01",
    vote_average: 7,
  },
];

describe("MovieList", () => {
  it("should render skeletons when loading initial data", () => {
    const { getAllByTestId, queryByTestId } = render(
      <MovieList
        movies={[]}
        loading={true}
        showSkeletons={true}
        sentinelRef={createRef<HTMLDivElement>()}
      />
    );

    expect(getAllByTestId("movie-skeleton")).toHaveLength(12);
    expect(queryByTestId("loading-dots")).toBeNull();
  });

  it("should append loading indicator when paginating", () => {
    const { getByTestId, getAllByTestId } = render(
      <MovieList
        movies={movies}
        loading={true}
        showSkeletons={false}
        sentinelRef={createRef<HTMLDivElement>()}
      />
    );

    expect(getByTestId("loading-dots")).toBeInTheDocument();
    expect(getAllByTestId("movie-card")).toHaveLength(movies.length);
  });
});

