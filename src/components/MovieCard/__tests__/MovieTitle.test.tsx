import { render } from "@testing-library/react";

import MovieTitle from "@/components/MovieCard/MovieTitle";

jest.mock("@/context/AppContext", () => ({
  useAppContext: jest.fn(),
}));

const { useAppContext } = jest.requireMock("@/context/AppContext");

describe("MovieTitle", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render plain title when there is no search query", () => {
    (useAppContext as jest.Mock).mockReturnValue({ searchQuery: "" });

    const { container, getByText } = render(<MovieTitle title="Interstellar" />);

    const paragraph = getByText("Interstellar").closest("p");
    expect(paragraph).toBeInTheDocument();
    expect(paragraph?.textContent).toBe("Interstellar");
    expect(container.querySelector("span.bg-yellow-400")).toBeNull();
  });

  it("should highlight matching parts of the title", () => {
    (useAppContext as jest.Mock).mockReturnValue({ searchQuery: "matrix" });

    const { container } = render(<MovieTitle title="The Matrix Resurrections" />);

    const highlighted = container.querySelectorAll("span.bg-yellow-400");
    expect(highlighted.length).toBe(1);
    expect(highlighted[0].textContent).toBe("Matrix");
  });

  it("should escape regex special characters in query", () => {
    (useAppContext as jest.Mock).mockReturnValue({ searchQuery: "(res)" });

    const { container } = render(<MovieTitle title="The (Res)urgence" />);

    const highlighted = container.querySelectorAll("span.bg-yellow-400");
    expect(highlighted.length).toBe(1);
    expect(highlighted[0].textContent).toBe("(Res)");
  });
});

