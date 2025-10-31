import { fireEvent, render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import SearchBar from "@/components/shared/SearchBar";

jest.mock("@/context/AppContext", () => ({
  useAppContext: jest.fn(),
}));

const navigateMock = jest.fn();
const locationMock = { pathname: "/" };

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
    useLocation: () => locationMock,
  };
});

const { useAppContext } = jest.requireMock("@/context/AppContext");

describe("SearchBar", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("should update search query and navigate after debounce", async () => {
    let currentQuery = "";
    const setSearchQuery = jest.fn((value: string) => {
      currentQuery = value;
    });

    (useAppContext as jest.Mock).mockImplementation(() => ({
      searchQuery: currentQuery,
      setSearchQuery,
    }));

    const { getByPlaceholderText, rerender } = render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    const input = getByPlaceholderText("Buscar filmes...") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "matrix" } });
    expect(setSearchQuery).toHaveBeenCalledWith("matrix");

    (useAppContext as jest.Mock).mockImplementation(() => ({
      searchQuery: currentQuery,
      setSearchQuery,
    }));

    rerender(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    jest.advanceTimersByTime(400);

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith("/search/matrix");
    });
  });

  it("should reset query when leaving search route", () => {
    const setSearchQuery = jest.fn();
    (useAppContext as jest.Mock).mockReturnValue({
      searchQuery: "something",
      setSearchQuery,
    });

    locationMock.pathname = "/";

    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    expect(setSearchQuery).toHaveBeenCalledWith("");
  });
});

