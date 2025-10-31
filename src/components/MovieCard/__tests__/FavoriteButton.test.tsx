import { render, fireEvent } from "@testing-library/react";

import FavoriteButton from "@/components/MovieCard/FavoriteButton";
import type { Movie } from "@/services/moviesService";

jest.mock("@/context/AppContext", () => ({
  useAppContext: jest.fn(),
}));

jest.mock("@/context/ToastContext", () => ({
  useToast: jest.fn(),
}));

const { useAppContext } = jest.requireMock("@/context/AppContext");
const { useToast } = jest.requireMock("@/context/ToastContext");

const baseMovie: Movie = {
  id: 1,
  title: "Matrix",
  overview: "Sci-fi",
  poster_path: "/poster.jpg",
  release_date: "1999-03-31",
  vote_average: 8.7,
};

describe("FavoriteButton", () => {
  const toggleFavorite = jest.fn();
  const showToast = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useToast as jest.Mock).mockReturnValue({ showToast });
  });

  it("should toggle favorite when clicked and show success toast", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      toggleFavorite,
      isFavorite: jest.fn(() => false),
    });

    const { getByRole } = render(<FavoriteButton movie={baseMovie} />);

    fireEvent.click(getByRole("button"));

    expect(toggleFavorite).toHaveBeenCalledWith(baseMovie);
    expect(showToast).toHaveBeenCalledWith("Adicionado aos favoritos!", "success");
  });

  it("should display filled icon when movie is already favorite", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      toggleFavorite,
      isFavorite: jest.fn(() => true),
    });

    const { container } = render(<FavoriteButton movie={baseMovie} />);

    const icon = container.querySelector("svg");
    expect(icon).toBeTruthy();
    expect(icon?.getAttribute("class") ?? "").toContain("text-red-500");
  });

  it("should show info toast when removing from favorites", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      toggleFavorite,
      isFavorite: jest.fn(() => true),
    });

    const { getByRole } = render(<FavoriteButton movie={baseMovie} />);

    fireEvent.click(getByRole("button"));

    expect(toggleFavorite).toHaveBeenCalledWith(baseMovie);
    expect(showToast).toHaveBeenCalledWith("Removido dos favoritos", "info");
  });
});

