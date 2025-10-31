import { render } from "@testing-library/react";

import Synopsis from "@/components/MovieDetails/Synopsis";

describe("Synopsis", () => {
    it("should render provided overview", () => {
        const { getByText } = render(<Synopsis overview="Epic story" />);

        expect(getByText("Epic story")).toBeInTheDocument();
    });

    it("should show fallback text when overview is missing", () => {
        const { getByText } = render(<Synopsis />);

        expect(getByText("Sem descrição disponível.")).toBeInTheDocument();
    });
});

