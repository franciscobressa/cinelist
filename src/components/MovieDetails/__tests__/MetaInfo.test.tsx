import { render } from "@testing-library/react";

import MetaInfo from "@/components/MovieDetails/MetaInfo";

describe("MetaInfo", () => {
    it("should render formatted date and rating", () => {
        const { getByText } = render(
            <MetaInfo releaseDate="2024-02-10" rating={7.897} />
        );

        expect(getByText("10/02/2024")).toBeInTheDocument();
        expect(getByText("7.9")).toBeInTheDocument();
    });

    it("should fallback to 'N/A' when data is missing", () => {
        const { getAllByText } = render(<MetaInfo />);

        const naValues = getAllByText("N/A");
        expect(naValues.length).toBeGreaterThan(0);
    });
});

