import { render } from "@testing-library/react";

import PosterHero from "@/components/MovieDetails/PosterHero";

describe("PosterHero", () => {
    it("should render backdrop image when path exists", () => {
        const { getByRole } = render(
            <PosterHero backdropPath="/backdrop.jpg" title="Avatar" />
        );

        const img = getByRole("img");
        expect(img).toHaveAttribute(
            "src",
            expect.stringContaining("/backdrop.jpg")
        );
        expect(img).toHaveAttribute("alt", "Avatar");
    });

    it("should render fallback when no backdrop is available", () => {
        const { getByText, queryByRole } = render(
            <PosterHero title="Avatar" />
        );

        expect(queryByRole("img")).toBeNull();
        expect(getByText("Sem poster")).toBeInTheDocument();
    });
});

