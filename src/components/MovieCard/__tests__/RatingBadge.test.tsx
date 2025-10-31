import { render } from "@testing-library/react";

import RatingBadge from "@/components/MovieCard/RatingBadge";

describe("RatingBadge", () => {
  it("should render formatted rating when numeric value is provided", () => {
    const { getByText } = render(<RatingBadge rating={7.456} />);

    expect(getByText("7.5")).toBeInTheDocument();
  });

  it("should render 'N/A' when rating is missing", () => {
    const { getByText } = render(<RatingBadge />);

    expect(getByText("N/A")).toBeInTheDocument();
  });
});

