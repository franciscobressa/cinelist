import { render } from "@testing-library/react";

import GenreBadges from "@/components/MovieDetails/GenreBadges";

describe("GenreBadges", () => {
    it("should render nothing when genres are empty", () => {
        const { container } = render(<GenreBadges genres={[]} />);
        expect(container).toBeEmptyDOMElement();
    });

    it("should render badges for provided genres", () => {
        const genres = [
            { id: 1, name: "Ação" },
            { id: 2, name: "Drama" },
        ];

        const { getByText } = render(<GenreBadges genres={genres} />);

        expect(getByText("Ação")).toBeInTheDocument();
        expect(getByText("Drama")).toBeInTheDocument();
    });
});

