import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import HeaderNav from "@/components/shared/HeaderNav";

const routes = [
  { path: "/", label: "Início" },
  { path: "/favorites", label: "Favoritos" },
];

describe("HeaderNav", () => {
  it("should render navigation links", () => {
    const { getByText } = render(
      <MemoryRouter>
        <HeaderNav routes={routes} />
      </MemoryRouter>
    );

    expect(getByText("Início")).toHaveAttribute("href", "/");
    expect(getByText("Favoritos")).toHaveAttribute("href", "/favorites");
  });

  it("should highlight the active route", () => {
    const { getByText } = render(
      <MemoryRouter>
        <HeaderNav routes={routes} activeRouteLabel="Favoritos" />
      </MemoryRouter>
    );

    const activeLink = getByText("Favoritos").parentElement;
    expect(activeLink?.className).toContain("border-b-2 border-blue-500");
  });
});

