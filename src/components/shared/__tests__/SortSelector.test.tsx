import { render, fireEvent } from "@testing-library/react";

import SortSelector from "@/components/shared/SortSelector";

jest.mock("@/context/AppContext", () => ({
  useAppContext: jest.fn(),
}));

const { useAppContext } = jest.requireMock("@/context/AppContext");

describe("SortSelector", () => {
  const setSortBy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppContext as jest.Mock).mockReturnValue({
      sortBy: "title",
      setSortBy,
    });
  });

  it("should render all sort options", () => {
    const { getByRole } = render(<SortSelector />);

    const select = getByRole("combobox") as HTMLSelectElement;
    expect(select.options.length).toBeGreaterThanOrEqual(6);
  });

  it("should call setSortBy when selection changes", () => {
    const { getByRole } = render(<SortSelector />);

    const select = getByRole("combobox");
    fireEvent.change(select, { target: { value: "rating" } });

    expect(setSortBy).toHaveBeenCalledWith("rating");
  });
});

