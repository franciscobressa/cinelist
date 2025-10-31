import { render } from "@testing-library/react";

import MoviePoster from "@/components/MovieCard/MoviePoster";

describe("MoviePoster", () => {
  it("should render image when src is provided", () => {
    const { getByRole } = render(
      <MoviePoster src="/poster.jpg" alt="Matrix" />
    );

    const img = getByRole("img") as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain("/poster.jpg");
    expect(img.alt).toBe("Matrix");
  });

  it("should render fallback when src is missing", () => {
    const { getByText, queryByRole } = render(
      <MoviePoster alt="No poster" />
    );

    expect(queryByRole("img")).toBeNull();
    expect(getByText("Poster do Filme")).toBeInTheDocument();
  });
});

